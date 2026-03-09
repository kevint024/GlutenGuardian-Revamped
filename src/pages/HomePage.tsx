import { Link } from 'react-router-dom'
import { ScanBarcode, Search, FlaskConical, UtensilsCrossed, Camera, BookOpen, Heart, History, MapPin } from 'lucide-react'
import { getHistory } from '../services/storage'

const actions = [
  { to: '/scan', label: 'Scan Barcode', icon: ScanBarcode, color: '#16a34a' },
  { to: '/search', label: 'Search Products', icon: Search, color: '#2563eb' },
  { to: '/ingredients', label: 'Check Ingredients', icon: FlaskConical, color: '#9333ea' },
  { to: '/dish', label: 'Dish Lookup', icon: UtensilsCrossed, color: '#ea580c' },
  { to: '/scan-image', label: 'Scan Label/Dish', icon: Camera, color: '#0891b2' },
  { to: '/restaurants', label: 'Restaurant Guide', icon: MapPin, color: '#dc2626' },
  { to: '/guide', label: 'Safe Foods Guide', icon: BookOpen, color: '#4f46e5' },
]

export default function HomePage() {
  const history = getHistory().slice(0, 5)

  return (
    <div className="animate-in">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: '3rem', marginBottom: 8 }}>🛡️</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--green-700)', marginBottom: 4 }}>
          Gluten Guardian
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>
          Your personal gluten-free safety companion.<br />
          Scan, search, and verify any food product.
        </p>
      </div>

      <div className="quick-actions">
        {actions.map(a => (
          <Link key={a.to} to={a.to} className="quick-action">
            <div className="quick-action-icon" style={{ background: a.color }}>
              <a.icon size={20} />
            </div>
            <span className="quick-action-label">{a.label}</span>
          </Link>
        ))}
      </div>

      <div className="info-box info-box-green">
        <strong>💡 Quick Tip:</strong> Always check for "Certified Gluten-Free" labels. Products labeled "wheat-free" may still contain gluten from barley or rye.
      </div>

      {history.length > 0 && (
        <>
          <div className="section-divider">
            <History size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
            Recent Activity
          </div>
          <div className="card">
            {history.map(item => (
              <div key={item.id} className="history-item">
                <div
                  className="history-dot"
                  style={{
                    background:
                      item.status === 'safe' ? 'var(--green-500)' :
                      item.status === 'caution' ? 'var(--amber-500)' :
                      'var(--red-500)',
                  }}
                />
                <div className="history-info">
                  <div className="history-name">{item.name}</div>
                  <div className="history-meta">
                    {item.type} · {new Date(item.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
