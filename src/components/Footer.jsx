import React from 'react';
import { Shield, ExternalLink, ArrowUp } from 'lucide-react';

export default function Footer({ onScrollTop }) {
  return (
    <footer id="methodology" className="bg-black border-t border-[#1a1a1a] py-16 text-[#71717a] font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#141414]">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-[#111] border border-[#2a2a2a] flex items-center justify-center font-display font-black text-white text-base">
                T
              </div>
              <span className="font-display font-bold text-white uppercase text-base tracking-widest">
                TRUST INDEX
              </span>
            </div>
            <p className="text-[#8e8e93] font-sans text-xs leading-relaxed">
              An explainable trust-verification framework for Retrieval-Augmented Generation systems. Decomposing candidate answers, tracing bidirectional evidence, and proving weakest-link bounds.
            </p>
          </div>

          {/* Core Framework */}
          <div>
            <div className="text-white uppercase font-bold text-[11px] tracking-widest mb-3">
              Core Framework
            </div>
            <ul className="space-y-2 text-[#8e8e93]">
              <li>Propositional Decomposition</li>
              <li>Bidirectional NLI Signals</li>
              <li>Consensus Normalization</li>
              <li>Weakest-Link Invariant</li>
            </ul>
          </div>

          {/* Operational Modes */}
          <div>
            <div className="text-white uppercase font-bold text-[11px] tracking-widest mb-3">
              Operational Modes
            </div>
            <ul className="space-y-2 text-[#8e8e93]">
              <li>Mode 1: RAG Only</li>
              <li>Mode 2: TRUST Index Only</li>
              <li>Mode 3: Combined RAG + TRUST</li>
              <li>Mistral AI Live Synthesis</li>
            </ul>
          </div>

          {/* Benchmark Scenarios */}
          <div>
            <div className="text-white uppercase font-bold text-[11px] tracking-widest mb-3">
              HR Policy Benchmarks
            </div>
            <ul className="space-y-2 text-[#8e8e93]">
              <li>1. Sick Encashment Clash</li>
              <li>2. Remote Stipend Inversion</li>
              <li>3. Paternity Leave Window</li>
              <li>4. Resignation Notice Period</li>
              <li>5. Pet Bereavement Void</li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            &copy; 2026 TRUST Index Group &middot; Explainable AI &amp; Trust Verification Framework
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#52525b]">Powered by Mistral AI &middot; Weakest-Link Engine</span>
            <button
              onClick={onScrollTop}
              className="hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
