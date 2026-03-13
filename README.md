# 🛡️ Gluten Guardian Revamped

Your personal gluten-free food safety companion. Scan, search, and verify any food product instantly, all from your web browser.

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![PWA](https://img.shields.io/badge/PWA-Installable-brightgreen) ![License](https://img.shields.io/badge/License-MIT-green)

[Access The App Here](https://noglutenfor.me/)
## Features

### 📷 Barcode Scanning
Scan food product barcodes using your device camera with real-time detection. Instantly looks up products in the [Open Food Facts](https://ssl-api.openfoodfacts.org/) database and gives them a gluten safety rating.

### 🔍 Product Search
Search the [Open Food Facts](https://world.openfoodfacts.net/) database — over 3 million products — and instantly see gluten safety ratings.

### 🧪 Ingredient Checker
Paste or type any ingredient list and get instant analysis. Checks against 50+ known gluten ingredients and 30+ ambiguous ones.

### 🍽️ Dish Lookup
Search **300+ dishes across 26 cuisines** to see if they're typically safe for a gluten-free diet, with alternative suggestions. Browse by cuisine or search with fuzzy matching.

### 🍽️ Restaurant Guide
Gluten-free safety ratings for **50+ popular U.S. restaurants** across 10 categories — fast food, fast casual, casual dining, steakhouses, seafood, pizza, Asian, Mexican, breakfast, and coffee shops. Each restaurant includes:
- **Safety rating** (Great / Good / Limited / Avoid)
- **Safe menu items** with preparation notes
- **Items to avoid**
- **Dining tips** and cross-contamination risk level
- Whether they offer a **dedicated GF menu**

### 📸 Label/Image Scanner
Take a photo of a food ingredient label. OCR extracts the text and analyzes it for gluten content.

### ❤️ Favorites & History
Save frequently checked products for quick access. Your last 100 scans and checks are automatically tracked.

### 📖 Gluten-Free Guide
Comprehensive reference covering:
- **Foods to avoid** — grains, common foods, hidden gluten sources
- **Safe foods** — GF grains, naturally GF foods, safe condiments & beverages
- **Tips** — label reading, cross-contamination, certifications, shopping, kitchen safety
- **Dining out** — restaurant tips by cuisine, safe orders, travel advice

### 📲 Installable PWA
Install Gluten Guardian to your home screen for an app-like experience. A built-in install prompt guides you through setup.

## Smart Analysis Engine

Three-level safety rating system:

| Rating | Meaning |
|--------|---------|
| ✅ **Safe** | No gluten ingredients found |
| ⚠️ **Caution** | May contain hidden gluten sources |
| ❌ **Unsafe** | Contains known gluten ingredients |

**Detected gluten ingredients include:** wheat, barley, rye, malt, semolina, triticale, spelt, farro, durum, vital wheat gluten, graham flour, brewer's yeast, seitan, couscous, bulgur, kamut, freekeh, and many more.

**Flagged ambiguous ingredients:** modified food starch, maltodextrin, natural flavors, caramel color, hydrolyzed vegetable protein, yeast extract, soy sauce, and others.

For a full list of ingredients that are detected, check the [Analyzer File](src/utils/glutenAnalyzer.ts)
## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server starts.


## Tech Stack

| Tool | Use |
|-----------|---------|
| [React 19](https://react.dev/) | UI |
| [Vite 7](https://vite.dev/) | Build tool & dev server |
| [TypeScript 5](https://www.typescriptlang.org/) | Types|
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [html5-qrcode](https://github.com/mebjas/html5-qrcode) | Barcode scanning via camera |
| [Tesseract.js](https://tesseract.projectnaptha.com/) | OCR for ingredient label scanning |
| [Lucide React](https://lucide.dev/) | Icons |
| [Open Food Facts API](https://world.openfoodfacts.net/data) | Product database |

## FAQ

### General Questions

**Q: Is this free to use?**
A: Yes, this project is open source and free to use under the MIT license.

**Q: What browsers are supported?**
A: All modern browsers that support react and typescript can be used. It works best on Chrome though!

**Q:How do I access the app?**
A: The app is FREELY accessible online through cloudfare pages at [noglutenfor.me](https://noglutenfor.me/).


### Technical Questions

**Q: How do I contribute?**
A: Simply make a pull request! Always looking for help, especially with localization and restraunt guides.

**Q: How do I report a bug?**
A: Please create an [issue](https://github.com/kevint024/GlutenGuardian-Revamped/issues) on GitHub with a detailed description and reproduction steps.

**Q: Do you collect my data?**
A: No, Gluten Guardian is designed to not collect ANY of your data. All scans and favorites are stored locally on your own device and can be removed by clearing your browser data. The only communication the app makes is with the Open Food Facts database to fetch information on the products you are searching for.

**Q: How does this work?**
A: Gluten Guardian uses the barcode that you scan/item that you search and talks to the Open Food API, which returns a list of ingredients. The ingreidents are then normalized and ran against the Gluten Analysis engine, which contains gluten ingredeitns. If there is a match, it is marked as unsafe. If you are scanning an ingredients label or inputting raw ingredietns, we simply run the inputted ingredients through our list before marking it.

## Discliamer
Use at your own risk. Information from Gluten Guardian does not provide medical advice.


## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details. It also makes use of the [Open Food Facts Database](https://ssl-api.openfoodfacts.org/discover) which is governed by the [Open Database License](https://opendatacommons.org/licenses/odbl/1-0/)




