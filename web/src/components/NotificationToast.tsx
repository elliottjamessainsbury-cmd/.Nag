import { useEffect, useRef, useState } from 'react'
import { IssueStatus } from '../types'
import { playAlarm, playChime } from '../utils/sounds'

interface Props {
  text: string
  status: IssueStatus
  onDismiss: () => void
}

export default function NotificationToast({ text, status, onDismiss }: Props) {
  const [visible, setVisible] = useState(false)
  const [doShake, setDoShake] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    // Slide in on next frame
    requestAnimationFrame(() => setVisible(true))

    if (status === 'noActionTaken') {
      playAlarm()
      // Shake after it arrives
      setTimeout(() => { setDoShake(true); setTimeout(() => setDoShake(false), 500) }, 350)
    } else {
      playChime()
    }

    timerRef.current = setTimeout(dismiss, 5000)
    return () => clearTimeout(timerRef.current)
  }, [])

  function dismiss() {
    clearTimeout(timerRef.current)
    setVisible(false)
    setTimeout(onDismiss, 300)
  }

  const isRed = status === 'noActionTaken'

  return (
    <div
      className={`absolute top-0 inset-x-0 z-30 px-3 pt-2 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
      onClick={dismiss}
    >
      {isRed ? (
        // ——— RED / ALARM ———
        <div className={`rounded-2xl p-4 shadow-xl ${
          doShake ? 'shake' : ''
        }`}
          style={{ background: 'linear-gradient(135deg, #b91c1c, #dc2626)' }}
        >
          <p className="text-red-200 text-xs font-bold uppercase tracking-widest mb-1">Nag ●</p>
          <p className="text-white font-black text-sm leading-snug tracking-wide uppercase">
            {text}
          </p>
          <p className="text-red-300 text-xs mt-2">Tap to dismiss</p>
        </div>
      ) : (
        // ——— AMBER / CHIME ———
        <div
          className="rounded-2xl p-4 shadow-lg border border-amber-100 sparkle-in"
          style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)' }}
        >
          <p className="text-amber-500 text-xs font-medium mb-1">Nag ✨</p>
          <p className="text-gray-800 text-sm leading-snug">{text}</p>
          <p className="text-amber-400 text-xs mt-2">Tap to dismiss</p>
        </div>
      )}
    </div>
  )
}
