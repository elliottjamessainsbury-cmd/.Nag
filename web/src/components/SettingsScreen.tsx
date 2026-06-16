import { useState } from 'react'
import { NotificationFrequency, UserSettings } from '../types'

const FREQ_OPTIONS: { value: NotificationFrequency; label: string; desc: string }[] = [
  { value: 'twicePerDay',   label: 'Twice a day',    desc: 'Morning and afternoon nudge' },
  { value: 'everyTwoHours', label: 'Every 2 hours',  desc: 'Steady and manageable' },
  { value: 'oncePerHour',   label: 'Once per hour',  desc: 'Persistently annoying' },
  { value: 'twicePerHour',  label: 'Twice per hour', desc: 'Maximum annoyance' },
]

interface Props {
  settings: UserSettings
  onSave: (s: UserSettings) => void
  onBack: () => void
  onPreview: () => void
}

export default function SettingsScreen({ settings, onSave, onBack, onPreview }: Props) {
  const [local, setLocal] = useState<UserSettings>({ ...settings })

  function update<K extends keyof UserSettings>(key: K, val: UserSettings[K]) {
    const next = { ...local, [key]: val }
    setLocal(next)
    onSave(next)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-3 border-b border-gray-100 flex items-center">
        <button onClick={onBack} className="text-red-500 font-medium text-sm w-16">&#8592; Back</button>
        <h2 className="font-bold text-base flex-1 text-center">Settings</h2>
        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Time window */}
        <Section title="Notification window" sub="Nag only nags between these times.">
          <div className="flex gap-3">
            <TimeField
              label="From"
              value={local.notificationStartTime}
              onChange={v => update('notificationStartTime', v)}
            />
            <TimeField
              label="Until"
              value={local.notificationEndTime}
              onChange={v => update('notificationEndTime', v)}
            />
          </div>
        </Section>

        {/* Frequency */}
        <Section title="Frequency">
          <div className="space-y-2">
            {FREQ_OPTIONS.map(opt => (
              <ChoiceRow
                key={opt.value}
                label={opt.label}
                desc={opt.desc}
                selected={local.notificationFrequency === opt.value}
                onSelect={() => update('notificationFrequency', opt.value)}
              />
            ))}
          </div>
        </Section>

        {/* Tone */}
        <Section title="Tone">
          <div className="space-y-2">
            <ChoiceRow
              label="Sassy"
              desc="Cheeky & confrontational. ALL CAPS + alarm when no progress."
              selected={local.notificationTone === 'sassy'}
              onSelect={() => update('notificationTone', 'sassy')}
            />
            <ChoiceRow
              label="Calm"
              desc="Gentle & supportive. Soft language + chime throughout."
              selected={local.notificationTone === 'calm'}
              onSelect={() => update('notificationTone', 'calm')}
            />
          </div>
        </Section>

        {/* Preview */}
        <Section title="Preview" sub="Fire a test notification to hear the sound and see the style.">
          <button
            onClick={onPreview}
            className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl text-sm"
          >
            &#128276; Fire a test notification
          </button>
        </Section>

      </div>
    </div>
  )
}

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-4 space-y-3">
      <div>
        <p className="font-semibold text-sm">{title}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      {children}
    </div>
  )
}

function TimeField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex-1">
      <label className="text-xs text-gray-400 block mb-1">{label}</label>
      <input
        type="time"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-gray-100 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-400"
      />
    </div>
  )
}

function ChoiceRow({ label, desc, selected, onSelect }: {
  label: string; desc: string; selected: boolean; onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors ${
        selected ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-transparent'
      }`}
    >
      <div>
        <p className={`text-sm font-medium ${selected ? 'text-red-700' : 'text-gray-700'}`}>{label}</p>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
      {selected && <span className="text-red-500 text-base">&#10003;</span>}
    </button>
  )
}
