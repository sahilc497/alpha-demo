import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, HelpCircle, Activity } from 'lucide-react';
import { VERDICTS } from '../lib/trustEngine';

export default function TrustScoreGauge({ 
  overallScore = null, 
  verdict = "INCONCLUSIVE", 
  weakestClaim = null,
  evaluatedClaims = [],
  summary = ""
}) {
  const meta = VERDICTS[verdict] || VERDICTS.INCONCLUSIVE;
  const isNumeric = typeof overallScore === 'number';

  // Compute ring stroke dash
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const scoreClamped = Math.max(0, Math.min(100, overallScore || 0));
  const strokeDashoffset = isNumeric ? circumference - (scoreClamped / 100) * circumference : circumference;

  return (
    <div className="bg-[#080808] border border-[#1c1c1c] rounded-sm p-5 flex flex-col justify-between">
      
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#161616]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#a1a1aa]" />
          <h3 className="font-display font-bold text-base uppercase tracking-wider text-white">
            TRUST Score &amp; Verdict
          </h3>
        </div>
        <div className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-[#121212] text-[#71717a] border border-[#222]">
          Weakest-Link Bound
        </div>
      </div>

      {/* Main Gauge & Verdict Block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center my-auto">
        
        {/* Circular Gauge */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
              {/* Background circle */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="stroke-[#181818]"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress circle */}
              {isNumeric && (
                <circle
                  cx="65"
                  cy="65"
                  r={radius}
                  stroke={meta.color}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              )}
            </svg>

            {/* Inner text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {isNumeric ? (
                <>
                  <span className="font-display font-bold text-4xl text-white leading-none tracking-tight">
                    {Math.round(overallScore)}
                  </span>
                  <span className="text-[10px] font-mono text-[#71717a] uppercase tracking-widest mt-1">
                    out of 100
                  </span>
                </>
              ) : (
                <>
                  <span className="font-display font-bold text-2xl text-[#71717a] leading-none uppercase">
                    N / A
                  </span>
                  <span className="text-[9px] font-mono text-[#52525b] uppercase mt-1">
                    No Evidence
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Verdict Badge & Metrics */}
        <div className="space-y-3 flex flex-col justify-center">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] mb-1">
              Final Verdict
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border ${meta.badgeBg}`}>
              {verdict === 'TRUSTED' && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
              {verdict === 'HALLUCINATED' && <ShieldAlert className="w-4 h-4 text-red-400" />}
              {verdict === 'UNCERTAIN' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              {verdict === 'INCONCLUSIVE' && <HelpCircle className="w-4 h-4 text-zinc-400" />}
              <span className="font-display font-bold text-base uppercase tracking-wider">
                {meta.label}
              </span>
              <span className="text-[10px] font-mono opacity-70">
                ({meta.range})
              </span>
            </div>
          </div>

          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            {meta.description}
          </p>

          {/* Weakest link note */}
          {weakestClaim && isNumeric && (
            <div className="p-2.5 rounded-sm bg-black border border-[#1a1a1a] text-[11px] font-mono">
              <span className="text-[#71717a]">Weakest Claim: </span>
              <span className="text-white font-semibold">{weakestClaim.id}</span>
              <span className="text-[#71717a]"> scored </span>
              <span className="text-white font-semibold">{weakestClaim.claimScore}%</span>
            </div>
          )}
        </div>

      </div>

      {/* Threshold Reference strip */}
      <div className="mt-5 pt-3 border-t border-[#141414] grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
        <div className="p-1 rounded-sm bg-black/40 border border-[#161616]">
          <span className="text-emerald-400 font-semibold">80&ndash;100:</span>
          <span className="text-[#71717a] ml-1">Trusted</span>
        </div>
        <div className="p-1 rounded-sm bg-black/40 border border-[#161616]">
          <span className="text-amber-400 font-semibold">50&ndash;79:</span>
          <span className="text-[#71717a] ml-1">Uncertain</span>
        </div>
        <div className="p-1 rounded-sm bg-black/40 border border-[#161616]">
          <span className="text-red-400 font-semibold">0&ndash;49:</span>
          <span className="text-[#71717a] ml-1">Hallucinated</span>
        </div>
      </div>

    </div>
  );
}
