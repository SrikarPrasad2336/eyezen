import { Download, Smartphone } from 'lucide-react'
import { Button, Card } from '../../components/ui'
import { useT } from '../../i18n'
import { usePwa } from '../../store/pwaStore'
import '../nutrition/nutrition.css'

export default function InstallCard() {
  const t = useT()
  const installed = usePwa((state) => state.installed)
  const installEvent = usePwa((state) => state.installEvent)
  const online = usePwa((state) => state.online)
  const install = usePwa((state) => state.install)

  return (
    <Card>
      <div className="ez-stack" style={{ gap: 'var(--space-3)' }}>
        <div className="ez-row">
          <Smartphone size={22} color="var(--color-primary)" aria-hidden="true" />
          <h2>{t('pwa.install.title')}</h2>
        </div>

        <p>{installed ? t('pwa.install.done') : t('pwa.install.text')}</p>

        {!installed && installEvent ? (
          <div>
            <Button icon={<Download size={18} />} onClick={() => void install()}>
              {t('pwa.install.button')}
            </Button>
          </div>
        ) : null}

        {!installed && !installEvent ? (
          <div className="ez-stack" style={{ gap: 'var(--space-2)' }}>
            <h3>{t('pwa.install.how')}</h3>
            <ul className="ez-bullets">
              <li>{t('pwa.install.ios')}</li>
              <li>{t('pwa.install.android')}</li>
              <li>{t('pwa.install.desktop')}</li>
            </ul>
          </div>
        ) : null}

        <p className="ez-sub">
          {online ? t('pwa.status.online') : t('pwa.status.offline')} · {t('pwa.offlineNote')}
        </p>
        <p className="ez-caution">{t('pwa.storageNote')}</p>
      </div>
    </Card>
  )
}