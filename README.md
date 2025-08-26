# Simple Translator App

This is a simple web-based translator application created using HTML, CSS, and JavaScript. It uses the [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php), which is a free, public API for translations.

## Features

-   **Translate Text**: Enter text in the left text area to get the translation in the right text area.
-   **Language Selection**: Choose from a list of source and target languages.
-   **Handles Long Text**: Automatically splits text longer than 500 characters into smaller chunks for translation.

## How to Use

1.  **Open the `index.html` file** in any modern web browser.
2.  **Enter the text** you want to translate in the left text box.
3.  **Select the source language** from the top dropdown menu.
4.  **Select the target language** from the bottom dropdown menu.
5.  **Click the "Translate" button**. The translated text will appear in the right text box.

## API Used

This application uses the [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php). It is a free API and does not require an API key for basic use.

**API Endpoint:** `https://api.mymemory.translated.net/get`

**Parameters Used:**
-   `q`: The text to be translated.
-   `langpair`: The language pair, e.g., `en|it` for English to Italian.

## Limitations

-   The MyMemory API has a limit of 500 characters per request. This application works around this by splitting longer texts into multiple requests.
-   As it's a free API, the translation quality may vary.
-   There is no formal rate limiting, but it's intended for reasonable personal use.
