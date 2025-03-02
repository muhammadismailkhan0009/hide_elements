# Hide Elements - Chrome Extension

A simple Chrome extension that allows you to **hide elements on websites permanently**. The hidden elements are stored **locally** per domain, ensuring that they remain hidden every time you visit the site.

---

## 🚀 Features
✅ **Select & Hide Elements** – Click on any element to hide it permanently.  
✅ **Per-Site Storage** – Hidden elements are saved for each website separately.  
✅ **Automatic Hiding** – On every page load, the extension checks stored data and hides selected elements.  
✅ **Easy Reset** – Click the "Clear" button to remove hidden elements for the current domain.  

---

## 🛠️ How It Works
1. Click the **extension button** in the toolbar.
2. Select the **element you want to hide** on the page.
3. The extension **stores the hidden element** in local storage, linked to the website’s domain.
4. On future visits to the site, the extension **automatically hides those elements**.
5. To **remove hidden elements**, click the "Clear" button in the extension popup.  
   - This will **only remove hidden elements for the current domain**, leaving other sites unaffected.

---

## 🔧 Installation Guide (Manual Install)
Since this extension is not published on the Chrome Web Store, you need to install it manually.

### **Follow these steps:**
1️⃣ **Download the ZIP file** from the GitHub repository.  
2️⃣ **Unzip the file** into a folder on your computer.  
3️⃣ Open **Chrome** and go to `chrome://extensions/`.  
4️⃣ **Enable Developer Mode** (toggle in the top-right corner).  
5️⃣ Click **"Load Unpacked"** in the top-left corner.  
6️⃣ Select the **unpacked folder** where you extracted the ZIP.  
7️⃣ **Enjoy!** The extension is now installed and ready to use.

---

## ❓ FAQ
### **Does this extension track or send any data?**
🔒 **No.** Everything is stored **locally** in Chrome’s local storage. The extension does not collect or send any data anywhere.

### **Can I undo hidden elements for a specific site?**
✅ Yes! Click the **"Clear"** button in the extension popup to reset hidden elements for the current domain.

### **Will this extension work on all websites?**
📌 It works on **most** websites, but some sites with dynamic content (like those using JavaScript-heavy frameworks) may require reloading the page.

---

## 📝 Notes
- This extension **hides elements using `display: none`** instead of removing them to prevent breaking pages.
- It works **only on the sites where elements are stored**; it doesn’t block content globally.
- Future updates may include **advanced blocking features**.

---

✅ **Enjoy using Hide Elements!** 🚀 If you encounter issues, feel free to report them.
