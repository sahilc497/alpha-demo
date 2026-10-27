import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ArrowRight, 
  Sparkles,
  Zap,
  HelpCircle,
  Eye,
  RotateCcw
} from 'lucide-react';

export default function RagVsTrustComparison({ 
  scenario, 
  onSelectScenario, 
  isMistralLive = false,
  onOpenSettings 
}) {
  const [showExplanation, setShowExplanation] = useState(true);

  if (!scenario) return null;

  return (
    <div className="w-full bg-[#060606] border border-[#222222] rounded-sm p-5 sm:p-7 shadow-2xl relative overflow-hidden mb-10">
      
      {/* Top Banner Tag */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 mb-6 border-b border-[#1c1c1c] gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#a1a1aa] mb-1">
            <Zap className="w-3.5 h-3.5 text-white" />
            <span>Core Research Demonstration</span>
            <span className="text-[#52525b]">&bull;</span>
            <span className="text-white">Normal RAG vs. TRUST Index</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wide text-white">
            WHY NORMAL RAG FAILS &amp; HOW TRUST INDEX PROTECTS YOU
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSettings}
            className={`text-xs font-mono px-3 py-1.5 rounded-sm border transition-all flex items-center gap-1.5 ${
              isMistralLive
                ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800/40'
                : 'bg-[#111] text-[#8e8e93] hover:text-white border-[#262626]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isMistralLive ? 'Mistral Live Active' : 'Configure Mistral API'}</span>
          </button>
        </div>
      </div>

      {/* Query Banner */}
      <div className="mb-6 p-4 rounded-sm bg-black border border-[#1f1f1f]">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#71717a] mb-1">
          <span>Employee Query (HR Policy Handbook):</span>
          <span className="text-[#a1a1aa]">{scenario.category}</span>
        </div>
        <p className="text-sm font-sans font-medium text-white">
          "{scenario.query}"
        </p>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* LEFT COLUMN: NORMAL RAG */}
        <div className="p-5 rounded-sm bg-[#080808] border border-red-950/40 relative flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#181818]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-sm bg-red-950/40 border border-red-800/40 flex items-center justify-center text-red-400">
                  <XCircle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base uppercase tracking-wider text-red-400">
                    Standard Unchecked RAG
                  </h4>
                  <div className="text-[10px] font-mono text-[#71717a]">
                    No Propositional Verification &bull; Blind Acceptance
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-red-950/40 text-red-400 border border-red-900/50">
                Hallucination Prone
              </span>
            </div>

            {/* Answer Display */}
            <div className="p-3.5 rounded-sm bg-black/80 border border-[#1c1c1c] mb-4">
              <div className="text-[10px] font-mono uppercase text-[#71717a] mb-1">
                Generated LLM Output:
              </div>
              <p className="text-xs sm:text-sm text-[#e4e4e7] leading-relaxed font-sans select-text">
                {scenario.normalRagOutput}
              </p>
            </div>

            {/* Critique of Normal RAG */}
            <div className="p-3 rounded-sm bg-red-950/20 border border-red-900/30 text-xs font-mono space-y-1.5 text-red-300">
              <div className="flex items-center gap-1.5 font-bold uppercase text-[11px] text-red-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>The Black-Box Failure:</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                Normal RAG gives zero evidence breakdown. The response reads fluently with authoritative confidence, but invents rules that violate statutory policy. Employees and managers acting on this advice risk compliance penalties or unauthorized payouts.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#161616] flex items-center justify-between text-[10px] font-mono text-[#71717a]">
            <span>Verification Status: None</span>
            <span className="text-red-400">False Confidence</span>
          </div>
        </div>

        {/* RIGHT COLUMN: TRUST INDEX */}
        <div className="p-5 rounded-sm bg-[#080808] border border-emerald-950/40 relative flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#181818]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-sm bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base uppercase tracking-wider text-emerald-400">
                    TRUST Index Guardrail
                  </h4>
                  <div className="text-[10px] font-mono text-[#71717a]">
                    Propositional Proof &bull; Weakest-Link Consensus
                  </div>
                </div>
              </div>

              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm border ${
                scenario.expectedVerdict === 'TRUSTED'
                  ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40'
                  : scenario.expectedVerdict === 'UNCERTAIN'
                    ? 'bg-amber-950/40 text-amber-400 border-amber-800/40'
                    : 'bg-red-950/40 text-red-400 border-red-800/40'
              }`}>
                Verdict: {scenario.expectedVerdict}
              </span>
            </div>

            {/* Claims Audit Breakdown */}
            <div className="space-y-2 mb-4">
              <div className="text-[10px] font-mono uppercase text-[#71717a]">
                Atomic Proposition Verification:
              </div>

              {scenario.claims.map((claim) => {
                const rel = claim.evidenceRelations?.[0];
                const isContradicted = rel?.relationType === 'CONTRADICT';
                const isSupported = rel?.relationType === 'SUPPORT';

                return (
                  <div
                    key={claim.id}
                    className={`p-2.5 rounded-sm border text-xs font-mono ${
                      isContradicted
                        ? 'bg-red-950/20 border-red-900/40 text-red-300'
                        : isSupported
                          ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300'
                          : 'bg-zinc-900/40 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span>[{claim.id}] {isContradicted ? 'CONTRADICTED CLASH' : isSupported ? 'EVIDENCE SUPPORTED' : 'CORPUS GAP'}</span>
                      <span>{isContradicted ? `Con: ${(rel?.contradictingSimilarity || 0.95)}` : isSupported ? `Sup: ${(rel?.supportingSimilarity || 0.95)}` : 'Gap'}</span>
                    </div>
                    <p className="font-sans text-[11px] opacity-90 line-through-if-contradicted">
                      "{claim.text}"
                    </p>
                    {rel?.snippet && (
                      <div className="mt-1 pt-1 border-t border-white/10 text-[10px] opacity-75">
                        &rarr; Policy Ref: {rel.docTitle}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Rectified Safe Output */}
            {scenario.trustVerifiedAnswer && (
              <div className="p-3.5 rounded-sm bg-black border border-[#222]">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-emerald-400 mb-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>TRUST Index Rectified Safe Answer:</span>
                </div>
                <p className="text-xs text-[#d4d4d8] leading-relaxed font-sans">
                  {scenario.trustVerifiedAnswer}
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-[#161616] flex items-center justify-between text-[10px] font-mono text-[#71717a]">
            <span>Algorithm: Weakest-Link Invariant</span>
            <span className="text-white">Protected from Hallucination</span>
          </div>
        </div>

      </div>

      {/* Comparison Explainer Strip */}
      <div className="mt-6 pt-4 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8e8e93] font-mono gap-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Notice: TRUST Index doesn't just score answers; it pinpoints and rectifies the exact violating propositions.</span>
        </div>
        <div className="text-[11px] text-[#52525b]">
          Curated for HR Handbooks, Financial Disclosures &amp; Statutory Compliance
        </div>
      </div>

    </div>
  );
}
