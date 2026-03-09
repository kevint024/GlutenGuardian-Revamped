import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ScanPage from './pages/ScanPage'
import SearchPage from './pages/SearchPage'
import IngredientPage from './pages/IngredientPage'
import DishPage from './pages/DishPage'
import ScanImagePage from './pages/ScanImagePage'
import FavoritesPage from './pages/FavoritesPage'
import GuidePage from './pages/GuidePage'
import ProductDetail from './pages/ProductDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/ingredients" element={<IngredientPage />} />
          <Route path="/dish" element={<DishPage />} />
          <Route path="/scan-image" element={<ScanImagePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/product/:barcode" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
