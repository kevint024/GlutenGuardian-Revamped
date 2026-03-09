import { useState, useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { useNavigate } from 'react-router-dom'
import { ScanBarcode, Keyboard, Camera } from 'lucide-react'

export default function ScanPage() {
  const [mode, setMode] = useState<'camera' | 'manual'>('camera')
  const [manualBarcode, setManualBarcode] = useState('')
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState('')
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const navigate = useNavigate()

  const handleBarcode = (barcode: string) => {
    const sanitized = barcode.replace(/[^0-9]/g, '')
    if (sanitized.length >= 4) {
      stopScanner()
      navigate(`/product/${sanitized}`)
    }
  }

  const startScanner = async () => {
    setError('')
    try {
      const scanner = new Html5Qrcode('barcode-reader')
      scannerRef.current = scanner
      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 100 },
          aspectRatio: 1.333,
        },
        (decodedText) => {
          handleBarcode(decodedText)
        },
        () => {}
      )
      setScanning(true)
    } catch (err: any) {
      setError(
        err?.message?.includes('NotAllowedError') || err?.message?.includes('Permission')
          ? 'Camera access denied. Please allow camera permissions and try again.'
          : 'Could not start camera. Try manual entry instead.'
      )
    }
  }

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().catch(() => {})
      scannerRef.current.clear()
      scannerRef.current = null
    }
    setScanning(false)
  }

  useEffect(() => {
    if (mode === 'camera') {
      startScanner()
    }
    return () => {
      stopScanner()
    }
  }, [mode])

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleBarcode(manualBarcode)
  }

  return (
    <div className="animate-in">
      <h1 className="page-title">Scan Product</h1>
      <p className="page-subtitle">
        Scan a barcode with your camera or enter it manually to check if a product is gluten-free.
      </p>

      <div className="tabs">
        <button
          className={`tab ${mode === 'camera' ? 'active' : ''}`}
          onClick={() => { stopScanner(); setMode('camera') }}
        >
          <Camera size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
          Camera
        </button>
        <button
          className={`tab ${mode === 'manual' ? 'active' : ''}`}
          onClick={() => { stopScanner(); setMode('manual') }}
        >
          <Keyboard size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
          Manual
        </button>
      </div>

      {mode === 'camera' && (
        <>
          <div className="scanner-container">
            <div id="barcode-reader" style={{ width: '100%', height: '100%' }} />
            {!scanning && !error && (
              <div className="scanner-overlay">
                <div className="spinner" />
              </div>
            )}
          </div>
          {error && (
            <div className="info-box info-box-amber">
              {error}
              <br />
              <button
                className="btn btn-sm btn-secondary"
                style={{ marginTop: 8 }}
                onClick={() => setMode('manual')}
              >
                Switch to Manual Entry
              </button>
            </div>
          )}
          {scanning && (
            <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--gray-500)' }}>
              Point your camera at a barcode...
            </p>
          )}
        </>
      )}

      {mode === 'manual' && (
        <form onSubmit={handleManualSubmit}>
          <div className="input-group">
            <label className="input-label">Barcode Number</label>
            <input
              className="input"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 5060292302201"
              value={manualBarcode}
              onChange={e => setManualBarcode(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={20}
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={manualBarcode.length < 4}
          >
            <ScanBarcode size={18} />
            Look Up Product
          </button>
        </form>
      )}

      <div className="info-box info-box-blue" style={{ marginTop: 20 }}>
        <strong>ℹ️ About Barcodes:</strong> We use the Open Food Facts database — the world's largest open food product database with over 3 million products.
      </div>
    </div>
  )
}
