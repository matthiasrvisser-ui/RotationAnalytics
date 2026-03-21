'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hero } from '@/components/Hero'
import { Section } from '@/components/Section'

export default function ClientPortalPage() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = token.trim()
    if (!trimmed) {
      setError('Please enter your engagement token.')
      return
    }
    setError('')
    router.push(`/status/${encodeURIComponent(trimmed)}`)
  }

  return (
    <>
      <Hero
        headline="Client Portal"
        subheadline="Access your engagement status, deliverables, and communications using the token provided in your confirmation email."
      />

      <Section contained>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="token"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Engagement Token
              </label>
              <input
                id="token"
                type="text"
                value={token}
                onChange={(e) => { setToken(e.target.value); setError('') }}
                placeholder="Paste your token here"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-colors"
                autoComplete="off"
                spellCheck={false}
              />
              {error && (
                <p className="text-sm text-red-600 mt-2">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-brand-navy text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-brand-navy-dark transition-colors"
            >
              View Engagement Status
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-xs text-slate-400 leading-relaxed">
              Your engagement token was included in the confirmation email sent when your engagement was accepted.
              If you cannot locate your token, please{' '}
              <a href="/contact" className="text-brand-navy hover:underline font-medium">
                contact us
              </a>{' '}
              and we will re-issue it.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
