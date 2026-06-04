import { useState } from 'react'

type Step = 'welcome' | 'disclaimer' | 'name'

export default function OnboardingScreen({ onComplete }: { onComplete: (name: string) => void }) {
  const [step, setStep]   = useState<Step>('welcome')
  const [agreed, setAgreed] = useState(false)
  const [aged, setAged]   = useState(false)
  const [name, setName]   = useState('')

  if (step === 'welcome') return (
    <div className="flex flex-col h-full px-8">
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="text-8xl">&#128276;</div>
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-black">Meet Nag.</h1>
          <p className="text-gray-500 text-lg leading-snug">
            The app that refuses to let you ignore that thing you've been putting off.
          </p>
          <p className="text-gray-400 text-sm">
            Your elbow. Your shoulder. Your back.<br />
            Nag will not shut up until you do something about it.
          </p>
        </div>
      </div>
      <button onClick={() => setStep('disclaimer')}
        className="w-full bg-red-500 text-white font-semibold py-4 rounded-2xl text-lg mb-10">
        Let's go
      </button>
    </div>
  )

  if (step === 'disclaimer') return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        <div>
          <h2 className="text-3xl font-black">Before we start.</h2>
          <p className="text-gray-400 text-sm mt-1">A few things you need to know.</p>
        </div>
        {[
          { icon: '&#x1FA7A;', title: 'Not medical advice', body: 'Nag is a reminder tool only. It does not diagnose, advise on, or treat any condition.', bg: 'bg-red-50' },
          { icon: '&#9888;&#65039;', title: 'Minor issues only', body: 'This app is for small, annoying, fixable things — not for serious or rapidly worsening symptoms.', bg: 'bg-orange-50' },
          { icon: '&#128222;', title: 'Emergency?', body: 'Call 999 or go to A&E immediately. Do not use Nag to assess a medical emergency.', bg: 'bg-green-50' },
        ].map(c => (
          <div key={c.title} className={`${c.bg} rounded-2xl p-4 flex gap-3`}>
            <span className="text-2xl" dangerouslySetInnerHTML={{ __html: c.icon }} />
            <div>
              <p className="font-semibold text-sm">{c.title}</p>
              <p className="text-gray-500 text-xs mt-0.5">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 pb-6 space-y-3 border-t border-gray-100 pt-4">
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
            className="w-5 h-5 accent-red-500" />
          <span className="text-sm font-medium">I understand Nag is not medical advice</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={aged} onChange={e => setAged(e.target.checked)}
            className="w-5 h-5 accent-red-500" />
          <span className="text-sm font-medium">I confirm I am 18 or older</span>
        </label>
        <button onClick={() => setStep('name')} disabled={!agreed || !aged}
          className="w-full bg-red-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-4 rounded-2xl text-sm transition-colors">
          I agree — let's go
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full px-8">
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-black leading-tight">What should<br />we call you?</h2>
          <p className="text-gray-500 text-sm">We'll use your name to make the nagging more personal. And more annoying.</p>
        </div>
        <input type="text" value={name} onChange={e => setName(e.target.value)}
          placeholder="Your name"
          autoFocus
          onKeyDown={e => { if (e.key === 'Enter' && name.trim()) onComplete(name.trim()) }}
          className="w-full text-center text-2xl bg-gray-100 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-red-400" />
      </div>
      <button onClick={() => onComplete(name.trim())} disabled={!name.trim()}
        className="w-full bg-red-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-4 rounded-2xl text-lg mb-10 transition-colors">
        Continue
      </button>
    </div>
  )
}
