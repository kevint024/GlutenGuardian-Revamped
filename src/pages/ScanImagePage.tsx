import { useState, useRef } from 'react'
import { createWorker } from 'tesseract.js'
import { Camera, Upload, RotateCcw } from 'lucide-react'
import { analyzeIngredients } from '../utils/glutenAnalyzer'
import { addHistory } from '../services/storage'
import AnalysisResultCard from '../components/AnalysisResultCard'
import type { AnalysisResult } from '../utils/glutenAnalyzer'

export default function ScanImagePage() {
  const [image, setImage] = useState<string | null>(null)
  const [extractedText, setExtractedText] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Validate file type
    if (!file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      setImage(ev.target?.result as string)
      setResult(null)
      setExtractedText('')
    }
    reader.readAsDataURL(file)
  }

  const processImage = async () => {
    if (!image) return
    setLoading(true)
    setProgress(0)

    try {
      const worker = await createWorker('eng', undefined, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100))
          }
        },
      })

      const { data: { text } } = await worker.recognize(image)
      await worker.terminate()

      setExtractedText(text)

      if (text.trim()) {
        const analysis = analyzeIngredients(text)
        setResult(analysis)
        addHistory({
          type: 'scan',
          name: 'Image scan: ' + text.substring(0, 40) + '...',
          status: analysis.status,
        })
      }
    } catch {
      setExtractedText('Failed to extract text from image. Try a clearer photo.')
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  const handleReset = () => {
    setImage(null)
    setResult(null)
    setExtractedText('')
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="animate-in">
      <h1 className="page-title">Scan Label / Image</h1>
      <p className="page-subtitle">
        Take a photo or upload an image of a food ingredient label. We'll use OCR to extract text and analyze it for gluten content.
      </p>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        style={{ display: 'none' }}
        id="image-input"
      />

      {!image && (
        <>
          <div
            className="upload-area"
            onClick={() => fileRef.current?.click()}
          >
            <Camera size={40} />
            <p><strong>Take a Photo</strong> or Upload an Image</p>
            <p style={{ fontSize: '0.75rem', marginTop: 4, color: 'var(--gray-400)' }}>
              Tap to open camera or file picker
            </p>
          </div>

          <div className="info-box info-box-blue">
            <strong>📷 Tips for best results:</strong>
            <ul style={{ margin: '6px 0 0 16px', fontSize: '0.8125rem' }}>
              <li>Ensure good lighting</li>
              <li>Hold the camera steady and close to the label</li>
              <li>Make sure text is in focus and readable</li>
              <li>English text works best</li>
            </ul>
          </div>
        </>
      )}

      {image && (
        <>
          <img
            src={image}
            alt="Scanned"
            style={{
              width: '100%',
              maxHeight: 250,
              objectFit: 'contain',
              borderRadius: 'var(--radius)',
              background: 'var(--gray-100)',
              marginBottom: 12,
            }}
          />

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={processImage}
              disabled={loading}
            >
              {loading ? `Analyzing... ${progress}%` : 'Analyze Image'}
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              <RotateCcw size={16} />
            </button>
          </div>

          {loading && (
            <div>
              <div style={{
                height: 4,
                background: 'var(--gray-200)',
                borderRadius: 2,
                overflow: 'hidden',
                marginBottom: 8,
              }}>
                <div style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'var(--green-500)',
                  transition: 'width 0.3s',
                  borderRadius: 2,
                }} />
              </div>
              <p className="loading-text">Extracting text from image...</p>
            </div>
          )}
        </>
      )}

      {extractedText && !loading && (
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="card-title" style={{ marginBottom: 8 }}>Extracted Text</div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--gray-600)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
            {extractedText}
          </p>
        </div>
      )}

      {result && <AnalysisResultCard result={result} />}
    </div>
  )
}
