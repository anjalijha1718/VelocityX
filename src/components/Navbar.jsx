import React, { useState } from 'react'
import { Volume2, VolumeX, Gauge, Zap, Sparkles, SlidersHorizontal, ArrowUpRight } from 'lucide-react'
import { engineSynth } from '../utils/engineAudio'

export default function Navbar({ 
  driveMode, 
  setDriveMode, 
  soundEnabled, 
  setSoundEnabled,
  onOpenControls 
}) {
  const toggleSound = () => {
    const nextState = !soundEnabled
    setSoundEnabled(nextState)
    engineSynth.toggle(nextState)
  }

  const modes = ['SPORT', 'TRACK', 'HYPER', 'ECO']

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-black font-black text-xl tracking-tighter">
            VX
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-lg tracking-wider text-white">
                VELOCITY<span className="text-cyan-400">X</span>
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden sm:block tracking-wide">
              ItzFizz Kinetic Hero Showcase
            </p>
          </div>
        </div>

        {/* Center Mode Selector */}
        <div className="hidden lg:flex items-center bg-black/40 p-1 rounded-xl border border-white/5 text-xs font-mono">
          <span className="px-2 text-gray-400 text-[10px] uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400" /> Mode:
          </span>
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => setDriveMode(mode)}
              className={`px-3 py-1 rounded-lg transition-all text-xs font-semibold ${
                driveMode === mode
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
              soundEnabled
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            title="Toggle Procedural Supercar Engine Rev"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">Engine Audio: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-gray-400" />
                <span className="hidden sm:inline">Engine Audio: MUTE</span>
              </>
            )}
          </button>

          {/* Quick Nav anchor */}
          <a
            href="#telemetry"
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono text-gray-300 hover:text-white hover:bg-white/5 transition-all"
          >
            Telemetry <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>

          {/* Interactive Controller Button */}
          <button
            onClick={onOpenControls}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition-all text-xs font-medium"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customize</span>
          </button>
        </div>
      </div>
    </header>
  )
}
