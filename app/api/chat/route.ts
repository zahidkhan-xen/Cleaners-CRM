import Anthropic from "@anthropic-ai/sdk";
import { CRM_SUMMARY } from "@/lib/analytics";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an AI assistant embedded in CleanPro CRM, a cleaning business lead management dashboard.
You have access to the following live CRM data for March 2026:

${JSON.stringify(CRM_SUMMARY, null, 2)}

Answer questions about leads, VAs, conversions, revenue, and performance concisely.
Be data-driven. Use the numbers above in your answers. Format numbers clearly.
If asked something outside this data, say so honestly.
Keep responses short and actionable — 2-4 sentences max unless a list is needed.`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY not configured. Add it to your .env.local file." },
      { status: 503 }
    );
  }

  try {
    const { messages } = await req.json();

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content
      .filter(b => b.type === "text")
      .map(b => (b as { type: "text"; text: string }).text)
      .join("");

    return Response.json({ reply: text });
  } catch (err: any) {
    return Response.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
