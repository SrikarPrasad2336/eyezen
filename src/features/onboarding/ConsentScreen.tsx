import { useState } from 'react'
import { BookOpen, ShieldCheck, Heart, Stethoscope, Lock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button, Card } from '../../components/ui'
import { EyeLogo, NatureWaves, Particles } from '../../components/illustrations'
import { LANGUAGES, useT } from '../../i18n'
import type { MessageKey } from '../../i18n/en'
import { useSettings } from '../../store/settingsStore'
import './onboarding.css'

const POINTS: { icon: LucideIcon; title: MessageKey; text: MessageKey }[] = [
  { icon: BookOpen, title: 'consent.p1.title', text: 'consent.p1.text' },
  { icon: ShieldCheck, title: 'consent.p2.title', text: 'consent.p2.text' },
  { icon: Heart, title: 'consent.p3.title', text: 'consent.p3.text' },
  { icon: Stethoscope, title: 'consent.p4.title', text: 'consent.p4.text' },
]

export default function ConsentScreen() {
  const t = useT()
  const acceptConsent = useSettings((state) => state.acceptConsent)
    const language = useSettings((state) => state.language)
  const update = useSettings((state) => state.update)
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="ez-consent">
      <Particles />
      <div className="ez-consent__waves">
        <NatureWaves />
      </div>

      <div className="ez-consent__inner ez-page">
        <div
          className="ez-row"
          role="group"
          aria-label={t('settings.language')}
          style={{ justifyContent: 'center' }}
        >
          {LANGUAGES.map((item) => (
            <button
              key={item.id}
              type="button"
              className="ez-chip"
              aria-pressed={language === item.id}
              onClick={() => update({ language: item.id })}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="ez-consent__head">
          <EyeLogo size={64} />
          <h1>{t('consent.title')}</h1>
          <p className="ez-muted">{t('consent.intro')}</p>
        </div>

        <Card variant="glass">
          <ul className="ez-points">
            {POINTS.map((point) => {
              const Icon = point.icon
              return (
                <li key={point.title} className="ez-point">
                  <span className="ez-point__icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h2 className="ez-point__title">{t(point.title)}</h2>
                    <p className="ez-muted">{t(point.text)}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Card>

        <label className="ez-check">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
          />
          <span>{t('consent.check')}</span>
        </label>

        <Button size="lg" fullWidth disabled={!agreed} onClick={acceptConsent}>
          {t('consent.button')}
        </Button>

        <p className="ez-consent__footer ez-sub">
          <Lock size={14} aria-hidden="true" /> {t('consent.footer')}
        </p>
      </div>
    </div>
  )
}