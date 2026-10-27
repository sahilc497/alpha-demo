# TRUST Index — Explainable Trust Verification Framework (Demo)

A premium frontend demonstration prototype of **TRUST Index**, an explainable trust-verification framework for Retrieval-Augmented Generation (RAG) systems.

This prototype demonstrates how black-box AI answers can be decomposed into isolated atomic propositions, mapped to bidirectional evidence (supporting vs. contradicting passages), and evaluated with an un-gameable **Weakest-Link Consensus Scoring Engine**.

---

## Visual & Aesthetic Direction

- **Monochrome Elegance**: Built with pure black (`#000000`), deep section surfaces (`#080808`), and metallic silver gradients.
- **Display Typography**: Google Font `Barlow Condensed` for high-impact hero headers, paired with `Inter` for clean technical body reading, and `JetBrains Mono` for scientific metrics and formulas.
- **Interactive Evidence Graph**: Direct bipartite claim-to-evidence graph rendered via `@xyflow/react` with color-coded directional edge relationships (support, contradiction, corpus gaps) and synchronized inspection panels.

---

## Core Capabilities & Modes

The interactive demo workspace supports **three independent execution modes**:

1. **RAG Only**:
   - Queries a selected mock knowledge base.
   - Displays simulated document retrieval and relevance rankings.
   - Synthesizes candidate answers (via Mistral AI `mistral-small-latest` or deterministic research fallback).
   - *Intentionally excludes TRUST Index scores to showcase standard RAG baseline behavior.*

2. **TRUST Index Only**:
   - Selects from 6 pre-calibrated verification benchmark scenarios.
   - Decomposes candidate answers into atomic propositional claims.
   - Visualizes supporting, contradicting, and missing evidence.
   - Renders the interactive claim-evidence bipartite graph.
   - Computes real-time consensus and weakest-link scores in frontend JavaScript.
   - *Works 100% offline without any API key.*

3. **Combined RAG + TRUST Index**:
   - Executes the complete dual-stage pipeline: Simulated retrieval &rarr; LLM synthesis &rarr; Atomic claim extraction &rarr; Natural language inference &rarr; Weakest-link graph proof.

---

## Mathematical Formulations

TRUST Index calculates verification consensus per atomic claim $c \in C$:

$$\text{Consensus}(c) = \frac{\sum \text{Sim}_{\text{sup}} - \sum \text{Sim}_{\text{con}}}{\sum \text{Sim}_{\text{tot}} + \epsilon}$$

Calibrated linearly into $[0, 100]$:

$$\text{ClaimScore}(c) = \left(\frac{\text{Consensus}(c) + 1}{2}\right) \times 100$$

Aggregated using the **Weakest-Link Invariant**:

$$\text{OverallTrustScore} = \min_{c \in C} \text{ClaimScore}(c)$$

### Project Defined Verdicts

| Score Range | Verdict | Meaning |
| :--- | :--- | :--- |
| **80 – 100** | **Trusted** | All claims corroborated by primary evidence with high consensus. |
| **50 – 79** | **Uncertain** | Partial support or ambiguous consensus detected across evidence. |
| **0 – 49** | **Hallucinated** | Direct contradiction or fabricated entity identified by weakest link. |
| **No Usable Evidence** | **Inconclusive** | Corpus gap: system acknowledges absence of ground truth. |

---

## 6 Curated Benchmark Scenarios

1. **Supported Answer**: Aspen-9 cryogenic parameters and gate fidelity benchmarks verified by primary literature (Score: ~95, Trusted).
2. **Unsupported Claim**: Fabricated commercial enterprise licensing fees and quantum supremacy milestone absent from corpus (Score: ~15, Hallucinated).
3. **Numeric Contradiction**: Candidate claims 150,000 MT reporting ceiling, while statutory guidance states 25,000 MT (Score: ~5, Hallucinated).
4. **Negation Contradiction**: Inverts explicit prohibition to claim municipal utilities are granted statutory exemptions (Score: ~4, Hallucinated).
5. **Mixed Evidence (Weakest-Link Proof)**: One claim has 98% support while a second claim introduces an invented severe adverse event. Shows how minimum-bound aggregation prevents lethal hallucinations from hiding behind true facts.
6. **Insufficient Evidence (Corpus Void)**: Geothermal extraction query routed to aerospace avionics repository. System outputs *Inconclusive* rather than fabricating confidence.

---

## Mistral AI Integration (Optional)

The application supports live answer generation using Mistral's chat completions API:

- **Endpoint**: `https://api.mistral.ai/v1/chat/completions`
- **Model**: `mistral-small-latest`
- **Security & Privacy**: Browser-side API keys are kept strictly in transient session memory. Never committed to git or persisted to disk.

### Configuring Your Key

- **Option A**: Click **API Settings** in the top navigation or demo workspace and enter your temporary key.
- **Option B**: Create a `.env` file in `trust-index-demo/`:
  ```bash
  cp .env.example .env
  ```
  Set:
  ```env
  VITE_MISTRAL_API_KEY=your_mistral_api_key_here
  ```

*Note: The rest of the prototype (scenarios, graph, scoring formulas, and mock RAG) functions completely without an API key.*

---

## Setup & Running Locally

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
cd trust-index-demo
npm install
```

### Launch Development Server

```bash
npm run dev
```

Visit the local development URL (typically `http://localhost:5173/`).

### Production Build

```bash
npm run build
npm run preview
```

---

## Limitations & Academic Transparency

- This prototype executes the **mathematical consensus equations and graph traversal directly in frontend JavaScript**.
- Document retrieval and NLI relation scoring are simulated using curated benchmark datasets and lexical similarity functions. They do not run heavy transformer models (e.g. RoBERTa-large-MNLI) in the browser.
- Live answer synthesis can optionally run against Mistral AI when an API key is provided.

---

## License

Research Prototype &middot; TRUST Index Project &middot; 2026.
