import React, { useState } from 'react';
import { Database, FileText, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export default function RetrievalVisualizer({ 
  retrievedPassages = [], 
  isLoading = false,
  selectedKbName = "",
  selectedChunkId = null,
  onSelectChunk
}) {
  const [expandedChunkId, setExpandedChunkId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedChunkId(prev => prev === id ? null : id);
  };

  return (
    <div className="bg-[#080808] border border-[#1c1c1c] rounded-sm p-4 sm:p-5 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#161616]">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-[#a1a1aa]" />
          <h3 className="font-display font-bold text-base uppercase tracking-wider text-white">
            Retrieved Passages
          </h3>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-[#121212] text-emerald-400 border border-emerald-900/40">
            Vector Index
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#71717a]">
          {retrievedPassages.length} chunk{retrievedPassages.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Selected KB strip */}
      {selectedKbName && (
        <div className="mb-3 px-3 py-1.5 rounded-sm bg-black border border-[#181818] text-[11px] font-mono flex items-center justify-between">
          <span className="text-[#71717a]">Target Policy Corpus:</span>
          <span className="text-white truncate max-w-[240px] font-medium" title={selectedKbName}>
            {selectedKbName}
          </span>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[460px]">
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mb-3" />
            <p className="text-xs font-mono uppercase tracking-widest text-[#a1a1aa]">
              Scanning Vector Index...
            </p>
            <p className="text-[11px] text-[#52525b] mt-1">
              Executing passage semantic alignment
            </p>
          </div>
        ) : retrievedPassages.length === 0 ? (
          <div className="py-12 px-4 rounded-sm bg-black/60 border border-dashed border-[#1f1f1f] text-center">
            <AlertCircle className="w-6 h-6 text-[#52525b] mx-auto mb-2" />
            <p className="text-xs font-mono uppercase tracking-wider text-[#71717a]">
              No matching policy passages retrieved
            </p>
            <p className="text-[11px] text-[#52525b] mt-1 max-w-xs mx-auto">
              Corpus gap: The indexed company policies do not contain provisions matching this query.
            </p>
          </div>
        ) : (
          retrievedPassages.map((chunk, idx) => {
            const isSelected = selectedChunkId === chunk.id;
            const isExpanded = expandedChunkId === chunk.id;

            return (
              <div
                key={chunk.id || idx}
                onClick={() => {
                  if (onSelectChunk) onSelectChunk(chunk.id);
                }}
                className={`p-3.5 rounded-sm border cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#121212] border-white/50 shadow-sm'
                    : 'bg-black/60 border-[#1c1c1c] hover:border-[#2d2d2d] hover:bg-black'
                }`}
              >
                {/* Passage header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-sm bg-[#161616] border border-[#262626] flex items-center justify-center text-[10px] font-mono text-[#d4d4d8] flex-shrink-0">
                      {chunk.id || `E${idx + 1}`}
                    </span>
                    <span className="font-mono text-xs text-white truncate font-medium">
                      {chunk.docTitle || chunk.title || `Passage #${idx + 1}`}
                    </span>
                  </div>

                  {/* Relevance Score Pill */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-[10px] font-mono text-[#71717a]">Sim:</span>
                    <span className="text-xs font-mono font-semibold text-white px-1.5 py-0.2 rounded-sm bg-[#181818] border border-[#2b2b2b]">
                      {(chunk.relevanceScore || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Source attribution */}
                {chunk.source && (
                  <div className="text-[10px] font-mono text-[#71717a] truncate mb-2">
                    Source: {chunk.source}
                  </div>
                )}

                {/* Passage Text */}
                <p className={`text-xs text-[#a1a1aa] leading-relaxed font-sans ${
                  isExpanded ? '' : 'line-clamp-3'
                }`}>
                  {chunk.text}
                </p>

                {/* Expand / Collapse toggle */}
                <div className="mt-2 pt-2 border-t border-[#141414] flex items-center justify-between text-[10px] font-mono text-[#52525b]">
                  <span className="text-[9px] uppercase tracking-wider text-[#52525b]">
                    Section Chunk: #{chunk.chunkIndex ?? idx}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(chunk.id);
                    }}
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Collapse' : 'Expand full text'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer explanation */}
      <div className="mt-3 pt-2.5 border-t border-[#141414] text-[10px] font-mono text-[#52525b] flex items-center justify-between">
        <span>Scoring: Cosine similarity over normalized passage embeddings</span>
        <span className="text-emerald-400">Indexed</span>
      </div>
    </div>
  );
}
