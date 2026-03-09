import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Home, ScanBarcode, Search, Heart, BookOpen } from 'lucide-react'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-icon">🛡️</div>
        <div>
          <div className="header-title">Gluten Guardian</div>
          <div className="header-subtitle">Your gluten-free safety companion</div>
        </div>
      </header>

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
            Use at your own risk. Not medical advice. See <a href="https://kevintyler.tech" target="_blank" rel="noopener noreferrer">kevintyler.tech</a> for more info.
          </span>
        </footer>
    </div>
  )
}
