on run argv
    set posixFilePath to item 1 of argv
    try
        set hfsFilePath to POSIX file posixFilePath as alias
        tell application "Finder"
            open hfsFilePath
        end tell
    on error errMsg number errNum
        display dialog "Error: " & errMsg & " (" & errNum & ")"
    end try
end run
