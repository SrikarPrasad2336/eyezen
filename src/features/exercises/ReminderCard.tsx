import { useId, useState } from 'react'
import { Timer } from 'lucide-react'
import { Button, Card } from '../../components/ui'
import { useT } from '../../i18n'
import { useReminder } from '../../store/reminderStore'
import '../settings/settings.css'

function notificationsSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window
}

export default function ReminderCard() {
  const t = useT()
  const labelId = useId()
  const enabled = useReminder((state) => state.enabled)
  const enable = useReminder((state) => state.enable)
  const disable = useReminder((state) => state.disable)
  const [permission, setPermission] = useState<NotificationPermission>(() =>
    notificationsSupported() ? Notification.permission : 'denied',
  )

  const askPermission = async () => {
    try {
      setPermission(await Notification.requestPermission())
    } catch {
      // If the browser refuses, nothing breaks.
    }
  }

  return (
    <Card>
      <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
        <div className="ez-setting" style={{ borderTop: 0, padding: 0 }}>
          <span className="ez-setting__icon" aria-hidden="true">
            <Timer size={20} />
          </span>
          <div className="ez-setting__text">
            <span id={labelId} className="ez-setting__title">
              {t('rem.title')}
            </span>
            <span className="ez-sub">{t('rem.text')}</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-labelledby={labelId}
            className="ez-switch"
            onClick={() => (enabled ? disable() : enable())}
          />
        </div>

        {enabled && notificationsSupported() && permission === 'default' ? (
          <div>
            <Button variant="soft" onClick={() => void askPermission()}>
              {t('rem.notifications')}
            </Button>
          </div>
        ) : null}

        {enabled && permission === 'granted' ? (
          <p className="ez-sub">{t('rem.notifOn')}</p>
        ) : null}

        <p className="ez-sub">{t('rem.note')}</p>
      </div>
    </Card>
  )
}