import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Cpu, Lock, FlaskConical, Database, BookOpen, Info, ChevronDown, ChevronUp } from 'lucide-react'

interface AccordionItem {
  id: string
  icon: React.ReactNode
  title: string
  content: React.ReactNode
}

function AccordionSection({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="card"
      style={{ marginBottom: 12, overflow: 'hidden' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'var(--green-100)',
            color: 'var(--green-700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {item.icon}
        </span>
        <span style={{ flex: 1, fontWeight: 700, fontSize: '0.95rem', color: 'var(--gray-900)' }}>
          {item.title}
        </span>
        <span style={{ color: 'var(--gray-400)', flexShrink: 0 }}>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <div
          style={{
            padding: '4px 16px 16px 64px',
            fontSize: '0.875rem',
            color: 'var(--gray-600)',
            lineHeight: 1.75,
          }}
        >
          {item.content}
        </div>
      )}
    </div>
  )
}

export default function AboutPage() {
  const sections: AccordionItem[] = [
    {
      id: 'how-it-works',
      icon: <Cpu size={18} />,
      title: 'How It Works',
      content: (
        <>
          <p style={{ marginBottom: 10 }}>
            Gluten Guardian analyses food products for gluten-containing ingredients using a multi-step process — all of which runs <strong>entirely on your device</strong>.
          </p>
          <ol style={{ paddingLeft: 20, margin: 0 }}>
            <li style={{ marginBottom: 8 }}>
              <strong>Barcode Scanning / Product Search</strong> — when you scan a barcode or search by name, the app queries the{' '}
              <a
                href="https://world.openfoodfacts.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--green-700)' }}
              >
                Open Food Facts
              </a>{' '}
              public API to retrieve the product's ingredient list.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Local Analysis</strong> — the ingredient text is immediately processed on-device by the built-in gluten analysis engine. No ingredient data is forwarded to any third-party service for analysis.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Result Classification</strong> — each ingredient is matched against a database of 150+ known gluten-containing terms and 120+ caution-flag terms. The product is labelled{' '}
              <span style={{ color: 'var(--red-600)', fontWeight: 700 }}>Unsafe</span>,{' '}
              <span style={{ color: 'var(--amber-600)', fontWeight: 700 }}>Caution</span>,{' '}
              <span style={{ color: 'var(--green-700)', fontWeight: 700 }}>Safe</span>, or{' '}
              <span style={{ color: 'var(--gray-500)', fontWeight: 700 }}>Unknown</span>.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong>Image / Label Scanning</strong> — the Scan Label/Dish feature uses <a
                href="https://github.com/naptha/tesseract.js"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--green-700)' }}
              >
                Tesseract.js
              </a> for on-device OCR to extract ingredient text, which is then analysed locally as above.
            </li>
            <li>
              <strong>History & Favourites</strong> — scan history and saved favourites are stored exclusively in your browser's localStorage. Nothing is uploaded or synced.
            </li>
          </ol>
        </>
      ),
    },
    {
      id: 'privacy',
      icon: <Lock size={18} />,
      title: 'Privacy Policy',
      content: (
        <>
          <p style={{ marginBottom: 10 }}>
            Your privacy is a core principle behind Gluten Guardian. Here is exactly what the app does and does not do:
          </p>
          <div className="info-box info-box-green" style={{ marginBottom: 12 }}>
            <strong>✅ What we do</strong>
            <ul style={{ paddingLeft: 20, marginTop: 6, marginBottom: 0 }}>
              <li>Store your scan history locally in your browser's localStorage</li>
              <li>Store your favourites locally in your browser's localStorage</li>
              <li>Fetch product data from the Open Food Facts public API (read-only, no account required)</li>
            </ul>
          </div>
          <div className="info-box info-box-red" style={{ marginBottom: 12 }}>
            <strong>❌ What we do NOT do</strong>
            <ul style={{ paddingLeft: 20, marginTop: 6, marginBottom: 0 }}>
              <li>Collect, store, or transmit any personal information</li>
              <li>Use analytics, tracking pixels, or advertising SDKs</li>
              <li>Require any account or sign-in</li>
              <li>Share any data with third parties (beyond the API call to Open Food Facts)</li>
              <li>Persist any data outside of your own device</li>
            </ul>
          </div>
          <p style={{ marginBottom: 0 }}>
            To clear all locally stored data, simply clear your browser's site data / localStorage in your browser settings.
          </p>
        </>
      ),
    },
    {
      id: 'ingredients',
      icon: <FlaskConical size={18} />,
      title: 'Ingredient Database',
      content: (
        <>
          <p style={{ marginBottom: 10 }}>
            The analysis engine uses two curated lists of ingredients maintained within the app itself:
          </p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            <div
              className="tag tag-red"
              style={{ padding: '6px 14px', borderRadius: 8, fontSize: '0.85rem' }}
            >
              🚫 150+ unsafe ingredient terms
            </div>
            <div
              className="tag tag-amber"
              style={{ padding: '6px 14px', borderRadius: 8, fontSize: '0.85rem' }}
            >
              ⚠️ 120+ caution-flag terms
            </div>
            <div
              className="tag tag-green"
              style={{ padding: '6px 14px', borderRadius: 8, fontSize: '0.85rem' }}
            >
              ✅ 30+ safe grain alternatives
            </div>
          </div>
          <p style={{ marginBottom: 10 }}>
            The unsafe list covers core gluten grains (wheat, barley, rye and all their derivatives), malt products, common pasta and bread items, sauces known to contain wheat, and non-English grain names in German, French, Spanish, Italian, Dutch, and Portuguese.
          </p>
          <p style={{ marginBottom: 14 }}>
            The caution list flags ingredients that <em>may</em> contain gluten depending on brand or processing — such as modified food starch, natural flavours, oats, and certain sauces.
          </p>
          <Link
            to="/guide"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
          >
            <BookOpen size={16} />
            View Full Ingredient Reference
          </Link>
        </>
      ),
    },
    {
      id: 'open-food-facts',
      icon: <Database size={18} />,
      title: 'About Open Food Facts',
      content: (
        <>
          <p style={{ marginBottom: 10 }}>
            Product information (ingredient lists, product names, images) is sourced from{' '}
            <a
              href="https://world.openfoodfacts.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--green-700)', fontWeight: 600 }}
            >
              Open Food Facts
            </a>
            , a free, open, collaborative database of food products from around the world.
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
            <li style={{ marginBottom: 6 }}>Open Food Facts is a non-profit project run entirely by volunteers.</li>
            <li style={{ marginBottom: 6 }}>It contains over 3 million products from 160+ countries.</li>
            <li style={{ marginBottom: 6 }}>Data is licensed under the <a href="https://opendatacommons.org/licenses/odbl/1-0/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green-700)' }}>Open Database License (ODbL)</a>.</li>
            <li>You can contribute product data at <a href="https://world.openfoodfacts.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green-700)' }}>world.openfoodfacts.org</a>.</li>
          </ul>
          <div className="info-box info-box-green">
            <strong>Note:</strong> Gluten Guardian only reads from the Open Food Facts API. No product contributions are made on your behalf.
          </div>
        </>
      ),
    },
    {
      id: 'disclaimer',
      icon: <Info size={18} />,
      title: 'Medical Disclaimer',
      content: (
        <>
          <div className="info-box info-box-amber">
            <strong>⚠️ Not Medical Advice</strong>
          </div>
          <p style={{ marginTop: 12, marginBottom: 10 }}>
            Gluten Guardian is an informational tool only. It is <strong>not</strong> a substitute for professional medical or dietary advice. Always:
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
            <li style={{ marginBottom: 6 }}>Consult a qualified medical professional for diagnosis and treatment of coeliac disease or gluten sensitivity.</li>
            <li style={{ marginBottom: 6 }}>Verify ingredient lists directly on product packaging — product formulations change and database records may be outdated.</li>
            <li style={{ marginBottom: 6 }}>Look for certified gluten-free labels from accredited certification bodies as the most reliable indicator of safety.</li>
          </ul>
          <p style={{ marginBottom: 0 }}>
            Use of this app is entirely at your own risk. The developer accepts no liability for any adverse outcomes resulting from reliance on information provided by this app.
          </p>
        </>
      ),
    },
    {
      id: 'known-issues',
      icon: (
        <span style={{ background: 'var(--amber-100)', borderRadius: 8, padding: 6, display: 'inline-flex', alignItems: 'center' }}>
          <Info size={20} style={{ color: 'var(--amber-600)' }} />
        </span>
      ),
      title: 'Known Issues & Bug Reporting',
      content: (
        <>
          <div style={{ background: 'var(--amber-50)', border: '1px solid var(--amber-200)', borderRadius: 12, padding: '14px 18px', marginBottom: 16 }}>
            <strong style={{ color: 'var(--amber-700)', fontSize: '1rem' }}>Known Issues</strong>
            <ul style={{ paddingLeft: 22, marginTop: 8, marginBottom: 0, color: 'var(--amber-900)', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: 6 }}>Some products may have incomplete or outdated ingredient lists from Open Food Facts.</li>
              <li style={{ marginBottom: 6 }}>OCR accuracy may vary depending on image quality and lighting.</li>
              <li style={{ marginBottom: 6 }}>Ingredient analysis is limited to the app's internal database and may miss rare gluten sources. Items from countries outside of the US or with non-english ingredients may be undetected.</li>
              <li>Browser compatibility: Best experienced on Chrome, Firefox, or Safari. Edge and mobile browsers may have minor UI issues.</li>
            </ul>
          </div>
          <div style={{ fontSize: '0.95rem', marginBottom: 10 }}>
            If you encounter a bug or want to suggest improvements, please:
          </div>
          <ul style={{ paddingLeft: 0, marginTop: 0, marginBottom: 0, listStyle: 'none' }}>
            <li style={{ marginBottom: 6 }}>
              <a
                href="https://github.com/kevint024/GlutenGuardian-Revamped/issues"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--green-700)', fontWeight: 600, textDecoration: 'underline' }}
              >
                Open an issue on GitHub
              </a>
            </li>
            <li>
              <Link
                to="/report"
                style={{ color: 'var(--green-700)', fontWeight: 600, textDecoration: 'underline' }}
              >
                Report a bug / Contact
              </Link>
            </li>
          </ul>
        </>
      ),
    },
  ]

  return (
    <div className="animate-in">
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: '3rem', marginBottom: 8 }}>🛡️</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--green-700)', marginBottom: 4 }}>
          Gluten Guardian
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 12 }}>
          Your personal gluten-free safety companion
        </p>
      </div>

      {/* Accordion sections */}
      {sections.map(section => (
        <AccordionSection key={section.id} item={section} />
      ))}

      {/* Bug report/contact link */}
      <div style={{ textAlign: 'center', margin: '32px 0 0 0' }}>
        <Link
          to="/report"
          className="btn btn-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            color: 'var(--green-700)',
            background: 'var(--green-50)',
            border: '1px solid var(--green-200)',
            borderRadius: 8,
            padding: '10px 20px',
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <Info size={18} style={{ marginRight: 6 }} />
            Report a Bug / Contact
          </span>
        </Link>
      </div>

      {/* Footer attribution */}
      <div
        style={{
          marginTop: 24,
          padding: '16px',
          background: 'var(--gray-50)',
          borderRadius: 12,
          border: '1px solid var(--gray-200)',
          textAlign: 'center',
          fontSize: '0.825rem',
          color: 'var(--gray-500)',
          lineHeight: 1.7,
        }}
      >
        <p style={{ marginBottom: 4 }}>
          Built with ❤️ by{' '}
          <a
            href="https://kevintyler.tech"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--green-700)', fontWeight: 600 }}
          >
            kevintyler.tech
          </a>
        </p>
        <p style={{ margin: 0 }}>
          Product data from{' '}
          <a
            href="https://world.openfoodfacts.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--green-700)' }}
          >
            Open Food Facts
          </a>{' '}
          · Licensed under ODbL
        </p>
      </div>
    </div>
  )
}
