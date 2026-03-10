import { AnalysisResult, getStatusEmoji, getStatusLabel } from '../utils/glutenAnalyzer'
import { Heart } from 'lucide-react'
import { isFavorite, addFavorite, removeFavorite, getFavorites } from '../services/storage'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  result: AnalysisResult
  productName?: string
  barcode?: string
  productImage?: string
}

export default function AnalysisResultCard({ result, productName, barcode, productImage }: Props) {
  const [favorited, setFavorited] = useState(() => 
    productName ? isFavorite(productName, barcode) : false
  )
  const navigate = useNavigate()

  const toggleFavorite = () => {
    if (!productName) return
    if (favorited) {
      const favs = getFavorites()
      const fav = favs.find(f => f.name.toLowerCase() === productName.toLowerCase() || (barcode && f.barcode === barcode))
      if (fav) removeFavorite(fav.id)
    } else {
      addFavorite({
        type: 'product',
        name: productName,
        barcode,
        status: result.status,
        image: productImage,
      })
    }
    setFavorited(!favorited)
  }

  return (
    <div className="animate-in">
      {productImage && (
        <img src={productImage} alt={productName} className="result-product-img" />
      )}

      <div className={`result-card ${result.status}`}>
        <div className="result-emoji">{getStatusEmoji(result.status)}</div>
        <div className="result-status">{getStatusLabel(result.status)}</div>
        <p className="result-summary">{result.summary}</p>
      </div>

      {productName && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <button className={`favorite-btn ${favorited ? 'active' : ''}`} onClick={toggleFavorite}>
            <Heart fill={favorited ? 'currentColor' : 'none'} size={20} />
            <span style={{ fontSize: '0.8125rem', marginLeft: 4 }}>
              {favorited ? 'Saved to Favorites' : 'Save to Favorites'}
            </span>
          </button>
        </div>
      )}

      {result.glutenIngredients.length > 0 && (
        <div className="ingredient-section">
          <div className="ingredient-section-title">
            ❌ Gluten Ingredients Found
          </div>
          <div className="tag-list">
            {result.glutenIngredients.map(i => (
              <span key={i} className="tag tag-red">{i}</span>
            ))}
          </div>
        </div>
      )}

      {result.cautionIngredients.length > 0 && (
        <div className="ingredient-section" style={{ marginTop: 10 }}>
          <div className="ingredient-section-title">
            ⚠️ Possibly Problematic Ingredients
          </div>
          <div className="tag-list">
            {result.cautionIngredients.map(i => (
              <span key={i} className="tag tag-amber">{i}</span>
            ))}
          </div>
        </div>
      )}

      {result.allIngredients.length > 0 && (
        <div className="ingredient-section" style={{ marginTop: 10 }}>
          <div className="ingredient-section-title">
            📋 All Ingredients ({result.allIngredients.length})
          </div>
          <ul className="ingredient-list">
            {result.allIngredients.map((ing, idx) => (
              <li key={idx}>
                <span style={{
                  color: result.glutenIngredients.some(g => ing.includes(g)) ? 'var(--red-600)' :
                    result.cautionIngredients.some(c => ing.includes(c)) ? 'var(--amber-600)' :
                    'var(--green-700)',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}>●</span>
                {ing}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <button
          onClick={() => navigate(`/report${productName ? `?context=${encodeURIComponent(productName)}` : ''}`)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--gray-400)',
            fontSize: '0.8rem',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            padding: '6px 0',
            fontFamily: 'inherit',
          }}
        >
          Something not right? Let us know
        </button>
      </div>
    </div>
  )
}
