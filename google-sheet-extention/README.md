# Google Sheets Translator Add-on

This folder contains the files to create a simple translator add-on for Google Sheets.

## Features

-   **Translate Entire Sheets**: Translate the content of one or more selected sheets.
-   **Language Selection**: Choose the source and target languages for the translation.
-   **Creates New Sheets**: Saves the translated content to newly created sheets, named with a `_translated` suffix.
-   **Handles Large Sheets**: Translates sheets in chunks to avoid exceeding Google's script execution time limits.
-   **Handles Long Text**: Automatically splits text longer than 500 characters into smaller chunks for translation.

## Files

-   `code.js`: Contains the Google Apps Script code that handles the backend logic, including the API call for translation.
-   `sidebar.html`: The HTML and JavaScript for the sidebar user interface.

## How to Install and Use

1.  **Open a Google Sheet**: Go to [sheets.google.com](https://sheets.google.com) and open a new or existing spreadsheet.
2.  **Open the Script Editor**: Go to `Extensions > Apps Script`.
3.  **Copy the Code**:
    *   Copy the entire content of `code.js` and paste it into the `Code.gs` file in the Apps Script editor (you can rename `Code.gs` if you like).
    *   Click the `+` icon in the "Files" list and select "HTML". Name the new file `sidebar` (without the `.html` extension).
    *   Copy the entire content of `sidebar.html` and paste it into the new `sidebar.html` file you just created.
4.  **Save the Project**: Click the save icon (floppy disk).
5.  **Run the `onOpen` function**: Select the `onOpen` function from the dropdown menu at the top and click "Run". You may be asked to authorize the script. Follow the prompts to grant the necessary permissions.
6.  **Refresh your Google Sheet**: Go back to your spreadsheet and refresh the page.
7.  **Use the Translator**: You should now see a new "Translator" menu in your Google Sheet. Click on it and select "Show Translator" to open the sidebar and start translating.
