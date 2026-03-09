# 🛡️ Gluten Guardian Revamped

Your personal gluten-free food safety companion. Scan, search, and verify any food product instantly.

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

### 📷 Barcode Scanning
Scan food product barcodes using your device camera with real-time detection, or enter barcodes manually.

### 🔍 Product Search
Search the [Open Food Facts](https://world.openfoodfacts.org/) database — over 3 million products — and instantly see gluten safety ratings.

### 🧪 Ingredient Checker
Paste or type any ingredient list and get instant analysis. Checks against 50+ known gluten ingredients and 30+ ambiguous ones.

### 🍽️ Dish Lookup
Search 40+ common dishes to see if they're typically safe for a gluten-free diet, with alternative suggestions.

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

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React](https://react.dev/) | UI framework |
| [Vite](https://vite.dev/) | Build tool & dev server |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [html5-qrcode](https://github.com/mebjas/html5-qrcode) | Barcode scanning via camera |
| [Tesseract.js](https://tesseract.projectnaptha.com/) | OCR for ingredient label scanning |
| [Lucide React](https://lucide.dev/) | Icons |
| [Open Food Facts API](https://world.openfoodfacts.org/data) | Product database |

## Project Structure

```
src/
├── main.tsx                  # App entry point
├── App.tsx                   # Router & route definitions
├── index.css                 # Global styles
├── components/
│   ├── Layout.tsx            # App shell with header & bottom nav
│   └── AnalysisResultCard.tsx # Reusable gluten analysis display
├── pages/
│   ├── HomePage.tsx          # Dashboard with quick actions & history
│   ├── ScanPage.tsx          # Barcode scanner (camera + manual)
│   ├── SearchPage.tsx        # Product search
│   ├── ProductDetail.tsx     # Full product analysis view
│   ├── IngredientPage.tsx    # Manual ingredient checker
│   ├── DishPage.tsx          # Dish/food lookup
│   ├── ScanImagePage.tsx     # OCR label/image scanner
│   ├── FavoritesPage.tsx     # Saved favorites & scan history
│   └── GuidePage.tsx         # Gluten-free reference guide
├── services/
│   ├── openFoodFacts.ts      # Open Food Facts API client
│   └── storage.ts            # LocalStorage for favorites & history
└── utils/
    └── glutenAnalyzer.ts     # Core gluten detection engine
```

## License

MIT
