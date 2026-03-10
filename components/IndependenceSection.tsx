const principles = [
  {
    number: '01',
    title: 'Independent Incorporated Entity',
    body: 'Independent Rotation Assurance™ is incorporated without any ownership, financial, or contractual relationship with any healthcare employer, employer association, or management body.',
  },
  {
    number: '02',
    title: 'No Employer Engagements',
    body: 'Analysis is undertaken exclusively at the direction of a union, worker representative body, or Health & Safety committee. Employers cannot commission analysis, and no employer-side engagement is accepted under any circumstance.',
  },
  {
    number: '03',
    title: 'Strict Confidentiality of Findings',
    body: 'Reports are delivered exclusively to the commissioning party. Findings are not disclosed to the employer, facility administration, or any third party without explicit written direction from the commissioning union.',
  },
  {
    number: '04',
    title: 'Support for Union Review Processes',
    body: 'Independent Rotation Assurance™ produces analytical findings to inform the union\'s own review. It does not determine grievance outcomes, advise on strategy, represent workers, or substitute for union judgement or authority.',
  },
  {
    number: '05',
    title: 'Expertise Applied Independently',
    body: 'Analytical frameworks are applied without instruction from the employer and without reference to management scheduling rationale. The analysis reflects the rotation record as submitted — not the employer\'s characterisation of it.',
  },
]

export function IndependenceSection() {
  return (
    <section className="bg-brand-navy">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="mb-12">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Independence &amp; Confidentiality
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight max-w-2xl">
            Structured to serve the union — structurally prevented from serving the employer.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {principles.map((p) => (
            <div key={p.number} className="bg-brand-navy p-6 md:p-8">
              <p className="text-xs font-bold text-brand-navy-light tracking-widest mb-3 text-slate-400">
                {p.number}
              </p>
              <h3 className="text-sm font-semibold text-white mb-3 leading-snug">{p.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{p.body}</p>
            </div>
          ))}

          {/* Sixth cell — closing statement */}
          <div className="bg-brand-navy-light/20 p-6 md:p-8 flex items-end">
            <p className="text-sm text-slate-400 leading-relaxed italic">
              These principles are not policy statements — they are structural features of how
              Independent Rotation Assurance™ operates and accepts engagements.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
