import os
import shutil
import sqlite3
from datetime import datetime
import time

def get_firefox_data():
    start_time = time.time()

    # Get the home directory
    # home_dir = os.path.expanduser("~")

    # Path to the Firefox profiles directory
    firefox_profiles_path = "/Users/anishpalakurthi/library/Application Support/Firefox/Profiles/"
    if not os.path.exists(firefox_profiles_path):
        print(f"Firefox profiles directory not found at {firefox_profiles_path}")
        return

    # Locate the default profile directory
    profile_dir = None
    for dir_name in os.listdir(firefox_profiles_path):
        if dir_name.endswith(".default-release-1"):
            profile_dir = os.path.join(firefox_profiles_path, dir_name)
            break
    
    if not profile_dir:
        print("Default Firefox profile not found.")
        return

    # Path to the places.sqlite file
    places_path = os.path.join(profile_dir, "places.sqlite")

    # Check if the places.sqlite file exists
    if not os.path.exists(places_path):
        print(f"places.sqlite file not found at {places_path}")
        return

    # Create a temporary copy of the places.sqlite file to avoid issues with file locking
    temp_places_path = "/tmp/firefox_places.sqlite"
    shutil.copy2(places_path, temp_places_path)

    copy_time = time.time()

    # Connect to the temporary SQLite database
    conn = sqlite3.connect(temp_places_path)
    cursor = conn.cursor()

    # Query the bookmarks
    cursor.execute("""
        SELECT moz_bookmarks.title, moz_places.url 
        FROM moz_bookmarks 
        JOIN moz_places ON moz_bookmarks.fk = moz_places.id 
        WHERE moz_bookmarks.title IS NOT NULL 
        ORDER BY moz_bookmarks.dateAdded DESC 
        LIMIT 100
    """)

    # Fetch and print the bookmark results
    bookmark_rows = cursor.fetchall()
    print("Bookmarks:")
    for row in bookmark_rows:
        print(f"Title: {row[0]}")
        print(f"URL: {row[1]}")
        print("-" * 40)

    bookmark_time = time.time()

    # Query the history
    cursor.execute("""
        SELECT url, title, visit_count, datetime(last_visit_date/1000000, 'unixepoch', 'localtime') as last_visit 
        FROM moz_places 
        ORDER BY last_visit_date DESC 
        LIMIT 30
    """)

    # Fetch and print the history results
    history_rows = cursor.fetchall()
    print("\nHistory:")
    for row in history_rows:
        print(f"URL: {row[0]}")
        print(f"Title: {row[1]}")
        print(f"Visit Count: {row[2]}")
        print(f"Last Visit: {row[3]}")
        print("-" * 40)

    query_time = time.time()

    # Clean up temporary file
    conn.close()
    os.remove(temp_places_path)

    end_time = time.time()

    print("\nTiming:")
    print(f"Total time: {end_time - start_time:.2f} seconds")
    print(f"Time to copy file: {copy_time - start_time:.2f} seconds")
    print(f"Time to query and print bookmarks: {bookmark_time - copy_time:.2f} seconds")
    print(f"Time to query and print history: {query_time - bookmark_time:.2f} seconds")
    print(f"Time to clean up: {end_time - query_time:.2f} seconds")

if __name__ == "__main__":
    get_firefox_data()
