"""Generate Fatigue Risk Analysis Methodology White Paper PDF.

Aligned to actual calibrated implementation per the Fatigue Risk Analysis
Report Instructions document. Includes all three theoretical processes (S, C, W)
but documents that W (Sleep Inertia) is zeroed in practice. Uses calibrated
risk thresholds (0-44/45-59/60-74/75-100) and actual formula with k=2.
"""
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, HRFlowable, Image
)
from reportlab.platypus.doctemplate import PageTemplate, BaseDocTemplate, Frame
from reportlab.lib.units import cm
import os

# ── Paths ──
BASE = "C:/Users/matti/OneDrive/Desktop/AHS Rotations/Shift_analytics"
OUTPUT = f"{BASE}/public/rotations/RA-Fatigue-Engine-White-Paper.pdf"
LOGO_PNG = f"{BASE}/public/logo/rotation-mark.png"

# ── Colors ──
NAVY = HexColor("#1B2D4F")
SLATE_600 = HexColor("#475569")
SLATE_400 = HexColor("#94A3B8")
SLATE_200 = HexColor("#E2E8F0")
RED_700 = HexColor("#B91C1C")
AMBER_700 = HexColor("#B45309")
GREEN_700 = HexColor("#15803D")

styles = getSampleStyleSheet()

style_body = ParagraphStyle(
    'Body', parent=styles['Normal'],
    fontName='Helvetica', fontSize=10, leading=15,
    textColor=SLATE_600, alignment=TA_JUSTIFY, spaceAfter=8
)
style_h1 = ParagraphStyle(
    'H1Custom', parent=styles['Heading1'],
    fontName='Helvetica-Bold', fontSize=20, leading=26,
    textColor=NAVY, spaceAfter=14, spaceBefore=20
)
style_h2 = ParagraphStyle(
    'H2Custom', parent=styles['Heading2'],
    fontName='Helvetica-Bold', fontSize=14, leading=19,
    textColor=NAVY, spaceAfter=8, spaceBefore=16
)
style_h3 = ParagraphStyle(
    'H3Custom', parent=styles['Heading3'],
    fontName='Helvetica-Bold', fontSize=11, leading=15,
    textColor=NAVY, spaceAfter=6, spaceBefore=10
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
style_formula = ParagraphStyle(
    'Formula', fontName='Courier', fontSize=10, leading=14,
    textColor=NAVY, alignment=TA_LEFT, spaceBefore=6, spaceAfter=6,
    leftIndent=30, backColor=HexColor("#F8FAFC")
)
style_formula_center = ParagraphStyle(
    'FormulaCenter', fontName='Courier-Bold', fontSize=11, leading=16,
    textColor=NAVY, alignment=TA_CENTER, spaceBefore=8, spaceAfter=8
)
style_param = ParagraphStyle(
    'Param', fontName='Courier', fontSize=9, leading=13,
    textColor=SLATE_600, alignment=TA_LEFT, leftIndent=30,
    spaceBefore=2, spaceAfter=2
)

def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 7.5)
    canvas.setFillColor(SLATE_400)
    canvas.drawString(72, letter[1] - 40, "Rotation Analytics Inc")
    canvas.drawRightString(letter[0] - 72, letter[1] - 40, "Confidential \u2014 Methodology White Paper")
    canvas.setStrokeColor(SLATE_200)
    canvas.setLineWidth(0.5)
    canvas.line(72, letter[1] - 46, letter[0] - 72, letter[1] - 46)
    canvas.drawCentredString(letter[0] / 2, 36, str(doc.page))
    canvas.restoreState()

def bullet(text):
    return Paragraph(f"\u2022  {text}", style_bullet)

def formula(text):
    return Paragraph(text, style_formula)

def param(text):
    return Paragraph(text, style_param)


def build_cover(story):
    story.append(Spacer(1, 0.8 * inch))
    if os.path.exists(LOGO_PNG):
        logo = Image(LOGO_PNG, width=1.1 * inch, height=1.1 * inch)
        logo.hAlign = 'LEFT'
        story.append(logo)
        story.append(Spacer(1, 0.5 * inch))
    story.append(HRFlowable(width="40%", thickness=2, color=NAVY, spaceAfter=20))
    story.append(Paragraph("ROTATION ANALYTICS INC", ParagraphStyle(
        'CoverSub', fontName='Helvetica', fontSize=10, leading=13,
        textColor=SLATE_400, alignment=TA_LEFT, spaceAfter=24, tracking=3
    )))
    story.append(Paragraph(
        "Fatigue Risk Analysis:<br/>Mathematical Methodology<br/>and Validation",
        ParagraphStyle('CoverTitle', fontName='Helvetica-Bold', fontSize=28, leading=36,
                       textColor=NAVY, alignment=TA_LEFT, spaceAfter=16)
    ))
    story.append(Paragraph(
        "A Technical White Paper on the Biomathematical Fatigue Model<br/>"
        "Used by Rotation Analytics",
        ParagraphStyle('CoverSubtitle', fontName='Helvetica', fontSize=12, leading=17,
                       textColor=SLATE_600, alignment=TA_LEFT, spaceAfter=50)
    ))
    story.append(HRFlowable(width="100%", thickness=0.5, color=SLATE_200, spaceAfter=14))
    meta = ParagraphStyle('Meta', fontName='Helvetica', fontSize=9, leading=13, textColor=SLATE_400)
    story.append(Paragraph("Version 2.0  \u2022  March 2026", meta))
    story.append(Paragraph("Confidential", meta))
    story.append(PageBreak())


def build_toc(story):
    story.append(Paragraph("Table of Contents", style_h1))
    toc_style = ParagraphStyle(
        'TOC', fontName='Helvetica', fontSize=10, leading=18, textColor=SLATE_600, leftIndent=10
    )
    for item in [
        "1.  Executive Summary",
        "2.  Scientific Foundation",
        "3.  The Three Processes",
        "4.  The Fatigue Score",
        "5.  Sleep Prediction Model",
        "6.  Sleep Debt",
        "7.  Simulation Methodology",
        "8.  Engine Architecture",
        "9.  Risk Classification Framework",
        "10. Calibration Notes",
        "11. Model Assumptions and Limitations",
        "12. Deliverable Format",
        "13. Mathematical Appendix",
        "14. References",
    ]:
        story.append(Paragraph(item, toc_style))
    story.append(PageBreak())


def build_document():
    story = []
    build_cover(story)
    build_toc(story)

    # ═══════════════════════════════════════
    # 1. EXECUTIVE SUMMARY
    # ═══════════════════════════════════════
    story.append(Paragraph("1. Executive Summary", style_h1))
    story.append(Paragraph(
        "Rotation Analytics applies a biomathematical fatigue model to rotation schedules to identify "
        "where schedules create physiological fatigue risk, even when fully compliant with collective "
        "agreements. The model is based on the Three-Process Model of alertness regulation, originally "
        "published by Torbjörn Åkerstedt and Simon Folkard in 1987 and refined through 2008.",
        style_body
    ))
    story.append(Paragraph(
        "The model produces a Fatigue Score on a 0\u2013100 scale for every day of the rotation for "
        "every rotation line. Scores are classified into four risk levels (Low, Moderate, High, "
        "and Critical), enabling stakeholders to identify schedule segments associated with elevated "
        "fatigue exposure and make informed decisions about rotation design.",
        style_body
    ))
    story.append(Paragraph(
        "The Fatigue Score is a <b>relative physiological risk estimate</b> produced by deterministic "
        "simulation. It is intended as a decision-support tool for scheduling review, not as a "
        "diagnostic instrument, compliance determination, or safety guarantee. The model produces "
        "identical outputs for identical inputs.",
        style_body
    ))
    story.append(Paragraph(
        "This white paper documents the complete scientific foundation, mathematical methodology, "
        "engine architecture, calibration decisions, model parameters, assumptions, and limitations "
        "of the fatigue analysis delivered by Rotation Analytics.",
        style_body
    ))

    # ═══════════════════════════════════════
    # 2. SCIENTIFIC FOUNDATION
    # ═══════════════════════════════════════
    story.append(Paragraph("2. Scientific Foundation", style_h1))
    story.append(Paragraph(
        "The Three-Process Model is the most widely cited and validated biomathematical model for "
        "shift work fatigue in the occupational health literature. Originally published by Åkerstedt "
        "and Folkard in 1987, the model has been revised and validated through 2008 across multiple "
        "occupational settings, including healthcare, transportation, and industrial operations.",
        style_body
    ))
    story.append(Paragraph("The model was selected for this implementation because:", style_body))
    story.append(bullet(
        "It is published openly in peer-reviewed scientific literature; its equations and "
        "parameters are transparent and auditable"
    ))
    story.append(bullet(
        "It was developed specifically to model shift work environments"
    ))
    story.append(bullet(
        "Its parameters have been validated against real worker performance data, including "
        "healthcare and industrial settings"
    ))
    story.append(bullet(
        "It supports deterministic implementation without proprietary software"
    ))
    story.append(bullet(
        "It produces outputs that are interpretable by clients, regulators, and arbitrators"
    ))
    story.append(Paragraph(
        "The Rotation Analytics implementation uses published equations and parameter values from "
        "the Three-Process Model literature. No novel physiological claims are introduced. The "
        "implementation's validity rests on faithful reproduction of the published model's behaviour: "
        "outputs exhibit the expected relationships between sleep pressure, circadian phase, and "
        "fatigue as documented in the source literature.",
        style_body
    ))
    story.append(Paragraph(
        "The published model describes three independent physiological processes: homeostatic sleep "
        "pressure (Process S), circadian rhythm (Process C), and sleep inertia (Process W). The "
        "Rotation Analytics implementation activates Process S and Process C as the primary fatigue "
        "drivers, with a calibrated sleep debt modifier. Process W (sleep inertia) is documented "
        "below but is zeroed in the current implementation, as explained in the Calibration Notes.",
        style_body
    ))

    # ═══════════════════════════════════════
    # 3. THE THREE PROCESSES
    # ═══════════════════════════════════════
    story.append(Paragraph("3. The Three Processes", style_h1))
    story.append(Paragraph(
        "Human alertness is the product of interacting physiological systems operating "
        "simultaneously. The fatigue engine calculates each independently at every time step "
        "across the rotation.",
        style_body
    ))

    # 3.1 Process S
    story.append(Paragraph("3.1  Process S \u2014 Homeostatic Sleep Pressure", style_h2))
    story.append(Paragraph(
        "The longer a person is awake, the more their body builds pressure to sleep. This is a "
        "measurable neurochemical process \u2014 adenosine accumulates in the brain during wakefulness "
        "and is cleared during sleep. Process S models this mechanism as an exponential function "
        "that rises during wakefulness and falls during sleep.",
        style_body
    ))
    story.append(Paragraph("During wakefulness, sleep pressure increases toward an upper asymptote of 1.0:", style_body))
    story.append(formula("S(t) = S(t-1) + (1 - S(t-1)) \u00d7 (\u0394t / \u03c4_w)"))
    story.append(Paragraph("During sleep, sleep pressure decays toward 0:", style_body))
    story.append(formula("S(t) = S(t-1) - S(t-1) \u00d7 (\u0394t / \u03c4_s)"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Parameters:</b>", style_body))
    story.append(param("\u03c4_w = 18 hours   (wake time constant \u2014 rate of pressure buildup)"))
    story.append(param("\u03c4_s = 4 hours    (sleep time constant \u2014 rate of pressure dissipation)"))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "The asymmetry between these time constants is physiologically significant: pressure "
        "accumulates slowly across a shift (18-hour time constant) and clears relatively quickly "
        "during sleep (4-hour time constant). After 8 hours of sleep, pressure approaches zero. "
        "After 16 hours awake (a normal waking day), pressure has risen to a moderate level. After "
        "24 hours of continuous wakefulness, pressure approaches the upper asymptote.",
        style_body
    ))
    story.append(Paragraph(
        "Process S is the largest single component of the fatigue score. A worker who gets shortened "
        "sleep carries residual sleep pressure into their next shift \u2014 this is the primary mechanism "
        "through which short rest periods create compounding fatigue.",
        style_body
    ))

    # 3.2 Process C
    story.append(Paragraph("3.2  Process C \u2014 Circadian Rhythm", style_h2))
    story.append(Paragraph(
        "The human body runs on an internal approximately 24-hour clock governed by the "
        "suprachiasmatic nucleus. This clock governs alertness independently of sleep history. "
        "Process C models this rhythm as a sinusoidal oscillator:",
        style_body
    ))
    story.append(formula("C(t) = A \u00d7 sin(2\u03c0(t - \u03c6) / 24)"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Parameters:</b>", style_body))
    story.append(param("A = 0.5        (amplitude)"))
    story.append(param("\u03c6 = 16.8 hours (phase offset \u2014 sets peak alertness at ~16:00)"))
    story.append(Spacer(1, 6))
    story.append(bullet(
        "<b>Circadian trough:</b> Lowest alertness occurs at approximately 03:00\u201305:00 hours. "
        "Night shifts spanning this window receive a circadian penalty of up to <b>+16 points</b> "
        "on the fatigue score."
    ))
    story.append(bullet(
        "<b>Circadian peak:</b> Highest alertness occurs at approximately 16:00 (mid-to-late afternoon). "
        "Day and evening shifts receive a circadian benefit of up to <b>\u22129 points</b>."
    ))
    story.append(Paragraph(
        "Even a fully rested worker experiences a measurable reduction in alertness during the "
        "circadian trough. Circadian rhythms do not adapt rapidly to schedule changes; shifting "
        "from days to nights requires multiple days of consistent exposure, and many rotating "
        "schedules do not hold a worker on one pattern long enough for adaptation to occur.",
        style_body
    ))

    # 3.3 Process W
    story.append(Paragraph("3.3  Process W \u2014 Sleep Inertia (Theoretical)", style_h2))
    story.append(Paragraph(
        "The published Three-Process Model includes a third component: sleep inertia. When a person "
        "wakes from sleep, there is a short but measurable period \u2014 typically 20 to 60 minutes \u2014 "
        "during which performance is temporarily impaired. This is modelled as an exponential decay "
        "from an initial impairment value at the moment of waking:",
        style_body
    ))
    story.append(formula("W(t) = W\u2080 \u00d7 exp(-t / \u03c4_i)"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Published Parameters:</b>", style_body))
    story.append(param("W\u2080  = 0.3       (initial inertia magnitude)"))
    story.append(param("\u03c4_i = 0.5 hours (decay time constant)"))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "<b>Implementation note:</b> In the Rotation Analytics implementation, Process W is set to "
        "zero (W\u2080 = 0). The rationale for this decision is documented in Section 10 (Calibration "
        "Notes). The theoretical model is included here for completeness.",
        style_body
    ))

    # ═══════════════════════════════════════
    # 4. THE FATIGUE SCORE
    # ═══════════════════════════════════════
    story.append(Paragraph("4. The Fatigue Score", style_h1))
    story.append(Paragraph(
        "The active processes combine into a single Fatigue Score on a 0\u2013100 scale:",
        style_body
    ))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "Fatigue Score = (S \u00d7 100) + C + (D \u00d7 2)",
        style_formula_center
    ))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Where:", style_body))
    story.append(bullet(
        "<b>S \u00d7 100</b> converts the 0\u20131 sleep pressure value to a 0\u2013100 base score"
    ))
    story.append(bullet(
        "<b>C</b> is the Circadian Modifier, ranging from approximately \u22129 (afternoon, favourable) "
        "to +16 (early morning, unfavourable)"
    ))
    story.append(bullet(
        "<b>D \u00d7 2</b> adds 2 points per hour of accumulated sleep debt"
    ))
    story.append(Paragraph(
        "The composite score is clamped to the 0\u2013100 range. A score of 0 represents minimal "
        "physiological fatigue. A score of 100 represents the upper bound of the model's fatigue "
        "range. All scores represent a <b>representative worker</b>: a healthy working-age adult "
        "with no pre-existing sleep disorders, following the scheduled shift pattern without "
        "overtime or shift swaps. Scores are comparative risk indicators between schedule segments "
        "and rotation lines, not absolute predictions of individual worker performance.",
        style_body
    ))

    # ═══════════════════════════════════════
    # 5. SLEEP PREDICTION MODEL
    # ═══════════════════════════════════════
    story.append(Paragraph("5. Sleep Prediction Model", style_h1))
    story.append(Paragraph(
        "The model does not assume workers sleep a fixed number of hours between shifts. Instead, "
        "sleep timing and duration are determined by <b>rule-based deterministic logic</b> operating "
        "within physiological constraints derived from the Three-Process Model. Given identical "
        "schedule inputs, the sleep prediction produces identical outputs.",
        style_body
    ))
    story.append(Paragraph("5.1  Sleep Onset", style_h2))
    story.append(Paragraph(
        "Sleep onset is triggered when two conditions are satisfied: sleep pressure exceeds a "
        "threshold value and the circadian phase is in a sleep-favourable window. During multi-day "
        "breaks, the model recognises that once sleep pressure rebuilds to a moderate level during "
        "nighttime hours (22:00\u201306:00), the worker will initiate sleep again, producing a "
        "normal daily sleep-wake cycle across rest periods.",
        style_body
    ))
    story.append(Paragraph("5.2  Sleep Termination", style_h2))
    story.append(Paragraph(
        "Sleep terminates when any of the following conditions is met: sleep pressure has cleared "
        "below a threshold value, the circadian clock enters a strong alerting phase (natural "
        "morning waking), or the next shift is approaching. No fixed sleep window is assumed; "
        "sleep timing adapts to the schedule.",
        style_body
    ))
    story.append(Paragraph(
        "Night shift workers are predicted to sleep during the day because their sleep pressure is "
        "high after the night shift. Predicted sleep duration under normal conditions falls in the "
        "6\u20138 hour range, consistent with published polysomnographic data for shift workers. When "
        "off-time is shortened, predicted sleep is truncated accordingly.",
        style_body
    ))

    # ═══════════════════════════════════════
    # 6. SLEEP DEBT
    # ═══════════════════════════════════════
    story.append(Paragraph("6. Sleep Debt", style_h1))
    story.append(Paragraph(
        "Process S captures within-shift fatigue accumulation. Sleep debt captures the "
        "<b>between-shift</b> effect: when consecutive rest periods are too short to fully restore "
        "the worker, each shortfall compounds into the next shift.",
        style_body
    ))
    story.append(Paragraph(
        "When predicted sleep falls below 6 hours and the gap between shifts is under 16 hours, "
        "the shortfall accumulates as sleep debt. Each hour of debt adds <b>2 points</b> "
        "to the Fatigue Score (the <b>k = 2</b> multiplier in Section 4).",
        style_body
    ))
    story.append(Paragraph(
        "Sleep debt resets to zero when the worker achieves a full sleep period of <b>7 hours or "
        "more</b>. This binary reset is a deliberate simplification: the model treats a single "
        "full sleep as sufficient recovery from accumulated short-rest debt, consistent with the "
        "model's role as a scheduling-level risk indicator rather than a clinical sleep tracker.",
        style_body
    ))
    story.append(Paragraph(
        "<b>Two-gate accumulation rule.</b> Both conditions (predicted sleep &lt; 6 hours <i>and</i> "
        "shift gap &lt; 16 hours) must be satisfied for debt to accumulate. A worker with several "
        "days off who sleeps less simply because they are not fatigued does not accumulate debt. "
        "The 16-hour gap threshold ensures that only genuinely compressed rest periods contribute "
        "to debt accumulation.",
        style_body
    ))

    # ═══════════════════════════════════════
    # 7. SIMULATION METHODOLOGY
    # ═══════════════════════════════════════
    story.append(Paragraph("7. Simulation Methodology", style_h1))
    story.append(Paragraph(
        "The model runs a continuous simulation at 15-minute resolution across every day in the "
        "rotation, including both worked days and days off.",
        style_body
    ))
    story.append(Paragraph("<b>Initialization.</b> The simulation assumes the worker begins the rotation "
        "in a fully rested state: sleep pressure is set to its post-sleep baseline (S = 0.1), sleep "
        "debt is zero, and the circadian phase corresponds to 06:00 on the first day. This assumption "
        "means the first shift block in the rotation is evaluated under favourable conditions; fatigue "
        "effects attributable to the rotation itself emerge from the second shift onward.",
        style_body
    ))
    story.append(Paragraph("<b>Boundary conditions.</b> All state variables (sleep pressure, circadian "
        "phase, sleep debt) are carried forward continuously from one time step to the next. There "
        "are no resets at shift boundaries, day boundaries, or between worked and off-duty periods. "
        "The simulation terminates at the end of the last scheduled day in the rotation.",
        style_body
    ))
    story.append(Paragraph("<b>Time Grid Specification:</b>", style_body))
    story.append(param("Resolution:  \u0394t = 0.25 hours (15 minutes)"))
    story.append(param("Example:     14-day rotation = 336 hours = 1,344 time steps"))
    story.append(Spacer(1, 6))

    # State variables table
    sv_data = [
        ["Variable", "Description"],
        ["Time", "Timestamp at 15-minute resolution"],
        ["Working", "1 if within shift, 0 otherwise"],
        ["SleepOpportunity", "1 if off-shift and in sleep-favourable window"],
        ["Sleeping", "1 if predicted sleep is occurring"],
        ["SleepPressure", "Current Process S value (0\u20131)"],
        ["Circadian", "Current Process C value"],
        ["FatigueScore", "Composite fatigue metric (0\u2013100)"],
    ]
    svt = Table(sv_data, colWidths=[1.8 * inch, 4.6 * inch], repeatRows=1)
    svt.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('FONTNAME', (0, 1), (0, -1), 'Courier'),
        ('FONTNAME', (1, 1), (1, -1), 'Helvetica'),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 1), (-1, -1), SLATE_600),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, SLATE_200),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(svt)
    story.append(Paragraph("<i>Table 1: State variables tracked at each 15-minute time step.</i>", style_caption))
    story.append(Spacer(1, 8))
    story.append(bullet(
        "Recovery during days off is visible in the data \u2014 you can see sleep pressure drop "
        "and fatigue scores decrease across rest periods, confirming the schedule provides adequate recovery."
    ))
    story.append(bullet(
        "The worker's physiological state entering their next shift block is accurately carried "
        "forward from the preceding days off, rather than being artificially reset."
    ))
    story.append(bullet(
        "On days off, the fatigue score represents the worker's resting physiological state at the "
        "end of that day \u2014 effectively, how fatigued they would be if called in at that point."
    ))

    # ═══════════════════════════════════════
    # 8. ENGINE ARCHITECTURE
    # ═══════════════════════════════════════
    story.append(Paragraph("8. Engine Architecture", style_h1))
    story.append(Paragraph(
        "The fatigue engine follows a sequential processing pipeline:", style_body
    ))
    for i, (stage, desc) in enumerate([
        ("Schedule Extraction", "Read shift data from the submitted rotation file"),
        ("Off-Time Calculation", "Derive off-duty intervals between consecutive shifts"),
        ("Timeline Generation", "Build the 15-minute resolution simulation grid"),
        ("Sleep Prediction", "Apply sleep opportunity logic and predict sleep periods"),
        ("Process S Calculation", "Compute homeostatic sleep pressure at each time step"),
        ("Process C Calculation", "Compute circadian rhythm value at each time step"),
        ("Fatigue Scoring", "Combine S and C into the composite Fatigue Score"),
        ("Sleep Debt Modifier", "Track cumulative debt and apply upward modifier"),
        ("Risk Classification", "Apply calibrated risk thresholds and generate per-shift flags"),
        ("Output Generation", "Produce fatigue curves, risk flags, and per-shift scores"),
    ], 1):
        story.append(Paragraph(
            f"<b>{i}. {stage}</b> \u2014 {desc}",
            ParagraphStyle('Pipeline', parent=style_body, leftIndent=15, spaceAfter=3, spaceBefore=2)
        ))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "All calculations are performed in memory. Expected computation time is under one second "
        "for a standard rotation.",
        style_body
    ))

    # ═══════════════════════════════════════
    # 9. RISK CLASSIFICATION FRAMEWORK
    # ═══════════════════════════════════════
    story.append(Paragraph("9. Risk Classification Framework", style_h1))
    story.append(Paragraph(
        "Fatigue Scores are mapped to four risk categories. These thresholds have been "
        "calibrated against real-world shift schedules to produce actionable classifications "
        "(see Section 10 for calibration rationale).",
        style_body
    ))
    story.append(Paragraph(
        "<b>Interpretation guidance.</b> Risk classifications describe the modelled physiological "
        "state of a representative worker at a given point in the rotation. They are not compliance "
        "determinations, safety guarantees, or predictions of individual worker performance. A "
        "\"Low\" classification does not certify a schedule as safe; a \"Critical\" classification "
        "does not constitute a finding of regulatory non-compliance. Classifications are intended "
        "to support scheduling review by identifying where the schedule creates conditions "
        "associated with elevated fatigue exposure.",
        style_body
    ))
    story.append(Spacer(1, 6))

    table_data = [
        ["Score Range", "Classification", "Description"],
        ["0 \u2013 44", "Low",
         "Fatigue score is within the range expected for a standard day shift with adequate "
         "prior rest. No schedule-level concern indicated."],
        ["45 \u2013 59", "Moderate",
         "Fatigue score is elevated above baseline. Commonly observed during evening shifts "
         "and consecutive day shifts where rest periods are mildly shortened."],
        ["60 \u2013 74", "High",
         "Fatigue score reflects compounding sleep pressure and circadian effects. Commonly "
         "observed during night shift blocks where the circadian trough overlaps with accumulated "
         "wakefulness."],
        ["75 \u2013 100", "Critical",
         "Fatigue score is in the upper range of the model. Produced by extended wakefulness "
         "combined with deep circadian trough and compounding sleep debt. Schedule review "
         "is indicated."],
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
        ('GRID', (0, 0), (-1, -1), 0.5, SLATE_200),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(t)
    story.append(Paragraph("<i>Table 2: Risk classification framework with calibrated thresholds.</i>", style_caption))
    story.append(Spacer(1, 8))

    story.append(Paragraph("In addition to score-based classification, the engine flags:", style_body))
    story.append(bullet("Fatigue Score exceeding High or Critical threshold during a shift"))
    story.append(bullet("Night shift exposure during circadian trough (03:00\u201305:00)"))
    story.append(bullet("Predicted sleep opportunity less than 6 hours between shifts"))
    story.append(bullet("Sleep debt accumulation across consecutive shifts"))

    # ═══════════════════════════════════════
    # 10. CALIBRATION NOTES
    # ═══════════════════════════════════════
    story.append(Paragraph("10. Calibration Notes", style_h1))
    story.append(Paragraph(
        "The Three-Process Model as published provides theoretical parameter values derived from "
        "laboratory studies. These parameters govern the physiological processes (Sections 3\u20135) and "
        "remain unchanged in the Rotation Analytics implementation. The calibration documented below "
        "addresses two separate concerns: (1) the applicability of one model component to scheduled "
        "rotations, and (2) the alignment of risk classification thresholds with the score "
        "distributions produced by real-world schedules.",
        style_body
    ))

    story.append(Paragraph("10.1  Sleep Inertia (Process W): Excluded", style_h2))
    story.append(Paragraph(
        "The published model includes a sleep inertia component (Process W) that reduces modelled "
        "alertness for 20\u201360 minutes after waking. This process is relevant in on-call and emergency "
        "response environments where personnel are woken mid-sleep and must perform immediately.",
        style_body
    ))
    story.append(Paragraph(
        "Rotation Analytics analyses scheduled rotations, not on-call or interrupt-driven "
        "schedules. In a scheduled rotation, workers wake before their shift and have time to "
        "clear sleep inertia before reporting. Including Process W would reduce modelled alertness "
        "at the start of every shift for a transient physiological state that has resolved by the "
        "time the worker is on duty. This does not reflect the scheduling context the model is "
        "applied to.",
        style_body
    ))
    story.append(Paragraph(
        "Accordingly, W\u2080 is set to 0 in the current implementation. The published equations and "
        "parameters are preserved in Section 3.3 and the Mathematical Appendix. If on-call or "
        "emergency response schedules are analysed in the future, Process W can be activated with "
        "published parameters without modifying the underlying model.",
        style_body
    ))

    story.append(Paragraph("10.2  Risk Classification Thresholds: Adjusted", style_h2))
    story.append(Paragraph(
        "The published literature does not prescribe specific risk classification thresholds for "
        "the Three-Process Model's composite output. The thresholds commonly cited in earlier "
        "implementations (approximately 0\u201329 / 30\u201349 / 50\u201369 / 70\u2013100) were derived from "
        "laboratory alertness data and do not account for the score distributions that the model "
        "produces when applied to real-world multi-day rotation schedules.",
        style_body
    ))
    story.append(Paragraph(
        "When these lower thresholds were applied to actual healthcare rotation schedules, the "
        "majority of standard shifts classified as Moderate or High. This included schedule patterns "
        "that are well-established across multiple healthcare employers. The thresholds were not "
        "discriminating between schedule segments that differ meaningfully in fatigue exposure.",
        style_body
    ))
    story.append(Paragraph(
        "The classification thresholds were adjusted to align with the score distributions "
        "observed across a reference set of real rotation schedules:",
        style_body
    ))
    story.append(bullet(
        "<b>Low (0\u201344):</b> Encompasses the score range produced by standard day shifts with "
        "adequate prior rest"
    ))
    story.append(bullet(
        "<b>Moderate (45\u201359):</b> Captures the elevation observed during evening shifts and "
        "consecutive day shifts with mildly shortened rest"
    ))
    story.append(bullet(
        "<b>High (60\u201374):</b> Corresponds to the compounding effects observed during night "
        "shift blocks with circadian trough exposure"
    ))
    story.append(bullet(
        "<b>Critical (75\u2013100):</b> Reserved for the upper score range, produced only by "
        "extended wakefulness combined with deep circadian trough and compounding sleep debt"
    ))
    story.append(Paragraph(
        "These adjusted thresholds produce classifications where each risk level corresponds to a "
        "distinct scheduling pattern. The model equations and physiological parameters are unchanged; "
        "only the interpretive boundaries applied to the composite score were adjusted.",
        style_body
    ))

    # ═══════════════════════════════════════
    # 11. MODEL ASSUMPTIONS AND LIMITATIONS
    # ═══════════════════════════════════════
    story.append(Paragraph("11. Model Assumptions and Limitations", style_h1))

    story.append(Paragraph("11.1  Intended Use", style_h2))
    story.append(Paragraph(
        "The fatigue analysis is a <b>schedule-level decision-support tool</b>. It is intended to "
        "identify where a rotation creates conditions associated with elevated fatigue exposure, "
        "enabling informed discussion about schedule design. It is not a diagnostic instrument, a "
        "compliance determination, a safety certification, or a substitute for clinical assessment "
        "of individual workers.",
        style_body
    ))

    story.append(Paragraph("11.2  What the Model Can Do", style_h2))
    story.append(bullet("Estimate fatigue levels for a representative worker based on a given schedule"))
    story.append(bullet("Identify shifts and time windows associated with elevated physiological fatigue exposure"))
    story.append(bullet("Compare the fatigue profiles of different scheduling options on a consistent basis"))
    story.append(bullet("Detect cumulative fatigue accumulation across a rotation that point-in-time rules cannot identify"))

    story.append(Paragraph("11.3  What the Model Cannot Do", style_h2))
    story.append(bullet("Account for individual differences in sleep need, chronotype, or health conditions"))
    story.append(bullet("Measure actual fatigue in a specific worker; it estimates fatigue from schedule inputs only"))
    story.append(bullet("Replace clinical or occupational health assessment for a specific individual"))
    story.append(bullet("Guarantee that a low-risk schedule will produce no fatigue-related incidents"))

    story.append(Paragraph("11.4  Key Assumptions", style_h2))
    story.append(bullet(
        "<b>Representative worker.</b> The model represents a healthy working-age adult with no "
        "pre-existing sleep disorders. Individual variation requires individual data (actigraphy, "
        "sleep diaries) that is not available in a scheduling context."
    ))
    story.append(bullet(
        "<b>Schedule as provided.</b> The model assumes the worker follows the scheduled shift "
        "pattern as submitted. It does not account for overtime, shift swaps, or absences."
    ))
    story.append(bullet(
        "<b>Relative risk indicators.</b> Fatigue Scores are comparative indicators between "
        "schedule segments and rotation lines. They are not absolute predictions of individual "
        "worker performance or impairment."
    ))
    story.append(bullet(
        "<b>Informational only.</b> The analysis does not constitute medical, safety, or legal "
        "advice. It is provided as decision-support information for scheduling review."
    ))

    # ═══════════════════════════════════════
    # 12. DELIVERABLE FORMAT
    # ═══════════════════════════════════════
    story.append(Paragraph("12. Deliverable Format", style_h1))
    story.append(Paragraph(
        "Fatigue analysis results are delivered alongside compliance findings. The fatigue "
        "deliverable includes:",
        style_body
    ))
    story.append(bullet("<b>Per-line fatigue scores:</b> average, minimum, and maximum scores for each rotation line."))
    story.append(bullet("<b>Risk classification</b> for each line based on average and maximum scores."))
    story.append(bullet(
        "<b>Rotation-wide trend visualisations</b> (sparklines) showing the complete fatigue and "
        "recovery cycle across every day of the rotation \u2014 both worked days and days off."
    ))
    story.append(bullet("All sparklines use the same <b>0\u2013100 vertical scale</b> and are directly comparable across rows."))
    story.append(bullet("<b>Risk flags</b> for night shift circadian trough exposure, shortened sleep opportunity, and sleep debt accumulation."))

    # ═══════════════════════════════════════
    # 13. MATHEMATICAL APPENDIX
    # ═══════════════════════════════════════
    story.append(Paragraph("13. Mathematical Appendix", style_h1))
    story.append(Paragraph(
        "Complete mathematical specification of the model as implemented.",
        style_body
    ))

    story.append(Paragraph("A.  Process S \u2014 Homeostatic Sleep Pressure", style_h3))
    story.append(Paragraph("During wakefulness:", style_body))
    story.append(formula("S(t) = S(t-1) + (1 - S(t-1)) \u00d7 (\u0394t / \u03c4_w)"))
    story.append(Paragraph("During sleep:", style_body))
    story.append(formula("S(t) = S(t-1) - S(t-1) \u00d7 (\u0394t / \u03c4_s)"))
    story.append(param("\u03c4_w = 18 hours    \u03c4_s = 4 hours    \u0394t = 0.25 hours"))

    story.append(Paragraph("B.  Process C \u2014 Circadian Rhythm", style_h3))
    story.append(formula("C(t) = A \u00d7 sin(2\u03c0(t - \u03c6) / 24)"))
    story.append(param("A = 0.5    \u03c6 = 16.8 hours"))

    story.append(Paragraph("C.  The Fatigue Score", style_h3))
    story.append(formula("FatigueScore(t) = (S(t) \u00d7 100) + C(t) + (SleepDebt \u00d7 2)"))
    story.append(formula("FatigueScore(t) = max(0, min(100, FatigueScore(t)))"))

    story.append(Paragraph("D.  Sleep Debt", style_h3))
    story.append(formula("IF PredictedSleep &lt; 6h AND ShiftGap &lt; 16h:"))
    story.append(formula("    SleepDebt += (6 - PredictedSleep)"))
    story.append(formula("IF PredictedSleep >= 7h:"))
    story.append(formula("    SleepDebt = 0"))

    story.append(Paragraph("E.  Sleep Prediction", style_h3))
    story.append(formula("Sleep Onset:  Off-shift AND SleepPressure high AND"))
    story.append(formula("              CircadianPhase in sleep-favourable window"))
    story.append(formula("Sleep End:    SleepPressure cleared sufficiently OR"))
    story.append(formula("              Circadian alerting phase OR"))
    story.append(formula("              Next shift approaching"))

    story.append(Paragraph("F.  Process W \u2014 Sleep Inertia (Zeroed)", style_h3))
    story.append(formula("W(t) = W\u2080 \u00d7 exp(-t / \u03c4_i)"))
    story.append(param("W\u2080 = 0 (zeroed in current implementation)"))
    story.append(param("Published: W\u2080 = 0.3, \u03c4_i = 0.5 hours"))

    # ═══════════════════════════════════════
    # 14. REFERENCES
    # ═══════════════════════════════════════
    story.append(Paragraph("14. References", style_h1))
    for r in [
        "Åkerstedt, T., & Folkard, S. (1987). Validation of the S and C components of the three-process model of alertness regulation. <i>Sleep, 10</i>(1), 1\u201313.",
        "Åkerstedt, T., & Folkard, S. (1997). The three-process model of alertness and its extension to performance, sleep latency, and sleep length. <i>Chronobiology International, 14</i>(2), 115\u2013123.",
        "Folkard, S., & Åkerstedt, T. (2004). Trends in the risk of accidents and injuries and their implications for models of fatigue and performance. <i>Aviation, Space, and Environmental Medicine, 75</i>(3), A161\u2013A167.",
        "Åkerstedt, T., Ingre, M., Kecklund, G., Folkard, S., & Axelsson, J. (2008). Accounting for partial sleep deprivation and cumulative sleepiness in the Three-Process Model of alertness regulation. <i>Chronobiology International, 25</i>(2), 309\u2013319.",
        "Rogers, A. E., Hwang, W. T., Scott, L. D., Aiken, L. H., & Dinges, D. F. (2004). The working hours of hospital staff nurses and patient safety. <i>Health Affairs, 23</i>(4), 202\u2013212.",
        "Patterson, P. D., et al. (2012). Association between poor sleep, fatigue, and safety outcomes in emergency medical services providers. <i>Prehospital Emergency Care, 16</i>(1), 86\u201397.",
        "Dawson, D., & Reid, K. (1997). Fatigue, alcohol and performance impairment. <i>Nature, 388</i>(6639), 235.",
        "Van Dongen, H. P. A., et al. (2003). The cumulative cost of additional wakefulness. <i>Sleep, 26</i>(2), 117\u2013126.",
    ]:
        story.append(Paragraph(r, style_ref))

    # ═══════════════════════════════════════
    # FINAL PAGE
    # ═══════════════════════════════════════
    story.append(PageBreak())
    story.append(Spacer(1, 2.0 * inch))
    if os.path.exists(LOGO_PNG):
        logo2 = Image(LOGO_PNG, width=0.8 * inch, height=0.8 * inch)
        logo2.hAlign = 'CENTER'
        story.append(logo2)
        story.append(Spacer(1, 0.3 * inch))
    story.append(HRFlowable(width="30%", thickness=2, color=NAVY, spaceAfter=20))
    story.append(Paragraph("Rotation Analytics Inc", ParagraphStyle(
        'FinalName', fontName='Helvetica-Bold', fontSize=16, leading=22,
        textColor=NAVY, alignment=TA_CENTER, spaceAfter=4
    )))
    story.append(Paragraph(
        "A division of Visser Ventures Corp.",
        ParagraphStyle('FinalDiv', fontName='Helvetica', fontSize=10, leading=14,
                       textColor=SLATE_400, alignment=TA_CENTER, spaceAfter=20)
    ))
    for line in [
        "PO Box 2234, Crossfield, Alberta, Canada",
        "hello@rotationanalytics.ca  |  (403) 506-3636",
        "rotationanalytics.ca",
    ]:
        story.append(Paragraph(line, style_center))
    story.append(Spacer(1, 30))
    story.append(HRFlowable(width="100%", thickness=0.5, color=SLATE_200, spaceAfter=14))
    story.append(Paragraph(
        "This document is provided for informational purposes. It describes the mathematical "
        "methodology used by Rotation Analytics in its Fatigue Risk Analysis service. This document "
        "does not constitute medical, safety, or legal advice.",
        style_disclaimer
    ))
    story.append(Spacer(1, 6))
    story.append(Paragraph("\u00a9 2026 Rotation Analytics Inc. All rights reserved.", style_disclaimer))

    # Build
    doc = SimpleDocTemplate(
        OUTPUT, pagesize=letter,
        topMargin=0.9 * inch, bottomMargin=0.7 * inch,
        leftMargin=1.0 * inch, rightMargin=1.0 * inch,
        title="Fatigue Risk Analysis: Mathematical Methodology and Validation",
        author="Rotation Analytics Inc",
        subject="Biomathematical Fatigue Model \u2014 Methodology White Paper",
    )
    doc.build(story, onFirstPage=lambda c, d: None, onLaterPages=header_footer)
    print(f"PDF generated: {OUTPUT}")
    print(f"Size: {os.path.getsize(OUTPUT):,} bytes")

if __name__ == "__main__":
    build_document()
