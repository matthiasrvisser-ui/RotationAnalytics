import { Resend } from 'resend'

function resend() { return new Resend(process.env.RESEND_API_KEY!) }
const FROM = 'Rotation Analytics <no-reply@rotationanalytics.ca>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@rotationanalytics.ca'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://rotationanalytics.ca'

export async function sendSubmissionConfirmation(opts: {
  to: string
  contactName: string
  orgName: string
  statusToken: string
}) {
  const statusUrl = `${BASE_URL}/status/${opts.statusToken}`
  await resend().emails.send({
    from: FROM,
    to: opts.to,
    subject: 'Submission Received — Rotation Analytics',
    html: `
      <p>Dear ${opts.contactName},</p>
      <p>Your submission for <strong>${opts.orgName}</strong> has been received. Engagement is now active.</p>
      <p><strong>Estimated turnaround:</strong> Commercially reasonable efforts to deliver within 24 hours. Not guaranteed.</p>
      <p>Track your engagement status at any time:<br>
      <a href="${statusUrl}">${statusUrl}</a></p>
      <p>You will be notified by email when your invoice is issued and again when your deliverable is ready.</p>
      <hr>
      <p style="font-size:12px;color:#888">Rotation Analytics — a division of Visser Ventures Corp. | Independent analytical services only. Not legal, safety, or labour relations advice.</p>
    `,
  })
}

export async function sendAdminSubmissionAlert(opts: {
  engagementId: string
  orgName: string
  contactName: string
  email: string
}) {
  await resend().emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Submission — ${opts.orgName}`,
    html: `
      <p>New engagement submission received.</p>
      <ul>
        <li><strong>Org:</strong> ${opts.orgName}</li>
        <li><strong>Contact:</strong> ${opts.contactName} (${opts.email})</li>
        <li><strong>Engagement ID:</strong> ${opts.engagementId}</li>
      </ul>
      <p><a href="${BASE_URL}/admin/${opts.engagementId}">Open in Admin Dashboard</a></p>
    `,
  })
}

export async function sendInvoiceNotification(opts: {
  to: string
  contactName: string
  orgName: string
  invoiceNumber: string
  invoiceAmount: number
  paymentLink: string
  statusToken: string
}) {
  await resend().emails.send({
    from: FROM,
    to: opts.to,
    subject: `Invoice ${opts.invoiceNumber} — Rotation Analytics`,
    html: `
      <p>Dear ${opts.contactName},</p>
      <p>Analysis of your rotation for <strong>${opts.orgName}</strong> is complete. Your invoice has been issued.</p>
      <table>
        <tr><td><strong>Invoice Number:</strong></td><td>${opts.invoiceNumber}</td></tr>
        <tr><td><strong>Amount Due:</strong></td><td>$${opts.invoiceAmount.toFixed(2)} CAD + applicable taxes</td></tr>
      </table>
      <p><strong>Important:</strong> Your deliverable will be released upon payment confirmation. No usage rights are granted prior to payment.</p>
      <p><a href="${opts.paymentLink}" style="background:#1B2D4F;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block">Pay Invoice</a></p>
      <p>Track your engagement: <a href="${BASE_URL}/status/${opts.statusToken}">${BASE_URL}/status/${opts.statusToken}</a></p>
      <hr>
      <p style="font-size:12px;color:#888">Rotation Analytics — a division of Visser Ventures Corp.</p>
    `,
  })
}

export async function sendDeliverableReady(opts: {
  to: string
  contactName: string
  orgName: string
  downloadUrl: string
}) {
  await resend().emails.send({
    from: FROM,
    to: opts.to,
    subject: 'Your Deliverable Is Ready — Rotation Analytics',
    html: `
      <p>Dear ${opts.contactName},</p>
      <p>Payment has been confirmed. Your analytical deliverable for <strong>${opts.orgName}</strong> is now available for download.</p>
      <p><strong>A non-exclusive, non-transferable licence for internal use is hereby granted</strong> pursuant to your service agreement.</p>
      <p><a href="${opts.downloadUrl}" style="background:#1B2D4F;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block">Download Your Deliverable</a></p>
      <p style="font-size:13px;color:#666">This link expires in 7 days. Contact us if you need it reissued.</p>
      <p>Deliverables are for internal decision-making only. Independent professional advice should be obtained before acting on findings.</p>
      <hr>
      <p style="font-size:12px;color:#888">Rotation Analytics — a division of Visser Ventures Corp.</p>
    `,
  })
}
