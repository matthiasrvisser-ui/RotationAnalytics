# Landing Page LEAN Cleanup — Plan

## Guiding Principles
- **Zero wording loss** — every carefully written sentence is preserved verbatim
- Example Rotation + Sample Report stay as strategic selling tools, given their own dedicated section
- "Independent, expert-led analysis of unionized shift rotations, powered by purpose-built compliance tools." stays prominent
- Restructure for conversion flow, not content removal

---

## Current Section Order (10 sections)
1. Hero
2. Credential line
3. Problem Framing
4. Why RA Inc (3 cards + "Only Available Here")
5. Process Overview
6. What You Receive (3 deliverables)
7. Where Rotation Analysis Applies (6 industry tiles)
8. Independence & Confidentiality
9. See It In Action (Example Rotation + Sample Report links)
10. Final CTA

## Proposed Section Order (8 sections)
1. **Hero** — swap primary CTA to "Begin an Engagement", keep "View Sample Report →" as secondary text link
2. **Credential line** — strengthen with concrete trust signal from Kristy's experience
3. **Independence & Confidentiality** — moved UP from §8 to §3 (union reps need this before they read further)
4. **Problem Framing** — unchanged, all wording preserved
5. **Why RA Inc** — unchanged, all wording preserved (3 cards + "Only Available Here")
6. **See It In Action + What You Receive** — MERGED: the "See It In Action" intro text + Example Rotation / Sample Report cards, followed by the 3 deliverable cards. This keeps the selling tools prominent and pairs "what we find" with "what you get"
7. **Process Overview** — unchanged, with a mid-page CTA banner appended: the "no discovery call / single rotation / no commitment" copy + Begin Engagement button
8. **Final CTA** — unchanged

## What Gets Cut
- **"Where Rotation Analysis Applies" (§7)** — the 6 industry tiles. Low conviction, dilutes focus. The rotation definition sentence ("A rotation is a cyclical work plan...") moves into the Problem Framing section as a natural lead-in, so nothing is actually lost.

## Specific Changes

### 1. Hero (page.tsx lines 32-37)
- Primary CTA: `Begin an Engagement` → `/engage`
- Secondary CTA: `View Sample Report` → `/sample-report` (text link with arrow)
- Subheadline: split into two lines for readability:
  - Line 1: "We reveal them before they become costly problems."
  - Line 2: "Independent, expert-led analysis of unionized shift rotations, powered by purpose-built compliance tools."
  (Both sentences preserved exactly — just rendered as separate `<p>` tags or with a line break for visual breathing room)

### 2. Credential Line (page.tsx lines 40-47)
- Replace generic "a rotation specialist" with a concrete trust signal:
  - "Led by a rotation specialist who has built, validated, and audited thousands of rotation schedules across healthcare — from frontline scheduling to advising enterprise workforce platforms on compliance tool construction."
  - Keeps "Meet the team →" link
  - This is truthful to Kristy's experience without naming her (the About page does that)

### 3. Independence Section — Move Up
- Move `<IndependenceSection />` from after §7 to after the credential line
- No changes to the component itself — all wording preserved

### 4. Problem Framing — No Changes
- All wording preserved exactly as-is

### 5. Why RA Inc — No Changes
- All wording preserved exactly as-is (3 cards + "Only Available Here" callout)

### 6. Merged "See It In Action" + "What You Receive"
- Keep the "See It In Action" eyebrow, heading ("From rotation to documented findings."), and description paragraph — all exact wording preserved
- Keep both Example Rotation and Sample Report cards with all their descriptions — exact wording preserved
- Below the two cards, add a subtle divider, then the "What You Receive" content (eyebrow, heading, description, 3 deliverable cards) — all exact wording preserved
- This creates a natural flow: "here's what we find" → "here's what you receive"

### 7. Process Overview + Mid-Page CTA
- Process section unchanged (title, subtitle, ProcessOverview component, "View the full engagement pathway" link — all preserved)
- Append a compact CTA banner below the process steps:
  - Uses the Final CTA's supporting copy: "No discovery call required. Start with a single rotation, no ongoing commitment."
  - "Begin an Engagement" button + "See the Full Process →" link
  - Styled as a light bg-brand-cream rounded card, not a full-width navy section (saves the navy for the final CTA)

### 8. Final CTA — No Changes
- "Ready when you are." heading, all copy, both buttons — preserved exactly

## Files Modified
- `app/page.tsx` — section reorder + credential line update + merged section + mid-page CTA
- No component files changed (Hero, IndependenceSection, ProcessOverview, Section all stay as-is)

## What This Achieves
- Page goes from 10 → 8 sections (tighter)
- Independence moves from position 8 to position 3 (trust established early)
- "Begin an Engagement" appears 4 times: Hero, mid-page CTA, nav, final CTA
- Example Rotation + Sample Report get a dedicated strategic section (not just Hero links)
- Every single sentence of existing copy is preserved
- Credential line now carries real weight from Kristy's actual experience
