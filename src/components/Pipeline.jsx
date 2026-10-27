import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Database, 
  Cpu, 
  Scissors, 
  CheckCircle2, 
  ShieldAlert, 
  X, 
  Info,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Pipeline() {
  const [selectedStage, setSelectedStage] = useState(null);

  const stages = [
    {
      id: 'query',
      name: 'QUERY',
      sub: 'User Prompt Formulation',
      type: 'Input Parsing',
      icon: Search,
      summary: 'Raw employee question ingested by the system and expanded with policy semantic anchors.',
      details: 'The user formulates a policy or domain query. Semantic expansion ensures maximum vector retrieval coverage across knowledge base chunks.',
      behavior: 'Real-time query ingestion and semantic embedding transformation.'
    },
    {
      id: 'retrieval',
      name: 'RETRIEVAL',
      sub: 'Passage Semantic Search',
      type: 'Dense & Sparse Vector Search',
      icon: Database,
      summary: 'Knowledge base passages scored and ranked against the query embedding.',
      details: 'Handbook sections are chunked into contiguous semantic passages. Hybrid dense-sparse retrieval ranks the top matching policy articles.',
      behavior: 'Vector similarity search over enterprise handbook passages (Leave, Sick, Parental, Remote, Resignation).'
    },
    {
      id: 'generation',
      name: 'GENERATION',
      sub: 'LLM Synthesis',
      type: 'Mistral AI Engine',
      icon: Cpu,
      summary: 'Candidate response synthesized via Mistral AI (mistral-small-latest).',
      details: 'The language model synthesizes an answer conditioned on the retrieved context passages using a strict system prompt that prohibits ungrounded extrapolation.',
      behavior: 'Live synthesis via Mistral AI chat completions endpoint.'
    },
    {
      id: 'claims',
      name: 'CLAIMS',
      sub: 'Atomic Fact Extraction',
      type: 'Propositional Decomposer',
      icon: Scissors,
      summary: 'Candidate answer decomposed into isolated, independently verifiable atomic propositions.',
      details: 'Complex compound statements are parsed into single atomic claims (c in C). This prevents hallucinated clauses from hiding inside true sentences.',
      behavior: 'Propositional decomposition isolating each discrete factual statement for individual audit.'
    },
    {
      id: 'verification',
      name: 'VERIFICATION',
      sub: 'NLI Contradiction Analysis',
      type: 'Inference Engine',
      icon: CheckCircle2,
      summary: 'Bidirectional natural language inference classifying support, contradiction, or corpus gaps.',
      details: 'Each claim is paired with retrieved passages. Natural Language Inference models evaluate supporting similarity and contradiction probability.',
      behavior: 'Bidirectional NLI inference calculating directional alignment and contradiction penalties.'
    },
    {
      id: 'trust-score',
      name: 'TRUST SCORE',
      sub: 'Weakest-Link Aggregation',
      type: 'Algorithmic Proof',
      icon: ShieldAlert,
      summary: 'Consensus calculation and minimum-bound aggregation producing the final explainable metric.',
      details: 'Consensus(c) is calculated per claim. The system computes Overall Trust = min(ClaimScores), enforcing zero-tolerance for ungrounded fabrications.',
      behavior: 'Weakest-link aggregation enforcing mathematical immunity against unverified hallucinations.'
    }
  ];

  return (
    <section id="pipeline" className="py-24 bg-black border-b border-[#141414] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#1a1a1a] pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#71717a]">
              <span>Verification Lifecycle</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Full Pipeline</span>
            </div>
            <h2 className="mt-2 font-display font-bold uppercase text-4xl sm:text-5xl md:text-6xl tracking-tight text-white">
              END-TO-END WORKFLOW
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs sm:text-sm text-[#8e8e93] leading-relaxed">
            Click any phase to inspect the verification mechanics and see how live LLM synthesis couples with deterministic consensus proofs.
          </p>
        </div>

        {/* Workflow Horizontal Track */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 lg:gap-4">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = selectedStage?.id === stage.id;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                onClick={() => setSelectedStage(stage)}
                className={`group relative p-5 rounded-sm border cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[170px] ${
                  isSelected 
                    ? 'bg-[#121212] border-white/60 shadow-silver-glow-sm' 
                    : 'bg-[#080808] border-[#1c1c1c] hover:border-[#383838] hover:bg-[#0d0d0d]'
                }`}
              >
                {/* Arrow connector on desktop */}
                {idx < stages.length - 1 && (
                  <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-[#333] group-hover:text-[#666] transition-colors pointer-events-none">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-[#52525b]">
                      STEP 0{idx + 1}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-sm bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                      Active
                    </span>
                  </div>

                  <div className="w-7 h-7 rounded-sm bg-black border border-[#222] flex items-center justify-center text-white mb-3 group-hover:border-[#555] transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white">
                    {stage.name}
                  </h3>
                  <p className="text-[11px] text-[#8e8e93] font-mono leading-tight mt-1">
                    {stage.sub}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#161616] flex items-center justify-between text-[10px] font-mono text-[#52525b] group-hover:text-white transition-colors">
                  <span>View Details</span>
                  <Info className="w-3 h-3" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Stage Detail Drawer */}
        <AnimatePresence>
          {selectedStage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 overflow-hidden"
            >
              <div className="p-6 sm:p-8 rounded-sm bg-[#0a0a0a] border border-[#262626] relative">
                <button
                  onClick={() => setSelectedStage(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-sm bg-[#141414] text-[#8e8e93] hover:text-white hover:bg-[#1c1c1c] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#71717a] uppercase">
                      <span>Stage Details</span>
                      <span>&bull;</span>
                      <span className="text-white">{selectedStage.name}</span>
                      <span>&bull;</span>
                      <span className="text-[#a1a1aa]">{selectedStage.sub}</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-white mb-3">
                      {selectedStage.summary}
                    </h3>
                    <p className="text-sm text-[#a1a1aa] leading-relaxed mb-4">
                      {selectedStage.details}
                    </p>
                  </div>

                  <div className="p-4 bg-black rounded-sm border border-[#1f1f1f] flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] mb-1">
                        Operational Logic
                      </div>
                      <p className="text-xs text-[#d4d4d8] leading-relaxed font-mono">
                        {stageBehavior(selectedStage)}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1a1a1a] flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#71717a]">Engine Architecture:</span>
                      <span className="text-white font-medium">{selectedStage.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

function stageBehavior(stage) {
  return stage.behavior || "Executed live as part of the core verification pipeline.";
}
