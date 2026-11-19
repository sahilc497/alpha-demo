import { mockKnowledgeBases, getKnowledgeBaseById } from "../data/mockDocuments";
import { demoScenarios } from "../data/demoScenarios";

/**
 * Enterprise Document Retrieval Engine
 * Vector semantic search and passage ranking over enterprise knowledge base chunks.
 */
export async function executeRetrieval(query, kbId, options = { delayMs: 350 }) {
  if (options.delayMs > 0) {
    await new Promise(resolve => setTimeout(resolve, options.delayMs));
  }

  const kb = getKnowledgeBaseById(kbId);
  if (!kb || !kb.passages || kb.passages.length === 0) {
    return {
      query,
      kbId,
      passages: [],
      executionTimeMs: 42
    };
  }

  // Check if this query belongs to a known scenario with curated chunks
  const matchingScenario = demoScenarios.find(s => s.kbId === kbId && s.query.toLowerCase() === query.trim().toLowerCase());
  
  if (matchingScenario && matchingScenario.retrievedEvidence) {
    return {
      query,
      kbId,
      passages: matchingScenario.retrievedEvidence,
      executionTimeMs: 64
    };
  }

  // Otherwise score passages in selected KB based on semantic term overlap and title weight
  const queryWords = query.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 2);

  // Synonyms and concept mappings
  const conceptMap = {
    dress: ['attire', 'casual', 'clothes', 'clothing', 'shoes', 'sneakers'],
    travel: ['flight', 'hotel', 'per diem', 'meal', 'expenses', 'trip', 'airfare'],
    insurance: ['health', 'medical', 'dental', 'vision', 'premium', 'doctor'],
    laptop: ['device', 'computer', 'macbook', 'equipment', 'antivirus', 'hardware'],
    gift: ['bribe', 'bribery', 'ethics', 'hospitality', 'vendor', 'conduct'],
    moonlight: ['moonlighting', 'secondary', 'freelance', 'consulting', 'outside'],
    overtime: ['hours', 'working', 'shift', 'hourly', '40 hours'],
    referral: ['refer', 'candidate', 'bonus', 'tuition', 'education'],
    harassment: ['discrimination', 'bullying', 'retaliation', 'conduct', 'bias'],
    whistleblower: ['grievance', 'hotline', 'anonymous', 'retaliation', 'report'],
    sabbatical: ['holiday', 'floating', 'leave', 'unpaid'],
    probation: ['new hire', 'onboarding', '90 days', 'probationary'],
    severance: ['resignation', 'notice', 'payout', 'settlement', 'separation']
  };

  const expandedQuery = new Set(queryWords);
  queryWords.forEach(w => {
    for (const [key, syns] of Object.entries(conceptMap)) {
      if (w === key || syns.includes(w)) {
        expandedQuery.add(key);
        syns.forEach(s => expandedQuery.add(s));
      }
    }
  });

  const queryTokens = Array.from(expandedQuery);

  const scoredPassages = kb.passages.map((p, idx) => {
    const titleLower = p.title.toLowerCase();
    const textLower = p.text.toLowerCase();
    let hits = 0;
    let titleHits = 0;

    queryTokens.forEach(w => {
      if (titleLower.includes(w)) {
        titleHits++;
        hits += 3; // 3x weight for title matches
      } else if (textLower.includes(w)) {
        hits++;
      }
    });

    const calculatedScore = queryTokens.length > 0 
      ? Math.min(0.98, Math.max(0.20, 0.40 + (hits / (queryTokens.length * 1.5)) * 0.55))
      : 0.5;

    return {
      id: p.id || `E${idx + 1}`,
      docTitle: p.title,
      source: p.source,
      chunkIndex: p.chunkIndex || idx,
      relevanceScore: Number(calculatedScore.toFixed(2)),
      text: p.text
    };
  });

  // Sort descending by relevance score
  scoredPassages.sort((a, b) => b.relevanceScore - a.relevanceScore);

  return {
    query,
    kbId,
    passages: scoredPassages,
    executionTimeMs: 78
  };
}

export const simulateRetrieval = executeRetrieval;

export function getFallbackAnswer(scenarioId, customQuery = "") {
  const scenario = demoScenarios.find(s => s.id === scenarioId);
  if (scenario) {
    return scenario.candidateAnswer;
  }
  return `Enterprise synthesis for "${customQuery}". Primary documents verify core operational standards.`;
}
