# Nag — Product Requirements Document

**Version:** 0.3 (Draft)  
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

Users add a health issue by specifying, in order:

1. **Their name** — collected during onboarding (see Section 5), used to personalise notification copy
2. **Body part** — selected from a predefined list (see 4.2); no free-text entry for body part to keep the body map clean and consistent
3. **Specific issue** — short free-text description of the problem (e.g. "dry, cracked skin", "dull ache when I lift my arm")

**Issue cap:** Users can have a maximum of **7 active issues** at a time. Users must resolve or delete an existing issue before adding an eighth.

---

### 4.2 Body Part Selection

Body parts are chosen from a fixed list, organised into groups. This list drives both the issue entry UI and the positioning of heat spots on the body map. Left/right variants are positioned on the **correct corresponding side** of the body illustration.

#### Physical Body Parts
| Group | Options |
|-------|---------|
| Head & neck | Head, Neck |
| Shoulders | Left shoulder, Right shoulder |
| Arms | Left upper arm, Right upper arm, Left lower arm, Right lower arm |
| Wrists & hands | Left wrist, Right wrist, Left fingers, Right fingers |
| Back | Upper back, Lower back |
| Legs | Left upper leg, Right upper leg, Left lower leg, Right lower leg |
| Knees | Left knee, Right knee |
| Feet & toes | Left foot, Right foot, Left toes, Right toes |
| Intimate | Penis, Vagina, Bum |

#### Theme Areas *(displayed beneath the body illustration, not pinned to it)*
Stomach, Gut, Skin issues, Dental, Ears, Nose, Throat, Vision

#### Other
A catch-all that sits beneath the body illustration, for anything not covered above.

---

### 4.3 Body Map

The home screen displays an outline illustration of a human body (front and back, toggled). Issues are rendered as **heat spots** — glowing, pulsing circles — positioned on the relevant body part.

- Heat spot colour reflects issue status (red / amber / green — see 4.4)
- Left/right body parts appear on the anatomically correct side of the illustration
- Theme Area and Other issues are displayed in a list or icon row beneath the illustration
- Tapping a heat spot or Theme Area item opens the **Issue Detail Sheet** (see 4.5)
- **Resolved (green) issues remain on the body map** permanently as trophy spots, rendered at reduced opacity or with a distinct 'completed' style to distinguish them from active issues. There is no option to hide them in MVP — they are a feature, not clutter.

---

### 4.4 Issue Status Model

Status reflects the **action taken**, not clinical severity. Users update status from the Issue Detail Sheet.

| Status | Colour | Label | Default? | Notification behaviour |
|--------|--------|-------|----------|----------------------|
| No action taken | 🔴 Red | "No action taken" | Yes — set automatically on issue creation | Full nagging frequency |
| In progress | 🟠 Amber | "In progress" | — | 50% of base frequency |
| All fixed! | 🟢 Green | "All fixed!" | — | Notifications stop; issue becomes a trophy |

**Escalation:** If a user has multiple active issues, the notification scheduler prioritises red issues over amber ones proportionally.

---

### 4.5 Issue Detail Sheet

Tapping a heat spot or Theme Area item opens a bottom sheet showing:

- Body part and specific issue description
- Current status (colour + label)
- Date added / days active
- **Status update buttons** — "No action taken" / "In progress" / "All fixed!" — tapping updates immediately
- **Snooze** — pauses notifications for this issue for a fixed period. Options: **1 day, 3 days, 1 week**. No custom date option in MVP. A small indicator on the heat spot shows the issue is snoozed.
- **Edit** — update the specific issue description
- **Delete** — remove the issue entirely (confirmation prompt required)

When a user taps **"All fixed!"**, the app triggers a **confetti celebration** — a full-screen burst of confetti — before returning to the body map, where the issue now appears as a green trophy spot.

---

### 4.6 Notifications — Frequency

Users choose a global base daily notification frequency:

| Option | Notifications per day (red issues) | Amber issues |
|--------|------------------------------------|--------------|
| Low    | 10                                 | ~5           |
| Medium | 20                                 | ~10          |
| High   | 30                                 | ~15          |

Notifications are distributed equally across the user's active window (see 4.7).

---

### 4.7 Notifications — Active Window

Users set a **wake-up time** and **sleep time**. No notifications are sent outside this window. Notifications are pre-scheduled at equal intervals each morning when the window opens.

*Example: 20 notifications/day, 7am–10pm (15-hour window) = one notification every 45 minutes.*

---

### 4.8 Notification Tone & Copy

Users choose between two tones, applied globally.

#### Copy structure
All notification templates use simple variable substitution:
- `{name}` — the user's name from onboarding
- `{body_part}` — the body part label from the fixed list (e.g. "left knee", "lower back")

**Minimum copy bank: 30 unique templates per tone.** For V1, body part names are swapped directly into templates (e.g. *"Elliott, have you checked that left knee yet?"*). More contextual, symptom-aware copy is a post-MVP consideration.

#### Sassy (default)
Quirky, cheeky, mildly confrontational. Examples:

- *"{name}, have you sorted that {body_part} yet? No? Thought so."*
- *"Still ignoring that {body_part}, {name}? Bold strategy."*
- *"Day [n]. {body_part}. Still there. Still waiting. Still your fault."*
- *"YOU'RE AN ADULT, {name}. The {body_part} isn't going to fix itself."*

#### Calm
Supportive, gentle, motivational. Examples:

- *"{name}, have you checked in on your {body_part} today?"*
- *"A small step on that {body_part} today could save a bigger problem later."*
- *"You'll feel so much better once you've dealt with that {body_part}. Just a nudge."*

---

## 5. Onboarding

1. **Welcome screen** — pithy, honest, funny one-liner about what Nag is
2. **Guardrails disclaimer** — must be explicitly acknowledged (see Section 7)
3. **Age confirmation** — "I confirm I am 18 or older"
4. **Name entry** — "What should we call you?" (used in all notification copy)
5. **Add first issue** — guided: body part selection → specific issue description
6. **Notification setup** — frequency (10 / 20 / 30), active window, tone (Sassy / Calm)
7. **iOS notification permission prompt**

---

## 6. Settings

- **Name** — edit the name used in notifications
- **Notification frequency** (10 / 20 / 30 per day)
- **Active window** (wake-up time / sleep time)
- **Notification tone** (Sassy / Calm)
- **Manage issues** — view all active and resolved issues; edit, snooze, or delete
- **About / Legal** — guardrails, privacy policy, terms
- **Emergency reminder** — always-accessible link to emergency signposting copy

---

## 7. Guardrails & Responsible Use

### 7.1 Medical Disclaimer
Nag does **not** provide medical advice, diagnoses, or treatment recommendations. Surfaced in onboarding (explicit acknowledgement required), About / Legal, and App Store metadata.

### 7.2 Age Gate
**18+ only.** Age confirmation required during onboarding. App Store age rating set accordingly.

### 7.3 Scope Framing
Nag is for **small, annoying, fixable issues** only — not for serious, acute, or rapidly worsening conditions. This framing appears in onboarding and Issue Entry copy.

### 7.4 Emergency Signposting
Surfaced in onboarding, Settings, and Issue Entry:

> *If you're experiencing a medical emergency, call 999 or go to your nearest A&E immediately. Do not use this app to assess or manage serious symptoms.*

---

## 8. Non-Goals (MVP)

- No symptom tracking or health data analytics
- No NHS / GP booking integration
- No AI-generated health advice or triage
- No social / sharing features
- No Android version (iOS first)
- No per-issue notification tone or frequency customisation
- No backend / account system (local storage only)
- No custom snooze duration (fixed options only: 1d / 3d / 1w)
- No option to hide resolved green issues

---

## 9. Success Metrics

| Metric | Target (90 days post-launch) |
|--------|------------------------------|
| Downloads | TBD |
| Day-7 retention | > 40% |
| Issues marked "All fixed!" | > 30% of issues added |
| Avg notifications enabled per user | > 10/day |
| App Store rating | ≥ 4.2 ★ |
| Support tickets re: medical advice | 0 |

---

## 10. Open Questions

1. **Tone per issue** — post-MVP: allow tone to be set per issue rather than globally?

---

## 11. Technical Considerations

- **Platform:** iOS (SwiftUI)
- **Notifications:** iOS `UserNotifications` framework; pre-schedule the full day's notifications at wake-up time each morning; reschedule on status change, snooze, or issue deletion
- **Storage:** Local only (SwiftData); no backend for MVP
- **Body map:** SVG illustration with predefined tappable regions mapped to the body part list; left/right variants positioned on correct sides via separate SVG regions or coordinate mapping
- **Notification scheduler:** Weight by status (red = full, amber = 50%, green = 0%); distribute within active window at equal intervals; cycle through issues proportionally
- **Confetti:** Lightweight particle system (e.g. `SPConfetti` or custom SwiftUI particles)
- **Notification copy:** 30+ template strings per tone with `{name}` and `{body_part}` substitution; grouped by tone, not by body part in V1

---

## 12. Design Principles

- **Deliberately annoying, never distressing** — tone should make users laugh, not anxious
- **Fast to add an issue** — target < 30 seconds from open to first issue logged
- **Satisfying to resolve** — "All fixed!" should feel genuinely rewarding; confetti and the trophy spot are core product, not polish
- **The body map is the home screen** — beautiful, glanceable, tells the user's full health-nag story at a glance
- **Honest about what it is** — no dark patterns, no medicalisation, no false authority
