'use client'

import { useState } from 'react'

interface DocumentUploadProps {
  token: string
}

export function DocumentUpload({ token }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    setResult(null)

    const form = new FormData()
    form.append('file', file)

    try {
      const res = await fetch(`/api/status/${token}/documents`, {
        method: 'POST',
        body: form,
      })
      const json = await res.json()

      if (res.ok) {
        setResult({ type: 'success', text: `${json.fileName} uploaded successfully.` })
        setFile(null)
        // Reset the file input
        const input = document.getElementById('client-doc-upload') as HTMLInputElement
        if (input) input.value = ''
      } else {
        setResult({ type: 'error', text: json.error ?? 'Upload failed.' })
      }
    } catch {
      setResult({ type: 'error', text: 'Network error. Please try again.' })
    }

    setUploading(false)
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
        Additional Documents
      </p>
      <p className="text-xs text-slate-500 leading-relaxed mb-3">
        Upload supporting documents such as collective agreements, shift legends, or letters of understanding.
      </p>

      <div className="space-y-3">
        <input
          id="client-doc-upload"
          type="file"
          accept=".xlsx,.xls,.csv,.pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={e => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 file:cursor-pointer cursor-pointer"
        />
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className="w-full bg-brand-navy text-white px-4 py-2 rounded text-xs font-medium hover:bg-brand-navy-dark transition-colors disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : 'Upload Document'}
        </button>
      </div>

      {result && (
        <div className={`mt-3 p-2.5 rounded text-xs ${result.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {result.text}
        </div>
      )}
    </div>
  )
}
