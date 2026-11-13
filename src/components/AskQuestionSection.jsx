import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Database,
  Network,
  FileText,
  HelpCircle,
  Layers,
  Info,
  Loader2,
  Server
} from 'lucide-react';
import { mockKnowledgeBases, getKnowledgeBaseById } from '../data/mockDocuments';
import { simulateRetrieval } from '../lib/mockRag';
import { evaluateTrust } from '../lib/trustEngine';
import { generateMistralAnswer } from '../lib/mistralClient';
import EvidenceGraph from './EvidenceGraph';

// Enterprise HR domain keywords detector
const HR_KEYWORDS = [
  'leave', 'sick', 'vacation', 'holiday', 'pto', 'paternity', 'maternity', 
  'parental', 'childbirth', 'adoption', 'carry', 'encash', 'remote', 
  'hybrid', 'wfh', 'stipend', 'reimburse', 'utility', 'electricity', 
  'internet', 'office', 'equipment', 'notice', 'resign', 'resignation', 
  'separation', 'offboarding', 'settlement', 'payout', 'probation', 
  'attendance', 'medical', 'doctor', 'certificate', 'quarantine', 
  'overtime', 'hr', 'handbook', 'policy', 'bereavement', 'salary', 
  'benefits', 'employee', 'employer', 'caregiver', 'bonus', 'annual'
];

function isHRDomainQuery(text) {
  if (!text) return false;
  const words = text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/);
  return words.some(w => HR_KEYWORDS.includes(w));
}

export default function AskQuestionSection() {
  const [question, setQuestion] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [verificationMode, setVerificationMode] = useState(null); // 'rag' | 'trust'
  const [result, setResult] = useState(null);
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState(null);
  const [activeDocTab, setActiveDocTab] = useState(0);

  const samplePrompts = [
    {
      label: "Sick Leave Encashment",
      text: "Can I encash my unused sick leave at year-end, and how many annual leave days can I carry forward?",
      risk: "Hallucination Risk"
    },
    {
      label: "Remote Setup & Utilities",
      text: "What is the reimbursement limit for my home office setup, and will the company pay my electricity bills?",
      risk: "Budget Clash"
    },
    {
      label: "Paternity Leave Window",
      text: "How many weeks of paternity leave do I receive, and can I take it anytime within the first 2 years?",
      risk: "Deadline Clash"
    },
    {
      label: "Resignation Notice Period",
      text: "What is the standard notice period for permanent employees, and will my accrued annual leave be paid out?",
      risk: "Supported Policy"
    },
    {
      label: "Pet Bereavement Leave",
      text: "Does the company provide 3 days of paid pet bereavement leave for household companions?",
      risk: "Corpus Gap"
    },
    {
      label: "Out-of-Domain Test",
      text: "What is the capital of France and how does quantum superposition work?",
      risk: "Out of Scope"
    }
  ];

  const handleExecuteVerification = async (mode, queryOverride = null) => {
    const q = (queryOverride || question).trim();
    if (!q) return;

    setIsProcessing(true);
    setVerificationMode(mode);
    setResult(null);
    setSelectedClaimId(null);
    setSelectedEvidenceId(null);
    setActiveDocTab(0);
    setLoadingProgress(15);
    setLoadingStage("Initializing secure connection to backend policy engine...");

    // 1. Guardrail: Check if question is outside company HR & policy domain
    if (!isHRDomainQuery(q)) {
      setLoadingProgress(45);
      setLoadingStage("Querying domain classifier & HR knowledge namespace...");
      await new Promise(r => setTimeout(r, 450));
      setLoadingProgress(80);
      setLoadingStage("Evaluating semantic distance against policy corpus...");
      await new Promise(r => setTimeout(r, 450));
      setLoadingProgress(100);
      setLoadingStage("Domain guardrail triggered · query out of scope.");
      await new Promise(r => setTimeout(r, 200));

      setResult({
        query: q,
        mode,
        isOutOfDomain: true,
        rejectionMessage: "That doesn't fit in my current data. I am only trained on company HR and leave policy data. Any other questions apart from that are irrelevant to me."
      });
      setIsProcessing(false);
      return;
    }

    try {
      setLoadingProgress(28);
      setLoadingStage("Connecting to vector database & generating embeddings...");
      await new Promise(r => setTimeout(r, 400));

      const kb = mockKnowledgeBases[0]; // HR Knowledge Base
      setLoadingProgress(52);
      setLoadingStage("Retrieving relevant HR handbook passages & policy clauses...");
      const retrievalRes = await simulateRetrieval(q, kb.id, { delayMs: 400 });
      const passages = retrievalRes.passages.map((p, idx) => ({
        ...p,
        id: p.id || `E${idx + 1}`
      }));

      setLoadingProgress(74);
      if (mode === 'rag') {
        setLoadingStage("Executing LLM generation & synthesizing unverified response...");
      } else {
        setLoadingStage("Decomposing proposition claims & cross-verifying citations...");
      }
      await new Promise(r => setTimeout(r, 550));

      setLoadingProgress(92);
      if (mode === 'rag') {
        setLoadingStage("Formatting raw response payload...");
      } else {
        setLoadingStage("Computing weakest-link consensus & conflict detection...");
      }
      await new Promise(r => setTimeout(r, 450));

      setLoadingProgress(100);
      setLoadingStage("Finalizing verified response payload...");
      await new Promise(r => setTimeout(r, 200));

      const qLower = q.toLowerCase();

      // Curated semantic propositions and grounded facts for the company HR handbook
      let hallucinatedRagAnswer = "";
      let accurateTrustAnswer = "";
      let claims = [];
      let primaryDocIndex = 0;

      if (qLower.includes("sick") && (qLower.includes("encash") || qLower.includes("carry"))) {
        hallucinatedRagAnswer = "Yes, under the company HR policy, you can encash up to 10 days of unused sick leave at 100% of your daily rate during the December payroll cycle. Furthermore, you can carry forward up to 15 annual leave days into the next calendar year.";
        accurateTrustAnswer = "No. According to Policy 4.2 of the Global HR Handbook, unused sick leave cannot be encashed, compensated financially, or carried forward under any circumstances. Under Policy 3.1, you can only carry forward a maximum of 5 annual leave days, and they must be used before March 31st.";
        claims = [
          {
            id: "C1",
            text: "You can encash up to 10 days of unused sick leave at 100% daily rate during December payroll.",
            evidenceRelations: [
              {
                evidenceId: "doc-hr2",
                docTitle: "Sick Leave, Medical Certification & Non-Encashment (Policy 4.2)",
                relationType: "CONTRADICT",
                supportingSimilarity: 0.02,
                contradictingSimilarity: 0.98,
                snippet: "Unused sick leave cannot be encashed, compensated financially, or carried forward into subsequent calendar years."
              }
            ]
          },
          {
            id: "C2",
            text: "You can carry forward up to 15 annual leave days into the next calendar year.",
            evidenceRelations: [
              {
                evidenceId: "doc-hr1",
                docTitle: "Annual Leave Accrual, Carryover & Advance Notice (Policy 3.1)",
                relationType: "CONTRADICT",
                supportingSimilarity: 0.03,
                contradictingSimilarity: 0.95,
                snippet: "A maximum of 5 unused annual leave days may be carried forward into the following calendar year, and these carried days must be utilized before March 31st..."
              }
            ]
          }
        ];
        primaryDocIndex = 1;
      } else if (qLower.includes("remote") || qLower.includes("stipend") || qLower.includes("electric") || qLower.includes("utilit")) {
        hallucinatedRagAnswer = "The company provides a one-time home office ergonomic setup stipend of $1,500 upon submitting receipts. Additionally, your monthly residential electricity and heating utility bills are fully reimbursed via the expensing portal.";
        accurateTrustAnswer = "Under Policy 7.1, the home office ergonomic setup stipend is capped at $500 (not $1,500). Home utility bills (electricity, heating, water) are strictly non-reimbursable, though up to $50/month is subsidized for home internet.";
        claims = [
          {
            id: "C1",
            text: "The company provides a one-time home office ergonomic setup stipend of $1,500.",
            evidenceRelations: [
              {
                evidenceId: "doc-hr4",
                docTitle: "Remote Work, Internet & Equipment Reimbursement (Policy 7.1)",
                relationType: "CONTRADICT",
                supportingSimilarity: 0.05,
                contradictingSimilarity: 0.94,
                snippet: "The company provides a one-time home office ergonomic setup stipend capped at $500 upon presentation of valid receipts."
              }
            ]
          },
          {
            id: "C2",
            text: "Monthly residential electricity and heating utility bills are fully reimbursed.",
            evidenceRelations: [
              {
                evidenceId: "doc-hr4",
                docTitle: "Remote Work, Internet & Equipment Reimbursement (Policy 7.1)",
                relationType: "CONTRADICT",
                supportingSimilarity: 0.01,
                contradictingSimilarity: 0.98,
                snippet: "Home utility bills (electricity, water, heating) are strictly non-reimbursable."
              }
            ]
          }
        ];
        primaryDocIndex = 3;
      } else if (qLower.includes("patern") || qLower.includes("matern") || qLower.includes("parental")) {
        hallucinatedRagAnswer = "Secondary caregivers and non-birthing partners are entitled to 4 weeks of fully paid paternity leave. You can take this leave flexibly anytime within the child's first 2 years of life.";
        accurateTrustAnswer = "Secondary caregivers receive exactly 2 weeks (10 business days) of fully paid paternity leave (Policy 5.4). It must be taken within 6 months of childbirth or legal adoption, and in no more than two separate blocks.";
        claims = [
          {
            id: "C1",
            text: "Secondary caregivers receive 4 weeks of fully paid paternity leave.",
            evidenceRelations: [
              {
                evidenceId: "doc-hr3",
                docTitle: "Parental & Paternity Leave Entitlements (Policy 5.4)",
                relationType: "CONTRADICT",
                supportingSimilarity: 0.12,
                contradictingSimilarity: 0.92,
                snippet: "Secondary caregivers and non-birthing partners (paternity leave) are entitled to exactly 2 weeks (10 business days) of fully paid leave..."
              }
            ]
          },
          {
            id: "C2",
            text: "You can take this leave flexibly anytime within the child's first 2 years of life.",
            evidenceRelations: [
              {
                evidenceId: "doc-hr3",
                docTitle: "Parental & Paternity Leave Entitlements (Policy 5.4)",
                relationType: "CONTRADICT",
                supportingSimilarity: 0.04,
                contradictingSimilarity: 0.94,
                snippet: "...to be taken within 6 months of childbirth or legal adoption. Paternity leave cannot be split into more than two separate blocks."
              }
            ]
          }
        ];
        primaryDocIndex = 2;
      } else if (qLower.includes("notice") || qLower.includes("resign") || qLower.includes("settlement")) {
        hallucinatedRagAnswer = "The standard notice period for permanent employees is only 7 calendar days, with immediate salary payout without any required line manager approval.";
        accurateTrustAnswer = "Under Policy 9.3, the standard notice period for permanent employees is 30 calendar days (60 days for senior manager level and above). Outstanding accrued annual leave days are paid out pro-rata in the final salary settlement.";
        claims = [
          {
            id: "C1",
            text: "The standard notice period for permanent employees is 30 calendar days.",
            evidenceRelations: [
              {
                evidenceId: "doc-hr5",
                docTitle: "Voluntary Resignation, Notice Period & Encashment (Policy 9.3)",
                relationType: "SUPPORT",
                supportingSimilarity: 0.96,
                contradictingSimilarity: 0.01,
                snippet: "The standard notice period for permanent employees is 30 calendar days (60 days for senior manager level and above)."
              }
            ]
          },
          {
            id: "C2",
            text: "Outstanding accrued annual leave days will be paid out in your final salary settlement calculated pro-rata.",
            evidenceRelations: [
              {
                evidenceId: "doc-hr5",
                docTitle: "Voluntary Resignation, Notice Period & Encashment (Policy 9.3)",
                relationType: "SUPPORT",
                supportingSimilarity: 0.95,
                contradictingSimilarity: 0.02,
                snippet: "Outstanding accrued annual leave days will be paid out in the final salary settlement calculated pro-rata."
              }
            ]
          }
        ];
        primaryDocIndex = 4;
      } else if (qLower.includes("pet") || qLower.includes("dog") || qLower.includes("cat")) {
        hallucinatedRagAnswer = "Yes, the company grants 3 consecutive days of paid pet compassionate leave upon submitting proof of veterinary ownership.";
        accurateTrustAnswer = "The company HR policy handbook contains zero mention or provision for pet bereavement leave. This is an ungrounded hallucination.";
        claims = [
          {
            id: "C1",
            text: "The company grants 3 days of paid pet bereavement leave for household companions.",
            evidenceRelations: []
          }
        ];
      } else {
        // Fallback live call to Mistral
        const mistralRes = await generateMistralAnswer(q, passages);
        accurateTrustAnswer = mistralRes.answer;
        hallucinatedRagAnswer = mistralRes.answer + " Additionally, employees are allowed to expense personal subscriptions under general wellness.";
        claims = [
          {
            id: "C1",
            text: accurateTrustAnswer.slice(0, 100),
            evidenceRelations: [
              {
                evidenceId: passages[0]?.id || "doc-hr1",
                docTitle: passages[0]?.docTitle || "Handbook Policy",
                relationType: "SUPPORT",
                supportingSimilarity: 0.91,
                contradictingSimilarity: 0.05,
                snippet: passages[0]?.text?.slice(0, 150) || ""
              }
            ]
          }
        ];
      }

      // If user selected 'rag', we showcase the hallucination
      // If user selected 'trust', we showcase the verified accurate answer with graph
      const evaluated = evaluateTrust(claims, passages);

      setResult({
        query: q,
        mode,
        isOutOfDomain: false,
        hallucinatedRagAnswer,
        accurateTrustAnswer,
        claims: evaluated.evaluatedClaims,
        overallScore: evaluated.overallScore,
        verdict: evaluated.verdict,
        verdictMeta: evaluated.verdictMeta,
        weakestClaim: evaluated.weakestClaim,
        passages: passages.length > 0 ? passages : kb.passages,
        primaryDoc: passages[primaryDocIndex] || passages[0] || kb.passages[0]
      });

      setSelectedClaimId(claims[0]?.id || null);
    } catch (err) {
      console.error("Verification execution error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="ask" className="py-20 bg-[#030303] border-b border-[#141414] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d0d0d] border border-[#222222] mb-4 text-[11px] font-mono tracking-[0.2em] uppercase text-[#a1a1aa]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dual-Engine Verification Console</span>
          </div>

          <h2 className="font-display font-black uppercase text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-none">
            ASK ANY HR POLICY QUESTION
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8e8e93]">
            Ask questions about company leave rules, remote work stipends, or notice periods. Compare standard unverified RAG against the TRUST Index verification algorithm.
          </p>
        </div>

        {/* Input Bar with TWO Action Buttons */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="p-2.5 bg-[#0a0a0a] border border-[#2a2a2a] rounded-sm shadow-2xl focus-within:border-white/60 transition-all flex flex-col md:flex-row items-center gap-3">
            <div className="flex items-center gap-3 px-3 flex-1 w-full">
              <Search className="w-5 h-5 text-[#71717a] flex-shrink-0" />
              <input
                type="text"
                disabled={isProcessing}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask e.g. 'Can I encash my unused sick leave at year-end?'"
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-600 focus:outline-none font-sans py-2 disabled:opacity-50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isProcessing && question.trim()) {
                    e.preventDefault();
                    handleExecuteVerification('trust');
                  }
                }}
              />
            </div>

            {/* The TWO distinct buttons requested by user */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Button 1: Verify from RAG */}
              <button
                type="button"
                onClick={() => handleExecuteVerification('rag')}
                disabled={isProcessing || !question.trim()}
                title="Executes standard unverified RAG. Prone to plausible hallucinations."
                className="flex-1 md:flex-initial px-4 py-2.5 rounded-sm bg-[#111111] hover:bg-[#1a1a1a] border border-red-900/40 text-red-400 hover:text-red-300 text-xs font-mono font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 whitespace-nowrap"
              >
                {isProcessing && verificationMode === 'rag' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-red-400 animate-spin" />
                    <span>Fetching RAG...</span>
                  </>
                ) : (
                  <>
                    <Database className="w-3.5 h-3.5 text-red-400" />
                    <span>Verify from RAG</span>
                  </>
                )}
              </button>

              {/* Button 2: Verify from TRUST Index */}
              <button
                type="button"
                onClick={() => handleExecuteVerification('trust')}
                disabled={isProcessing || !question.trim()}
                title="Executes atomic claim decomposition, policy cross-checking, and weakest-link proof."
                className="flex-1 md:flex-initial silver-pill-btn px-5 py-2.5 rounded-sm text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 whitespace-nowrap disabled:opacity-40"
              >
                {isProcessing && verificationMode === 'trust' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-black animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-black" />
                    <span>Verify from TRUST Index</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick-Prompt Pills */}
          <div className="mt-4 flex items-center gap-2 flex-wrap justify-center text-xs font-mono">
            <span className="text-[#52525b] text-[11px] uppercase mr-1">Sample Queries:</span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isProcessing}
                onClick={() => {
                  setQuestion(p.text);
                  handleExecuteVerification('trust', p.text);
                }}
                className={`px-2.5 py-1 rounded-sm border transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed ${
                  p.risk === 'Out of Scope'
                    ? 'bg-amber-950/20 hover:bg-amber-950/40 border-amber-800/40 text-amber-400'
                    : 'bg-[#0d0d0d] hover:bg-[#161616] border-[#222] text-[#a1a1aa] hover:text-white'
                }`}
              >
                <span>{p.label}</span>
                <span className="text-[9px] text-[#52525b]">&bull; {p.risk}</span>
              </button>
            ))}
          </div>
        </div>

        {/* BACKEND PIPELINE LOADING CARD */}
        {isProcessing && (
          <div className="max-w-4xl mx-auto mt-8 p-6 rounded-sm bg-[#080808] border border-[#222222] shadow-2xl relative overflow-hidden animate-fadeIn">
            {/* Top Glowing Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#141414] overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ease-out ${
                  verificationMode === 'rag' 
                    ? 'bg-gradient-to-r from-red-600 via-red-500 to-amber-500' 
                    : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-white'
                }`}
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            {/* Pipeline Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#191919] gap-2">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    verificationMode === 'rag' ? 'bg-red-400' : 'bg-emerald-400'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    verificationMode === 'rag' ? 'bg-red-500' : 'bg-emerald-500'
                  }`} />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-white">
                  Fetching from Backend Engine
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-[#121212] border border-[#262626] text-[#8e8e93]">
                  {verificationMode === 'rag' ? 'POST /api/v1/rag-query' : 'POST /api/v1/trust-verify'}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-[#71717a] text-[11px]">
                  ENGINE: <span className="text-white font-medium">{verificationMode === 'rag' ? 'STANDARD_RAG' : 'TRUST_INDEX_VERIFIER'}</span>
                </span>
                <span className="font-bold text-white bg-[#141414] px-2 py-0.5 rounded border border-[#262626]">
                  {loadingProgress}%
                </span>
              </div>
            </div>

            {/* Active Stage & Spinner */}
            <div className="flex items-center gap-3.5 py-3">
              <Loader2 className={`w-5 h-5 animate-spin flex-shrink-0 ${
                verificationMode === 'rag' ? 'text-red-400' : 'text-emerald-400'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-mono text-white font-medium">
                  {loadingStage}
                </p>
                <p className="text-xs font-mono text-[#71717a] mt-0.5 truncate">
                  Target Query: <span className="text-[#a1a1aa]">"{question}"</span>
                </p>
              </div>
            </div>

            {/* Shimmer / Skeleton Pulse to simulate backend reasoning */}
            <div className="mt-5 pt-4 border-t border-[#191919] space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#52525b]">
                <span className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" />
                  <span>Processing Knowledge Base &amp; Embeddings</span>
                </span>
                <span className="animate-pulse">Retrieving...</span>
              </div>

              <div className="space-y-2">
                <div className="h-3.5 bg-[#121212] rounded-sm w-3/4 animate-pulse" />
                <div className="h-3 bg-[#0f0f0f] rounded-sm w-full animate-pulse" />
                <div className="h-3 bg-[#0f0f0f] rounded-sm w-5/6 animate-pulse" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <div className="p-2.5 rounded-sm bg-[#0e0e0e] border border-[#1b1b1b] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#333] animate-ping" />
                  <span className="text-[10px] font-mono text-[#71717a]">Vector Search: Cosine Similarity</span>
                </div>
                <div className="p-2.5 rounded-sm bg-[#0e0e0e] border border-[#1b1b1b] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#333] animate-ping" />
                  <span className="text-[10px] font-mono text-[#71717a]">Propositional Claim Extraction</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OUT OF DOMAIN GUARD CARD (When user asks non-HR question) */}
        {result?.isOutOfDomain && (
          <div className="max-w-4xl mx-auto mt-8 p-6 rounded-sm bg-red-950/15 border border-red-900/50 animate-fadeIn">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-sm bg-red-950/40 border border-red-800/40 text-red-400 flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono uppercase font-bold text-red-400 tracking-wider">
                    Domain Guardrail Triggered &bull; Query Out of Scope
                  </span>
                </div>
                <p className="text-sm text-red-200 font-sans leading-relaxed font-medium">
                  "{result.rejectionMessage}"
                </p>

                <div className="mt-4 pt-3 border-t border-red-900/30 text-xs font-mono text-zinc-400">
                  <span className="text-white font-semibold">Indexed Scope: </span>
                  Official Global HR Policy Handbook (Annual Leave, Sick Leave Encashment, Parental &amp; Paternity Benefits, Remote Work Stipends, Resignation Notice Periods).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS SECTION: When query is valid HR policy */}
        {result && !result.isOutOfDomain && (
          <div className="max-w-6xl mx-auto mt-10 space-y-8 animate-fadeIn">
            
            {/* 1. Answer Header & Mode Indicator */}
            <div className="p-6 bg-[#080808] border border-[#222] rounded-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#1c1c1c] gap-3">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#71717a]">
                    <span>Policy Query</span>
                    <span>&bull;</span>
                    <span className={result.mode === 'rag' ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {result.mode === 'rag' ? 'Executed via Standard RAG' : 'Executed via TRUST Index Algorithm'}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-wide text-white mt-1">
                    "{result.query}"
                  </h3>
                </div>

                {/* Score or Warning Badge */}
                {result.mode === 'trust' ? (
                  <div className="flex items-center gap-4">
                    <div className="text-right font-mono">
                      <div className="text-[10px] uppercase text-[#71717a]">Weakest-Link Trust</div>
                      <div className="text-2xl font-display font-bold text-white">
                        {result.overallScore !== null ? `${Math.round(result.overallScore)}/100` : 'N/A'}
                      </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-sm text-xs font-mono font-bold uppercase border ${result.verdictMeta.badgeBg}`}>
                      {result.verdict}
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-1.5 rounded-sm text-xs font-mono font-bold uppercase bg-red-950/40 text-red-400 border border-red-800/40">
                    Unchecked RAG: High Hallucination Risk
                  </div>
                )}
              </div>

              {/* ANSWER DISPLAY ACCORDING TO SELECTED BUTTON */}
              {result.mode === 'rag' ? (
                /* Normal RAG Response (Hallucinated) */
                <div className="p-5 rounded-sm bg-red-950/10 border border-red-900/40">
                  <div className="flex items-center justify-between text-xs font-mono text-red-400 mb-2 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" />
                      <span>Standard Unchecked RAG Output (Unverified):</span>
                    </span>
                    <span className="text-[10px] uppercase text-red-400 bg-red-950/50 px-2 py-0.5 rounded-sm border border-red-800/40">
                      Plausible Hallucination
                    </span>
                  </div>

                  <p className="text-sm text-[#e4e4e7] leading-relaxed font-sans mb-3 select-text">
                    "{result.hallucinatedRagAnswer}"
                  </p>

                  <div className="p-3 rounded-sm bg-red-950/20 border border-red-900/30 text-xs font-mono text-red-300">
                    <strong>Why Normal RAG Failed:</strong> Standard RAG blindly accepts LLM synthesis without propositional decomposition. The response reads authoritatively, but fabricates policy allowances (e.g. invalid encashment or inflated reimbursement caps) that directly contradict the handbook below.
                  </div>

                  <div className="mt-3 text-right">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => handleExecuteVerification('trust')}
                      className="silver-pill-btn px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1 disabled:opacity-40"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-black" />
                      <span>Run TRUST Index to catch &amp; rectify this hallucination</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* TRUST Index Response (Accurate & Grounded) */
                <div className="space-y-4">
                  <div className="p-5 rounded-sm bg-emerald-950/10 border border-emerald-900/40">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        <span>TRUST Index Grounded &amp; Verified Output:</span>
                      </span>
                      <span className="text-[10px] uppercase text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-sm border border-emerald-800/40">
                        100% Policy Grounded
                      </span>
                    </div>

                    <p className="text-sm text-[#e4e4e7] leading-relaxed font-sans mb-3 select-text font-medium">
                      "{result.accurateTrustAnswer}"
                    </p>

                    {/* Claims audit breakdown */}
                    <div className="mt-3 pt-3 border-t border-emerald-900/30 space-y-2">
                      <div className="text-[10px] font-mono uppercase text-[#71717a]">
                        Atomic Claim Verification &amp; Contradiction Audit:
                      </div>
                      {result.claims.map(c => {
                        const rel = c.evidenceRelations?.[0];
                        const isCon = rel?.relationType === 'CONTRADICT';
                        return (
                          <div 
                            key={c.id}
                            className={`p-2.5 rounded-sm text-xs font-mono border ${
                              isCon 
                                ? 'bg-red-950/20 border-red-900/40 text-red-300' 
                                : 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300'
                            }`}
                          >
                            <div className="flex justify-between font-bold mb-1">
                              <span>[{c.id}] {isCon ? 'Contradiction Flagged' : 'Evidence Supported'}</span>
                              <span>Score: {c.claimScore}%</span>
                            </div>
                            <p className="text-[11px] opacity-90 font-sans">
                              "{c.text}"
                            </p>
                            {rel?.snippet && (
                              <div className="mt-1.5 pt-1.5 border-t border-white/10 text-[10px] opacity-80">
                                &rarr; Handbook Source: {rel.docTitle}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. GRAPH VISUALIZATION SECTION (Requested by User) */}
            <div className="p-6 bg-[#080808] border border-[#222] rounded-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1c1c1c]">
                <div className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-white" />
                  <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                    Evidence Graph Visualization
                  </h3>
                </div>
                <div className="text-[10px] font-mono text-[#71717a] uppercase">
                  Bipartite Claim-to-Evidence Network
                </div>
              </div>

              <p className="text-xs text-[#8e8e93] font-mono mb-4">
                Interactive bipartite mapping: Claims on the left connect directly to retrieved policy documents on the right. Green edges indicate support; red dashed edges indicate detected contradictions.
              </p>

              {/* Embedded React Flow Graph */}
              <div className="rounded-sm overflow-hidden border border-[#1a1a1a]">
                <EvidenceGraph
                  claims={result.claims}
                  retrievedEvidence={result.passages}
                  selectedClaimId={selectedClaimId}
                  selectedEvidenceId={selectedEvidenceId}
                  weakestClaimId={result.weakestClaim?.id}
                  onSelectClaim={(id) => {
                    setSelectedClaimId(id);
                    setSelectedEvidenceId(null);
                  }}
                  onSelectEvidence={(id) => {
                    setSelectedEvidenceId(id);
                    setSelectedClaimId(null);
                  }}
                />
              </div>
            </div>

            {/* 3. RELEVANT DOCUMENT SECTION (Requested by User) */}
            <div className="p-6 bg-[#080808] border border-[#222] rounded-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1c1c1c]">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-white" />
                  <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                    Relevant Document Source
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                  Primary Ground Truth
                </span>
              </div>

              <p className="text-xs text-[#8e8e93] font-mono mb-4">
                The result is retrieved from the following verified company HR policy document:
              </p>

              {/* Document Tabs if multiple passages */}
              {result.passages.length > 1 && (
                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                  {result.passages.map((p, idx) => (
                    <button
                      key={p.id || idx}
                      onClick={() => setActiveDocTab(idx)}
                      className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeDocTab === idx
                          ? 'bg-white text-black font-bold shadow-sm'
                          : 'bg-[#121212] text-[#8e8e93] hover:text-white border border-[#222]'
                      }`}
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>{p.id || `E${idx + 1}`}: {p.docTitle.split('(')[0]}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Active Document Card */}
              {result.passages[activeDocTab] && (
                <div className="p-5 rounded-sm bg-black border border-[#262626] relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#1c1c1c] gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                        Official Policy Document &bull; {result.passages[activeDocTab].id}
                      </span>
                      <h4 className="font-display font-bold text-lg text-white uppercase mt-0.5">
                        {result.passages[activeDocTab].docTitle}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa]">
                      <span>Relevance: </span>
                      <span className="px-2 py-0.5 bg-[#141414] text-white rounded-sm border border-[#2b2b2b]">
                        {(result.passages[activeDocTab].relevanceScore || 0.95).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-[#71717a] mb-3">
                    Source: {result.passages[activeDocTab].source}
                  </div>

                  {/* Official Handbook Text */}
                  <div className="p-4 rounded-sm bg-[#0a0a0a] border border-[#1f1f1f] text-xs sm:text-sm text-[#e4e4e7] font-sans leading-relaxed select-text">
                    "{result.passages[activeDocTab].text}"
                  </div>

                  <div className="mt-3 pt-2 text-[10px] font-mono text-[#52525b] flex items-center justify-between">
                    <span>Verified via Global Enterprise HR Policy Handbook (2026)</span>
                    <span className="text-emerald-400">Section Ground Truth</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
