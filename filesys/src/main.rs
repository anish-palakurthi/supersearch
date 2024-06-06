use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use walkdir::WalkDir;
use regex::Regex;
use rayon::prelude::*;
use std::sync::{Arc, Mutex};
use std::time::{SystemTime, Duration, Instant};
use serde::{Serialize, Deserialize};
use std::fs::File;
use std::io::prelude::*;

#[derive(Serialize, Deserialize, Debug, Clone)]
struct FileIndex {
    path: String,
    content: Option<String>,
}

fn save_file_paths(file_paths: &Vec<PathBuf>, filename: &str) -> std::io::Result<()> {
    let paths: Vec<String> = file_paths.iter().map(|p| p.to_string_lossy().to_string()).collect();
    let json = serde_json::to_string(&paths)?;
    let mut file = File::create(filename)?;
    file.write_all(json.as_bytes())?;
    Ok(())
}

fn load_file_paths(filename: &str) -> std::io::Result<Vec<PathBuf>> {
    let mut file = File::open(filename)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    let paths: Vec<String> = serde_json::from_str(&contents)?;
    Ok(paths.iter().map(|p| PathBuf::from(p)).collect())
}

fn bm25_score(doc_len: f64, avg_doc_len: f64, term_freq: f64, doc_freq: f64, num_docs: f64) -> f64 {
    let k1 = 1.5;
    let b = 0.75;
    let idf = ((num_docs - doc_freq + 0.5) / (doc_freq + 0.5)).ln();
    let tf = (term_freq * (k1 + 1.0)) / (term_freq + k1 * (1.0 - b + b * (doc_len / avg_doc_len)));
    idf * tf
}

fn index_files_from_root(root: &str, max_size: u64, keyword: &str) -> (HashMap<String, FileIndex>, Vec<(f64, f64)>) {
    let file_paths: Vec<PathBuf> = WalkDir::new(root)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|entry| entry.file_type().is_file())
        .map(|entry| entry.path().to_path_buf())
        .collect();

    let now = SystemTime::now();
    let last_30_days = now - Duration::from_secs(7 * 24 * 60 * 60);
    let re = Regex::new(keyword).unwrap();

    let file_metadata = Arc::new(Mutex::new(vec![]));
    let index: HashMap<String, FileIndex> = file_paths
        .par_iter()
        .filter_map(|path| {
            let path_str = path.to_string_lossy().to_string();
            if let Ok(metadata) = fs::metadata(&path) {
                let accessed_recently = metadata.accessed()
                    .map(|time| time > last_30_days)
                    .unwrap_or(false);

                if accessed_recently && metadata.len() <= max_size {
                    if let Ok(content) = fs::read_to_string(&path) {
                        let file_index = FileIndex {
                            path: path_str.clone(),
                            content: Some(content.clone()),
                        };
                        let doc_len = content.len() as f64;
                        let term_freq = re.find_iter(&content).count() as f64;
                        {
                            let mut file_metadata = file_metadata.lock().unwrap();
                            file_metadata.push((doc_len, term_freq));
                        }
                        Some((path_str.clone(), file_index))
                    } else {
                        Some((path_str.clone(), FileIndex {
                            path: path_str.clone(),
                            content: None,
                        }))
                    }
                } else {
                    None
                }
            } else {
                None
            }
        })
        .collect();

    let file_metadata = Arc::try_unwrap(file_metadata).unwrap().into_inner().unwrap();
    (index, file_metadata)
}

fn rank_files_by_bm25(index: &HashMap<String, FileIndex>, keyword: &str, file_metadata: &[(f64, f64)]) -> Vec<(FileIndex, f64)> {
    let re = Regex::new(keyword).unwrap();
    let num_docs = file_metadata.len() as f64;
    let avg_doc_len: f64 = file_metadata.iter().map(|(len, _)| *len).sum::<f64>() / num_docs;
    let doc_freq: f64 = file_metadata.iter().filter(|(_, term_freq)| *term_freq > 0.0).count() as f64;

    let mut results = vec![];

    for (file_index, (doc_len, term_freq)) in index.values().zip(file_metadata.iter()) {
        if *term_freq > 0.0 {
            let score = bm25_score(*doc_len, avg_doc_len, *term_freq, doc_freq, num_docs);
            results.push((file_index.clone(), score));
        }
    }

    results.sort_by(|a, b| b.1.partial_cmp(&a.1).unwrap());
    results.into_iter().take(3).collect()
}

fn do_it(keyword: &str, root: &str) -> Vec<(FileIndex, f64)> {
    let max_size = 1024 * 1024;
    let filepath_cache = "filepaths.json";

    rayon::ThreadPoolBuilder::new().num_threads(10).build_global().unwrap();

    let file_paths = if PathBuf::from(filepath_cache).exists() {
        let paths = load_file_paths(filepath_cache).unwrap_or_else(|_| {
            println!("Failed to load cached file paths. Reindexing...");
            Vec::new()
        });
        paths
    } else {
        Vec::new()
    };

    let (index, file_metadata) = if file_paths.is_empty() {
        let (index, file_metadata) = index_files_from_root(root, max_size, &keyword);
        let paths: Vec<PathBuf> = index.keys().map(PathBuf::from).collect();
        save_file_paths(&paths, filepath_cache).expect("Failed to save file paths");
        (index, file_metadata)
    } else {
        let (index, file_metadata) = index_files_from_root(root, max_size, &keyword);
        let paths: Vec<PathBuf> = index.keys().map(PathBuf::from).collect();
        save_file_paths(&paths, filepath_cache).expect("Failed to save file paths");
        (index, file_metadata)
    };

    let results = rank_files_by_bm25(&index, &keyword, &file_metadata);
    results
}

fn main() {
    let keyword = "words words to search";
    let root = "/Users/adityarai/Documents";
    let results = do_it(keyword, root);
    for (file_index, score) in results {
        println!("Score: {}", score);
        println!("Path: {}", file_index.path);
    }
}
