'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

const inputClass =
  'w-full border border-slate-300 rounded px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors'

const labelClass =
  'block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5'

type Step = 'agreement' | 'submission' | 'submitting' | 'done'

export default function EngagePage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('agreement')
  const [agreed, setAgreed] = useState(false)
  const [agreeError, setAgreeError] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  function handleAgreementContinue() {
    if (!agreed) {
      setAgreeError(true)
      return
    }
    setAgreeError(false)
    setStep('submission')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitError(null)
    setStep('submitting')

    const form = e.currentTarget
    const data = new FormData(form)
    data.set('agreement_accepted', 'true')

    try {
      const res = await fetch('/api/engagements', { method: 'POST', body: data })
      const json = await res.json()

      if (!res.ok || !json.statusToken) {
        setSubmitError(json.error ?? 'Submission failed. Please try again.')
        setStep('submission')
        return
      }

      router.push(`/status/${json.statusToken}`)
    } catch {
      setSubmitError('Network error. Please try again.')
      setStep('submission')
    }
  }

  if (step === 'agreement') {
    return (
      <>
        <Hero
          headline="Begin Your Engagement"
          subheadline="Review and accept the service agreement, then submit your rotation files. Engagement begins upon receipt of signed agreement and complete submission."
        />

        <Section divider>
          <div className="max-w-3xl">
            {/* Process steps */}
            <div className="flex items-center gap-3 mb-10">
              {['Sign Agreement', 'Submit Files', 'Engagement Active'].map((label, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-brand-navy text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {i + 1}
                    </div>
                    <span className={`text-sm ${i === 0 ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>{label}</span>
                  </div>
                  {i < 2 && <div className="w-8 h-px bg-slate-300" />}
                </div>
              ))}
            </div>

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Service Agreement — Version 2025-v1
            </p>

            {/* Agreement text */}
            <div className="border border-slate-200 rounded-lg bg-white overflow-hidden mb-6">
              <div className="h-96 overflow-y-auto p-6 text-sm text-slate-700 leading-relaxed space-y-4">

                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Service Agreement — Rotation Analytics, a division of Visser Ventures Corp.</p>

                <p><strong>This Service Agreement</strong> is entered into as of the date of electronic acceptance between <strong>Visser Ventures Corp.</strong>, a corporation incorporated under the laws of the Province of Alberta, operating under the trade name <strong>Rotation Analytics</strong> ("Rotation Analytics" or the "Provider"), and the Client identified below.</p>

                <p className="font-semibold">1. Services</p>
                <p>Rotation Analytics will perform independent analytical review of workforce rotation schedules provided by the Client. Analytical Services may include review against collective agreement provisions, extended work agreements, employment standards legislation, occupational health and safety considerations, and fatigue science principles. Findings constitute analytical observations only and are not determinations of compliance, safety, legality, or obligation. Rotation Analytics does not provide legal, engineering, safety certification, regulatory, medical, or professional advisory services.</p>

                <p className="font-semibold">2. Engagement Commencement</p>
                <p>An Engagement begins only upon: (a) execution of this Agreement by electronic acceptance; and (b) receipt of complete submission materials. Rotation Analytics will commence work upon confirmation of scope and fees in writing.</p>

                <p className="font-semibold">3. Deliverables</p>
                <p>Deliverables include an Annotated Rotation Schedule and an Executive Findings Report. Deliverables rely solely on information supplied by the Client. Rotation Analytics does not verify the accuracy or completeness of Client-provided materials. Deliverables are for internal decision-making only unless written consent is provided. Deliverables shall be deemed accepted unless the Client provides written notice of a material deficiency within ten (10) business days of delivery.</p>

                <p className="font-semibold">4. Turnaround</p>
                <p>Rotation Analytics will use commercially reasonable efforts to deliver within 24 hours of Engagement commencement. Delivery within any specific timeframe is not guaranteed.</p>

                <p className="font-semibold">5. Fees and Payment</p>
                <p>Analytical Services are billed at <strong>$200.00 CAD base rate per rotation analysis</strong>, with fees confirmed in writing prior to commencement. The maximum fee per individual rotation analysis engagement shall not exceed <strong>$600.00 CAD</strong>. Fees are quoted in Canadian dollars and exclude applicable taxes. Invoices are payable within thirty (30) days. Work may begin prior to payment. <strong>Deliverables will not be released until payment is confirmed.</strong> Overdue amounts bear interest at 1.5% per month. Rotation Analytics may suspend services upon written notice if payment is overdue.</p>

                <p className="font-semibold">6. Intellectual Property</p>
                <p>All methodologies, tools, templates, and analytical frameworks remain the exclusive property of Visser Ventures Corp. Prior to payment, the Client holds no licence or usage rights in the Deliverables. Upon payment in full, the Client receives a non-exclusive, non-transferable licence for internal use only. The Client shall not attempt to derive, replicate, reverse engineer, or recreate the Methodology from Deliverables.</p>

                <p className="font-semibold">7. Confidentiality</p>
                <p>Each Party shall protect Confidential Information and not disclose it except as required by law or performance of obligations. Rotation Analytics will treat all submitted workforce data as Confidential Information. Confidentiality obligations survive termination for three (3) years. Each Party shall comply with applicable privacy legislation, including the <em>Personal Information Protection Act</em> (Alberta).</p>

                <p className="font-semibold">8. Independence</p>
                <p>Rotation Analytics acts as an independent contractor. No employment, partnership, joint venture, agency, or fiduciary relationship is created. Rotation Analytics does not represent any party in disputes or negotiations. The Client shall not characterize Rotation Analytics as an advocate or representative.</p>

                <p className="font-semibold">9. Limitation of Liability</p>
                <p>Deliverables are informational only. Rotation Analytics is not liable for decisions or actions taken based on Deliverables. Aggregate liability shall not exceed fees paid in the twelve (12) months preceding the claim. No liability for indirect, incidental, consequential, special, or punitive damages. The Client shall indemnify and hold harmless Rotation Analytics, Visser Ventures Corp., and their directors, officers, employees, and contractors from claims arising from Client reliance on Deliverables, inaccurate Client-provided information, operational decisions by the Client, or third-party claims relating to the Client's rotation schedules or employment practices.</p>

                <p className="font-semibold">10. Governing Law</p>
                <p>This Agreement is governed by the laws of the Province of Alberta and applicable Canadian federal law. Exclusive jurisdiction of Alberta courts applies. Parties shall attempt good-faith negotiation prior to litigation.</p>

                <p className="font-semibold">11. Electronic Acceptance</p>
                <p>Electronic acceptance is valid under the <em>Electronic Transactions Act</em> (Alberta). Electronic acceptance has the same legal effect as a handwritten signature. The timestamp and version of this Agreement are recorded upon acceptance.</p>

                <p className="text-xs text-slate-400 pt-4 border-t border-slate-100">Agreement version: 2025-v1 | Rotation Analytics — a division of Visser Ventures Corp., Alberta, Canada | Independent analytical services only.</p>
              </div>
            </div>

            {/* Acceptance */}
            <div className={`rounded-lg border p-5 mb-6 ${agreeError ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'}`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-slate-400 accent-brand-navy cursor-pointer"
                  checked={agreed}
                  onChange={e => {
                    setAgreed(e.target.checked)
                    if (e.target.checked) setAgreeError(false)
                  }}
                />
                <span className="text-sm text-slate-700 leading-relaxed">
                  I have read and accept the Service Agreement (Version 2025-v1) on behalf of my organization. I understand that engagement begins only after agreement acceptance and receipt of complete submission, that deliverables are withheld until payment is confirmed, and that no usage rights are granted prior to payment.
                </span>
              </label>
              {agreeError && (
                <p className="mt-3 text-xs text-red-600 font-medium">
                  You must accept the service agreement to continue.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleAgreementContinue}
              className="bg-brand-navy text-white px-8 py-3 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors"
            >
              Accept Agreement &amp; Continue to Submission
            </button>
          </div>
        </Section>
      </>
    )
  }

  return (
    <>
      <Hero
        headline="Submit Your Rotation"
        subheadline="Agreement accepted. Provide your rotation files and supporting details to begin analysis."
      />

      <Section divider>
        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10 max-w-3xl">
          {['Sign Agreement', 'Submit Files', 'Engagement Active'].map((label, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-green-500 text-white' : i === 1 ? 'bg-brand-navy text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {i === 0 ? '✓' : i + 1}
                </div>
                <span className={`text-sm ${i <= 1 ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>{label}</span>
              </div>
              {i < 2 && <div className="w-8 h-px bg-slate-300" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 max-w-5xl">
          {/* Form */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
              Submission Details
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" aria-label="Rotation submission form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="org_name" className={labelClass}>
                    Organization Name <span className="text-red-400">*</span>
                  </label>
                  <input id="org_name" name="org_name" type="text" autoComplete="organization" required className={inputClass} placeholder="Organization name" />
                </div>
                <div>
                  <label htmlFor="contact_name" className={labelClass}>
                    Contact Name <span className="text-red-400">*</span>
                  </label>
                  <input id="contact_name" name="contact_name" type="text" autoComplete="name" required className={inputClass} placeholder="Full name" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Contact Email <span className="text-red-400">*</span>
                  </label>
                  <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} placeholder="your@email.com" />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Contact Phone</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="+1 (___) ___-____" />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-2" />

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Rotation Files</p>
                <label htmlFor="rotation_file" className={labelClass}>
                  Upload Rotation <span className="text-red-400">*</span>
                </label>
                <div className="w-full border border-slate-300 rounded px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-brand-navy/20 focus-within:border-brand-navy transition-colors">
                  <input
                    id="rotation_file"
                    name="rotation_file"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    required
                    className="w-full text-sm text-slate-600 file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-brand-navy file:text-white hover:file:bg-brand-navy-dark file:cursor-pointer cursor-pointer"
                  />
                  <p className="text-xs text-slate-400 mt-1.5">
                    Excel format (.xlsx, .xls) or .csv — include the shift legend (shift codes, start/end times, paid hours).
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-2" />

              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Supporting Details</p>

              <div>
                <label htmlFor="collective_agreement" className={labelClass}>
                  Collective Agreement <span className="text-red-400">*</span>
                </label>
                <input
                  id="collective_agreement"
                  name="collective_agreement"
                  type="text"
                  required
                  className={inputClass}
                  placeholder="e.g. UNA Provincial Collective Agreement 2024–2027"
                />
              </div>

              <div>
                <label htmlFor="local_conditions" className={labelClass}>
                  Local Conditions <span className="text-slate-400 normal-case font-normal">(if applicable)</span>
                </label>
                <input
                  id="local_conditions"
                  name="local_conditions"
                  type="text"
                  className={inputClass}
                  placeholder="Local conditions, letters of understanding, or supplementary scheduling agreements"
                />
              </div>

              <div>
                <label htmlFor="notes" className={labelClass}>Notes / Comments</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Active scheduling concerns, specific provisions of interest, or any relevant context."
                />
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded p-4">
                  <p className="text-sm text-red-700">{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={step === 'submitting'}
                className="w-full bg-brand-navy text-white px-6 py-3 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 'submitting' ? 'Submitting…' : 'Submit Rotation for Analysis'}
              </button>

              <p className="text-xs text-slate-400 text-center">
                By submitting you confirm your agreement acceptance. Engagement is active upon receipt.
                Estimated turnaround: 24 hours (commercially reasonable efforts — not guaranteed).
              </p>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-2">Agreement Accepted</p>
              <p className="text-sm text-green-800 leading-relaxed">
                Your agreement acceptance has been recorded with a timestamp. Complete the submission below to activate your engagement.
              </p>
            </div>

            <div className="bg-brand-cream border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">What You Receive</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800 mb-1">Annotated Rotation Schedule</p>
                  <p className="text-xs text-slate-500 leading-relaxed">Your rotation returned with all identified non-conformances flagged and annotated directly in the file.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 mb-1">Executive Findings Report</p>
                  <p className="text-xs text-slate-500 leading-relaxed">Risk-classified findings with citation of collective agreement provisions and supporting explanation.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Pricing</p>
              <p className="text-sm text-slate-700 leading-relaxed">$200 CAD base rate per rotation. Maximum $600 CAD per engagement. Fees confirmed in writing before work commences. Taxes additional.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Release of Deliverables</p>
              <p className="text-sm text-slate-600 leading-relaxed">Deliverables are held until payment is confirmed. No licence or usage rights are granted prior to payment.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
