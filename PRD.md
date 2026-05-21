# Nag — Product Requirements Document

**Version:** 0.2 (Draft)  
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

**Issue cap:** Users can have a maximum of **7 active issues** at a time. This keeps the experience focused and the body map readable. Users must resolve or delete an existing issue before adding an eighth.

---

### 4.2 Body Part Selection

Body parts are chosen from a fixed list, organised into groups. This list drives both the issue entry UI and the positioning of heat spots on the body map.

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

#### Theme Areas *(not pinned to the body illustration; shown as a separate row or list)*
Stomach, Gut, Skin issues, Dental, Ears, Nose, Throat, Vision

#### Other
A catch-all option that sits beneath the body illustration on the body map, for anything that doesn't fit the above.

---

### 4.3 Body Map

The home screen displays an outline illustration of a human body (front and back view, toggled). Issues are rendered as **heat spots** — glowing, pulsing circles — positioned on the relevant body part.

- Heat spot colour reflects issue status (red / amber / green — see 4.4)
- Theme Area and Other issues are displayed in a small list or icon row beneath the body illustration
- Tapping a heat spot (or a Theme Area item) opens the **Issue Detail Sheet** (see 4.5)
- Illustration style: clean, minimal — medical diagram meets modern app UI; not clinical or scary
- **Resolved (green) issues remain on the body map** as a visual record of what the user has fixed; they appear at reduced opacity or with a distinct 'completed' style to distinguish them from active issues

---

### 4.4 Issue Status Model

Status is set by the user and reflects the **action they've taken**, not the clinical severity. Users update their status from the Issue Detail Sheet.

| Status | Colour | Label | Meaning | Notification behaviour |
|--------|--------|-------|---------|----------------------|
| No action taken | 🔴 Red | "No action taken" | Default state when an issue is first added | Full nagging frequency |
| In progress | 🟠 Amber | "In progress" | User has taken a step (booked appointment, bought a product, etc.) | Reduced frequency (50% of base) |
| All fixed! | 🟢 Green | "All fixed!" | Issue resolved | Notifications stop; issue becomes a trophy on the body map |

**Escalation rule:** Notifications are weighted by status. Red issues are nagged at the full configured frequency. Amber issues receive approximately half as many reminders. Green issues receive none. If a user has a mix of red and amber issues, the notification scheduler prioritises red ones.

---

### 4.5 Issue Detail Sheet

Tapping a heat spot or Theme Area item opens a bottom sheet showing:

- Body part and specific issue description
- Current status (colour + label)
- Date added / days active
- **Status update buttons** — "No action taken" / "In progress" / "All fixed!" — tapping one updates the status immediately
- **Snooze** — pause notifications for this specific issue for a user-selected period (1 day, 3 days, 1 week). A small label on the heat spot indicates a snoozed issue. Useful when the user has booked an appointment and doesn't want to be nagged in the meantime.
- **Edit** — update the specific issue description
- **Delete** — remove the issue entirely (with confirmation prompt)

When a user taps **"All fixed!"**, the app triggers a **confetti celebration** — a full-screen burst of confetti — before returning them to the body map, where the issue now appears as a green trophy spot.

---

### 4.6 Notifications — Frequency

Users choose a global base daily notification frequency:

| Option | Notifications per day (red issues) |
|--------|-----------------------------------|
| Low    | 10                                |
| Medium | 20                                |
| High   | 30                                |

Amber issues receive ~50% of the above. Notifications are distributed equally across the user's active window (see 4.7). If the user has multiple active issues, the scheduler cycles through them proportionally by status weight.

---

### 4.7 Notifications — Active Window

Users set:

- **Wake-up time** — earliest time a notification can be sent
- **Sleep time** — latest time a notification can be sent

No notifications are sent outside this window. Notifications are pre-scheduled at equal intervals each morning when the window opens.

*Example: 20 notifications/day, 7am–10pm (15-hour window) = one notification every 45 minutes.*

---

### 4.8 Notification Tone

Users choose between two tones, applied globally:

#### Sassy (default)
Quirky, cheeky, mildly confrontational. Personalised with the user's name where it lands naturally. Examples:

- *"YOU'RE 40, ELLIOTT. It's embarrassing to still be putting off a doctor's visit."*
- *"Come on, [name]. I'm getting bored of you ignoring that crusty elbow."*
- *"Your shoulder didn't fix itself last week either. Just saying."*
- *"Dry hands. Day 47. This is genuinely your fault at this point, [name]."*

#### Calm
Supportive, gentle, motivational. Still persistent but without the edge. Examples:

- *"Have you checked in on your elbow today, [name]?"*
- *"You'll feel so much better after you get that sore shoulder looked at. Time to call your GP?"*
- *"A small step today could save a bigger problem later. Just a nudge."*

Notification copy uses the user's name and the specific body part / issue where possible.

---

## 5. Onboarding

First-launch onboarding collects everything needed to personalise and configure the experience:

1. **Welcome screen** — pithy, honest, funny one-liner about what Nag is
2. **Guardrails disclaimer** — prominent, must be explicitly acknowledged (see Section 7)
3. **Age confirmation** — "I confirm I am 18 or older"
4. **Name entry** — "What should we call you?" (used in notification copy)
5. **Add first issue** — guided flow through body part selection → specific issue description → initial status
6. **Notification setup** — frequency (10 / 20 / 30), active window (wake / sleep times), tone (Sassy / Calm)
7. **iOS notification permission prompt**

---

## 6. Settings

- **Name** — edit the name used in notifications
- **Notification frequency** (10 / 20 / 30 per day)
- **Active window** (wake-up time / sleep time)
- **Notification tone** (Sassy / Calm)
- **Manage issues** — view all active and resolved issues, edit, snooze, or delete
- **About / Legal** — guardrails, privacy policy, terms
- **Emergency reminder** — persistent link to Section 7.4 copy

---

## 7. Guardrails & Responsible Use

These are non-negotiable product requirements, not afterthoughts.

### 7.1 Medical Disclaimer
Nag does **not** provide medical advice, diagnoses, or treatment recommendations. It is a reminder tool only. This must be surfaced:
- During onboarding (with explicit acknowledgement)
- In the app's About / Legal section
- In App Store metadata

### 7.2 Age Gate
The app is **18+ only**. Age confirmation is required during onboarding. App Store age rating set accordingly.

### 7.3 Scope Framing
Nag is explicitly for **small, annoying, fixable issues** — the kind that are easy to defer but not urgent. It is not designed for serious, acute, or rapidly worsening conditions. This framing must appear during onboarding and in Issue Entry copy.

### 7.4 Emergency Signposting
Surfaced in onboarding, Settings, and the Issue Entry flow:

> *If you're experiencing a medical emergency, call 999 or go to your nearest A&E immediately. Do not use this app to assess or manage serious symptoms.*

---

## 8. Non-Goals (MVP)

- No symptom tracking or health data analytics
- No integration with NHS, GP booking systems, or health APIs
- No AI-generated health advice or triage
- No social / sharing features
- No Android version (iOS first)
- No per-issue notification tone or frequency customisation (post-MVP)
- No backend / account system at launch (local storage only)

---

## 9. Success Metrics

| Metric | Target (90 days post-launch) |
|--------|------------------------------|
| Downloads | TBD |
| Day-7 retention | > 40% |
| Issues marked as "All fixed!" | > 30% of issues added |
| Avg notifications enabled per user | > 10/day |
| App Store rating | ≥ 4.2 ★ |
| Support tickets related to medical advice requests | 0 |

---

## 10. Open Questions

1. **Snooze duration options** — 1 day / 3 days / 1 week feels right; should there be a custom option ("until a specific date")?
2. **Tone per issue** — post-MVP, allow tone to be set per issue rather than globally?
3. **Left/right body parts** — should the body map distinguish left vs right visually (i.e. heat spot appears on the correct side of the illustration)?
4. **Resolved issue visibility** — should the user be able to hide their resolved (green trophy) issues, or is the permanent record always shown?
5. **Notification copy bank size** — how many unique message templates are needed before repetition becomes annoying? Suggested minimum: 30 per body-part category per tone.

---

## 11. Technical Considerations

- **Platform:** iOS (SwiftUI)
- **Notifications:** iOS `UserNotifications` framework; pre-schedule the full day's notifications each morning at wake-up time; reschedule on status change or snooze
- **Storage:** Local only (SwiftData); no backend required for MVP
- **Body map:** SVG-based illustration with predefined tappable regions mapped to the body part list; left/right variants handled by mirroring or separate SVG layers
- **Notification scheduler:** Weight notifications by issue status (red = full, amber = 50%, green = 0%); distribute within active window at equal intervals
- **Confetti:** Implement with a lightweight particle system (e.g. `SPConfetti` or a custom SwiftUI particle view)
- **Notification copy:** Template strings with `{name}` and `{body_part}` placeholders; curated bank of messages per tone per body-part group

---

## 12. Design Principles

- **Deliberately annoying, never distressing** — the tone should make users laugh, not anxious
- **Fast to add an issue** — target < 30 seconds from open to first issue logged
- **Satisfying to resolve** — "All fixed!" should feel genuinely rewarding; the confetti and the trophy spot are part of the product, not polish
- **Honest about what it is** — no dark patterns, no medicalisation, no false authority
- **The body map is the home screen** — it should be beautiful, glanceable, and tell the user's full health-nag story at a glance
