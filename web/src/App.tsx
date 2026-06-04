import { useState, useEffect } from 'react'
import { Issue, UserSettings } from './types'
import { getIssues, saveIssues, getSettings, saveSettings } from './store'
import PhoneFrame from './components/PhoneFrame'
import OnboardingScreen from './components/OnboardingScreen'
import BodyMapScreen from './components/BodyMapScreen'
import AddIssueScreen from './components/AddIssueScreen'
import IssueDetailScreen from './components/IssueDetailScreen'

type Screen = 'onboarding' | 'bodyMap' | 'addIssue' | 'issueDetail'

export default function App() {
  const [issues, setIssues]   = useState<Issue[]>(() => getIssues())
  const [settings, setSettings] = useState<UserSettings | null>(() => getSettings())
  const [screen, setScreen]   = useState<Screen>(
    () => getSettings()?.hasCompletedOnboarding ? 'bodyMap' : 'onboarding'
  )
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => { saveIssues(issues) }, [issues])
  useEffect(() => { if (settings) saveSettings(settings) }, [settings])

  const selectedIssue = issues.find(i => i.id === selectedId) ?? null

  function completeOnboarding(name: string) {
    const s: UserSettings = {
      userName: name,
      hasCompletedOnboarding: true,
      notificationFrequency: 'medium',
      notificationTone: 'sassy',
      wakeUpTime: '07:00',
      sleepTime: '22:00',
    }
    setSettings(s)
    setScreen('bodyMap')
  }

  return (
    <PhoneFrame>
      {screen === 'onboarding' && (
        <OnboardingScreen onComplete={completeOnboarding} />
      )}
      {screen === 'bodyMap' && (
        <BodyMapScreen
          issues={issues}
          userName={settings?.userName ?? ''}
          onSelectIssue={id => { setSelectedId(id); setScreen('issueDetail') }}
          onAddIssue={() => setScreen('addIssue')}
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
    </PhoneFrame>
  )
}
