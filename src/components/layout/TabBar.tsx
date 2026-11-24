import type { NavItem } from './navItems'

interface TabBarProps {
  items: NavItem[]
  activeId: string
  onSelect: (id: string) => void
}

export default function TabBar({ items, activeId, onSelect }: TabBarProps) {
  return (
    <nav className="ez-tabbar" aria-label="Main">
      {items.map((item) => {
        const Icon = item.icon
        const active = item.id === activeId
        return (
          <button
            key={item.id}
            type="button"
            className={`ez-tab ${active ? 'is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
            onClick={() => onSelect(item.id)}
          >
            <span className="ez-tab__pill">
              <Icon size={22} aria-hidden="true" />
            </span>
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}