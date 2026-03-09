# 🛡️ Gluten Guardian Revamped

Your personal gluten-free food safety companion. Scan, search, and verify any food product instantly.

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![PWA](https://img.shields.io/badge/PWA-Installable-brightgreen) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

### 📷 Barcode Scanning
Scan food product barcodes using your device camera with real-time detection. Instantly looks up products in the Open Food Facts database.

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

The dev server starts at `http://localhost:5173/`.

### Deployment (Cloudflare Pages)

The build outputs to `dist/`. A Vite plugin automatically copies `index.html` to `200.html` for Cloudflare Pages SPA fallback — no `_redirects` file needed.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React 19](https://react.dev/) | UI framework |
| [Vite 7](https://vite.dev/) | Build tool & dev server |
| [TypeScript 5](https://www.typescriptlang.org/) | Type safety |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [html5-qrcode](https://github.com/mebjas/html5-qrcode) | Barcode scanning via camera |
| [Tesseract.js](https://tesseract.projectnaptha.com/) | OCR for ingredient label scanning |
| [Lucide React](https://lucide.dev/) | Icons |
| [Open Food Facts API](https://world.openfoodfacts.net/data) | Product database |

## Project Structure

```
src/
├── main.tsx                    # App entry point
├── App.tsx                     # Router & route definitions
├── index.css                   # Global styles & design system
├── components/
│   ├── Layout.tsx              # App shell with header & bottom nav
│   ├── AnalysisResultCard.tsx  # Reusable gluten analysis display
│   └── InstallPrompt.tsx       # PWA install popup
├── data/
│   ├── dishDatabase.ts         # 300+ dishes across 26 cuisines
│   └── restaurantDatabase.ts   # 50+ U.S. restaurants with GF ratings
├── pages/
│   ├── HomePage.tsx            # Dashboard with quick actions & history
│   ├── ScanPage.tsx            # Barcode scanner (camera)
│   ├── SearchPage.tsx          # Product search
│   ├── ProductDetail.tsx       # Full product analysis view
│   ├── IngredientPage.tsx      # Manual ingredient checker
│   ├── DishPage.tsx            # Dish/food lookup with cuisine browser
│   ├── RestaurantPage.tsx      # Restaurant GF guide with search & filters
│   ├── ScanImagePage.tsx       # OCR label/image scanner
│   ├── FavoritesPage.tsx       # Saved favorites & scan history
│   └── GuidePage.tsx           # Gluten-free reference guide
├── services/
│   ├── openFoodFacts.ts        # Open Food Facts API client
│   └── storage.ts              # LocalStorage for favorites & history
└── utils/
    └── glutenAnalyzer.ts       # Core gluten detection engine
```

## License

MIT
