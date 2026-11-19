/**
 * Shared, dependency-free pieces of the AI backend: what each agent is told,
 * how a request is validated, and a tiny per-IP rate limiter. Kept free of
 * framework imports so it can be unit tested with plain Node.
 */

export type AiAgentId = "raka" | "sari" | "dimas" | "nia" | "hermes";

export const AI_AGENT_IDS: AiAgentId[] = ["raka", "sari", "dimas", "nia", "hermes"];

export type AgentSetup = { system: string; maxTokens: number };

const BASE =
  "Kamu anggota tim konten kreatif berbahasa Indonesia. Balas HANYA dengan satu objek JSON valid, tanpa markdown dan tanpa teks lain. " +
  "Tulis dalam bahasa Indonesia, kecuali kolom yang namanya berakhiran _en (bahasa Inggris). " +
  "Konkret, singkat, dan siap pakai. Jangan mengarang fakta, angka statistik, atau nama merek yang tidak ada di brief. " +
  'Kolom "ringkas" wajib ada: satu kalimat maksimal 90 karakter, kamu ucapkan ke rekan satu tim.';

export const AGENT_SETUP: Record<AiAgentId, AgentSetup> = {
  raka: {
    maxTokens: 800,
    system:
      `${BASE}\n\nPeranmu: Raka, strategis dan periset konten. Dari brief, tentukan arah konten.\n` +
      'Skema JSON: {"ringkas": string, "audiens": string, "tren": [3 string], "angle": string, ' +
      '"ide": [3 string, masing-masing judul + satu kalimat], "hashtag": [6 string tanpa #], "waktu_posting": string}',
  },
  sari: {
    maxTokens: 1100,
    system:
      `${BASE}\n\nPeranmu: Sari, storyteller dan penulis naskah. Tulis cerita atau naskah utuh yang enak dibaca/didengar, ` +
      "dengan pembuka yang kuat, alur jelas, dan penutup. Panjang cerita 120 sampai 220 kata. Ikuti angle dari Raka jika ada.\n" +
      'Skema JSON: {"ringkas": string, "judul": string, "hook": string, "cerita": string, "caption": string, "cta": string}',
  },
  dimas: {
    maxTokens: 1000,
    system:
      `${BASE}\n\nPeranmu: Dimas, fotografer dan kreator visual. Susun konsep sesi foto yang bisa langsung dieksekusi dan tepat 3 shot.\n` +
      'Kolom prompt_en adalah prompt gambar bahasa Inggris, 25 sampai 45 kata: subjek, suasana, cahaya, komposisi, gaya foto. ' +
      "Jangan menaruh teks, logo, atau orang terkenal di dalam gambar.\n" +
      'Skema JSON: {"ringkas": string, "konsep": string, "palet": [4 string nama warna], ' +
      '"shots": [{"judul": string, "arahan": string, "prompt_en": string}]}',
  },
  nia: {
    maxTokens: 1100,
    system:
      `${BASE}\n\nPeranmu: Nia, produser video pendek (Reels/TikTok/Shorts). Susun storyboard tepat 4 scene yang total 20 sampai 40 detik.\n` +
      "Scene pertama harus hook dalam 3 detik. Kolom narasi dibacakan sebagai voiceover, maksimal 20 kata per scene. " +
      "Kolom prompt_en adalah prompt gambar bahasa Inggris, 25 sampai 45 kata, untuk frame scene itu. Tanpa teks atau logo di gambar.\n" +
      'Skema JSON: {"ringkas": string, "judul": string, "durasi": string, "musik": string, ' +
      '"scenes": [{"waktu": string, "visual": string, "narasi": string, "teks_layar": string, "prompt_en": string}]}',
  },
  hermes: {
    maxTokens: 700,
    system:
      `${BASE}\n\nPeranmu: Hermes, Creative Director. Review hasil kerja tim terhadap brief secara jujur. Beri skor 1 sampai 10, ` +
      "jangan menggelembungkan nilai. Sebut kekuatan nyata dan perbaikan yang spesifik.\n" +
      'Skema JSON: {"ringkas": string, "skor": number, "siap_publish": boolean, "kekuatan": [2 sampai 3 string], ' +
      '"perbaikan": [2 sampai 3 string], "catatan": string}',
  },
};

export const MAX_BRIEF = 400;
export const MAX_CONTEXT = 3600;

export type AgentRequest = { agent: AiAgentId; brief: string; context: string };

export function validateAgentRequest(body: unknown): { ok: true; value: AgentRequest } | { ok: false; message: string } {
  if (!body || typeof body !== "object") return { ok: false, message: "Body harus berupa objek JSON." };
  const { agent, brief, context } = body as Record<string, unknown>;
  if (typeof agent !== "string" || !AI_AGENT_IDS.includes(agent as AiAgentId)) {
    return { ok: false, message: "Agen tidak dikenal." };
  }
  if (typeof brief !== "string" || !brief.trim()) return { ok: false, message: "Brief kosong." };
  const ctx = typeof context === "string" ? context : "";
  return {
    ok: true,
    value: {
      agent: agent as AiAgentId,
      brief: brief.trim().slice(0, MAX_BRIEF),
      context: ctx.slice(0, MAX_CONTEXT),
    },
  };
}

export function userPrompt(req: AgentRequest): string {
  const ctx = req.context.trim();
  return ctx
    ? `Brief dari klien:\n${req.brief}\n\nHasil kerja rekan tim sejauh ini:\n${ctx}\n\nKerjakan bagianmu sekarang. Balas JSON saja.`
    : `Brief dari klien:\n${req.brief}\n\nKerjakan bagianmu sekarang. Balas JSON saja.`;
}

const hits = new Map<string, number[]>();

/** Sliding-window limiter. Best effort only: each serverless instance keeps its own memory. */
export function hitRateLimit(key: string, now = Date.now(), limit = 14, windowMs = 60_000): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 500) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return false;
}

export function resetRateLimit() {
  hits.clear();
}
