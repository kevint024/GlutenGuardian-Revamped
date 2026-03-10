import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SAFE_GRAINS, GLUTEN_INGREDIENTS, CAUTION_INGREDIENTS } from '../utils/glutenAnalyzer'

export default function GuidePage() {
  const [section, setSection] = useState<'unsafe' | 'caution' | 'safe' | 'tips' | 'dining'>('unsafe')
  const [search, setSearch] = useState('')

  const filterItems = (items: string[]) =>
    search.trim()
      ? items.filter(i => i.toLowerCase().includes(search.toLowerCase()))
      : items

  // De-duplicate for display
  const glutenUnique = [...new Set(GLUTEN_INGREDIENTS)]
  const cautionUnique = [...new Set(CAUTION_INGREDIENTS)]

  return (
    <div className="animate-in">
      <h1 className="page-title">Gluten-Free Guide</h1>
      <p className="page-subtitle">
        Your comprehensive reference for living gluten-free. Learn which foods to avoid, which are safe, and get tips for dining out.
      </p>

      <div className="tabs" style={{ flexWrap: 'wrap' }}>
        <button className={`tab ${section === 'unsafe' ? 'active' : ''}`} onClick={() => setSection('unsafe')}>
          ❌ Avoid
        </button>
        <button className={`tab ${section === 'caution' ? 'active' : ''}`} onClick={() => setSection('caution')}>
          ⚠️ Caution
        </button>
        <button className={`tab ${section === 'safe' ? 'active' : ''}`} onClick={() => setSection('safe')}>
          ✅ Safe
        </button>
        <button className={`tab ${section === 'tips' ? 'active' : ''}`} onClick={() => setSection('tips')}>
          💡 Tips
        </button>
        <button className={`tab ${section === 'dining' ? 'active' : ''}`} onClick={() => setSection('dining')}>
          🍽️ Dining
        </button>
      </div>

      {(section === 'unsafe' || section === 'caution') && (
        <input
          className="input"
          type="text"
          placeholder={`Search ${section === 'unsafe' ? 'gluten' : 'caution'} ingredients…`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 12 }}
        />
      )}

      {section === 'unsafe' && (
        <div className="animate-in">
          <div className="info-box info-box-red" style={{ marginBottom: 12 }}>
            <strong>❌ {glutenUnique.length} gluten-containing ingredients</strong> — any of these in a product means it contains gluten.
          </div>
          {filterItems(glutenUnique).length === 0 && (
            <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem', textAlign: 'center', padding: '20px 0' }}>No matches found.</p>
          )}
          <div className="tag-list" style={{ gap: 6 }}>
            {filterItems(glutenUnique).map(g => (
              <span key={g} className="tag tag-red" style={{ fontSize: '0.8125rem', padding: '5px 10px' }}>{g}</span>
            ))}
          </div>
        </div>
      )}

      {section === 'caution' && (
        <div className="animate-in">
          <div className="info-box info-box-amber" style={{ marginBottom: 12 }}>
            <strong>⚠️ {cautionUnique.length} caution-flag ingredients</strong> — these <em>may</em> contain gluten depending on brand or processing. Always verify.
          </div>
          {filterItems(cautionUnique).length === 0 && (
            <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem', textAlign: 'center', padding: '20px 0' }}>No matches found.</p>
          )}
          <div className="tag-list" style={{ gap: 6 }}>
            {filterItems(cautionUnique).map(c => (
              <span key={c} className="tag tag-amber" style={{ fontSize: '0.8125rem', padding: '5px 10px' }}>{c}</span>
            ))}
          </div>
        </div>
      )}

      {section === 'safe' && (
        <div className="animate-in">
          <div className="guide-card" style={{ borderColor: 'var(--green-200)', background: 'var(--green-50)' }}>
            <div className="guide-card-title">🌿 Safe Grains & Starches</div>
            <div className="tag-list">
              {SAFE_GRAINS.map(g => (
                <span key={g} className="tag tag-green">{g}</span>
              ))}
            </div>
          </div>
          <div className="guide-card" style={{ borderColor: 'var(--green-200)', background: 'var(--green-50)' }}>
            <div className="guide-card-title">🥩 Naturally Gluten-Free Foods</div>
            <div className="guide-card-text">
              Fresh fruits & vegetables, plain meat, poultry & fish, eggs, dairy (milk, butter, cheese), 
              beans & legumes, nuts & seeds, oils, herbs & spices, corn, potatoes, plain rice
            </div>
          </div>
          <div className="guide-card" style={{ borderColor: 'var(--green-200)', background: 'var(--green-50)' }}>
            <div className="guide-card-title">🍶 Safe Condiments</div>
            <div className="guide-card-text">
              Tamari (wheat-free soy sauce), mustard, ketchup (most brands), apple cider vinegar, 
              hot sauce (most brands), olive oil, coconut aminos, salsa, guacamole
            </div>
          </div>
          <div className="guide-card" style={{ borderColor: 'var(--green-200)', background: 'var(--green-50)' }}>
            <div className="guide-card-title">🥤 Safe Beverages</div>
            <div className="guide-card-text">
              Water, coffee, tea, 100% fruit juice, milk, wine, distilled spirits, cider, 
              gluten-free beer, most sodas
            </div>
          </div>
        </div>
      )}

      {section === 'tips' && (
        <div className="animate-in">
          <div className="guide-card">
            <div className="guide-card-title">📖 Reading Labels</div>
            <div className="guide-card-text">
              In many countries, wheat must be declared as an allergen. Look for "Contains: Wheat" or bold text 
              in ingredient lists. "Gluten-free" labels mean less than 20 ppm of gluten.
            </div>
          </div>
          <div className="guide-card">
            <div className="guide-card-title">🏭 Cross-Contamination</div>
            <div className="guide-card-text">
              "May contain wheat" or "processed in a facility..." warnings indicate cross-contamination risk. 
              If you have celiac disease, these may not be safe.
            </div>
          </div>
          <div className="guide-card">
            <div className="guide-card-title">🔬 Certified GF Labels</div>
            <div className="guide-card-text">
              Look for certifications like GFCO (Gluten-Free Certification Organization), 
              CSA (Celiac Support Association), or NSF Gluten-Free. These are stricter than FDA standards.
            </div>
          </div>
          <div className="guide-card">
            <div className="guide-card-title">🛒 Shopping Tips</div>
            <div className="guide-card-text">
              Shop the perimeter of grocery stores for naturally GF foods. Use apps like Gluten Guardian 
              to scan products. Buy certified GF grains to avoid cross-contamination. Consider dedicated GF brands.
            </div>
          </div>
          <div className="guide-card">
            <div className="guide-card-title">🏠 Kitchen Safety</div>
            <div className="guide-card-text">
              Use separate cutting boards, toasters, and colanders. Clean surfaces thoroughly. 
              Store GF foods above gluten foods. Use squeeze bottles for condiments to avoid cross-contamination.
            </div>
          </div>
        </div>
      )}

      {section === 'dining' && (
        <div className="animate-in">
          <div className="guide-card">
            <div className="guide-card-title">🍽️ Restaurant Tips</div>
            <div className="guide-card-text">
              Always inform your server about gluten sensitivity. Ask about shared fryers, 
              cooking surfaces, and ingredient substitutions. Many chains now offer GF menus.
            </div>
          </div>
          <div className="guide-card">
            <div className="guide-card-title">✈️ Travel Tips</div>
            <div className="guide-card-text">
              Learn how to say "I have celiac" or "gluten-free" in the local language. Pack GF snacks. 
              Research GF-friendly restaurants ahead of time. Carry a dining card explaining your needs.
            </div>
          </div>
          <div className="guide-card">
            <div className="guide-card-title">🍕 Safe Restaurant Orders</div>
            <div className="guide-card-text">
              <strong>Mexican:</strong> Corn tortillas, rice, beans<br />
              <strong>Asian:</strong> Rice dishes, rice noodles, tamari<br />
              <strong>Italian:</strong> GF pasta, risotto, grilled proteins<br />
              <strong>American:</strong> Grilled meats, salads, baked potatoes<br />
              <strong>Indian:</strong> Rice dishes, lentil dal, tandoori (no naan)
            </div>
          </div>
          <div className="guide-card">
            <div className="guide-card-title">🚫 High-Risk Orders to Avoid</div>
            <div className="guide-card-text">
              Anything breaded or battered, pasta (unless GF), regular pizza, sandwiches on regular bread, 
              beer, soy sauce dishes, cream soups, fried foods from shared fryers, gravy
            </div>
          </div>
          <Link to="/restaurants" className="btn btn-primary btn-full" style={{ marginTop: 8 }}>
            🍽️ View Full Restaurant Guide →
          </Link>
        </div>
      )}
    </div>
  )
}
