import Link from 'next/link'
import { LogoHorizontal } from './Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="mb-4">
              <LogoHorizontal color="#FFFFFF" />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Structured independent analysis of rotation schedules, delivered exclusively to the commissioning party.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Analysis
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/methodology" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/example-rotation" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Example Rotation
                </Link>
              </li>
              <li>
                <Link href="/sample-report" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Sample Report
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Organisation
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/pilot-diagnostic" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Pilot Diagnostic
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-slate-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Submit Work
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 space-y-3">
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
            Rotation Analytics Inc conducts our methodology without structural alignment to any party to the scheduling arrangement. Findings are a systematic evaluation of the rotation record and are released exclusively to the commissioning party as defined in the engagement agreement.
          </p>
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Rotation Analytics Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
