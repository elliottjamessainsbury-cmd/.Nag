import { useState } from 'react'
import { Issue } from '../types'
import { BODY_PARTS, BODY_PART_GROUPS, BodyPartDef } from '../data/bodyParts'

interface Props {
  activeIssueCount: number
  onAdd: (issue: Issue) => void
  onCancel: () => void
}

export default function AddIssueScreen({ activeIssueCount, onAdd, onCancel }: Props) {
  const [selectedPart, setSelectedPart] = useState<BodyPartDef | null>(null)
  const [description, setDescription]   = useState('')
  const [search, setSearch]             = useState('')

  if (!selectedPart) {
    const filtered = search.trim()
      ? BODY_PARTS.filter(p => p.displayName.toLowerCase().includes(search.toLowerCase()))
      : null

    return (
      <div className="flex flex-col h-full bg-white">
        <div className="px-5 pt-3 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">What's bothering you?</h2>
            <button onClick={onCancel} className="text-gray-400 text-sm">Cancel</button>
          </div>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search body parts…"
            className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none" />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered ? (
            <div>
              {filtered.length === 0 && <p className="text-center text-gray-400 text-sm py-8">No matches</p>}
              {filtered.map(p => <PartRow key={p.id} part={p} onSelect={setSelectedPart} />)}
            </div>
          ) : (
            BODY_PART_GROUPS.map(group => {
              const parts = BODY_PARTS.filter(p => p.group === group)
              return (
                <div key={group}>
                  <p className="px-5 py-1.5 text-xs text-gray-400 font-medium uppercase tracking-wide bg-gray-50">
                    {group}
                  </p>
                  {parts.map(p => <PartRow key={p.id} part={p} onSelect={setSelectedPart} />)}
                </div>
              )
            })
          )}
        </div>
      </div>
    )
  }

  const trimmed  = description.trim()
  const charsLeft = 150 - description.length

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-5 pt-3 pb-3 border-b border-gray-100 flex items-center gap-3">
        <button onClick={() => setSelectedPart(null)} className="text-gray-400 text-sm">&#8592; Back</button>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
          <span className="font-semibold text-sm">{selectedPart.displayName}</span>
        </div>
      </div>
      <div className="flex-1 px-5 py-4 space-y-4">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Describe the issue</p>
          <textarea value={description} onChange={e => setDescription(e.target.value.slice(0, 150))}
            placeholder="e.g. dry, cracked skin"
            rows={4} autoFocus
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-red-400" />
          {charsLeft <= 30 && (
            <p className={`text-xs text-right mt-1 ${charsLeft <= 0 ? 'text-red-500' : 'text-gray-400'}`}>
              {charsLeft} remaining
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">Be specific — this gets used in your notifications.</p>
        </div>
        <div className="bg-orange-50 rounded-2xl p-3 flex gap-2 items-start">
          <span className="text-base">&#9888;&#65039;</span>
          <p className="text-xs text-gray-500">
            For medical emergencies, call <strong>999</strong> or visit A&amp;E.
            Nag is for minor, fixable issues only.
          </p>
        </div>
      </div>
      <div className="px-5 pb-8">
        <button
          disabled={!trimmed || activeIssueCount >= 7}
          onClick={() => onAdd({
            id: crypto.randomUUID(),
            bodyPartId: selectedPart.id,
            specificIssue: trimmed,
            status: 'noActionTaken',
            dateAdded: new Date().toISOString(),
          })}
          className="w-full bg-red-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-4 rounded-2xl text-base transition-colors">
          Add issue
        </button>
      </div>
    </div>
  )
}

function PartRow({ part, onSelect }: { part: BodyPartDef; onSelect: (p: BodyPartDef) => void }) {
  return (
    <button onClick={() => onSelect(part)}
      className="w-full text-left px-5 py-3.5 hover:bg-gray-50 flex items-center justify-between border-b border-gray-50">
      <span className="text-sm">{part.displayName}</span>
      <span className="text-gray-300 text-lg">&#8250;</span>
    </button>
  )
}
