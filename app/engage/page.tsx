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
  const [clientType, setClientType] = useState<'new' | 'returning'>('new')
  const [returningAgreed, setReturningAgreed] = useState(false)
  const [returningError, setReturningError] = useState(false)
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

  function handleReturningContinue() {
    if (!returningAgreed) {
      setReturningError(true)
      return
    }
    setReturningError(false)
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
          subheadline="Single rotation. No ongoing commitment. Starting at $225 CAD with analysis delivered in 48–72 hours."
        />

        <Section divider>
          <div className="max-w-3xl">
            {/* Client type fork */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <button
                type="button"
                onClick={() => setClientType('new')}
                className={`text-left border rounded-lg p-5 transition-colors ${clientType === 'new' ? 'border-brand-navy bg-brand-navy/5 ring-2 ring-brand-navy/20' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                <p className="text-sm font-semibold text-brand-navy mb-1">New Client</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Accept the service agreement and submit your first rotation.
                </p>
              </button>
              <button
                type="button"
                onClick={() => setClientType('returning')}
                className={`text-left border rounded-lg p-5 transition-colors ${clientType === 'returning' ? 'border-brand-navy bg-brand-navy/5 ring-2 ring-brand-navy/20' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                <p className="text-sm font-semibold text-brand-navy mb-1">Returning Client</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Already have a signed service agreement? Submit under your existing 12-month agreement.
                </p>
              </button>
            </div>

            {/* Returning client — confirm and proceed */}
            {clientType === 'returning' && (
              <div className="mb-10">
                <div className={`rounded-lg border p-5 mb-5 ${returningError ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'}`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5 w-4 h-4 rounded border-slate-400 accent-brand-navy cursor-pointer"
                      checked={returningAgreed}
                      onChange={e => {
                        setReturningAgreed(e.target.checked)
                        if (e.target.checked) setReturningError(false)
                      }}
                    />
                    <span className="text-sm text-slate-700 leading-relaxed">
                      I confirm that my organization has a signed Service Agreement (Version 2025-v2) currently in effect
                      with Rotation Analytics, and I acknowledge that this submission is governed by
                      the terms, conditions, and pricing of that agreement.
                    </span>
                  </label>
                  {returningError && (
                    <p className="mt-2 text-xs text-red-600 font-medium">
                      You must confirm your existing agreement to continue.
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleReturningContinue}
                  className="bg-brand-navy text-white px-8 py-3 rounded font-medium text-sm hover:bg-brand-navy-dark transition-colors"
                >
                  Continue to Submission
                </button>
              </div>
            )}

            {/* New client — full agreement flow */}
            {clientType === 'new' && (
              <>
            {/* Process steps */}
            <div className="flex items-center gap-3 mb-10">
              {['Accept Agreement', 'Submit Rotation', 'Invoice & Payment', 'Deliverables'].map((label, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-brand-navy text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {i + 1}
                    </div>
                    <span className={`text-sm ${i === 0 ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>{label}</span>
                  </div>
                  {i < 3 && <div className="w-8 h-px bg-slate-300" />}
                </div>
              ))}
            </div>

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Service Agreement — Version 2025-v2
            </p>

            {/* Agreement text */}
            <div className="border border-slate-200 rounded-lg bg-white overflow-hidden mb-6">
              <div className="h-96 overflow-y-auto p-6 text-sm text-slate-700 leading-relaxed space-y-4">

                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Service Agreement — Rotation Analytics, a division of Visser Ventures Corp.</p>

                <p><strong>This Service Agreement</strong> is entered into as of the date of electronic acceptance between <strong>Visser Ventures Corp.</strong>, a corporation incorporated under the laws of the Province of Alberta, operating under the trade name <strong>Rotation Analytics</strong> ("Rotation Analytics" or the "Provider"), and the Client identified below.</p>

                <p className="font-semibold">1. Services</p>
                <p>Rotation Analytics performs independent rotational risk analysis of workforce rotation schedules provided by the Client. Analytical Services include risk analysis against collective agreement provisions, extended work agreements, employment standards legislation, occupational health and safety standards, and fatigue science principles including biomathematical modelling. Findings constitute independent risk analysis and identify and classify rotational risk. Findings are not determinations of compliance, safety, legality, or obligation. Rotation Analytics does not provide legal, engineering, safety certification, regulatory, medical, or professional advisory services.</p>

                <p className="font-semibold">2. Engagement Commencement &amp; Models</p>
                <p>An Engagement begins only upon: (a) execution of this Agreement by electronic acceptance; (b) receipt of complete submission materials; and (c) receipt of payment. Rotation Analytics will review submitted materials for completeness and may request clarification or additional information before proceeding. An invoice will not be issued until Rotation Analytics has confirmed that all applicable data has been received. Completeness of submission is determined solely by Rotation Analytics Fees are calculated automatically based on the published rate schedule and the submitted rotation data.</p>
                <p>Rotation Analytics offers both <strong>ad hoc</strong> and <strong>integrated</strong> engagement models. Ad hoc engagements provide single-rotation analysis on an as-needed basis. Integrated engagements provide recurring analytical support across rotation cycles, enabling trend identification, comparative risk assessment, and ongoing rotational risk monitoring. Rotation Analytics recommends integrated engagement for organizations seeking sustained oversight of rotational risk.</p>
                <p>This Agreement remains in effect for a twelve (12) month term and automatically renews unless terminated in accordance with its terms. <strong>Once executed, the Client may submit additional rotations for analysis under this Agreement without re-execution.</strong> A copy of the executed Agreement will be provided to both Parties upon acceptance.</p>

                <p className="font-semibold">3. Deliverables</p>
                <p>Deliverables include an Annotated Rotation Schedule and an Executive Findings Report. <strong>Where Fatigue Risk Analysis is elected by the Client at the time of submission, Deliverables additionally include a Fatigue Risk Analysis Report</strong> documenting per-line fatigue scores, risk classifications, and trend visualisations across the full rotation cycle. Deliverables rely solely on information supplied by the Client. Rotation Analytics does not verify the accuracy or completeness of Client-provided materials. Deliverables are for internal decision-making only unless written consent is provided. Deliverables shall be deemed accepted unless the Client provides written notice of a material deficiency within ten (10) business days of delivery.</p>

                <p className="font-semibold">4. Turnaround</p>
                <p>Rotation Analytics targets delivery within <strong>48 hours</strong> of confirmed payment, with a maximum delivery window of <strong>72 hours (3 business days)</strong>. If Deliverables are not provided within 72 hours of confirmed payment, a <strong>10% fee reduction</strong> will be applied for each additional 24-hour period, up to a maximum reduction of <strong>30%</strong>, refunded to the Client. The turnaround period commences only upon confirmed payment and is subject to force majeure events beyond Rotation Analytics' reasonable control.</p>

                <p className="font-semibold">5. Fees and Payment</p>
                <p>Analytical Services are billed on a <strong>per-shift basis</strong> at the published rates in effect at the time of submission. Compliance Analysis is billed at <strong>$0.35 CAD per shift analyzed</strong>, including regular and on-call shifts. Fatigue Risk Analysis, when elected, is billed at an additional <strong>$0.15 CAD per shift analyzed</strong> ($0.50 CAD per shift combined). A <strong>Designated Day Off (DDO) surcharge of $0.15 CAD per DDO shift</strong> applies where rotation schedules include designated days off requiring additional analytical review. A <strong>minimum engagement fee of $225.00 CAD</strong> applies to all engagements. By accepting this Agreement and submitting rotation data, the Client authorizes Rotation Analytics to calculate fees based on the confirmed submission data and issue an invoice upon verification of completeness. Fees are quoted in Canadian dollars and exclude applicable taxes. Invoices are payable within thirty (30) days. Analysis commences upon confirmed payment. <strong>Deliverables will not be released until payment is confirmed.</strong></p>

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

                <p className="text-xs text-slate-400 pt-4 border-t border-slate-100">Agreement version: 2025-v2 | Rotation Analytics — a division of Visser Ventures Corp., Alberta, Canada | Independent analytical services only.</p>
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
                  I have read and accept the Service Agreement (Version 2025-v2) on behalf of my organization. I understand that this Agreement governs all current and future engagements, that analysis commences only upon confirmed payment, that deliverables are withheld until payment is confirmed, and that no usage rights are granted prior to payment. A copy of this executed Agreement will be provided to both parties.
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
              </>
            )}
          </div>
        </Section>
      </>
    )
  }

  return (
    <>
      <Hero
        headline="Submit Your Rotation"
        subheadline="Agreement accepted. A copy has been provided to both parties. Submit your rotation data below. Rotation Analytics will verify completeness and issue an invoice."
      />

      <Section divider>
        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10 max-w-3xl">
          {['Accept Agreement', 'Submit Rotation', 'Invoice & Payment', 'Deliverables'].map((label, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-green-500 text-white' : i === 1 ? 'bg-brand-navy text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {i === 0 ? '✓' : i + 1}
                </div>
                <span className={`text-sm ${i <= 1 ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>{label}</span>
              </div>
              {i < 3 && <div className="w-8 h-px bg-slate-300" />}
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

              <div>
                <label htmlFor="supporting_documents" className={labelClass}>
                  Supporting Documents <span className="text-slate-400 normal-case font-normal">(optional)</span>
                </label>
                <div className="w-full border border-slate-300 rounded px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-brand-navy/20 focus-within:border-brand-navy transition-colors">
                  <input
                    id="supporting_documents"
                    name="supporting_documents"
                    type="file"
                    accept=".xlsx,.xls,.csv,.pdf,.doc,.docx,.png,.jpg,.jpeg"
                    multiple
                    className="w-full text-sm text-slate-600 file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 file:cursor-pointer cursor-pointer"
                  />
                  <p className="text-xs text-slate-400 mt-1.5">
                    Collective agreement documents, shift legends, letters of understanding, or any other relevant files. Multiple files accepted.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-2" />

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Analysis Options</p>
                <div className="border border-slate-200 rounded-lg p-5 bg-brand-cream">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="fatigue_analysis"
                      value="true"
                      className="mt-0.5 w-4 h-4 rounded border-slate-400 accent-brand-navy cursor-pointer"
                    />
                    <div>
                      <p className="text-sm font-semibold text-brand-navy mb-1">Add Fatigue Risk Analysis</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Add biomathematical fatigue modelling to your compliance analysis. Your deliverables will include a Fatigue Risk Analysis Report with per-line fatigue scores, risk classifications, and trend visualisations across the full rotation cycle.
                      </p>
                      <a href="/fatigue-analysis" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-brand-navy hover:underline mt-1 inline-block">
                        Learn more about Fatigue Risk Analysis &rarr;
                      </a>
                    </div>
                  </label>
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
                Rotation Analytics will verify data completeness and issue an invoice upon confirmation. Analysis commences upon confirmed payment.
                Target turnaround: 48 hours. Maximum: 72 hours.
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
                <div className="border-t border-slate-200 pt-3">
                  <p className="text-sm font-semibold text-slate-800 mb-1">Fatigue Risk Analysis Report <span className="text-xs font-normal text-slate-400">(add-on)</span></p>
                  <p className="text-xs text-slate-500 leading-relaxed">Per-line fatigue scores, risk classifications, and trend visualisations. Included when fatigue analysis is elected at submission.</p>
                </div>
              </div>
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
