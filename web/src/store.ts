import { Issue, UserSettings } from './types'

const ISSUES_KEY = 'nag_issues'
const SETTINGS_KEY = 'nag_settings'

export function getIssues(): Issue[] {
  try { return JSON.parse(localStorage.getItem(ISSUES_KEY) || '[]') }
  catch { return [] }
}

export function saveIssues(issues: Issue[]): void {
  localStorage.setItem(ISSUES_KEY, JSON.stringify(issues))
}

export function getSettings(): UserSettings | null {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function saveSettings(s: UserSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
}
