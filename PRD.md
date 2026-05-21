# Nag — Product Requirements Document

**Version:** 0.1 (Draft)  
**Date:** 2026-05-21  
**Status:** In Review

---

## 1. Problem Statement

Small, nagging health issues — dry skin, a stiff shoulder, cracked hands, a recurring ache — rarely feel urgent enough to act on. They sit in the background, mildly irritating, until they either quietly disappear or quietly get worse. The friction of booking a GP appointment, looking up a product, or simply paying attention feels disproportionate to how minor the issue *seems* on any given day.

The result: people defer indefinitely on things that are genuinely fixable.

---

## 2. Solution Overview

**Nag** is a deliberately annoying iOS app that acts like a persistent, slightly rude personal assistant for your minor health issues. You log a small issue once. Nag does the rest — bombarding you with reminders throughout the day until you do something about it.

The core insight: the app weaponises mild social discomfort and humour to overcome the inertia of procrastination. It doesn't diagnose. It doesn't advise. It just refuses to let you forget.

---

## 3. Target Audience

- Adults 18+ (hard gating required — see Guardrails)
- People who are broadly health-aware but poor at following through on minor issues
- Users comfortable with irreverent, conversational app experiences
- Primary market: UK (tone and emergency guidance calibrated accordingly)

---

## 4. Core Features (MVP)

### 4.1 Issue Entry

Users add a health issue by specifying:

- **Body part** (selected via the body map — see 4.2 — or a free-text field)
- **Symptom / description** (short free-text, e.g. "dry, cracked skin", "dull ache when I lift my arm")
- **Status** — the user's self-assessed severity, which maps to a colour:
  - 🔴 Red — actively bothering me / getting worse
  - 🟠 Amber — intermittent / annoying but manageable
  - 🟢 Green — mostly fine, just want to keep an eye on it

Users can add multiple issues. Each issue is tracked independently.

---

### 4.2 Body Map

The home screen displays an outline illustration of a human body (front and back, toggled or side-by-side). Issues are rendered as **heat spots** — glowing, pulsing circles — positioned on the relevant body part.

- Heat spot colour reflects the issue status (red / amber / green)
- Tapping a heat spot opens an **Issue Detail Sheet** (see 4.3)
- The illustration style should be clean and minimal — think medical diagram meets modern app UI, not clinical or scary
- Front/back toggle or split view to cover all body parts

---

### 4.3 Issue Detail Sheet

Tapping a heat spot on the body map opens a bottom sheet or modal showing:

- Body part and symptom description
- Current status (colour + label)
- Date added / days active
- Options:
  - **Edit** — update description or status
  - **Mark as Resolved** — removes the issue and stops notifications for it
  - **Notification settings** — override global settings for this specific issue (stretch goal, post-MVP)

---

### 4.4 Notifications — Frequency

Users choose a global daily notification frequency. Three options:

| Option | Notifications per day |
|--------|----------------------|
| Low    | 10                   |
| Medium | 20                   |
| High   | 30                   |

Notifications are distributed **equally** across the user's active window (see 4.5). If the user has multiple active issues, notifications cycle through them evenly.

---

### 4.5 Notifications — Active Window

Users set:

- **Wake-up time** — earliest time a notification can be sent
- **Sleep time** — latest time a notification can be sent

No notifications are sent outside this window. Notifications are spread at equal intervals within it.

*Example: 10 notifications/day, 7am–10pm (15-hour window) = one notification every 90 minutes.*

---

### 4.6 Notification Tone

Users choose between two tones, applied globally:

#### Sassy (default)
Quirky, cheeky, mildly confrontational. Leans into the "nagging" conceit. Examples:

- *"YOU'RE 40, ELLIOTT. IT'S EMBARRASSING TO PUT OFF A DOCTOR'S VISIT."*
- *"Come on, man. I'm getting bored of you putting this crusty elbow aside."*
- *"Your shoulder didn't fix itself last week either. Just saying."*
- *"Dry hands. Day 47. This is genuinely your fault at this point."*

#### Calm
Supportive, gentle, motivational. Still persistent but without the edge. Examples:

- *"Have you checked in on your elbow today?"*
- *"You'll feel so much better after you get that sore shoulder looked at. Time to call your GP?"*
- *"A small step today could save a bigger problem later. Just a nudge."*

Notification copy should be personalised using the user's entered body part and symptom where possible.

---

## 5. Onboarding

First-launch onboarding should:

1. Explain the app's purpose in one screen — pithy, honest, funny
2. Present the **guardrails disclaimer** prominently (see Section 7) with explicit acknowledgement required
3. Confirm the user is 18+
4. Walk through adding their first issue
5. Set notification frequency, active window, and tone
6. Request notification permissions (iOS permission prompt)

---

## 6. Settings

- Notification frequency (10 / 20 / 30 per day)
- Active window (wake-up time / sleep time)
- Notification tone (Sassy / Calm)
- Manage issues (view all, edit, resolve)
- About / Legal (guardrails, privacy policy, terms)

---

## 7. Guardrails & Responsible Use

These are non-negotiable product requirements, not afterthoughts.

### 7.1 Medical Disclaimer
Nag does **not** provide medical advice, diagnoses, or treatment recommendations. It is a reminder tool only. This must be surfaced:
- During onboarding (with explicit acknowledgement)
- In the app's About / Legal section
- In App Store metadata

### 7.2 Age Gate
The app is **18+ only**. Age confirmation must be collected during onboarding. App Store age rating should be set accordingly.

### 7.3 Scope Framing
Nag is explicitly for **small, annoying, fixable issues** — the kind that are easy to defer but not urgent. It is not designed for:
- Serious, acute, or rapidly worsening conditions
- Symptoms that may indicate a medical emergency

This framing should appear during onboarding and in-app copy.

### 7.4 Emergency Signposting
A persistent, clearly accessible prompt should remind users:

> *If you're experiencing a medical emergency, call 999 or go to your nearest A&E immediately. Do not use this app to assess or manage serious symptoms.*

This should appear in onboarding, the Settings screen, and the Issue Entry flow.

---

## 8. Non-Goals (MVP)

- No symptom tracking or health data analytics
- No integration with NHS, GP booking systems, or health APIs
- No AI-generated health advice or triage
- No social / sharing features
- No Android version (iOS first)
- No per-issue notification customisation (post-MVP consideration)
- No backend / account system at launch (local storage only)

---

## 9. Success Metrics

| Metric | Target (90 days post-launch) |
|--------|------------------------------|
| Downloads | TBD |
| Day-7 retention | > 40% |
| Issues marked as Resolved | > 30% of issues added |
| Avg notifications enabled per user | > 10/day |
| App Store rating | ≥ 4.2 ★ |
| Support tickets related to medical advice requests | 0 |

---

## 10. Open Questions

1. **Body map granularity** — how precise should the body part targeting be? (e.g. can users pin to "left knee" vs just "knee"?)
2. **Issue limit** — should we cap the number of active issues to keep the experience focused? (Suggested: 5–7 max)
3. **Notification personalisation** — should sassy copy include the user's name? Requires a name input field in onboarding.
4. **Resolved flow** — when a user marks an issue resolved, do we celebrate it? A small moment of delight could reinforce the loop.
5. **Tone per issue** — post-MVP, should tone be settable per issue rather than globally?
6. **Snooze** — should users be able to snooze an issue for X days (e.g. "I've booked an appointment, stop nagging me until next week")?
7. **Escalation logic** — should amber/red issues generate more frequent notifications than green ones?

---

## 11. Technical Considerations (Initial Thoughts)

- **Platform:** iOS (SwiftUI recommended for modern, clean UI)
- **Notifications:** iOS UserNotifications framework; pre-schedule the day's notifications at wake-up time each morning
- **Storage:** Local (CoreData or SwiftData); no backend required for MVP
- **Body map:** SVG-based illustration with tappable regions; consider open-source anatomical SVGs or custom illustrated asset
- **Notification copy:** Localised string templates with body-part variable substitution; curated bank of messages per tone

---

## 12. Design Principles

- **Deliberately annoying, never distressing** — the tone should make users laugh, not anxious
- **Fast to add an issue** — friction at entry kills the habit; target < 30 seconds from open to first issue added
- **Satisfying to resolve** — closing out an issue should feel genuinely good
- **Honest about what it is** — no dark patterns, no medicalisation, no false authority
