import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, HelpCircle, ChevronRight, Hash } from 'lucide-react';

export default function ClaimList({ 
  claims = [], 
  selectedClaimId = null, 
  onSelectClaim,
  weakestClaimId = null
}) {
  return (
    <div className="bg-[#080808] border border-[#1c1c1c] rounded-sm p-4 sm:p-5 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#161616]">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-[#a1a1aa]" />
          <h3 className="font-display font-bold text-base uppercase tracking-wider text-white">
            Decomposed Claims
          </h3>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-[#121212] text-[#71717a] border border-[#222]">
            Propositional Units
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#71717a]">
          {claims.length} claim{claims.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Claim Cards List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[460px]">
        {claims.length === 0 ? (
          <div className="py-12 px-4 rounded-sm bg-black/60 border border-dashed border-[#1f1f1f] text-center">
            <HelpCircle className="w-6 h-6 text-[#52525b] mx-auto mb-2" />
            <p className="text-xs font-mono uppercase tracking-wider text-[#71717a]">
              No claims detected
            </p>
            <p className="text-[11px] text-[#52525b] mt-1">
              Run the verification engine to parse propositions from the answer.
            </p>
          </div>
        ) : (
          claims.map((claim) => {
            const isSelected = selectedClaimId === claim.id;
            const isWeakest = weakestClaimId === claim.id;
            const relations = claim.evidenceRelations || [];
            
            // Calculate relation counts
            const supCount = relations.filter(r => r.relationType === 'SUPPORT').length;
            const conCount = relations.filter(r => r.relationType === 'CONTRADICT').length;
            const insCount = relations.filter(r => r.relationType === 'INSUFFICIENT').length;

            return (
              <div
                key={claim.id}
                onClick={() => onSelectClaim && onSelectClaim(claim.id)}
                className={`p-3.5 rounded-sm border cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#121212] border-white/50 shadow-sm'
                    : 'bg-black/60 border-[#1c1c1c] hover:border-[#2d2d2d] hover:bg-black'
                }`}
              >
                {/* Top status bar */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-sm bg-[#161616] border border-[#262626] flex items-center justify-center text-[10px] font-mono text-white font-semibold">
                      {claim.id}
                    </span>
                    {isWeakest && (
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded-sm bg-red-950/40 text-red-400 border border-red-800/40">
                        Weakest Link
                      </span>
                    )}
                  </div>

                  {/* Claim Score & Consensus */}
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="text-[#71717a]">Cons: {claim.consensus !== undefined ? claim.consensus : 0}</span>
                    <span className={`px-2 py-0.5 rounded-sm font-semibold border ${
                      (claim.claimScore ?? 0) >= 80 
                        ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800/40' 
                        : (claim.claimScore ?? 0) >= 50 
                          ? 'bg-amber-950/30 text-amber-400 border-amber-800/40' 
                          : 'bg-red-950/30 text-red-400 border-red-800/40'
                    }`}>
                      {claim.claimScore !== undefined ? `${claim.claimScore}%` : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Claim Statement */}
                <p className="text-xs text-[#e4e4e7] leading-relaxed font-sans mb-3">
                  {claim.text}
                </p>

                {/* Evidence Relations Badges */}
                <div className="pt-2 border-t border-[#141414] flex items-center justify-between text-[10px] font-mono">
                  <div className="flex items-center gap-2">
                    {supCount > 0 && (
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{supCount} Sup</span>
                      </span>
                    )}
                    {conCount > 0 && (
                      <span className="inline-flex items-center gap-1 text-red-400">
                        <XCircle className="w-3 h-3" />
                        <span>{conCount} Con</span>
                      </span>
                    )}
                    {insCount > 0 && (
                      <span className="inline-flex items-center gap-1 text-zinc-400">
                        <AlertCircle className="w-3 h-3" />
                        <span>{insCount} Gap</span>
                      </span>
                    )}
                    {relations.length === 0 && (
                      <span className="text-zinc-500">No linked evidence</span>
                    )}
                  </div>

                  <span className="text-[#52525b] group-hover:text-white flex items-center gap-0.5">
                    <span>Inspect</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer hint */}
      <div className="mt-3 pt-2.5 border-t border-[#141414] text-[10px] font-mono text-[#52525b]">
        Click any claim to highlight connected evidence in the graph.
      </div>
    </div>
  );
}
