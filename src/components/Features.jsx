import React from 'react';
import { Database, GitCompare, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Features({ onSelectFeature }) {
  const features = [
    {
      id: 'retrieval',
      number: '01',
      title: 'Evidence Retrieval',
      subtitle: 'Passage Alignment & Semantic Ranking',
      description: 'Inspect retrieved passages, vector relevance rankings, and the exact source paragraphs queried from knowledge repositories to formulate answers.',
      icon: Database,
      tag: 'Dense & Sparse Signals'
    },
    {
      id: 'claims',
      number: '02',
      title: 'Claim-Level Verification',
      subtitle: 'Atomic Decomposition & NLI Polarity',
      description: 'Isolate individual candidate claims to evaluate supporting, contradicting, or insufficient evidence relationships with directional similarity scores.',
      icon: GitCompare,
      tag: 'Polarity Analysis'
    },
    {
      id: 'trust-score',
      number: '03',
      title: 'Explainable Trust Score',
      subtitle: 'Weakest-Link Mathematical Aggregation',
      description: 'Explore how claim-evidence consensus balances into an un-gameable weakest-link metric, preventing single catastrophic hallucinations from being concealed by trivial truths.',
      icon: ShieldCheck,
      tag: 'Consensus Proof'
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#050505] border-b border-[#141414] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#1a1a1a] pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#71717a]">
              Architectural Capabilities
            </span>
            <h2 className="mt-2 font-display font-bold uppercase text-4xl sm:text-5xl md:text-6xl tracking-tight text-white">
              CORE VERIFICATION PILLARS
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs sm:text-sm text-[#8e8e93] leading-relaxed">
            Engineered to dismantle black-box confidence scores through atomic semantic alignment and formal consensus proofs.
          </p>
        </div>

        {/* 3 Minimal Feature Blocks with Thin Separators */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1a1a1a] border-t border-b border-[#1a1a1a]">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.id}
                onClick={() => onSelectFeature && onSelectFeature(feat.id)}
                className="group p-8 lg:p-10 bg-black/40 hover:bg-[#0a0a0a] transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Top row: Number and minimal icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-semibold text-[#52525b] group-hover:text-white transition-colors">
                      {feat.number}
                    </span>
                    <div className="w-10 h-10 rounded-sm bg-[#0d0d0d] border border-[#222222] flex items-center justify-center text-[#a1a1aa] group-hover:text-white group-hover:border-[#444] transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Feature Title */}
                  <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-white group-hover:text-silver-gradient transition-all">
                    {feat.title}
                  </h3>
                  
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] mt-1 mb-4">
                    {feat.subtitle}
                  </div>

                  {/* Body description */}
                  <p className="text-xs sm:text-sm text-[#8e8e93] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom link indicator */}
                <div className="mt-8 pt-4 border-t border-[#141414] flex items-center justify-between text-[11px] font-mono text-[#52525b] group-hover:text-white transition-colors">
                  <span>{feat.tag}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
