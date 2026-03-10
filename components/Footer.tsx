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
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-2">
              Independent Rotation Assurance™
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Third-party rotation schedule analysis for healthcare unions and labour relations leadership.
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
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 space-y-3">
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
            Independent Rotation Assurance™ is an independent analytical service provided by Rotation Analytics. We provide analytical support to unions and worker representatives.
            We do not accept engagements from employers or management. Our findings are produced for union use only and released exclusively to the commissioning party.
          </p>
          <p className="text-xs text-slate-500">
            © {currentYear} Rotation Analytics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
