import { useState, useEffect, useRef } from 'react'
import { X, Download } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
  const [show, setShow] = useState(false)
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    // Don't show if already installed or previously dismissed
    if (window.matchMedia('(display-mode: standalone)').matches) return
    if (localStorage.getItem('pwa-install-dismissed')) return

    const handler = (e: Event) => {
      e.preventDefault()
      deferredPrompt.current = e as BeforeInstallPromptEvent
      setShow(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt.current) return
    deferredPrompt.current.prompt()
    const { outcome } = await deferredPrompt.current.userChoice
    if (outcome === 'accepted') {
      setShow(false)
    }
    deferredPrompt.current = null
  }

  const handleDismiss = () => {
    setShow(false)
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
    deferredPrompt.current = null
  }

  if (!show) return null

  return (
    <div className="install-prompt-overlay">
      <div className="install-prompt">
        <button className="install-prompt-close" onClick={handleDismiss} aria-label="Dismiss">
          <X size={18} />
        </button>
        <div className="install-prompt-icon">🛡️</div>
        <h3 className="install-prompt-title">Install Gluten Guardian</h3>
        <p className="install-prompt-text">
          Add to your home screen for a faster, app-like experience with offline access.
        </p>
        <div className="install-prompt-actions">
          <button className="btn btn-primary btn-full" onClick={handleInstall}>
            <Download size={16} />
            Install App
          </button>
          <button className="btn btn-secondary btn-full" onClick={handleDismiss}>
            Not Now
          </button>
        </div>
      </div>
    </div>
  )
}
