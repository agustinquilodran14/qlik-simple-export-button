# Qlik Cloud - Simple Direct Export Button 📥

An open-source, ultra-lightweight "micro" extension for Qlik Sense and Qlik Cloud SaaS that allows exporting any table to Excel or CSV with a single click, forcing a direct download in the browser.

Unlike heavy commercial extensions, this solution uses **pure Javascript (Vanilla JS)** and Qlik's native `Enigma.js` API. It relies on zero third-party libraries (no dependencies), making it incredibly fast, secure, and future-proof against Qlik platform updates.

## ✨ Features

* **Direct Download (Blob):** Forces native browser download, bypassing the default Qlik server behavior that assigns random alphanumeric names to exported files.
* **Automatic Timestamps:** Automatically appends the current date and time to the downloaded file (e.g., `My_Report_20260610_174530.xlsx`) to prevent file overwriting and maintain a clean chronological order.
* **100% Customizable:** Directly from the native Qlik properties panel, you can configure:
  * Target Table / Object ID.
  * Export Format (Excel OOXML or CSV).
  * Button Text (supports Emojis and Unicode symbols like 📥, ⬇️).
  * Base File Name.
  * Button Color (via Hex code, perfect for corporate branding guidelines).
* **Respects Active Selections:** The export perfectly mirrors the native right-click export, keeping all active user selections and filters applied.

## 🚀 Installation

1. Download the `.zip` file from this repository (or compress the `.js` and `.qext` files into a ZIP archive yourself).
2. Go to the Management Console in your Qlik Cloud or Qlik Sense Enterprise environment.
3. Navigate to the **Extensions** section and click **Add**.
4. Upload the `.zip` file.

## 🛠️ How to use it in your App

1. Open your Qlik application and enter **Edit Sheet** mode.
2. Get the **Object ID** of the table you want to export. (Right-click on the target table -> Share -> Embed -> Copy the Object ID).
3. Drag and drop the extension from the "Custom Objects" menu onto your sheet.
4. In the right-hand properties panel, paste the Object ID into the corresponding field.
5. Customize the file name, export format, button text, and background color as needed.
6. Done! Your users can now export data seamlessly.

## 👨‍💻 Author
Created as a lightweight contribution to the Qlik developer community. 
Powered by the native Qlik API (`app.model.engineApp.getObject().exportData()`).
