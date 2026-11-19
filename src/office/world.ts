export type AgentId = "raka" | "sari" | "dimas" | "nia" | "hermes";

export type MatKey =
  | "ground"
  | "floor"
  | "plaster"
  | "partition"
  | "oak"
  | "oakDeep"
  | "brass"
  | "metal"
  | "moss"
  | "paper"
  | "screen"
  | "glass"
  | "lamp"
  | "rugStrat"
  | "rugScript"
  | "rugVisual"
  | "rugVideo"
  | "rugMeet"
  | "rugLobby"
  | "runner";

export const PAL = {
  ink: "#1c1916",
  paper: "#f6f1e8",
  mist: "#e7dfd2",
  line: "#d3c9ba",
  brass: "#c17a3a",
  oak: "#c4a574",
  oakDeep: "#8d6840",
  moss: "#3d6b4f",
  skin: "#e4b894",
  hair: "#2a2420",
  sun: "#fff1df",
  sky: "#d7d0c4",
  ground: "#cfc6b8",
  metal: "#3f3c38",
  screen: "#10241c",
  glass: "#e4eee8",
  plaster: "#f3eee6",
  partition: "#e5dcd0",
  rugStrat: "#b08960",
  rugScript: "#d5ddd4",
  rugVisual: "#ead7c2",
  rugVideo: "#e3dbd0",
  rugMeet: "#d9c4a4",
  rugLobby: "#efe4d2",
  runner: "#e7d3b4",
  lamp: "#f3d7a4",
} as const;

export type Profile = {
  id: AgentId;
  name: string;
  short: string;
  team: string;
  role: string;
  room: string;
  home: string;
  focus: [string, string, string];
};

export const PROFILES: Record<AgentId, Profile> = {
  raka: {
    id: "raka",
    name: "Raka Santoso",
    short: "Raka",
    team: "Ide",
    role: "Strategi & Riset Konten",
    room: "Ruang Strategi",
    home: "stratSeat",
    focus: ["Riset tren dan audiens", "Angle dan kalender konten", "Baca analitik performa"],
  },
  sari: {
    id: "sari",
    name: "Sari Wulandari",
    short: "Sari",
    team: "Cerita",
    role: "Storyteller & Penulis Naskah",
    room: "Studio Cerita",
    home: "scriptSeat",
    focus: ["Cerita pendek, kisah brand, dan thread", "Hook, caption, dan naskah video", "Jaga alur dan suara cerita konsisten"],
  },
  dimas: {
    id: "dimas",
    name: "Dimas Pratama",
    short: "Dimas",
    team: "Foto",
    role: "Fotografer & Visual Creator",
    room: "Studio Foto",
    home: "visualSeat",
    focus: ["Konsep foto, moodboard, dan shot list", "Carousel, poster, dan thumbnail", "Palet, komposisi, dan prompt gambar"],
  },
  nia: {
    id: "nia",
    name: "Nia Kusuma",
    short: "Nia",
    team: "Video",
    role: "Video & Motion Producer",
    room: "Studio Video",
    home: "videoSeat",
    focus: ["Storyboard Reels, TikTok, Shorts", "Subtitle dan ritme potong", "Arahan voiceover dan musik"],
  },
  hermes: {
    id: "hermes",
    name: "Hermes",
    short: "Hermes",
    team: "Direktur",
    role: "Creative Director",
    room: "Lobi",
    home: "lobbyDesk",
    focus: ["Bagi brief ke tim", "Pimpin standup dan review", "Jaga kualitas dan brand voice"],
  },
};

export const AGENT_IDS: AgentId[] = ["raka", "sari", "dimas", "nia", "hermes"];

export type NodeDef = { x: number; z: number; yaw?: number; seat?: boolean };

export const NODES: Record<string, NodeDef> = {
  stratSeat: { x: -8.32, z: 6.35, yaw: Math.PI, seat: true },
  scriptSeat: { x: 8.32, z: 6.35, yaw: Math.PI, seat: true },
  visualSeat: { x: -8.32, z: -6.35, yaw: 0, seat: true },
  videoSeat: { x: 8.32, z: -6.35, yaw: 0, seat: true },
  meetHead: { x: 0, z: -7.15, yaw: Math.PI, seat: true },
  meetBypass: { x: 2.55, z: -7.05 },
  meetWest: { x: -1.9, z: -5.55, yaw: -Math.PI / 2, seat: true },
  meetEast: { x: 1.9, z: -5.55, yaw: Math.PI / 2, seat: true },
  meetSouth: { x: 0.15, z: -4.05, yaw: 0, seat: true },
  meetSW: { x: -1.2, z: -4.2, yaw: 0.35, seat: true },
  lounge: { x: 0.85, z: 4.85, yaw: Math.PI },
  lobbyDesk: { x: -2.15, z: 6.45, yaw: Math.PI / 2, seat: true },
  stratDoor: { x: -8.32, z: 2.25 },
  scriptDoor: { x: 8.32, z: 2.25 },
  visualDoor: { x: -8.32, z: -2.25 },
  videoDoor: { x: 8.32, z: -2.25 },
  meetDoor: { x: 0, z: -2.25 },
  lobbyEntry: { x: 0, z: 2.25 },
  hallW: { x: -8.32, z: 0 },
  hallC: { x: 0, z: 0 },
  hallE: { x: 8.32, z: 0 },
};

const EDGES: [string, string][] = [
  ["stratSeat", "stratDoor"],
  ["stratDoor", "hallW"],
  ["hallW", "hallC"],
  ["hallC", "hallE"],
  ["hallE", "scriptDoor"],
  ["scriptDoor", "scriptSeat"],
  ["hallW", "visualDoor"],
  ["visualDoor", "visualSeat"],
  ["hallE", "videoDoor"],
  ["videoDoor", "videoSeat"],
  ["hallC", "meetDoor"],
  ["meetDoor", "meetBypass"],
  ["meetBypass", "meetHead"],
  ["meetDoor", "meetWest"],
  ["meetDoor", "meetEast"],
  ["meetDoor", "meetSouth"],
  ["meetDoor", "meetSW"],
  ["hallC", "lobbyEntry"],
  ["lobbyEntry", "lounge"],
  ["lobbyEntry", "lobbyDesk"],
];

export const LINKS: Record<string, string[]> = {};
for (const [a, b] of EDGES) {
  ;(LINKS[a] ??= []).push(b);
  ;(LINKS[b] ??= []).push(a);
}

export function route(from: string, to: string): string[] | null {
  if (from === to) return [];
  const prev = new Map<string, string | null>([[from, null]]);
  const q = [from];
  while (q.length) {
    const cur = q.shift()!;
    for (const next of LINKS[cur] ?? []) {
      if (prev.has(next)) continue;
      prev.set(next, cur);
      if (next === to) {
        const path: string[] = [];
        let c: string | null = to;
        while (c && c !== from) {
          path.push(c);
          c = prev.get(c) ?? null;
        }
        path.reverse();
        return path;
      }
      q.push(next);
    }
  }
  return null;
}

export const PLACE: Record<string, string> = {
  stratSeat: "meja Strategi",
  scriptSeat: "meja Cerita",
  visualSeat: "meja Foto",
  videoSeat: "meja Video",
  meetHead: "ujung meja rapat",
  meetWest: "meja rapat",
  meetEast: "meja rapat",
  meetSouth: "meja rapat",
  meetSW: "meja rapat",
  lounge: "sofa lobi",
  lobbyDesk: "meja Hermes",
  stratDoor: "pintu Strategi",
  scriptDoor: "pintu Cerita",
  visualDoor: "pintu Foto",
  videoDoor: "pintu Video",
  meetDoor: "ruang rapat",
  lobbyEntry: "lobi",
  hallW: "koridor barat",
  hallC: "koridor",
  hallE: "koridor timur",
};

export type Room = {
  id: string;
  name: string;
  agent: AgentId | null;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
};

export const ROOMS: Room[] = [
  { id: "strategy", name: "Ruang Strategi", agent: "raka", minX: -12.35, maxX: -4.25, minZ: 1.7, maxZ: 8.35 },
  { id: "script", name: "Studio Cerita", agent: "sari", minX: 4.25, maxX: 12.35, minZ: 1.7, maxZ: 8.35 },
  { id: "visual", name: "Studio Foto", agent: "dimas", minX: -12.35, maxX: -4.25, minZ: -8.35, maxZ: -1.7 },
  { id: "video", name: "Studio Video", agent: "nia", minX: 4.25, maxX: 12.35, minZ: -8.35, maxZ: -1.7 },
  { id: "meet", name: "Ruang Rapat", agent: null, minX: -4.25, maxX: 4.25, minZ: -8.35, maxZ: -1.7 },
  { id: "lobby", name: "Lobi", agent: "hermes", minX: -4.25, maxX: 4.25, minZ: 1.7, maxZ: 8.35 },
];

export const WORK_LINES: Record<AgentId, string[]> = {
  raka: [
    "Tren minggu ini naik di Reels, bukan di feed.",
    "Audiensnya paling aktif jam 19.00 sampai 21.00.",
    "Kompetitor banyak pakai format tips cepat. Kita beda di angle.",
    "Kalender konten bulan depan sudah aku isi setengah.",
  ],
  sari: [
    "Hook ketiga paling kuat. Dua lainnya aku simpan.",
    "Caption terlalu panjang. Aku pangkas jadi tiga baris.",
    "Cerita ini butuh pembuka yang nancap, lalu twist di akhir.",
    "Nada tulisannya aku samakan dengan brand voice.",
  ],
  dimas: [
    "Palet warna aku kunci dulu, baru layout.",
    "Satu foto, satu pesan. Komposisinya aku sederhanakan.",
    "Shot list sudah aku susun. Cahaya paling bagus pagi hari.",
    "Tipografi dua font saja, biar rapi.",
  ],
  nia: [
    "Tiga detik pertama video menentukan. Aku pangkas intro.",
    "Subtitle aku taruh di area aman layar.",
    "Ritme potong dipercepat di bagian tengah.",
    "Musik latar harus lebih pelan dari suara narasi.",
  ],
  hermes: [
    "Lantai tenang. Kirim brief kalau ada konten yang mau dibuat.",
    "Satu konten, satu pemilik. Jangan dobel.",
    "Brand voice aku rapikan tiap standup.",
    "Yang nganggur, mampir. Jangan nunggu di chat.",
  ],
};

export const LOUNGE_LINES: Record<AgentId, string> = {
  raka: "Sebentar di lobi. Mata butuh istirahat dari grafik.",
  sari: "Isi ulang dulu. Kalimat bagus datang pas lagi santai.",
  dimas: "Layar aku tinggal sebentar. Mata perlu warna lain.",
  nia: "Render lagi jalan. Aku boleh duduk semenit.",
  hermes: "Lobi itu meja kerja juga. Orang lewat, aku tangkap.",
};

export const VISIT_LINES: Record<AgentId, string> = {
  raka: "Mampir. Ada data audiens yang mau kamu lihat bareng?",
  sari: "Aku bawa satu draf hook. Menurutmu kuat?",
  dimas: "Moodboard fotonya sudah jadi. Mau kasih masukan?",
  nia: "Storyboard-nya aku bawa. Cek alurnya sebentar?",
  hermes: "Cuma cek. Kamu macet atau lagi fokus?",
};

export const MEET_LINES: Record<AgentId, string> = {
  raka: "Strategi: tiga topik naik, angle minggu ini sudah dipilih.",
  sari: "Cerita: dua kisah selesai, satu naskah nunggu hook.",
  dimas: "Foto: moodboard kedua masuk revisi warna.",
  nia: "Video: storyboard Reels siap, tinggal subtitle.",
  hermes: "Catat. Yang telat, kabari aku sebelum makan siang.",
};

export type Visual = {
  mat: MatKey;
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
};

export type Solid = { x: number; z: number; w: number; d: number };

export const BOUNDS = { minX: -12.22, maxX: 12.22, minZ: -8.22, maxZ: 8.22 };

const visuals: Visual[] = [];
const solids: Solid[] = [];

function add(mat: MatKey, x: number, z: number, w: number, h: number, d: number, y = 0, solid = false) {
  visuals.push({ mat, x, y, z, w, h, d });
  if (solid) solids.push({ x, z, w, d });
}

function glazedX(z: number, from: number, to: number) {
  const span = to - from;
  const mid = (from + to) / 2;
  const thick = 0.26;
  const totalH = 2.52;
  add("plaster", mid, z, span, 0.58, thick, 0, true);
  add("plaster", mid, z, span, 0.44, thick, 2.08, true);
  const step = 2.05;
  for (let x = from; x <= to + 0.01; x += step) {
    const px = Math.min(x, to);
    add("plaster", px, z, 0.16, totalH, thick + 0.04, 0, false);
  }
  for (let x = from + 0.16; x < to - 0.2; x += step) {
    const next = Math.min(x + step - 0.16, to);
    const w = next - x;
    if (w < 0.4) continue;
    add("glass", x + w / 2, z, w - 0.06, 1.42, 0.045, 0.62, false);
    add("brass", x + w / 2, z, w - 0.02, 0.045, 0.08, 0.58, false);
  }
}

function glazedZ(x: number, from: number, to: number) {
  const span = to - from;
  const mid = (from + to) / 2;
  const thick = 0.26;
  const totalH = 2.52;
  add("plaster", x, mid, thick, 0.58, span, 0, true);
  add("plaster", x, mid, thick, 0.44, span, 2.08, true);
  const step = 2.05;
  for (let z = from; z <= to + 0.01; z += step) {
    const pz = Math.min(z, to);
    add("plaster", x, pz, thick + 0.04, totalH, 0.16, 0, false);
  }
  for (let z = from + 0.16; z < to - 0.2; z += step) {
    const next = Math.min(z + step - 0.16, to);
    const d = next - z;
    if (d < 0.4) continue;
    add("glass", x, z + d / 2, 0.045, 1.42, d - 0.06, 0.62, false);
    add("brass", x, z + d / 2, 0.08, 0.045, d - 0.02, 0.58, false);
  }
}

function desk(x: number, z: number, alongX: boolean) {
  const w = alongX ? 1.5 : 0.68;
  const d = alongX ? 0.68 : 1.35;
  add("oak", x, z, w, 0.07, d, 0.72, true);
  const lx = w / 2 - 0.07;
  const lz = d / 2 - 0.07;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      add("oakDeep", x + sx * lx, z + sz * lz, 0.07, 0.72, 0.07, 0, false);
    }
  }
}

function chair(x: number, z: number, face: "n" | "s" | "e" | "w") {
  add("metal", x, z, 0.4, 0.06, 0.4, 0.44, false);
  const off = { n: [0, 0.18], s: [0, -0.18], e: [-0.18, 0], w: [0.18, 0] }[face];
  const wide = face === "e" || face === "w";
  add("metal", x + off[0], z + off[1], wide ? 0.06 : 0.4, 0.46, wide ? 0.4 : 0.06, 0.5, false);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      add("metal", x + sx * 0.14, z + sz * 0.14, 0.05, 0.44, 0.05, 0, false);
    }
  }
}

function monitor(x: number, z: number, alongX: boolean, toward: 1 | -1) {
  if (alongX) {
    add("metal", x, z, 0.08, 0.26, 0.12, 0.8, false);
    add("metal", x, z, 0.74, 0.48, 0.06, 0.98, false);
    add("screen", x, z + toward * 0.045, 0.64, 0.38, 0.025, 1.01, false);
  } else {
    add("metal", x, z, 0.12, 0.26, 0.08, 0.8, false);
    add("metal", x, z, 0.06, 0.48, 0.68, 0.98, false);
    add("screen", x + toward * 0.045, z, 0.025, 0.38, 0.58, 1.01, false);
  }
}

function plant(x: number, z: number) {
  add("oakDeep", x, z, 0.28, 0.32, 0.28, 0, false);
  add("moss", x, z, 0.46, 0.28, 0.46, 0.32, false);
  add("moss", x, z, 0.32, 0.36, 0.32, 0.52, false);
}

function build() {
  add("ground", 0, 0, 70, 0.2, 70, -0.2, false);
  add("floor", 0, 0, 24.7, 0.08, 16.9, -0.08, false);

  glazedX(-8.48, -12.35, 12.35);
  glazedX(8.48, -12.35, 12.35);
  glazedZ(-12.48, -8.35, 8.35);
  glazedZ(12.48, -8.35, 8.35);

  const northGaps = [
    [-12.35, -9.15],
    [-7.5, -0.85],
    [0.85, 7.5],
    [9.15, 12.35],
  ];
  for (const [a, b] of northGaps) {
    add("partition", (a! + b!) / 2, -1.62, b! - a!, 1.16, 0.16, 0, true);
  }
  const southGaps = [
    [-12.35, -9.15],
    [-7.5, -2.45],
    [2.45, 7.5],
    [9.15, 12.35],
  ];
  for (const [a, b] of southGaps) {
    add("partition", (a! + b!) / 2, 1.62, b! - a!, 1.16, 0.16, 0, true);
  }
  add("partition", -4.2, -5.05, 0.16, 1.16, 6.5, 0, true);
  add("partition", -4.2, 5.05, 0.16, 1.16, 6.5, 0, true);
  add("partition", 4.2, -5.05, 0.16, 1.16, 6.5, 0, true);
  add("partition", 4.2, 5.05, 0.16, 1.16, 6.5, 0, true);

  add("brass", -9.15, -1.62, 0.08, 1.2, 0.2, 0, false);
  add("brass", -7.5, -1.62, 0.08, 1.2, 0.2, 0, false);
  add("brass", 7.5, -1.62, 0.08, 1.2, 0.2, 0, false);
  add("brass", 9.15, -1.62, 0.08, 1.2, 0.2, 0, false);
  add("brass", -0.85, -1.62, 0.08, 1.2, 0.2, 0, false);
  add("brass", 0.85, -1.62, 0.08, 1.2, 0.2, 0, false);
  add("brass", -9.15, 1.62, 0.08, 1.2, 0.2, 0, false);
  add("brass", -7.5, 1.62, 0.08, 1.2, 0.2, 0, false);
  add("brass", 7.5, 1.62, 0.08, 1.2, 0.2, 0, false);
  add("brass", 9.15, 1.62, 0.08, 1.2, 0.2, 0, false);

  add("rugStrat", -8.3, 5.15, 7.5, 0.025, 6.1, 0.005, false);
  add("rugScript", 8.3, 5.15, 7.5, 0.025, 6.1, 0.005, false);
  add("rugVisual", -8.3, -5.15, 7.5, 0.025, 6.1, 0.005, false);
  add("rugVideo", 8.3, -5.15, 7.5, 0.025, 6.1, 0.005, false);
  add("rugMeet", 0, -5.15, 7.7, 0.025, 6.1, 0.005, false);
  add("rugLobby", 0, 5.2, 7.7, 0.025, 6.0, 0.005, false);
  add("runner", 0, 0, 16.2, 0.02, 2.15, 0.008, false);

  desk(-8.32, 7.55, true);
  monitor(-8.32, 7.82, true, -1);
  monitor(-7.45, 7.82, true, -1);
  chair(-8.32, 6.35, "s");
  add("oakDeep", -11.85, 5.4, 0.38, 1.35, 1.5, 0, true);
  add("paper", -11.82, 4.9, 0.22, 0.08, 0.7, 0.55, false);
  add("paper", -11.82, 5.5, 0.22, 0.08, 0.55, 0.95, false);
  plant(-11.5, 7.7);
  plant(-5.05, 7.65);

  desk(8.32, 7.55, true);
  monitor(8.32, 7.82, true, -1);
  chair(8.32, 6.35, "s");
  add("metal", 8.95, 7.72, 0.22, 0.46, 0.05, 0.95, false);
  add("screen", 8.95, 7.7, 0.18, 0.36, 0.02, 1.0, false);
  add("oakDeep", 11.7, 4.6, 0.4, 1.05, 0.9, 0, true);
  plant(11.55, 7.7);
  plant(5.05, 7.6);

  desk(-8.32, -7.55, true);
  monitor(-8.32, -7.82, true, 1);
  chair(-8.32, -6.35, "n");
  add("metal", -11.55, -6.3, 0.46, 1.15, 0.46, 0, true);
  add("metal", -11.55, -5.35, 0.46, 0.9, 0.46, 0, true);
  add("lamp", -11.55, -6.3, 0.18, 0.08, 0.05, 0.7, false);
  add("lamp", -11.55, -5.35, 0.18, 0.08, 0.05, 0.55, false);
  plant(-11.5, -7.7);
  plant(-5.1, -7.65);

  desk(8.32, -7.55, true);
  monitor(8.32, -7.82, true, 1);
  chair(8.32, -6.35, "n");
  add("metal", 11.65, -6.4, 0.42, 1.55, 0.55, 0, true);
  add("screen", 11.4, -6.55, 0.04, 0.18, 0.38, 1.15, false);
  add("screen", 11.4, -6.15, 0.04, 0.18, 0.38, 0.8, false);
  add("metal", 11.65, -4.7, 0.42, 1.2, 0.5, 0, true);
  plant(11.5, -7.7);
  plant(5.1, -7.6);

  add("oak", 0, -5.55, 2.3, 0.08, 1.05, 0.72, true);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      add("oakDeep", sx * 0.9, -5.55 + sz * 0.36, 0.08, 0.72, 0.08, 0, false);
    }
  }
  chair(-1.9, -5.55, "e");
  chair(1.9, -5.55, "w");
  chair(0.15, -4.05, "n");
  chair(-1.2, -4.2, "n");
  chair(0, -7.15, "s");
  add("paper", 0, -5.55, 0.7, 0.012, 0.45, 0.81, false);
  plant(-3.55, -7.65);
  plant(3.55, -7.65);

  desk(-3.25, 6.45, false);
  monitor(-3.5, 6.45, false, 1);
  chair(-2.15, 6.45, "w");
  add("oak", 1.15, 7.15, 2.3, 0.42, 0.78, 0.02, true);
  add("oakDeep", 1.15, 7.48, 2.3, 0.55, 0.16, 0.42, false);
  add("oak", 1.15, 5.55, 0.7, 0.32, 0.7, 0, false);
  add("metal", 2.85, 5.9, 0.28, 0.9, 0.28, 0, true);
  add("paper", -0.4, 7.35, 1.1, 0.9, 0.12, 0, false);
  plant(-3.5, 7.7);
  plant(3.5, 7.65);

  const lamps: [number, number][] = [
    [-8.3, 5],
    [8.3, 5],
    [-8.3, -5],
    [8.3, -5],
    [0, -5.2],
    [0, 5],
    [0, 0],
  ];
  for (const [x, z] of lamps) {
    add("brass", x, z, 0.08, 0.08, 0.08, 2.35, false);
    add("lamp", x, z, 0.55, 0.04, 0.55, 2.28, false);
  }
}

build();

export const VISUALS = visuals;
export const SOLIDS = solids;

export function blocked(x: number, z: number, radius = 0.32) {
  if (x < BOUNDS.minX + radius || x > BOUNDS.maxX - radius || z < BOUNDS.minZ + radius || z > BOUNDS.maxZ - radius) {
    return true;
  }
  for (const s of SOLIDS) {
    if (x > s.x - s.w / 2 - radius && x < s.x + s.w / 2 + radius && z > s.z - s.d / 2 - radius && z < s.z + s.d / 2 + radius) {
      return true;
    }
  }
  return false;
}
