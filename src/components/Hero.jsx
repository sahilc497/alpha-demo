import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero({ onLaunchDemo }) {
  const scrollToAsk = () => {
    const askSec = document.getElementById('ask');
    if (askSec) {
      askSec.scrollIntoView({ behavior: 'smooth' });
    } else if (onLaunchDemo) {
      onLaunchDemo();
    }
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center bg-black overflow-hidden border-b border-[#141414] px-4 sm:px-6 lg:px-8">
      
      {/* Subtle oversized background word behind hero heading */}
      <div 
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden z-0"
      >
        <span className="font-display font-black text-[18vw] leading-none uppercase tracking-tightest text-white/[0.025] blur-[1px]">
          EVIDENCE
        </span>
      </div>

      {/* Subtle background grid pattern */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:24px_24px] opacity-40 z-0"
      />

      {/* Subtle top spotlight glow in silver/white */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-gradient-to-b from-white/[0.04] to-transparent blur-3xl z-0"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center pt-8 pb-16 flex flex-col items-center">
        
        {/* Pre-badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d0d0d] border border-[#222222] mb-8 text-[11px] font-mono tracking-[0.2em] uppercase text-[#a1a1aa] shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Enterprise Guardrail &middot; Weakest-Link Verification</span>
        </div>

        {/* Hero Display Heading */}
        <h1 className="font-display font-black uppercase text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tightest leading-[0.88] text-silver-gradient select-none">
          TRUST INDEX
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 font-display font-bold uppercase text-xl sm:text-2xl md:text-3xl tracking-[0.22em] text-[#d4d4d8]">
          VERIFY WHAT YOUR AI KNOWS.
        </p>

        {/* Supporting Explanation */}
        <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-[#8e8e93] font-normal leading-relaxed">
          An explainable trust-verification framework for Retrieval-Augmented Generation systems. Decomposing candidate answers, mapping bidirectional claim evidence, and computing weakest-link consensus.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
          <button
            onClick={scrollToAsk}
            className="w-full sm:w-auto silver-pill-btn px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2 group"
          >
            <span>Ask Policy Question</span>
            <ArrowRight className="w-4 h-4 text-black transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Live Metrics preview strip */}
        <div className="mt-16 w-full max-w-3xl border-t border-b border-[#191919] py-4 grid grid-cols-3 divide-x divide-[#191919] text-center font-mono text-xs">
          <div>
            <div className="text-[#666] uppercase text-[10px] tracking-widest">Model Agnostic</div>
            <div className="text-white font-medium mt-1">Claim-Level Graph</div>
          </div>
          <div>
            <div className="text-[#666] uppercase text-[10px] tracking-widest">Aggregation</div>
            <div className="text-white font-medium mt-1">Weakest-Link Proof</div>
          </div>
          <div>
            <div className="text-[#666] uppercase text-[10px] tracking-widest">Explainability</div>
            <div className="text-white font-medium mt-1">Direct Evidence Citation</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          onClick={scrollToAsk}
          className="mt-10 flex flex-col items-center gap-1 text-[#52525b] hover:text-[#a1a1aa] transition-colors cursor-pointer text-[10px] font-mono tracking-widest uppercase"
        >
          <span>Scroll to ask</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>

      </div>
    </section>
  );
}
