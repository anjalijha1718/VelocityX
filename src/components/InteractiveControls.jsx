import React, { useState } from 'react'
import { X, Palette, Flame, Sliders, Play, Pause, RotateCcw, Volume2, Sparkles, Check } from 'lucide-react'
import { CAR_SKINS, TRAIL_COLORS } from './HeroSection'

export default function InteractiveControls({
  isOpen,
  onClose,
  carSkin,
  setCarSkin,
  trailColor,
  setTrailColor,
  driveMode,
  setDriveMode,
  soundEnabled,
  setSoundEnabled,
  onScrubManual
}) {
  const [isAutoCruising, setIsAutoCruising] = useState(false)
  const [sliderVal, setSliderVal] = useState(0)

  if (!isOpen) return null

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value)
    setSliderVal(val)
    if (onScrubManual) {
      onScrubManual(val)
    }
  }

  // Auto Cruise Demonstration loop
  const toggleAutoCruise = () => {
    if (isAutoCruising) {
      setIsAutoCruising(false)
      window.__stopCruise && window.__stopCruise()
    } else {
      setIsAutoCruising(true)
      const container = document.getElementById('hero-scroll-container')
      if (!container) return

      const startTop = container.offsetTop
      const maxScroll = container.scrollHeight - window.innerHeight
      let currentProgress = 0
      let direction = 1

      const cruiseInterval = setInterval(() => {
        currentProgress += 0.005 * direction
        if (currentProgress >= 1) {
          currentProgress = 1
          direction = -1
        } else if (currentProgress <= 0) {
          currentProgress = 0
          direction = 1
        }

        window.scrollTo({
          top: startTop + currentProgress * maxScroll,
          behavior: 'auto'
        })
        setSliderVal(currentProgress)
      }, 16)

      window.__stopCruise = () => {
        clearInterval(cruiseInterval)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl p-6 border border-white/15 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow ambient accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Kinetic Simulator Controls
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Real-Time Vehicle & Visual Customizer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Supercar Paint Finishes */}
        <div className="mt-5">
          <label className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 mb-2.5 tracking-wider">
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            McLaren 720S Livery & Paint
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {Object.entries(CAR_SKINS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setCarSkin(key)}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                  carSkin === key
                    ? 'border-cyan-400 bg-cyan-500/15 text-white shadow-md shadow-cyan-500/10'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate">{item.name}</span>
                {carSkin === key && <Check className="w-3.5 h-3.5 ml-auto text-cyan-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Neon Exhaust Trail Glow */}
        <div className="mt-5">
          <label className="flex items-center gap-2 text-xs font-mono uppercase text-gray-400 mb-2.5 tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Exhaust Trail Luminescence
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.entries(TRAIL_COLORS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setTrailColor(key)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  trailColor === key
                    ? 'border-white text-white bg-white/10 shadow-md'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full shadow-sm"
                  style={{ backgroundColor: item.hex, boxShadow: `0 0 10px ${item.hex}` }}
                />
                <span className="truncate">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Interactive Manual Scrub Bar */}
        <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-white/10">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-gray-400">DIRECT KINETIC SCRUBBER</span>
            <span className="text-cyan-400 font-bold">{Math.round(sliderVal * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sliderVal}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
            <span>0% Start Grid</span>
            <span>50% Mid Apex</span>
            <span>100% Finish Line</span>
          </div>
        </div>

        {/* Section 4: Auto Cruise & Quick Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={toggleAutoCruise}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs font-bold transition-all border ${
              isAutoCruising
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:opacity-95 shadow-lg shadow-cyan-500/25'
            }`}
          >
            {isAutoCruising ? (
              <>
                <Pause className="w-4 h-4" /> Pause Cruise
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Auto Cruise Demo
              </>
            )}
          </button>

          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setSliderVal(0)
            }}
            className="flex items-center gap-1.5 py-3 px-4 rounded-xl font-mono text-xs text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Start
          </button>
        </div>
      </div>
    </div>
  )
}
