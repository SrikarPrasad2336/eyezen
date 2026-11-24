import { useId } from 'react'
import {
  ArrowLeft,
  Sun,
  Moon,
  Sunset,
  Contrast,
  Wind,
  Volume2,
  Vibrate,
  ShieldCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Card } from '../../components/ui'
import { LANGUAGES, useT } from '../../i18n'
import type { MessageKey } from '../../i18n/en'
import { useSettings } from '../../store/settingsStore'
import type { Language, TextSize, Theme } from '../../store/settingsStore'
import './settings.css'
import InstallCard from './InstallCard'

const THEMES: { id: Theme; labelKey: MessageKey; icon: LucideIcon }[] = [
  { id: 'light', labelKey: 'theme.light', icon: Sun },
  { id: 'dark', labelKey: 'theme.dark', icon: Moon },
  { id: 'night-calm', labelKey: 'theme.nightCalm', icon: Sunset },
]

const TEXT_SIZES: { id: TextSize; labelKey: MessageKey }[] = [
  { id: 'small', labelKey: 'size.small' },
  { id: 'medium', labelKey: 'size.medium' },
  { id: 'large', labelKey: 'size.large' },
  { id: 'xlarge', labelKey: 'size.xlarge' },
]

interface ToggleRowProps {
  icon: LucideIcon
  title: string
  hint: string
  checked: boolean
  onChange: (value: boolean) => void
}

function ToggleRow({ icon: Icon, title, hint, checked, onChange }: ToggleRowProps) {
  const labelId = useId()
  return (
    <div className="ez-setting">
      <span className="ez-setting__icon" aria-hidden="true">
        <Icon size={20} />
      </span>
      <div className="ez-setting__text">
        <span id={labelId} className="ez-setting__title">
          {title}
        </span>
        <span className="ez-sub">{hint}</span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        className="ez-switch"
        onClick={() => onChange(!checked)}
      />
    </div>
  )
}

export default function SettingsPage() {
  const t = useT()
  const languageId = useId()
  const settings = useSettings()
  const { update, showConsentAgain } = settings

  const handleVibration = (value: boolean) => {
    update({ vibration: value })
    if (value && 'vibrate' in navigator) navigator.vibrate(40)
  }

  return (
    <div className="ez-stack">
      <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
        <Link to="/more" className="ez-back">
          <ArrowLeft size={18} aria-hidden="true" /> {t('settings.back')}
        </Link>
        <h1>{t('settings.title')}</h1>
      </div>

      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-4)' }}>
          <h2>{t('settings.appearance')}</h2>

          <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
            <span className="ez-setting__title">{t('settings.theme')}</span>
            <div className="ez-row" role="group" aria-label={t('settings.theme')}>
              {THEMES.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    type="button"
                    className="ez-chip"
                    aria-pressed={settings.theme === item.id}
                    onClick={() => update({ theme: item.id })}
                  >
                    <Icon size={18} aria-hidden="true" />
                    {t(item.labelKey)}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
            <span className="ez-setting__title">{t('settings.textSize')}</span>
            <div className="ez-row" role="group" aria-label={t('settings.textSize')}>
              {TEXT_SIZES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="ez-chip"
                  aria-pressed={settings.textSize === item.id}
                  onClick={() => update({ textSize: item.id })}
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </div>
          </div>

          <div className="ez-setting-list">
            <ToggleRow
              icon={Contrast}
              title={t('settings.contrast')}
              hint={t('settings.contrastHint')}
              checked={settings.highContrast}
              onChange={(value) => update({ highContrast: value })}
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-4)' }}>
          <h2>{t('settings.comfort')}</h2>
          <div className="ez-setting-list">
            <ToggleRow
              icon={Wind}
              title={t('settings.motion')}
              hint={t('settings.motionHint')}
              checked={settings.reduceMotion}
              onChange={(value) => update({ reduceMotion: value })}
            />
            <ToggleRow
              icon={Volume2}
              title={t('settings.sound')}
              hint={t('settings.soundHint')}
              checked={settings.sound}
              onChange={(value) => update({ sound: value })}
            />
            <ToggleRow
              icon={Vibrate}
              title={t('settings.vibration')}
              hint={t('settings.vibrationHint')}
              checked={settings.vibration}
              onChange={handleVibration}
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
          <h2>
            <label htmlFor={languageId}>{t('settings.language')}</label>
          </h2>
          <select
            id={languageId}
            className="ez-select"
            value={settings.language}
            onChange={(event) => update({ language: event.target.value as Language })}
          >
            {LANGUAGES.map((language) => (
              <option key={language.id} value={language.id}>
                {language.label}
              </option>
            ))}
          </select>
          <p className="ez-sub">{t('settings.languageHint')}</p>
        </div>
      </Card>

      <InstallCard />

      <Card variant="tinted">
        <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
          <h2>{t('settings.safety')}</h2>
          <p>{t('settings.safetyText')}</p>
          <div>
            <Button variant="ghost" icon={<ShieldCheck size={18} />} onClick={showConsentAgain}>
              {t('settings.safetyButton')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}