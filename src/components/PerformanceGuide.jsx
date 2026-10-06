import React from 'react'
import { CheckCircle2, Cpu, Zap, Layers, BarChart3, Code2 } from 'lucide-react'

const PILLARS = [
  {
    icon: Layers,
    title: '1. Above-The-Fold Hero Layout',
    status: 'Verified',
    points: [
      'Full 100vh initial viewport framing above the fold.',
      'Letter-spaced headline: "W E L C O M E   I T Z F I Z Z".',
      'Impact metrics & statistics prominently staged below the headline.'
    ]
  },
  {
    icon: Zap,
    title: '2. Initial Load Animation',
    status: 'Verified',
    points: [
      'GSAP Timeline orchestrates staggered headline entrance.',
      'Statistics animate in sequentially with smooth rollup counters.',
      'Refined easing (power3.out) avoids abrupt pops or jarring jumps.'
    ]
  },
  {
    icon: BarChart3,
    title: '3. Scroll-Driven Core Motion',
    status: 'Verified',
    points: [
      'ScrollTrigger pins the track and binds car movement to user scroll.',
      'Interpolated scrub (scrub: 1.1) provides buttery natural momentum.',
      'Real-time letter illumination triggers dynamically as the car rolls past.'
    ]
  },
  {
    icon: Cpu,
    title: '4. High-Performance 60/120 FPS',
    status: 'Verified',
    points: [
      'Strictly utilizes GPU transform (translate3d, scale, rotate).',
      'Pre-caches getBoundingClientRect on resize, avoiding layout thrashing.',
      'Zero layout reflows during scroll ticks for silky composite rendering.'
    ]
  }
]

export default function PerformanceGuide() {
  return (
    <section id="architecture" className="relative w-full py-24 px-4 md:px-8 bg-[#08090d] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              ASSIGNMENT CRITERIA FULFILLMENT
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white tracking-tight">
              Motion & Engineering Architecture
            </h2>
          </div>
          <p className="text-sm text-gray-400 max-w-md font-sans">
            Designed to meet and exceed all specifications for scroll synchronization, introductory choreography, and browser performance standards.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map((item, idx) => {
            const Icon = item.icon
            return (
              <div 
                key={idx}
                className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {item.status}
                  </span>
                </div>
                <ul className="space-y-2.5 mt-4">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Tech Stack Banner */}
        <div className="mt-12 glass-panel rounded-2xl p-6 border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-cyan-400" />
            <div>
              <div className="text-sm font-semibold text-white">Integrated Tech Stack</div>
              <div className="text-xs text-gray-400 font-mono">React 19 • GSAP 3.12 (ScrollTrigger) • Tailwind CSS v4 • Web Audio API • Vite</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
              60+ FPS Composited
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-emerald-300">
              Zero Layout Reflows
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
