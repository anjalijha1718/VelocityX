import React from 'react'
import { ArrowUp, Heart, Sparkles, ExternalLink } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="relative w-full py-12 px-4 md:px-8 bg-[#050608] border-t border-white/5 text-gray-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center text-sm">
            VX
          </div>
          <div>
            <div className="font-heading font-bold text-white text-sm">
              VELOCITY X | Kinetic Scroll Showcase
            </div>
            <p className="text-xs text-gray-500 font-mono">
              Inspired by ItzFizz Supercar Scroll Architecture
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <a
            href="https://paraschaturvedi.github.io/car-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
          >
            Original Reference <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span>•</span>
          <span className="text-gray-500">Frontend Motion Engineering</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono border border-white/10 hover:border-cyan-500/30 transition-all group"
        >
          <span>BACK TO APEX</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  )
}
