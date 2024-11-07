use anyhow::Result;
use serde::{Deserialize, Serialize, Serializer, Deserializer};
use std::collections::{HashMap, HashSet};
use std::fs;
use std::path::{Path, PathBuf};
use std::fs::File;
use rayon::prelude::*;
use indicatif::{ProgressBar, ProgressStyle};
use unicode_segmentation::UnicodeSegmentation;
use std::sync::{Arc, Mutex};
use std::sync::atomic::{AtomicUsize, Ordering};
use crossbeam::channel;
use std::thread;
use std::io::{BufRead, BufReader, BufWriter};
use memmap2::Mmap;
use dashmap::DashMap;
use fxhash::{FxHashMap, FxBuildHasher};
use bincode;

static CALL_COUNT: AtomicUsize = AtomicUsize::new(0);
// For metadata file
#[derive(Debug, Deserialize)]
struct Metadata {
    url: String,
}


#[derive(Debug)]
struct WorkItem {
    dir_path: PathBuf,
    target_path: PathBuf,
}


// Used for mapping URL's to Unique Ids
#[derive(Debug, Serialize, Deserialize)]
struct UrlMap {
    url_to_id: FxHashMap<String, u32>,
    id_to_url: FxHashMap<u32, String>,
    next_id: u32,
}

impl UrlMap {
    fn new() -> Self {
        Self {
            url_to_id: FxHashMap::default(),
            id_to_url: FxHashMap::default(),
            next_id: 0,
        }
    }

    fn get_or_insert_url(&mut self, url: String) -> u32 {
        if let Some(&id) = self.url_to_id.get(&url) {
            id
        } else {
            let id = self.next_id;
            self.url_to_id.insert(url.clone(), id);
            self.id_to_url.insert(id, url);
            self.next_id += 1;
            id
        }
    }

    fn get_url(&self, id: u32) -> Option<&String> {
        self.id_to_url.get(&id)
    }

    fn save_to_disk<P: AsRef<Path>>(&self, path: P) -> Result<()> {
        let file = File::create(path)?;
        let writer = BufWriter::new(file);
        bincode::serialize_into(writer, &self)?;
        Ok(())
    }

    fn load_from_disk<P: AsRef<Path>>(path: P) -> Result<Self> {
        let file = File::open(path)?;
        let reader = BufReader::new(file);
        Ok(bincode::deserialize_from(reader)?)
    }
}


#[derive(Debug)]
struct FileContent {
    metadata: String,
    served: String,
    dir_path: PathBuf,
    target_path: PathBuf,
}

// Used for concurrent counting of file terms
#[derive(Debug)]
struct TokenAccumulator {
    tokens: DashMap<String, FxHashMap<u32, u32>>,
}

impl TokenAccumulator {
    fn new() -> Self {
        Self {
            tokens: DashMap::new(),
        }
    }

    fn add_token(&self, token: String, url: u32) {
        self.tokens
            .entry(token)
            .or_insert_with(FxHashMap::default)
            .entry(url)
            .and_modify(|count| *count += 1)
            .or_insert(1);
    }
}
// Main index structure
#[derive(Debug, Serialize, Deserialize)]
struct InvertedIndex {
    index: FxHashMap<String, FxHashMap<u32, u32>>,
}

// Distributed index structure
#[derive(Debug)]
struct DistributedIndex {
    indexes: Vec<InvertedIndex>,
}

#[derive(Debug)]
struct IndexStats {
    total_indexes: usize,
    total_tokens: usize,
    total_documents: usize,
}

impl InvertedIndex {
    fn new() -> Self {
        Self {
            index: FxHashMap::default(),

        }
    }


    // tokenizes and counts frequencies
    fn add_document(&mut self, url_id: u32, content: &str) -> Result<()> {
        for token in content.to_lowercase().unicode_words() {
            let url_map = self.index.entry(token.to_string()).or_insert_with(FxHashMap::default);
            *url_map.entry(url_id).or_insert(0) += 1;
        }
        Ok(())
    }

    fn save_to_disk<P: AsRef<Path>>(&self, path: P) -> Result<()> {
        let file = File::create(path)?;
        let writer = BufWriter::new(file);
        serde_json::to_writer(writer, &self)?;
        Ok(())
    }

    fn load_from_disk<P: AsRef<Path>>(path: P) -> Result<Self> {
        let file = File::open(path)?;
        let reader = BufReader::with_capacity(1024 * 1024, file);
        Ok(bincode::deserialize_from(reader)?)
    }


    // main processing logic
    fn process_directory<P: AsRef<Path>>(&mut self, dir_path: P, target_path: P) -> Result<()> {
        let start_time = std::time::Instant::now();
        println!("Starting process_directory");

        let metadata_path = dir_path.as_ref().join("metadatadoc.jsonl");
        let served_path = dir_path.as_ref().join("servedoc.jsonl");

        let metadata_file = File::open(&metadata_path)?;
        let served_file = File::open(&served_path)?;
        
        let metadata_mmap = unsafe { Mmap::map(&metadata_file)? };
        let served_mmap = unsafe { Mmap::map(&served_file)? };

        println!("Finished memory mapping files in {:?}", start_time.elapsed());

        const CHUNK_SIZE: usize = 1024 * 1024; // 1MB chunks
        let accumulator = TokenAccumulator::new();
        let url_map = Arc::new(parking_lot::RwLock::new(UrlMap::new()));

        // Process metadata and served content in parallel
        let start_time = std::time::Instant::now();
        metadata_mmap
            .chunks(CHUNK_SIZE)
            .zip(served_mmap.chunks(CHUNK_SIZE))
            .par_bridge()
            .for_each(|(metadata_chunk, served_chunk)| {
                let metadata_str = String::from_utf8_lossy(metadata_chunk);
                let served_str = String::from_utf8_lossy(served_chunk);

                for (metadata_line, served_line) in metadata_str.lines().zip(served_str.lines()) {
                    if let Ok(metadata) = serde_json::from_str::<Metadata>(metadata_line) {
                        let url_id = {
                            let mut url_map = url_map.write();
                            url_map.get_or_insert_url(metadata.url)
                        };

                        served_line
                            .unicode_words()
                            .par_bridge()
                            .map(|word| word.to_lowercase())
                            .for_each(|token| {
                                accumulator.add_token(token, url_id);
                            });
                    }
                }
            });
        println!("Finished processing chunks in {:?}", start_time.elapsed());

        // Merge accumulated tokens into the main index
        for entry in accumulator.tokens.iter() {
            let token = entry.key();
            let url_freqs = entry.value();
            self.index.insert(token.clone(), url_freqs.clone());
        }

        // Save both the index and URL map
        let index_num = CALL_COUNT.fetch_add(1, Ordering::SeqCst);
        let index_path = target_path.as_ref().join(format!("index_{}.bin", index_num));
        let url_map_path = target_path.as_ref().join(format!("url_map_{}.bin", index_num));

        // Save index
        let writer = BufWriter::with_capacity(1024 * 1024, File::create(index_path)?);
        bincode::serialize_into(writer, &self)?;

        // Save URL map
        url_map.read().save_to_disk(url_map_path)?;

        Ok(())
    }


    // searches through index to accumulate values
    fn search_with_scores(&self, phrase: &str, url_map: &UrlMap) -> Vec<(String, f64)> {
        let words: Vec<_> = phrase.split_whitespace().map(|w| w.to_lowercase()).collect();
        let doc_scores: DashMap<u32, f64> = DashMap::new();

        words.par_iter().for_each(|word| {
            if let Some(doc_freqs) = self.index.get(word) {
                for (&doc_id, term_freq) in doc_freqs {
                    doc_scores.entry(doc_id).and_modify(|score| {
                        *score += bm25_score(term_freq, doc_freqs.len() as u32, self.index.len() as u32)
                    }).or_insert_with(|| {
                        bm25_score(term_freq, doc_freqs.len() as u32, self.index.len() as u32)
                    });
                }
            }
        });

        // Convert IDs back to URLs
        let mut results: Vec<_> = doc_scores
            .into_iter()
            .filter_map(|(doc_id, score)| {
                url_map.get_url(doc_id)
                    .map(|url| (url.clone(), score))
            })
            .collect();

        results.par_sort_unstable_by(|a, b| b.1.partial_cmp(&a.1).unwrap_or(std::cmp::Ordering::Equal));
        results
    }
}

impl DistributedIndex {
    fn new() -> Self {
        Self {
            indexes: Vec::new(),
        }
    }

    // distributes bm25 evalution over document set
    fn process_all_directories<P: AsRef<Path>  + std::marker::Sync>(&mut self, base_path: P, target_path: P) -> Result<()> {
        let dir_entries: Vec<PathBuf> = fs::read_dir(base_path)?
            .filter_map(|entry| entry.ok())
            .map(|entry| entry.path())
            .filter(|path| path.is_dir())
            .collect();

        let start = std::time::Instant::now();
        let processed_indexes: Vec<InvertedIndex> = dir_entries
            .par_iter()
            .filter_map(|path| {
                let result = (|| -> Result<InvertedIndex> {
                    let mut index = InvertedIndex::new();
                    // Convert PathBuf to P using as_ref()
                    index.process_directory(path.as_ref(), target_path.as_ref())?;
                    Ok(index)
                })();

                result.ok()
            })
            .collect();
        

        let duration = start.elapsed();
        println!("Actually finished processing all the directories in {:?}", duration);
        
        
        

        println!("Finishing process_all_directories");
        Ok(())
    }

    fn save_to_disk(&self, base_path: &Path) -> Result<()> {
        for (i, index) in self.indexes.iter().enumerate() {
            println!("Saving index {} to disk", i);
            let index_path = base_path.join(format!("index_{}.bin", i));
            index.save_to_disk(&index_path)?;
        }
        Ok(())
    }


    // search through indices in parallel
    fn distributed_search(&self, base_path: &Path, phrase: &str) -> Vec<(String, f64)> {
            println!("Starting distributed search for phrase: {}", phrase);

            // Get all index and url map files
            let mut file_pairs: Vec<(PathBuf, PathBuf)> = Vec::new();
            
            if let Ok(entries) = fs::read_dir(base_path) {
                let mut index_files: Vec<PathBuf> = entries
                    .filter_map(|entry| entry.ok())
                    .map(|entry| entry.path())
                    .filter(|path| {
                        path.is_file() && 
                        path.file_name()
                            .and_then(|name| name.to_str())
                            .map(|name| name.starts_with("index_") && name.ends_with(".bin"))
                            .unwrap_or(false)
                    })
                    .collect();

                println!("Found {} index files", index_files.len());

                // Sort to ensure we match corresponding files correctly
                index_files.sort();

                for index_path in index_files {
                    if let Some(index_num) = index_path
                        .file_name()
                        .and_then(|name| name.to_str())
                        .and_then(|name| name.strip_prefix("index_"))
                        .and_then(|name| name.strip_suffix(".bin")) {
                        let url_map_path = base_path.join(format!("url_map_{}.bin", index_num));
                        if url_map_path.exists() {
                            file_pairs.push((index_path, url_map_path));
                        }
                    }
                }
            }

            println!("Found {} index/url map file pairs", file_pairs.len());

            let combined_scores: Arc<Mutex<HashMap<String, f64>>> = Arc::new(Mutex::new(HashMap::new()));

            file_pairs.par_iter().for_each(|(index_path, url_map_path)| {
                println!("Processing index file: {:?}", index_path);

                // Load both index and corresponding URL map
                if let (Ok(index), Ok(url_map)) = (
                    InvertedIndex::load_from_disk(index_path),
                    UrlMap::load_from_disk(url_map_path)
                ) {
                    let results = index.search_with_scores(phrase, &url_map);
                    
                    let mut scores = combined_scores.lock().unwrap();
                    for (url, score) in results {
                        *scores.entry(url).or_insert(0.0) += score;
                    }
                }
            });

            let mut final_results: Vec<_> = combined_scores
                .lock()
                .unwrap()
                .clone()
                .into_iter()
                .collect();

            println!("Found {} results for phrase: {}", final_results.len(), phrase);

            final_results.sort_by(|a, b| b.1.partial_cmp(&a.1).unwrap_or(std::cmp::Ordering::Equal));
            final_results
        }


    fn get_stats(&self) -> IndexStats {
        let total_indexes = self.indexes.len();
        let total_tokens: usize = self.indexes
            .iter()
            .map(|index| index.index.len())
            .sum();
        let total_documents: usize = self.indexes
            .iter()
            .flat_map(|index| {
                index.index.values()
                    .flat_map(|urls| urls.keys())
                    .collect::<HashSet<_>>()
            })
            .count();

        IndexStats {
            total_indexes,
            total_tokens,
            total_documents,
        }
    }
}

#[inline]
fn bm25_score(term_freq: &u32, doc_freq: u32, total_docs: u32) -> f64 {
    const K1: f64 = 1.2;
    const B: f64 = 0.75;
    const AVG_DOC_LEN: f64 = 1000.0;

    let tf = *term_freq as f64;
    let numerator = tf * (K1 + 1.0);
    let denominator = tf + K1 * (1.0 - B + B * AVG_DOC_LEN / 1000.0);
    let idf = ((total_docs as f64 - doc_freq as f64 + 0.5) / (doc_freq as f64 + 0.5)).ln();

    numerator / denominator * idf
}


fn main() -> Result<()> {
    let mut distributed_index = DistributedIndex::new();
    
    let source_dir = Path::new("/mnt/raid0/exa_index");
    let target_dir = Path::new("/mnt/raid0/inverted_index");

    // let start_time = std::time::Instant::now();
    // distributed_index.process_all_directories("/mnt/raid0/exa_index", "/mnt/raid0/inverted_index")?;
    // println!("Finished processing all directories in {:?}", start_time.elapsed());

    println!("Processed Index");


    // Example search

    let start = std::time::Instant::now();
    let results = distributed_index.distributed_search(target_dir, "learning algorithms");
    let duration = start.elapsed();

    println!("Search took: {:?}", duration);

    for (url, score) in results.iter().take(5) {
        println!("URL: {}, Score: {:.4}", url, score);
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_medium_load() -> Result<()> {
        let mut distributed_index = DistributedIndex::new();

        let start = std::time::Instant::now();
        let target_dir = Path::new("/mnt/raid0/full_inverted_index");
        distributed_index.process_all_directories("/home/ubuntu/fullexa_data", "/mnt/raid0/full_inverted_index")?;
        let duration = start.elapsed();
        println!("Time elapsed for process_all_directories: {:?}", duration);
        

        // Test saving index to disk

        let start = std::time::Instant::now();
        let results = distributed_index.distributed_search(target_dir, "learning algorithms");
        let duration = start.elapsed();     

        println!("Search took: {:?}", duration);
    
        for (url, score) in results.iter().take(5) {
            println!("URL: {}, Score: {:.4}", url, score);
        }
        


        Ok(())

    }

    #[test]
    fn search_existing_huge_index() -> Result<()> {

        let mut distributed_index = DistributedIndex::new();


        let start = std::time::Instant::now();
        let results = distributed_index.distributed_search(target_dir, "learning algorithms");
        let duration = start.elapsed();
    
        println!("Search took: {:?}", duration);
    
        for (url, score) in results.iter().take(5) {
            println!("URL: {}, Score: {:.4}", url, score);
        }
    
        Ok(())

    }
}
