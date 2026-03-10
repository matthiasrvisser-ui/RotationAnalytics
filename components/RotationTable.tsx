export interface ShiftEntry {
  date: string
  shift: 'Day' | 'Evening' | 'Night' | 'OFF'
  start: string
  end: string
  hours: number
  restBefore: number | null
  flags: Array<'quick-return' | 'consecutive-nights' | 'long-stretch' | 'weekend-coverage'>
}

interface RotationTableProps {
  entries: ShiftEntry[]
  title?: string
  note?: string
}

const FLAG_META: Record<string, { label: string; className: string }> = {
  'quick-return': {
    label: 'Quick Return (<11h)',
    className: 'text-red-700 bg-red-50 border-red-200',
  },
  'consecutive-nights': {
    label: 'Consecutive Nights',
    className: 'text-amber-700 bg-amber-50 border-amber-200',
  },
  'long-stretch': {
    label: 'Long Stretch (7+ days)',
    className: 'text-red-700 bg-red-50 border-red-200',
  },
  'weekend-coverage': {
    label: 'Weekend Pattern',
    className: 'text-amber-700 bg-amber-50 border-amber-200',
  },
}

const SHIFT_BADGE: Record<string, string> = {
  Day: 'text-sky-700 bg-sky-50',
  Evening: 'text-violet-700 bg-violet-50',
  Night: 'text-slate-700 bg-slate-100',
  OFF: 'text-slate-400 bg-slate-50',
}

export function RotationTable({ entries, title, note }: RotationTableProps) {
  return (
    <div>
      {title && (
        <h3 className="text-base font-semibold text-slate-900 mb-1">{title}</h3>
      )}
      {note && (
        <p className="text-xs text-slate-400 mb-4">{note}</p>
      )}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-left">
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">Date</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Shift</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Start</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">End</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Hrs</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">Rest Before</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Findings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {entries.map((entry, i) => (
              <tr
                key={i}
                className={`bg-white transition-colors ${
                  entry.flags.length > 0 ? 'bg-red-50/20' : ''
                } ${entry.shift === 'OFF' ? 'opacity-50' : ''}`}
              >
                <td className="py-3 px-4 text-slate-700 whitespace-nowrap text-xs">{entry.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${SHIFT_BADGE[entry.shift]}`}
                  >
                    {entry.shift}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600 font-mono text-xs">{entry.start}</td>
                <td className="py-3 px-4 text-slate-600 font-mono text-xs">{entry.end}</td>
                <td className="py-3 px-4 text-slate-600 text-xs">
                  {entry.hours > 0 ? `${entry.hours}h` : '—'}
                </td>
                <td
                  className={`py-3 px-4 font-medium text-xs ${
                    entry.restBefore !== null && entry.restBefore < 11
                      ? 'text-red-700 font-bold'
                      : 'text-slate-600'
                  }`}
                >
                  {entry.restBefore !== null ? `${entry.restBefore}h` : '—'}
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {entry.flags.length === 0 ? (
                      <span className="text-slate-300 text-xs">—</span>
                    ) : (
                      entry.flags.map((flag) => (
                        <span
                          key={flag}
                          className={`inline-block px-2 py-0.5 rounded border text-xs font-medium ${FLAG_META[flag].className}`}
                        >
                          {FLAG_META[flag].label}
                        </span>
                      ))
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
