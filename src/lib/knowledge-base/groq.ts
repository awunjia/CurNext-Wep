const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

/** Fast free-tier Groq model - override with GROQ_MODEL if needed. */
const DEFAULT_MODEL = "llama-3.1-8b-instant";

export type GroqChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function completeWithGroq(input: {
  messages: GroqChatMessage[];
  apiKey: string;
  model?: string;
}): Promise<string> {
  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${input.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: input.model || process.env.GROQ_MODEL || DEFAULT_MODEL,
      temperature: 0.2,
      max_tokens: 900,
      messages: input.messages,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Groq request failed (${response.status})${detail ? `: ${detail.slice(0, 200)}` : ""}`,
    );
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("Groq returned an empty answer");
  }

  return content;
}
