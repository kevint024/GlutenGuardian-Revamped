import { useState, useMemo } from 'react'
import { Search as SearchIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { getStatusEmoji, getStatusLabel } from '../utils/glutenAnalyzer'
import { searchDishes, getDishesByCuisine, getDishStats, CUISINE_CATEGORIES, type DishEntry, type DishSearchResult } from '../data/dishDatabase'
import { addHistory } from '../services/storage'

function DishCard({ dish }: { dish: DishEntry }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      className={`dish-result ${dish.status} animate-in`}
      style={{ marginBottom: 8, cursor: 'pointer' }}
      onClick={() => setExpanded(!expanded)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: '1.3rem' }}>{getStatusEmoji(dish.status)}</span>
        <div style={{ flex: 1 }}>
          <div className="dish-name" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {dish.name}
            <span className={`status-badge status-${dish.status}`} style={{ fontSize: '0.65rem' }}>
              {getStatusLabel(dish.status)}
            </span>
          </div>
          {!expanded && (
            <p className="dish-info" style={{ margin: 0, fontSize: '0.78rem', opacity: 0.8, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {dish.info}
            </p>
          )}
        </div>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {expanded && (
        <div style={{ marginTop: 8 }}>
          <p className="dish-info" style={{ margin: '0 0 6px 0' }}>{dish.info}</p>
          {dish.alternatives && (
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--green-700)' }}>
              <strong>✅ GF Alternatives:</strong> {dish.alternatives}
            </p>
          )}
          <span style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: 4, display: 'block' }}>
            {dish.cuisine}
          </span>
        </div>
      )}
    </div>
  )
}

export default function DishPage() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<DishSearchResult[]>([])
  const [searched, setSearched] = useState(false)
  const [activeCuisine, setActiveCuisine] = useState<string | null>(null)

  const stats = useMemo(() => getDishStats(), [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
  }

  const performSearch = (q: string) => {
    if (!q.trim()) return
    setActiveCuisine(null)
    setSearched(true)
    const results = searchDishes(q)
    setSearchResults(results)

    if (results.length > 0) {
      addHistory({
        type: 'dish',
        name: results[0].name,
        status: results[0].status,
      })
    }
  }

  const cuisineDishes = useMemo(() => {
    if (!activeCuisine) return []
    return getDishesByCuisine(activeCuisine)
  }, [activeCuisine])

  const popularDishes = [
    'Pizza', 'Pasta', 'Burger', 'Sushi', 'Tacos', 'Fried Chicken',
    'Pad Thai', 'Ramen', 'Pho', 'Biryani', 'Paella', 'Risotto',
    'Beer', 'Soy Sauce', 'Pancakes', 'French Fries', 'Nachos', 'Steak',
  ]

  return (
    <div className="animate-in">
      <h1 className="page-title">Dish Lookup</h1>
      <p className="page-subtitle">
        Search <strong>{stats.total} dishes</strong> across <strong>{stats.cuisines} cuisines</strong> — find out if it's safe, risky, or contains gluten.
      </p>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          className="input"
          type="text"
          placeholder="Search any dish, food, or drink..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={!query.trim()}>
          <SearchIcon size={18} />
        </button>
      </form>

      {/* Search results */}
      {searched && searchResults.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-divider">
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
          </div>
          {searchResults.map((dish, i) => (
            <DishCard key={`${dish.name}-${i}`} dish={dish} />
          ))}
        </div>
      )}

      {searched && searchResults.length === 0 && (
        <div className="info-box info-box-amber" style={{ marginBottom: 16 }}>
          <strong>Not found:</strong> We don't have specific info about "{query}" yet. When in doubt, always ask your server about ingredients or check packaging labels.
        </div>
      )}

      {/* Quick picks */}
      {!activeCuisine && !searched && (
        <>
          <div className="section-divider">Popular Searches</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {popularDishes.map(dish => (
              <button
                key={dish}
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setQuery(dish)
                  performSearch(dish)
                }}
              >
                {dish}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Browse by cuisine */}
      <div className="section-divider">
        Browse by Cuisine
        {activeCuisine && (
          <button
            className="btn btn-sm btn-secondary"
            style={{ marginLeft: 8, fontSize: '0.7rem' }}
            onClick={() => setActiveCuisine(null)}
          >
            ← All Cuisines
          </button>
        )}
      </div>

      {!activeCuisine ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 6 }}>
          {CUISINE_CATEGORIES.map(c => {
            const count = getDishesByCuisine(c).length
            if (count === 0) return null
            return (
              <button
                key={c}
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem', padding: '8px 10px', textAlign: 'left', justifyContent: 'space-between' }}
                onClick={() => { setActiveCuisine(c); setSearched(false); setSearchResults([]) }}
              >
                <span>{c}</span>
                <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>{count}</span>
              </button>
            )
          })}
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 8, fontSize: '0.85rem', opacity: 0.7 }}>
            {cuisineDishes.length} dishes in <strong>{activeCuisine}</strong>
          </div>
          {cuisineDishes.map((dish, i) => (
            <DishCard key={`${dish.name}-${i}`} dish={dish} />
          ))}
        </div>
      )}

      {/* Stats bar */}
      <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
        <span className="status-badge status-safe" style={{ fontSize: '0.7rem' }}>
          ✅ {stats.safe} Safe
        </span>
        <span className="status-badge status-caution" style={{ fontSize: '0.7rem' }}>
          ⚠️ {stats.caution} Caution
        </span>
        <span className="status-badge status-unsafe" style={{ fontSize: '0.7rem' }}>
          ❌ {stats.unsafe} Unsafe
        </span>
      </div>

      <div className="info-box info-box-green" style={{ marginTop: 16 }}>
        <strong>💡 Restaurant Tip:</strong> Always inform your server about your gluten sensitivity. Many restaurants can modify dishes. Ask about dedicated fryers, GF soy sauce (tamari), and GF bread/bun options.
      </div>
    </div>
  )
}
