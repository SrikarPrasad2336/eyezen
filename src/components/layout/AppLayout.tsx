import { Suspense, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import CelebrationToast from '../CelebrationToast'
import PwaBanner from '../PwaBanner'
import ErrorBoundary from '../ErrorBoundary'
import ReminderBanner from '../ReminderBanner'
import { useBadgeWatcher } from '../../hooks/useBadgeWatcher'
import { useT } from '../../i18n'
import PageSkeleton from './PageSkeleton'
import PageTransition from './PageTransition'
import SideBar from './SideBar'
import TabBar from './TabBar'
import { NAV_ITEMS } from './navItems'
import type { NavItem } from './navItems'

export default function AppLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const t = useT()

  // Awards badges as you make progress
  useBadgeWatcher()

  const items: NavItem[] = NAV_ITEMS.map((item) => ({
    id: item.id,
    label: t(item.labelKey),
    icon: item.icon,
  }))

  // "/more/settings" counts as the "more" tab
  const firstPart = pathname.split('/')[1] ?? ''
  const activeId =
    firstPart === '' ? 'home' : NAV_ITEMS.some((item) => item.id === firstPart) ? firstPart : 'more'

  const handleSelect = (id: string) => {
    const target = NAV_ITEMS.find((item) => item.id === id)
    if (target) navigate(target.path)
  }

  // Start each new page at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="ez-shell">
      <SideBar items={items} activeId={activeId} onSelect={handleSelect} />
      <main className="ez-main">
        <div className="ez-content">
          <PageTransition routeKey={pathname}>
            <ErrorBoundary resetKey={pathname}>
              <Suspense fallback={<PageSkeleton />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </PageTransition>
          <footer className="ez-disclaimer">{t('app.disclaimer')}</footer>
        </div>
      </main>
      <ReminderBanner />
      <CelebrationToast />
      <PwaBanner />
      <TabBar items={items} activeId={activeId} onSelect={handleSelect} />
    </div>
  )
}