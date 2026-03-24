"""Generate Fatigue Risk Analysis Methodology White Paper PDF.

Aligned to Version 1.1 of the biomathematical fatigue model. Includes
two-speed sleep decay, first-night-in-run enhancement, five risk bands,
calibration benchmarks, and days-in-risk-band analysis.
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
RED_800 = HexColor("#991B1B")
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
    canvas.drawString(72, letter[1] - 40, "Rotation Analytics")
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


# ── Standard table style helper ──
def make_table(data, col_widths, row_colors=None):
    """Build a styled table with NAVY header row."""
    t = Table(data, colWidths=col_widths, repeatRows=1)
    base_style = [
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 1), (-1, -1), SLATE_600),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, SLATE_200),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]
    if row_colors:
        for row_idx, color in row_colors.items():
            base_style.append(('BACKGROUND', (0, row_idx), (-1, row_idx), color))
    t.setStyle(TableStyle(base_style))
    return t


def build_cover(story):
    story.append(Spacer(1, 0.8 * inch))
    if os.path.exists(LOGO_PNG):
        logo = Image(LOGO_PNG, width=1.1 * inch, height=1.1 * inch)
        logo.hAlign = 'LEFT'
        story.append(logo)
        story.append(Spacer(1, 0.5 * inch))
    story.append(HRFlowable(width="40%", thickness=2, color=NAVY, spaceAfter=20))
    story.append(Paragraph("ROTATION ANALYTICS", ParagraphStyle(
        'CoverSub', fontName='Helvetica', fontSize=10, leading=13,
        textColor=SLATE_400, alignment=TA_LEFT, spaceAfter=24, tracking=3
    )))
    story.append(Paragraph(
        "Biomathematical Fatigue Modelling:<br/>Technical White Paper",
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
    story.append(Paragraph("Version 1.1  \u2022  March 2026", meta))
    story.append(Paragraph("Confidential", meta))
    story.append(PageBreak())


def build_toc(story):
    story.append(Paragraph("Table of Contents", style_h1))
    toc_style = ParagraphStyle(
        'TOC', fontName='Helvetica', fontSize=10, leading=18, textColor=SLATE_600, leftIndent=10
    )
    for item in [
        "1.  Introduction",
        "2.  Theoretical Foundation",
        "3.  Model Architecture",
        "4.  Model Parameters",
        "5.  Fatigue Score Calculation",
        "6.  Fatigue Risk Classification",
        "7.  Days-in-Risk-Band Analysis",
        "8.  Model Assumptions and Limitations",
        "9.  Scientific References",
        "10. Document Control",
    ]:
        story.append(Paragraph(item, toc_style))
    story.append(PageBreak())


def build_document():
    story = []
    build_cover(story)
    build_toc(story)

    style_table_cell = ParagraphStyle(
        'TableCell', parent=style_body,
        fontSize=9, leading=13, spaceAfter=0, spaceBefore=0, alignment=TA_LEFT
    )

    # ═══════════════════════════════════════
    # 1. INTRODUCTION
    # ═══════════════════════════════════════
    story.append(Paragraph("1. Introduction", style_h1))
    story.append(Paragraph(
        "Fatigue is a primary contributor to workplace incidents in shift work industries. "
        "Unlike simple hour-counting approaches, biomathematical fatigue modelling predicts "
        "worker alertness by simulating the underlying physiological processes that govern "
        "sleep, wakefulness, and cognitive performance.",
        style_body
    ))
    story.append(Paragraph(
        "This white paper describes the biomathematical model used by Rotation Analytics "
        "to assess fatigue risk across roster and rotation designs. The model is based on "
        "the Three-Process Model (TPM) of alertness regulation, originally developed by "
        "\u00c5kerstedt and Folkard (1987\u20132008) and widely adopted in occupational fatigue "
        "research.",
        style_body
    ))
    story.append(Paragraph(
        "The model produces a Fatigue Score on a 0\u2013100 scale for every day of the rotation "
        "for every rotation line. Scores are classified into five risk levels (Low, Moderate, "
        "High, Very High, and Critical), enabling stakeholders to identify schedule segments "
        "associated with elevated fatigue exposure and make informed decisions about rotation "
        "design.",
        style_body
    ))

    # ═══════════════════════════════════════
    # 2. THEORETICAL FOUNDATION
    # ═══════════════════════════════════════
    story.append(Paragraph("2. Theoretical Foundation", style_h1))
    story.append(Paragraph("2.1  The Three-Process Model", style_h2))
    story.append(Paragraph(
        "The TPM describes alertness as the interaction of three independent physiological "
        "processes:",
        style_body
    ))
    story.append(bullet(
        "<b>Process S \u2014 Homeostatic Sleep Pressure:</b> A drive to sleep that builds "
        "exponentially during wakefulness and dissipates exponentially during sleep. The "
        "longer a person is awake, the stronger the pressure to sleep; the longer they "
        "sleep, the more refreshed they become."
    ))
    story.append(bullet(
        "<b>Process C \u2014 Circadian Rhythm:</b> A ~24-hour biological oscillation governed "
        "by the suprachiasmatic nucleus, which modulates alertness independently of sleep "
        "history. Alertness peaks in the late afternoon (~16:48) and reaches its trough in "
        "the early morning (~04:48)."
    ))
    story.append(bullet(
        "<b>Process W \u2014 Sleep Inertia:</b> A transient reduction in performance immediately "
        "upon waking. This process is omitted from the current model as it is designed for "
        "master schedule analysis rather than short-notice call-in assessment. Sleep inertia "
        "effects are typically confined to the first 30\u201360 minutes after awakening and are "
        "not material to rotation-level fatigue risk assessment."
    ))
    story.append(Paragraph(
        "The model produces a Fatigue Score on a 0\u2013100 scale, where higher values indicate "
        "greater fatigue and degraded cognitive performance.",
        style_body
    ))

    # ═══════════════════════════════════════
    # 3. MODEL ARCHITECTURE
    # ═══════════════════════════════════════
    story.append(Paragraph("3. Model Architecture", style_h1))

    story.append(Paragraph("3.1  Simulation Approach", style_h2))
    story.append(Paragraph(
        "The model operates as a time-stepping simulation with 15-minute resolution "
        "(\u0394t = 0.25 hours). For each rotation line, the model:",
        style_body
    ))
    story.append(bullet("Reads the complete shift schedule from the rotation design"))
    story.append(bullet(
        "Simulates the full rotation cycle twice (the first pass establishes steady-state "
        "conditions; the second pass produces scored results)"
    ))
    story.append(bullet(
        "At each 15-minute step, updates the worker's physiological state based on whether "
        "they are sleeping, awake off-duty, or working"
    ))
    story.append(bullet("Calculates a composite Fatigue Score for each worked shift"))
    story.append(Paragraph(
        "The cyclic warm-up ensures that the model's initial conditions reflect the true "
        "steady-state of the repeating rotation, eliminating transient artefacts from "
        "arbitrary starting values.",
        style_body
    ))

    story.append(Paragraph("3.2  Sleep Prediction", style_h2))
    story.append(Paragraph(
        "Rather than assuming fixed sleep windows, the model simulates sleep onset and "
        "offset using threshold-crossing mechanics:",
        style_body
    ))
    story.append(bullet(
        "Sleep onset occurs when the worker's predicted alertness falls below a threshold "
        "(0.55), indicating sufficient physiological sleep drive"
    ))
    story.append(bullet(
        "Waking occurs when alertness recovers above a higher threshold (0.85), simulating "
        "natural sleep termination"
    ))
    story.append(bullet(
        "A circadian sleep gate between 22:00 and 06:00 lowers the effective onset "
        "threshold by 0.20, reflecting the well-documented facilitation of nighttime sleep"
    ))
    story.append(bullet(
        "Daytime sleep is capped at 5.5 hours per calendar day, consistent with published "
        "research showing that night-shift workers obtain significantly less restorative "
        "sleep when sleeping during biological daytime (\u00c5kerstedt, 2003; Folkard &amp; "
        "Tucker, 2003)"
    ))
    story.append(bullet(
        "An overall cap of 10 hours per sleep opportunity prevents unrealistic extended "
        "sleep episodes"
    ))
    story.append(Paragraph(
        "This approach naturally captures key phenomena observed in shift workers:",
        style_body
    ))
    story.append(bullet("Difficulty sleeping during the day after night shifts"))
    story.append(bullet("Shortened sleep episodes during quick turnarounds"))
    story.append(bullet("Improved sleep quality during nighttime rest periods"))
    story.append(bullet("Progressive sleep restriction across consecutive night shifts"))

    # 3.3 First-Night-in-Run Enhancement
    story.append(Paragraph("3.3  First-Night-in-Run Enhancement", style_h2))
    story.append(Paragraph(
        "The model includes specific handling for the first night shift following a block "
        "of day shifts or days off. Research consistently identifies this transitional shift "
        "as carrying the highest fatigue risk, as workers have typically been awake since "
        "their normal morning wake time and have not adapted their sleep schedule to night "
        "work.",
        style_body
    ))
    story.append(Paragraph(
        "When a night shift is detected as the first in a run (i.e., the previous worked "
        "shift was not a night shift), the model suppresses all sleep from 06:00 until the "
        "shift start time. This reflects the realistic scenario where workers on a daytime "
        "schedule do not nap before their first night. They wake at their usual time and "
        "remain awake through to the shift. For example: a 19:00 shift start would produce "
        "approximately 13 hours of pre-shift wakefulness; a 23:00 start, approximately 17 "
        "hours.",
        style_body
    ))
    story.append(Paragraph(
        "This enhancement ensures that first-night fatigue scores exceed those of subsequent "
        "nights in the same block, consistent with occupational fatigue literature (Folkard "
        "&amp; Tucker, 2003; \u00c5kerstedt, 2003).",
        style_body
    ))

    # ═══════════════════════════════════════
    # 4. MODEL PARAMETERS
    # ═══════════════════════════════════════
    story.append(Paragraph("4. Model Parameters", style_h1))

    # 4.1 Homeostatic Process
    story.append(Paragraph("4.1  Homeostatic Process (S)", style_h2))

    homeo_data = [
        ["Parameter", "Value", "Description"],
        ["\u03c4_W (tauW)", "18.2 hours", "Time constant for S buildup during wakefulness"],
        ["\u03c4_S (tauS)", "4.2 hours", "Time constant for S decay during sleep (initial rapid recovery)"],
        ["\u03c4_S2 (tauS2)", "8.4 hours", "Time constant for S decay during deep sleep (slower secondary recovery)"],
        ["S_lower", "0.17", "Asymptotic lower bound of S (fully rested state)"],
        ["S_brake", "0.35", "Threshold at which sleep recovery transitions from rapid (\u03c4_S) to slow (\u03c4_S2)"],
    ]
    story.append(make_table(homeo_data, [1.5 * inch, 1.0 * inch, 3.9 * inch]))
    story.append(Paragraph("<i>Table 1: Homeostatic process parameters.</i>", style_caption))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "The two-speed decay model reflects real sleep architecture: initial sleep produces "
        "rapid recovery of alertness, while extended sleep yields diminishing returns. The "
        "transition at S_brake approximates the shift from deep slow-wave sleep to lighter "
        "sleep stages.",
        style_body
    ))
    story.append(Paragraph("During wakefulness:", style_body))
    story.append(formula("S(t+dt) = 1 - (1 - S(t)) \u00d7 exp(-dt / \u03c4_W)"))
    story.append(Paragraph("During sleep (S &gt; S_brake):", style_body))
    story.append(formula("S(t+dt) = S_lower + (S(t) - S_lower) \u00d7 exp(-dt / \u03c4_S)"))
    story.append(Paragraph("During sleep (S \u2264 S_brake):", style_body))
    story.append(formula("S(t+dt) = S_lower + (S(t) - S_lower) \u00d7 exp(-dt / \u03c4_S2)"))

    # 4.2 Circadian Process
    story.append(Paragraph("4.2  Circadian Process (C)", style_h2))

    circ_data = [
        ["Parameter", "Value", "Description"],
        ["Amplitude (ampC)", "0.40", "Amplitude of circadian oscillation (published TPM range: 0.4\u20130.5)"],
        ["Acrophase (\u03c6)", "16.8 hours", "Time of peak alertness (~16:48, late afternoon)"],
    ]
    story.append(make_table(circ_data, [1.5 * inch, 1.0 * inch, 3.9 * inch]))
    story.append(Paragraph("<i>Table 2: Circadian process parameters.</i>", style_caption))
    story.append(Spacer(1, 8))

    story.append(Paragraph("The circadian process is modelled as a cosine function:", style_body))
    story.append(formula("C(t) = ampC \u00d7 cos(2\u03c0(t - \u03c6) / 24)"))
    story.append(Paragraph("At amplitude 0.40, the circadian signal produces meaningful physiological effects:", style_body))
    story.append(bullet(
        "<b>Peak alertness (+0.40)</b> at ~16:48. Strongly promotes wakefulness, blocks "
        "daytime sleep in well-rested individuals."
    ))
    story.append(bullet(
        "<b>Trough alertness (\u22120.40)</b> at ~04:48. Strongly promotes sleep onset, "
        "contributes to the well-documented circadian nadir during early-morning hours."
    ))
    story.append(bullet(
        "The amplitude is set within the range validated in published TPM literature "
        "(\u00c5kerstedt et al., 2004; Folkard et al., 2005)."
    ))

    # 4.3 Sleep Prediction Parameters
    story.append(Paragraph("4.3  Sleep Prediction Parameters", style_h2))

    sleep_data = [
        ["Parameter", "Value", "Description"],
        ["Sleep onset threshold", "0.55", "Alertness level below which sleep initiation occurs"],
        ["Wake threshold", "0.85", "Alertness level above which spontaneous waking occurs"],
        ["Sleep gate bonus", "0.20", "Additional threshold allowance during 22:00\u201306:00"],
        ["Daytime sleep cap", "5.5 hours/day", "Maximum daytime (06:00\u201318:00) sleep per calendar day"],
        ["Maximum sleep", "10 hours", "Overall cap per sleep opportunity"],
        ["Required sleep", "8 hours", "Baseline daily sleep need for sleep debt calculation"],
    ]
    story.append(make_table(sleep_data, [1.5 * inch, 1.2 * inch, 3.7 * inch]))
    story.append(Paragraph("<i>Table 3: Sleep prediction parameters.</i>", style_caption))
    story.append(Spacer(1, 8))

    # 4.4 Scoring Parameters
    story.append(Paragraph("4.4  Scoring Parameters", style_h2))

    score_data = [
        ["Parameter", "Value", "Description"],
        ["Circadian weight", "25", "Scaling factor converting raw circadian value to fatigue points"],
        ["Sleep debt rate (k_debt)", "0.5", "Fatigue points added per hour of accumulated sleep debt"],
        ["Debt recovery rate", "0.5", "Rate at which excess sleep reduces accumulated debt (50% efficiency)"],
    ]
    story.append(make_table(score_data, [1.8 * inch, 1.0 * inch, 3.6 * inch]))
    story.append(Paragraph("<i>Table 4: Scoring parameters.</i>", style_caption))
    story.append(Spacer(1, 8))

    # ═══════════════════════════════════════
    # 5. FATIGUE SCORE CALCULATION
    # ═══════════════════════════════════════
    story.append(Paragraph("5. Fatigue Score Calculation", style_h1))
    story.append(Paragraph(
        "For each worked shift, the Fatigue Score is computed from three components:",
        style_body
    ))

    # 5.1 Sleep Pressure Component
    story.append(Paragraph("5.1  Sleep Pressure Component (FatigueBase)", style_h2))
    story.append(Paragraph(
        "The model tracks S continuously through the shift. The peak value of S during "
        "the shift is used as the basis:",
        style_body
    ))
    story.append(formula("FatigueBase = S_peak \u00d7 100"))
    story.append(Paragraph(
        "Using peak S reflects the worst-case fatigue exposure during the shift, which is "
        "the most safety-relevant metric. For a 12-hour shift, this typically occurs at "
        "the end of the shift when cumulative wakefulness is greatest.",
        style_body
    ))

    # 5.2 Circadian Component
    story.append(Paragraph("5.2  Circadian Component (CircadianMod)", style_h2))
    story.append(Paragraph(
        "The average circadian value across all 15-minute steps of the shift is computed:",
        style_body
    ))
    story.append(formula("CircadianMod = -C_avg_shift \u00d7 CircadianWeight"))
    story.append(Paragraph(
        "When the circadian function is negative (nighttime trough), CircadianMod becomes "
        "positive, adding to fatigue. When the circadian function is positive (daytime peak), "
        "CircadianMod becomes negative, reducing fatigue.",
        style_body
    ))
    story.append(Paragraph("Typical circadian contributions by shift window:", style_body))

    circ_contrib = [
        ["Shift Window", "Avg C", "CircadianMod", "Effect"],
        ["Day 07:00\u201319:15", "+0.14", "\u22123.5 pts", "Reduces fatigue"],
        ["Night 19:00\u201307:15", "\u22120.14", "+3.5 pts", "Increases fatigue"],
        ["Day 07:00\u201315:15", "+0.02", "\u22120.5 pts", "Mild reduction"],
        ["Evening 15:00\u201323:15", "+0.26", "\u22126.6 pts", "Moderate reduction"],
        ["Night 23:00\u201307:15", "\u22120.29", "+7.3 pts", "Significant increase"],
    ]
    story.append(make_table(circ_contrib, [1.5 * inch, 0.8 * inch, 1.2 * inch, 2.9 * inch]))
    story.append(Paragraph("<i>Table 5: Circadian modifier by shift window.</i>", style_caption))
    story.append(Spacer(1, 8))

    # 5.3 Sleep Debt Component
    story.append(Paragraph("5.3  Sleep Debt Component (DebtMod)", style_h2))
    story.append(Paragraph(
        "Cumulative sleep debt is tracked across the rotation. When actual sleep falls "
        "short of the 8-hour requirement, the deficit accumulates. When sleep exceeds the "
        "requirement, debt recovers at 50% efficiency (reflecting that recovery sleep is "
        "less efficient than preventive sleep).",
        style_body
    ))
    story.append(formula("DebtMod = SleepDebt_cumulative \u00d7 k_debt"))

    # 5.4 Composite Score
    story.append(Paragraph("5.4  Composite Score", style_h2))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "FatigueScore = FatigueBase + CircadianMod + DebtMod",
        style_formula_center
    ))
    story.append(Paragraph("(bounded to 0\u2013100)", style_center))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Where:", style_body))
    story.append(bullet(
        "<b>FatigueBase</b> = S_peak \u00d7 100, converting the 0\u20131 sleep pressure value to a "
        "0\u2013100 base score"
    ))
    story.append(bullet(
        "<b>CircadianMod</b> = -C_avg_shift \u00d7 25, ranging from approximately \u22127 "
        "(afternoon, favourable) to +7 (early morning, unfavourable)"
    ))
    story.append(bullet(
        "<b>DebtMod</b> adds 0.5 points per hour of accumulated sleep debt"
    ))
    story.append(Paragraph(
        "The composite score is clamped to the 0\u2013100 range. A score of 0 represents minimal "
        "physiological fatigue. A score of 100 represents the upper bound of the model's "
        "fatigue range. All scores represent a <b>representative worker</b>: a healthy "
        "working-age adult with no pre-existing sleep disorders, following the scheduled "
        "shift pattern without overtime or shift swaps.",
        style_body
    ))

    # ═══════════════════════════════════════
    # 6. FATIGUE RISK CLASSIFICATION
    # ═══════════════════════════════════════
    story.append(Paragraph("6. Fatigue Risk Classification", style_h1))
    story.append(Paragraph(
        "Fatigue Scores are mapped to five risk categories. These thresholds have been "
        "calibrated against expected fatigue outcomes for common shift patterns.",
        style_body
    ))
    story.append(Paragraph(
        "<b>Interpretation guidance.</b> Risk classifications describe the modelled "
        "physiological state of a representative worker at a given point in the rotation. "
        "They are not compliance determinations, safety guarantees, or predictions of "
        "individual worker performance. Classifications are intended to support scheduling "
        "review by identifying where the schedule creates conditions associated with "
        "elevated fatigue exposure.",
        style_body
    ))
    story.append(Spacer(1, 6))

    table_data = [
        ["Score Range", "Classification", "Description"],
        ["0 \u2013 44", "Low",
         Paragraph("Worker is operating within optimal physiological parameters for a "
         "standard shift.", style_table_cell)],
        ["45 \u2013 59", "Moderate",
         Paragraph("Slightly elevated fatigue. Typical of evening shifts and consecutive "
         "day shifts with mildly shortened sleep. Performance may be subtly degraded. This "
         "is the expected baseline result for shift workers.", style_table_cell)],
        ["60 \u2013 74", "High",
         Paragraph("Significant fatigue. Typical of night shifts and extended shifts, where "
         "the circadian trough compounds sleep pressure. Meaningful degradation in reaction "
         "time and decision-making expected.", style_table_cell)],
        ["75 \u2013 84", "Very High",
         Paragraph("High fatigue consistent with extended 12-hour night shifts and "
         "consecutive night shift blocks. The circadian trough and cumulative sleep "
         "restriction compound to produce sustained performance impairment.", style_table_cell)],
        ["85 \u2013 100", "Critical",
         Paragraph("Severe fatigue. Occurs with extended wakefulness, deep circadian trough, "
         "and compounding sleep debt. Performance impairment is comparable to levels "
         "documented in occupational health fatigue literature. Immediate schedule review "
         "required.", style_table_cell)],
    ]
    col_widths = [0.9 * inch, 1.1 * inch, 4.4 * inch]
    t = Table(table_data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 1), (-1, -1), SLATE_600),
        ('BACKGROUND', (0, 1), (1, 1), HexColor("#F0FDF4")),  # Low - green
        ('BACKGROUND', (0, 2), (1, 2), HexColor("#FFFBEB")),  # Moderate - amber
        ('BACKGROUND', (0, 3), (1, 3), HexColor("#FEF2F2")),  # High - red light
        ('BACKGROUND', (0, 4), (1, 4), HexColor("#FEE2E2")),  # Very High - red medium
        ('BACKGROUND', (0, 5), (1, 5), HexColor("#FECACA")),  # Critical - red darker
        ('TEXTCOLOR', (1, 1), (1, 1), GREEN_700),
        ('TEXTCOLOR', (1, 2), (1, 2), AMBER_700),
        ('TEXTCOLOR', (1, 3), (1, 3), RED_700),
        ('TEXTCOLOR', (1, 4), (1, 4), RED_800),
        ('TEXTCOLOR', (1, 5), (1, 5), RED_800),
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
    story.append(Paragraph("<i>Table 6: Risk classification framework with calibrated thresholds.</i>", style_caption))
    story.append(Spacer(1, 10))

    # 6.1 Calibration Benchmarks
    story.append(Paragraph("6.1  Calibration Benchmarks", style_h2))
    story.append(Paragraph(
        "The model has been calibrated against expected fatigue outcomes for common "
        "shift patterns:",
        style_body
    ))

    bench_data = [
        ["Shift Pattern", "Typical Score Range", "Risk Band"],
        ["Days off / rest periods", "38\u201342", "Low"],
        ["8-hour day shifts (consecutive)", "50\u201354", "Moderate"],
        ["8-hour evening shifts", "56\u201360", "Moderate"],
        ["12-hour day shifts", "59\u201360", "Moderate\u2013High"],
        ["8-hour night shifts", "70\u201375", "High"],
        ["12-hour night shifts", "80\u201383", "Very High"],
        ["3rd consecutive 12-hour night", "82\u201383", "Very High"],
    ]
    story.append(make_table(bench_data, [2.4 * inch, 1.5 * inch, 2.5 * inch]))
    story.append(Paragraph("<i>Table 7: Calibration benchmarks for common shift patterns.</i>", style_caption))
    story.append(Spacer(1, 8))

    # ═══════════════════════════════════════
    # 7. DAYS-IN-RISK-BAND ANALYSIS
    # ═══════════════════════════════════════
    story.append(Paragraph("7. Days-in-Risk-Band Analysis", style_h1))
    story.append(Paragraph(
        "In addition to average and peak fatigue scores, the model reports the number of "
        "days each worker spends in each risk band across the full rotation cycle. This "
        "metric captures the cumulative exposure profile. Two rotations may have similar "
        "average scores but very different distributions of high-risk days.",
        style_body
    ))
    story.append(Paragraph(
        "This analysis includes all days of the rotation (work days and rest days), "
        "providing a complete picture of the worker's fatigue exposure across the cycle.",
        style_body
    ))

    # ═══════════════════════════════════════
    # 8. MODEL ASSUMPTIONS AND LIMITATIONS
    # ═══════════════════════════════════════
    story.append(Paragraph("8. Model Assumptions and Limitations", style_h1))

    story.append(Paragraph("8.1  Assumptions", style_h2))
    story.append(bullet(
        "<b>Population-level modelling:</b> The model represents a typical healthy "
        "working-age adult. Individual differences in chronotype, age, sleep disorders, "
        "medication use, and lifestyle are not modelled."
    ))
    story.append(bullet(
        "<b>No environmental factors:</b> Workload intensity, noise, lighting, temperature, "
        "and other environmental variables that influence alertness are not incorporated."
    ))
    story.append(bullet(
        "<b>Master schedule analysis:</b> The model evaluates the planned rotation design, "
        "not day-to-day variations such as overtime, shift swaps, call-ins, or unplanned "
        "absences."
    ))
    story.append(bullet(
        "<b>Steady-state assumption:</b> Results represent the repeating cycle once the "
        "worker has adapted to the rotation pattern."
    ))

    story.append(Paragraph("8.2  Limitations", style_h2))
    story.append(bullet(
        "Sleep inertia (Process W) is omitted, as described in Section 2.1. For rotations "
        "involving short-notice callouts or very early starts where workers may be woken "
        "from deep sleep, this component may be material."
    ))
    story.append(bullet(
        "Commute time is not modelled. Workers with long commutes will have reduced sleep "
        "opportunities relative to model predictions."
    ))
    story.append(bullet(
        "Caffeine and other countermeasures are not incorporated. The model represents "
        "unmedicated fatigue."
    ))
    story.append(bullet(
        "Adaptation to night work is not modelled. Some research suggests partial circadian "
        "adaptation after several consecutive night shifts; the model maintains a fixed "
        "circadian rhythm."
    ))

    # ═══════════════════════════════════════
    # 9. SCIENTIFIC REFERENCES
    # ═══════════════════════════════════════
    story.append(Paragraph("9. Scientific References", style_h1))
    for r in [
        "\u00c5kerstedt, T. &amp; Folkard, S. (1997). The three-process model of alertness and its extension to performance, sleep latency, and sleep length. <i>Chronobiology International, 14</i>(2), 115\u2013123.",
        "\u00c5kerstedt, T. (2003). Shift work and disturbed sleep/wakefulness. <i>Occupational Medicine, 53</i>(2), 89\u201394.",
        "\u00c5kerstedt, T., Folkard, S. &amp; Portin, C. (2004). Predictions from the three-process model of alertness. <i>Aviation, Space, and Environmental Medicine, 75</i>(3), A75\u2013A83.",
        "Folkard, S. &amp; Tucker, P. (2003). Shift work, safety and productivity. <i>Occupational Medicine, 53</i>(2), 95\u2013101.",
        "Folkard, S., \u00c5kerstedt, T. &amp; Spencer, M.B. (2005). Towards a model for the prediction of alertness and/or fatigue on different sleep/wake schedules. <i>Human Factors and Ergonomics Society Annual Meeting</i>.",
        "Dawson, D. &amp; Reid, K. (1997). Fatigue, alcohol and performance impairment. <i>Nature, 388</i>, 235.",
        "Van Dongen, H.P.A. &amp; Dinges, D.F. (2005). Sleep, circadian rhythms, and psychomotor vigilance. <i>Clinics in Sports Medicine, 24</i>(2), 237\u2013249.",
        "Sallinen, M. &amp; Kecklund, G. (2010). Shift work, sleep, and sleepiness \u2014 differences between shift schedules and systems. <i>Scandinavian Journal of Work, Environment &amp; Health, 36</i>(2), 121\u2013133.",
    ]:
        story.append(Paragraph(r, style_ref))

    # ═══════════════════════════════════════
    # 10. DOCUMENT CONTROL
    # ═══════════════════════════════════════
    story.append(Paragraph("10. Document Control", style_h1))
    story.append(Paragraph(
        "<b>Version 1.0</b> \u2014 Initial release: Three-Process Model implementation with "
        "calibrated parameters.",
        style_body
    ))
    story.append(Paragraph(
        "<b>Version 1.1</b> \u2014 First-night-in-run enhancement: Added physiological "
        "modelling for transitional night shifts. Workers entering their first night shift "
        "after day shifts or rest days are modelled as awake from 06:00, reflecting the "
        "absence of pre-shift napping when transitioning from a daytime schedule. This "
        "produces appropriately elevated fatigue scores for the highest-risk shift in any "
        "night block.",
        style_body
    ))

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
    story.append(Paragraph("Rotation Analytics", ParagraphStyle(
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
        "methodology used by Rotation Analytics in its Fatigue Risk Analysis service. This "
        "document does not constitute medical, safety, or legal advice.",
        style_disclaimer
    ))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "This model is provided for occupational fatigue risk assessment of rotation designs. "
        "It does not constitute medical advice and should not be used as the sole basis for "
        "safety-critical decisions.",
        style_disclaimer
    ))
    story.append(Spacer(1, 6))
    story.append(Paragraph("\u00a9 2026 Rotation Analytics. All rights reserved.", style_disclaimer))

    # Build
    doc = SimpleDocTemplate(
        OUTPUT, pagesize=letter,
        topMargin=0.9 * inch, bottomMargin=0.7 * inch,
        leftMargin=1.0 * inch, rightMargin=1.0 * inch,
        title="Biomathematical Fatigue Modelling: Technical White Paper",
        author="Rotation Analytics",
        subject="Biomathematical Fatigue Model \u2014 Methodology White Paper",
    )
    doc.build(story, onFirstPage=lambda c, d: None, onLaterPages=header_footer)
    print(f"PDF generated: {OUTPUT}")
    print(f"Size: {os.path.getsize(OUTPUT):,} bytes")

if __name__ == "__main__":
    build_document()
