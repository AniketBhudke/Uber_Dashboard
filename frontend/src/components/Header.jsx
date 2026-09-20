import { Bell, ChevronDown, Menu, Search, SlidersHorizontal } from 'lucide-react'

export default function Header({
  onMenuClick,
  title = 'Dashboard Overview',
  searchValue = '',
  onSearchChange,
  filterOpen,
  onToggleFilter,
  notificationsOpen,
  onToggleNotifications,
}) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-button mobile-only" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div>
          <p className="eyebrow">Operations</p>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="topbar-actions">
        <label className="search-box" aria-label="Search global data">
          <Search size={16} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search rides, drivers, customers"
          />
        </label>

        <button className="toolbar-button" aria-label="Filters" onClick={onToggleFilter}>
          <SlidersHorizontal size={16} />
          <span>Filter</span>
        </button>

        <button className="icon-button" aria-label="Notifications" onClick={onToggleNotifications}>
          <Bell size={18} />
          <span className="badge-dot">{notificationsOpen ? '!' : 3}</span>
        </button>

        <div className="profile-pill">
          <div className="avatar-circle">AG</div>
          <div>
            <p>Admin</p>
            <small>Super Admin</small>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  )
}
