import { useEffect } from 'react'
import { Check, RefreshCw, WifiOff } from 'lucide-react'
import { useT } from '../i18n'
import { usePwa } from '../store/pwaStore'
import { Button } from './ui'
import './pwa.css'

const READY_HIDE_MS = 8000

export default function PwaBanner() {
  const t = useT()
  const online = usePwa((state) => state.online)
  const needRefresh = usePwa((state) => state.needRefresh)
  const offlineReady = usePwa((state) => state.offlineReady)
  const applyUpdate = usePwa((state) => state.applyUpdate)
  const dismissUpdate = usePwa((state) => state.dismissUpdate)
  const dismissOfflineReady = usePwa((state) => state.dismissOfflineReady)

  // The "ready offline" note fades away by itself
  useEffect(() => {
    if (!offlineReady) return
    const id = window.setTimeout(dismissOfflineReady, READY_HIDE_MS)
    return () => window.clearTimeout(id)
  }, [offlineReady, dismissOfflineReady])

  if (online && !needRefresh && !offlineReady) return null

  return (
    <div className="ez-pwa" role="status" aria-live="polite">
      {!online ? (
        <div className="ez-pwa__pill">
          <WifiOff size={18} aria-hidden="true" /> {t('pwa.offline')}
        </div>
      ) : null}

      {needRefresh ? (
        <div className="ez-pwa__card">
          <span className="ez-pwa__icon" aria-hidden="true">
            <RefreshCw size={22} />
          </span>
          <div>
            <h2 className="ez-pwa__title">{t('pwa.update.title')}</h2>
            <p className="ez-muted">{t('pwa.update.text')}</p>
          </div>
          <div className="ez-row">
            <Button onClick={applyUpdate}>{t('pwa.update.now')}</Button>
            <Button variant="ghost" onClick={dismissUpdate}>
              {t('pwa.update.later')}
            </Button>
          </div>
        </div>
      ) : null}

      {offlineReady && !needRefresh ? (
        <div className="ez-pwa__card">
          <span className="ez-pwa__icon" aria-hidden="true">
            <Check size={22} />
          </span>
          <div>
            <h2 className="ez-pwa__title">{t('pwa.ready.title')}</h2>
            <p className="ez-muted">{t('pwa.ready.text')}</p>
          </div>
          <Button variant="soft" onClick={dismissOfflineReady}>
            {t('pwa.ok')}
          </Button>
        </div>
      ) : null}
    </div>
  )
}