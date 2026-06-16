import { useState } from 'react'
import { Issue, IssueStatus } from '../types'
import { getBodyPart } from '../data/bodyParts'

type Side = 'front' | 'back'

const DOT: Record<IssueStatus, string> = {
  noActionTaken: 'bg-red-500',
  inProgress:    'bg-orange-500',
  allFixed:      'bg-green-500',
}
const RING: Record<IssueStatus, string> = {
  noActionTaken: 'bg-red-400',
  inProgress:    'bg-orange-400',
  allFixed:      'bg-green-400',
}
const BADGE: Record<IssueStatus, string> = {
  noActionTaken: 'bg-red-100 text-red-700',
  inProgress:    'bg-orange-100 text-orange-700',
  allFixed:      'bg-green-100 text-green-700',
}
const LABEL: Record<IssueStatus, string> = {
  noActionTaken: 'No action taken',
  inProgress:    'In progress',
  allFixed:      'All fixed!',
}

interface Props {
  issues: Issue[]
  userName: string
  onSelectIssue: (id: string) => void
  onAddIssue: () => void
  onOpenSettings: () => void
  onDemoNotification: () => void
}

export default function BodyMapScreen({
  issues, onSelectIssue, onAddIssue, onOpenSettings, onDemoNotification,
}: Props) {
  const [side, setSide] = useState<Side>('front')
  const activeCount = issues.filter(i => i.status !== 'allFixed').length

  const pinned   = issues.filter(i => { const b = getBodyPart(i.bodyPartId); return b?.isPinnedToBody && b.mapSide === side })
  const unpinned = issues.filter(i => !getBodyPart(i.bodyPartId)?.isPinnedToBody)

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Nav */}
      <div className="flex items-center justify-between px-5 py-3">
        <h1 className="text-3xl font-black">Nag</h1>
        <div className="flex items-center gap-2">
          <button onClick={onDemoNotification}
            title="Preview a notification"
            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-base">
            &#128276;
          </button>
          <button onClick={onOpenSettings}
            title="Settings"
            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-base">
            &#9881;
          </button>
          <button onClick={onAddIssue} disabled={activeCount >= 7}
            className="w-9 h-9 bg-red-500 disabled:bg-gray-200 rounded-full flex items-center justify-center text-white text-2xl leading-none transition-colors">
            +
          </button>
        </div>
      </div>

      {/* Toggle */}
      <div className="px-5 pb-2">
        <div className="flex bg-gray-100 rounded-xl p-1">
          {(['front', 'back'] as Side[]).map(s => (
            <button key={s} onClick={() => setSide(s)}
              className={`flex-1 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                side === s ? 'bg-white shadow text-black' : 'text-gray-400'
              }`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Body + lists */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative mx-auto" style={{ width: 220, height: 360 }}>
          <BodySVG side={side} />
          {pinned.map(issue => {
            const bp = getBodyPart(issue.bodyPartId)
            if (!bp?.position) return null
            return (
              <button key={issue.id}
                onClick={() => onSelectIssue(issue.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${bp.position.x * 100}%`, top: `${bp.position.y * 100}%` }}>
                <span className="relative flex h-5 w-5">
                  {issue.status !== 'allFixed' && (
                    <span className={`animate-ping absolute inset-0 rounded-full ${RING[issue.status]} opacity-60`} />
                  )}
                  <span className={`relative flex h-5 w-5 rounded-full ${DOT[issue.status]} ${
                    issue.status === 'allFixed' ? 'opacity-40' : ''
                  }`} />
                </span>
              </button>
            )
          })}
        </div>

        {issues.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-2">No issues logged yet. Tap + to add one.</p>
        )}

        {unpinned.length > 0 && (
          <div className="px-4 pb-6">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2 px-1">Other areas</p>
            <div className="space-y-2">
              {unpinned.map(issue => {
                const bp = getBodyPart(issue.bodyPartId)
                return (
                  <button key={issue.id} onClick={() => onSelectIssue(issue.id)}
                    className="w-full flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 text-left">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${DOT[issue.status]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{bp?.displayName}</p>
                      <p className="text-gray-400 text-xs truncate">{issue.specificIssue}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${BADGE[issue.status]}`}>
                      {LABEL[issue.status]}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function BodySVG({ side }: { side: Side }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="#bbb" strokeWidth="0.9">
      <ellipse cx="50" cy="5.5" rx="12" ry="5.5" />
      <rect x="45.5" y="10.5" width="9" height="4.5" />
      <rect x="28" y="15" width="44" height="28" rx="4" />
      <rect x="72" y="15" width="10" height="26" rx="3" />
      <rect x="18" y="15" width="10" height="26" rx="3" />
      <ellipse cx="77" cy="46" rx="5" ry="2.5" />
      <ellipse cx="23" cy="46" rx="5" ry="2.5" />
      <rect x="54" y="43" width="17" height="36" rx="4" />
      <rect x="29" y="43" width="17" height="36" rx="4" />
      <ellipse cx="62.5" cy="96" rx="9" ry="2.5" />
      <ellipse cx="37.5" cy="96" rx="9" ry="2.5" />
      {side === 'back' && <line x1="50" y1="15.5" x2="50" y2="43" strokeDasharray="2 2" strokeOpacity="0.4" />}
    </svg>
  )
}
