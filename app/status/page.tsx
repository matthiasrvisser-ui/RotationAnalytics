'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export default function ClientPortalPage() {
  const router = useRouter()
  const [workOrder, setWorkOrder] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!workOrder.trim() || !email.trim()) {
      setError('Please enter both your work order number and email address.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/status/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ work_order: workOrder.trim(), email: email.trim() }),
      })

      if (res.ok) {
        const { statusToken } = await res.json()
        router.push(`/status/${statusToken}`)
      } else {
        const { error: msg } = await res.json()
        setError(msg || 'Unable to locate engagement. Please verify your details.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Hero
        headline="Client Portal"
        subheadline="Access your engagement status, deliverables, and communications."
      />

      <Section contained>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="workOrder"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Work Order Number
              </label>
              <input
                id="workOrder"
                type="text"
                value={workOrder}
                onChange={(e) => { setWorkOrder(e.target.value); setError('') }}
                placeholder="e.g. 8567"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors font-mono"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                placeholder="The email used when submitting"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors"
                autoComplete="email"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-navy text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-brand-navy-dark transition-colors disabled:opacity-50"
            >
              {loading ? 'Looking up…' : 'View Engagement Status'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-xs text-slate-400 leading-relaxed">
              Your work order number was included in the confirmation email sent when your engagement was accepted.
              You can also access your engagement directly using the link provided in that email.
              If you need assistance, please{' '}
              <a href="/contact" className="text-brand-navy hover:underline font-medium">
                contact us
              </a>.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
