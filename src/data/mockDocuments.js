/**
 * Mock Knowledge Bases for TRUST Index Demonstration
 * Features realistic Enterprise HR policies and technical research corpora.
 */

export const mockKnowledgeBases = [
  {
    id: "kb-hr-enterprise",
    name: "Enterprise Corporate & HR Employee Handbook (2026)",
    description: "Official company policies covering Annual Leave, Sick Leave, Parental Support, Healthcare, Remote Work, Business Travel, IT Equipment, Code of Conduct, Secondary Employment, and Resignation.",
    docCount: 20,
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
      },
      {
        id: "doc-hr6",
        kbId: "kb-hr-enterprise",
        title: "Health, Medical, Dental & Vision Insurance Coverage (Policy 4.1)",
        source: "Global HR Policy Handbook, Section 4: Health & Wellness",
        chunkIndex: 5,
        relevanceScore: 0.92,
        text: "All regular full-time employees are eligible for comprehensive medical, dental, and vision insurance effective on the first day of the calendar month following their start date. The company subsidizes 85% of employee healthcare plan premiums and 60% of eligible dependent premiums. Annual open enrollment takes place every November."
      },
      {
        id: "doc-hr7",
        kbId: "kb-hr-enterprise",
        title: "Working Hours, Core Collaboration Hours & Overtime Policy (Policy 6.1)",
        source: "Global HR Policy Handbook, Section 6: Workplace Operations",
        chunkIndex: 6,
        relevanceScore: 0.91,
        text: "Standard business hours are Monday through Friday, 9:00 AM to 5:00 PM local time (40 hours per week). Core collaboration hours where all team members must be reachable are 10:00 AM to 4:00 PM. Non-exempt hourly employees who work in excess of 40 hours per workweek receive overtime pay at 1.5x their regular hourly rate. Overtime requires prior written approval from the departmental manager."
      },
      {
        id: "doc-hr8",
        kbId: "kb-hr-enterprise",
        title: "Employee Code of Conduct, Anti-Bribery & Gift Policy (Policy 8.5)",
        source: "Global HR Policy Handbook, Section 8: Legal & Ethical Standards",
        chunkIndex: 7,
        relevanceScore: 0.90,
        text: "Employees must maintain the highest standards of professional ethics and integrity. Soliciting or accepting personal gifts, entertainment, or hospitality from vendors, clients, or third parties exceeding $75 in fair market value is strictly prohibited. Modest promotional items under $25 (pens, calendars) are permitted. Any conflicts of interest or attempted bribes must be immediately disclosed to the Compliance Office."
      },
      {
        id: "doc-hr9",
        kbId: "kb-hr-enterprise",
        title: "Secondary Employment, Moonlighting & Conflicts of Interest (Policy 8.4)",
        source: "Global HR Policy Handbook, Section 8: Legal & Ethical Standards",
        chunkIndex: 8,
        relevanceScore: 0.88,
        text: "Employees may engage in secondary employment (moonlighting) or freelance consulting provided it does not interfere with their job responsibilities, does not use company equipment or intellectual property, and does not involve a direct commercial competitor or vendor of the company. Prior written disclosure and written authorization from HR and the employee's Vice President is mandatory."
      },
      {
        id: "doc-hr10",
        kbId: "kb-hr-enterprise",
        title: "Company IT Equipment, Laptop Security & Acceptable Use (Policy 8.1)",
        source: "Global HR Policy Handbook, Section 8: Technology & Data Security",
        chunkIndex: 9,
        relevanceScore: 0.89,
        text: "Company-issued laptops, mobile phones, and computing devices remain the sole property of the company and are intended for authorized business purposes. Installing unapproved third-party software, disabling endpoint antivirus protection, or circumventing security controls is strictly prohibited. Lost or stolen devices must be reported to the IT Helpdesk and Security Incident Response within 2 hours of discovery."
      },
      {
        id: "doc-hr11",
        kbId: "kb-hr-enterprise",
        title: "Business Travel, Flights, Hotel & Per Diem Meal Expenses (Policy 7.3)",
        source: "Global HR Policy Handbook, Section 7: Travel & Business Expenses",
        chunkIndex: 10,
        relevanceScore: 0.94,
        text: "Business travel must be pre-approved by the department director. Economy class must be booked for all domestic flights and international flights under 6 hours. Business class is permitted for continuous international flights exceeding 6 hours. Daily meal per diem is capped at $75 per day ($20 breakfast, $25 lunch, $30 dinner) upon presenting itemized merchant receipts. Alcohol purchases are not reimbursable unless part of an authorized client dinner."
      },
      {
        id: "doc-hr12",
        kbId: "kb-hr-enterprise",
        title: "Performance Appraisals, Promotion Cycles & Salary Reviews (Policy 9.1)",
        source: "Global HR Policy Handbook, Section 9: Career Development",
        chunkIndex: 11,
        relevanceScore: 0.90,
        text: "Formal performance evaluations occur annually during Q4, followed by salary and merit adjustments taking effect on January 1st. Promotion cycles occur bi-annually in June and December. Eligibility for promotion requires meeting or exceeding performance expectations for at least two consecutive evaluation cycles and a minimum of 12 months in the current role."
      },
      {
        id: "doc-hr13",
        kbId: "kb-hr-enterprise",
        title: "Employee Referral Bonus & Continuing Education Tuition Reimbursement (Policy 9.2)",
        source: "Global HR Policy Handbook, Section 9: Career Development",
        chunkIndex: 12,
        relevanceScore: 0.91,
        text: "Employees who successfully refer a qualified candidate who is hired and completes their 90-day probationary period receive a referral bonus of $2,500 ($4,000 for specialized senior engineering roles). The company also provides up to $3,000 annually in tuition reimbursement for accredited degree programs or professional certifications aligned with the employee's career trajectory, subject to manager pre-approval."
      },
      {
        id: "doc-hr14",
        kbId: "kb-hr-enterprise",
        title: "Equal Employment Opportunity, Anti-Harassment & Non-Discrimination (Policy 2.1)",
        source: "Global HR Policy Handbook, Section 2: Workplace Culture & Conduct",
        chunkIndex: 13,
        relevanceScore: 0.95,
        text: "The company is committed to providing a work environment free from discrimination, harassment, and retaliation based on race, color, religion, sex, sexual orientation, gender identity, national origin, disability, or age. Zero tolerance is enforced for sexual harassment or workplace bullying. Violations result in immediate disciplinary action up to and including immediate termination."
      },
      {
        id: "doc-hr15",
        kbId: "kb-hr-enterprise",
        title: "Grievance Redressal, Open Door Policy & Whistleblower Protection (Policy 2.3)",
        source: "Global HR Policy Handbook, Section 2: Workplace Culture & Conduct",
        chunkIndex: 14,
        relevanceScore: 0.89,
        text: "Employees are encouraged to report concerns or policy violations to their immediate supervisor, HR Business Partner, or anonymously through the 24/7 Whistleblower Hotline. The company strictly prohibits retaliation against any individual who reports a violation in good faith or participates in an investigation. All reports are investigated promptly and confidentially."
      },
      {
        id: "doc-hr16",
        kbId: "kb-hr-enterprise",
        title: "Bereavement Leave for Family Members (Policy 4.5)",
        source: "Global HR Policy Handbook, Section 4: Health & Wellness",
        chunkIndex: 15,
        relevanceScore: 0.92,
        text: "Employees are entitled to up to 5 consecutive paid business days of bereavement leave upon the passing of an immediate family member (spouse, child, parent, sibling). Up to 3 consecutive paid days are provided for extended family members (grandparents, grandchildren, parents-in-law). Additional unpaid leave or use of annual leave may be requested for travel."
      },
      {
        id: "doc-hr17",
        kbId: "kb-hr-enterprise",
        title: "Intellectual Property, Inventions & Confidentiality (NDA) (Policy 8.3)",
        source: "Global HR Policy Handbook, Section 8: Legal & Ethical Standards",
        chunkIndex: 16,
        relevanceScore: 0.93,
        text: "All inventions, software code, designs, documentation, and work product conceived, developed, or reduced to practice during employment that relate to company business are the exclusive intellectual property of the company. Employees must maintain strict confidentiality of proprietary data, customer lists, and trade secrets during and indefinitely following termination of employment."
      },
      {
        id: "doc-hr18",
        kbId: "kb-hr-enterprise",
        title: "Workplace Attire & Business Casual Dress Code (Policy 10.1)",
        source: "Global HR Policy Handbook, Section 10: Office Environment",
        chunkIndex: 17,
        relevanceScore: 0.87,
        text: "The company maintains a 'smart casual' dress code for standard in-office workdays. Clean jeans, collared shirts, blouses, sweaters, and clean sneakers or shoes are acceptable. Clothing with offensive graphics, gym wear, or beachwear is not permitted in the office. Formal business attire is expected when meeting clients or representing the company at external executive events."
      },
      {
        id: "doc-hr19",
        kbId: "kb-hr-enterprise",
        title: "Probationary Period for New Hires (Policy 6.3)",
        source: "Global HR Policy Handbook, Section 6: Workplace Operations",
        chunkIndex: 18,
        relevanceScore: 0.89,
        text: "All newly hired employees serve an initial probationary period of 90 calendar days from their start date. During this period, performance, attendance, and team alignment are reviewed at the 30, 60, and 90-day milestones. Completion of probation is formally confirmed in writing by the line manager."
      },
      {
        id: "doc-hr20",
        kbId: "kb-hr-enterprise",
        title: "Public Holidays, Floating Holidays & Sabbaticals (Policy 3.4)",
        source: "Global HR Policy Handbook, Section 3: Time Off & Attendance",
        chunkIndex: 19,
        relevanceScore: 0.91,
        text: "The company observes 11 standard paid public holidays each calendar year. In addition, full-time employees receive 2 paid floating holidays per year to observe personal religious, cultural, or commemorative days. Employees with over 5 years of continuous service may apply for an unpaid sabbatical leave of up to 3 months with executive approval."
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
