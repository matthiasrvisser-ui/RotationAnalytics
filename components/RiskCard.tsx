interface RiskCardProps {
  level: 'high' | 'moderate' | 'low'
  title: string
  description: string
  finding: string
  reference?: string
}

const RISK_STYLES = {
  high: {
    badge: 'bg-red-100 text-red-700 border border-red-200',
    leftBorder: 'border-l-4 border-l-red-400',
    findingBg: 'bg-red-50/60 border-red-100',
    label: 'High Risk',
  },
  moderate: {
    badge: 'bg-amber-100 text-amber-700 border border-amber-200',
    leftBorder: 'border-l-4 border-l-amber-400',
    findingBg: 'bg-amber-50/60 border-amber-100',
    label: 'Moderate Risk',
  },
  low: {
    badge: 'bg-green-100 text-green-700 border border-green-200',
    leftBorder: 'border-l-4 border-l-green-400',
    findingBg: 'bg-green-50/60 border-green-100',
    label: 'Low Risk',
  },
}

export function RiskCard({ level, title, description, finding, reference }: RiskCardProps) {
  const styles = RISK_STYLES[level]

  return (
    <div className={`bg-white rounded-lg border border-slate-200 ${styles.leftBorder} p-6`}>
      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded mb-4 ${styles.badge}`}>
        {styles.label}
      </span>
      <h3 className="text-sm font-semibold text-slate-900 mb-2 leading-snug">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-4">{description}</p>
      <div className={`border rounded p-3 ${styles.findingBg}`}>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Finding</p>
        <p className="text-sm text-slate-700 leading-relaxed">{finding}</p>
      </div>
      {reference && (
        <p className="text-xs text-slate-400 mt-3">Ref: {reference}</p>
      )}
    </div>
  )
}
