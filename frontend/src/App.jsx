import { useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  CarFront,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShieldCheck,
  Star,
  Users,
  UserRound,
  Wallet,
  XCircle,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import {
  cancellationReasons,
  customerData,
  dashboardMetrics,
  driverData,
  driverPerformance,
  fleetIntelligenceData,
  fleetOwnershipData,
  fleetMetrics,
  liveRides,
  notifications,
  recentActivities,
  recentTransactions,
  revenueData,
  revenueKpis,
  rideActivityData,
  rideTable,
  systemAlerts,
  tickets,
  topDrivers,
  users,
  vehicleFleet,
  vehicleTypeData,
} from './data/dashboardData'

const iconMap = {
  CarFront,
  Users,
  UserRound,
  DollarSign: CircleDollarSign,
  Star,
  CheckCircle2,
  XCircle,
  Wallet,
}

function AppShell({
  children,
  title,
  searchValue,
  onSearchChange,
  filterOpen,
  onToggleFilter,
  notificationsOpen,
  onToggleNotifications,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('All')
  const navigate = useNavigate()

  const searchRecords = useMemo(() => [
    ...driverData.map((driver) => ({
      category: 'Drivers',
      title: driver.name,
      detail: `${driver.id} · ${driver.vehicle} · ${driver.status}`,
      path: '/driver-management',
    })),
    ...rideTable.map((ride) => ({
      category: 'Rides',
      title: `${ride.id} · ${ride.customer}`,
      detail: `${ride.driver} · ${ride.pickup} to ${ride.destination}`,
      path: '/ride-management',
    })),
    ...customerData.map((customer) => ({
      category: 'Customers',
      title: customer.name,
      detail: `${customer.id} · ${customer.email} · ${customer.rides} rides`,
      path: '/customer-management',
    })),
    ...vehicleFleet.map((vehicle) => ({
      category: 'Vehicle',
      title: `${vehicle.id} · ${vehicle.model}`,
      detail: `${vehicle.owner} · ${vehicle.type} · ${vehicle.status}`,
      path: '/fleet-management',
    })),
  ], [])

  const searchResults = useMemo(() => {
    const query = searchValue.trim().toLowerCase()
    if (!query) return []

    return searchRecords
      .filter((record) => selectedFilter === 'All' || record.category === selectedFilter)
      .filter((record) => `${record.category} ${record.title} ${record.detail}`.toLowerCase().includes(query))
      .slice(0, 8)
  }, [searchRecords, searchValue, selectedFilter])

  const handleSearchResultClick = (path) => {
    navigate(path)
    onSearchChange?.('')
  }

  const handleFilterChange = (filter) => {
    const filterRoutes = {
      All: '/dashboard',
      Rides: '/ride-management',
      Drivers: '/driver-management',
      Customers: '/customer-management',
      Vehicle: '/fleet-management',
    }

    setSelectedFilter(filter)
    navigate(filterRoutes[filter])
    onToggleFilter?.()
  }

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="content-shell">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          title={title}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          filterOpen={filterOpen}
          onToggleFilter={onToggleFilter}
          notificationsOpen={notificationsOpen}
          onToggleNotifications={onToggleNotifications}
        />

        {filterOpen && (
          <div className="header-panel filter-panel">
            {['All', 'Rides', 'Drivers', 'Customers', 'Vehicle'].map((filter) => (
              <button
                key={filter}
                className={`panel-chip ${selectedFilter === filter ? 'active' : ''}`}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        {notificationsOpen && (
          <div className="header-panel notifications-panel">
            <div className="notification-item">
              <strong>Payment batch processed</strong>
              <span>$84,230 sent to 146 drivers</span>
            </div>
            <div className="notification-item">
              <strong>New driver verification</strong>
              <span>Driver D-114 cleared KYC review</span>
            </div>
            <div className="notification-item">
              <strong>High-demand zone alert</strong>
              <span>Airport corridor demand up 18%</span>
            </div>
          </div>
        )}

        {searchValue.trim() && (
          <div className="header-panel search-results-panel">
            <div className="search-results-heading">
              <strong>Search results</strong>
              <span>{searchResults.length} match{searchResults.length === 1 ? '' : 'es'}</span>
            </div>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <button
                  key={`${result.category}-${result.title}`}
                  className="search-result"
                  onClick={() => handleSearchResultClick(result.path)}
                >
                  <span className="search-result-category">{result.category}</span>
                  <span className="search-result-copy">
                    <strong>{result.title}</strong>
                    <small>{result.detail}</small>
                  </span>
                </button>
              ))
            ) : (
              <div className="empty-search-result">No matching records. Try a driver name, ride ID, customer, or vehicle.</div>
            )}
          </div>
        )}

        <main className="page-content">{children}</main>
      </div>
    </div>
  )
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: 'admin', password: 'uber123' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      if (form.username === 'admin' && form.password === 'uber123') {
        onLogin({ name: 'Admin', role: 'Super Admin' })
      } else {
        setError('Invalid credentials. Use the demo admin account.')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="login-page">
      <div className="login-panel">
        <div className="login-badge">Admin Authentication</div>
        <h1>UBER COMMAND CENTER</h1>
        <p className="login-subtitle">Operations control and fleet intelligence for admin teams.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="field-label">
            Username or Email
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="admin"
            />
          </label>

          <label className="field-label">
            Password
            <div className="password-input-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter password"
              />
              <button type="button" className="ghost-button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <div className="login-options">
            <label className="checkbox-row">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-button">Forgot password?</button>
          </div>

          {error && <div className="error-box">{error}</div>}

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-note">
          Demo access: <strong>admin</strong> / <strong>uber123</strong>
        </div>
      </div>
    </div>
  )
}

function DashboardPage() {
  return (
    <>
      <section className="hero-banner analytics-hero">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h2>Performance Overview</h2>
        </div>
        <div className="hero-meta">
          <span>Snapshot</span>
          <strong>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
        </div>
      </section>

      <div className="stats-grid">
        {dashboardMetrics.map((metric) => {
          const Icon = iconMap[metric.icon] || BarChart3
          return (
            <StatCard
              key={metric.label}
              icon={Icon}
              label={metric.label}
              value={metric.value}
              delta={metric.delta}
              trend={metric.trend}
            />
          )
        })}
      </div>

      <div className="stats-grid compact-grid">
        {fleetMetrics.map((metric) => {
          const Icon = iconMap[metric.icon] || BarChart3
          return (
            <StatCard
              key={metric.label}
              icon={Icon}
              label={metric.label}
              value={metric.value}
              delta={metric.delta}
              trend={metric.trend}
            />
          )
        })}
      </div>

      <div className="charts-grid analytics-grid">
        <ChartCard title="Revenue" subtitle="Monthly trend">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#31d0aa" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#31d0aa" stopOpacity={0.08} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#24314d" />
              <XAxis dataKey="name" stroke="#9aa8c3" />
              <YAxis stroke="#9aa8c3" />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#31d0aa" fill="url(#revFill)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Demand" subtitle="14-day ride volume trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={rideActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#24314d" />
              <XAxis dataKey="name" stroke="#9aa8c3" />
              <YAxis stroke="#9aa8c3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#4ea8ff" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="cancelled" stroke="#ff6b6b" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Trip Mix" subtitle="Ride category share">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={cancellationReasons} dataKey="value" nameKey="name" innerRadius={52} outerRadius={90} paddingAngle={4}>
                {cancellationReasons.map((entry, index) => (
                  <Cell key={entry.name} fill={['#4ea8ff', '#31d0aa', '#f7b955', '#ff6b6b', '#5ad1ff', '#b18cff', '#ff9f68', '#8bd450'][index % 8]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Efficiency" subtitle="Rides per driver">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={driverPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#24314d" />
              <XAxis dataKey="name" stroke="#9aa8c3" />
              <YAxis stroke="#9aa8c3" />
              <Tooltip />
              <Bar dataKey="rides" fill="#7c9cff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="two-column-grid analytics-lower-grid">
        <PanelCard title="Vehicle Type Mix" action="Fleet">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vehicleTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#24314d" />
              <XAxis dataKey="name" stroke="#9aa8c3" />
              <YAxis stroke="#9aa8c3" />
              <Tooltip />
              <Bar dataKey="count" fill="#4ea8ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </PanelCard>

        <PanelCard title="Fleet Ownership" action="Owners">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={fleetOwnershipData}>
              <defs>
                <linearGradient id="fleetFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#31d0aa" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#31d0aa" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#24314d" />
              <XAxis dataKey="name" stroke="#9aa8c3" interval={0} angle={-25} textAnchor="end" height={60} />
              <YAxis stroke="#9aa8c3" />
              <Tooltip />
              <Area type="monotone" dataKey="vehicles" stroke="#31d0aa" fill="url(#fleetFill)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </PanelCard>
      </div>

    </>
  )
}

function LiveOperationsPage() {
  return (
    <PanelCard title="Operations Monitor" action="Refresh">
      <div className="stat-strip">
        <MetricPill label="Active Rides" value="142" />
        <MetricPill label="Available Drivers" value="320" />
        <MetricPill label="Busy Drivers" value="284" />
        <MetricPill label="Pending Requests" value="17" />
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Ride ID</th>
              <th>Customer</th>
              <th>Driver</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Status</th>
              <th>Fare</th>
              <th>Booking Time</th>
            </tr>
          </thead>
          <tbody>
            {liveRides.map((ride) => (
              <tr key={ride.id}>
                <td>{ride.id}</td>
                <td>{ride.customer}</td>
                <td>{ride.driver}</td>
                <td>{ride.pickup}</td>
                <td>{ride.drop}</td>
                <td><span className={`status-pill ${ride.status.toLowerCase()}`}>{ride.status}</span></td>
                <td>{ride.fare}</td>
                <td>{ride.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelCard>
  )
}

function FleetManagementPage() {
  const [selectedType, setSelectedType] = useState('All Fleet')
  const selectedProfile = fleetIntelligenceData.find((profile) => profile.name === selectedType) || fleetIntelligenceData[0]
  const filteredVehicles = selectedType === 'All Fleet'
    ? vehicleFleet
    : vehicleFleet.filter((vehicle) => vehicle.type === selectedType)
  const demandData = ['6 AM', '9 AM', '12 PM', '4 PM', '7 PM', '10 PM'].map((hour, index) => ({
    hour,
    rides: selectedProfile.hourlyDemand[index],
  }))

  return (
    <>
      <div className="stats-grid compact-grid">
        {fleetMetrics.map((metric) => {
          const Icon = iconMap[metric.icon] || BarChart3
          return (
            <StatCard
              key={metric.label}
              icon={Icon}
              label={metric.label}
              value={metric.value}
              delta={metric.delta}
              trend={metric.trend}
            />
          )
        })}
      </div>

      <div className="charts-grid analytics-grid">
        <ChartCard title="Vehicle Type Distribution" subtitle="Fleet category split">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={vehicleTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#24314d" />
              <XAxis dataKey="name" stroke="#9aa8c3" />
              <YAxis stroke="#9aa8c3" />
              <Tooltip />
              <Bar dataKey="count" fill="#4ea8ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Vehicle Utilization Rate" subtitle="Operational capacity by category">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={vehicleTypeData}>
              <defs>
                <linearGradient id="utilFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#31d0aa" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#31d0aa" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#24314d" />
              <XAxis dataKey="name" stroke="#9aa8c3" />
              <YAxis stroke="#9aa8c3" domain={[0, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="utilization" stroke="#31d0aa" fill="url(#utilFill)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <PanelCard title="Fleet Intelligence" action="Live profile">
        <div className="fleet-intelligence-toolbar">
          <div>
            <p className="panel-kicker">Operational lens</p>
            <h4>Compare demand and performance by vehicle type</h4>
          </div>
          <label className="select-field">
            <span>Vehicle type</span>
            <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
              {fleetIntelligenceData.map((profile) => <option key={profile.name}>{profile.name}</option>)}
            </select>
          </label>
        </div>

        <div className="intelligence-metrics">
          <MetricPill label="Utilization" value={`${selectedProfile.utilization}%`} />
          <MetricPill label="Completed rides" value={selectedProfile.completedRides.toLocaleString()} />
          <MetricPill label="Revenue" value={`$${(selectedProfile.revenue / 1000).toLocaleString()}K`} />
          <MetricPill label="Cancellation rate" value={`${selectedProfile.cancellationRate}%`} />
        </div>

        <div className="intelligence-chart">
          <div className="section-heading">
            <div>
              <h4>Demand by operating window</h4>
              <p>{selectedType} booking volume across the day</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={demandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#24314d" />
              <XAxis dataKey="hour" stroke="#9aa8c3" />
              <YAxis stroke="#9aa8c3" />
              <Tooltip />
              <Bar dataKey="rides" name="Bookings" fill="#f7b955" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </PanelCard>

      <PanelCard title="Vehicle Owner & Asset Details" action="Export">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Owner</th>
                <th>Vehicle Type</th>
                <th>Model</th>
                <th>Registration</th>
                <th>Assigned Driver</th>
                <th>Status</th>
                <th>Mileage</th>
                <th>Fuel</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.owner}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.plate}</td>
                  <td>{vehicle.driver}</td>
                  <td><span className={`status-pill ${vehicle.status.toLowerCase()}`}>{vehicle.status}</span></td>
                  <td>{vehicle.mileage}</td>
                  <td>{vehicle.fuel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelCard>
    </>
  )
}

function RideManagementPage() {
  return (
    <PanelCard title="Ride Management" action="Export Log">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Ride ID</th>
              <th>Customer</th>
              <th>Driver</th>
              <th>Pickup</th>
              <th>Destination</th>
              <th>Type</th>
              <th>Fare</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {rideTable.map((ride) => (
              <tr key={ride.id}>
                <td>{ride.id}</td>
                <td>{ride.customer}</td>
                <td>{ride.driver}</td>
                <td>{ride.pickup}</td>
                <td>{ride.destination}</td>
                <td>{ride.type}</td>
                <td>{ride.fare}</td>
                <td>{ride.payment}</td>
                <td><span className={`status-pill ${ride.status.toLowerCase()}`}>{ride.status}</span></td>
                <td>{ride.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelCard>
  )
}

function DriverManagementPage() {
  return (
    <PanelCard title="Driver Management" action="Add Driver">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Driver</th>
              <th>Phone / Email</th>
              <th>Vehicle</th>
              <th>Rides</th>
              <th>Rating</th>
              <th>Earnings</th>
              <th>Status</th>
              <th>Verification</th>
            </tr>
          </thead>
          <tbody>
            {driverData.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.id}</td>
                <td>{driver.name}</td>
                <td>{driver.phone}<br />{driver.email}</td>
                <td>{driver.vehicle}<br />{driver.reg}</td>
                <td>{driver.rides}</td>
                <td>{driver.rating}</td>
                <td>{driver.earnings}</td>
                <td><span className={`status-pill ${driver.status.toLowerCase()}`}>{driver.status}</span></td>
                <td>{driver.verification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelCard>
  )
}

function CustomerManagementPage() {
  return (
    <PanelCard title="Customer Management" action="Add Customer">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total Rides</th>
              <th>Total Spend</th>
              <th>Registration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.rides}</td>
                <td>{customer.spend}</td>
                <td>{customer.date}</td>
                <td><span className={`status-pill ${customer.status.toLowerCase()}`}>{customer.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelCard>
  )
}

function RevenuePage() {
  return (
    <>
      <div className="stats-grid compact-grid">
        {revenueKpis.map((metric) => (
          <StatCard key={metric.label} icon={CircleDollarSign} label={metric.label} value={metric.value} delta={metric.delta} trend="up" />
        ))}
      </div>

      <div className="charts-grid">
        <ChartCard title="Revenue Over Time" subtitle="Gross revenue vs operating cost">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#24314d" />
              <XAxis dataKey="name" stroke="#9aa8c3" />
              <YAxis stroke="#9aa8c3" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#31d0aa" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cancellation Analysis" subtitle="Top reasons for cancellations">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cancellationReasons}>
              <CartesianGrid strokeDasharray="3 3" stroke="#24314d" />
              <XAxis dataKey="name" stroke="#9aa8c3" />
              <YAxis stroke="#9aa8c3" />
              <Tooltip />
              <Bar dataKey="value" fill="#ff6b6b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </>
  )
}

function AnalyticsPage() {
  return (
    <div className="charts-grid">
      <ChartCard title="Ride Volume Analysis" subtitle="Daily demand by market">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={rideActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#24314d" />
            <XAxis dataKey="name" stroke="#9aa8c3" />
            <YAxis stroke="#9aa8c3" />
            <Tooltip />
            <Area type="monotone" dataKey="completed" stroke="#4ea8ff" fill="#4ea8ff" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Peak Ride Hours" subtitle="Performance pattern across day">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={[{ hour: '9 AM', rides: 130 }, { hour: '12 PM', rides: 206 }, { hour: '4 PM', rides: 230 }, { hour: '7 PM', rides: 245 }, { hour: '9 PM', rides: 210 }]}> 
            <CartesianGrid strokeDasharray="3 3" stroke="#24314d" />
            <XAxis dataKey="hour" stroke="#9aa8c3" />
            <YAxis stroke="#9aa8c3" />
            <Tooltip />
            <Bar dataKey="rides" fill="#7c9cff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}

function ReportsPage() {
  const [generatedReport, setGeneratedReport] = useState('')

  const downloadCsv = (filename, rows) => {
    const headers = Object.keys(rows[0])
    const csv = [
      headers.join(','),
      ...rows.map((row) => headers.map((header) => `"${String(row[header]).replaceAll('"', '""')}"`).join(',')),
    ].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleGenerate = (label, filename, rows) => {
    downloadCsv(filename, rows)
    setGeneratedReport(`${label} generated and downloaded.`)
  }

  return (
    <PanelCard title="Reports" action="Print / Save PDF" onAction={() => window.print()}>
      {generatedReport && <div className="report-status" role="status">{generatedReport}</div>}
      <div className="report-grid">
        <div className="report-box">
          <FileText size={18} />
          <div>
            <strong>Ride Report</strong>
            <p>Review trip volume and completion trends</p>
          </div>
          <button
            className="primary-button small"
            onClick={() => handleGenerate('Ride report', 'ride-report.csv', rideTable)}
          >
            Generate
          </button>
        </div>
        <div className="report-box">
          <BarChart3 size={18} />
          <div>
            <strong>Revenue Report</strong>
            <p>Track payouts, refunds and fee trends</p>
          </div>
          <button
            className="primary-button small"
            onClick={() => handleGenerate('Revenue report', 'revenue-report.csv', revenueData)}
          >
            Generate
          </button>
        </div>
        <div className="report-box">
          <Users size={18} />
          <div>
            <strong>Driver Performance</strong>
            <p>Assess utilization and trip quality</p>
          </div>
          <button
            className="primary-button small"
            onClick={() => handleGenerate('Driver performance report', 'driver-performance-report.csv', driverPerformance)}
          >
            Generate
          </button>
        </div>
      </div>
    </PanelCard>
  )
}

function SupportPage() {
  return (
    <PanelCard title="Complaints & Support" action="New Ticket">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Customer</th>
              <th>Related Ride</th>
              <th>Subject</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned Admin</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.customer}</td>
                <td>{ticket.ride}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.priority}</td>
                <td><span className={`status-pill ${ticket.status.toLowerCase()}`}>{ticket.status}</span></td>
                <td>{ticket.assigned}</td>
                <td>{ticket.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelCard>
  )
}

function NotificationsPage() {
  return (
    <PanelCard title="Notifications" action="Mark all read">
      <div className="notification-list">
        {notifications.map((note) => (
          <div key={note.id} className={`notification-item ${note.read ? 'read' : 'unread'}`}>
            <div className="notification-bullet" />
            <div>
              <strong>{note.title}</strong>
              <p>{note.message}</p>
            </div>
            <div className="notification-meta">
              <span>{note.type}</span>
              <small>{note.time}</small>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  )
}

function AdminUsersPage() {
  return (
    <PanelCard title="Admin Users" action="Add Admin">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.name}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td><span className={`status-pill ${user.status.toLowerCase()}`}>{user.status}</span></td>
                <td>Read + Write + Approve</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelCard>
  )
}

function SettingsPage() {
  return (
    <PanelCard title="Settings" action="Save Changes">
      <div className="settings-grid">
        <div className="settings-card">
          <h3>General Settings</h3>
          <div className="field-group">
            <label>Company Name<input defaultValue="Uber Command Center" /></label>
            <label>Timezone<input defaultValue="UTC-5" /></label>
          </div>
        </div>
        <div className="settings-card">
          <h3>Security</h3>
          <div className="field-group">
            <label>Two-Factor Auth<input type="checkbox" defaultChecked /></label>
            <label>Session Timeout<input defaultValue="30 min" /></label>
          </div>
        </div>
        <div className="settings-card">
          <h3>Notification Preferences</h3>
          <div className="field-group">
            <label>Email Alerts<input type="checkbox" defaultChecked /></label>
            <label>SMS Alerts<input type="checkbox" /></label>
          </div>
        </div>
      </div>
    </PanelCard>
  )
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="chart-card">
      <div className="section-heading">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function PanelCard({ title, action, onAction, children }) {
  return (
    <div className="panel-card">
      <div className="section-heading">
        <div>
          <h3>{title}</h3>
        </div>
        {action && <button className="text-button" onClick={onAction}>{action}</button>}
      </div>
      {children}
    </div>
  )
}

function MetricPill({ label, value }) {
  return (
    <div className="metric-pill">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  )
}

function AppContent() {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const location = useLocation()

  const pageTitle = useMemo(() => {
    const titles = {
      '/dashboard': 'Dashboard Overview',
      '/operations-monitor': 'Operations Monitor',
      '/ride-management': 'Ride Management',
      '/driver-management': 'Driver Management',
      '/fleet-management': 'Fleet Management',
      '/customer-management': 'Customer Management',
      '/revenue': 'Revenue & Payments',
      '/analytics': 'Analytics',
      '/reports': 'Reports',
      '/support': 'Complaints & Support',
      '/notifications': 'Notifications',
      '/admin-users': 'Admin Users',
      '/settings': 'Settings',
    }
    return titles[location.pathname] || 'Dashboard Overview'
  }, [location.pathname])

  const handleLogin = (userData) => {
    setUser(userData)
    setAuthenticated(true)
    setSearchValue('')
    setFilterOpen(false)
    setNotificationsOpen(false)
  }

  const handleToggleFilter = () => {
    setFilterOpen((prev) => !prev)
    setNotificationsOpen(false)
  }

  const handleToggleNotifications = () => {
    setNotificationsOpen((prev) => !prev)
    setFilterOpen(false)
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={authenticated ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />}
      />

      <Route
        path="/"
        element={
          authenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={authenticated}>
            <AppShell
              title={pageTitle}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterOpen={filterOpen}
              onToggleFilter={handleToggleFilter}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={handleToggleNotifications}
            >
              <DashboardPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/operations-monitor"
        element={
          <ProtectedRoute isAuthenticated={authenticated}>
            <AppShell
              title={pageTitle}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterOpen={filterOpen}
              onToggleFilter={handleToggleFilter}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={handleToggleNotifications}
            >
              <LiveOperationsPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ride-management"
        element={
          <ProtectedRoute isAuthenticated={authenticated}>
            <AppShell
              title={pageTitle}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterOpen={filterOpen}
              onToggleFilter={handleToggleFilter}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={handleToggleNotifications}
            >
              <RideManagementPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/driver-management"
        element={
          <ProtectedRoute isAuthenticated={authenticated}>
            <AppShell
              title={pageTitle}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterOpen={filterOpen}
              onToggleFilter={handleToggleFilter}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={handleToggleNotifications}
            >
              <DriverManagementPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/fleet-management"
        element={
          <ProtectedRoute isAuthenticated={authenticated}>
            <AppShell
              title={pageTitle}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterOpen={filterOpen}
              onToggleFilter={handleToggleFilter}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={handleToggleNotifications}
            >
              <FleetManagementPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-management"
        element={
          <ProtectedRoute isAuthenticated={authenticated}>
            <AppShell
              title={pageTitle}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterOpen={filterOpen}
              onToggleFilter={handleToggleFilter}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={handleToggleNotifications}
            >
              <CustomerManagementPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/revenue"
        element={
          <ProtectedRoute isAuthenticated={authenticated}>
            <AppShell
              title={pageTitle}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterOpen={filterOpen}
              onToggleFilter={handleToggleFilter}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={handleToggleNotifications}
            >
              <RevenuePage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute isAuthenticated={authenticated}>
            <AppShell
              title={pageTitle}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterOpen={filterOpen}
              onToggleFilter={handleToggleFilter}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={handleToggleNotifications}
            >
              <AnalyticsPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute isAuthenticated={authenticated}>
            <AppShell
              title={pageTitle}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterOpen={filterOpen}
              onToggleFilter={handleToggleFilter}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={handleToggleNotifications}
            >
              <ReportsPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoute isAuthenticated={authenticated}>
            <AppShell
              title={pageTitle}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterOpen={filterOpen}
              onToggleFilter={handleToggleFilter}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={handleToggleNotifications}
            >
              <SupportPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute isAuthenticated={authenticated}>
            <AppShell
              title={pageTitle}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterOpen={filterOpen}
              onToggleFilter={handleToggleFilter}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={handleToggleNotifications}
            >
              <NotificationsPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-users"
        element={
          <ProtectedRoute isAuthenticated={authenticated}>
            <AppShell
              title={pageTitle}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterOpen={filterOpen}
              onToggleFilter={handleToggleFilter}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={handleToggleNotifications}
            >
              <AdminUsersPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute isAuthenticated={authenticated}>
            <AppShell
              title={pageTitle}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterOpen={filterOpen}
              onToggleFilter={handleToggleFilter}
              notificationsOpen={notificationsOpen}
              onToggleNotifications={handleToggleNotifications}
            >
              <SettingsPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
