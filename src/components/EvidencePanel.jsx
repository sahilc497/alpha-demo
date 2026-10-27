import React from 'react';
import { GitCompare, CheckCircle2, XCircle, AlertCircle, FileText, ArrowRight } from 'lucide-react';

export default function EvidencePanel({ 
  selectedClaim = null, 
  selectedEvidence = null,
  allClaims = [],
  allEvidence = []
}) {
  // If a claim is selected, show its evidence relations
  // If an evidence is selected, show which claims it connects to
  const relations = selectedClaim?.evidenceRelations || [];

  return (
    <div className="bg-[#080808] border border-[#1c1c1c] rounded-sm p-4 sm:p-5 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#161616]">
        <div className="flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-[#a1a1aa]" />
          <h3 className="font-display font-bold text-base uppercase tracking-wider text-white">
            Relationship Inspector
          </h3>
        </div>
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-[#121212] text-[#71717a] border border-[#222]">
          Bidirectional NLI
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[460px]">
        {selectedClaim ? (
          <div>
            {/* Selected Claim Banner */}
            <div className="p-3 rounded-sm bg-black border border-[#222] mb-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#71717a] mb-1">
                <span>Selected Claim Target:</span>
                <span className="text-white font-semibold">{selectedClaim.id}</span>
              </div>
              <p className="text-xs text-[#e4e4e7] leading-relaxed">
                "{selectedClaim.text}"
              </p>
            </div>

            {/* Formula calculation trace for this claim */}
            <div className="p-3 rounded-sm bg-[#050505] border border-[#1a1a1a] mb-4 text-[11px] font-mono">
              <div className="text-[10px] text-[#71717a] uppercase mb-1">
                Consensus Derivation:
              </div>
              <div className="text-[#a1a1aa]">
                Consensus({selectedClaim.id}) = ({selectedClaim.supportingSum ?? 0} &minus; {selectedClaim.contradictingSum ?? 0}) / ({selectedClaim.totalLinkedSim ?? 0} + &epsilon;) = <span className="text-white font-bold">{selectedClaim.consensus ?? 0}</span>
              </div>
              <div className="text-[#a1a1aa] mt-1">
                Claim Score = (({selectedClaim.consensus ?? 0} + 1) / 2) &times; 100 = <span className="text-white font-bold">{selectedClaim.claimScore ?? 0}%</span>
              </div>
            </div>

            {/* Relations list */}
            <div className="space-y-2.5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#71717a]">
                Linked Evidence Passages ({relations.length}):
              </div>

              {relations.length === 0 ? (
                <div className="p-4 rounded-sm bg-black/60 border border-dashed border-[#1f1f1f] text-center text-xs text-[#71717a]">
                  No direct evidence passages linked to this claim in the scenario.
                </div>
              ) : (
                relations.map((rel, idx) => {
                  const isSupport = rel.relationType === 'SUPPORT';
                  const isContradict = rel.relationType === 'CONTRADICT';

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-sm border ${
                        isSupport
                          ? 'bg-emerald-950/10 border-emerald-900/30'
                          : isContradict
                            ? 'bg-red-950/10 border-red-900/30'
                            : 'bg-zinc-950/20 border-zinc-800'
                      }`}
                    >
                      {/* Top status */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                          {isSupport && (
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>SUPPORT</span>
                            </span>
                          )}
                          {isContradict && (
                            <span className="inline-flex items-center gap-1 text-red-400 font-semibold">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>CONTRADICT</span>
                            </span>
                          )}
                          {!isSupport && !isContradict && (
                            <span className="inline-flex items-center gap-1 text-zinc-400 font-semibold">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>INSUFFICIENT</span>
                            </span>
                          )}
                          <span className="text-[#52525b]">&rarr;</span>
                          <span className="text-white">{rel.evidenceId}</span>
                        </div>

                        {/* Scores */}
                        <div className="text-[10px] font-mono flex items-center gap-2">
                          <span className="text-[#71717a]">
                            Sup: <strong className="text-white">{rel.supportingSimilarity ?? 0}</strong>
                          </span>
                          <span className="text-[#71717a]">
                            Con: <strong className="text-white">{rel.contradictingSimilarity ?? 0}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Source Title */}
                      {rel.docTitle && (
                        <div className="text-[10px] font-mono text-[#71717a] truncate mb-1">
                          Passage: {rel.docTitle}
                        </div>
                      )}

                      {/* Snippet */}
                      <p className="text-xs text-[#d4d4d8] leading-relaxed font-sans bg-black/40 p-2 rounded-sm border border-[#1a1a1a]">
                        "{rel.snippet}"
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : selectedEvidence ? (
          <div>
            {/* Selected Evidence Banner */}
            <div className="p-3 rounded-sm bg-black border border-[#222] mb-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#71717a] mb-1">
                <span>Selected Evidence Target:</span>
                <span className="text-white font-semibold">{selectedEvidence.id}</span>
              </div>
              <h4 className="text-xs font-mono font-medium text-white mb-1">
                {selectedEvidence.docTitle}
              </h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                "{selectedEvidence.text}"
              </p>
            </div>

            <div className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] mb-2">
              Claims Connected to {selectedEvidence.id}:
            </div>

            {/* Find claims that reference this evidence */}
            {allClaims.filter(c => (c.evidenceRelations || []).some(r => r.evidenceId === selectedEvidence.id)).map(c => {
              const rel = (c.evidenceRelations || []).find(r => r.evidenceId === selectedEvidence.id);
              return (
                <div key={c.id} className="p-3 rounded-sm bg-black/60 border border-[#1c1c1c] mb-2">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-white font-semibold">{c.id}</span>
                    <span className={rel.relationType === 'SUPPORT' ? 'text-emerald-400' : 'text-red-400'}>
                      {rel.relationType} ({rel.supportingSimilarity || rel.contradictingSimilarity})
                    </span>
                  </div>
                  <p className="text-xs text-[#a1a1aa]">
                    {c.text}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 px-4 rounded-sm bg-black/60 border border-dashed border-[#1f1f1f] text-center">
            <FileText className="w-6 h-6 text-[#52525b] mx-auto mb-2" />
            <p className="text-xs font-mono uppercase tracking-wider text-[#71717a]">
              No element selected
            </p>
            <p className="text-[11px] text-[#52525b] mt-1 max-w-xs mx-auto">
              Select a claim or evidence node from the graph to inspect bidirectional similarity metrics and textual citations.
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#141414] text-[10px] font-mono text-[#52525b] flex items-center justify-between">
        <span>Model: RoBERTa-MNLI &amp; DeBERTa Inference</span>
        <span className="text-[#71717a]">&epsilon; = 1e-5</span>
      </div>
    </div>
  );
}
