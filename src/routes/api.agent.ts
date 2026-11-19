import { createFileRoute } from "@tanstack/react-router";
import { AGENT_SETUP, hitRateLimit, userPrompt, validateAgentRequest } from "@/office/ai-prompts";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-120b";

function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra },
  });
}

async function callGroq(url: string, key: string, body: Record<string, unknown>) {
  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(45_000),
  });
}

export const Route = createFileRoute("/api/agent")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { env } = await import("@/lib/env.server");

        // Same-site browsers only. Other callers are still bounded by the rate limit below.
        const origin = request.headers.get("origin");
        if (origin) {
          let host = "";
          try {
            host = new URL(origin).host;
          } catch {
            /* malformed origin is rejected below */
          }
          if (host !== new URL(request.url).host) return json({ error: "forbidden", message: "Origin tidak diizinkan." }, 403);
        }

        const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "anon";
        if (hitRateLimit(ip)) {
          return json({ error: "rate_limited", message: "Terlalu banyak permintaan. Tunggu sebentar.", retryAfter: 12 }, 429);
        }

        const key = env("GROQ_API_KEY");
        if (!key) {
          return json(
            { error: "no_key", message: "GROQ_API_KEY belum dipasang di Vercel (Settings → Environment Variables)." },
            503,
          );
        }

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json({ error: "bad_request", message: "JSON tidak valid." }, 400);
        }
        const parsed = validateAgentRequest(raw);
        if (!parsed.ok) return json({ error: "bad_request", message: parsed.message }, 400);

        const { agent } = parsed.value;
        const setup = AGENT_SETUP[agent];
        const model = env("GROQ_MODEL") ?? DEFAULT_MODEL;
        const url = env("GROQ_API_URL") ?? GROQ_URL;
        const payload: Record<string, unknown> = {
          model,
          temperature: 0.8,
          max_completion_tokens: setup.maxTokens,
          messages: [
            { role: "system", content: setup.system },
            { role: "user", content: userPrompt(parsed.value) },
          ],
          response_format: { type: "json_object" },
        };
        if (/gpt-oss/i.test(model)) payload.reasoning_effort = "low";

        try {
          let res = await callGroq(url, key, payload);
          if (res.status === 400) {
            // Some models reject JSON mode; the client parser copes with plain text.
            delete payload.response_format;
            res = await callGroq(url, key, payload);
          }
          if (res.status === 429) {
            const wait = Number(res.headers.get("retry-after")) || 12;
            return json({ error: "rate_limited", message: "Kuota gratis Groq sedang penuh.", retryAfter: wait }, 429);
          }
          if (res.status === 401 || res.status === 403) {
            return json({ error: "bad_key", message: "GROQ_API_KEY ditolak Groq. Periksa kuncinya." }, 502);
          }
          if (!res.ok) {
            return json({ error: "upstream", message: `Groq membalas HTTP ${res.status}.` }, 502);
          }
          const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
          const text = data.choices?.[0]?.message?.content?.trim();
          if (!text) return json({ error: "empty", message: "Groq membalas kosong." }, 502);
          return json({ text, model });
        } catch {
          return json({ error: "upstream", message: "Tidak bisa menghubungi Groq (timeout)." }, 504);
        }
      },
    },
  },
});
