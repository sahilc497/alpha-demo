import React, { useState } from 'react';
import { BookOpen, Check, AlertCircle, Copy, ShieldCheck } from 'lucide-react';

export default function ResearchOverview() {
  const [copiedFormula, setCopiedFormula] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedFormula(id);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  const methodologySteps = [
    {
      step: '01',
      title: 'Claim Extraction',
      badge: 'Propositional Parsing',
      description: 'The candidate response R is decomposed into a set of atomic, self-contained claims C = {c_1, c_2, ..., c_n}. Every claim is structured to have independent truth value, preventing factual errors from being disguised within complex sentences.',
      implNote: 'Propositional Extraction Engine with semantic boundary detection.'
    },
    {
      step: '02',
      title: 'Semantic Evidence Alignment',
      badge: 'Dense-Sparse Retrieval',
      description: 'Candidate passages E are retrieved from the enterprise corpus using hybrid dense embeddings and lexical matching. Each passage e in E is aligned with claims c in C based on semantic relevance thresholds.',
      implNote: 'Dual-encoder passage alignment over indexed enterprise documents.'
    },
    {
      step: '03',
      title: 'Contradiction Analysis',
      badge: 'Bidirectional NLI',
      description: 'For each claim-passage pair (c, e), bidirectional Natural Language Inference predicts probabilities for Entailment (support), Contradiction, and Neutral. Direct negation and numerical mismatches yield high contradiction penalties.',
      implNote: 'Bidirectional NLI classifier with explicit numeric and polarity checking.'
    },
    {
      step: '04',
      title: 'Evidence Graph Construction',
      badge: 'Bipartite Mapping',
      description: 'A directed bipartite graph G = (C, E, V) is assembled where nodes represent claims and evidence, and weighted edges represent directional support and contradiction vectors.',
      implNote: 'Dynamic bipartite graph traversal with interactive synchronized inspection.'
    },
    {
      step: '05',
      title: 'Consensus Scoring',
      badge: 'Differential Balance',
      description: 'Each claim consensus balances supporting evidence against contradicting evidence normalized over total linked similarity: Consensus(c) = (Sim_sup - Sim_con) / (Sim_tot + epsilon).',
      implNote: 'Real-time differential consensus calculus computed per atomic claim.'
    },
    {
      step: '06',
      title: 'Weakest-Link Aggregation',
      badge: 'Min-Bound Invariant',
      description: 'Rather than averaging claim scores—which allows high-confidence trivial claims to mask lethal hallucinations—TRUST Index computes: OverallTrustScore = min_{c in C} ClaimScore(c).',
      implNote: 'Zero-tolerance minimum bound invariant enforced across all evaluations.'
    }
  ];

  return (
    <section id="research" className="py-24 bg-[#050505] border-b border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#1a1a1a] pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#71717a]">
              Formal Framework
            </span>
            <h2 className="mt-2 font-display font-bold uppercase text-4xl sm:text-5xl md:text-6xl tracking-tight text-white">
              RESEARCH METHODOLOGY
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#0c0c0c] border border-[#222] text-xs font-mono text-[#a1a1aa]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mathematical Trust Verification Engine</span>
          </div>
        </div>

        {/* Mathematical Formulas Card */}
        <div className="mb-16 p-6 sm:p-8 rounded-sm bg-black border border-[#222222] relative">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#181818]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white" />
              <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                Mathematical Formulations
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#71717a] uppercase">
              Eq. 1 &mdash; 3
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Formula 1: Consensus */}
            <div className="p-4 rounded-sm bg-[#080808] border border-[#1a1a1a] relative group">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a] mb-2">
                <span>1. Claim Consensus</span>
                <button
                  onClick={() => copyToClipboard("Consensus(c) = (sum(Sim_sup) - sum(Sim_con)) / (sum(Sim_tot) + epsilon)", "f1")}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-silver-300"
                  title="Copy formula"
                >
                  {copiedFormula === 'f1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="font-mono text-sm text-[#e4e4e7] py-2 px-3 bg-black rounded-sm border border-[#171717] overflow-x-auto">
                <code>Consensus(c) = <span className="text-white">(S<sub className="text-[10px]">sup</sub> - S<sub className="text-[10px]">con</sub>)</span> / <span className="text-[#a1a1aa]">(S<sub className="text-[10px]">tot</sub> + &epsilon;)</span></code>
              </div>
              <p className="mt-2 text-[11px] text-[#71717a] leading-tight">
                Normalized in [-1, +1]. Quantifies evidence polarity balance per claim.
              </p>
            </div>

            {/* Formula 2: Claim Score */}
            <div className="p-4 rounded-sm bg-[#080808] border border-[#1a1a1a] relative group">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a] mb-2">
                <span>2. Calibrated Claim Score</span>
                <button
                  onClick={() => copyToClipboard("ClaimScore(c) = ((Consensus(c) + 1) / 2) * 100", "f2")}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-silver-300"
                  title="Copy formula"
                >
                  {copiedFormula === 'f2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="font-mono text-sm text-[#e4e4e7] py-2 px-3 bg-black rounded-sm border border-[#171717] overflow-x-auto">
                <code>ClaimScore(c) = <span className="text-white">((Consensus(c) + 1) / 2)</span> &times; 100</code>
              </div>
              <p className="mt-2 text-[11px] text-[#71717a] leading-tight">
                Scaled linearly to [0, 100]. Enables intuitive verification thresholding.
              </p>
            </div>

            {/* Formula 3: Weakest Link */}
            <div className="p-4 rounded-sm bg-[#080808] border border-[#1a1a1a] relative group">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a] mb-2">
                <span>3. Weakest-Link Invariant</span>
                <button
                  onClick={() => copyToClipboard("OverallTrust = min_{c in C} ClaimScore(c)", "f3")}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-silver-300"
                  title="Copy formula"
                >
                  {copiedFormula === 'f3' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="font-mono text-sm text-[#e4e4e7] py-2 px-3 bg-black rounded-sm border border-[#171717] overflow-x-auto">
                <code>OverallTrust = <span className="text-white">min<sub className="text-[10px]">c&isin;C</sub> ClaimScore(c)</span></code>
              </div>
              <p className="mt-2 text-[11px] text-[#71717a] leading-tight">
                Zero tolerance for hallucinations. Minimum claim score bounds total trust.
              </p>
            </div>

          </div>
        </div>

        {/* 6 Step Methodology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {methodologySteps.map((m) => (
            <div 
              key={m.step}
              className="p-6 rounded-sm bg-black/60 border border-[#1a1a1a] hover:border-[#2e2e2e] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-semibold text-[#52525b]">
                    {m.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#111] text-[#9ca3af] border border-[#222]">
                    {m.badge}
                  </span>
                </div>

                <h4 className="font-display font-bold text-xl uppercase tracking-wide text-white mb-2">
                  {m.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#8e8e93] leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#141414] text-[10px] font-mono text-[#52525b]">
                <span className="text-[#71717a]">Architecture:</span> {m.implNote}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
