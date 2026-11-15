import type { AgentId } from "./world";

export type WorkerId = Exclude<AgentId, "hermes">;

export const WORKERS: WorkerId[] = ["raka", "sari", "dimas", "nia"];

const STANDUP = /standup|rapat|semua orang|tiap ruang|tiap studio|seluruh|satu status|status konten/;
const CAMPAIGN = /kampanye|campaign|peluncuran|launch|paket konten|konten mingguan/;

const SKILLS: Record<WorkerId, RegExp> = {
  raka: /riset|tren|trend|audiens|kompetitor|pesaing|kalender|strategi|analitik|analisis|\bseo\b|hashtag|angle|target pasar/,
  sari: /caption|naskah|script|skrip|hook|headline|judul|thread|artikel|newsletter|copy|tulis|blog|voiceover teks/,
  dimas: /desain|visual|carousel|karusel|thumbnail|poster|logo|warna|infografis|feed|banner|slide/,
  nia: /video|reels|reel|tiktok|shorts|storyboard|subtitle|voiceover|musik|edit|motion|youtube/,
};

export type Plan = {
  /** Agents called into the meeting room, in seat order. */
  assignees: WorkerId[];
  /** True when the brief is a standup request (meeting only, no pipeline). */
  standup: boolean;
  /**
   * Hand-off pipeline. Groups run one after another; agents inside a group work in
   * parallel. Hermes always closes the pipeline as reviewer.
   */
  groups: AgentId[][];
};

export function planBrief(text: string): Plan {
  const t = text.toLowerCase();
  if (STANDUP.test(t)) {
    return { assignees: [...WORKERS], standup: true, groups: [] };
  }

  let picked: WorkerId[] = WORKERS.filter((id) => SKILLS[id].test(t));
  if (CAMPAIGN.test(t) || picked.length === 0) picked = [...WORKERS];

  const groups: AgentId[][] = [];
  if (picked.includes("raka")) groups.push(["raka"]);
  if (picked.includes("sari")) groups.push(["sari"]);
  const parallel = picked.filter((id) => id === "dimas" || id === "nia");
  if (parallel.length) groups.push(parallel);
  groups.push(["hermes"]);

  return { assignees: picked, standup: false, groups };
}

export function clip(text: string, n = 78) {
  const t = text.trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
}

export function taskLine(id: AgentId, text: string) {
  const bit = clip(text, 72);
  if (id === "raka") return `Strategi: aku riset angle dulu — ${bit}`;
  if (id === "sari") return `Naskah: aku tulis hook dan caption — ${bit}`;
  if (id === "dimas") return `Visual: aku buat konsep dan layout — ${bit}`;
  if (id === "nia") return `Video: aku susun storyboard-nya — ${bit}`;
  return bit;
}

export function deliverLine(id: AgentId, text: string) {
  const bit = clip(text, 56);
  if (id === "raka") return `Riset selesai: audiens, tren, dan angle untuk “${bit}”.`;
  if (id === "sari") return `Naskah dan caption untuk “${bit}” siap.`;
  if (id === "dimas") return `Konsep visual dan layout untuk “${bit}” siap.`;
  if (id === "nia") return `Storyboard dan alur video untuk “${bit}” siap.`;
  return `Review selesai. Paket konten “${bit}” siap publish.`;
}

export function handoffLine(from: AgentId, toShort: string) {
  if (from === "raka") return `Aku bawa hasil riset ke ${toShort}.`;
  if (from === "sari") return `Naskahnya aku antar ke ${toShort}.`;
  return `Draf-nya aku serahkan ke ${toShort} untuk review.`;
}
