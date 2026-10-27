/**
 * TRUST Index Calculation Engine
 * 
 * Implements explainable consensus scoring and weakest-link aggregation:
 * 
 * 1. Consensus(c) = (sum(supporting_sim) - sum(contradicting_sim)) / (total_linked_sim + epsilon)
 *    Normalized in [-1, +1]
 * 
 * 2. ClaimScore(c) = ((Consensus(c) + 1) / 2) * 100
 *    Normalized in [0, 100]
 * 
 * 3. OverallTrustScore = min_{c in Claims} ClaimScore(c)
 *    Weakest-link principle ensures one critical hallucination cannot be masked by trivial facts.
 * 
 * Verdicts:
 * - 80–100: Trusted
 * - 50–79:  Uncertain
 * - 0–49:   Hallucinated
 * - No Usable Evidence: Inconclusive
 */

const EPSILON = 1e-5;

export const VERDICTS = {
  TRUSTED: {
    label: "Trusted",
    range: "80 – 100",
    color: "#22c55e",
    border: "border-emerald-500/40",
    badgeBg: "bg-emerald-950/30 text-emerald-300 border-emerald-800/40",
    description: "All claims are corroborated by primary evidence with high consensus."
  },
  UNCERTAIN: {
    label: "Uncertain",
    range: "50 – 79",
    color: "#eab308",
    border: "border-amber-500/40",
    badgeBg: "bg-amber-950/30 text-amber-300 border-amber-800/40",
    description: "Partial support or ambiguous consensus detected across evidence."
  },
  HALLUCINATED: {
    label: "Hallucinated",
    range: "0 – 49",
    color: "#ef4444",
    border: "border-red-500/40",
    badgeBg: "bg-red-950/30 text-red-300 border-red-800/40",
    description: "Direct contradiction or fabricated statement identified by weakest link."
  },
  INCONCLUSIVE: {
    label: "Inconclusive",
    range: "N/A",
    color: "#71717a",
    border: "border-zinc-700",
    badgeBg: "bg-zinc-900 text-zinc-400 border-zinc-700",
    description: "No usable evidence retrieved from corpus to evaluate claims."
  }
};

/**
 * Computes individual claim consensus, claim score, and aggregate weakest-link trust score.
 * 
 * @param {Array} claims - Array of claim objects with evidenceRelations
 * @param {Array} retrievedEvidence - Array of retrieved evidence passages
 * @returns {Object} Comprehensive calculation breakdown
 */
export function evaluateTrust(claims = [], retrievedEvidence = []) {
  if (!claims || claims.length === 0) {
    return {
      overallScore: 0,
      verdict: "INCONCLUSIVE",
      verdictMeta: VERDICTS.INCONCLUSIVE,
      evaluatedClaims: [],
      weakestClaim: null,
      summary: "No claims submitted for verification."
    };
  }

  // Check if there is zero usable evidence
  const hasNoEvidence = !retrievedEvidence || retrievedEvidence.length === 0;
  const allClaimsMissingRelations = claims.every(
    c => !c.evidenceRelations || c.evidenceRelations.length === 0 || 
    c.evidenceRelations.every(r => r.relationType === "INSUFFICIENT" && (r.supportingSimilarity || 0) < 0.15)
  );

  if (hasNoEvidence && allClaimsMissingRelations) {
    return {
      overallScore: null,
      verdict: "INCONCLUSIVE",
      verdictMeta: VERDICTS.INCONCLUSIVE,
      evaluatedClaims: claims.map(c => ({
        ...c,
        supportingSum: 0,
        contradictingSum: 0,
        consensus: 0,
        claimScore: 0,
        status: "INSUFFICIENT"
      })),
      weakestClaim: null,
      summary: "Corpus gap: No relevant evidence exists to confirm or refute these claims."
    };
  }

  const evaluatedClaims = claims.map(claim => {
    const relations = claim.evidenceRelations || [];
    
    let supportingSum = 0;
    let contradictingSum = 0;

    relations.forEach(rel => {
      const sup = Number(rel.supportingSimilarity) || 0;
      const con = Number(rel.contradictingSimilarity) || 0;

      if (rel.relationType === "SUPPORT") {
        supportingSum += sup;
      } else if (rel.relationType === "CONTRADICT") {
        contradictingSum += con;
      } else {
        if (sup > con && sup > 0.4) supportingSum += sup;
        else if (con > sup && con > 0.4) contradictingSum += con;
      }
    });

    const totalLinkedSim = supportingSum + contradictingSum;

    let consensus = 0;
    let claimScore = 0;
    let status = "INSUFFICIENT";

    if (totalLinkedSim > 0.05) {
      consensus = (supportingSum - contradictingSum) / (totalLinkedSim + EPSILON);
      consensus = Math.max(-1, Math.min(1, consensus));
      claimScore = Math.round(((consensus + 1) / 2) * 100 * 10) / 10;

      if (claimScore >= 80) status = "SUPPORTED";
      else if (claimScore >= 50) status = "UNCERTAIN";
      else status = "CONTRADICTED";
    } else {
      consensus = 0;
      claimScore = 15;
      status = "UNSUPPORTED";
    }

    return {
      ...claim,
      supportingSum: Number(supportingSum.toFixed(3)),
      contradictingSum: Number(contradictingSum.toFixed(3)),
      totalLinkedSim: Number(totalLinkedSim.toFixed(3)),
      consensus: Number(consensus.toFixed(3)),
      claimScore,
      status
    };
  });

  // Weakest-Link Aggregation: min(claim scores)
  const scores = evaluatedClaims.map(c => c.claimScore);
  const minScore = Math.min(...scores);
  const weakestClaim = evaluatedClaims.find(c => c.claimScore === minScore) || evaluatedClaims[0];

  let verdictKey = "UNCERTAIN";
  if (minScore >= 80) {
    verdictKey = "TRUSTED";
  } else if (minScore >= 50) {
    verdictKey = "UNCERTAIN";
  } else {
    verdictKey = "HALLUCINATED";
  }

  return {
    overallScore: minScore,
    verdict: verdictKey,
    verdictMeta: VERDICTS[verdictKey],
    evaluatedClaims,
    weakestClaim,
    summary: `Weakest link: ${weakestClaim.id} determined the overall score of ${minScore}/100.`
  };
}
