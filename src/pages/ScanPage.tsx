import { useState, useEffect, useRef, useCallback } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { useNavigate } from 'react-router-dom'

export default function ScanPage() {
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState('')
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const scanHandledRef = useRef(false)
  const navigate = useNavigate()

  const safeStop = useCallback(async () => {
    const scanner = scannerRef.current
    if (!scanner) return
    scannerRef.current = null
    try {
      const state = scanner.getState?.()
      if (state === 2 || state === 3) {
        await scanner.stop()
      }
    } catch {}
    try { scanner.clear() } catch {}
    setScanning(false)
  }, [])

  const handleCameraScan = useCallback((decodedText: string) => {
    const sanitized = decodedText.replace(/[^0-9]/g, '')
    if (sanitized.length < 4 || scanHandledRef.current) return
    scanHandledRef.current = true
    navigate(`/product/${sanitized}`)
  }, [navigate])

  useEffect(() => {
    let cancelled = false
    scanHandledRef.current = false

    const run = async () => {
      await new Promise(r => setTimeout(r, 50))
      if (cancelled) return

      const el = document.getElementById('barcode-reader')
      if (!el || cancelled) return

      try {
        const scanner = new Html5Qrcode('barcode-reader')
        scannerRef.current = scanner

        await scanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 250, height: 100 }, aspectRatio: 1.333 },
          (decodedText) => handleCameraScan(decodedText),
          () => {}
        )

        if (cancelled) {
          try { await scanner.stop() } catch {}
          try { scanner.clear() } catch {}
          scannerRef.current = null
          return
        }

        setScanning(true)
      } catch (err: any) {
        if (cancelled) return
        setError(
          err?.message?.includes('NotAllowedError') || err?.message?.includes('Permission')
            ? 'Camera access denied. Please allow camera permissions and try again.'
            : 'Could not start camera.'
        )
      }
    }

    run()

    return () => {
      cancelled = true
      safeStop()
    }
  }, [handleCameraScan, safeStop])

  return (
    <div className="animate-in">
      <h1 className="page-title">Scan Product</h1>
      <p className="page-subtitle">
        Scan a barcode with your camera to check if a product is gluten-free.
      </p>

      <div className="scanner-container">
        <div id="barcode-reader" style={{ width: '100%', height: '100%' }} />
        {!scanning && !error && (
          <div className="scanner-overlay">
            <div className="spinner" />
          </div>
        )}
      </div>
      {error && (
        <div className="info-box info-box-amber">{error}</div>
      )}
      {scanning && (
        <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--gray-500)' }}>
          Point your camera at a barcode...
        </p>
      )}

      <div className="info-box info-box-blue" style={{ marginTop: 20 }}>
        <strong>ℹ️ About Barcodes:</strong> We use the Open Food Facts database — the world's largest open food product database with over 3 million products.
      </div>
    </div>
  )
}
