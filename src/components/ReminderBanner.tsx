import { useEffect } from 'react'
import { Timer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../i18n'
import { useReminder } from '../store/reminderStore'
import { Button } from './ui'
import './reminder.css'

const CHECK_EVERY_MS = 5000
// If the app was closed for ages, do not pop up an old reminder
const STALE_MS = 10 * 60 * 1000

export default function ReminderBanner() {
  const t = useT()
  const navigate = useNavigate()
  const enabled = useReminder((state) => state.enabled)
  const due = useReminder((state) => state.due)
  const snooze = useReminder((state) => state.snooze)
  const restart = useReminder((state) => state.restart)

  const title = t('rem.banner.title')
  const body = t('rem.banner.text')

  // Every few seconds, check whether the reminder time has come
  useEffect(() => {
    if (!enabled) return
    const check = () => {
      const state = useReminder.getState()
      const now = Date.now()
      if (state.due || now < state.nextAt) return
      if (now - state.nextAt > STALE_MS) state.restart()
      else state.fire()
    }
    const id = window.setInterval(check, CHECK_EVERY_MS)
    return () => window.clearInterval(id)
  }, [enabled])

  // If you are in another tab, also show a system notification (if allowed)
  useEffect(() => {
    if (!enabled || !due || !document.hidden) return
    if (!('Notification' in window) || Notification.permission !== 'granted') return
    try {
      new Notification(title, { body })
    } catch {
      // Notifications are a bonus. If they fail, the in-app reminder still works.
    }
  }, [enabled, due, title, body])

  if (!enabled || !due) return null

  const handleStart = () => {
    restart()
    navigate('/exercises/twenty-20-20')
  }

  return (
    <div className="ez-reminder" role="alert">
      <div className="ez-reminder__head">
        <span className="ez-reminder__icon" aria-hidden="true">
          <Timer size={22} />
        </span>
        <div>
          <h2 className="ez-reminder__title">{title}</h2>
          <p className="ez-muted">{body}</p>
        </div>
      </div>
      <div className="ez-row">
        <Button onClick={handleStart}>{t('rem.banner.start')}</Button>
        <Button variant="soft" onClick={() => snooze(5)}>
          {t('rem.banner.snooze')}
        </Button>
        <Button variant="ghost" onClick={restart}>
          {t('rem.banner.skip')}
        </Button>
      </div>
    </div>
  )
}