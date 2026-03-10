import { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Home, ScanBarcode, Search, Heart, BookOpen, WifiOff } from 'lucide-react'
import { checkApiStatus } from '../services/openFoodFacts'

export default function Layout() {
  const location = useLocation()
  const [apiDown, setApiDown] = useState(false)

  useEffect(() => {
    checkApiStatus().then(up => setApiDown(!up))
  }, [])

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-icon">🛡️</div>
        <div>
          <div className="header-title">Gluten Guardian</div>
          <div className="header-subtitle">Your gluten-free safety companion</div>
        </div>
      </header>

      {apiDown && (
        <div className="api-status-banner">
          <WifiOff size={16} />
          <span>Open Food Facts is currently unreachable. Product search and scanning may not work.</span>
        </div>
      )}

      <main className="page">
        <Outlet />
      </main>

      <nav className="bottom-nav">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Home />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/scan"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <ScanBarcode />
          <span>Scan</span>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Search />
          <span>Search</span>
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Heart />
          <span>Favorites</span>
        </NavLink>
        <NavLink
          to="/guide"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <BookOpen />
          <span>Guide</span>
        </NavLink>
      </nav>
        <footer className="disclaimer-footer">
          <span>
            Use at your own risk. Not medical advice. Made by <a href="https://kevintyler.tech" target="_blank" rel="noopener noreferrer">kevintyler.tech</a>
          </span>
        </footer>
    </div>
  )
}
