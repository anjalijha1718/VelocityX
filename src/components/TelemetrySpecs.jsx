import React from 'react'
import { Cpu, Zap, Wind, Compass, ShieldCheck, Flame, Activity } from 'lucide-react'

const SPECS = [
  {
    icon: Flame,
    title: 'Twin-Turbo V8 Engine',
    value: '720 PS',
    subtext: '4.0-Litre M840T Twin-Scroll',
    detail: 'Flat-plane crankshaft with ultra-low inertia twin-scroll turbochargers spooling instantly.'
  },
  {
    icon: Zap,
    title: '0 - 100 KM/H Sprint',
    value: '2.8s',
    subtext: '0 - 200 KM/H in 7.8s',
    detail: 'Launch control system regulating dual-clutch transmission for seamless linear propulsion.'
  },
  {
    icon: Wind,
    title: 'Active Aerodynamics',
    value: '341 KM/H',
    subtext: 'Dynamic Airbrake & Wing',
    detail: 'Full-width active rear wing deploying within 0.5s to stabilize downforce and scrub deceleration.'
  },
  {
    icon: ShieldCheck,
    title: 'Carbon Monocage II',
    value: '1,283 KG',
    subtext: 'Dry Weight Chassis',
    detail: 'Carbon fibre central passenger cell delivering immense structural rigidity and low centre of gravity.'
  }
]

export default function TelemetrySpecs() {
  return (
    <section id="telemetry" className="relative w-full py-24 px-4 md:px-8 bg-[#0b0d14] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
            <Activity className="w-3.5 h-3.5" />
            SUPERCAR ENGINEERING TELEMETRY
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white tracking-tight">
            Built for Pure Kinetic Output
          </h2>
          <p className="text-sm md:text-base text-gray-400 mt-4 leading-relaxed font-sans">
            Every millimeter of the McLaren 720S is crafted around fluid dynamics, high-velocity aero channels, and instant mechanical responsiveness.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECS.map((spec, idx) => {
            const Icon = spec.icon
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-cyan-500/40 hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                  {spec.title}
                </span>
                <div className="font-heading font-black text-3xl md:text-4xl text-white my-1 group-hover:text-cyan-300 transition-colors">
                  {spec.value}
                </div>
                <div className="text-xs font-semibold text-cyan-400/90 mb-3 font-mono">
                  {spec.subtext}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {spec.detail}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
