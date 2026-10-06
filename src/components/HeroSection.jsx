import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Gauge, ArrowDown, Sparkles, TrendingUp, PhoneCall, Zap, Award, Compass, Play, RotateCcw } from 'lucide-react'
import { engineSynth } from '../utils/engineAudio'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE_LETTERS = [
  { char: 'W', id: 0 },
  { char: 'E', id: 1 },
  { char: 'L', id: 2 },
  { char: 'C', id: 3 },
  { char: 'O', id: 4 },
  { char: 'M', id: 5 },
  { char: 'E', id: 6 },
  { char: '\u00A0', id: 7, isSpace: true },
  { char: 'I', id: 8 },
  { char: 'T', id: 9 },
  { char: 'Z', id: 10 },
  { char: 'F', id: 11 },
  { char: 'I', id: 12 },
  { char: 'Z', id: 13 },
  { char: 'Z', id: 14 },
]

const STAT_METRICS = [
  {
    id: 'box1',
    numValue: 58,
    unit: '%',
    title: 'Surge in Pick-Up Point Use',
    desc: 'Accelerated micro-fulfillment adoption across urban transit nodes',
    color: '#def54f', // Neon Lime / Yellow
    glowClass: 'glow-box-lime',
    borderClass: 'border-lime-400/40',
    textAccent: 'text-[#def54f]',
    icon: TrendingUp,
    activeRange: [0.15, 0.40]
  },
  {
    id: 'box2',
    numValue: 23,
    unit: '%',
    title: 'Drop in Customer Calls',
    desc: 'Self-serve telemetry tracking eliminated redundant dispatch inquiries',
    color: '#6ac9ff', // Electric Cyan
    glowClass: 'glow-box-cyan',
    borderClass: 'border-cyan-400/40',
    textAccent: 'text-[#6ac9ff]',
    icon: PhoneCall,
    activeRange: [0.35, 0.65]
  },
  {
    id: 'box3',
    numValue: 27,
    unit: '%',
    title: 'Conversion Speed Boost',
    desc: 'Streamlined checkout throughput with frictionless UX micro-interactions',
    color: '#a855f7', // Hyper Purple
    glowClass: 'glow-box-purple',
    borderClass: 'border-purple-400/40',
    textAccent: 'text-[#c084fc]',
    icon: Zap,
    activeRange: [0.60, 0.85]
  },
  {
    id: 'box4',
    numValue: 40,
    unit: '%',
    title: 'Retention Multiplier',
    desc: 'Dynamic engagement loops driving sustained repeat user sessions',
    color: '#fa7328', // Papaya Sunset
    glowClass: 'glow-box-orange',
    borderClass: 'border-orange-400/40',
    textAccent: 'text-[#fa7328]',
    icon: Award,
    activeRange: [0.80, 1.00]
  }
]

export const CAR_SKINS = {
  papaya: { name: 'Papaya Orange (Original)', filter: 'none', color: '#ff7700' },
  cyan: { name: 'Cyberpunk Cyan', filter: 'hue-rotate(170deg) saturate(1.6)', color: '#00f0ff' },
  lime: { name: 'Acid Lime', filter: 'hue-rotate(80deg) saturate(1.8)', color: '#45db7d' },
  purple: { name: 'Neon Ultraviolet', filter: 'hue-rotate(250deg) saturate(1.7) brightness(1.1)', color: '#a855f7' },
  stealth: { name: 'Carbon Stealth', filter: 'grayscale(1) contrast(1.3) brightness(0.85)', color: '#94a3b8' }
}

export const TRAIL_COLORS = {
  lime: { name: 'Neon Emerald', hex: '#45db7d', rgb: '69, 219, 125' },
  cyan: { name: 'Electric Cyan', hex: '#00f0ff', rgb: '0, 240, 255' },
  orange: { name: 'Papaya Flare', hex: '#fa7328', rgb: '250, 115, 40' },
  magenta: { name: 'Hyper Magenta', hex: '#ff007f', rgb: '255, 0, 127' }
}

export default function HeroSection({
  carSkin = 'papaya',
  trailColor = 'lime',
  driveMode = 'SPORT',
  soundEnabled = false,
  scrubProgressManual = null,
  onProgressUpdate = null
}) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const roadRef = useRef(null)
  const carRef = useRef(null)
  const trailRef = useRef(null)
  const lettersRef = useRef([])
  const statBoxRefs = useRef([])
  const countersRef = useRef([0, 0, 0, 0])

  // Live Telemetry states
  const [telemetry, setTelemetry] = useState({
    speed: 0,
    gear: 'N',
    rpm: 1200,
    progress: 0,
    carXPos: 0
  })

  const [activeBoxes, setActiveBoxes] = useState({
    box1: false,
    box2: false,
    box3: false,
    box4: false
  })

  // 1. Initial Load Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const introTl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      })

      // Top badge and headers
      introTl.from('.hero-badge-intro', {
        opacity: 0,
        y: -25,
        duration: 0.8,
        delay: 0.2
      })

      // Stagger reveal of headline letters
      introTl.from('.value-letter-intro', {
        opacity: 0,
        y: 40,
        scale: 0.85,
        stagger: 0.04,
        duration: 0.9,
      }, '-=0.5')

      // Supercar slide-in to starting grid
      introTl.from(carRef.current, {
        opacity: 0,
        x: -120,
        duration: 1.1,
        ease: 'power2.out'
      }, '-=0.7')

      // Stagger reveal of statistic cards with counter animation
      introTl.from('.stat-card-intro', {
        opacity: 0,
        y: 35,
        scale: 0.92,
        stagger: 0.15,
        duration: 0.8,
        onComplete: () => {
          // Trigger initial counter rollup
          STAT_METRICS.forEach((m, idx) => {
            const obj = { val: 0 }
            gsap.to(obj, {
              val: m.numValue,
              duration: 1.4,
              ease: 'power2.out',
              delay: idx * 0.1,
              onUpdate: () => {
                const el = document.getElementById(`counter-display-${idx}`)
                if (el) el.innerText = Math.round(obj.val) + m.unit
              }
            })
          })
        }
      }, '-=0.6')

      // Scroll hint bounce
      introTl.from('.scroll-hint-intro', {
        opacity: 0,
        y: 15,
        duration: 0.8
      }, '-=0.4')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // 2. Scroll-Based Core Animation with GSAP ScrollTrigger
  useEffect(() => {
    const carEl = carRef.current
    const trailEl = trailRef.current
    const roadEl = roadRef.current
    const trackEl = trackRef.current
    const containerEl = containerRef.current
    if (!carEl || !roadEl || !containerEl || !trackEl) return

    let letterPositions = []
    let cachedRoadWidth = roadEl.clientWidth
    const carWidth = 160 // scaled width

    const measureLayout = () => {
      if (!roadEl) return
      const roadRect = roadEl.getBoundingClientRect()
      cachedRoadWidth = roadEl.clientWidth
      letterPositions = lettersRef.current.map((letterEl) => {
        if (!letterEl) return 0
        const lRect = letterEl.getBoundingClientRect()
        return (lRect.left - roadRect.left) + lRect.width / 2
      })
    }

    measureLayout()
    window.addEventListener('resize', measureLayout)

    const endX = cachedRoadWidth - carWidth

    const st = ScrollTrigger.create({
      trigger: containerEl,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.1, // Smooth interpolation with silky dampening
      pin: trackEl,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const velocity = self.getVelocity()
        const currentCarX = progress * (roadEl.clientWidth - carWidth)

        // Move the car with GPU transform
        gsap.set(carEl, {
          x: currentCarX,
          // Subtle aerodynamic pitch & tilt under acceleration
          rotation: Math.min(Math.max(velocity * 0.005, -2.5), 2.5),
          scale: 1 + Math.min(Math.abs(velocity) * 0.00015, 0.04)
        })

        // Expand glowing trail directly behind car
        if (trailEl) {
          gsap.set(trailEl, { width: currentCarX + 40 })
        }

        // Letter-by-letter illuminated kinetic reveal
        const carCenter = currentCarX + carWidth / 2
        lettersRef.current.forEach((letterEl, i) => {
          if (!letterEl) return
          const letterX = letterPositions[i] || letterEl.offsetLeft
          if (carCenter >= letterX) {
            letterEl.classList.add('letter-active')
            letterEl.style.opacity = '1'
            letterEl.style.color = '#ffffff'
            letterEl.style.textShadow = `0 0 25px ${TRAIL_COLORS[trailColor]?.hex || '#00f0ff'}, 0 0 50px ${TRAIL_COLORS[trailColor]?.hex || '#00f0ff'}`
          } else {
            letterEl.classList.remove('letter-active')
            letterEl.style.opacity = '0.35'
            letterEl.style.color = '#4b5563'
            letterEl.style.textShadow = 'none'
          }
        })

        // Update milestone box activation
        setActiveBoxes({
          box1: progress >= 0.15,
          box2: progress >= 0.38,
          box3: progress >= 0.62,
          box4: progress >= 0.85
        })

        // Calculate realistic speed, gear & RPM
        const speedKmh = Math.round(progress * 340)
        let gear = 'N'
        if (speedKmh > 0 && speedKmh < 60) gear = '1'
        else if (speedKmh < 120) gear = '2'
        else if (speedKmh < 190) gear = '3'
        else if (speedKmh < 260) gear = '4'
        else if (speedKmh < 310) gear = '5'
        else if (speedKmh >= 310) gear = '6'

        const rpm = Math.round(1200 + progress * 7200)

        setTelemetry({
          speed: speedKmh,
          gear: speedKmh === 0 ? 'N' : gear,
          rpm: rpm,
          progress: Math.round(progress * 100),
          carXPos: Math.round(currentCarX)
        })

        if (onProgressUpdate) {
          onProgressUpdate(progress)
        }

        // Dynamic audio pitch update
        const normalizedVel = velocity / 1000
        engineSynth.update(normalizedVel, progress)
      }
    })

    return () => {
      window.removeEventListener('resize', measureLayout)
      st.kill()
    }
  }, [trailColor, onProgressUpdate])

  // Handle manual scrub override if requested
  useEffect(() => {
    if (scrubProgressManual !== null && containerRef.current) {
      const scrollDist = containerRef.current.scrollHeight - window.innerHeight
      window.scrollTo({
        top: containerRef.current.offsetTop + scrubProgressManual * scrollDist,
        behavior: 'smooth'
      })
    }
  }, [scrubProgressManual])

  const selectedSkin = CAR_SKINS[carSkin] || CAR_SKINS.papaya
  const selectedTrail = TRAIL_COLORS[trailColor] || TRAIL_COLORS.lime

  return (
    <section 
      ref={containerRef}
      id="hero-scroll-container"
      className="relative w-full bg-[#08090d] text-white"
      style={{ height: '260vh' }}
    >
      {/* Sticky Pinned Track Canvas */}
      <div 
        ref={trackRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-3 sm:px-6 md:px-8 pt-16 sm:pt-20 pb-3 md:pb-4 select-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(18, 23, 38, 0.9) 0%, rgba(8, 9, 13, 1) 100%)'
        }}
      >
        {/* TOP SECTION: Header info and Top Metric Cards */}
        <div className="max-w-7xl mx-auto w-full z-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-2 sm:mb-3">
            <div>
              <div className="hero-badge-intro inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[11px] font-mono mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                SCROLL-DRIVEN KINETIC EXPERIENCE
              </div>
              <h2 className="text-xs sm:text-sm font-mono text-gray-400 tracking-wider">
                MCLAREN 720S HIGH-VELOCITY SCROLL SIMULATION
              </h2>
            </div>

            {/* Quick Milestone Progress Jumpers */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl p-1 text-xs font-mono">
              <span className="text-gray-400 px-1.5 text-[10px]">JUMP:</span>
              {[
                { label: '0%', val: 0 },
                { label: '35%', val: 0.35 },
                { label: '65%', val: 0.65 },
                { label: '100%', val: 1 }
              ].map((jump) => (
                <button
                  key={jump.label}
                  onClick={() => {
                    const scrollDist = containerRef.current.scrollHeight - window.innerHeight
                    window.scrollTo({
                      top: containerRef.current.offsetTop + jump.val * scrollDist,
                      behavior: 'smooth'
                    })
                  }}
                  className="px-2 py-0.5 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-300 transition-all text-gray-300 text-xs"
                >
                  {jump.label}
                </button>
              ))}
            </div>
          </div>

          {/* Top Metric Cards Row (Box 1 & Box 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5 mt-1 sm:mt-2">
            {/* Box 1 */}
            <div 
              id="box1"
              className={`stat-card-intro glass-panel rounded-2xl p-3 sm:p-4 md:p-4.5 transition-all duration-500 border ${
                activeBoxes.box1 
                  ? 'border-lime-400/80 shadow-lg shadow-lime-500/20 bg-lime-950/20 scale-[1.01]' 
                  : 'border-white/10 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/20">
                      MILESTONE 01
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">Trigger: 15% Scroll</span>
                  </div>
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                    {STAT_METRICS[0].title}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 max-w-md hidden sm:block">
                    {STAT_METRICS[0].desc}
                  </p>
                </div>
                <div className="text-right">
                  <span 
                    id="counter-display-0" 
                    className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#def54f] tracking-tight block"
                  >
                    58%
                  </span>
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                    Lift Recorded
                  </span>
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div 
              id="box3"
              className={`stat-card-intro glass-panel rounded-2xl p-3 sm:p-4 md:p-4.5 transition-all duration-500 border ${
                activeBoxes.box3 
                  ? 'border-purple-400/80 shadow-lg shadow-purple-500/20 bg-purple-950/20 scale-[1.01]' 
                  : 'border-white/10 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-400/10 text-purple-400 border border-purple-400/20">
                      MILESTONE 03
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">Trigger: 62% Scroll</span>
                  </div>
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                    {STAT_METRICS[2].title}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 max-w-md hidden sm:block">
                    {STAT_METRICS[2].desc}
                  </p>
                </div>
                <div className="text-right">
                  <span 
                    id="counter-display-2" 
                    className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#c084fc] tracking-tight block"
                  >
                    27%
                  </span>
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                    Velocity Boost
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: The Kinetic Road Runway & Supercar */}
        <div className="relative w-full max-w-7xl mx-auto my-auto z-10 py-1.5 sm:py-3">
          {/* Highway Asphalt Strip */}
          <div 
            ref={roadRef}
            id="road-track"
            className="relative w-full h-[145px] sm:h-[175px] md:h-[205px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 road-surface flex items-center"
          >
            {/* Road Top & Bottom Neon Curbs */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/60 via-yellow-400/60 to-cyan-500/60" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/60 via-yellow-400/60 to-cyan-500/60" />

            {/* Road Center Dashed Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 border-b-2 border-dashed border-white/20 transform -translate-y-1/2 pointer-events-none" />

            {/* Glowing Neon Trail following behind car */}
            <div 
              ref={trailRef}
              id="car-trail"
              className="absolute left-0 top-0 bottom-0 pointer-events-none transition-none"
              style={{
                width: 0,
                background: `linear-gradient(90deg, rgba(${selectedTrail.rgb}, 0.05) 0%, rgba(${selectedTrail.rgb}, 0.35) 60%, rgba(${selectedTrail.rgb}, 0.85) 100%)`,
                boxShadow: `0 0 35px rgba(${selectedTrail.rgb}, 0.5), inset 0 0 15px rgba(${selectedTrail.rgb}, 0.4)`
              }}
            />

            {/* The Letter-Spaced Headline Overlay (W E L C O M E   I T Z F I Z Z) */}
            <div 
              className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-8 md:px-12 pointer-events-none select-none overflow-hidden"
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-3.5 xl:gap-4 tracking-widest font-heading font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl uppercase max-w-full">
                {HEADLINE_LETTERS.map((item, idx) => (
                  <span
                    key={item.id}
                    ref={(el) => (lettersRef.current[idx] = el)}
                    className="value-letter-intro letter-char inline-block"
                    style={{
                      opacity: 0.35,
                      color: '#4b5563',
                      minWidth: item.isSpace ? '0.75rem' : 'auto'
                    }}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
            </div>

            {/* The Supercar Element */}
            <div
              ref={carRef}
              id="mclaren-car"
              className="absolute left-0 z-20 pointer-events-none will-change-transform flex items-center"
              style={{
                width: '160px',
                height: '100%',
                top: 0
              }}
            >
              {/* Headlight illumination beam projecting forward */}
              <div 
                className="headlight-cone absolute left-[125px] top-1/2 -translate-y-1/2 w-[220px] md:w-[320px] h-[130px] md:h-[180px] pointer-events-none z-10"
              />

              {/* Car Body PNG */}
              <img
                src="/car.png"
                alt="McLaren 720S Top View"
                className="w-full object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.85)]"
                style={{
                  filter: `${selectedSkin.filter} drop-shadow(0 15px 25px rgba(0,0,0,0.9))`
                }}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Bottom Metric Cards (Box 2 & Box 4) & Telemetry Cockpit */}
        <div className="max-w-7xl mx-auto w-full z-20">
          {/* Bottom Metric Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5 mb-2 sm:mb-3">
            {/* Box 2 */}
            <div 
              id="box2"
              className={`stat-card-intro glass-panel rounded-2xl p-3 sm:p-4 md:p-4.5 transition-all duration-500 border ${
                activeBoxes.box2 
                  ? 'border-cyan-400/80 shadow-lg shadow-cyan-500/20 bg-cyan-950/20 scale-[1.01]' 
                  : 'border-white/10 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                      MILESTONE 02
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">Trigger: 38% Scroll</span>
                  </div>
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                    {STAT_METRICS[1].title}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 max-w-md hidden sm:block">
                    {STAT_METRICS[1].desc}
                  </p>
                </div>
                <div className="text-right">
                  <span 
                    id="counter-display-1" 
                    className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#6ac9ff] tracking-tight block"
                  >
                    23%
                  </span>
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                    Support Reduction
                  </span>
                </div>
              </div>
            </div>

            {/* Box 4 */}
            <div 
              id="box4"
              className={`stat-card-intro glass-panel rounded-2xl p-3 sm:p-4 md:p-4.5 transition-all duration-500 border ${
                activeBoxes.box4 
                  ? 'border-orange-400/80 shadow-lg shadow-orange-500/20 bg-orange-950/20 scale-[1.01]' 
                  : 'border-white/10 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-400/10 text-orange-400 border border-orange-400/20">
                      MILESTONE 04
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">Trigger: 85% Scroll</span>
                  </div>
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                    {STAT_METRICS[3].title}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 max-w-md hidden sm:block">
                    {STAT_METRICS[3].desc}
                  </p>
                </div>
                <div className="text-right">
                  <span 
                    id="counter-display-3" 
                    className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#fa7328] tracking-tight block"
                  >
                    40%
                  </span>
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                    Retention Multiplier
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TELEMETRY HUD BAR & SCROLL HINT */}
          <div className="glass-panel rounded-2xl p-2.5 sm:p-3 md:p-3.5 flex flex-col md:flex-row items-center justify-between gap-3 border border-white/10">
            {/* Speedometer & Gear telemetry */}
            <div className="flex items-center gap-6 w-full md:w-auto justify-around md:justify-start">
              {/* Speedometer */}
              <div className="flex items-baseline gap-1.5">
                <Gauge className="w-5 h-5 text-cyan-400 self-center" />
                <span className="font-heading font-black text-2xl md:text-3xl text-white font-mono">
                  {telemetry.speed}
                </span>
                <span className="text-[11px] font-mono text-gray-400 uppercase">KM/H</span>
              </div>

              {/* Gear */}
              <div className="flex items-baseline gap-1.5 border-l border-white/10 pl-5">
                <span className="text-[10px] font-mono text-gray-400 uppercase">GEAR</span>
                <span className="font-heading font-bold text-xl md:text-2xl text-cyan-300 font-mono">
                  {telemetry.gear}
                </span>
              </div>

              {/* RPM Bar */}
              <div className="hidden sm:flex flex-col gap-1 border-l border-white/10 pl-5 min-w-[130px]">
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>RPM</span>
                  <span className="text-cyan-300">{telemetry.rpm}</span>
                </div>
                <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 via-amber-400 to-red-500 transition-all duration-75"
                    style={{ width: `${(telemetry.rpm / 8500) * 100}%` }}
                  />
                </div>
              </div>

              {/* Scroll Track Progress */}
              <div className="flex items-baseline gap-1.5 border-l border-white/10 pl-5">
                <span className="text-[10px] font-mono text-gray-400 uppercase">PROGRESS</span>
                <span className="font-mono font-bold text-lg md:text-xl text-white">
                  {telemetry.progress}%
                </span>
              </div>
            </div>

            {/* Scroll Down Callout Hint */}
            <div className="scroll-hint-intro flex items-center gap-2 text-xs font-mono text-gray-400">
              <span className="hidden lg:inline text-gray-500">Continuous scroll drives the vehicle</span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                <span>SCROLL TO ACCELERATE</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
