import { useState, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Paperclip, X } from 'lucide-react'

export default function BugReportPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const context = searchParams.get('context') || ''

  const [description, setDescription] = useState('')
  const [sent, setSent] = useState(false)


  const handleSend = () => {
    const subject = encodeURIComponent('Bug Report – GlutenGuardian')
    const bodyLines = [
      'Issue Description:',
      description,
      '',
      context ? `Context: ${context}` : '',
      '',
      '---',
      'Sent from GlutenGuardian App',
    ].filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))

    const body = encodeURIComponent(bodyLines.join('\n').trim())
    window.location.href = `mailto:contact@noglutenfor.me?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="animate-in">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="page-title">Report an Issue</h1>
      <p className="page-subtitle">
        Something look wrong? Let us know and we'll look into it. Your report helps improve accuracy for everyone.
      </p>

      {context && (
        <div className="info-box info-box-blue" style={{ marginBottom: 16 }}>
          <strong>Reporting about:</strong> {context}
        </div>
      )}

      <div className="input-group">
        <label className="input-label">What's wrong? *</label>
        <textarea
          className="input"
          placeholder="e.g. This product was marked unsafe but it's certified gluten-free. The barcode scanned correctly but the result seems incorrect.If possible, please attach a screenshot in your email."
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={5}
        />
      </div>

      {sent && (
        <div className="info-box info-box-green" style={{ marginBottom: 16 }}>
          ✅ Your email app should have opened. Thank you for your report!
        </div>
      )}

      <button
        className="btn btn-primary"
        style={{ width: '100%' }}
        onClick={handleSend}
        disabled={!description.trim()}
      >
        <Send size={16} />
        Open Email App to Send
      </button>

      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 12 }}>
        Reports are sent to contact@noglutenfor.me
      </p>
    </div>
  )
}
