import { useState } from 'react'
import { Search as SearchIcon, Package } from 'lucide-react'
import { searchProducts, ProductData } from '../services/openFoodFacts'
import { analyzeIngredients } from '../utils/glutenAnalyzer'
import { getStatusEmoji } from '../utils/glutenAnalyzer'
import { useNavigate } from 'react-router-dom'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const doSearch = async (q: string, p: number = 1) => {
    if (!q.trim()) return
    setLoading(true)
    setSearched(true)
    setError('')
    try {
      const data = await searchProducts(q, p)
      setProducts(p === 1 ? data.products : [...products, ...data.products])
      setTotalPages(data.pageCount)
      setPage(p)
    } catch (err: any) {
      setError(err?.name === 'AbortError' ? 'Search timed out. Please try again.' : 'Search failed. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProducts([])
    doSearch(query, 1)
  }

  return (
    <div className="animate-in">
      <h1 className="page-title">Search Products</h1>
      <p className="page-subtitle">
        Search the Open Food Facts database for any food product and check its gluten safety.
      </p>

      <form onSubmit={handleSubmit} className="search-bar">
        <input
          className="input"
          type="text"
          placeholder="Search products (e.g. Oreos, hummus...)"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={!query.trim() || loading}>
          <SearchIcon size={18} />
        </button>
      </form>

      {loading && products.length === 0 && (
        <div>
          <div className="spinner" />
          <p className="loading-text">Searching products...</p>
        </div>
      )}

      {error && (
        <div className="info-box info-box-amber" style={{ marginBottom: 16 }}>
          <strong>⚠️ {error}</strong>
        </div>
      )}

      {!loading && !error && searched && products.length === 0 && (
        <div className="empty-state">
          <Package size={40} />
          <p>No products found for "<strong>{query}</strong>"</p>
          <p>Try a different search term.</p>
        </div>
      )}

      {products.map(p => {
        const analysisText = [p.ingredients, p.allergens, p.traces].filter(Boolean).join(' ')
        let result = analysisText ? analyzeIngredients(analysisText) : null
        const hasGFLabel = p.labels?.toLowerCase().includes('gluten-free') || p.labels?.toLowerCase().includes('sans gluten')
        const hasGlutenAllergen = p.allergens?.toLowerCase().includes('gluten')
        if (result && hasGFLabel) {
          result = { ...result, status: 'safe' }
        } else if (result && hasGlutenAllergen && result.status !== 'unsafe') {
          result = { ...result, status: 'unsafe' }
        }
        const statusText = result?.status === 'safe' ? 'Safe' : result?.status === 'caution' ? 'Caution' : result?.status === 'unknown' ? 'Not Enough Info' : 'Unsafe'
        return (
          <div
            key={p.code}
            className="product-card"
            onClick={() => navigate(`/product/${p.code}`)}
          >
            {p.image ? (
              <img src={p.image} alt={p.name} className="product-image" />
            ) : (
              <div className="product-image-placeholder">
                <Package size={24} />
              </div>
            )}
            <div className="product-info">
              <div className="product-name">{p.name || 'Unknown Product'}</div>
              {p.brand && <div className="product-brand">{p.brand}</div>}
              {result && (
                <div className="product-status">
                  <span className={`status-badge status-${result.status}`}>
                    {getStatusEmoji(result.status)} {statusText}
                  </span>
                </div>
              )}
              {!analysisText && (
                <div className="product-status">
                  <span className="status-badge status-caution">❓ No ingredient data</span>
                </div>
              )}
            </div>
          </div>
        )
      })}

      {products.length > 0 && page < totalPages && (
        <button
          className="btn btn-secondary btn-full"
          style={{ marginTop: 8 }}
          onClick={() => doSearch(query, page + 1)}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More Results'}
        </button>
      )}
    </div>
  )
}
