import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

export default function StatCard({ icon: Icon, label, value, delta, trend = 'up' }) {
  const positive = trend === 'up'

  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon-wrap">
          <Icon size={18} />
        </div>
        <span className={`trend-badge ${positive ? 'positive' : 'negative'}`}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {delta}
        </span>
      </div>
      <div className="stat-body">
        <p>{label}</p>
        <h3>{value}</h3>
      </div>
    </div>
  )
}
