'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Message } from '@/lib/types'

interface Props {
  messages: Message[]
  token: string
}

export function MessageThread({ messages: initial, token }: Props) {
  const router = useRouter()
  const [messages, setMessages] = useState(initial)
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)

  async function send() {
    if (!body.trim()) return
    setSending(true)
    const res = await fetch(`/api/status/${token}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body }),
    })
    if (res.ok) {
      const { message } = await res.json()
      setMessages(prev => [...prev, message])
      setBody('')
      router.refresh()
    }
    setSending(false)
  }

  return (
    <div>
      <div className="space-y-3 mb-4 max-h-72 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-xs text-slate-400">No messages yet. Use this to ask questions or provide additional context.</p>
        )}
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-sm px-3 py-2 rounded-lg text-sm ${m.sender === 'client' ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-700'}`}>
              <p className="leading-snug">{m.body}</p>
              <p className={`text-xs mt-1 ${m.sender === 'client' ? 'text-white/60' : 'text-slate-400'}`}>
                {new Date(m.created_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                {' · '}
                {m.sender === 'admin' ? 'Rotation Analytics Inc' : 'You'}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={body}
          onChange={e => setBody(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Send a message…"
          className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
        />
        <button
          onClick={send}
          disabled={sending || !body.trim()}
          className="bg-brand-navy text-white px-4 py-2 rounded text-sm font-medium hover:bg-brand-navy-dark disabled:opacity-50 transition-colors"
        >
          {sending ? '…' : 'Send'}
        </button>
      </div>
    </div>
  )
}
