"""Generate Fatigue Risk Analysis Methodology White Paper PDF."""
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, HRFlowable
)
from reportlab.platypus.doctemplate import PageTemplate, BaseDocTemplate, Frame
from reportlab.lib.units import cm
import os

NAVY = HexColor("#1B2D4F")
NAVY_LIGHT = HexColor("#2A4470")
CREAM = HexColor("#FAFAF8")
SLATE_600 = HexColor("#475569")
SLATE_400 = HexColor("#94A3B8")
RED_700 = HexColor("#B91C1C")
AMBER_700 = HexColor("#B45309")
GREEN_700 = HexColor("#15803D")

OUTPUT = "C:/Users/matti/OneDrive/Desktop/AHS Rotations/Shift_analytics/public/rotations/fatigue-methodology-white-paper.pdf"

styles = getSampleStyleSheet()

style_body = ParagraphStyle(
    'Body', parent=styles['Normal'],
    fontName='Helvetica', fontSize=10, leading=15,
    textColor=SLATE_600, alignment=TA_JUSTIFY, spaceAfter=8
)
style_h1 = ParagraphStyle(
    'H1Custom', parent=styles['Heading1'],
    fontName='Helvetica-Bold', fontSize=22, leading=28,
    textColor=NAVY, spaceAfter=16, spaceBefore=24
)
style_h2 = ParagraphStyle(
    'H2Custom', parent=styles['Heading2'],
    fontName='Helvetica-Bold', fontSize=16, leading=21,
    textColor=NAVY, spaceAfter=10, spaceBefore=18
)
style_h3 = ParagraphStyle(
    'H3Custom', parent=styles['Heading3'],
    fontName='Helvetica-Bold', fontSize=12, leading=16,
    textColor=NAVY, spaceAfter=6, spaceBefore=12
)
style_bullet = ParagraphStyle(
    'Bullet', parent=style_body,
    leftIndent=20, bulletIndent=8, spaceBefore=2, spaceAfter=4
)
style_caption = ParagraphStyle(
    'Caption', parent=style_body,
    fontSize=8.5, leading=12, textColor=SLATE_400, alignment=TA_LEFT
)
style_ref = ParagraphStyle(
    'Reference', parent=style_body,
    fontSize=8.5, leading=13, textColor=SLATE_600, leftIndent=18, firstLineIndent=-18
)
style_center = ParagraphStyle(
    'CenterBody', parent=style_body, alignment=TA_CENTER
)
style_disclaimer = ParagraphStyle(
    'Disclaimer', parent=style_body,
    fontSize=8, leading=11, textColor=SLATE_400, alignment=TA_CENTER
)

def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 7.5)
    canvas.setFillColor(SLATE_400)
    canvas.drawString(72, letter[1] - 40, "Rotation Analytics Inc")
    canvas.drawRightString(letter[0] - 72, letter[1] - 40, "Confidential \u2014 Methodology White Paper")
    canvas.setStrokeColor(HexColor("#E2E8F0"))
    canvas.setLineWidth(0.5)
    canvas.line(72, letter[1] - 46, letter[0] - 72, letter[1] - 46)
    canvas.drawCentredString(letter[0] / 2, 36, str(doc.page))
    canvas.restoreState()

def build_cover(story):
    story.append(Spacer(1, 2.2 * inch))
    story.append(HRFlowable(width="40%", thickness=2, color=NAVY, spaceAfter=20))
    story.append(Paragraph("ROTATION ANALYTICS INC", ParagraphStyle(
        'CoverSub', fontName='Helvetica', fontSize=11, leading=14,
        textColor=SLATE_400, alignment=TA_LEFT, spaceAfter=30,
        tracking=3
    )))
    story.append(Paragraph(
        "Fatigue Risk Analysis:<br/>Mathematical Methodology<br/>and Validation",
        ParagraphStyle('CoverTitle', fontName='Helvetica-Bold', fontSize=28, leading=36,
                       textColor=NAVY, alignment=TA_LEFT, spaceAfter=18)
    ))
    story.append(Paragraph(
        "A Technical White Paper on the Biomathematical Fatigue Model<br/>Used by Rotation Analytics",
        ParagraphStyle('CoverSubtitle', fontName='Helvetica', fontSize=12, leading=17,
                       textColor=SLATE_600, alignment=TA_LEFT, spaceAfter=50)
    ))
    story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor("#E2E8F0"), spaceAfter=14))
    meta_style = ParagraphStyle('Meta', fontName='Helvetica', fontSize=9, leading=13, textColor=SLATE_400)
    story.append(Paragraph("Version 1.0  \u2022  March 2026", meta_style))
    story.append(Paragraph("Confidential", meta_style))
    story.append(PageBreak())

def bullet(text):
    return Paragraph(f"\u2022  {text}", style_bullet)

def build_document():
    story = []
    build_cover(story)

    # 1. Executive Summary
    story.append(Paragraph("1. Executive Summary", style_h1))
    story.append(Paragraph(
        "Rotation Analytics applies a biomathematical fatigue model to rotation schedules to identify "
        "where schedules create physiological fatigue risk \u2014 even when fully compliant with collective "
        "agreements. The model is based on the Three-Process Model of alertness regulation, originally "
        "published by Torbjörn Åkerstedt and Simon Folkard in 1987 and revised through 2008.",
        style_body
    ))
    story.append(Paragraph(
        "The model produces a fatigue score on a 0\u2013100 scale for every day of the rotation for every "
        "rotation line. Scores are classified into four risk levels \u2014 Low, Moderate, High, and Critical "
        "\u2014 enabling stakeholders to identify schedule segments that create meaningful fatigue exposure "
        "and make informed decisions about rotation design.",
        style_body
    ))
    story.append(Paragraph(
        "This white paper documents the scientific foundation, mathematical methodology, assumptions, "
        "and limitations of the fatigue analysis delivered by Rotation Analytics.",
        style_body
    ))
    story.append(Spacer(1, 10))

    # 2. Scientific Foundation
    story.append(Paragraph("2. Scientific Foundation", style_h1))
    story.append(Paragraph(
        "The Three-Process Model is the most widely validated biomathematical model for shift work "
        "fatigue in the occupational health literature. Originally published by Torbjörn Åkerstedt and "
        "Simon Folkard in 1987, the model has been revised and validated through 2008 across multiple "
        "occupational settings, including healthcare, transportation, and industrial operations.",
        style_body
    ))
    story.append(Paragraph(
        "Model parameters have been validated against real worker performance data. The model simulates "
        "three independent physiological processes that interact to produce a composite fatigue state. "
        "This approach captures the fundamental biology of human alertness: that fatigue is not simply a "
        "function of hours worked, but the interaction of sleep history, time of day, and cumulative "
        "sleep deficit.",
        style_body
    ))
    story.append(Spacer(1, 10))

    # 3. The Three Processes
    story.append(Paragraph("3. The Three Processes", style_h1))

    # 3.1 Process S
    story.append(Paragraph("3.1  Process S \u2014 Homeostatic Sleep Pressure", style_h2))
    story.append(Paragraph(
        "Sleep pressure is a real neurochemical process. Adenosine accumulates in the brain during "
        "wakefulness and clears during sleep. Process S models this biological mechanism as an "
        "exponential function that rises during wakefulness and falls during sleep.",
        style_body
    ))
    story.append(bullet(
        "<b>Build rate:</b> Sleep pressure accumulates gradually during every hour awake, approaching "
        "an upper asymptote of approximately 1.0. The time constant for wakefulness is approximately "
        "18.2 hours."
    ))
    story.append(bullet(
        "<b>Decay rate:</b> Sleep pressure clears approximately four times faster during sleep than it "
        "builds during wakefulness. The time constant for sleep is approximately 4.2 hours, decaying "
        "toward a lower asymptote of approximately 0.0."
    ))
    story.append(bullet(
        "<b>Residual load:</b> A worker who gets shortened sleep carries residual sleep pressure into "
        "their next shift. This residual load is the primary mechanism through which short rest periods "
        "create compounding fatigue."
    ))
    story.append(Paragraph(
        "Process S is the largest single component of the fatigue score. Its exponential dynamics "
        "mean that each additional hour of wakefulness produces a progressively larger increase in "
        "fatigue, while the first hours of sleep produce the most recovery.",
        style_body
    ))
    story.append(Spacer(1, 6))

    # Mathematical note
    story.append(Paragraph(
        "<i>Mathematical representation:</i> S(t) follows an exponential rise during wake toward the "
        "upper asymptote and an exponential decay during sleep toward the lower asymptote. The rate "
        "of change is governed by the respective time constants, producing a sawtooth pattern across "
        "the rotation cycle.",
        style_caption
    ))
    story.append(Spacer(1, 10))

    # 3.2 Process C
    story.append(Paragraph("3.2  Process C \u2014 Circadian Rhythm", style_h2))
    story.append(Paragraph(
        "The human body runs on an internal approximately 24-hour clock \u2014 the circadian pacemaker "
        "\u2014 governed by the suprachiasmatic nucleus. This clock governs alertness independently of "
        "sleep history. Process C models this rhythm as a sinusoidal function with a period of "
        "approximately 24 hours.",
        style_body
    ))
    story.append(bullet(
        "<b>Circadian trough:</b> Lowest alertness occurs at approximately 03:00\u201305:00 hours. "
        "Night shifts that span this window receive a circadian penalty of up to +16 points on the "
        "fatigue score."
    ))
    story.append(bullet(
        "<b>Circadian peak:</b> Highest alertness occurs at approximately 16:00 (mid-to-late afternoon). "
        "Day and evening shifts receive a circadian benefit of up to \u22129 points."
    ))
    story.append(Paragraph(
        "The circadian component captures the well-documented phenomenon that night shift workers are "
        "physiologically impaired even when adequately rested. This cycle runs continuously regardless "
        "of sleep history.",
        style_body
    ))
    story.append(Spacer(1, 10))

    # 3.3 Process D
    story.append(Paragraph("3.3  Process D \u2014 Sleep Debt", style_h2))
    story.append(Paragraph(
        "When predicted sleep falls below 6 hours and the gap between shifts is short, the shortfall "
        "accumulates as sleep debt. Process D captures the compounding effect of consecutive "
        "short-rest shifts.",
        style_body
    ))
    story.append(bullet(
        "Each hour of accumulated sleep debt adds <b>2 points</b> to the fatigue score."
    ))
    story.append(bullet(
        "Sleep debt resets to zero when the worker achieves a full sleep period of <b>7 hours or more</b>."
    ))
    story.append(Paragraph(
        "This process is critical for detecting the cumulative fatigue risk of compressed schedules "
        "where individual shifts may appear acceptable but the sequence creates compounding sleep loss. "
        "Without Process D, a schedule of five consecutive 11-hour shifts with 13-hour gaps would "
        "appear identical to a single such shift \u2014 the model recognises that it is not.",
        style_body
    ))
    story.append(Spacer(1, 10))

    # 4. Composite Fatigue Score
    story.append(Paragraph("4. Composite Fatigue Score", style_h1))
    story.append(Paragraph(
        "The three processes combine into a single composite fatigue score using the following formula:",
        style_body
    ))
    story.append(Spacer(1, 6))

    formula_style = ParagraphStyle(
        'Formula', fontName='Helvetica-Bold', fontSize=12, leading=18,
        textColor=NAVY, alignment=TA_CENTER, spaceBefore=8, spaceAfter=8
    )
    story.append(Paragraph("Fatigue Score = (S \u00d7 100) + C + (D \u00d7 2)", formula_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("Where:", style_body))
    story.append(bullet(
        "<b>S</b> is the homeostatic sleep pressure value (0\u20131 scale, converted to 0\u2013100)"
    ))
    story.append(bullet(
        "<b>C</b> is the circadian modifier (approximately \u22129 to +16)"
    ))
    story.append(bullet(
        "<b>D</b> is the accumulated sleep debt in hours"
    ))
    story.append(Paragraph(
        "The composite score is clamped to a 0\u2013100 range. The score represents the estimated "
        "fatigue state of a representative worker at any given point in the rotation.",
        style_body
    ))
    story.append(Spacer(1, 10))

    # 5. Sleep Prediction Model
    story.append(Paragraph("5. Sleep Prediction Model", style_h1))
    story.append(Paragraph(
        "The model does not assume workers sleep a fixed number of hours between shifts. Instead, it "
        "predicts when sleep actually occurs based on the worker's physiological state. Sleep onset "
        "and duration are determined by sleep pressure level, circadian phase, and shift timing.",
        style_body
    ))
    story.append(bullet(
        "Night shift workers are predicted to sleep during the day because their sleep pressure is "
        "high post-shift, and the circadian trough has passed."
    ))
    story.append(bullet(
        "During multi-day breaks, the model recognises the worker's natural daily sleep-wake cycle "
        "and simulates realistic recovery patterns."
    ))
    story.append(bullet(
        "No fixed sleep window is assumed \u2014 sleep timing adapts dynamically to the schedule."
    ))
    story.append(Paragraph(
        "This is a critical differentiator from simpler models that assume fixed 8-hour sleep windows. "
        "By modelling sleep as a physiological response to the schedule rather than a fixed input, the "
        "model produces more accurate fatigue predictions, particularly for irregular and rotating "
        "schedules.",
        style_body
    ))
    story.append(Spacer(1, 10))

    # 6. Simulation Methodology
    story.append(Paragraph("6. Simulation Methodology", style_h1))
    story.append(Paragraph(
        "The model runs a 15-minute step simulation continuously across every day in the rotation. "
        "The simulation covers both worked days and days off. Unlike analyses that only score worked "
        "shifts, this model simulates physiology through the entire rotation.",
        style_body
    ))
    story.append(bullet(
        "Recovery during days off is visible in the data, providing a complete picture of the "
        "fatigue and recovery cycle."
    ))
    story.append(bullet(
        "The worker's physiological state entering their next shift block is accurately carried "
        "forward rather than artificially reset."
    ))
    story.append(bullet(
        "This end-to-end simulation captures cumulative effects that point-in-time assessments miss."
    ))
    story.append(Paragraph(
        "The 15-minute resolution provides sufficient granularity to capture meaningful physiological "
        "changes while remaining computationally efficient across multi-week rotation cycles with "
        "multiple lines.",
        style_body
    ))
    story.append(Spacer(1, 10))

    # 7. Risk Classification
    story.append(Paragraph("7. Risk Classification", style_h1))
    story.append(Paragraph(
        "Fatigue scores are classified into four risk levels based on established thresholds:",
        style_body
    ))
    story.append(Spacer(1, 6))

    table_data = [
        ["Score Range", "Classification", "Description"],
        ["0 \u2013 44", "Low",
         "Worker is operating within normal physiological parameters for a standard shift. "
         "No intervention indicated."],
        ["45 \u2013 59", "Moderate",
         "Elevated fatigue. Typical of evening shifts and consecutive day shifts with mildly "
         "shortened sleep. Performance may be subtly degraded. This is the expected baseline "
         "result for shift workers."],
        ["60 \u2013 74", "High",
         "Significant fatigue. Typical of night shifts, where the circadian trough compounds "
         "sleep pressure. Meaningful degradation in reaction time and decision-making expected."],
        ["75 \u2013 100", "Critical",
         "Severe fatigue. Occurs with extended wakefulness, deep circadian trough, and compounding "
         "sleep debt. Performance impairment comparable to levels documented in occupational health "
         "fatigue literature. Immediate schedule review required."],
    ]
    col_widths = [1.0 * inch, 1.1 * inch, 4.3 * inch]
    t = Table(table_data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 1), (-1, -1), SLATE_600),
        ('BACKGROUND', (0, 1), (1, 1), HexColor("#F0FDF4")),
        ('BACKGROUND', (0, 2), (1, 2), HexColor("#FFFBEB")),
        ('BACKGROUND', (0, 3), (1, 3), HexColor("#FEF2F2")),
        ('BACKGROUND', (0, 4), (1, 4), HexColor("#FEF2F2")),
        ('TEXTCOLOR', (1, 1), (1, 1), GREEN_700),
        ('TEXTCOLOR', (1, 2), (1, 2), AMBER_700),
        ('TEXTCOLOR', (1, 3), (1, 3), RED_700),
        ('TEXTCOLOR', (1, 4), (1, 4), RED_700),
        ('FONTNAME', (1, 1), (1, -1), 'Helvetica-Bold'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ALIGN', (0, 0), (0, -1), 'CENTER'),
        ('ALIGN', (1, 0), (1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, HexColor("#E2E8F0")),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(t)
    story.append(Spacer(1, 16))

    # 8. Model Assumptions and Limitations
    story.append(Paragraph("8. Model Assumptions and Limitations", style_h1))
    story.append(Paragraph(
        "Transparency about model boundaries is essential for appropriate interpretation of results. "
        "The following assumptions and limitations apply:",
        style_body
    ))
    story.append(bullet(
        "The model represents a <b>typical working-age adult</b> (\u201crepresentative worker\u201d). "
        "It does not account for individual variation in sleep patterns, age, chronotype, health "
        "status, caffeine use, or personal fitness."
    ))
    story.append(bullet(
        "Fatigue scores are <b>predictions</b> based on established physiological parameters, not "
        "measurements of actual worker states."
    ))
    story.append(bullet(
        "The model assumes the worker follows the <b>scheduled shift pattern as provided</b>. It does "
        "not account for overtime, shift swaps, or absences."
    ))
    story.append(bullet(
        "Results should be interpreted as <b>relative risk indicators</b>, not absolute performance "
        "predictions."
    ))
    story.append(bullet(
        "The analysis is informational and <b>does not constitute medical, safety, or legal advice</b>."
    ))
    story.append(Spacer(1, 10))

    # 9. Deliverable Format
    story.append(Paragraph("9. Deliverable Format", style_h1))
    story.append(Paragraph(
        "Fatigue analysis results are delivered alongside compliance findings in a combined report. "
        "The fatigue deliverable includes:",
        style_body
    ))
    story.append(bullet(
        "<b>Per-line fatigue scores:</b> average, minimum, and maximum scores for each rotation line."
    ))
    story.append(bullet(
        "<b>Risk classification</b> for each line based on average and maximum scores."
    ))
    story.append(bullet(
        "<b>Rotation-wide trend visualisations</b> (sparklines) showing the complete fatigue and "
        "recovery cycle across every day of the rotation \u2014 both worked days and days off."
    ))
    story.append(bullet(
        "All sparklines use the same <b>0\u2013100 vertical scale</b> and are directly comparable "
        "across rows."
    ))
    story.append(Spacer(1, 10))

    # 10. References
    story.append(Paragraph("10. References", style_h1))
    refs = [
        "Åkerstedt, T., & Folkard, S. (1997). The three-process model of alertness and its extension to performance, sleep latency, and sleep length. <i>Chronobiology International, 14</i>(2), 115\u2013123.",
        "Åkerstedt, T., Connor, J., Gray, A., & Kecklund, G. (2008). Predicting road crashes from a mathematical model of alertness regulation \u2014 the Sleep/Wake Predictor. <i>Accident Analysis & Prevention, 40</i>(4), 1480\u20131485.",
        "Folkard, S., & Åkerstedt, T. (1987). Towards a model for the prediction of alertness and/or fatigue on different sleep/wake schedules. In A. Oginski, J. Pokorski, & J. Rutenfranz (Eds.), <i>Contemporary Advances in Shiftwork Research</i>, 231\u2013240.",
        "Dawson, D., & Reid, K. (1997). Fatigue, alcohol and performance impairment. <i>Nature, 388</i>(6639), 235.",
        "Van Dongen, H. P. A., Maislin, G., Mullington, J. M., & Dinges, D. F. (2003). The cumulative cost of additional wakefulness: Dose-response effects on neurobehavioral functions and sleep physiology from chronic sleep restriction and total sleep deprivation. <i>Sleep, 26</i>(2), 117\u2013126.",
    ]
    for r in refs:
        story.append(Paragraph(r, style_ref))
    story.append(Spacer(1, 10))

    # Final Page
    story.append(PageBreak())
    story.append(Spacer(1, 2.5 * inch))
    story.append(HRFlowable(width="30%", thickness=2, color=NAVY, spaceAfter=24))
    story.append(Paragraph("Rotation Analytics Inc", ParagraphStyle(
        'FinalName', fontName='Helvetica-Bold', fontSize=16, leading=22,
        textColor=NAVY, alignment=TA_CENTER, spaceAfter=4
    )))
    story.append(Paragraph(
        "A division of Visser Ventures Corp.",
        ParagraphStyle('FinalDiv', fontName='Helvetica', fontSize=10, leading=14,
                       textColor=SLATE_400, alignment=TA_CENTER, spaceAfter=20)
    ))
    contact_lines = [
        "PO Box 2234, Crossfield, Alberta, Canada",
        "hello@rotationanalytics.ca  |  (403) 506-3636",
        "rotationanalytics.ca",
    ]
    for line in contact_lines:
        story.append(Paragraph(line, style_center))
    story.append(Spacer(1, 30))
    story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor("#E2E8F0"), spaceAfter=14))
    story.append(Paragraph(
        "This document is provided for informational purposes. It describes the mathematical "
        "methodology used by Rotation Analytics in its Fatigue Risk Analysis service. This document "
        "does not constitute medical, safety, or legal advice.",
        style_disclaimer
    ))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "\u00a9 2026 Rotation Analytics Inc. All rights reserved.",
        style_disclaimer
    ))

    # Build
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=letter,
        topMargin=0.9 * inch,
        bottomMargin=0.7 * inch,
        leftMargin=1.0 * inch,
        rightMargin=1.0 * inch,
        title="Fatigue Risk Analysis: Mathematical Methodology and Validation",
        author="Rotation Analytics Inc",
        subject="Biomathematical Fatigue Model Methodology White Paper",
    )
    doc.build(story, onFirstPage=lambda c, d: None, onLaterPages=header_footer)
    print(f"PDF generated: {OUTPUT}")
    print(f"Size: {os.path.getsize(OUTPUT):,} bytes")

if __name__ == "__main__":
    build_document()
