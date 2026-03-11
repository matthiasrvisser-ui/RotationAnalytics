const steps = [
  {
    step: 'Step 1',
    title: 'Rotation Received',
    body: 'The rotation schedule, as produced by the employer, is provided to Independent Rotation Assurance™ by the commissioning party. The schedule is treated as confidential from the point of receipt.',
  },
  {
    step: 'Step 2',
    title: 'Independent Analysis Performed',
    body: 'The schedule is examined against rest period standards, collective agreement provisions, established fatigue science, and applicable regulatory requirements. No employer consultation takes place during analysis.',
  },
  {
    step: 'Step 3',
    title: 'Findings Delivered to Commissioning Party',
    body: 'A structured findings report is delivered confidentially to the commissioning party. All identified items are classified by risk level and referenced against applicable provisions.',
  },
]

interface ProcessOverviewProps {
  showTitle?: boolean
}

export function ProcessOverview({ showTitle = false }: ProcessOverviewProps) {
  return (
    <div>
      {showTitle && (
        <div className="mb-10">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            The Analysis Process
          </h2>
        </div>
      )}

      {/* Desktop: three columns with top border accent */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-transparent md:bg-slate-200">
        {steps.map((s, i) => (
          <div
            key={i}
            className="bg-white md:bg-white p-0 md:p-8"
          >
            {/* Mobile layout */}
            <div className="flex gap-6 md:hidden py-6 border-b border-slate-100 last:border-b-0">
              <div className="flex-shrink-0 pt-0.5">
                <div className="w-8 h-8 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">{s.step}</p>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{s.step}</p>
              <div className="w-8 h-8 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center mb-5">
                {i + 1}
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3 leading-snug">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-6 pt-6 border-t border-slate-100">
        <p className="text-xs text-slate-400 leading-relaxed">
          The employer is not a party to the engagement and does not receive notice of the analysis.
          All communication is between Independent Rotation Assurance™ and the commissioning party.
        </p>
      </div>
    </div>
  )
}
