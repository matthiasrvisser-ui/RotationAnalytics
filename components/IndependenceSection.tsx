import Link from 'next/link'

export function IndependenceSection() {
  return (
    <section className="bg-brand-navy">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="mb-10">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Independence &amp; Confidentiality
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight max-w-2xl">
            Analysis conducted independently, without structural alignment to any party to the scheduling arrangement.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
            <h3 className="text-sm font-semibold text-white mb-3 leading-snug">Analytical Independence</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              No ownership, financial, or contractual relationship with any employer, employer association, or management body. Findings are impartial analytical interpretations of the data.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
            <h3 className="text-sm font-semibold text-white mb-3 leading-snug">Confidentiality Obligations</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              All materials and findings are treated as strictly confidential. Disclosure is governed by the service agreement. Findings are not shared with any party not identified in that agreement.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed">
          These commitments are documented in every service agreement.{' '}
          <Link href="/about" className="text-slate-300 hover:text-white hover:underline transition-colors">
            Read our full commitments &rarr;
          </Link>
        </p>
      </div>
    </section>
  )
}
