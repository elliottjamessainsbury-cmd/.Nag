import { useState, useEffect } from 'react'
import { Issue, IssueStatus, UserSettings } from './types'
import { getIssues, saveIssues, getSettings, saveSettings } from './store'
import { getBodyPart } from './data/bodyParts'
import { getNotificationCopy } from './utils/notificationCopy'
import PhoneFrame from './components/PhoneFrame'
import OnboardingScreen from './components/OnboardingScreen'
import BodyMapScreen from './components/BodyMapScreen'
import AddIssueScreen from './components/AddIssueScreen'
import IssueDetailScreen from './components/IssueDetailScreen'
import SettingsScreen from './components/SettingsScreen'
import NotificationToast from './components/NotificationToast'

type Screen = 'onboarding' | 'bodyMap' | 'addIssue' | 'issueDetail' | 'settings'

export default function App() {
  const [issues,   setIssues]   = useState<Issue[]>(() => getIssues())
  const [settings, setSettings] = useState<UserSettings | null>(() => getSettings())
  const [screen,   setScreen]   = useState<Screen>(
    () => getSettings()?.hasCompletedOnboarding ? 'bodyMap' : 'onboarding',
  )
  const [selectedId,  setSelectedId]  = useState<string | null>(null)
  const [toast, setToast] = useState<{ text: string; status: IssueStatus } | null>(null)

  useEffect(() => { saveIssues(issues) },   [issues])
  useEffect(() => { if (settings) saveSettings(settings) }, [settings])

  const selectedIssue = issues.find(i => i.id === selectedId) ?? null

  function completeOnboarding(name: string) {
    const s: UserSettings = {
      userName: name,
      hasCompletedOnboarding: true,
      notificationFrequency: 'oncePerHour',
      notificationTone: 'sassy',
      notificationStartTime: '09:00',
      notificationEndTime: '21:00',
    }
    setSettings(s)
    setScreen('bodyMap')
  }

  function triggerDemo() {
    const tone = settings?.notificationTone ?? 'sassy'
    const name = settings?.userName ?? 'you'

    // Pick the highest-priority active issue, or fall back to a dummy
    const active = issues.filter(i => i.status !== 'allFixed')
    const red    = active.filter(i => i.status === 'noActionTaken')
    const issue  = (red.length ? red : active)[Math.floor(Math.random() * (red.length || active.length))]

    if (!issue) {
      // No issues yet — demo with placeholder
      setToast({
        status: 'noActionTaken',
        text: getNotificationCopy('noActionTaken', tone, name, 'left elbow', 3),
      })
      return
    }

    const bp       = getBodyPart(issue.bodyPartId)
    const days     = Math.floor((Date.now() - new Date(issue.dateAdded).getTime()) / 86_400_000)
    const text     = getNotificationCopy(issue.status, tone, name, bp?.displayName ?? 'that thing', days)
    setToast({ text, status: issue.status })
  }

  return (
    <PhoneFrame>
      {/* Notification toast — floats above everything */}
      {toast && (
        <NotificationToast
          text={toast.text}
          status={toast.status}
          onDismiss={() => setToast(null)}
        />
      )}

      {screen === 'onboarding' && <OnboardingScreen onComplete={completeOnboarding} />}

      {screen === 'bodyMap' && (
        <BodyMapScreen
          issues={issues}
          userName={settings?.userName ?? ''}
          onSelectIssue={id => { setSelectedId(id); setScreen('issueDetail') }}
          onAddIssue={() => setScreen('addIssue')}
          onOpenSettings={() => setScreen('settings')}
          onDemoNotification={triggerDemo}
        />
      )}

      {screen === 'addIssue' && (
        <AddIssueScreen
          activeIssueCount={issues.filter(i => i.status !== 'allFixed').length}
          onAdd={issue => { setIssues(prev => [...prev, issue]); setScreen('bodyMap') }}
          onCancel={() => setScreen('bodyMap')}
        />
      )}

      {screen === 'issueDetail' && selectedIssue && (
        <IssueDetailScreen
          issue={selectedIssue}
          onUpdate={updated => setIssues(prev => prev.map(i => i.id === updated.id ? updated : i))}
          onDelete={id => { setIssues(prev => prev.filter(i => i.id !== id)); setScreen('bodyMap') }}
          onClose={() => setScreen('bodyMap')}
        />
      )}

      {screen === 'settings' && settings && (
        <SettingsScreen
          settings={settings}
          onSave={setSettings}
          onBack={() => setScreen('bodyMap')}
          onPreview={() => { setScreen('bodyMap'); setTimeout(triggerDemo, 100) }}
        />
      )}
    </PhoneFrame>
  )
}
