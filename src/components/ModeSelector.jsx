import React from 'react';
import { Database, ShieldCheck, Layers } from 'lucide-react';

export default function ModeSelector({ currentMode, onSelectMode }) {
  const modes = [
    {
      id: 'rag-only',
      name: 'RAG Only',
      sub: 'Standard Retrieval & Generation',
      desc: 'Retrieves knowledge base passages and generates answers. No trust scoring.',
      icon: Database
    },
    {
      id: 'trust-only',
      name: 'TRUST Index Only',
      sub: 'Direct Claim Verification',
      desc: 'Isolates candidate claims, evaluates evidence relations, and runs graph scoring.',
      icon: ShieldCheck
    },
    {
      id: 'combined',
      name: 'Combined RAG + TRUST',
      sub: 'Full Dual Pipeline',
      desc: 'Executes vector retrieval, generates LLM synthesis, and runs full verification.',
      icon: Layers
    }
  ];

  return (
    <div className="w-full bg-[#0a0a0a] border border-[#1c1c1c] rounded-sm p-1.5 grid grid-cols-1 md:grid-cols-3 gap-1.5">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = currentMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className={`flex items-start gap-3 p-3 text-left rounded-sm transition-all duration-150 ${
              isActive
                ? 'bg-[#181818] border border-white/40 shadow-sm text-white'
                : 'bg-transparent border border-transparent text-[#8e8e93] hover:text-white hover:bg-[#111111]'
            }`}
          >
            <div className={`mt-0.5 p-1.5 rounded-sm border ${
              isActive 
                ? 'bg-white text-black border-white' 
                : 'bg-[#141414] text-[#71717a] border-[#222222]'
            }`}>
              <Icon className="w-3.5 h-3.5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`font-display font-bold text-sm uppercase tracking-wider ${
                  isActive ? 'text-white' : 'text-[#d4d4d8]'
                }`}>
                  {mode.name}
                </span>
                {isActive && (
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 bg-white/10 text-white rounded-sm border border-white/20">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[11px] font-mono text-[#71717a] truncate mt-0.5">
                {mode.sub}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
