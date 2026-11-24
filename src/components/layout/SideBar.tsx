import { EyeLogo } from '../illustrations'
import type { NavItem } from './navItems'

interface SideBarProps {
  items: NavItem[]
  activeId: string
  onSelect: (id: string) => void
}

export default function SideBar({ items, activeId, onSelect }: SideBarProps) {
  return (
    <aside className="ez-sidebar">
      <div className="ez-sidebar__brand">
        <EyeLogo size={44} />
        <span className="ez-sidebar__name">EyeZen</span>
      </div>
      <nav aria-label="Main" className="ez-sidebar__nav">
        {items.map((item) => {
          const Icon = item.icon
          const active = item.id === activeId
          return (
            <button
              key={item.id}
              type="button"
              className={`ez-side-link ${active ? 'is-active' : ''}`}
              aria-current={active ? 'page' : undefined}
              onClick={() => onSelect(item.id)}
            >
              <Icon size={22} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}