import os
import shutil
import sqlite3
from datetime import datetime

def get_arc_data():
    # Get the home directory
    home_dir = os.path.expanduser("~")

    # Path to the Arc user data directory (you might need to adjust this path)
    arc_user_data_path = os.path.join(home_dir, "Library", "Application Support", "Arc", "Default")
    if not os.path.exists(arc_user_data_path):
        print(f"Arc user data directory not found at {arc_user_data_path}")
        return

    # Path to the History and Bookmarks files
    history_path = os.path.join(arc_user_data_path, "History")
    bookmarks_path = os.path.join(arc_user_data_path, "Bookmarks")

    # Check if the history file exists
    if not os.path.exists(history_path):
        print(f"History file not found at {history_path}")
        return

    # Create a temporary copy of the history file to avoid issues with file locking
    temp_history_path = "/tmp/arc_history.sqlite"
    shutil.copy2(history_path, temp_history_path)

    # Connect to the temporary SQLite database for history
    conn = sqlite3.connect(temp_history_path)
    cursor = conn.cursor()

    # Query the history database
    cursor.execute("""
        SELECT url, title, visit_count, datetime(last_visit_time/1000000-11644473600, 'unixepoch', 'localtime') as last_visit 
        FROM urls 
        ORDER BY last_visit_time DESC 
        LIMIT 100
    """)

    # Fetch and print the history results
    history_rows = cursor.fetchall()
    print("History:")
    for row in history_rows:
        print(f"URL: {row[0]}")
        print(f"Title: {row[1]}")
        print(f"Visit Count: {row[2]}")
        print(f"Last Visit: {row[3]}")
        print("-" * 40)

    # Read and print the bookmarks (stored as JSON)
    if os.path.exists(bookmarks_path):
        import json
        with open(bookmarks_path, 'r', encoding='utf-8') as f:
            bookmarks_data = json.load(f)

        def print_bookmarks(bookmarks, level=0):
            for bookmark in bookmarks:
                if 'children' in bookmark:
                    print_bookmarks(bookmark['children'], level + 1)
                else:
                    print(f"{'  ' * level}Title: {bookmark.get('name', 'N/A')}")
                    print(f"{'  ' * level}URL: {bookmark.get('url', 'N/A')}")
                    print(f"{'-' * 40}")

        print("Bookmarks:")
        if 'roots' in bookmarks_data:
            for key in bookmarks_data['roots']:
                print_bookmarks(bookmarks_data['roots'][key].get('children', []))

    # Clean up temporary file
    conn.close()
    os.remove(temp_history_path)

if __name__ == "__main__":
    get_arc_data()
