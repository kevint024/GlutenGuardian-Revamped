import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { fetchProductByBarcode, ProductData } from '../services/openFoodFacts'
import { analyzeIngredients } from '../utils/glutenAnalyzer'
import { addHistory } from '../services/storage'
import AnalysisResultCard from '../components/AnalysisResultCard'

export default function ProductDetail() {
  const { barcode } = useParams<{ barcode: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!barcode) return
    setLoading(true)
    setError('')
    fetchProductByBarcode(barcode)
      .then(data => {
        setProduct(data)
        if (data.found) {
          const result = analyzeIngredients(data.ingredients + ' ' + data.allergens + ' ' + data.traces)
          addHistory({
            type: 'scan',
            name: data.name || `Barcode: ${barcode}`,
            barcode,
            status: result.status,
          })
        }
      })
      .catch((err: any) => setError(
        err?.name === 'AbortError' 
          ? 'Request timed out. The server may be slow — please try again.' 
          : 'Failed to fetch product. Please check your connection.'
      ))
      .finally(() => setLoading(false))
  }, [barcode])

  if (loading) {
    return (
      <div>
        <div className="spinner" />
        <p className="loading-text">Looking up product...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="animate-in">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>
        <div className="info-box info-box-amber">{error}</div>
      </div>
    )
  }

  if (!product || !product.found) {
    return (
      <div className="animate-in">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>
        <div className="empty-state">
          <p style={{ fontSize: '2rem', marginBottom: 8 }}>🔍</p>
          <p><strong>Product not found</strong></p>
          <p>Barcode <strong>{barcode}</strong> was not found in the Open Food Facts database.</p>
          <p style={{ marginTop: 12 }}>Try scanning again or searching by product name.</p>
        </div>
      </div>
    )
  }

  const analysisText = [product.ingredients, product.allergens, product.traces].filter(Boolean).join(' ')
  const result = analyzeIngredients(analysisText)

  // Check if allergens tag contains gluten
  const hasGlutenAllergen = product.allergens.toLowerCase().includes('gluten')
  const hasGlutenLabel = product.labels.toLowerCase().includes('gluten-free') || product.labels.toLowerCase().includes('sans gluten')

  return (
    <div className="animate-in">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="page-title" style={{ fontSize: '1.25rem' }}>
        {product.name || 'Unknown Product'}
      </h1>
      {product.brand && (
        <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginBottom: 12, marginTop: -8 }}>
          {product.brand}
        </p>
      )}

      {hasGlutenAllergen && (
        <div className="allergen-warning">
          <span style={{ fontSize: '1.25rem' }}>🚨</span>
          <p><strong>Allergen Alert:</strong> This product is tagged with GLUTEN as an allergen.</p>
        </div>
      )}

      {hasGlutenLabel && (
        <div className="info-box info-box-green">
          <strong>✅ Labeled Gluten-Free:</strong> This product has a gluten-free label. Always verify ingredients for extra safety.
        </div>
      )}

      <AnalysisResultCard
        result={result}
        productName={product.name}
        barcode={product.code}
        productImage={product.image}
      />

      {/* Product details */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-title" style={{ marginBottom: 12 }}>Product Details</div>
        {product.quantity && <Detail label="Quantity" value={product.quantity} />}
        {product.categories && <Detail label="Categories" value={product.categories} />}
        {product.labels && <Detail label="Labels" value={product.labels} />}
        {product.allergens && <Detail label="Allergens" value={product.allergens.replace(/en:/g, '')} />}
        {product.traces && <Detail label="Traces" value={product.traces.replace(/en:/g, '')} />}
        {product.countries && <Detail label="Countries" value={product.countries} />}
        
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          {product.nutriScore && (
            <span className={`nutri-score nutri-${product.nutriScore}`}>
              {product.nutriScore.toUpperCase()}
            </span>
          )}
          {product.novaGroup && (
            <span className="tag" style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}>
              NOVA {product.novaGroup}
            </span>
          )}
        </div>
      </div>

      {product.ingredients && (
        <div className="card">
          <div className="card-title" style={{ marginBottom: 8 }}>Raw Ingredients Text</div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>
            {product.ingredients}
          </p>
        </div>
      )}

      <a
        href={`https://world.openfoodfacts.org/product/${product.code}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline btn-full btn-sm"
        style={{ marginTop: 8 }}
      >
        <ExternalLink size={14} />
        View on Open Food Facts
      </a>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </span>
      <p style={{ fontSize: '0.8125rem', color: 'var(--gray-700)', marginTop: 2 }}>{value}</p>
    </div>
  )
}
