import React, { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import InteractiveControls from './components/InteractiveControls'
import TelemetrySpecs from './components/TelemetrySpecs'
import PerformanceGuide from './components/PerformanceGuide'
import Footer from './components/Footer'
import { SlidersHorizontal, Sparkles } from 'lucide-react'

export default function App() {
  const [carSkin, setCarSkin] = useState('papaya')
  const [trailColor, setTrailColor] = useState('lime')
  const [driveMode, setDriveMode] = useState('SPORT')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isControlsOpen, setIsControlsOpen] = useState(false)
  const [scrubProgressManual, setScrubProgressManual] = useState(null)

  const handleManualScrub = (val) => {
    setScrubProgressManual(val)
    setTimeout(() => setScrubProgressManual(null), 100)
  }

  return (
    <div className="min-h-screen bg-[#08090d] text-white selection:bg-cyan-500 selection:text-black">
      {/* Navigation Header */}
      <Navbar
        driveMode={driveMode}
        setDriveMode={setDriveMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenControls={() => setIsControlsOpen(true)}
      />

      {/* Main Core Scroll Hero Section (Requirement 1 - 4) */}
      <HeroSection
        carSkin={carSkin}
        trailColor={trailColor}
        driveMode={driveMode}
        soundEnabled={soundEnabled}
        scrubProgressManual={scrubProgressManual}
      />

      {/* Additional Showcase & Deep-Dive Sections */}
      <TelemetrySpecs />
      <PerformanceGuide />
      <Footer />

      {/* Interactive Floating Quick Customizer Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsControlsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-2xl glass-panel text-white hover:text-cyan-300 border border-white/15 hover:border-cyan-500/40 shadow-2xl transition-all duration-300 group hover:scale-105"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <SlidersHorizontal className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
          <span className="text-xs font-mono font-medium tracking-wide">
            Kinetic Lab Deck
          </span>
        </button>
      </div>

      {/* Interactive Customizer Modal */}
      <InteractiveControls
        isOpen={isControlsOpen}
        onClose={() => setIsControlsOpen(false)}
        carSkin={carSkin}
        setCarSkin={setCarSkin}
        trailColor={trailColor}
        setTrailColor={setTrailColor}
        driveMode={driveMode}
        setDriveMode={setDriveMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onScrubManual={handleManualScrub}
      />
    </div>
  )
}
