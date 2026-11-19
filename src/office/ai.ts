import type { Plan } from "./brief.ts";
import type { AgentId } from "./world.ts";

export type AgentData = Record<string, unknown>;
export type AgentResult = {
  status: "working" | "done" | "error";
  data?: AgentData;
  raw?: string;
  error?: string;
  /** Seconds left while waiting for the free-tier quota to free up. */
  waiting?: number;
};

export class AiError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

const ROLE: Record<AgentId, string> = {
  raka: "Raka (Ide & Riset)",
  sari: "Sari (Cerita)",
  dimas: "Dimas (Foto)",
  nia: "Nia (Video)",
  hermes: "Hermes (Creative Director)",
};

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Pulls the first JSON object out of a model reply, tolerating code fences and chatter. */
export function parseJson(text: string): AgentData | null {
  const trimmed = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    const value = JSON.parse(trimmed.slice(start, end + 1)) as unknown;
    return value && typeof value === "object" && !Array.isArray(value) ? (value as AgentData) : null;
  } catch {
    return null;
  }
}

export const str = (v: unknown): string => (typeof v === "string" ? v.trim() : typeof v === "number" ? String(v) : "");
export const list = (v: unknown): string[] => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);
export const objs = (v: unknown): AgentData[] =>
  Array.isArray(v) ? v.filter((x): x is AgentData => !!x && typeof x === "object" && !Array.isArray(x)) : [];

export function clipText(text: string, n: number) {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
}

/** One line the agent says out loud when it hands its work over. */
export function summaryOf(id: AgentId, res: AgentResult): string {
  const said = str(res.data?.ringkas);
  if (said) return clipText(said, 110);
  const fallback = str(res.data?.judul) || str(res.data?.konsep) || str(res.data?.angle) || res.raw || "";
  return fallback ? clipText(fallback, 110) : `${ROLE[id]} selesai.`;
}

/** Plain-text rendering of one agent's work: context for the next agent and the markdown export. */
export function toText(id: AgentId, res: AgentResult): string {
  const d = res.data;
  if (!d) return res.raw ?? "";
  const lines: string[] = [];
  const add = (label: string, value: string) => value && lines.push(`${label}: ${value}`);
  if (id === "raka") {
    add("Audiens", str(d.audiens));
    add("Tren", list(d.tren).join("; "));
    add("Angle", str(d.angle));
    add("Ide", list(d.ide).join(" | "));
    add("Hashtag", list(d.hashtag).map((h) => `#${h.replace(/^#/, "")}`).join(" "));
    add("Waktu posting", str(d.waktu_posting));
  } else if (id === "sari") {
    add("Judul", str(d.judul));
    add("Hook", str(d.hook));
    add("Cerita", str(d.cerita));
    add("Caption", str(d.caption));
    add("CTA", str(d.cta));
  } else if (id === "dimas") {
    add("Konsep", str(d.konsep));
    add("Palet", list(d.palet).join(", "));
    objs(d.shots).forEach((s, i) => add(`Shot ${i + 1}`, `${str(s.judul)} — ${str(s.arahan)}`));
  } else if (id === "nia") {
    add("Judul", str(d.judul));
    add("Durasi", str(d.durasi));
    add("Musik", str(d.musik));
    objs(d.scenes).forEach((s, i) =>
      add(`Scene ${i + 1} (${str(s.waktu)})`, `${str(s.visual)} | Narasi: ${str(s.narasi)} | Teks: ${str(s.teks_layar)}`),
    );
  } else {
    add("Skor", str(d.skor));
    add("Siap publish", d.siap_publish === true ? "ya" : "belum");
    add("Kekuatan", list(d.kekuatan).join("; "));
    add("Perbaikan", list(d.perbaikan).join("; "));
    add("Catatan", str(d.catatan));
  }
  return lines.join("\n");
}

export function buildContext(done: Partial<Record<AgentId, AgentResult>>, perAgent = 800, total = 3400): string {
  const parts: string[] = [];
  for (const id of Object.keys(done) as AgentId[]) {
    const res = done[id];
    if (!res || res.status !== "done") continue;
    parts.push(`[${ROLE[id]}]\n${clipText(toText(id, res), perAgent)}`);
  }
  return parts.join("\n\n").slice(0, total);
}

export function toMarkdown(brief: string, results: Partial<Record<AgentId, AgentResult>>): string {
  const out = [`# Paket konten`, ``, `**Brief:** ${brief}`, ``];
  for (const id of ["raka", "sari", "dimas", "nia", "hermes"] as AgentId[]) {
    const res = results[id];
    if (!res || res.status !== "done") continue;
    out.push(`## ${ROLE[id]}`, ``, toText(id, res).replace(/^(.+?): /gm, "**$1:** "), ``);
  }
  return out.join("\n");
}

export async function callAgent(
  agent: AgentId,
  brief: string,
  context: string,
  onWait?: (seconds: number) => void,
  fetcher: typeof fetch = fetch,
): Promise<string> {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    let res: Response;
    try {
      res = await fetcher("/api/agent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ agent, brief, context }),
      });
    } catch {
      throw new AiError("network", "Tidak bisa terhubung ke server. Periksa koneksi internet.");
    }
    const body = (await res.json().catch(() => null)) as { text?: string; error?: string; message?: string; retryAfter?: number } | null;
    if (res.status === 429) {
      const wait = Math.min(Math.max(Math.ceil(Number(body?.retryAfter) || 12), 3), 30);
      onWait?.(wait);
      await sleep((wait + 1) * 1000);
      continue;
    }
    if (!res.ok || !body?.text) throw new AiError(body?.error ?? "unknown", body?.message ?? `Server membalas HTTP ${res.status}.`);
    return body.text;
  }
  throw new AiError("rate_limited", "Kuota gratis sedang penuh. Coba kirim brief lagi sebentar lagi.");
}

export type PipelineCallbacks = {
  onStart: (id: AgentId) => void;
  onWait: (id: AgentId, seconds: number) => void;
  onDone: (id: AgentId, result: AgentResult, next: AgentId | undefined) => void;
  onError: (id: AgentId, message: string) => void;
  onFinish: () => void;
};

/** Runs the plan one agent at a time: the free tiers are rate limited, so no parallel calls. */
export async function runPipeline(plan: Plan, brief: string, cb: PipelineCallbacks, fetcher?: typeof fetch) {
  const order = plan.groups.flat() as AgentId[];
  const done: Partial<Record<AgentId, AgentResult>> = {};
  for (let i = 0; i < order.length; i += 1) {
    const id = order[i]!;
    const next = order[i + 1];
    cb.onStart(id);
    try {
      const raw = await callAgent(id, brief, buildContext(done), (s) => cb.onWait(id, s), fetcher);
      const data = parseJson(raw);
      const result: AgentResult = { status: "done", ...(data ? { data } : {}), raw };
      done[id] = result;
      cb.onDone(id, result, next);
    } catch (error) {
      const err = error instanceof AiError ? error : new AiError("unknown", "Terjadi kesalahan tak terduga.");
      cb.onError(id, err.message);
      if (err.code === "no_key" || err.code === "bad_key" || err.code === "network") break;
    }
  }
  cb.onFinish();
}

const POLL = "https://image.pollinations.ai/prompt";

export function imageUrl(prompt: string, seed: number, size = 768): string {
  const q = new URLSearchParams({ width: String(size), height: String(size), model: "flux", nologo: "true", seed: String(seed) });
  return `${POLL}/${encodeURIComponent(prompt.slice(0, 600))}?${q.toString()}`;
}
