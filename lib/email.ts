import { Resend } from 'resend'

function resend() { return new Resend(process.env.RESEND_API_KEY!) }
const FROM = 'Rotation Analytics Inc <no-reply@rotationanalytics.ca>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@rotationanalytics.ca'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://rotationanalytics.ca'

export async function sendSubmissionConfirmation(opts: {
  to: string
  contactName: string
  orgName: string
  statusToken: string
  workOrderNumber: string
}) {
  const firstName = opts.contactName.split(' ')[0]
  const statusUrl = `${BASE_URL}/status/${opts.statusToken}`
  await resend().emails.send({
    from: FROM,
    to: opts.to,
    subject: 'Submission Received — Rotation Analytics Inc',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1B2D4F; max-width: 600px; margin: 0 auto;">
        <p style="font-size: 15px; line-height: 1.6;">Hello ${firstName},</p>
        <p style="font-size: 15px; line-height: 1.6;">We've received your rotation submission for <strong>${opts.orgName}</strong> and your engagement with Rotation Analytics Inc is now active.</p>
        <p style="font-size: 15px; line-height: 1.6;">Your materials have been successfully submitted and queued for analysis.</p>
        <div style="background: #f8f8f6; border: 1px solid #e5e5e5; border-radius: 6px; padding: 16px 20px; margin: 20px 0; font-size: 13px; line-height: 1.8;">
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 3px 16px 3px 0; color: #888; white-space: nowrap;">Work Order</td><td style="padding: 3px 0; font-weight: 600; font-family: monospace; color: #1B2D4F;">${opts.workOrderNumber}</td></tr>
            <tr><td style="padding: 3px 16px 3px 0; color: #888; white-space: nowrap;">Organization</td><td style="padding: 3px 0; font-weight: 600; color: #1B2D4F;">${opts.orgName}</td></tr>
            <tr><td style="padding: 3px 16px 3px 0; color: #888; white-space: nowrap;">Status</td><td style="padding: 3px 0; font-weight: 600; color: #1B2D4F;">Active — Analysis Queue</td></tr>
            <tr><td style="padding: 3px 16px 3px 0; color: #888; white-space: nowrap;">Submitted</td><td style="padding: 3px 0; font-weight: 600; color: #1B2D4F;">${new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</td></tr>
          </table>
        </div>
        <p style="font-size: 15px; line-height: 1.6;">You can track progress at any time using your private status link below. Please save this link for your records — it is unique to your engagement.</p>
        <p style="margin: 24px 0;"><a href="${statusUrl}" style="background: #1B2D4F; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-size: 14px; font-weight: 600;">View Engagement Status</a></p>
        <p style="font-size: 15px; line-height: 1.6;">You'll receive email updates as your engagement progresses — including when your invoice is issued and when your deliverable is ready for download.</p>
        <p style="font-size: 15px; line-height: 1.6;">If you have any questions in the meantime, reply to this email or contact us at <a href="mailto:hello@rotationanalytics.ca" style="color: #1B2D4F;">hello@rotationanalytics.ca</a>.</p>
        <p style="font-size: 15px; line-height: 1.6; margin-top: 28px;">Regards,<br><strong>Rotation Analytics Inc</strong></p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0 16px;">
        <p style="font-size: 11px; color: #999; line-height: 1.5;">Rotation Analytics Inc — Independent Rotation Analysis<br>This is an automated confirmation. Please do not reply to this address directly.</p>
      </div>
    `,
    replyTo: 'hello@rotationanalytics.ca',
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
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1B2D4F; max-width: 600px; margin: 0 auto;">
        <p style="font-size: 15px; line-height: 1.6;">New engagement submission received.</p>
        <div style="background: #f8f8f6; border: 1px solid #e5e5e5; border-radius: 6px; padding: 16px 20px; margin: 16px 0; font-size: 13px; line-height: 1.8;">
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 3px 16px 3px 0; color: #888;">Organization</td><td style="padding: 3px 0; font-weight: 600; color: #1B2D4F;">${opts.orgName}</td></tr>
            <tr><td style="padding: 3px 16px 3px 0; color: #888;">Contact</td><td style="padding: 3px 0; font-weight: 600; color: #1B2D4F;">${opts.contactName}</td></tr>
            <tr><td style="padding: 3px 16px 3px 0; color: #888;">Email</td><td style="padding: 3px 0; color: #1B2D4F;"><a href="mailto:${opts.email}" style="color: #1B2D4F;">${opts.email}</a></td></tr>
          </table>
        </div>
        <p style="margin: 24px 0;"><a href="${BASE_URL}/admin/${opts.engagementId}" style="background: #1B2D4F; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-size: 14px; font-weight: 600;">Open in Admin Dashboard</a></p>
      </div>
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
  const firstName = opts.contactName.split(' ')[0]
  const statusUrl = `${BASE_URL}/status/${opts.statusToken}`
  await resend().emails.send({
    from: FROM,
    to: opts.to,
    subject: `Invoice ${opts.invoiceNumber} — Rotation Analytics Inc`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1B2D4F; max-width: 600px; margin: 0 auto;">
        <p style="font-size: 15px; line-height: 1.6;">Hello ${firstName},</p>
        <p style="font-size: 15px; line-height: 1.6;">Analysis of your rotation for <strong>${opts.orgName}</strong> is complete and your invoice has been issued.</p>
        <div style="background: #f8f8f6; border: 1px solid #e5e5e5; border-radius: 6px; padding: 16px 20px; margin: 20px 0; font-size: 13px; line-height: 1.8;">
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 3px 16px 3px 0; color: #888; white-space: nowrap;">Invoice Number</td><td style="padding: 3px 0; font-weight: 600; font-family: monospace; color: #1B2D4F;">${opts.invoiceNumber}</td></tr>
            <tr><td style="padding: 3px 16px 3px 0; color: #888; white-space: nowrap;">Amount Due</td><td style="padding: 3px 0; font-weight: 600; color: #1B2D4F;">$${opts.invoiceAmount.toFixed(2)} CAD + applicable taxes</td></tr>
            <tr><td style="padding: 3px 16px 3px 0; color: #888; white-space: nowrap;">Organization</td><td style="padding: 3px 0; font-weight: 600; color: #1B2D4F;">${opts.orgName}</td></tr>
            <tr><td style="padding: 3px 16px 3px 0; color: #888; white-space: nowrap;">Status</td><td style="padding: 3px 0; font-weight: 600; color: #1B2D4F;">Invoice Issued — Awaiting Payment</td></tr>
          </table>
        </div>
        <p style="font-size: 15px; line-height: 1.6;">Your deliverable will be released upon payment confirmation. No usage rights are granted prior to payment.</p>
        <p style="margin: 24px 0;"><a href="${opts.paymentLink}" style="background: #1B2D4F; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-size: 14px; font-weight: 600;">Pay Invoice</a></p>
        <p style="font-size: 15px; line-height: 1.6;">Track your engagement at any time: <a href="${statusUrl}" style="color: #1B2D4F;">${statusUrl}</a></p>
        <p style="font-size: 15px; line-height: 1.6; margin-top: 28px;">Regards,<br><strong>Rotation Analytics Inc</strong></p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0 16px;">
        <p style="font-size: 11px; color: #999; line-height: 1.5;">Rotation Analytics Inc — Independent Rotation Analysis<br>This is an automated notification. Please do not reply to this address directly.</p>
      </div>
    `,
    replyTo: 'hello@rotationanalytics.ca',
  })
}

export async function sendEnquiry(opts: {
  org: string
  contactName: string
  email: string
  phone?: string
  message?: string
}) {
  // Notify admin
  await resend().emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Enquiry — ${opts.org}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1B2D4F; max-width: 600px; margin: 0 auto;">
        <p style="font-size: 15px; line-height: 1.6;">New enquiry received via rotationanalytics.ca.</p>
        <div style="background: #f8f8f6; border: 1px solid #e5e5e5; border-radius: 6px; padding: 16px 20px; margin: 16px 0; font-size: 13px; line-height: 1.8;">
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 3px 16px 3px 0; color: #888;">Organization</td><td style="padding: 3px 0; font-weight: 600; color: #1B2D4F;">${opts.org}</td></tr>
            <tr><td style="padding: 3px 16px 3px 0; color: #888;">Contact</td><td style="padding: 3px 0; font-weight: 600; color: #1B2D4F;">${opts.contactName}</td></tr>
            <tr><td style="padding: 3px 16px 3px 0; color: #888;">Email</td><td style="padding: 3px 0; color: #1B2D4F;"><a href="mailto:${opts.email}" style="color: #1B2D4F;">${opts.email}</a></td></tr>
            ${opts.phone ? `<tr><td style="padding: 3px 16px 3px 0; color: #888;">Phone</td><td style="padding: 3px 0; font-weight: 600; color: #1B2D4F;">${opts.phone}</td></tr>` : ''}
          </table>
        </div>
        ${opts.message ? `<p style="font-size: 14px; line-height: 1.6; background: #fff; border-left: 3px solid #1B2D4F; padding: 12px 16px; margin: 16px 0; color: #333;">${opts.message}</p>` : ''}
        <p style="font-size: 15px; line-height: 1.6;">Reply directly to <a href="mailto:${opts.email}" style="color: #1B2D4F;">${opts.email}</a>.</p>
      </div>
    `,
    replyTo: opts.email,
  })

  // Confirm receipt to enquirer
  const firstName = opts.contactName.split(' ')[0]
  await resend().emails.send({
    from: FROM,
    to: opts.email,
    subject: 'Enquiry Received — Rotation Analytics Inc',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1B2D4F; max-width: 600px; margin: 0 auto;">
        <p style="font-size: 15px; line-height: 1.6;">Hello ${firstName},</p>
        <p style="font-size: 15px; line-height: 1.6;">Thank you for your enquiry. We've received your message regarding <strong>${opts.org}</strong> and will respond within 2 business days.</p>
        <p style="font-size: 15px; line-height: 1.6;">If you have urgent questions in the meantime, you can reach us at <a href="mailto:hello@rotationanalytics.ca" style="color: #1B2D4F;">hello@rotationanalytics.ca</a>.</p>
        <p style="font-size: 15px; line-height: 1.6; margin-top: 28px;">Regards,<br><strong>Rotation Analytics Inc</strong></p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0 16px;">
        <p style="font-size: 11px; color: #999; line-height: 1.5;">Rotation Analytics Inc — Independent Rotation Analysis<br>This is an automated confirmation. Please do not reply to this address directly.</p>
      </div>
    `,
    replyTo: 'hello@rotationanalytics.ca',
  })
}

export async function sendDeliverableReady(opts: {
  to: string
  contactName: string
  orgName: string
  downloadUrl: string
}) {
  const firstName = opts.contactName.split(' ')[0]
  await resend().emails.send({
    from: FROM,
    to: opts.to,
    subject: 'Your Deliverable Is Ready — Rotation Analytics Inc',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1B2D4F; max-width: 600px; margin: 0 auto;">
        <p style="font-size: 15px; line-height: 1.6;">Hello ${firstName},</p>
        <p style="font-size: 15px; line-height: 1.6;">Payment has been confirmed. Your analytical deliverable for <strong>${opts.orgName}</strong> is now available for download.</p>
        <div style="background: #f8f8f6; border: 1px solid #e5e5e5; border-radius: 6px; padding: 16px 20px; margin: 20px 0; font-size: 13px; line-height: 1.8;">
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 3px 16px 3px 0; color: #888; white-space: nowrap;">Organization</td><td style="padding: 3px 0; font-weight: 600; color: #1B2D4F;">${opts.orgName}</td></tr>
            <tr><td style="padding: 3px 16px 3px 0; color: #888; white-space: nowrap;">Status</td><td style="padding: 3px 0; font-weight: 600; color: #16a34a;">Delivered</td></tr>
            <tr><td style="padding: 3px 16px 3px 0; color: #888; white-space: nowrap;">Licence</td><td style="padding: 3px 0; font-weight: 600; color: #1B2D4F;">Non-exclusive, non-transferable, internal use</td></tr>
          </table>
        </div>
        <p style="margin: 24px 0;"><a href="${opts.downloadUrl}" style="background: #1B2D4F; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-size: 14px; font-weight: 600;">Download Your Deliverable</a></p>
        <p style="font-size: 13px; color: #666; line-height: 1.5;">This link expires in 7 days. Contact us at <a href="mailto:hello@rotationanalytics.ca" style="color: #1B2D4F;">hello@rotationanalytics.ca</a> if you need it reissued.</p>
        <p style="font-size: 15px; line-height: 1.6;">Deliverables are for internal decision-making only. Independent professional advice should be obtained before acting on findings.</p>
        <p style="font-size: 15px; line-height: 1.6; margin-top: 28px;">Regards,<br><strong>Rotation Analytics Inc</strong></p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0 16px;">
        <p style="font-size: 11px; color: #999; line-height: 1.5;">Rotation Analytics Inc — Independent Rotation Analysis<br>This is an automated notification. Please do not reply to this address directly.</p>
      </div>
    `,
    replyTo: 'hello@rotationanalytics.ca',
  })
}
