// Web Audio API Procedural Supercar Engine Sound Synthesizer
// Zero external mp3 dependencies, 100% lightweight and instant

class EngineSynthesizer {
  constructor() {
    this.ctx = null
    this.isPlaying = false
    this.masterGain = null
    this.osc1 = null
    this.osc2 = null
    this.filter = null
    this.baseFreq = 65 // Base idle rumble Hz
  }

  init() {
    if (this.ctx) return
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    this.ctx = new AudioCtx()

    // Master Gain
    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime)
    this.masterGain.connect(this.ctx.destination)

    // Lowpass filter for engine throttle resonance
    this.filter = this.ctx.createBiquadFilter()
    this.filter.type = 'lowpass'
    this.filter.frequency.setValueAtTime(250, this.ctx.currentTime)
    this.filter.Q.setValueAtTime(3, this.ctx.currentTime)
    this.filter.connect(this.masterGain)

    // Primary V8 Cylinder Rumble Oscillator
    this.osc1 = this.ctx.createOscillator()
    this.osc1.type = 'sawtooth'
    this.osc1.frequency.setValueAtTime(this.baseFreq, this.ctx.currentTime)
    this.osc1.connect(this.filter)

    // Supercharger / Turbo Whine Oscillator
    this.osc2 = this.ctx.createOscillator()
    this.osc2.type = 'triangle'
    this.osc2.frequency.setValueAtTime(this.baseFreq * 2.5, this.ctx.currentTime)

    const osc2Gain = this.ctx.createGain()
    osc2Gain.gain.setValueAtTime(0.2, this.ctx.currentTime)
    this.osc2.connect(osc2Gain)
    osc2Gain.connect(this.filter)

    this.osc1.start()
    this.osc2.start()
  }

  toggle(enable) {
    if (enable) {
      this.init()
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      this.isPlaying = true
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setTargetAtTime(0.12, this.ctx.currentTime, 0.1)
      }
    } else {
      this.isPlaying = false
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05)
      }
    }
  }

  // Update pitch and filter dynamically based on normalized scroll velocity and progress (0 to 1)
  update(velocityNormalized = 0, progress = 0) {
    if (!this.isPlaying || !this.ctx) return

    const clampedVel = Math.min(Math.abs(velocityNormalized), 3.5)
    // Scale RPM from idle 65Hz to high-rev 220Hz
    const targetFreq = this.baseFreq + clampedVel * 38 + progress * 20
    const filterFreq = 300 + clampedVel * 450 + progress * 200

    this.osc1.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.08)
    this.osc2.frequency.setTargetAtTime(targetFreq * 2.4, this.ctx.currentTime, 0.08)
    this.filter.frequency.setTargetAtTime(filterFreq, this.ctx.currentTime, 0.08)
  }
}

export const engineSynth = new EngineSynthesizer()
