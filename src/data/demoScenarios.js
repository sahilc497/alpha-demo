/**
 * TRUST Index Demonstration Scenarios
 * Focuses on realistic Enterprise HR Policies vs. Standard RAG Hallucinations,
 * demonstrating how the TRUST Index weakest-link consensus engine catches
 * fabricated rules, numeric errors, and policy violations.
 */

export const demoScenarios = [
  {
    id: "scenario-hr-leave-encashment",
    name: "1. HR Sick Encashment & Carryover",
    tag: "Factual Clash",
    category: "HR: Leave Policy",
    kbId: "kb-hr-enterprise",
    kbName: "Enterprise HR Policies & Employee Handbook (2026)",
    query: "Can I encash my unused sick leave at year-end, and how many annual leave days can I carry forward to next year?",
    normalRagOutput: "Yes, under the company HR policy, you can encash up to 10 days of unused sick leave at 100% of your daily rate during the December payroll cycle. Furthermore, you can carry forward up to 15 annual leave days into the next calendar year.",
    candidateAnswer: "Yes, under the company HR policy, you can encash up to 10 days of unused sick leave at 100% of your daily rate during the December payroll cycle. Furthermore, you can carry forward up to 15 annual leave days into the next calendar year.",
    trustVerifiedAnswer: "No. According to Section 4.2 of the HR policy, unused sick leave cannot be encashed, compensated financially, or carried forward under any circumstances. According to Section 3.1, you can only carry forward a maximum of 5 annual leave days, and they must be used before March 31st or they permanently lapse.",
    summary: "Standard RAG confidently hallucinates sick leave encashment and invents a 15-day carryover. TRUST Index flags both clauses as severe contradictions.",
    comparisonInsight: "A typical RAG system blindly answers with polite, authoritative prose, risking financial disputes or illegal payroll payouts. TRUST Index decomposes the response into atomic rules and cross-checks with Policy 4.2 & 3.1.",
    claims: [
      {
        id: "C1",
        text: "You can encash up to 10 days of unused sick leave at 100% of your daily rate during the December payroll cycle.",
        evidenceRelations: [
          {
            evidenceId: "E2",
            docTitle: "Sick Leave, Medical Certification & Non-Encashment (Policy 4.2)",
            source: "Global HR Policy Handbook, Section 4",
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
            evidenceId: "E1",
            docTitle: "Annual Leave Accrual, Carryover & Advance Notice (Policy 3.1)",
            source: "Global HR Policy Handbook, Section 3",
            relationType: "CONTRADICT",
            supportingSimilarity: 0.03,
            contradictingSimilarity: 0.95,
            snippet: "A maximum of 5 unused annual leave days may be carried forward into the following calendar year, and these carried days must be utilized before March 31st..."
          }
        ]
      }
    ],
    retrievedEvidence: [
      {
        id: "E1",
        docTitle: "Annual Leave Accrual, Carryover & Advance Notice (Policy 3.1)",
        source: "Global HR Policy Handbook, Section 3",
        chunkIndex: 0,
        relevanceScore: 0.96,
        text: "Full-time employees accrue 18 days of paid annual leave per calendar year. A maximum of 5 unused annual leave days may be carried forward into the following calendar year, and these carried days must be utilized before March 31st or they will permanently lapse without financial compensation. Annual leave requests exceeding 3 consecutive business days require at least 14 days advance written notice and line manager approval."
      },
      {
        id: "E2",
        docTitle: "Sick Leave, Medical Certification & Non-Encashment (Policy 4.2)",
        source: "Global HR Policy Handbook, Section 4",
        chunkIndex: 1,
        relevanceScore: 0.95,
        text: "Employees receive 10 days of paid sick leave annually. Sick leave is strictly reserved for personal illness, medical appointments, or temporary incapacity. Unused sick leave cannot be encashed, compensated financially, or carried forward into subsequent calendar years. Any sick leave exceeding 2 consecutive business days requires a certified doctor's medical note submitted within 48 hours of return to work."
      }
    ],
    expectedVerdict: "HALLUCINATED",
    explanation: "Both C1 and C2 clash directly with primary HR policies. Contradiction similarity >= 0.95 drives Consensus to -0.96, pulling the Weakest-Link Trust Score down to 1.8/100 (Hallucinated)."
  },
  {
    id: "scenario-hr-remote-stipend",
    name: "2. Remote Work & Utility Reimbursement",
    tag: "Budget Risk",
    category: "HR: Hybrid Workplace",
    kbId: "kb-hr-enterprise",
    kbName: "Enterprise HR Policies & Employee Handbook (2026)",
    query: "What is the reimbursement limit for my home office setup, and will the company cover my monthly electricity bills?",
    normalRagOutput: "The company provides a one-time home office ergonomic setup stipend of $1,500 upon submitting receipts. Additionally, your monthly residential electricity and heating utility bills are fully reimbursed via the expensing portal.",
    candidateAnswer: "The company provides a one-time home office ergonomic setup stipend of $1,500 upon submitting receipts. Additionally, your monthly residential electricity and heating utility bills are fully reimbursed via the expensing portal.",
    trustVerifiedAnswer: "Under Policy 7.1, the home office ergonomic setup stipend is capped at $500 (not $1,500). Furthermore, home utility bills (electricity, water, heating) are strictly non-reimbursable, though the company provides up to $50/month for home internet.",
    summary: "Normal RAG inflates a $500 stipend to $1,500 and invents non-existent electricity bill reimbursement.",
    comparisonInsight: "Without verification, employees submit invalid $1,500 expense reports. TRUST Index pinpoints the numeric mismatch and direct policy prohibition.",
    claims: [
      {
        id: "C1",
        text: "The company provides a one-time home office ergonomic setup stipend of $1,500 upon submitting receipts.",
        evidenceRelations: [
          {
            evidenceId: "E4",
            docTitle: "Remote Work, Internet & Equipment Reimbursement (Policy 7.1)",
            source: "Global HR Policy Handbook, Section 7",
            relationType: "CONTRADICT",
            supportingSimilarity: 0.05,
            contradictingSimilarity: 0.93,
            snippet: "The company provides a one-time home office ergonomic setup stipend capped at $500 upon presentation of valid receipts."
          }
        ]
      },
      {
        id: "C2",
        text: "Your monthly residential electricity and heating utility bills are fully reimbursed via the expensing portal.",
        evidenceRelations: [
          {
            evidenceId: "E4",
            docTitle: "Remote Work, Internet & Equipment Reimbursement (Policy 7.1)",
            source: "Global HR Policy Handbook, Section 7",
            relationType: "CONTRADICT",
            supportingSimilarity: 0.01,
            contradictingSimilarity: 0.97,
            snippet: "Home utility bills (electricity, water, heating) are strictly non-reimbursable."
          }
        ]
      }
    ],
    retrievedEvidence: [
      {
        id: "E4",
        docTitle: "Remote Work, Internet & Equipment Reimbursement (Policy 7.1)",
        source: "Global HR Policy Handbook, Section 7",
        chunkIndex: 3,
        relevanceScore: 0.91,
        text: "Employees under the hybrid work agreement may work remotely up to 2 days per week with team lead approval. The company provides a one-time home office ergonomic setup stipend capped at $500 upon presentation of valid receipts. Monthly home internet expenses are subsidized up to $50 upon monthly expense report submission. Home utility bills (electricity, water, heating) are strictly non-reimbursable."
      }
    ],
    expectedVerdict: "HALLUCINATED",
    explanation: "C1 hallucinates $1,500 instead of $500. C2 asserts reimbursement for electricity, explicitly refuted by Policy 7.1. Weakest-link score: 2.1/100 (Hallucinated)."
  },
  {
    id: "scenario-hr-paternity-mixed",
    name: "3. Paternity Leave (Weakest-Link Proof)",
    tag: "Weakest-Link",
    category: "HR: Family Support",
    kbId: "kb-hr-enterprise",
    kbName: "Enterprise HR Policies & Employee Handbook (2026)",
    query: "How many weeks of paternity leave do I receive, and can I take it anytime over the child's first 2 years?",
    normalRagOutput: "Secondary caregivers and non-birthing partners are entitled to exactly 2 weeks (10 business days) of fully paid paternity leave. You can take this leave flexibly anytime within the child's first 2 years of life.",
    candidateAnswer: "Secondary caregivers and non-birthing partners are entitled to exactly 2 weeks (10 business days) of fully paid paternity leave. You can take this leave flexibly anytime within the child's first 2 years of life.",
    trustVerifiedAnswer: "Secondary caregivers receive 2 weeks (10 business days) of fully paid leave (Policy 5.4). However, it must be taken within 6 months of childbirth or adoption (not 2 years), and in no more than two separate blocks.",
    summary: "One claim is 100% correct while the second claim quietly doubles the statutory deadline from 6 months to 2 years.",
    comparisonInsight: "A naive average-based scoring algorithm would give this a passing 51% (Safe) score! TRUST Index's Weakest-Link bound flags the 4% flawed claim and prevents an unauthorized leave request.",
    claims: [
      {
        id: "C1",
        text: "Secondary caregivers and non-birthing partners are entitled to exactly 2 weeks (10 business days) of fully paid paternity leave.",
        evidenceRelations: [
          {
            evidenceId: "E3",
            docTitle: "Parental & Paternity Leave Entitlements (Policy 5.4)",
            source: "Global HR Policy Handbook, Section 5",
            relationType: "SUPPORT",
            supportingSimilarity: 0.97,
            contradictingSimilarity: 0.01,
            snippet: "Secondary caregivers and non-birthing partners (paternity leave) are entitled to exactly 2 weeks (10 business days) of fully paid leave..."
          }
        ]
      },
      {
        id: "C2",
        text: "You can take this leave flexibly anytime within the child's first 2 years of life.",
        evidenceRelations: [
          {
            evidenceId: "E3",
            docTitle: "Parental & Paternity Leave Entitlements (Policy 5.4)",
            source: "Global HR Policy Handbook, Section 5",
            relationType: "CONTRADICT",
            supportingSimilarity: 0.04,
            contradictingSimilarity: 0.94,
            snippet: "...to be taken within 6 months of childbirth or legal adoption. Paternity leave cannot be split into more than two separate blocks."
          }
        ]
      }
    ],
    retrievedEvidence: [
      {
        id: "E3",
        docTitle: "Parental & Paternity Leave Entitlements (Policy 5.4)",
        source: "Global HR Policy Handbook, Section 5",
        chunkIndex: 2,
        relevanceScore: 0.93,
        text: "Primary caregivers are entitled to 16 weeks of fully paid maternity leave. Secondary caregivers and non-birthing partners (paternity leave) are entitled to exactly 2 weeks (10 business days) of fully paid leave, to be taken within 6 months of childbirth or legal adoption. Paternity leave cannot be split into more than two separate blocks."
      }
    ],
    expectedVerdict: "HALLUCINATED",
    explanation: "Claim C1 scores 98.0 (Trusted). Claim C2 scores 4.8 (Hallucinated). Overall Trust = min(98.0, 4.8) = 4.8/100. Weakest-link protects the user."
  },
  {
    id: "scenario-hr-fully-supported",
    name: "4. Notice Period & Final Leave Payout",
    tag: "High Trust",
    category: "HR: Offboarding",
    kbId: "kb-hr-enterprise",
    kbName: "Enterprise HR Policies & Employee Handbook (2026)",
    query: "What is the standard notice period for permanent employees, and will my accrued annual leave be paid out upon resignation?",
    normalRagOutput: "The standard notice period for permanent employees is 30 calendar days. Outstanding accrued annual leave days will be paid out in your final salary settlement, calculated pro-rata at your base rate.",
    candidateAnswer: "The standard notice period for permanent employees is 30 calendar days. Outstanding accrued annual leave days will be paid out in your final salary settlement, calculated pro-rata at your base rate.",
    trustVerifiedAnswer: "Fully Verified: Standard notice period is 30 calendar days, and accrued annual leave is paid out pro-rata in the final settlement (Policy 9.3).",
    summary: "Both Normal RAG and TRUST Index agree when the source facts are faithfully represented. TRUST Index adds mathematical auditability.",
    comparisonInsight: "Here, TRUST Index provides formal proof that every proposition is entailed by Section 9.3, scoring 96/100 (Trusted).",
    claims: [
      {
        id: "C1",
        text: "The standard notice period for permanent employees is 30 calendar days.",
        evidenceRelations: [
          {
            evidenceId: "E5",
            docTitle: "Voluntary Resignation, Notice Period & Encashment (Policy 9.3)",
            source: "Global HR Policy Handbook, Section 9",
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
            evidenceId: "E5",
            docTitle: "Voluntary Resignation, Notice Period & Encashment (Policy 9.3)",
            source: "Global HR Policy Handbook, Section 9",
            relationType: "SUPPORT",
            supportingSimilarity: 0.95,
            contradictingSimilarity: 0.02,
            snippet: "Outstanding accrued annual leave days will be paid out in the final salary settlement calculated pro-rata."
          }
        ]
      }
    ],
    retrievedEvidence: [
      {
        id: "E5",
        docTitle: "Voluntary Resignation, Notice Period & Encashment (Policy 9.3)",
        source: "Global HR Policy Handbook, Section 9",
        chunkIndex: 4,
        relevanceScore: 0.88,
        text: "The standard notice period for permanent employees is 30 calendar days (60 days for senior manager level and above). Garden leave may be invoked at the company's sole discretion. Outstanding accrued annual leave days will be paid out in the final salary settlement calculated pro-rata. Unused sick leave days are forfeited upon separation and have zero cash value."
      }
    ],
    expectedVerdict: "TRUSTED",
    explanation: "Zero contradictions. All propositions backed by primary company statute. Overall Trust: 96.0/100 (Trusted)."
  },
  {
    id: "scenario-hr-pet-bereavement",
    name: "5. Pet Bereavement Leave (Corpus Void)",
    tag: "Corpus Void",
    category: "HR: Missing Topic",
    kbId: "kb-hr-enterprise",
    kbName: "Enterprise HR Policies & Employee Handbook (2026)",
    query: "Does the company HR policy grant 3 days of paid pet bereavement leave for household companions?",
    normalRagOutput: "Yes, the company grants 3 consecutive days of paid pet bereavement leave upon submitting certified veterinary confirmation.",
    candidateAnswer: "Yes, the company grants 3 consecutive days of paid pet bereavement leave upon submitting certified veterinary confirmation.",
    trustVerifiedAnswer: "The enterprise HR policy manual contains zero mention or provision for pet bereavement leave. This is an ungrounded hallucination.",
    summary: "Normal RAG invents a generous pet bereavement policy out of thin air. TRUST Index recognizes the corpus gap and marks the verdict Inconclusive / Unsupported.",
    comparisonInsight: "When asked about a non-existent benefit, standard RAG fabricates policy. TRUST Index detects zero linked evidence and refuses to certify false claims.",
    claims: [
      {
        id: "C1",
        text: "The company grants 3 consecutive days of paid pet bereavement leave for household companions.",
        evidenceRelations: []
      }
    ],
    retrievedEvidence: [],
    expectedVerdict: "INCONCLUSIVE",
    explanation: "Retrieval returns no matching passages from the HR manual. TRUST Index returns INCONCLUSIVE rather than inventing false confidence."
  },
  {
    id: "scenario-supported",
    name: "6. Superconducting Qubits (Lab Spec)",
    tag: "Technical",
    category: "Quantum Engineering",
    kbId: "kb-quantum",
    kbName: "Quantum Computing & Cryogenic Systems (2026)",
    query: "What are the cryogenic operating parameters and gate fidelity benchmarks of the Aspen-9 superconducting architecture?",
    normalRagOutput: "The Aspen-9 dilution refrigeration chamber maintains a continuous base stage temperature of 12.8 millikelvin under 24 microwatts of static thermal load. Single-qubit randomized benchmarking achieves an average gate fidelity of 99.82%, and two-qubit CZ gate operations reach up to 97.45% fidelity.",
    candidateAnswer: "The Aspen-9 dilution refrigeration chamber maintains a continuous base stage temperature of 12.8 millikelvin under 24 microwatts of static thermal load. Single-qubit randomized benchmarking achieves an average gate fidelity of 99.82%, and two-qubit CZ gate operations reach up to 97.45% fidelity.",
    trustVerifiedAnswer: "Verified: Aspen-9 maintains 12.8 mK under 24 uW load, with 99.82% 1Q and 97.45% 2Q fidelity.",
    summary: "Hardware benchmarks corroborated with high precision across technical reports.",
    comparisonInsight: "Precision technical benchmark verifying multi-claim graph alignment.",
    claims: [
      {
        id: "C1",
        text: "The Aspen-9 dilution refrigeration chamber maintains a continuous base stage temperature of 12.8 millikelvin under 24 microwatts of static thermal load.",
        evidenceRelations: [
          {
            evidenceId: "E1",
            docTitle: "Rigetti-Aspen Scalability & Cryostat Thermal Load",
            source: "Journal of Superconducting Quantum Circuits",
            relationType: "SUPPORT",
            supportingSimilarity: 0.96,
            contradictingSimilarity: 0.02,
            snippet: "The Aspen-9 dilution refrigeration chamber maintains a continuous base stage temperature of 12.8 millikelvin under a static thermal load of 24 microwatts."
          }
        ]
      },
      {
        id: "C2",
        text: "Single-qubit randomized benchmarking achieves an average gate fidelity of 99.82%, and two-qubit CZ gate operations reach up to 97.45% fidelity.",
        evidenceRelations: [
          {
            evidenceId: "E2",
            docTitle: "Qubit Error Mitigation and Readout Fidelity",
            source: "IEEE Transactions on Quantum Engineering",
            relationType: "SUPPORT",
            supportingSimilarity: 0.94,
            contradictingSimilarity: 0.02,
            snippet: "Single-qubit randomized benchmarking demonstrated an average gate fidelity of 99.82%, while two-qubit CZ gate operations reached a maximum fidelity of 97.45%..."
          }
        ]
      }
    ],
    retrievedEvidence: [
      {
        id: "E1",
        docTitle: "Rigetti-Aspen Scalability & Cryostat Thermal Load",
        source: "Journal of Superconducting Quantum Circuits, Vol. 18",
        chunkIndex: 0,
        relevanceScore: 0.94,
        text: "The Aspen-9 dilution refrigeration chamber maintains a continuous base stage temperature of 12.8 millikelvin under a static thermal load of 24 microwatts. Operating temperatures above 25 millikelvin introduce excessive quasiparticle poisoning, reducing T1 coherence times from 84 microseconds to below 18 microseconds."
      },
      {
        id: "E2",
        docTitle: "Qubit Error Mitigation and Readout Fidelity",
        source: "IEEE Transactions on Quantum Engineering, Sec. 4",
        chunkIndex: 1,
        relevanceScore: 0.88,
        text: "Single-qubit randomized benchmarking demonstrated an average gate fidelity of 99.82%, while two-qubit CZ gate operations reached a maximum fidelity of 97.45% utilizing bipolar flux pulsing. Multiplexed dispersive readout demonstrated an assignment fidelity of 96.1% over a 300ns integration window."
      }
    ],
    expectedVerdict: "TRUSTED",
    explanation: "Both claims exhibit strong positive consensus (>= 0.92) across primary passages. Score: 95.5/100 (Trusted)."
  }
];

export function getScenarioById(id) {
  return demoScenarios.find(s => s.id === id) || demoScenarios[0];
}
