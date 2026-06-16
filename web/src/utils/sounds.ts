function ctx(): AudioContext | null {
  try {
    return new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  } catch {
    return null
  }
}

/** Harsh triple-beep alarm for red (no action taken) issues. */
export function playAlarm(): void {
  const ac = ctx()
  if (!ac) return
  ;[0, 0.30, 0.60].forEach(start => {
    const osc  = ac.createOscillator()
    const gain = ac.createGain()
    osc.connect(gain)
    gain.connect(ac.destination)
    osc.type = 'sawtooth'
    osc.frequency.value = 900
    gain.gain.setValueAtTime(0,   ac.currentTime + start)
    gain.gain.linearRampToValueAtTime(0.4, ac.currentTime + start + 0.02)
    gain.gain.setValueAtTime(0.4,          ac.currentTime + start + 0.20)
    gain.gain.linearRampToValueAtTime(0,   ac.currentTime + start + 0.27)
    osc.start(ac.currentTime + start)
    osc.stop(ac.currentTime  + start + 0.28)
  })
}

/** Sparkling chime for amber (in progress) issues — staggered sine chord with reverb. */
export function playChime(): void {
  const ac = ctx()
  if (!ac) return

  // Simple synthetic reverb
  const convolver = ac.createConvolver()
  const len = Math.floor(ac.sampleRate * 1.8)
  const buf = ac.createBuffer(2, len, ac.sampleRate)
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c)
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5) * 0.4
    }
  }
  convolver.buffer = buf
  convolver.connect(ac.destination)

  // Three harmonically related tones
  ;[[528, 0], [660, 0.09], [792, 0.18]].forEach(([freq, delay]) => {
    const osc  = ac.createOscillator()
    const gain = ac.createGain()
    osc.connect(gain)
    gain.connect(convolver)
    gain.connect(ac.destination)
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0,    ac.currentTime + delay)
    gain.gain.linearRampToValueAtTime(0.13, ac.currentTime + delay + 0.06)
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + 2.2)
    osc.start(ac.currentTime + delay)
    osc.stop(ac.currentTime  + delay + 2.3)
  })
}
