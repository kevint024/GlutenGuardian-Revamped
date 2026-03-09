import { useState, useEffect } from 'react'
import { Heart, Trash2, Clock } from 'lucide-react'
import {
  getFavorites, removeFavorite, getHistory, clearHistory,
  FavoriteItem, HistoryItem
} from '../services/storage'
import { getStatusEmoji } from '../utils/glutenAnalyzer'

export default function FavoritesPage() {
  const [tab, setTab] = useState<'favorites' | 'history'>('favorites')
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [history, setHistory] = useState<HistoryItem[]>([])

  const reload = () => {
    setFavorites(getFavorites())
    setHistory(getHistory())
  }

  useEffect(() => { reload() }, [])

  const handleRemoveFav = (id: string) => {
    removeFavorite(id)
    reload()
  }

  const handleClearHistory = () => {
    if (confirm('Clear all scan history?')) {
      clearHistory()
      reload()
    }
  }

  return (
    <div className="animate-in">
      <h1 className="page-title">Saved & History</h1>

      <div className="tabs">
        <button className={`tab ${tab === 'favorites' ? 'active' : ''}`} onClick={() => setTab('favorites')}>
          <Heart size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
          Favorites ({favorites.length})
        </button>
        <button className={`tab ${tab === 'history' ? 'active' : ''}`} onClick={() => setTab('history')}>
          <Clock size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
          History ({history.length})
        </button>
      </div>

      {tab === 'favorites' && (
        <>
          {favorites.length === 0 ? (
            <div className="empty-state">
              <Heart size={40} />
              <p><strong>No favorites yet</strong></p>
              <p>Save products you check frequently for quick access.</p>
            </div>
          ) : (
            favorites.map(fav => (
              <div key={fav.id} className="product-card" style={{ cursor: 'default' }}>
                {fav.image ? (
                  <img src={fav.image} alt={fav.name} className="product-image" />
                ) : (
                  <div className="product-image-placeholder">
                    <Heart size={20} />
                  </div>
                )}
                <div className="product-info">
                  <div className="product-name">{fav.name}</div>
                  {fav.brand && <div className="product-brand">{fav.brand}</div>}
                  <div className="product-status" style={{ marginTop: 4 }}>
                    <span className={`status-badge status-${fav.status}`}>
                      {getStatusEmoji(fav.status)} {fav.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gray-400)', marginTop: 4 }}>
                    {new Date(fav.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <button
                  className="btn btn-icon btn-danger"
                  onClick={() => handleRemoveFav(fav.id)}
                  style={{ alignSelf: 'center' }}
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </>
      )}

      {tab === 'history' && (
        <>
          {history.length > 0 && (
            <button
              className="btn btn-sm btn-danger"
              style={{ marginBottom: 12 }}
              onClick={handleClearHistory}
            >
              <Trash2 size={14} /> Clear History
            </button>
          )}
          {history.length === 0 ? (
            <div className="empty-state">
              <Clock size={40} />
              <p><strong>No history yet</strong></p>
              <p>Your scans, searches, and checks will appear here.</p>
            </div>
          ) : (
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
                      {getStatusEmoji(item.status)} {item.type} · {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
