import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Submit Work',
  description:
    'Submit rotation files to Rotation Analytics Inc for an active engagement. For commissioned clients with an executed engagement agreement.',
}

const inputClass =
  'w-full border border-slate-300 rounded px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors'

const labelClass =
  'block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5'

export default function Submit() {
  return (
    <>
      <Hero
        headline="Submit Work"
        subheadline="For commissioned clients with an executed engagement agreement. Submit your rotation files and any supporting context directly below."
      />

      <Section divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Left — Instructions */}
          <div>
            <div className="bg-white border border-slate-200 rounded-lg p-5 mb-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                File Requirements
              </p>
              <ul className="space-y-3">
                {[
                  'Rotation files in Excel format (.xlsx or .xls)',
                  'Files should cover the full rotation period defined in your engagement agreement',
                  'Standard rotation export files are accepted without modification or reformatting',
                  'Optional: context notes in a separate document',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5 mb-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Confidentiality
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                All submitted materials are treated as strictly confidential from the point of receipt, consistent with your engagement agreement.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Not yet commissioned?
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                If you do not yet have an executed engagement agreement, please{' '}
                <a href="/contact" className="text-brand-navy font-medium hover:underline">
                  request a pilot discussion
                </a>{' '}
                first.
              </p>
            </div>
          </div>

          {/* Right — Submission Form */}
          <form className="space-y-5" aria-label="Work submission form">
            <div>
              <label htmlFor="submit-org" className={labelClass}>
                Organisation <span className="text-red-400">*</span>
              </label>
              <input
                id="submit-org"
                type="text"
                autoComplete="organization"
                required
                aria-required="true"
                className={inputClass}
                placeholder="Union local or organisation name"
              />
            </div>

            <div>
              <label htmlFor="submit-email" className={labelClass}>
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="submit-email"
                type="email"
                autoComplete="email"
                required
                aria-required="true"
                className={inputClass}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="engagement-ref" className={labelClass}>
                Engagement Reference
              </label>
              <input
                id="engagement-ref"
                type="text"
                className={inputClass}
                placeholder="File or reference number from your engagement agreement"
              />
            </div>

            <div>
              <label htmlFor="rotation-files" className={labelClass}>
                Rotation Files <span className="text-red-400">*</span>
              </label>
              <div className="w-full border border-slate-300 rounded px-4 py-4 text-sm text-slate-500 bg-white focus-within:ring-2 focus-within:ring-brand-navy/20 focus-within:border-brand-navy transition-colors">
                <input
                  id="rotation-files"
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  multiple
                  required
                  aria-required="true"
                  className="w-full text-sm text-slate-600 file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-brand-navy file:text-white hover:file:bg-brand-navy-dark file:cursor-pointer cursor-pointer"
                />
                <p className="text-xs text-slate-400 mt-2">
                  Accepted formats: .xlsx, .xls, .csv — Multiple files permitted
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="submit-notes" className={labelClass}>
                Context Notes
              </label>
              <textarea
                id="submit-notes"
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Active scheduling concerns, specific provisions of interest, or any relevant context. Not required, but may focus the analysis on areas of priority."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-navy text-white px-6 py-3 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors"
            >
              Submit Files
            </button>

            <p className="text-xs text-slate-400 text-center">
              Submissions are acknowledged within 1 business day. Analysis begins upon confirmation of complete files.
            </p>
          </form>
        </div>
      </Section>
    </>
  )
}
