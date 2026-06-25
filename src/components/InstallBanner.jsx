import { useState, useEffect } from 'react'
import styles from './InstallBanner.module.css'

export default function InstallBanner() {
  const [prompt, setPrompt] = useState(null)
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem('pwa-install-dismissed') === '1'
  )

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (!prompt || dismissed) return null

  function install() {
    prompt.prompt()
    prompt.userChoice.then(() => setPrompt(null))
  }

  function dismiss() {
    setDismissed(true)
    localStorage.setItem('pwa-install-dismissed', '1')
  }

  return (
    <div className={styles.banner}>
      <span className={styles.icon}>✈️</span>
      <span className={styles.text}>Add Travel Scheduler to your home screen</span>
      <button className={styles.install} onClick={install}>Install</button>
      <button className={styles.close} onClick={dismiss} aria-label="Dismiss">✕</button>
    </div>
  )
}
