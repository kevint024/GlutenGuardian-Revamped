import { useState } from 'react'
import { FlaskConical } from 'lucide-react'
import { analyzeIngredients } from '../utils/glutenAnalyzer'
import { addHistory } from '../services/storage'
import AnalysisResultCard from '../components/AnalysisResultCard'
import type { AnalysisResult } from '../utils/glutenAnalyzer'

export default function IngredientPage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = () => {
    if (!text.trim()) return
    const analysis = analyzeIngredients(text)
    setResult(analysis)
    addHistory({
      type: 'manual',
      name: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      status: analysis.status,
    })
  }

  const handleClear = () => {
    setText('')
    setResult(null)
  }

  return (
    <div className="animate-in">
      <h1 className="page-title">Ingredient Checker</h1>
      <p className="page-subtitle">
        Paste or type an ingredient list to analyze it for gluten content. You can copy ingredient lists from product packaging or websites.
      </p>

      <div className="input-group">
        <label className="input-label">Ingredients</label>
        <textarea
          className="input"
          placeholder="Paste ingredients here, e.g.: Water, enriched wheat flour, sugar, palm oil, cocoa, soy lecithin, salt, natural flavor..."
          value={text}
          onChange={e => setText(e.target.value)}
          rows={6}
        />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          className="btn btn-primary"
          style={{ flex: 1 }}
          onClick={handleAnalyze}
          disabled={!text.trim()}
        >
          <FlaskConical size={18} />
          Analyze
        </button>
        {result && (
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      {result && (
        <div style={{ marginTop: 16 }}>
          <AnalysisResultCard result={result} />
        </div>
      )}

      <div className="info-box info-box-blue" style={{ marginTop: 20 }}>
        <strong>💡 Tip:</strong> You can separate ingredients with commas, semicolons, or line breaks. Our analyzer checks against hundereds of ingredients.
      </div>

      {/* Example buttons */}
      <div className="section-divider">Try an example</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setText('Water, sugar, enriched wheat flour (wheat flour, niacin, reduced iron, thiamine mononitrate, riboflavin, folic acid), palm oil, cocoa, high fructose corn syrup, leavening, soy lecithin, salt, natural and artificial flavor')}
        >
          🍪 Cookie (Unsafe)
        </button>
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setText('Organic brown rice, water, organic expeller pressed canola oil, sea salt')}
        >
          🍚 Rice Cake (Safe)
        </button>
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setText('Corn, vegetable oil (corn, canola, sunflower), maltodextrin, salt, natural flavors, modified food starch, citric acid')}
        >
          🌽 Chips (Caution)
        </button>
      </div>
    </div>
  )
}
