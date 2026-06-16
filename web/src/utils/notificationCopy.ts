import { IssueStatus } from '../types'

// Uppercase placeholders → get replaced in uppercase context
// lowercase placeholders → sentence-case context
const SASSY_RED = [
  "{NAME}, HAVE YOU SORTED THAT {BODY_PART} YET? NO? THOUGHT SO.",
  "STILL IGNORING THAT {BODY_PART}, {NAME}? BOLD STRATEGY.",
  "DAY {DAYS}. {BODY_PART}. STILL THERE. STILL YOUR FAULT.",
  "{NAME}. {BODY_PART}. GET ON WITH IT.",
  "THE {BODY_PART} DOESN'T CARE HOW BUSY YOU ARE, {NAME}.",
  "YOUR FUTURE SELF IS GOING TO HAVE WORDS WITH YOU ABOUT THAT {BODY_PART}.",
  "NOT TO ALARM YOU, BUT THAT {BODY_PART} HAS BEEN LOGGED FOR {DAYS} DAYS.",
  "YOU'RE AN ADULT, {NAME}. THE {BODY_PART} ISN'T GOING TO FIX ITSELF.",
  "RIGHT. {BODY_PART}. YOU. NOW. LET'S GO.",
  "{NAME}. SERIOUSLY. THE {BODY_PART}. TODAY.",
]

const SASSY_AMBER = [
  "Look at you, {name}. Making progress on that {body_part}. Proud of you. Sort of.",
  "In progress on the {body_part}? Good. Don't stop now, {name}.",
  "You've started on the {body_part}. Genuinely impressed. Now finish it.",
  "The {body_part} situation is improving, {name}. Don't blow it now.",
  "Progress on the {body_part}. Nice. Keep that energy.",
]

const CALM_RED = [
  "{name}, have you checked in on your {body_part} today?",
  "A small step on that {body_part} today could prevent a bigger problem later.",
  "Your {body_part} deserves a little attention today, {name}.",
  "You'll feel so much better once you've dealt with that {body_part}.",
  "Just a gentle nudge about your {body_part}, {name}.",
]

const CALM_AMBER = [
  "You're making great progress on that {body_part}, {name}. Keep it up.",
  "Almost there with the {body_part}. You've got this, {name}.",
  "The {body_part} is getting sorted. Really proud of you, {name}.",
  "One more step and that {body_part} is history. You can do it.",
  "Good things happen to people who take care of their {body_part}, {name}.",
]

export function getNotificationCopy(
  status: IssueStatus,
  tone: 'sassy' | 'calm',
  name: string,
  bodyPartName: string,
  daysActive: number,
): string {
  const pool =
    tone === 'sassy'
      ? status === 'noActionTaken' ? SASSY_RED : SASSY_AMBER
      : status === 'noActionTaken' ? CALM_RED  : CALM_AMBER

  const template = pool[Math.floor(Math.random() * pool.length)]
  const n    = name || 'you'
  const part = bodyPartName.toLowerCase()
  const days = String(daysActive || 1)

  return template
    .replace(/\{NAME\}/g,      n.toUpperCase())
    .replace(/\{name\}/g,      n)
    .replace(/\{BODY_PART\}/g, part.toUpperCase())
    .replace(/\{body_part\}/g, part)
    .replace(/\{DAYS\}/g,      days)
    .replace(/\{days\}/g,      days)
}
