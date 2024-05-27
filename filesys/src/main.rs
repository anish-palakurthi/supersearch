use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use walkdir::WalkDir;
use regex::Regex;

struct FileIndex {
    path: String,
    content: Option<String>,
}

fn get_file_paths(root: &str) -> Vec<PathBuf> {
    let mut file_paths = Vec::new();
    for entry in WalkDir::new(root).into_iter().filter_map(|e| e.ok()) {
        if entry.file_type().is_file() {
            file_paths.push(entry.path().to_path_buf());
        }
    }
    file_paths
}

fn index_files(file_paths: Vec<PathBuf>, max_size: u64) -> HashMap<String, FileIndex> {
    let mut index = HashMap::new();
    for path in file_paths {
        if let Ok(metadata) = fs::metadata(&path) {
            if metadata.is_file() {
                if metadata.len() <= max_size {
                    if let Ok(content) = fs::read_to_string(&path) {
                        let file_index = FileIndex {
                            path: path.to_string_lossy().to_string(),
                            content: Some(content),
                        };
                        index.insert(path.to_string_lossy().to_string(), file_index);
                    }
                } else {
                    let file_index = FileIndex {
                        path: path.to_string_lossy().to_string(),
                        content: None,
                    };
                    index.insert(path.to_string_lossy().to_string(), file_index);
                }
            }
        }
    }
    index
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

fn main() {
    let root = "/Users/adityarai/Documents";
    let max_size = 1024 * 1024;

    let file_paths = get_file_paths(root);
    println!("Number of files: {}", file_paths.len());

    let index = index_files(file_paths, max_size);
    let keyword = "words words words";
    let results = search_index(&index, keyword);

    for result in results {
        println!("Found in file: {}", result.path);
    }
}
