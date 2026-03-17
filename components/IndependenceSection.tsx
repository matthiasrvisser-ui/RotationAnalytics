const principles = [
  {
    number: '01',
    title: 'Analytical Independence',
    body: 'Rotation Analytics Inc operates as an independent analytical body. It holds no ownership, financial, or contractual relationship with any employer, employer association, or management body, and accepts no instruction from any party other than the commissioning client.',
  },
  {
    number: '02',
    title: 'Neutrality of Findings',
    body: 'Findings are based on the rotation record as submitted and assessed against established occupational health standards, regulatory requirements, and applicable collective agreement provisions. They are impartial analytical interpretations of the data.',
  },
  {
    number: '03',
    title: 'Confidentiality Obligations',
    body: 'All materials received and findings produced within an engagement are treated as strictly confidential. Disclosure is governed by the terms of the service agreement. Findings are not shared with any party not identified in that agreement.',
  },
  {
    number: '04',
    title: 'Engagement-Defined Scope',
    body: 'The scope of each engagement is defined in the service agreement prior to commencement. Analysis is conducted within that defined scope only.',
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
            Analysis conducted independently, without structural alignment to any party to the scheduling arrangement.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 mb-px">
          {principles.map((p) => (
            <div key={p.number} className="bg-brand-navy p-6 md:p-8">
              <p className="text-xs font-bold tracking-widest mb-3 text-slate-400">
                {p.number}
              </p>
              <h3 className="text-sm font-semibold text-white mb-3 leading-snug">{p.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-navy pt-6 mt-px border-t border-white/10">
          <p className="text-sm text-slate-400 leading-relaxed italic max-w-3xl">
            These are structural and operational features of how Rotation Analytics Inc accepts and conducts engagements. They are not policy declarations. Each is documented in the applicable service agreement.
          </p>
        </div>
      </div>
    </section>
  )
}
