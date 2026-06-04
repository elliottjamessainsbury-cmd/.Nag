import { useMemo, useState } from 'react'
import { Issue, IssueStatus } from '../types'
import { getBodyPart } from '../data/bodyParts'

interface Props {
  issue: Issue
  onUpdate: (issue: Issue) => void
  onDelete: (id: string) => void
  onClose: () => void
}

const STATUS_OPTS: { value: IssueStatus; label: string; dot: string; bg: string; text: string }[] = [
  { value: 'noActionTaken', label: 'No action taken', dot: 'bg-red-500',    bg: 'bg-red-50 border-red-200',    text: 'text-red-700' },
  { value: 'inProgress',    label: 'In progress',     dot: 'bg-orange-500', bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700' },
  { value: 'allFixed',      label: 'All fixed!',      dot: 'bg-green-500',  bg: 'bg-green-50 border-green-200',  text: 'text-green-700' },
]

const CONFETTI_PIECES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  color: ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#a855f7'][i % 6],
  left: `${(i * 3.7 + 1) % 100}%`,
  width: `${6 + (i % 4) * 2}px`,
  height: `${6 + (i % 3) * 2}px`,
  duration: `${1.4 + (i % 5) * 0.15}s`,
  delay: `${(i % 7) * 0.07}s`,
}))

export default function IssueDetailScreen({ issue, onUpdate, onDelete, onClose }: Props) {
  const [showSnooze,  setShowSnooze]  = useState(false)
  const [showDelete,  setShowDelete]  = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const bp = getBodyPart(issue.bodyPartId)
  const daysActive = Math.floor((Date.now() - new Date(issue.dateAdded).getTime()) / 86_400_000)
  const isSnoozed  = !!issue.snoozeUntil && new Date(issue.snoozeUntil) > new Date()

  function updateStatus(status: IssueStatus) {
    onUpdate({
      ...issue, status,
      resolvedDate: status === 'allFixed' ? new Date().toISOString() : issue.resolvedDate,
      snoozeUntil:  status === 'allFixed' ? undefined : issue.snoozeUntil,
    })
    if (status === 'allFixed') {
      setShowConfetti(true)
      setTimeout(() => { setShowConfetti(false); onClose() }, 2200)
    }
  }

  function snooze(days: number) {
    onUpdate({ ...issue, snoozeUntil: new Date(Date.now() + days * 86_400_000).toISOString() })
    setShowSnooze(false)
  }

  const dot = STATUS_OPTS.find(o => o.value === issue.status)!.dot

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {showConfetti && <ConfettiOverlay />}

      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100 flex items-start justify-between">
        <div className="flex items-start gap-2.5 flex-1">
          <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${dot}`} />
          <div>
            <h2 className="font-bold text-lg leading-tight">{bp?.displayName}</h2>
            <p className="text-gray-400 text-sm">{issue.specificIssue}</p>
            <div className="flex gap-3 mt-1">
              <span className="text-xs text-gray-400">
                {daysActive === 0 ? 'Added today' : `${daysActive} day${daysActive === 1 ? '' : 's'} active`}
              </span>
              {isSnoozed && <span className="text-xs text-blue-500">&#127769; Snoozed</span>}
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 text-sm font-medium">Done</button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Update status</p>
          <div className="space-y-2">
            {STATUS_OPTS.map(opt => (
              <button key={opt.value} onClick={() => updateStatus(opt.value)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left transition-colors ${
                  issue.status === opt.value ? `${opt.bg} border-current` : 'bg-gray-50 border-transparent'
                }`}>
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${opt.dot}`} />
                <span className={`text-sm font-medium ${
                  issue.status === opt.value ? opt.text : 'text-gray-700'
                }`}>{opt.label}</span>
                {issue.status === opt.value && <span className="ml-auto text-xs">&#10003;</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <button onClick={() => setShowSnooze(true)}
            className="w-full flex items-center gap-3 px-4 py-3.5 bg-blue-50 rounded-2xl text-blue-600 font-medium text-sm">
            &#127769; {isSnoozed ? 'Change snooze' : 'Snooze notifications'}
          </button>
          <button onClick={() => setShowDelete(true)}
            className="w-full flex items-center gap-3 px-4 py-3.5 bg-red-50 rounded-2xl text-red-600 font-medium text-sm">
            &#128465; Delete issue
          </button>
        </div>
      </div>

      {/* Snooze sheet */}
      {showSnooze && (
        <BottomSheet onDismiss={() => setShowSnooze(false)} title="Snooze for&#8230;">
          {[[1, '1 day'], [3, '3 days'], [7, '1 week']].map(([days, label]) => (
            <button key={days} onClick={() => snooze(days as number)}
              className="w-full py-3.5 bg-gray-100 rounded-2xl text-sm font-medium">{label}</button>
          ))}
          {isSnoozed && (
            <button onClick={() => { onUpdate({ ...issue, snoozeUntil: undefined }); setShowSnooze(false) }}
              className="w-full py-3 text-red-500 text-sm font-medium">Cancel snooze</button>
          )}
        </BottomSheet>
      )}

      {/* Delete sheet */}
      {showDelete && (
        <BottomSheet onDismiss={() => setShowDelete(false)} title="Delete this issue?">
          <p className="text-gray-400 text-sm text-center -mt-1">This removes the issue and stops all notifications.</p>
          <button onClick={() => onDelete(issue.id)}
            className="w-full py-3.5 bg-red-500 text-white rounded-2xl text-sm font-semibold">Delete</button>
        </BottomSheet>
      )}
    </div>
  )
}

function BottomSheet({ title, children, onDismiss }: { title: string; children: React.ReactNode; onDismiss: () => void }) {
  return (
    <div className="absolute inset-0 bg-black/40 flex items-end z-10" onClick={onDismiss}>
      <div className="bg-white w-full rounded-t-3xl p-5 space-y-3" onClick={e => e.stopPropagation()}>
        <h3 className="font-bold text-center" dangerouslySetInnerHTML={{ __html: title }} />
        {children}
        <button onClick={onDismiss} className="w-full py-3 text-gray-400 text-sm">Cancel</button>
      </div>
    </div>
  )
}

function ConfettiOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {CONFETTI_PIECES.map(p => (
        <div key={p.id} className="absolute confetti-piece rounded-sm"
          style={{
            left: p.left, top: '-12px',
            width: p.width, height: p.height,
            background: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }} />
      ))}
      <div className="absolute inset-x-0 bottom-28 flex justify-center">
        <div className="bg-green-500 text-white font-bold text-base px-6 py-3 rounded-2xl shadow-lg">
          All fixed! &#127881;
        </div>
      </div>
    </div>
  )
}
