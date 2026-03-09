import { useState, useMemo } from 'react'
import { Search as SearchIcon, ChevronDown, ChevronUp, MapPin, ShieldCheck, AlertTriangle } from 'lucide-react'
import {
  searchRestaurants,
  getRestaurantsByCategory,
  getRestaurantStats,
  RESTAURANT_CATEGORIES,
  RATING_INFO,
  type Restaurant,
  type SafetyRating,
} from '../data/restaurantDatabase'

function RatingBadge({ rating }: { rating: SafetyRating }) {
  const info = RATING_INFO[rating]
  return (
    <span
      className="status-badge"
      style={{ background: info.bg, color: info.color, border: `1px solid ${info.border}`, fontSize: '0.65rem' }}
    >
      {info.emoji} {info.label}
    </span>
  )
}

function CrossContamBadge({ level }: { level: 'low' | 'medium' | 'high' }) {
  const config = {
    low: { label: 'Low Risk', color: 'var(--green-700)', bg: 'var(--green-50)' },
    medium: { label: 'Med Risk', color: 'var(--amber-600)', bg: 'var(--amber-50)' },
    high: { label: 'High Risk', color: 'var(--red-600)', bg: 'var(--red-50)' },
  }
  const c = config[level]
  return (
    <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: 10, background: c.bg, color: c.color, fontWeight: 600 }}>
      {level === 'high' ? '⚠️' : level === 'medium' ? '🔶' : '✅'} {c.label}
    </span>
  )
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [expanded, setExpanded] = useState(false)
  const info = RATING_INFO[restaurant.rating]

  return (
    <div
      className="card animate-in"
      style={{ cursor: 'pointer', borderLeft: `4px solid ${info.border}`, marginBottom: 10, padding: 14 }}
      onClick={() => setExpanded(!expanded)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>{info.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{restaurant.name}</span>
            <RatingBadge rating={restaurant.rating} />
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap', alignItems: 'center' }}>
            <CrossContamBadge level={restaurant.crossContamRisk} />
            {restaurant.hasGFMenu && (
              <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: 10, background: 'var(--green-50)', color: 'var(--green-700)', fontWeight: 600 }}>
                📋 GF Menu
              </span>
            )}
          </div>
          {!expanded && (
            <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: 'var(--gray-500)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {restaurant.summary}
            </p>
          )}
        </div>
        <div style={{ color: 'var(--gray-400)', flexShrink: 0 }}>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 12 }} onClick={(e) => e.stopPropagation()}>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 12 }}>
            {restaurant.summary}
          </p>

          {/* Safe Items */}
          <div style={{ background: 'var(--green-50)', borderRadius: 8, padding: 12, marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--green-700)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={14} /> Safe Items
            </div>
            {restaurant.safeItems.map((item, i) => (
              <div key={i} style={{ fontSize: '0.8rem', padding: '3px 0', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ color: 'var(--green-500)' }}>•</span>
                <span>
                  <strong>{item.name}</strong>
                  {item.note && <span style={{ color: 'var(--gray-500)', fontSize: '0.75rem' }}> — {item.note}</span>}
                </span>
              </div>
            ))}
          </div>

          {/* Avoid Items */}
          <div style={{ background: 'var(--red-50)', borderRadius: 8, padding: 12, marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--red-600)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <AlertTriangle size={14} /> Avoid
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {restaurant.avoidItems.map((item, i) => (
                <span key={i} className="tag tag-red">{item}</span>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div style={{ background: 'var(--gray-50)', borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--gray-700)', marginBottom: 8 }}>
              💡 Tips
            </div>
            {restaurant.tips.map((tip, i) => (
              <div key={i} style={{ fontSize: '0.78rem', color: 'var(--gray-600)', padding: '2px 0', display: 'flex', gap: 6 }}>
                <span>•</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function RestaurantPage() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Restaurant[]>([])
  const [searched, setSearched] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [ratingFilter, setRatingFilter] = useState<SafetyRating | 'all'>('all')

  const stats = useMemo(() => getRestaurantStats(), [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setActiveCategory(null)
    setSearched(true)
    setSearchResults(searchRestaurants(query))
  }

  const categoryRestaurants = useMemo(() => {
    if (!activeCategory) return []
    const restaurants = getRestaurantsByCategory(activeCategory)
    if (ratingFilter === 'all') return restaurants
    return restaurants.filter(r => r.rating === ratingFilter)
  }, [activeCategory, ratingFilter])

  const filteredSearchResults = useMemo(() => {
    if (ratingFilter === 'all') return searchResults
    return searchResults.filter(r => r.rating === ratingFilter)
  }, [searchResults, ratingFilter])

  const popularSearches = [
    'Chipotle', 'Chick-fil-A', 'Olive Garden', 'Outback', "P.F. Chang's",
    'Five Guys', 'In-N-Out', 'Red Lobster', 'Starbucks', 'MOD Pizza',
  ]

  return (
    <div className="animate-in">
      <h1 className="page-title">🍽️ Restaurant Guide</h1>
      <p className="page-subtitle">
        Gluten-free safety ratings for <strong>{stats.total} popular U.S. restaurants</strong> across {stats.categories} categories.
        Find safe menu items, tips, and cross-contamination warnings.
      </p>

      {/* Stats Bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 70, background: 'var(--green-50)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--green-700)' }}>{stats.great}</div>
          <div style={{ fontSize: '0.6rem', color: 'var(--green-600)', fontWeight: 600 }}>🌟 Great</div>
        </div>
        <div style={{ flex: 1, minWidth: 70, background: 'var(--green-50)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--green-600)' }}>{stats.good}</div>
          <div style={{ fontSize: '0.6rem', color: 'var(--green-600)', fontWeight: 600 }}>✅ Good</div>
        </div>
        <div style={{ flex: 1, minWidth: 70, background: 'var(--amber-50)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--amber-600)' }}>{stats.limited}</div>
          <div style={{ fontSize: '0.6rem', color: 'var(--amber-600)', fontWeight: 600 }}>⚠️ Limited</div>
        </div>
        <div style={{ flex: 1, minWidth: 70, background: 'var(--red-50)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--red-600)' }}>{stats.avoid}</div>
          <div style={{ fontSize: '0.6rem', color: 'var(--red-600)', fontWeight: 600 }}>🚫 Avoid</div>
        </div>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          className="input"
          type="text"
          placeholder="Search restaurants, menu items..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={!query.trim()}>
          <SearchIcon size={18} />
        </button>
      </form>

      {/* Rating Filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {(['all', 'great', 'good', 'limited', 'avoid'] as const).map(r => (
          <button
            key={r}
            className={`btn btn-sm ${ratingFilter === r ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.7rem', padding: '5px 10px' }}
            onClick={() => setRatingFilter(r)}
          >
            {r === 'all' ? '🔍 All' : RATING_INFO[r].emoji + ' ' + RATING_INFO[r].label}
          </button>
        ))}
      </div>

      {/* Search Results */}
      {searched && !activeCategory && (
        <div className="animate-in">
          <div className="section-divider">
            <SearchIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
            {filteredSearchResults.length} result{filteredSearchResults.length !== 1 ? 's' : ''} for "{query}"
          </div>
          {filteredSearchResults.length === 0 ? (
            <div className="empty-state">
              <MapPin />
              <p>No restaurants found matching "{query}"</p>
            </div>
          ) : (
            filteredSearchResults.map(r => <RestaurantCard key={r.name} restaurant={r} />)
          )}
        </div>
      )}

      {/* Category View */}
      {activeCategory && (
        <div className="animate-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="section-divider" style={{ margin: 0 }}>
              {RESTAURANT_CATEGORIES.find(c => c.id === activeCategory)?.emoji}{' '}
              {RESTAURANT_CATEGORIES.find(c => c.id === activeCategory)?.label}
              {' '}({categoryRestaurants.length})
            </div>
            <button className="btn btn-sm btn-secondary" onClick={() => setActiveCategory(null)}>
              ← Back
            </button>
          </div>
          {categoryRestaurants.length === 0 ? (
            <div className="empty-state">
              <p>No restaurants match the current filter in this category.</p>
            </div>
          ) : (
            categoryRestaurants.map(r => <RestaurantCard key={r.name} restaurant={r} />)
          )}
        </div>
      )}

      {/* Category Grid (when not viewing results) */}
      {!searched && !activeCategory && (
        <>
          {/* Popular Searches */}
          <div className="section-divider">🔥 Popular Restaurants</div>
          <div className="tag-list" style={{ marginBottom: 20 }}>
            {popularSearches.map(s => (
              <button
                key={s}
                className="tag tag-green"
                style={{ cursor: 'pointer', border: 'none', fontWeight: 500 }}
                onClick={() => {
                  setQuery(s)
                  setActiveCategory(null)
                  setSearched(true)
                  setSearchResults(searchRestaurants(s))
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Browse by Category */}
          <div className="section-divider">📂 Browse by Category</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
            {RESTAURANT_CATEGORIES.map(cat => {
              const count = getRestaurantsByCategory(cat.id).length
              return (
                <button
                  key={cat.id}
                  className="card"
                  style={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    padding: '14px 10px',
                    border: '1px solid var(--gray-200)',
                    background: 'white',
                    transition: 'all 0.2s',
                  }}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setSearched(false)
                    setRatingFilter('all')
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{cat.emoji}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--gray-800)' }}>{cat.label}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gray-400)', marginTop: 2 }}>{count} restaurants</div>
                </button>
              )
            })}
          </div>

          {/* Info Box */}
          <div className="info-box info-box-green">
            <strong>💡 Ratings Explained:</strong><br />
            🌟 <strong>Great</strong> — Dedicated GF protocols, many safe items<br />
            ✅ <strong>Good</strong> — GF menu or several safe options<br />
            ⚠️ <strong>Limited</strong> — Few options, high cross-contamination<br />
            🚫 <strong>Avoid</strong> — Not safe for celiac disease
          </div>

          <div className="info-box" style={{ background: 'var(--amber-50)', borderColor: 'var(--amber-100)' }}>
            <strong>⚠️ Important:</strong> Restaurant menus and preparation methods change. Always verify with your server and check the restaurant's current allergen information. These ratings are guidelines — your safety comes first.
          </div>
        </>
      )}
    </div>
  )
}
