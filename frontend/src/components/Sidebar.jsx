import { useLocation, NavLink } from 'react-router-dom'
import {
  Activity,
  BarChart3,
  Bell,
  CarFront,
  DollarSign,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react'

const icons = {
  LayoutDashboard,
  Activity,
  CarFront,
  Users,
  UserRound,
  DollarSign,
  BarChart3,
  FileText,
  MessageSquare,
  Bell,
  ShieldCheck,
  Settings,
}

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  const items = [
    { label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { label: 'Operations Monitor', icon: 'Activity', path: '/operations-monitor' },
    { label: 'Ride Management', icon: 'CarFront', path: '/ride-management' },
    { label: 'Driver Management', icon: 'Users', path: '/driver-management' },
    { label: 'Fleet Management', icon: 'CarFront', path: '/fleet-management' },
    { label: 'Customer Management', icon: 'UserRound', path: '/customer-management' },
    { label: 'Revenue & Payments', icon: 'DollarSign', path: '/revenue' },
    { label: 'Analytics', icon: 'BarChart3', path: '/analytics' },
    { label: 'Reports', icon: 'FileText', path: '/reports' },
    { label: 'Complaints & Support', icon: 'MessageSquare', path: '/support' },
    { label: 'Notifications', icon: 'Bell', path: '/notifications' },
    { label: 'Admin Users', icon: 'ShieldCheck', path: '/admin-users' },
    { label: 'Settings', icon: 'Settings', path: '/settings' },
  ]

  const navContent = (
    <aside className="sidebar-panel">
      <div className="sidebar-header">
        <div className="brand-mark">UC</div>
        <div>
          <p className="brand-name">UBER COMMAND</p>
          <p className="brand-subtitle">CENTER</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => {
          const Icon = icons[item.icon]
          const matches = location.pathname === item.path

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={`sidebar-link ${matches ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )

  return (
    <>
      <div className={`sidebar-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`sidebar-shell ${isOpen ? 'open' : ''}`}>{navContent}</div>
    </>
  )
}
