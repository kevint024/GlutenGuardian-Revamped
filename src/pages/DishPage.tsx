import { useState } from 'react'
import { UtensilsCrossed, Search as SearchIcon } from 'lucide-react'
import { analyzeDish, getStatusEmoji, getStatusLabel } from '../utils/glutenAnalyzer'
import { addHistory } from '../services/storage'

interface DishResult {
  name: string
  status: 'safe' | 'caution' | 'unsafe'
  info: string
}

export default function DishPage() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<DishResult | null>(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setNotFound(false)

    const dishResult = analyzeDish(query)
    if (dishResult) {
      setResult({ name: query, ...dishResult })
      addHistory({
        type: 'dish',
        name: query,
        status: dishResult.status,
      })
    } else {
      setResult(null)
      setNotFound(true)
    }
  }

  const popularDishes = [
    'Pizza', 'Pasta', 'Burger', 'Sushi', 'Salad', 'Tacos',
    'Fried Chicken', 'Pad Thai', 'Ice Cream', 'Beer',
    'Pancake', 'Ramen', 'French Fries', 'Curry',
  ]

  return (
    <div className="animate-in">
      <h1 className="page-title">Dish Lookup</h1>
      <p className="page-subtitle">
        Search for a dish or food item to see if it's typically safe for a gluten-free diet. Get alternative suggestions too.
      </p>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          className="input"
          type="text"
          placeholder="Search a dish (e.g. pizza, sushi, pasta...)"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={!query.trim()}>
          <SearchIcon size={18} />
        </button>
      </form>

      {result && (
        <div className={`dish-result ${result.status} animate-in`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: '1.5rem' }}>{getStatusEmoji(result.status)}</span>
            <div>
              <div className="dish-name">{result.name}</div>
              <span className={`status-badge status-${result.status}`}>
                {getStatusLabel(result.status)}
              </span>
            </div>
          </div>
          <p className="dish-info">{result.info}</p>
        </div>
      )}

      {notFound && (
        <div className="info-box info-box-amber" style={{ marginBottom: 16 }}>
          <strong>Not found:</strong> We don't have specific info about "{query}" yet. When in doubt, always ask your server about ingredients or check packaging labels.
        </div>
      )}

      <div className="section-divider">Popular Dishes</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {popularDishes.map(dish => (
          <button
            key={dish}
            className="btn btn-sm btn-secondary"
            onClick={() => {
              setQuery(dish)
              const r = analyzeDish(dish)
              if (r) {
                setResult({ name: dish, ...r })
                setNotFound(false)
                addHistory({ type: 'dish', name: dish, status: r.status })
              }
            }}
          >
            {dish}
          </button>
        ))}
      </div>

      <div className="info-box info-box-green" style={{ marginTop: 20 }}>
        <strong>💡 Restaurant Tip:</strong> Always inform your server about your gluten sensitivity. Many restaurants can modify dishes to be gluten-free. Ask about dedicated fryers, GF soy sauce (tamari), and GF bread/bun options.
      </div>
    </div>
  )
}
