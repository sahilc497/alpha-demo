/**
 * Mock Knowledge Bases for TRUST Index Demonstration
 * Features realistic Enterprise HR policies and technical research corpora.
 */

export const mockKnowledgeBases = [
  {
    id: "kb-hr-enterprise",
    name: "Enterprise HR Policies & Employee Handbook (2026)",
    description: "Official company policies covering Annual Leave, Sick Leave, Paternity/Maternity, Remote Work Stipends, and Resignation.",
    docCount: 28,
    isFeatured: true,
    passages: [
      {
        id: "doc-hr1",
        kbId: "kb-hr-enterprise",
        title: "Annual Leave Accrual, Carryover & Advance Notice (Policy 3.1)",
        source: "Global HR Policy Handbook, Section 3: Time Off & Attendance",
        chunkIndex: 0,
        relevanceScore: 0.96,
        text: "Full-time employees accrue 18 days of paid annual leave per calendar year. A maximum of 5 unused annual leave days may be carried forward into the following calendar year, and these carried days must be utilized before March 31st or they will permanently lapse without financial compensation. Annual leave requests exceeding 3 consecutive business days require at least 14 days advance written notice and line manager approval."
      },
      {
        id: "doc-hr2",
        kbId: "kb-hr-enterprise",
        title: "Sick Leave, Medical Certification & Non-Encashment (Policy 4.2)",
        source: "Global HR Policy Handbook, Section 4: Health & Wellness",
        chunkIndex: 1,
        relevanceScore: 0.95,
        text: "Employees receive 10 days of paid sick leave annually. Sick leave is strictly reserved for personal illness, medical appointments, or temporary incapacity. Unused sick leave cannot be encashed, compensated financially, or carried forward into subsequent calendar years. Any sick leave exceeding 2 consecutive business days requires a certified doctor's medical note submitted within 48 hours of return to work."
      },
      {
        id: "doc-hr3",
        kbId: "kb-hr-enterprise",
        title: "Parental & Paternity Leave Entitlements (Policy 5.4)",
        source: "Global HR Policy Handbook, Section 5: Family Support",
        chunkIndex: 2,
        relevanceScore: 0.93,
        text: "Primary caregivers are entitled to 16 weeks of fully paid maternity leave. Secondary caregivers and non-birthing partners (paternity leave) are entitled to exactly 2 weeks (10 business days) of fully paid leave, to be taken within 6 months of childbirth or legal adoption. Paternity leave cannot be split into more than two separate blocks."
      },
      {
        id: "doc-hr4",
        kbId: "kb-hr-enterprise",
        title: "Remote Work, Internet & Equipment Reimbursement (Policy 7.1)",
        source: "Global HR Policy Handbook, Section 7: Hybrid Workplace",
        chunkIndex: 3,
        relevanceScore: 0.89,
        text: "Employees under the hybrid work agreement may work remotely up to 2 days per week with team lead approval. The company provides a one-time home office ergonomic setup stipend capped at $500 upon presentation of valid receipts. Monthly home internet expenses are subsidized up to $50 upon monthly expense report submission. Home utility bills (electricity, water, heating) are strictly non-reimbursable."
      },
      {
        id: "doc-hr5",
        kbId: "kb-hr-enterprise",
        title: "Voluntary Resignation, Notice Period & Encashment (Policy 9.3)",
        source: "Global HR Policy Handbook, Section 9: Separation & Offboarding",
        chunkIndex: 4,
        relevanceScore: 0.86,
        text: "The standard notice period for permanent employees is 30 calendar days (60 days for senior manager level and above). Garden leave may be invoked at the company's sole discretion. Outstanding accrued annual leave days will be paid out in the final salary settlement calculated pro-rata. Unused sick leave days are forfeited upon separation and have zero cash value."
      }
    ]
  },
  {
    id: "kb-quantum",
    name: "Quantum Computing & Cryogenic Systems (2026)",
    description: "Technical specifications and laboratory benchmarks for superconducting qubit architectures and dilution refrigeration.",
    docCount: 14,
    passages: [
      {
        id: "doc-q1",
        kbId: "kb-quantum",
        title: "Rigetti-Aspen Scalability & Cryostat Thermal Load",
        source: "Journal of Superconducting Quantum Circuits, Vol. 18",
        chunkIndex: 0,
        relevanceScore: 0.94,
        text: "The Aspen-9 dilution refrigeration chamber maintains a continuous base stage temperature of 12.8 millikelvin under a static thermal load of 24 microwatts. Operating temperatures above 25 millikelvin introduce excessive quasiparticle poisoning, reducing T1 coherence times from 84 microseconds to below 18 microseconds."
      },
      {
        id: "doc-q2",
        kbId: "kb-quantum",
        title: "Qubit Error Mitigation and Readout Fidelity",
        source: "IEEE Transactions on Quantum Engineering, Sec. 4",
        chunkIndex: 1,
        relevanceScore: 0.88,
        text: "Single-qubit randomized benchmarking demonstrated an average gate fidelity of 99.82%, while two-qubit CZ gate operations reached a maximum fidelity of 97.45% utilizing bipolar flux pulsing. Multiplexed dispersive readout demonstrated an assignment fidelity of 96.1% over a 300ns integration window."
      }
    ]
  },
  {
    id: "kb-climate",
    name: "Global Climate Accord & Industrial Decarbonization",
    description: "Statutory frameworks, carbon border adjustment mechanisms, and municipal net-zero targets.",
    docCount: 22,
    passages: [
      {
        id: "doc-c1",
        kbId: "kb-climate",
        title: "Article 6.4 Supervisory Body Guidance on Cross-Border Credits",
        source: "UNFCCC COP30 Technical Annex",
        chunkIndex: 0,
        relevanceScore: 0.96,
        text: "The mandatory emissions reporting ceiling takes effect on January 1, 2028, requiring all industrial entities emitting in excess of 25,000 metric tons of CO2e per annum to submit third-party verified emissions inventories. No exemptions are granted for municipal utilities."
      }
    ]
  },
  {
    id: "kb-biomedical",
    name: "CRISPR-Cas Therapeutic Trials & Clinical Toxicology",
    description: "Phase II and III clinical trial data, off-target cleavage assays, and lipid nanoparticle biodistribution.",
    docCount: 19,
    passages: [
      {
        id: "doc-b1",
        kbId: "kb-biomedical",
        title: "In-Vivo Transthyretin Amyloidosis Gene Editing",
        source: "New England Journal of Clinical Genetics, May 2026",
        chunkIndex: 0,
        relevanceScore: 0.95,
        text: "Cohort 4 patients receiving a single intravenous infusion of 0.7 mg/kg NTLA-2001 achieved an 87% mean reduction in serum TTR protein concentration at day 28 (p < 0.001). Liver function test elevations were transient, resolving to baseline within 14 days without systemic corticosteroid intervention."
      }
    ]
  }
];

export function getKnowledgeBaseById(id) {
  return mockKnowledgeBases.find(kb => kb.id === id) || mockKnowledgeBases[0];
}
