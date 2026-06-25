import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(30),
});

const SYSTEM_PROMPT = `You are "Aamod Assistant", a friendly, professional support chatbot for Aamod Finserv — a financial consultancy in India that helps with:
- Business & personal loans (loan consultancy)
- Project funding
- Government subsidies (PMEGP, MSME, etc.)
- Financial health checkup
- Labour law consultancy
- EMI calculator support

Contact details:
- Phone: +91 97840 09748
- Email: admin1@aamodfinserv.com
- Hours: Mon–Sat, 09:00–20:00
- Website pages: /services, /calculator, /partners, /about, /contact

Guidelines:
- Keep replies short, warm, and helpful (2–5 sentences).
- Never invent interest rates, approval guarantees, or legal advice.
- For specific eligibility / quotes, suggest calling +91 97840 09748 or visiting /contact.
- Use plain English, occasional bullet points; no markdown headings.`;

export const sendChatMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { reply: "Chat is temporarily unavailable. Please call +91 97840 09748." };
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...data.messages,
        ],
      }),
    });

    if (!res.ok) {
      if (res.status === 429) {
        return { reply: "We're getting a lot of requests right now. Please try again in a moment, or call +91 97840 09748." };
      }
      if (res.status === 402) {
        return { reply: "Chat is temporarily unavailable. Please reach us at +91 97840 09748 or admin1@aamodfinserv.com." };
      }
      return { reply: "Sorry, I couldn't process that. Please try again or call +91 97840 09748." };
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = json.choices?.[0]?.message?.content?.trim() ||
      "I'm here to help. Could you rephrase that?";
    return { reply };
  });