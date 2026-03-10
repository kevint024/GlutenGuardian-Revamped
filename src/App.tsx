import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import InstallPrompt from './components/InstallPrompt'
import HomePage from './pages/HomePage'
import ScanPage from './pages/ScanPage'
import SearchPage from './pages/SearchPage'
import IngredientPage from './pages/IngredientPage'
import DishPage from './pages/DishPage'
import ScanImagePage from './pages/ScanImagePage'
import FavoritesPage from './pages/FavoritesPage'
import GuidePage from './pages/GuidePage'
import RestaurantPage from './pages/RestaurantPage'
import ProductDetail from './pages/ProductDetail'
import AboutPage from './pages/AboutPage'
import BugReportPage from './pages/BugReportPage'

export default function App() {
  return (
    <BrowserRouter>
      <InstallPrompt />
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
          <Route path="/restaurants" element={<RestaurantPage />} />
          <Route path="/product/:barcode" element={<ProductDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/report" element={<BugReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
