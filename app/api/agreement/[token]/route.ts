import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

// Colors
const NAVY = rgb(0.106, 0.176, 0.31) // #1B2D4F
const BLACK = rgb(0, 0, 0)
const GRAY = rgb(0.4, 0.4, 0.4)
const LIGHT_GRAY = rgb(0.75, 0.75, 0.75)

// Page dimensions
const PAGE_W = 612 // Letter width
const PAGE_H = 792 // Letter height
const MARGIN_L = 60
const MARGIN_R = 60
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R
const LINE_HEIGHT = 14
const PARA_SPACING = 8

interface DrawContext {
  doc: PDFDocument
  page: ReturnType<PDFDocument['addPage']>
  y: number
  fontRegular: Awaited<ReturnType<PDFDocument['embedFont']>>
  fontBold: Awaited<ReturnType<PDFDocument['embedFont']>>
  fontItalic: Awaited<ReturnType<PDFDocument['embedFont']>>
}

function ensureSpace(ctx: DrawContext, needed: number): DrawContext {
  if (ctx.y - needed < 60) {
    const newPage = ctx.doc.addPage([PAGE_W, PAGE_H])
    ctx.page = newPage
    ctx.y = PAGE_H - 50
  }
  return ctx
}

function drawText(
  ctx: DrawContext,
  text: string,
  opts: {
    font?: DrawContext['fontRegular']
    size?: number
    color?: ReturnType<typeof rgb>
    indent?: number
    maxWidth?: number
  } = {}
): DrawContext {
  const font = opts.font ?? ctx.fontRegular
  const size = opts.size ?? 9.5
  const color = opts.color ?? BLACK
  const indent = opts.indent ?? 0
  const maxWidth = opts.maxWidth ?? (CONTENT_W - indent)

  // Word-wrap
  const words = text.split(' ')
  let line = ''
  const lines: string[] = []

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word
    const testWidth = font.widthOfTextAtSize(testLine, size)
    if (testWidth > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = testLine
    }
  }
  if (line) lines.push(line)

  for (const l of lines) {
    ensureSpace(ctx, LINE_HEIGHT)
    ctx.page.drawText(l, {
      x: MARGIN_L + indent,
      y: ctx.y,
      size,
      font,
      color,
    })
    ctx.y -= LINE_HEIGHT
  }

  return ctx
}

function drawHRule(ctx: DrawContext): DrawContext {
  ensureSpace(ctx, 20)
  ctx.y -= 6
  ctx.page.drawLine({
    start: { x: MARGIN_L, y: ctx.y },
    end: { x: PAGE_W - MARGIN_R, y: ctx.y },
    thickness: 0.5,
    color: LIGHT_GRAY,
  })
  ctx.y -= 10
  return ctx
}

function drawSectionHeading(ctx: DrawContext, text: string): DrawContext {
  ctx.y -= 6
  ensureSpace(ctx, 30)
  drawText(ctx, text, { font: ctx.fontBold, size: 11, color: NAVY })
  ctx.y -= 4
  return ctx
}

// Parse the agreement markdown into structured sections
function parseAgreement(): { title: string; subtitle: string; preamble: string[]; sections: { heading: string; paragraphs: string[] }[]; closing: string[] } {
  const sections: { heading: string; paragraphs: string[] }[] = []
  const preamble: string[] = []
  const closing: string[] = []

  // Manually structured from Service_Agreement.md to ensure correct rendering
  preamble.push(
    'This Service Agreement (the "Agreement") is entered into as of the date of execution indicated below (the "Effective Date") between:',
    'Visser Ventures Corp., a corporation incorporated under the laws of the Province of Alberta, operating under the trade name Rotation Analytics ("Rotation Analytics" or the "Provider");',
    'and',
    'The organization identified in the signature block below (the "Client").',
    'Rotation Analytics and the Client are each referred to as a "Party" and collectively as the "Parties."',
  )

  sections.push({
    heading: '1. DEFINITIONS',
    paragraphs: [
      '1.1 "Analytical Services" means the independent rotational risk analysis of workforce rotation schedules performed by Rotation Analytics, including review against applicable collective agreements, occupational health and safety standards, and fatigue science principles.',
      '1.2 "Applicable Law" means the laws of the Province of Alberta and the federal laws of Canada applicable therein.',
      '1.3 "Collective Agreement" means any collective bargaining agreement, extended work agreement, or similar instrument governing employment terms applicable to the rotation schedule under review.',
      '1.4 "Confidential Information" means all non-public information disclosed by one Party to the other, including rotation schedules, workforce data, analytical findings, methodology, pricing, and business information.',
      '1.5 "Deliverables" means outputs produced by Rotation Analytics during an Engagement.',
      '1.6 "Engagement" means a discrete project commissioned under this Agreement.',
      '1.7 "Fees" means amounts payable for Analytical Services, calculated in accordance with the published rate schedule.',
      '1.8 "Governing Documents" means collective agreements, extended work agreements, legislation, regulations, and standards identified by the Client.',
      '1.9 "Report" means the written executive summary of analytical findings.',
    ],
  })

  sections.push({
    heading: '2. SERVICES',
    paragraphs: [
      '2.1 Rotation Analytics will perform independent rotational risk analysis of workforce rotation schedules provided by the Client. Scope is determined by the submitted rotation data and elected services.',
      '2.2 Analytical Services include risk analysis against: (a) collective agreement provisions; (b) extended work agreements; (c) employment standards legislation; (d) occupational health and safety standards; and (e) fatigue science principles and biomathematical modelling.',
      '2.3 Findings constitute independent risk analysis and identify and classify rotational risk. Findings are not determinations of compliance, safety, legality, or obligation.',
      '2.4 Data Completeness. Rotation Analytics will review submitted materials for completeness and may request clarification or additional information before proceeding. An invoice will not be issued, and analysis will not commence, until Rotation Analytics has confirmed that all applicable data has been received. Completeness of submission is determined solely by Rotation Analytics',
      '2.5 Engagement Models. Rotation Analytics offers both ad hoc and integrated engagement models: (a) Ad Hoc Engagement: single-rotation analysis commissioned on an as-needed basis; (b) Integrated Engagement: recurring analytical support across rotation cycles, enabling trend identification, comparative risk assessment, and ongoing rotational risk monitoring. Rotation Analytics recommends integrated engagement for organizations seeking sustained oversight of rotational risk. Ad hoc engagements may be converted to integrated engagements at any time upon written request.',
      '2.6 Returning Clients. This Agreement remains in effect for the Term specified in Section 11 and governs all Engagements during that period. Once executed, the Client may submit additional rotations for analysis under this Agreement without re-execution. Each submission initiates a new Engagement subject to the data completeness verification and invoicing process described in Section 2.4 and Section 5.',
      '2.7 Agreement Copies. Upon execution, a copy of the executed Agreement shall be provided to both Parties. The executed copy shall include the version number, timestamp of acceptance, and identity of the accepting party.',
      '2.8 Non-Reliance. The Client acknowledges Rotation Analytics does not provide legal, engineering, safety certification, regulatory, medical, or professional advisory services and agrees not to rely on Analytical Services as a substitute for independent professional advice.',
    ],
  })

  sections.push({
    heading: '3. DELIVERABLES',
    paragraphs: [
      '3.1 Deliverables include: (a) Annotated Rotation Schedule; and (b) Executive Findings Report.',
      '3.2 Deliverables rely solely on information supplied by the Client. Rotation Analytics does not verify accuracy or completeness.',
      '3.3 Deliverables are for internal decision-making only unless written consent is provided.',
      '3.4 Acceptance of Deliverables. Deliverables shall be deemed accepted unless the Client provides written notice of a material deficiency within ten (10) business days of delivery.',
      '3.5 Turnaround. Rotation Analytics targets delivery within forty-eight (48) hours of confirmed payment, with a maximum delivery window of seventy-two (72) hours (three business days).',
      '3.6 Late Delivery Adjustment. If Deliverables are not provided within seventy-two (72) hours of confirmed payment, a fee reduction of ten percent (10%) shall be applied for each additional twenty-four (24) hour period of delay, up to a maximum reduction of thirty percent (30%). The applicable reduction shall be refunded to the Client. The turnaround period commences only upon confirmed payment of the issued invoice.',
      '3.7 Turnaround Exclusions. The turnaround period is tolled during: (a) any period in which Rotation Analytics is awaiting additional information or clarification from the Client; and (b) force majeure events beyond the reasonable control of Rotation Analytics',
    ],
  })

  sections.push({
    heading: '4. CLIENT RESPONSIBILITIES',
    paragraphs: [
      '4.1 The Client shall: (a) provide accurate and complete materials; (b) provide all applicable Governing Documents; (c) identify applicable standards; (d) notify Rotation Analytics of errors or changes; and (e) independently review Deliverables before reliance.',
      '4.2 Rotation Analytics may rely on Client-provided information.',
      '4.3 Compliance Responsibility. The Client remains solely responsible for compliance with all Applicable Laws, collective agreements, workplace safety obligations, and operational decisions.',
    ],
  })

  sections.push({
    heading: '5. FEES AND PAYMENT',
    paragraphs: [
      '5.1 Standard Rates. Unless otherwise agreed in writing, Analytical Services are billed on a per-shift basis as follows: (a) Compliance Analysis: $0.35 (CAD) per shift analyzed, including regular and on-call shifts; (b) Fatigue Risk Analysis (optional add-on): $0.15 (CAD) per shift analyzed, in addition to the Compliance Analysis rate ($0.50 CAD per shift combined); (c) Designated Day Off (DDO) Surcharge: $0.15 (CAD) per DDO shift, where rotation schedules include designated days off requiring additional analytical review. A minimum engagement fee of $225.00 (CAD) applies to all Engagements regardless of volume.',
      '5.2 Fees are calculated automatically based on the published rate schedule at the time of submission and the confirmed rotation data. By accepting this Agreement and submitting rotation data, the Client authorizes Rotation Analytics to verify completeness, calculate Fees accordingly, and issue an invoice upon confirmation of data completeness. Analysis commences upon confirmed payment.',
      '5.3 Invoices are payable within thirty (30) days of the date of invoice.',
      '5.4 Fees are quoted in Canadian dollars and exclude applicable taxes.',
      '5.5 Suspension for Non-Payment. Rotation Analytics may suspend services upon written notice if payment is overdue.',
      '5.6 Interest. Overdue amounts bear interest at 1.5% per month (18% annually) or the maximum permitted by law.',
      '5.7 Collection Costs. The Client is responsible for reasonable legal and collection costs incurred recovering overdue amounts.',
    ],
  })

  sections.push({
    heading: '6. CONFIDENTIALITY AND PRIVACY',
    paragraphs: [
      '6.1 Each Party shall protect Confidential Information and not disclose it except as required by law or performance of obligations.',
      '6.2 Exceptions include publicly available or independently developed information.',
      '6.3 Rotation Analytics will treat workforce data as Confidential Information.',
      '6.4 The Client consents to anonymised and aggregated data use for methodology improvement.',
      '6.5 Privacy Compliance. Each Party shall comply with applicable privacy legislation, including the Personal Information Protection Act (Alberta), where personal information is disclosed.',
      '6.6 Confidentiality obligations survive termination for three (3) years.',
    ],
  })

  sections.push({
    heading: '7. INDEPENDENCE AND RELATIONSHIP',
    paragraphs: [
      '7.1 Rotation Analytics acts as an independent contractor.',
      '7.2 No employment, partnership, joint venture, agency, or fiduciary relationship is created.',
      '7.3 Rotation Analytics does not negotiate collective agreements or represent parties in disputes.',
      '7.4 The Client shall not characterize Rotation Analytics as an advocate or representative.',
    ],
  })

  sections.push({
    heading: '8. INTELLECTUAL PROPERTY',
    paragraphs: [
      '8.1 All methodologies, tools, templates, and analytical frameworks remain exclusive property of Visser Ventures Corp.',
      '8.2 Client retains ownership of materials it provides.',
      '8.3 Upon payment, Client receives a non-exclusive, non-transferable licence for internal use only.',
      '8.4 Reverse Engineering Prohibited. The Client shall not attempt to derive, replicate, reverse engineer, or recreate the Methodology from Deliverables.',
    ],
  })

  sections.push({
    heading: '9. LIMITATION OF LIABILITY',
    paragraphs: [
      '9.1 Deliverables are informational only.',
      '9.2 Rotation Analytics is not liable for decisions or actions taken based on Deliverables.',
      '9.3 Liability Cap. Aggregate liability shall not exceed Fees paid in the twelve (12) months preceding the claim.',
      '9.4 No liability for indirect, incidental, consequential, special, or punitive damages.',
      '9.5 Limitations apply to all causes of action and survive termination.',
      '9.6 Client Indemnity. The Client shall indemnify and hold harmless Rotation Analytics, Visser Ventures Corp., and their directors, officers, employees, and contractors from any claims, damages, losses, liabilities, or expenses arising from: (a) Client reliance on Deliverables; (b) inaccurate or incomplete information supplied by the Client; (c) operational decisions or implementation by the Client; or (d) third-party claims relating to the Client\'s rotation schedules, employment practices, or workplace operations.',
    ],
  })

  sections.push({
    heading: '10. DISCLAIMERS',
    paragraphs: [
      '10.1 Services do not constitute legal, medical, safety certification, compliance certification, HR, or labour relations advice.',
      '10.2 Independent professional advice should be obtained before acting on Deliverables.',
      '10.3 No guarantee of compliance or outcome is provided.',
      '10.4 Deliverables are provided "as is" without warranties, express or implied.',
    ],
  })

  sections.push({
    heading: '11. TERM AND TERMINATION',
    paragraphs: [
      '11.1 Agreement term is twelve (12) months with automatic renewal unless non-renewal notice is given.',
      '11.2 Either Party may terminate with thirty (30) days\' written notice.',
      '11.3 Immediate termination permitted for material breach or insolvency.',
      '11.4 Work-in-Progress Billing. Upon termination, Rotation Analytics may cease work immediately and invoice all work performed up to the termination date.',
      '11.5 Sections relating to confidentiality, IP, liability, indemnity, and disclaimers survive termination.',
    ],
  })

  sections.push({
    heading: '12. GOVERNING LAW AND DISPUTES',
    paragraphs: [
      '12.1 Governed by Alberta law and applicable Canadian federal law.',
      '12.2 Exclusive jurisdiction of Alberta courts.',
      '12.3 Parties shall attempt good-faith negotiation prior to litigation.',
    ],
  })

  sections.push({
    heading: '13. GENERAL PROVISIONS',
    paragraphs: [
      '13.1 Entire Agreement. This Agreement supersedes prior agreements.',
      '13.2 Amendment. Amendments must be in writing and signed.',
      '13.3 Assignment. Assignment requires consent except corporate reorganization by Provider.',
      '13.4 Notices. Notices may be delivered electronically.',
      '13.5 Severability. Invalid provisions shall be minimally modified to remain enforceable.',
      '13.6 Waiver. Failure to enforce does not waive rights.',
      '13.7 Force Majeure. Neither Party liable for events beyond reasonable control.',
      '13.8 Counterparts. Agreement may be executed electronically or in counterparts.',
      '13.9 No Third-Party Beneficiaries. This Agreement confers no rights upon any third party, including employees, unions, contractors, or affiliates of the Client.',
    ],
  })

  sections.push({
    heading: '14. ELECTRONIC ACCEPTANCE',
    paragraphs: [
      '14.1 Electronic execution is valid under the Electronic Transactions Act (Alberta).',
      '14.2 Electronic signatures have the same effect as handwritten signatures.',
      '14.3 Parties consent to electronic communications.',
    ],
  })

  closing.push(
    'IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.',
  )

  return {
    title: 'SERVICE AGREEMENT',
    subtitle: 'Rotation Analytics — a division of Visser Ventures Corp.\nAnalytical Services — Terms and Conditions',
    preamble,
    sections,
    closing,
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  // Fetch engagement by status token
  const { data: engagement, error } = await supabaseAdmin
    .from('engagements')
    .select('id, org_name, contact_name, email, agreement_signed_at, agreement_ip, agreement_version, work_order_number')
    .eq('status_token', params.token)
    .single()

  if (error || !engagement) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const agreement = parseAgreement()
  const signedDate = new Date(engagement.agreement_signed_at).toLocaleDateString('en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  const signedTimestamp = new Date(engagement.agreement_signed_at).toLocaleString('en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZoneName: 'short',
  })

  // Create PDF
  const doc = await PDFDocument.create()
  doc.setTitle(`Service Agreement — ${engagement.org_name}`)
  doc.setAuthor('Rotation Analytics')
  doc.setSubject('Service Agreement')
  doc.setCreator('Rotation Analytics')

  const fontRegular = await doc.embedFont(StandardFonts.TimesRoman)
  const fontBold = await doc.embedFont(StandardFonts.TimesRomanBold)
  const fontItalic = await doc.embedFont(StandardFonts.TimesRomanItalic)

  let page = doc.addPage([PAGE_W, PAGE_H])

  const ctx: DrawContext = { doc, page, y: PAGE_H - 60, fontRegular, fontBold, fontItalic }

  // === TITLE ===
  drawText(ctx, agreement.title, { font: fontBold, size: 18, color: NAVY })
  ctx.y -= 6
  drawText(ctx, 'Rotation Analytics — a division of Visser Ventures Corp.', { font: fontItalic, size: 11, color: GRAY })
  ctx.y -= 2
  drawText(ctx, 'Analytical Services — Terms and Conditions', { font: fontItalic, size: 11, color: GRAY })
  ctx.y -= 4
  drawHRule(ctx)

  // === PREAMBLE ===
  for (const para of agreement.preamble) {
    drawText(ctx, para, { size: 9.5 })
    ctx.y -= PARA_SPACING
  }
  drawHRule(ctx)

  // === SECTIONS ===
  for (const section of agreement.sections) {
    drawSectionHeading(ctx, section.heading)
    for (const para of section.paragraphs) {
      drawText(ctx, para, { size: 9.5 })
      ctx.y -= PARA_SPACING
    }
    drawHRule(ctx)
  }

  // === SIGNATURE PAGE ===
  ensureSpace(ctx, 300)
  // If we're more than halfway down the page, start a new page for signatures
  if (ctx.y < PAGE_H / 2) {
    ctx.page = doc.addPage([PAGE_W, PAGE_H])
    ctx.y = PAGE_H - 60
  }

  drawText(ctx, agreement.closing[0], { font: fontBold, size: 10, color: NAVY })
  ctx.y -= 20

  // Provider signature block
  drawText(ctx, 'VISSER VENTURES CORP.', { font: fontBold, size: 11, color: NAVY })
  drawText(ctx, 'Operating as Rotation Analytics', { font: fontItalic, size: 9.5, color: GRAY })
  ctx.y -= 10

  const sigFields = [
    ['Name:', 'Matthias Visser'],
    ['Title:', 'Director'],
    ['Email:', 'hello@rotationanalytics.ca'],
    ['Date:', signedDate],
  ]

  for (const [label, value] of sigFields) {
    drawText(ctx, `${label}`, { font: fontBold, size: 9.5, color: GRAY })
    // Draw value on same line offset
    ctx.y += LINE_HEIGHT // Go back up to same line
    drawText(ctx, value, { font: fontRegular, size: 9.5, indent: 80 })
  }

  ctx.y -= 10
  drawHRule(ctx)
  ctx.y -= 6

  // Client signature block
  drawText(ctx, 'CLIENT', { font: fontBold, size: 11, color: NAVY })
  ctx.y -= 10

  const clientFields = [
    ['Organization:', engagement.org_name],
    ['Name:', engagement.contact_name],
    ['Email:', engagement.email],
    ['Date:', signedDate],
  ]

  for (const [label, value] of clientFields) {
    drawText(ctx, `${label}`, { font: fontBold, size: 9.5, color: GRAY })
    ctx.y += LINE_HEIGHT
    drawText(ctx, value, { font: fontRegular, size: 9.5, indent: 80 })
  }

  ctx.y -= 16
  drawHRule(ctx)

  // Execution metadata
  ctx.y -= 4
  drawText(ctx, `Agreement Version: ${engagement.agreement_version}`, { font: fontItalic, size: 8, color: GRAY })
  drawText(ctx, `Accepted electronically: ${signedTimestamp}`, { font: fontItalic, size: 8, color: GRAY })
  if (engagement.agreement_ip) {
    drawText(ctx, `Acceptance IP: ${engagement.agreement_ip}`, { font: fontItalic, size: 8, color: GRAY })
  }
  drawText(ctx, 'Executed electronically pursuant to the Electronic Transactions Act (Alberta).', { font: fontItalic, size: 8, color: GRAY })
  ctx.y -= 6
  drawText(ctx, 'This Agreement is intended for commercial analytical services in Canada.', { font: fontItalic, size: 8, color: GRAY })
  drawText(ctx, 'Parties are encouraged to obtain independent legal advice prior to execution.', { font: fontItalic, size: 8, color: GRAY })

  // Serialize
  const pdfBytes = await doc.save()
  const filename = `Service_Agreement_${engagement.work_order_number ?? engagement.id}.pdf`

  // Audit log (best effort)
  try {
    await supabaseAdmin.from('audit_log').insert({
      engagement_id: engagement.id,
      action: 'agreement_downloaded',
      actor: 'client',
      metadata: { version: engagement.agreement_version },
    })
  } catch { /* non-critical */ }

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'private, no-cache',
    },
  })
}
