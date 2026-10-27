import React, { useState } from 'react';
import { Cpu, Sparkles, Copy, Check, Edit3, RotateCcw, AlertTriangle } from 'lucide-react';

export default function GeneratedAnswer({
  answer = "",
  isLive = true,
  isLoading = false,
  modelName = "mistral-small-latest",
  onAnswerChange,
  onRegenerate,
  error = null
}) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#080808] border border-[#1c1c1c] rounded-sm p-4 sm:p-5 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#161616]">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#a1a1aa]" />
          <h3 className="font-display font-bold text-base uppercase tracking-wider text-white">
            Synthesized Answer
          </h3>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Mistral AI ({modelName})</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 rounded-sm text-[#71717a] hover:text-white transition-colors"
            title={isEditing ? "View formatted text" : "Edit candidate answer text"}
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded-sm text-[#71717a] hover:text-white transition-colors"
            title="Copy answer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Answer Body */}
      <div className="flex-1 flex flex-col justify-between">
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mb-3" />
            <p className="text-xs font-mono uppercase tracking-widest text-[#a1a1aa]">
              Synthesizing Response...
            </p>
            <p className="text-[11px] text-[#52525b] mt-1 font-mono">
              Generating completion via {modelName}
            </p>
          </div>
        ) : error ? (
          <div className="p-4 rounded-sm bg-red-950/20 border border-red-900/40 text-left my-auto">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono uppercase font-semibold mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Generation Notice</span>
            </div>
            <p className="text-xs text-red-300 leading-relaxed font-mono">
              {error}
            </p>
          </div>
        ) : isEditing ? (
          <div className="flex-1 flex flex-col">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] mb-1.5">
              Edit Candidate Answer for Verification:
            </label>
            <textarea
              value={answer}
              onChange={(e) => onAnswerChange && onAnswerChange(e.target.value)}
              rows={6}
              className="w-full flex-1 p-3 bg-black border border-[#2a2a2a] rounded-sm text-xs sm:text-sm text-white font-sans focus:outline-none focus:border-white/50 transition-colors resize-none leading-relaxed"
            />
          </div>
        ) : (
          <div className="p-4 rounded-sm bg-black/60 border border-[#1c1c1c] flex-1">
            <p className="text-xs sm:text-sm text-[#e4e4e7] leading-relaxed font-sans select-text">
              {answer || "No response generated. Run the pipeline to formulate an answer."}
            </p>
          </div>
        )}

        {/* Footer controls */}
        <div className="mt-3 pt-2.5 border-t border-[#141414] flex items-center justify-between text-[10px] font-mono text-[#52525b]">
          <span className="truncate max-w-[280px]">
            Model: mistral-small-latest
          </span>
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isLoading}
              className="text-[#8e8e93] hover:text-white transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Re-run</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
