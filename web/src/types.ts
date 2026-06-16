export type IssueStatus = 'noActionTaken' | 'inProgress' | 'allFixed'

export type NotificationFrequency =
  | 'twicePerDay'
  | 'everyTwoHours'
  | 'oncePerHour'
  | 'twicePerHour'

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
  notificationFrequency: NotificationFrequency
  notificationTone: 'sassy' | 'calm'
  notificationStartTime: string // 'HH:MM'
  notificationEndTime: string   // 'HH:MM'
}
