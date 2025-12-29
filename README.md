
# AI Article Summarizer

AI Article Summarizer is a Chrome extension that uses Google Gemini to generate summaries of web articles directly from your browser. It can produce brief summaries, detailed explanations, or bullet-point highlights from the currently open webpage.

---

## Features

* Summarize any article or webpage with one click
* Multiple summary formats:

  * Brief summary (2–3 sentences)
  * Detailed summary
  * Bullet-point summary
* Uses Google Gemini AI for high-quality summaries
* Copy summary to clipboard instantly
* Lightweight and fast
* API key stored securely using Chrome storage

---

## How It Works

1. The extension extracts readable text from the active webpage.
2. The extracted content is sent to Google Gemini’s API.
3. Gemini generates a summary based on the selected summary type.
4. The summary is displayed in the popup and can be copied easily.

---

## Setup Instructions

### Step 1: Get a Gemini API Key

1. Go to Google AI Studio
   [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Create a new API key.
3. Copy the API key.

---

### Step 2: Load the Extension in Chrome

1. Open Chrome and go to:
   `chrome://extensions`
2. Enable **Developer Mode** (top right).
3. Click **Load unpacked**.
4. Select the folder containing the extension files.

---

### Step 3: Save the API Key

1. After installing, the extension will open the settings page automatically.
2. Paste your Gemini API key.
3. Click **Save Settings**.
4. The tab will close automatically once saved.

---

## How to Use the Extension

1. Open any article or webpage you want to summarize.
2. Click the **AI Article Summarizer** extension icon.
3. Select a summary type:

   * Brief
   * Detailed
   * Bullet points
4. Click **Summarize This Page**.
5. Wait a few seconds for the summary to appear.
6. Click **Copy Summary** to copy the text.

---

## Supported Pages

* News articles
* Blog posts
* Documentation pages
* Most text-heavy websites

Note: Some pages like PDFs, Google Docs, or highly dynamic sites may not work properly.

---

## Technologies Used

* JavaScript
* Chrome Extensions (Manifest V3)
* Google Gemini API
* HTML and CSS

---

## Project Structure

* `manifest.json` – Extension configuration
* `popup.html` – Extension popup UI
* `popup.js` – Popup logic and API calls
* `content.js` – Extracts article text from webpages
* `background.js` – Handles install events
* `options.html` – API key setup page
* `options.js` – Saves API key
* `icon.png` – Extension icon

---

## Notes

* The extension requires an active internet connection.
* API usage depends on your Google Gemini quota.
* Always reload the extension after making code changes.
