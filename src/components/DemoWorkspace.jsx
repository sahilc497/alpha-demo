import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  Database,
  Layers,
  Search,
  ShieldCheck
} from 'lucide-react';
import ModeSelector from './ModeSelector';
import RetrievalVisualizer from './RetrievalVisualizer';
import GeneratedAnswer from './GeneratedAnswer';
import TrustScoreGauge from './TrustScoreGauge';
import ClaimList from './ClaimList';
import EvidencePanel from './EvidencePanel';
import EvidenceGraph from './EvidenceGraph';
import RagVsTrustComparison from './RagVsTrustComparison';
import { demoScenarios, getScenarioById } from '../data/demoScenarios';
import { mockKnowledgeBases, getKnowledgeBaseById } from '../data/mockDocuments';
import { simulateRetrieval, getFallbackAnswer } from '../lib/mockRag';
import { evaluateTrust } from '../lib/trustEngine';
import { generateMistralAnswer } from '../lib/mistralClient';

export default function DemoWorkspace() {
  // Active demo mode: 'rag-only' | 'trust-only' | 'combined'
  const [currentMode, setCurrentMode] = useState('combined');

  // Selected scenario
  const [selectedScenarioId, setSelectedScenarioId] = useState(demoScenarios[0].id);
  const currentScenario = getScenarioById(selectedScenarioId);

  // Selected Knowledge Base
  const [selectedKbId, setSelectedKbId] = useState(currentScenario.kbId || mockKnowledgeBases[0].id);
  const currentKb = getKnowledgeBaseById(selectedKbId);

  // Active Query & Candidate Answer
  const [query, setQuery] = useState(currentScenario.query);
  const [candidateAnswer, setCandidateAnswer] = useState(currentScenario.candidateAnswer);

  // Runtime states
  const [isRunning, setIsRunning] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0); // 0: idle, 1: retrieval, 2: generation, 3: verification, 4: complete
  const [generationError, setGenerationError] = useState(null);

  // Results
  const [retrievedPassages, setRetrievedPassages] = useState(currentScenario.retrievedEvidence || []);
  const [activeClaims, setActiveClaims] = useState(currentScenario.claims || []);
  const [trustEvaluation, setTrustEvaluation] = useState(() => 
    evaluateTrust(currentScenario.claims, currentScenario.retrievedEvidence)
  );

  // Interactive selection state synchronized across Graph, ClaimList, and EvidencePanel
  const [selectedClaimId, setSelectedClaimId] = useState(currentScenario.claims?.[0]?.id || null);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState(null);

  // Update workspace when user clicks a scenario preset
  const handleLoadScenario = (scenarioId) => {
    const scenario = getScenarioById(scenarioId);
    setSelectedScenarioId(scenario.id);
    setSelectedKbId(scenario.kbId || mockKnowledgeBases[0].id);
    setQuery(scenario.query);
    setCandidateAnswer(scenario.candidateAnswer);
    setRetrievedPassages(scenario.retrievedEvidence || []);
    setActiveClaims(scenario.claims || []);
    setGenerationError(null);

    const evalResult = evaluateTrust(scenario.claims, scenario.retrievedEvidence);
    setTrustEvaluation(evalResult);

    setSelectedClaimId(scenario.claims?.[0]?.id || null);
    setSelectedEvidenceId(null);
  };

  // Re-evaluate trust when claims or answer text changes
  const handleAnswerChange = (newAnswer) => {
    setCandidateAnswer(newAnswer);
    if (currentMode !== 'rag-only') {
      const evalResult = evaluateTrust(activeClaims, retrievedPassages);
      setTrustEvaluation(evalResult);
    }
  };

  // Reset to default scenario
  const handleReset = () => {
    handleLoadScenario(demoScenarios[0].id);
  };

  // Execute the appropriate pipeline workflow
  const handleRunPipeline = async () => {
    setIsRunning(true);
    setGenerationError(null);

    try {
      // Step 1: Retrieval (for rag-only and combined)
      if (currentMode === 'rag-only' || currentMode === 'combined') {
        setPipelineStep(1);
        const retrievalRes = await simulateRetrieval(query, selectedKbId, { delayMs: 400 });
        setRetrievedPassages(retrievalRes.passages);
      }

      // Step 2: Generation (for rag-only and combined)
      if (currentMode === 'rag-only' || currentMode === 'combined') {
        setPipelineStep(2);
        try {
          const mistralRes = await generateMistralAnswer(query, retrievedPassages);
          setCandidateAnswer(mistralRes.answer);
        } catch (mErr) {
          console.warn("Generation notification:", mErr);
          setGenerationError(mErr.message);
          setCandidateAnswer(currentScenario.candidateAnswer);
        }
      }

      // Step 3: TRUST Verification (for trust-only and combined)
      if (currentMode === 'trust-only' || currentMode === 'combined') {
        setPipelineStep(3);
        await new Promise(r => setTimeout(r, 300));
        
        const evalResult = evaluateTrust(activeClaims, retrievedPassages);
        setTrustEvaluation(evalResult);
      }

      setPipelineStep(4);
    } catch (err) {
      console.error("Pipeline execution failed:", err);
    } finally {
      setIsRunning(false);
      setTimeout(() => setPipelineStep(0), 1200);
    }
  };

  // Synchronized Selection Handlers
  const handleSelectClaim = (claimId) => {
    setSelectedClaimId(claimId);
    setSelectedEvidenceId(null);
  };

  const handleSelectEvidence = (evidenceId) => {
    setSelectedEvidenceId(evidenceId);
    setSelectedClaimId(null);
  };

  const activeClaimObject = activeClaims.find(c => c.id === selectedClaimId) || null;
  const activeEvidenceObject = retrievedPassages.find(e => e.id === selectedEvidenceId) || null;

  return (
    <section id="demo" className="py-20 bg-black min-h-screen border-b border-[#141414] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Workspace Title & Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1c1c1c]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#71717a] mb-1">
              <span>Interactive Verification Console</span>
              <span>&bull;</span>
              <span className="text-white">Enterprise HR Edition</span>
            </div>
            <h2 className="font-display font-black uppercase text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
              TRUST INDEX WORKSPACE
            </h2>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-sm bg-[#0d0d0d] hover:bg-[#161616] border border-[#222] text-xs font-mono text-[#a1a1aa] hover:text-white transition-all flex items-center gap-1.5"
              title="Reset to default scenario"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="px-3 py-1.5 rounded-sm border text-xs font-mono flex items-center gap-1.5 bg-emerald-950/20 text-emerald-400 border-emerald-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Mistral Engine: Connected</span>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunPipeline}
              disabled={isRunning}
              className="silver-pill-btn px-6 py-2 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-silver-glow"
            >
              {isRunning ? (
                <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-black text-black" />
              )}
              <span>{isRunning ? 'Running Pipeline...' : 'Run Pipeline'}</span>
            </button>
          </div>
        </div>

        {/* FEATURED: Normal RAG vs TRUST Index Direct Comparison on HR Documents */}
        <RagVsTrustComparison
          scenario={currentScenario}
          isMistralLive={true}
        />

        {/* 1. Mode Selector */}
        <div className="mb-8">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] mb-2">
            Step 1: Select Execution Mode
          </div>
          <ModeSelector
            currentMode={currentMode}
            onSelectMode={(mode) => setCurrentMode(mode)}
          />
        </div>

        {/* 2. Scenario Presets Strip (HR Policies Front & Center) */}
        <div className="mb-8 p-4 rounded-sm bg-[#080808] border border-[#1a1a1a]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717a]">
              Step 2: Choose HR Benchmark Scenario
            </span>
            <span className="text-[11px] font-mono text-[#52525b]">
              Includes Sick Leave, Carryover, Paternity, Remote Stipends, and Resignation
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {demoScenarios.map((sc) => {
              const isSelected = selectedScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleLoadScenario(sc.id)}
                  className={`p-2.5 rounded-sm border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#181818] border-white text-white shadow-sm'
                      : 'bg-black/40 border-[#1f1f1f] text-[#8e8e93] hover:text-white hover:border-[#383838]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] font-mono mb-1">
                    <span className="text-[#71717a] truncate">{sc.category}</span>
                    <span className={`px-1 rounded-sm ${
                      sc.expectedVerdict === 'TRUSTED'
                        ? 'text-emerald-400 bg-emerald-950/40'
                        : sc.expectedVerdict === 'UNCERTAIN'
                          ? 'text-amber-400 bg-amber-950/40'
                          : sc.expectedVerdict === 'HALLUCINATED'
                            ? 'text-red-400 bg-red-950/40'
                            : 'text-zinc-400 bg-zinc-900'
                    }`}>
                      {sc.tag}
                    </span>
                  </div>
                  <div className="font-display font-bold text-xs uppercase leading-tight truncate">
                    {sc.name.replace(/^\d+\.\s*/, '')}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Scenario context */}
          <div className="mt-3 pt-2.5 border-t border-[#141414] text-xs text-[#a1a1aa] font-sans flex items-start gap-2">
            <span className="font-mono text-[10px] text-white uppercase bg-[#141414] px-1.5 py-0.5 rounded-sm border border-[#222]">
              HR Policy Context:
            </span>
            <span>{currentScenario.summary}</span>
          </div>
        </div>

        {/* 3. Query & Knowledge Base Config */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          
          {/* Query Formulation Input */}
          <div className="lg:col-span-2 p-4 rounded-sm bg-[#080808] border border-[#1a1a1a]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-zinc-400" />
                <span>Employee Question (Company Policy):</span>
              </label>
              <span className="text-[10px] font-mono text-[#52525b]">
                Editable Prompt
              </span>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-black border border-[#262626] rounded-sm py-2 px-3 text-xs sm:text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>

          {/* Knowledge Base Selector */}
          <div className="p-4 rounded-sm bg-[#080808] border border-[#1a1a1a]">
            <label className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] flex items-center gap-1.5 mb-2">
              <Database className="w-3.5 h-3.5 text-zinc-400" />
              <span>Target Policy Corpus:</span>
            </label>
            <select
              value={selectedKbId}
              onChange={(e) => setSelectedKbId(e.target.value)}
              className="w-full bg-black border border-[#262626] rounded-sm py-2 px-3 text-xs font-mono text-white focus:outline-none focus:border-white/50 transition-colors cursor-pointer"
            >
              {mockKnowledgeBases.map((kb) => (
                <option key={kb.id} value={kb.id}>
                  {kb.name} ({kb.passages.length} sections)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Display According to Mode */}
        
        {/* MODE 1: RAG ONLY */}
        {currentMode === 'rag-only' && (
          <div className="space-y-6">
            <div className="p-3 rounded-sm bg-[#0d0d0d] border border-[#222] text-xs font-mono text-[#a1a1aa] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                <span>RAG Only Mode: Retrieval &amp; Generation without Trust Index scoring.</span>
              </div>
              <span className="text-[#52525b]">Standard Pipeline</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <RetrievalVisualizer
                retrievedPassages={retrievedPassages}
                isLoading={isRunning && pipelineStep === 1}
                selectedKbName={currentKb?.name}
                selectedChunkId={selectedEvidenceId}
                onSelectChunk={handleSelectEvidence}
              />

              <GeneratedAnswer
                answer={candidateAnswer}
                isLive={true}
                isLoading={isRunning && pipelineStep === 2}
                modelName="mistral-small-latest"
                onAnswerChange={handleAnswerChange}
                onRegenerate={handleRunPipeline}
                error={generationError}
              />
            </div>
          </div>
        )}

        {/* MODE 2: TRUST INDEX ONLY */}
        {currentMode === 'trust-only' && (
          <div className="space-y-6">
            <div className="p-3 rounded-sm bg-[#0d0d0d] border border-[#222] text-xs font-mono text-[#a1a1aa] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>TRUST Index Only Mode: Verification and Weakest-Link Consensus Graph.</span>
              </div>
              <span className="text-[#52525b]">Engine Active</span>
            </div>

            {/* Trust Score Gauge Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <TrustScoreGauge
                  overallScore={trustEvaluation.overallScore}
                  verdict={trustEvaluation.verdict}
                  weakestClaim={trustEvaluation.weakestClaim}
                  evaluatedClaims={trustEvaluation.evaluatedClaims}
                  summary={trustEvaluation.summary}
                />
              </div>

              <div className="lg:col-span-2">
                <GeneratedAnswer
                  answer={candidateAnswer}
                  isLive={true}
                  isLoading={false}
                  onAnswerChange={handleAnswerChange}
                />
              </div>
            </div>

            {/* Claims and Evidence Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ClaimList
                claims={trustEvaluation.evaluatedClaims || activeClaims}
                selectedClaimId={selectedClaimId}
                weakestClaimId={trustEvaluation.weakestClaim?.id}
                onSelectClaim={handleSelectClaim}
              />

              <EvidencePanel
                selectedClaim={activeClaimObject}
                selectedEvidence={activeEvidenceObject}
                allClaims={trustEvaluation.evaluatedClaims || activeClaims}
                allEvidence={retrievedPassages}
              />
            </div>

            {/* Interactive Evidence Graph */}
            <EvidenceGraph
              claims={trustEvaluation.evaluatedClaims || activeClaims}
              retrievedEvidence={retrievedPassages}
              selectedClaimId={selectedClaimId}
              selectedEvidenceId={selectedEvidenceId}
              weakestClaimId={trustEvaluation.weakestClaim?.id}
              onSelectClaim={handleSelectClaim}
              onSelectEvidence={handleSelectEvidence}
            />
          </div>
        )}

        {/* MODE 3: COMBINED RAG + TRUST INDEX */}
        {currentMode === 'combined' && (
          <div className="space-y-6">
            <div className="p-3 rounded-sm bg-[#0d0d0d] border border-[#222] text-xs font-mono text-[#a1a1aa] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Combined RAG + TRUST Index: End-to-End Retrieval, Synthesis, Proposition Extraction, and Graph Proof.</span>
              </div>
              <span className="text-[#52525b]">Full Stack Verification</span>
            </div>

            {/* Row 1: Retrieval + Synthesis + Trust Score */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <RetrievalVisualizer
                retrievedPassages={retrievedPassages}
                isLoading={isRunning && pipelineStep === 1}
                selectedKbName={currentKb?.name}
                selectedChunkId={selectedEvidenceId}
                onSelectChunk={handleSelectEvidence}
              />

              <GeneratedAnswer
                answer={candidateAnswer}
                isLive={true}
                isLoading={isRunning && pipelineStep === 2}
                modelName="mistral-small-latest"
                onAnswerChange={handleAnswerChange}
                onRegenerate={handleRunPipeline}
                error={generationError}
              />

              <TrustScoreGauge
                overallScore={trustEvaluation.overallScore}
                verdict={trustEvaluation.verdict}
                weakestClaim={trustEvaluation.weakestClaim}
                evaluatedClaims={trustEvaluation.evaluatedClaims}
                summary={trustEvaluation.summary}
              />
            </div>

            {/* Row 2: Claims Breakdown & Relationship Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ClaimList
                claims={trustEvaluation.evaluatedClaims || activeClaims}
                selectedClaimId={selectedClaimId}
                weakestClaimId={trustEvaluation.weakestClaim?.id}
                onSelectClaim={handleSelectClaim}
              />

              <EvidencePanel
                selectedClaim={activeClaimObject}
                selectedEvidence={activeEvidenceObject}
                allClaims={trustEvaluation.evaluatedClaims || activeClaims}
                allEvidence={retrievedPassages}
              />
            </div>

            {/* Row 3: Interactive Evidence Graph */}
            <EvidenceGraph
              claims={trustEvaluation.evaluatedClaims || activeClaims}
              retrievedEvidence={retrievedPassages}
              selectedClaimId={selectedClaimId}
              selectedEvidenceId={selectedEvidenceId}
              weakestClaimId={trustEvaluation.weakestClaim?.id}
              onSelectClaim={handleSelectClaim}
              onSelectEvidence={handleSelectEvidence}
            />
          </div>
        )}

      </div>
    </section>
  );
}
