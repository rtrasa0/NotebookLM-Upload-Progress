# Gemini Notebook Upload Progress

A lightweight Chrome extension that displays the upload progress percentage and file size when uploading sources to NotebookLM. Never wonder if your large file is still uploading again!

## ✨ Features

- 📊 Shows real-time upload percentage
- 📦 Displays uploaded size and total size (e.g., 11.0/40.8 MB)
- 🎨 Minimal and non-intrusive UI in the bottom-right corner
- 🔒 No data collection, no tracking, completely offline
- ⚡ Built with vanilla JavaScript (no external dependencies)

## 🚀 Installation (Manual / Developer Mode)

Since this extension is not yet on the Chrome Web Store, you can install it manually using Developer Mode.

1. **Download the code:**
   - Click the green **Code** button at the top of this repository.
   - Select **Download ZIP**.
2. **Extract the ZIP file** to a folder on your computer.
3. **Open Chrome Extensions:**
   - Go to `chrome://extensions` in your browser.
4. **Enable Developer Mode:**
   - Toggle the switch in the top-right corner to **ON**.
5. **Load the extension:**
   - Click the **Load unpacked** button.
   - Select the folder you extracted in step 2.
6. **Done!** Go to [Gemini Notebook](https://notebook.google.com) and upload a file. You will see the progress indicator in the bottom-right corner.

> **Note:** When using Developer Mode, Chrome may show a warning on startup saying "Disable developer mode extensions". This is normal and safe to ignore.

## 🛠 How It Works

The extension injects a script into the NotebookLM page that intercepts `XMLHttpRequest` calls. When an upload starts, it listens to the `upload.onprogress` event and sends the progress data back to a content script, which updates a small UI element on the screen.

- `manifest.json`: Extension configuration (Manifest V3)
- `content.js`: Injects the interceptor and handles UI updates
- `injected.js`: Intercepts XHR requests and listens for upload progress

## 🔒 Privacy

This extension does **not** collect, store, or transmit any user data. All processing happens locally in your browser. It only reads the upload progress of requests made to NotebookLM.

## ⭐ Support

If you find this extension useful, please consider giving it a star on GitHub!
