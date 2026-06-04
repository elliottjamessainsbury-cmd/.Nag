export type IssueStatus = 'noActionTaken' | 'inProgress' | 'allFixed'

export interface Issue {
  id: string
  bodyPartId: string
  specificIssue: string
  status: IssueStatus
  dateAdded: string
  snoozeUntil?: string
  resolvedDate?: string
}

export interface UserSettings {
  userName: string
  hasCompletedOnboarding: boolean
  notificationFrequency: 'low' | 'medium' | 'high'
  notificationTone: 'sassy' | 'calm'
  wakeUpTime: string
  sleepTime: string
}
