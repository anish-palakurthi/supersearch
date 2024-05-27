use rusqlite::{params, Connection};
use std::fs;
use std::time::Instant;
use thiserror::Error;

#[derive(Error, Debug)]
enum CustomError {
    #[error("IO error")]
    IoError(#[from] std::io::Error),
    #[error("Rusqlite error")]
    RusqliteError(#[from] rusqlite::Error),
}

type Result<T> = std::result::Result<T, CustomError>;

fn get_firefox_data() -> Result<()> {
    let start_time = Instant::now();

    // Path to the Firefox profiles directory
    let firefox_profiles_path = "/Users/anishpalakurthi/library/Application Support/Firefox/Profiles/";
    if !std::path::Path::new(firefox_profiles_path).exists() {
        println!("Firefox profiles directory not found at {}", firefox_profiles_path);
        return Ok(());
    }

    // Locate the default profile directory
    let profile_dir = std::fs::read_dir(firefox_profiles_path)?
        .filter_map(|entry| entry.ok())
        .find(|entry| entry.file_name().to_str().map(|s| s.ends_with(".default-release-1")).unwrap_or(false))
        .map(|entry| entry.path());

    if profile_dir.is_none() {
        println!("Default Firefox profile not found.");
        return Ok(());
    }

    let profile_dir = profile_dir.unwrap();
    let places_path = profile_dir.join("places.sqlite");

    // Check if the places.sqlite file exists
    if !places_path.exists() {
        println!("places.sqlite file not found at {:?}", places_path);
        return Ok(());
    }

    // Create a temporary copy of the places.sqlite file to avoid issues with file locking
    let temp_places_path = std::env::temp_dir().join("firefox_places.sqlite");
    fs::copy(&places_path, &temp_places_path)?;

    let copy_time = Instant::now();

    // Connect to the temporary SQLite database
    let conn = Connection::open(&temp_places_path)?;

    // Query the bookmarks
    let mut stmt = conn.prepare(
        "SELECT moz_bookmarks.title, moz_places.url 
         FROM moz_bookmarks 
         JOIN moz_places ON moz_bookmarks.fk = moz_places.id 
         WHERE moz_bookmarks.title IS NOT NULL 
         ORDER BY moz_bookmarks.dateAdded DESC 
         LIMIT 100"
    )?;
    let bookmark_rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    })?;

    println!("Bookmarks:");
    for row in bookmark_rows {
        let (title, url) = row?;
        println!("Title: {}", title);
        println!("URL: {}", url);
        println!("{}", "-".repeat(40));
    }

    let bookmark_time = Instant::now();

    // Query the history
    let mut stmt = conn.prepare(
        "SELECT url, title, visit_count, datetime(last_visit_date/1000000, 'unixepoch', 'localtime') as last_visit 
         FROM moz_places 
         ORDER BY last_visit_date DESC 
         LIMIT 30"
    )?;
    let history_rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?, row.get::<_, i32>(2)?, row.get::<_, String>(3)?))
    })?;

    println!("\nHistory:");
    for row in history_rows {
        let (url, title, visit_count, last_visit) = row?;
        println!("URL: {}", url);
        println!("Title: {}", title);
        println!("Visit Count: {}", visit_count);
        println!("Last Visit: {}", last_visit);
        println!("{}", "-".repeat(40));
    }

    let query_time = Instant::now();

    // Clean up temporary file
    fs::remove_file(temp_places_path)?;

    let end_time = Instant::now();

    println!("\nTiming:");
    println!("Total time: {:.2?} seconds", end_time.duration_since(start_time));
    println!("Time to copy file: {:.2?} seconds", copy_time.duration_since(start_time));
    println!("Time to query and print bookmarks: {:.2?} seconds", bookmark_time.duration_since(copy_time));
    println!("Time to query and print history: {:.2?} seconds", query_time.duration_since(bookmark_time));
    println!("Time to clean up: {:.2?} seconds", end_time.duration_since(query_time));

    Ok(())
}

fn main() -> Result<()> {
    get_firefox_data()
}
