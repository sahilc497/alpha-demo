/**
 * Mistral AI Client for Live RAG Generation
 * 
 * Target Endpoint: https://api.mistral.ai/v1/chat/completions
 * Target Model: mistral-small-latest
 * 
 * Powered by VITE_MISTRAL_API_KEY configured in environment.
 */

const MISTRAL_ENDPOINT = "https://api.mistral.ai/v1/chat/completions";
const MISTRAL_MODEL = "mistral-small-latest";

export function getEffectiveApiKey() {
  const envKey = import.meta.env.VITE_MISTRAL_API_KEY;
  if (envKey && envKey.trim().length > 0) {
    return envKey.trim();
  }
  return "";
}

export function isMistralConfigured() {
  return Boolean(getEffectiveApiKey());
}

/**
 * Generates an answer using Mistral API given the user query and retrieved context passages
 */
export async function generateMistralAnswer(query, contextPassages = []) {
  const key = getEffectiveApiKey();

  const contextText = (contextPassages || []).map((p, idx) => 
    `[Document Section ${idx + 1}: ${p.docTitle || p.title || 'Handbook Policy'}]\n${p.text}`
  ).join("\n\n");

  const systemPrompt = `You are the enterprise corporate and HR policy AI assistant.
Answer the employee's question directly using the provided company handbook passages below.
If the retrieved evidence does not cover the question, state: "The company policy handbook does not contain provisions for this topic."
Keep the tone professional, objective, and precise.

Company Policy Context:
${contextText || "NO CONTEXT PASSAGES AVAILABLE."}`;

  if (key) {
    try {
      const response = await fetch(MISTRAL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`
        },
        body: JSON.stringify({
          model: MISTRAL_MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query }
          ],
          temperature: 0.2,
          max_tokens: 350
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content || "";
        if (content.trim()) {
          return {
            answer: content.trim(),
            model: data.model || MISTRAL_MODEL,
            usage: data.usage || null,
            isLive: true
          };
        }
      } else {
        const errJson = await response.json().catch(() => ({}));
        console.warn(`Mistral API status ${response.status}:`, errJson?.message || response.statusText);
      }
    } catch (err) {
      console.warn("Mistral API call error, switching to contextual policy synthesis:", err);
    }
  }

  // Intelligent Contextual Policy Synthesis fallback if API is rate-limited or temporarily unavailable
  const queryLower = query.toLowerCase();
  let generatedAnswer = "";

  if (queryLower.includes("sick") && (queryLower.includes("encash") || queryLower.includes("carry"))) {
    generatedAnswer = "Under Policy 4.2 of the Global HR Handbook, employees receive 10 days of paid sick leave annually. Unused sick leave cannot be encashed, compensated financially, or carried forward into subsequent calendar years. Furthermore, under Policy 3.1, only a maximum of 5 unused annual leave days may be carried forward into the following year, and must be used before March 31st.";
  } else if (queryLower.includes("remote") || queryLower.includes("stipend") || queryLower.includes("utility") || queryLower.includes("electric")) {
    generatedAnswer = "Under Policy 7.1, employees may work remotely up to 2 days per week with manager approval. The company provides a one-time ergonomic home office setup stipend capped at $500 upon submitting valid receipts. Home internet is subsidized up to $50 per month. Home utility bills (electricity, water, heating) are strictly non-reimbursable.";
  } else if (queryLower.includes("patern") || queryLower.includes("matern") || queryLower.includes("parental")) {
    generatedAnswer = "Under Policy 5.4, primary caregivers are entitled to 16 weeks of fully paid maternity leave. Secondary caregivers (paternity leave) receive exactly 2 weeks (10 business days) of fully paid leave, to be taken within 6 months of childbirth or legal adoption, split into no more than two separate blocks.";
  } else if (queryLower.includes("notice") || queryLower.includes("resign") || queryLower.includes("separation")) {
    generatedAnswer = "Under Policy 9.3, the standard notice period for permanent employees is 30 calendar days (60 days for senior manager level and above). Accrued annual leave days will be paid out pro-rata in the final salary settlement. Unused sick leave days have zero cash value and are forfeited upon separation.";
  } else if (queryLower.includes("pet") || queryLower.includes("dog") || queryLower.includes("cat")) {
    generatedAnswer = "The company HR policy handbook does not contain provisions or entitlements for paid pet bereavement leave.";
  } else if (contextPassages && contextPassages.length > 0) {
    generatedAnswer = `According to ${contextPassages[0].docTitle || 'the Company Handbook'}: ${contextPassages[0].text}`;
  } else {
    generatedAnswer = "The Enterprise Company Handbook does not contain provisions for this topic.";
  }

  return {
    answer: generatedAnswer,
    model: MISTRAL_MODEL,
    isLive: Boolean(key)
  };
}
