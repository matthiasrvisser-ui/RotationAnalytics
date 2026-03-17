export type EngagementStatus =
  | 'draft'
  | 'agreement_signed'
  | 'submission_complete'
  | 'in_analysis'
  | 'invoice_issued'
  | 'awaiting_payment'
  | 'paid'
  | 'delivered'
  | 'closed'

export interface Engagement {
  id: string
  created_at: string
  status: EngagementStatus
  // Client
  org_name: string
  contact_name: string
  email: string
  phone: string | null
  // Agreement
  agreement_version: string
  agreement_signed_at: string
  agreement_ip: string | null
  // Submission
  collective_agreement: string
  local_conditions: string | null
  notes: string | null
  rotation_file_path: string | null
  // Deliverable
  deliverable_path: string | null
  deliverable_token: string | null
  deliverable_expires_at: string | null
  // Invoice
  invoice_number: string | null
  invoice_amount: number | null
  invoice_issued_at: string | null
  payment_confirmed_at: string | null
  // Work order
  work_order_number: string | null
  // Admin
  admin_notes: string | null
  // Status token (for client status page)
  status_token: string
}

export interface Message {
  id: string
  engagement_id: string
  sender: 'admin' | 'client'
  body: string
  created_at: string
}

export interface AuditEntry {
  id: string
  engagement_id: string
  action: string
  actor: 'admin' | 'system' | 'client'
  created_at: string
  metadata: Record<string, unknown> | null
}

export const STATUS_LABELS: Record<EngagementStatus, string> = {
  draft: 'Draft',
  agreement_signed: 'Agreement Signed',
  submission_complete: 'Submission Received',
  in_analysis: 'In Analysis',
  invoice_issued: 'Invoice Issued',
  awaiting_payment: 'Awaiting Payment',
  paid: 'Payment Confirmed',
  delivered: 'Delivered',
  closed: 'Closed',
}

export const STATUS_ORDER: EngagementStatus[] = [
  'draft',
  'agreement_signed',
  'submission_complete',
  'in_analysis',
  'invoice_issued',
  'awaiting_payment',
  'paid',
  'delivered',
  'closed',
]

export const AGREEMENT_VERSION = '2025-v1'
