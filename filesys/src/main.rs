use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use walkdir::WalkDir;
use regex::Regex;
use rayon::prelude::*;
use std::time::{SystemTime, Duration};

struct FileIndex {
    path: String,
    content: Option<String>,
}

fn index_files_from_root(root: &str, max_size: u64) -> HashMap<String, FileIndex> {
    let file_paths: Vec<PathBuf> = WalkDir::new(root)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|entry| entry.file_type().is_file())
        .map(|entry| entry.path().to_path_buf())
        .collect();

    file_paths
        .par_iter()
        .map(|path| {
            let path_str = path.to_string_lossy().to_string();
            let now = SystemTime::now();
            let last_30_days = now - Duration::from_secs(30 * 24 * 60 * 60);
            let file_index = if let Ok(metadata) = fs::metadata(&path) {
                let accessed_recently = metadata.accessed()
                    .map(|time| time > last_30_days)
                    .unwrap_or(false);
                if metadata.len() <= max_size {
                    if let Ok(content) = fs::read_to_string(&path) {
                        FileIndex {
                            path: path_str.clone(),
                            content: Some(content),
                        }
                    } else {
                        FileIndex {
                            path: path_str.clone(),
                            content: None,
                        }
                    }
                } else {
                    FileIndex {
                        path: path_str.clone(),
                        content: None,
                    }
                }
            } else {
                FileIndex {
                    path: path_str.clone(),
                    content: None,
                }
            };
            (path_str, file_index)
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

    rayon::ThreadPoolBuilder::new().num_threads(10).build_global().unwrap();

    let index = index_files_from_root(root, max_size);
    println!("Number of files indexed: {}", index.len());

    let keyword = "words words words";
    let results = search_index(&index, keyword);

    let ranked_results = rank_files_by_bm25(results, keyword, index.len() as f64);

    println!("Ranked files:");
    for (file, score) in ranked_results {
        println!("File: {}, Score: {:.4}", file.path, score);
    }
}
