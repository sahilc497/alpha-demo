import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Navbar({ onLaunchDemo }) {
  const scrollToAsk = () => {
    const element = document.getElementById('ask');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/85 backdrop-blur-md border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Monogram and Brand */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-sm bg-[#121212] border border-[#2c2c2c] flex items-center justify-center font-display font-black text-white text-lg tracking-wider group-hover:border-[#666] transition-colors shadow-sm">
            T
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-[0.18em] text-white uppercase leading-none">
              TRUST INDEX
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#71717a] uppercase font-mono mt-0.5">
              Explainable AI Guardrail
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.16em] font-medium text-[#8e8e93]">
          <button 
            onClick={scrollToAsk}
            className="text-white hover:text-white transition-colors duration-150 py-1 font-semibold flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Ask Policy</span>
          </button>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white transition-colors duration-150 py-1"
          >
            Overview
          </button>
          <button 
            onClick={() => {
              const foot = document.getElementById('methodology');
              if (foot) foot.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors duration-150 py-1"
          >
            Policies
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Launch Demo Silver Pill CTA */}
          <button
            onClick={onLaunchDemo || scrollToAsk}
            className="silver-pill-btn px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Ask Question</span>
          </button>
        </div>
      </div>
    </header>
  );
}
