# LogsFast

A simple library for logging messages and saving them to `localStorage`.

## 📖 Table of Contents

- [Available Methods](#available-methods)
  - [log](#1-logparams-ilog-void)
  - [saveLogLocalStorage](#2-saveloglocalstorageparams-ilog-void)
  - [downloadLog](#3-downloadlogformat-iformatdownload-void)
- [Usage](#usage)

## Available Methods

### 1. `log(params: I.Log): void`

Logs a message to the console with date/time and optionally saves it to `localStorage`.

**Parameters**:

- **params**: Object containing log details.
  - **type**: Log type (information, error, warning, etc.).
  - **message**: Message to be logged.
  - **save (optional)**: Boolean to determine if the log should be saved to `localStorage` or not.

### 2. `saveLogLocalStorage(params: I.Log): void`

Saves a log message directly to `localStorage`.

**Parameters**:

- **params**: Object containing log details.
  - **type**: Log type.
  - **message**: Message to be logged.

### 3. `downloadLog(format: I.FormatDownload): void`

Allows downloading the logs saved in `localStorage` in different formats.

**Parameters**:

- **format**: File format for download (`text`, `json`, `pdf`).

## Usage

```javascript
import { logsFast } from "logs-frontend";

// Log an informational message to the console
logsFast.log({
  type: "info",
  message: "This is an informational message.",
  save: true, // Saves the message to localStorage
});

// Download the logs in text format
logsFast.downloadLog("text");
```
