use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use walkdir::WalkDir;
use regex::Regex;
use rayon::prelude::*;
use std::time::{SystemTime, Duration, Instant};
use serde::{Serialize, Deserialize};
use std::fs::File;
use std::io::prelude::*;

#[derive(Serialize, Deserialize, Debug)]
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

fn index_files_from_root(root: &str, max_size: u64) -> HashMap<String, FileIndex> {
    let file_paths: Vec<PathBuf> = WalkDir::new(root)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|entry| entry.file_type().is_file())
        .map(|entry| entry.path().to_path_buf())
        .collect();

    let now = SystemTime::now();
    let last_30_days = now - Duration::from_secs(30 * 24 * 60 * 60);

    file_paths
        .par_iter()
        .filter_map(|path| {
            let path_str = path.to_string_lossy().to_string();
            if let Ok(metadata) = fs::metadata(&path) {
                let accessed_recently = metadata.accessed()
                    .map(|time| time > last_30_days)
                    .unwrap_or(false);

                if accessed_recently && metadata.len() <= max_size {
                    if let Ok(content) = fs::read_to_string(&path) {
                        Some((path_str.clone(), FileIndex {
                            path: path_str.clone(),
                            content: Some(content),
                        }))
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
        .collect()
}

fn search_index<'a>(index: &'a HashMap<String, FileIndex>, keyword: &'a str) -> Vec<&'a FileIndex> {
    let re = Regex::new(keyword).unwrap();
    index.values()
        .filter(|file_index| {
            if let Some(ref content) = file_index.content {
                re.is_match(content)
            } else {
                false
            }
        })
        .collect()
}

fn bm25_score(doc_len: f64, avg_doc_len: f64, term_freq: f64, doc_freq: f64, num_docs: f64) -> f64 {
    let k1 = 1.5;
    let b = 0.75;
    let idf = ((num_docs - doc_freq + 0.5) / (doc_freq + 0.5)).ln();
    let tf = (term_freq * (k1 + 1.0)) / (term_freq + k1 * (1.0 - b + b * (doc_len / avg_doc_len)));
    idf * tf
}

fn rank_files_by_bm25<'a>(files: Vec<&'a FileIndex>, keyword: &'a str, num_docs: f64) -> Vec<(&'a FileIndex, f64)> {
    let re = Regex::new(keyword).unwrap();
    let mut doc_lengths = Vec::new();
    let mut doc_freq = 0.0;

    for file in &files {
        if let Some(ref content) = file.content {
            let doc_len = content.len() as f64;
            doc_lengths.push(doc_len);
            if re.is_match(content) {
                doc_freq += 1.0;
            }
        }
    }

    let avg_doc_len: f64 = doc_lengths.iter().sum::<f64>() / doc_lengths.len() as f64;

    files.into_iter()
        .filter_map(|file_index| {
            if let Some(ref content) = file_index.content {
                let doc_len = content.len() as f64;
                let term_freq = re.find_iter(content).count() as f64;
                if term_freq > 0.0 {
                    let score = bm25_score(doc_len, avg_doc_len, term_freq, doc_freq, num_docs);
                    Some((file_index, score))
                } else {
                    None
                }
            } else {
                None
            }
        })
        .collect::<Vec<(&FileIndex, f64)>>()
}

fn main() {
    let root = "/Users/adityarai/Documents";
    let max_size = 1024 * 1024;
    let filepath_cache = "filepaths.json";

    rayon::ThreadPoolBuilder::new().num_threads(10).build_global().unwrap();

    let start = Instant::now();
    let file_paths = if PathBuf::from(filepath_cache).exists() {
        let load_start = Instant::now();
        let paths = load_file_paths(filepath_cache).unwrap_or_else(|_| {
            Vec::new()
        });
        paths
    } else {
        Vec::new()
    };

    let indexing_start = Instant::now();
    let index = if file_paths.is_empty() {
        let index = index_files_from_root(root, max_size);
        let paths: Vec<PathBuf> = index.keys().map(PathBuf::from).collect();
        save_file_paths(&paths, filepath_cache).expect("Failed to save file paths");
        index
    } else {
        let now = SystemTime::now();
        let last_30_days = now - Duration::from_secs(30 * 24 * 60 * 60);

        file_paths.par_iter()
            .filter_map(|path| {
                let path_str = path.to_string_lossy().to_string();
                if let Ok(metadata) = fs::metadata(&path) {
                    let accessed_recently = metadata.accessed()
                        .map(|time| time > last_30_days)
                        .unwrap_or(false);

                    if accessed_recently && metadata.len() <= max_size {
                        if let Ok(content) = fs::read_to_string(&path) {
                            Some((path_str.clone(), FileIndex {
                                path: path_str.clone(),
                                content: Some(content),
                            }))
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
            .collect()
    };

    let search_start = Instant::now();
    let keyword = "words words words";
    let results = search_index(&index, keyword);

    let ranking_start = Instant::now();
    let mut ranked_results = rank_files_by_bm25(results, keyword, index.len() as f64);
    ranked_results.sort_by(|a, b| b.1.partial_cmp(&a.1).unwrap());
    let top_results = ranked_results.into_iter().take(3).collect::<Vec<_>>();
    for (file, score) in top_results {
        println!("File: {}, Score: {:.4}", file.path, score);
    }
}