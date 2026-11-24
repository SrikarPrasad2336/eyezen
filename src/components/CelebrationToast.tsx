import { useEffect, useState } from 'react'
import { Award } from 'lucide-react'
import { BADGES } from '../data/rewards'
import { BADGE_ICONS } from '../features/rewards/rewardIcons'
import { useHaptics } from '../hooks/useHaptics'
import { useSound } from '../hooks/useSound'
import { useT } from '../i18n'
import { useRewards } from '../store/rewardsStore'
import { Button } from './ui'
import './celebration.css'

const DELAY_MS = 1500 // wait a moment so it does not clash with the exercise chime
const AUTO_HIDE_MS = 10000

export default function CelebrationToast() {
  const t = useT()
  const pending = useRewards((state) => state.pending)
  const dismiss = useRewards((state) => state.dismiss)
  const buzz = useHaptics()
  const { sparkle } = useSound()
  const [shownId, setShownId] = useState<string | null>(null)

  const currentId = pending[0]
  const visible = currentId !== undefined && shownId === currentId

  // Show the next waiting badge after a short, calm pause
  useEffect(() => {
    if (currentId === undefined) return
    const id = window.setTimeout(() => {
      setShownId(currentId)
      sparkle()
      buzz([30, 60, 30])
    }, DELAY_MS)
    return () => window.clearTimeout(id)
  }, [currentId, sparkle, buzz])

  // Fade away by itself after a while
  useEffect(() => {
    if (!visible) return
    const id = window.setTimeout(dismiss, AUTO_HIDE_MS)
    return () => window.clearTimeout(id)
  }, [visible, currentId, dismiss])

  const badge = BADGES.find((item) => item.id === currentId)
  if (!visible || !badge) return null

  const Icon = BADGE_ICONS[badge.id] ?? Award
  const more = pending.length - 1

  return (
    <div className="ez-toast" role="status" aria-live="polite">
      <span className="ez-toast__orb" aria-hidden="true">
        <Icon size={30} />
      </span>
      <div className="ez-toast__text">
        <p className="ez-sub">{t('rw.badge.new')}</p>
        <h2 className="ez-toast__title">{badge.name}</h2>
        <p className="ez-muted">{badge.description}</p>
        {more > 0 ? (
          <p className="ez-sub">
            +{more} {t('rw.badge.more')}
          </p>
        ) : null}
      </div>
      <Button variant="soft" onClick={dismiss}>
        {t('rw.badge.ok')}
      </Button>
    </div>
  )
}