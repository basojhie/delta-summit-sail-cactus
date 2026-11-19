import { i as __toESM } from "../_runtime.mjs";
import { a as BoxGeometry, c as CanvasTexture, f as require_jsx_runtime, l as SRGBColorSpace, n as useFrame, p as require_react, r as useThree, t as Canvas, u as Vector3 } from "../_libs/@react-three/fiber+[...].mjs";
import { a as Play, c as Footprints, d as Clock3, i as Send, l as Film, o as Pause, r as Square, s as Gauge, t as X, u as Download } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as mergeGeometries } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/OfficeApp-BURoGegB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAL = {
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
	lamp: "#f3d7a4"
};
var PROFILES = {
	raka: {
		id: "raka",
		name: "Raka Santoso",
		short: "Raka",
		team: "Ide",
		role: "Strategi & Riset Konten",
		room: "Ruang Strategi",
		home: "stratSeat",
		focus: [
			"Riset tren dan audiens",
			"Angle dan kalender konten",
			"Baca analitik performa"
		]
	},
	sari: {
		id: "sari",
		name: "Sari Wulandari",
		short: "Sari",
		team: "Cerita",
		role: "Storyteller & Penulis Naskah",
		room: "Studio Cerita",
		home: "scriptSeat",
		focus: [
			"Cerita pendek, kisah brand, dan thread",
			"Hook, caption, dan naskah video",
			"Jaga alur dan suara cerita konsisten"
		]
	},
	dimas: {
		id: "dimas",
		name: "Dimas Pratama",
		short: "Dimas",
		team: "Foto",
		role: "Fotografer & Visual Creator",
		room: "Studio Foto",
		home: "visualSeat",
		focus: [
			"Konsep foto, moodboard, dan shot list",
			"Carousel, poster, dan thumbnail",
			"Palet, komposisi, dan prompt gambar"
		]
	},
	nia: {
		id: "nia",
		name: "Nia Kusuma",
		short: "Nia",
		team: "Video",
		role: "Video & Motion Producer",
		room: "Studio Video",
		home: "videoSeat",
		focus: [
			"Storyboard Reels, TikTok, Shorts",
			"Subtitle dan ritme potong",
			"Arahan voiceover dan musik"
		]
	},
	hermes: {
		id: "hermes",
		name: "Hermes",
		short: "Hermes",
		team: "Direktur",
		role: "Creative Director",
		room: "Lobi",
		home: "lobbyDesk",
		focus: [
			"Bagi brief ke tim",
			"Pimpin standup dan review",
			"Jaga kualitas dan brand voice"
		]
	}
};
var AGENT_IDS = [
	"raka",
	"sari",
	"dimas",
	"nia",
	"hermes"
];
var NODES = {
	stratSeat: {
		x: -8.32,
		z: 6.35,
		yaw: Math.PI,
		seat: true
	},
	scriptSeat: {
		x: 8.32,
		z: 6.35,
		yaw: Math.PI,
		seat: true
	},
	visualSeat: {
		x: -8.32,
		z: -6.35,
		yaw: 0,
		seat: true
	},
	videoSeat: {
		x: 8.32,
		z: -6.35,
		yaw: 0,
		seat: true
	},
	meetHead: {
		x: 0,
		z: -7.15,
		yaw: Math.PI,
		seat: true
	},
	meetBypass: {
		x: 2.55,
		z: -7.05
	},
	meetWest: {
		x: -1.9,
		z: -5.55,
		yaw: -Math.PI / 2,
		seat: true
	},
	meetEast: {
		x: 1.9,
		z: -5.55,
		yaw: Math.PI / 2,
		seat: true
	},
	meetSouth: {
		x: .15,
		z: -4.05,
		yaw: 0,
		seat: true
	},
	meetSW: {
		x: -1.2,
		z: -4.2,
		yaw: .35,
		seat: true
	},
	lounge: {
		x: .85,
		z: 4.85,
		yaw: Math.PI
	},
	lobbyDesk: {
		x: -2.15,
		z: 6.45,
		yaw: Math.PI / 2,
		seat: true
	},
	stratDoor: {
		x: -8.32,
		z: 2.25
	},
	scriptDoor: {
		x: 8.32,
		z: 2.25
	},
	visualDoor: {
		x: -8.32,
		z: -2.25
	},
	videoDoor: {
		x: 8.32,
		z: -2.25
	},
	meetDoor: {
		x: 0,
		z: -2.25
	},
	lobbyEntry: {
		x: 0,
		z: 2.25
	},
	hallW: {
		x: -8.32,
		z: 0
	},
	hallC: {
		x: 0,
		z: 0
	},
	hallE: {
		x: 8.32,
		z: 0
	}
};
var EDGES = [
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
	["lobbyEntry", "lobbyDesk"]
];
var LINKS = {};
for (const [a, b] of EDGES) {
	(LINKS[a] ??= []).push(b);
	(LINKS[b] ??= []).push(a);
}
function route(from, to) {
	if (from === to) return [];
	const prev = /* @__PURE__ */ new Map([[from, null]]);
	const q = [from];
	while (q.length) {
		const cur = q.shift();
		for (const next of LINKS[cur] ?? []) {
			if (prev.has(next)) continue;
			prev.set(next, cur);
			if (next === to) {
				const path = [];
				let c = to;
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
var PLACE = {
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
	hallE: "koridor timur"
};
var ROOMS = [
	{
		id: "strategy",
		name: "Ruang Strategi",
		agent: "raka",
		minX: -12.35,
		maxX: -4.25,
		minZ: 1.7,
		maxZ: 8.35
	},
	{
		id: "script",
		name: "Studio Cerita",
		agent: "sari",
		minX: 4.25,
		maxX: 12.35,
		minZ: 1.7,
		maxZ: 8.35
	},
	{
		id: "visual",
		name: "Studio Foto",
		agent: "dimas",
		minX: -12.35,
		maxX: -4.25,
		minZ: -8.35,
		maxZ: -1.7
	},
	{
		id: "video",
		name: "Studio Video",
		agent: "nia",
		minX: 4.25,
		maxX: 12.35,
		minZ: -8.35,
		maxZ: -1.7
	},
	{
		id: "meet",
		name: "Ruang Rapat",
		agent: null,
		minX: -4.25,
		maxX: 4.25,
		minZ: -8.35,
		maxZ: -1.7
	},
	{
		id: "lobby",
		name: "Lobi",
		agent: "hermes",
		minX: -4.25,
		maxX: 4.25,
		minZ: 1.7,
		maxZ: 8.35
	}
];
var WORK_LINES = {
	raka: [
		"Tren minggu ini naik di Reels, bukan di feed.",
		"Audiensnya paling aktif jam 19.00 sampai 21.00.",
		"Kompetitor banyak pakai format tips cepat. Kita beda di angle.",
		"Kalender konten bulan depan sudah aku isi setengah."
	],
	sari: [
		"Hook ketiga paling kuat. Dua lainnya aku simpan.",
		"Caption terlalu panjang. Aku pangkas jadi tiga baris.",
		"Cerita ini butuh pembuka yang nancap, lalu twist di akhir.",
		"Nada tulisannya aku samakan dengan brand voice."
	],
	dimas: [
		"Palet warna aku kunci dulu, baru layout.",
		"Satu foto, satu pesan. Komposisinya aku sederhanakan.",
		"Shot list sudah aku susun. Cahaya paling bagus pagi hari.",
		"Tipografi dua font saja, biar rapi."
	],
	nia: [
		"Tiga detik pertama video menentukan. Aku pangkas intro.",
		"Subtitle aku taruh di area aman layar.",
		"Ritme potong dipercepat di bagian tengah.",
		"Musik latar harus lebih pelan dari suara narasi."
	],
	hermes: [
		"Lantai tenang. Kirim brief kalau ada konten yang mau dibuat.",
		"Satu konten, satu pemilik. Jangan dobel.",
		"Brand voice aku rapikan tiap standup.",
		"Yang nganggur, mampir. Jangan nunggu di chat."
	]
};
var LOUNGE_LINES = {
	raka: "Sebentar di lobi. Mata butuh istirahat dari grafik.",
	sari: "Isi ulang dulu. Kalimat bagus datang pas lagi santai.",
	dimas: "Layar aku tinggal sebentar. Mata perlu warna lain.",
	nia: "Render lagi jalan. Aku boleh duduk semenit.",
	hermes: "Lobi itu meja kerja juga. Orang lewat, aku tangkap."
};
var VISIT_LINES = {
	raka: "Mampir. Ada data audiens yang mau kamu lihat bareng?",
	sari: "Aku bawa satu draf hook. Menurutmu kuat?",
	dimas: "Moodboard fotonya sudah jadi. Mau kasih masukan?",
	nia: "Storyboard-nya aku bawa. Cek alurnya sebentar?",
	hermes: "Cuma cek. Kamu macet atau lagi fokus?"
};
var MEET_LINES = {
	raka: "Strategi: tiga topik naik, angle minggu ini sudah dipilih.",
	sari: "Cerita: dua kisah selesai, satu naskah nunggu hook.",
	dimas: "Foto: moodboard kedua masuk revisi warna.",
	nia: "Video: storyboard Reels siap, tinggal subtitle.",
	hermes: "Catat. Yang telat, kabari aku sebelum makan siang."
};
var BOUNDS = {
	minX: -12.22,
	maxX: 12.22,
	minZ: -8.22,
	maxZ: 8.22
};
var visuals = [];
var solids = [];
function add(mat, x, z, w, h, d, y = 0, solid = false) {
	visuals.push({
		mat,
		x,
		y,
		z,
		w,
		h,
		d
	});
	if (solid) solids.push({
		x,
		z,
		w,
		d
	});
}
function glazedX(z, from, to) {
	const span = to - from;
	const mid = (from + to) / 2;
	const thick = .26;
	const totalH = 2.52;
	add("plaster", mid, z, span, .58, thick, 0, true);
	add("plaster", mid, z, span, .44, thick, 2.08, true);
	const step = 2.05;
	for (let x = from; x <= to + .01; x += step) add("plaster", Math.min(x, to), z, .16, totalH, .3, 0, false);
	for (let x = from + .16; x < to - .2; x += step) {
		const w = Math.min(x + step - .16, to) - x;
		if (w < .4) continue;
		add("glass", x + w / 2, z, w - .06, 1.42, .045, .62, false);
		add("brass", x + w / 2, z, w - .02, .045, .08, .58, false);
	}
}
function glazedZ(x, from, to) {
	const span = to - from;
	const mid = (from + to) / 2;
	const thick = .26;
	const totalH = 2.52;
	add("plaster", x, mid, thick, .58, span, 0, true);
	add("plaster", x, mid, thick, .44, span, 2.08, true);
	const step = 2.05;
	for (let z = from; z <= to + .01; z += step) add("plaster", x, Math.min(z, to), .3, totalH, .16, 0, false);
	for (let z = from + .16; z < to - .2; z += step) {
		const d = Math.min(z + step - .16, to) - z;
		if (d < .4) continue;
		add("glass", x, z + d / 2, .045, 1.42, d - .06, .62, false);
		add("brass", x, z + d / 2, .08, .045, d - .02, .58, false);
	}
}
function desk(x, z, alongX) {
	const w = alongX ? 1.5 : .68;
	const d = alongX ? .68 : 1.35;
	add("oak", x, z, w, .07, d, .72, true);
	const lx = w / 2 - .07;
	const lz = d / 2 - .07;
	for (const sx of [-1, 1]) for (const sz of [-1, 1]) add("oakDeep", x + sx * lx, z + sz * lz, .07, .72, .07, 0, false);
}
function chair(x, z, face) {
	add("metal", x, z, .4, .06, .4, .44, false);
	const off = {
		n: [0, .18],
		s: [0, -.18],
		e: [-.18, 0],
		w: [.18, 0]
	}[face];
	const wide = face === "e" || face === "w";
	add("metal", x + off[0], z + off[1], wide ? .06 : .4, .46, wide ? .4 : .06, .5, false);
	for (const sx of [-1, 1]) for (const sz of [-1, 1]) add("metal", x + sx * .14, z + sz * .14, .05, .44, .05, 0, false);
}
function monitor(x, z, alongX, toward) {
	if (alongX) {
		add("metal", x, z, .08, .26, .12, .8, false);
		add("metal", x, z, .74, .48, .06, .98, false);
		add("screen", x, z + toward * .045, .64, .38, .025, 1.01, false);
	} else {
		add("metal", x, z, .12, .26, .08, .8, false);
		add("metal", x, z, .06, .48, .68, .98, false);
		add("screen", x + toward * .045, z, .025, .38, .58, 1.01, false);
	}
}
function plant(x, z) {
	add("oakDeep", x, z, .28, .32, .28, 0, false);
	add("moss", x, z, .46, .28, .46, .32, false);
	add("moss", x, z, .32, .36, .32, .52, false);
}
function build() {
	add("ground", 0, 0, 70, .2, 70, -.2, false);
	add("floor", 0, 0, 24.7, .08, 16.9, -.08, false);
	glazedX(-8.48, -12.35, 12.35);
	glazedX(8.48, -12.35, 12.35);
	glazedZ(-12.48, -8.35, 8.35);
	glazedZ(12.48, -8.35, 8.35);
	for (const [a, b] of [
		[-12.35, -9.15],
		[-7.5, -.85],
		[.85, 7.5],
		[9.15, 12.35]
	]) add("partition", (a + b) / 2, -1.62, b - a, 1.16, .16, 0, true);
	for (const [a, b] of [
		[-12.35, -9.15],
		[-7.5, -2.45],
		[2.45, 7.5],
		[9.15, 12.35]
	]) add("partition", (a + b) / 2, 1.62, b - a, 1.16, .16, 0, true);
	add("partition", -4.2, -5.05, .16, 1.16, 6.5, 0, true);
	add("partition", -4.2, 5.05, .16, 1.16, 6.5, 0, true);
	add("partition", 4.2, -5.05, .16, 1.16, 6.5, 0, true);
	add("partition", 4.2, 5.05, .16, 1.16, 6.5, 0, true);
	add("brass", -9.15, -1.62, .08, 1.2, .2, 0, false);
	add("brass", -7.5, -1.62, .08, 1.2, .2, 0, false);
	add("brass", 7.5, -1.62, .08, 1.2, .2, 0, false);
	add("brass", 9.15, -1.62, .08, 1.2, .2, 0, false);
	add("brass", -.85, -1.62, .08, 1.2, .2, 0, false);
	add("brass", .85, -1.62, .08, 1.2, .2, 0, false);
	add("brass", -9.15, 1.62, .08, 1.2, .2, 0, false);
	add("brass", -7.5, 1.62, .08, 1.2, .2, 0, false);
	add("brass", 7.5, 1.62, .08, 1.2, .2, 0, false);
	add("brass", 9.15, 1.62, .08, 1.2, .2, 0, false);
	add("rugStrat", -8.3, 5.15, 7.5, .025, 6.1, .005, false);
	add("rugScript", 8.3, 5.15, 7.5, .025, 6.1, .005, false);
	add("rugVisual", -8.3, -5.15, 7.5, .025, 6.1, .005, false);
	add("rugVideo", 8.3, -5.15, 7.5, .025, 6.1, .005, false);
	add("rugMeet", 0, -5.15, 7.7, .025, 6.1, .005, false);
	add("rugLobby", 0, 5.2, 7.7, .025, 6, .005, false);
	add("runner", 0, 0, 16.2, .02, 2.15, .008, false);
	desk(-8.32, 7.55, true);
	monitor(-8.32, 7.82, true, -1);
	monitor(-7.45, 7.82, true, -1);
	chair(-8.32, 6.35, "s");
	add("oakDeep", -11.85, 5.4, .38, 1.35, 1.5, 0, true);
	add("paper", -11.82, 4.9, .22, .08, .7, .55, false);
	add("paper", -11.82, 5.5, .22, .08, .55, .95, false);
	plant(-11.5, 7.7);
	plant(-5.05, 7.65);
	desk(8.32, 7.55, true);
	monitor(8.32, 7.82, true, -1);
	chair(8.32, 6.35, "s");
	add("metal", 8.95, 7.72, .22, .46, .05, .95, false);
	add("screen", 8.95, 7.7, .18, .36, .02, 1, false);
	add("oakDeep", 11.7, 4.6, .4, 1.05, .9, 0, true);
	plant(11.55, 7.7);
	plant(5.05, 7.6);
	desk(-8.32, -7.55, true);
	monitor(-8.32, -7.82, true, 1);
	chair(-8.32, -6.35, "n");
	add("metal", -11.55, -6.3, .46, 1.15, .46, 0, true);
	add("metal", -11.55, -5.35, .46, .9, .46, 0, true);
	add("lamp", -11.55, -6.3, .18, .08, .05, .7, false);
	add("lamp", -11.55, -5.35, .18, .08, .05, .55, false);
	plant(-11.5, -7.7);
	plant(-5.1, -7.65);
	desk(8.32, -7.55, true);
	monitor(8.32, -7.82, true, 1);
	chair(8.32, -6.35, "n");
	add("metal", 11.65, -6.4, .42, 1.55, .55, 0, true);
	add("screen", 11.4, -6.55, .04, .18, .38, 1.15, false);
	add("screen", 11.4, -6.15, .04, .18, .38, .8, false);
	add("metal", 11.65, -4.7, .42, 1.2, .5, 0, true);
	plant(11.5, -7.7);
	plant(5.1, -7.6);
	add("oak", 0, -5.55, 2.3, .08, 1.05, .72, true);
	for (const sx of [-1, 1]) for (const sz of [-1, 1]) add("oakDeep", sx * .9, -5.55 + sz * .36, .08, .72, .08, 0, false);
	chair(-1.9, -5.55, "e");
	chair(1.9, -5.55, "w");
	chair(.15, -4.05, "n");
	chair(-1.2, -4.2, "n");
	chair(0, -7.15, "s");
	add("paper", 0, -5.55, .7, .012, .45, .81, false);
	plant(-3.55, -7.65);
	plant(3.55, -7.65);
	desk(-3.25, 6.45, false);
	monitor(-3.5, 6.45, false, 1);
	chair(-2.15, 6.45, "w");
	add("oak", 1.15, 7.15, 2.3, .42, .78, .02, true);
	add("oakDeep", 1.15, 7.48, 2.3, .55, .16, .42, false);
	add("oak", 1.15, 5.55, .7, .32, .7, 0, false);
	add("metal", 2.85, 5.9, .28, .9, .28, 0, true);
	add("paper", -.4, 7.35, 1.1, .9, .12, 0, false);
	plant(-3.5, 7.7);
	plant(3.5, 7.65);
	for (const [x, z] of [
		[-8.3, 5],
		[8.3, 5],
		[-8.3, -5],
		[8.3, -5],
		[0, -5.2],
		[0, 5],
		[0, 0]
	]) {
		add("brass", x, z, .08, .08, .08, 2.35, false);
		add("lamp", x, z, .55, .04, .55, 2.28, false);
	}
}
build();
var VISUALS = visuals;
var SOLIDS = solids;
function blocked(x, z, radius = .32) {
	if (x < BOUNDS.minX + radius || x > BOUNDS.maxX - radius || z < BOUNDS.minZ + radius || z > BOUNDS.maxZ - radius) return true;
	for (const s of SOLIDS) if (x > s.x - s.w / 2 - radius && x < s.x + s.w / 2 + radius && z > s.z - s.d / 2 - radius && z < s.z + s.d / 2 + radius) return true;
	return false;
}
var WORKERS = [
	"raka",
	"sari",
	"dimas",
	"nia"
];
var STANDUP = /standup|rapat|semua orang|tiap ruang|tiap studio|seluruh|satu status|status konten/;
var CAMPAIGN = /kampanye|campaign|peluncuran|launch|paket konten|konten mingguan/;
var SKILLS = {
	raka: /riset|tren|trend|audiens|kompetitor|pesaing|kalender|strategi|analitik|analisis|\bseo\b|hashtag|angle|target pasar/,
	sari: /cerita|kisah|story|storytelling|narasi|fiksi|dongeng|caption|naskah|script|skrip|hook|headline|judul|thread|artikel|newsletter|copy|tulis|blog|voiceover teks/,
	dimas: /foto|fotografi|photo|photoshoot|moodboard|shot list|portrait|potret|desain|visual|carousel|karusel|thumbnail|poster|logo|warna|infografis|feed|banner|slide/,
	nia: /video|reels|reel|tiktok|shorts|storyboard|subtitle|voiceover|musik|edit|motion|youtube/
};
function planBrief(text) {
	const t = text.toLowerCase();
	if (STANDUP.test(t)) return {
		assignees: [...WORKERS],
		standup: true,
		groups: []
	};
	let picked = WORKERS.filter((id) => SKILLS[id].test(t));
	if (CAMPAIGN.test(t) || picked.length === 0) picked = [...WORKERS];
	const groups = [];
	if (picked.includes("raka")) groups.push(["raka"]);
	if (picked.includes("sari")) groups.push(["sari"]);
	const parallel = picked.filter((id) => id === "dimas" || id === "nia");
	if (parallel.length) groups.push(parallel);
	groups.push(["hermes"]);
	return {
		assignees: picked,
		standup: false,
		groups
	};
}
function clip(text, n = 78) {
	const t = text.trim();
	return t.length > n ? `${t.slice(0, n - 1)}…` : t;
}
function taskLine(id, text) {
	const bit = clip(text, 72);
	if (id === "raka") return `Strategi: aku riset angle dulu — ${bit}`;
	if (id === "sari") return `Cerita: aku tulis alur, hook, dan caption — ${bit}`;
	if (id === "dimas") return `Foto: aku susun konsep, moodboard, dan shot list — ${bit}`;
	if (id === "nia") return `Video: aku susun storyboard-nya — ${bit}`;
	return bit;
}
function deliverLine(id, text) {
	const bit = clip(text, 56);
	if (id === "raka") return `Riset selesai: audiens, tren, dan angle untuk “${bit}”.`;
	if (id === "sari") return `Cerita dan caption untuk “${bit}” siap.`;
	if (id === "dimas") return `Konsep foto, moodboard, dan shot list untuk “${bit}” siap.`;
	if (id === "nia") return `Storyboard dan alur video untuk “${bit}” siap.`;
	return `Review selesai. Paket konten “${bit}” siap publish.`;
}
function handoffLine(from, toShort) {
	if (from === "raka") return `Aku bawa hasil riset ke ${toShort}.`;
	if (from === "sari") return `Ceritanya aku antar ke ${toShort}.`;
	return `Draf-nya aku serahkan ke ${toShort} untuk review.`;
}
var MEET_SEATS = [
	"meetWest",
	"meetEast",
	"meetSouth",
	"meetSW"
];
var DOORS = {
	raka: "stratDoor",
	sari: "scriptDoor",
	dimas: "visualDoor",
	nia: "videoDoor",
	hermes: "lobbyEntry"
};
function makeAgent(id, phase) {
	const home = PROFILES[id].home;
	const node = NODES[home];
	return {
		id,
		at: home,
		home,
		x: node.x,
		z: node.z,
		yaw: node.yaw ?? 0,
		path: [],
		intent: "work",
		state: "work",
		seated: true,
		speech: WORK_LINES[id][0],
		speechT: 9,
		cooldown: 4 + phase * 1.3,
		afterHome: false,
		lineOverride: null,
		bob: phase,
		cursor: 0,
		phase
	};
}
var sim = {
	agents: {
		raka: makeAgent("raka", .2),
		sari: makeAgent("sari", 1.1),
		dimas: makeAgent("dimas", 2.2),
		nia: makeAgent("nia", 3.4),
		hermes: makeAgent("hermes", 4.1)
	},
	visitor: {
		x: 0,
		z: 3.35,
		yaw: 0,
		speed: 0,
		bob: 0
	},
	keys: /* @__PURE__ */ new Set(),
	probeKeys: null,
	probeSteer: null,
	stick: {
		x: 0,
		y: 0
	},
	cameraMode: "orbit",
	paused: false,
	speed: 1,
	selected: null,
	hold: 0,
	untilStandup: 22,
	pipe: null,
	clockMin: 552,
	t: 0,
	log: [],
	seq: 1,
	focus: null,
	camSnap: false,
	orbit: {
		yaw: .62,
		pitch: .98,
		dist: 18.5,
		tx: 0,
		tz: .4
	},
	pointerMoved: 0
};
function person(id) {
	return sim.agents[id];
}
function formatClock(min = sim.clockMin) {
	const m = (Math.floor(min) % 1440 + 1440) % 1440;
	return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}
function pushLog(who, text) {
	sim.log.unshift({
		id: sim.seq++,
		who,
		text,
		clock: formatClock()
	});
	if (sim.log.length > 28) sim.log.pop();
}
function say(a, text, important) {
	a.speech = text;
	a.speechT = 11;
	if (important) pushLog(PROFILES[a.id].short, text);
}
function nextWorkLine(a) {
	const lines = WORK_LINES[a.id];
	a.cursor = (a.cursor + 1) % lines.length;
	return lines[a.cursor];
}
function statusText(a) {
	if (a.speechT > 0 && a.speech) return a.speech;
	if (a.state === "walk") return `Menuju ${PLACE[a.path[a.path.length - 1] ?? a.at] ?? "ruangan"}`;
	if (a.state === "talk") return "Lagi ngobrol";
	return "Fokus di meja";
}
function arrive(a) {
	const node = NODES[a.at];
	if (!node) return;
	if (node.yaw != null) a.yaw = node.yaw;
	a.seated = !!node.seat && a.intent !== "lounge" && a.intent !== "visit";
	a.state = a.intent === "work" ? "work" : "talk";
	if (a.lineOverride) {
		a.speech = a.lineOverride;
		a.speechT = 10;
		a.lineOverride = null;
	} else if (a.intent === "lounge") say(a, LOUNGE_LINES[a.id], false);
	else if (a.intent === "visit") say(a, VISIT_LINES[a.id], false);
	else if (a.intent === "meet") say(a, MEET_LINES[a.id], false);
	else say(a, nextWorkLine(a), false);
	a.cooldown = a.intent === "meet" ? 8.5 : 5.5 + Math.random() * 4;
	a.afterHome = a.intent === "meet" || a.intent === "lounge" || a.intent === "visit";
}
function go(a, dest, intent) {
	a.intent = intent;
	a.seated = false;
	if (a.at === dest && a.path.length === 0) {
		arrive(a);
		return;
	}
	const path = route(a.at, dest);
	if (!path) return;
	a.path = path;
	a.state = "walk";
}
function pickAmbient(a) {
	if (sim.hold > 0) {
		say(a, nextWorkLine(a), false);
		a.cooldown = 5;
		return;
	}
	const r = Math.random();
	if (r < .52) {
		if (a.at !== a.home) go(a, a.home, "work");
		else {
			a.intent = "work";
			a.state = "work";
			a.seated = !!NODES[a.at]?.seat;
			say(a, nextWorkLine(a), false);
			a.cooldown = 6 + Math.random() * 5;
		}
		return;
	}
	if (r < .78) {
		if (a.at === "lounge") go(a, a.home, "work");
		else go(a, "lounge", "lounge");
		return;
	}
	const others = AGENT_IDS.filter((id) => id !== a.id);
	const other = others[Math.floor(Math.random() * others.length)];
	go(a, DOORS[other], "visit");
}
function beginStandup() {
	sim.hold = 16;
	pushLog("Hermes", "Standup singkat di ruang rapat.");
	[
		"raka",
		"sari",
		"dimas",
		"nia"
	].forEach((id, i) => {
		const a = person(id);
		a.lineOverride = MEET_LINES[id];
		say(a, MEET_LINES[id], false);
		go(a, MEET_SEATS[i], "meet");
	});
	const h = person("hermes");
	h.lineOverride = "Standup. Satu kabar, tanpa cerita panjang.";
	say(h, h.lineOverride, false);
	go(h, "meetHead", "meet");
}
var STAGE_GAP = 11;
function assignBrief(text) {
	const clean = clip(text, 180);
	const plan = planBrief(clean);
	sim.hold = 20;
	sim.untilStandup = Math.max(sim.untilStandup, 36);
	pushLog("Kamu", clean);
	const names = plan.assignees.map((id) => PROFILES[id].short).join(", ");
	pushLog("Hermes", plan.standup ? "Standup dipanggil. Semua ke ruang rapat." : `Brief dibagi ke ${names}.`);
	const h = person("hermes");
	h.lineOverride = plan.standup ? "Standup. Satu kabar, tanpa cerita panjang." : "Yang kupanggil, ke meja rapat. Yang lain lanjut.";
	say(h, `Brief masuk: ${clip(clean, 64)}`, false);
	go(h, "meetHead", "meet");
	plan.assignees.forEach((id, i) => {
		const a = person(id);
		const line = plan.standup ? MEET_LINES[id] : taskLine(id, clean);
		a.lineOverride = line;
		say(a, line, false);
		go(a, MEET_SEATS[i], "meet");
	});
	sim.pipe = null;
	sim.hold = Math.max(sim.hold, 27);
	return {
		plan,
		brief: clean
	};
}
/** An agent starts (or keeps) working on its part while the model call is running. */
function agentWorking(id, line) {
	const a = person(id);
	a.lineOverride = line;
	say(a, line, false);
	sim.hold = Math.max(sim.hold, 40);
}
/** An agent announces real finished work and walks it over to the next agent. */
function agentDelivers(id, line, next) {
	const a = person(id);
	say(a, line, true);
	if (next) {
		a.lineOverride = handoffLine(id, PROFILES[next].short);
		go(a, DOORS[next], "visit");
	}
	sim.hold = Math.max(sim.hold, 40);
}
function agentFailed(id, line) {
	say(person(id), line, true);
}
function stepPipe(dt) {
	const p = sim.pipe;
	if (!p) return;
	p.t -= dt;
	if (p.t > 0) return;
	const group = p.groups[p.i];
	if (!group) {
		sim.pipe = null;
		return;
	}
	const next = p.groups[p.i + 1];
	for (const id of group) {
		const a = person(id);
		say(a, deliverLine(id, p.brief), true);
		if (next) {
			const target = next[0];
			a.lineOverride = handoffLine(id, PROFILES[target].short);
			go(a, DOORS[target], "visit");
		}
	}
	p.i += 1;
	p.t = STAGE_GAP;
	sim.hold = Math.max(sim.hold, 15);
	if (!next) sim.pipe = null;
}
function stepAgent(a, dt) {
	a.speechT = Math.max(0, a.speechT - dt);
	a.cooldown -= dt;
	if (a.path.length) {
		a.state = "walk";
		a.seated = false;
		const nextId = a.path[0];
		const n = NODES[nextId];
		const dx = n.x - a.x;
		const dz = n.z - a.z;
		const dist = Math.hypot(dx, dz);
		const step = Math.min(dist, 1.85 * dt);
		if (dist < .09) {
			a.x = n.x;
			a.z = n.z;
			a.path.shift();
			a.at = nextId;
			if (!a.path.length) arrive(a);
		} else {
			a.x += dx / dist * step;
			a.z += dz / dist * step;
			let d = Math.atan2(-dx, -dz) - a.yaw;
			while (d > Math.PI) d -= Math.PI * 2;
			while (d < -Math.PI) d += Math.PI * 2;
			a.yaw += d * Math.min(1, dt * 8);
			a.bob += dt * 9;
		}
		return;
	}
	a.bob += dt * (a.seated ? 7 : 2);
	if (a.cooldown <= 0) {
		if (a.afterHome) {
			a.afterHome = false;
			go(a, a.home, "work");
			return;
		}
		pickAmbient(a);
	}
}
function stepOffice(dt) {
	sim.t += dt;
	sim.clockMin += dt * .9;
	sim.hold = Math.max(0, sim.hold - dt);
	sim.untilStandup -= dt;
	if (sim.untilStandup <= 0 && sim.hold <= 0) {
		beginStandup();
		sim.untilStandup = 52 + Math.random() * 12;
	}
	stepPipe(dt);
	for (const id of AGENT_IDS) stepAgent(sim.agents[id], dt);
}
function held(code) {
	if (sim.probeKeys) return sim.probeKeys.has(code);
	return sim.keys.has(code);
}
function stepVisitor(dt) {
	let steer = 0;
	if (held("KeyA") || held("ArrowLeft")) steer += 1;
	if (held("KeyD") || held("ArrowRight")) steer -= 1;
	steer += -sim.stick.x;
	if (sim.probeSteer != null) steer = sim.probeSteer;
	steer = Math.max(-1, Math.min(1, steer));
	let throttle = 0;
	if (held("KeyW") || held("ArrowUp")) throttle += 1;
	if (held("KeyS") || held("ArrowDown")) throttle -= 1;
	throttle = Math.max(-1, Math.min(1, throttle + sim.stick.y));
	let strafe = 0;
	if (held("KeyQ")) strafe -= 1;
	if (held("KeyE")) strafe += 1;
	const v = sim.visitor;
	v.yaw += steer * 2.35 * dt;
	v.speed = throttle * 3.25;
	const fx = -Math.sin(v.yaw);
	const fz = -Math.cos(v.yaw);
	const rx = Math.cos(v.yaw);
	const rz = -Math.sin(v.yaw);
	const steps = Math.max(1, Math.ceil(dt / (1 / 60)));
	const h = dt / steps;
	for (let i = 0; i < steps; i += 1) {
		const nx = v.x + (fx * v.speed + rx * strafe * 2.4) * h;
		const nz = v.z + (fz * v.speed + rz * strafe * 2.4) * h;
		if (!blocked(nx, v.z)) v.x = nx;
		if (!blocked(v.x, nz)) v.z = nz;
	}
	if (Math.abs(throttle) + Math.abs(strafe) > .1) v.bob += dt * 10;
}
function mountProbe() {
	window.__controlsTest = {
		getYaw: () => sim.visitor.yaw,
		getSpeed: () => sim.visitor.speed,
		setKeys: (codes) => {
			sim.probeKeys = new Set(codes);
		},
		setSteer: (v) => {
			sim.probeSteer = v;
		}
	};
}
pushLog("Hermes", "Studio dibuka. Lima orang sudah di mejanya.");
var AiError = class extends Error {
	code;
	constructor(code, message) {
		super(message);
		this.code = code;
	}
};
var ROLE = {
	raka: "Raka (Ide & Riset)",
	sari: "Sari (Cerita)",
	dimas: "Dimas (Foto)",
	nia: "Nia (Video)",
	hermes: "Hermes (Creative Director)"
};
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/** Pulls the first JSON object out of a model reply, tolerating code fences and chatter. */
function parseJson(text) {
	const trimmed = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
	const start = trimmed.indexOf("{");
	const end = trimmed.lastIndexOf("}");
	if (start < 0 || end <= start) return null;
	try {
		const value = JSON.parse(trimmed.slice(start, end + 1));
		return value && typeof value === "object" && !Array.isArray(value) ? value : null;
	} catch {
		return null;
	}
}
var str = (v) => typeof v === "string" ? v.trim() : typeof v === "number" ? String(v) : "";
var list = (v) => Array.isArray(v) ? v.map(str).filter(Boolean) : [];
var objs = (v) => Array.isArray(v) ? v.filter((x) => !!x && typeof x === "object" && !Array.isArray(x)) : [];
function clipText(text, n) {
	const t = text.replace(/\s+/g, " ").trim();
	return t.length > n ? `${t.slice(0, n - 1)}…` : t;
}
/** One line the agent says out loud when it hands its work over. */
function summaryOf(id, res) {
	const said = str(res.data?.ringkas);
	if (said) return clipText(said, 110);
	const fallback = str(res.data?.judul) || str(res.data?.konsep) || str(res.data?.angle) || res.raw || "";
	return fallback ? clipText(fallback, 110) : `${ROLE[id]} selesai.`;
}
/** Plain-text rendering of one agent's work: context for the next agent and the markdown export. */
function toText(id, res) {
	const d = res.data;
	if (!d) return res.raw ?? "";
	const lines = [];
	const add = (label, value) => value && lines.push(`${label}: ${value}`);
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
		objs(d.scenes).forEach((s, i) => add(`Scene ${i + 1} (${str(s.waktu)})`, `${str(s.visual)} | Narasi: ${str(s.narasi)} | Teks: ${str(s.teks_layar)}`));
	} else {
		add("Skor", str(d.skor));
		add("Siap publish", d.siap_publish === true ? "ya" : "belum");
		add("Kekuatan", list(d.kekuatan).join("; "));
		add("Perbaikan", list(d.perbaikan).join("; "));
		add("Catatan", str(d.catatan));
	}
	return lines.join("\n");
}
function buildContext(done, perAgent = 800, total = 3400) {
	const parts = [];
	for (const id of Object.keys(done)) {
		const res = done[id];
		if (!res || res.status !== "done") continue;
		parts.push(`[${ROLE[id]}]\n${clipText(toText(id, res), perAgent)}`);
	}
	return parts.join("\n\n").slice(0, total);
}
function toMarkdown(brief, results) {
	const out = [
		`# Paket konten`,
		``,
		`**Brief:** ${brief}`,
		``
	];
	for (const id of [
		"raka",
		"sari",
		"dimas",
		"nia",
		"hermes"
	]) {
		const res = results[id];
		if (!res || res.status !== "done") continue;
		out.push(`## ${ROLE[id]}`, ``, toText(id, res).replace(/^(.+?): /gm, "**$1:** "), ``);
	}
	return out.join("\n");
}
async function callAgent(agent, brief, context, onWait, fetcher = fetch) {
	for (let attempt = 0; attempt < 4; attempt += 1) {
		let res;
		try {
			res = await fetcher("/api/agent", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					agent,
					brief,
					context
				})
			});
		} catch {
			throw new AiError("network", "Tidak bisa terhubung ke server. Periksa koneksi internet.");
		}
		const body = await res.json().catch(() => null);
		if (res.status === 429) {
			const wait = Math.min(Math.max(Math.ceil(Number(body?.retryAfter) || 12), 3), 30);
			onWait?.(wait);
			await sleep((wait + 1) * 1e3);
			continue;
		}
		if (!res.ok || !body?.text) throw new AiError(body?.error ?? "unknown", body?.message ?? `Server membalas HTTP ${res.status}.`);
		return body.text;
	}
	throw new AiError("rate_limited", "Kuota gratis sedang penuh. Coba kirim brief lagi sebentar lagi.");
}
/** Runs the plan one agent at a time: the free tiers are rate limited, so no parallel calls. */
async function runPipeline(plan, brief, cb, fetcher) {
	const order = plan.groups.flat();
	const done = {};
	for (let i = 0; i < order.length; i += 1) {
		const id = order[i];
		const next = order[i + 1];
		cb.onStart(id);
		try {
			const raw = await callAgent(id, brief, buildContext(done), (s) => cb.onWait(id, s), fetcher);
			const data = parseJson(raw);
			const result = {
				status: "done",
				...data ? { data } : {},
				raw
			};
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
var POLL = "https://image.pollinations.ai/prompt";
function imageUrl(prompt, seed, size = 768) {
	const q = new URLSearchParams({
		width: String(size),
		height: String(size),
		model: "flux",
		nologo: "true",
		seed: String(seed)
	});
	return `${POLL}/${encodeURIComponent(prompt.slice(0, 600))}?${q.toString()}`;
}
var useOffice = create(() => ({
	mode: "orbit",
	paused: false,
	speed: 1,
	selected: null,
	intro: true,
	feed: false,
	tick: 0,
	results: {},
	resultsBrief: "",
	running: false,
	panel: false
}));
function bump() {
	useOffice.setState((s) => ({ tick: s.tick + 1 }));
}
function setMode(mode) {
	sim.cameraMode = mode;
	if (mode === "walk") sim.camSnap = true;
	useOffice.setState({
		mode,
		intro: false
	});
}
function togglePause() {
	sim.paused = !sim.paused;
	useOffice.setState({ paused: sim.paused });
}
function cycleSpeed() {
	sim.speed = sim.speed === 1 ? 2 : sim.speed === 2 ? 4 : 1;
	useOffice.setState({ speed: sim.speed });
}
function selectAgent(id) {
	sim.selected = id;
	sim.focus = id;
	useOffice.setState({
		selected: id,
		intro: false
	});
}
function dismissIntro() {
	useOffice.setState({ intro: false });
}
function toggleFeed() {
	useOffice.setState((s) => ({ feed: !s.feed }));
}
function setPanel(open) {
	useOffice.setState({ panel: open });
}
var runId = 0;
function patchResult(id, result, token) {
	if (token !== runId) return;
	useOffice.setState((s) => ({
		results: {
			...s.results,
			[id]: result
		},
		tick: s.tick + 1
	}));
}
function submitBrief(text) {
	const clean = text.trim();
	if (!clean) return;
	const { plan, brief } = assignBrief(clean);
	try {
		const next = [clean, ...JSON.parse(localStorage.getItem("atrium-briefs") || "[]").filter((item) => item !== clean)].slice(0, 6);
		localStorage.setItem("atrium-briefs", JSON.stringify(next));
	} catch {}
	sim.selected = "hermes";
	sim.focus = "hermes";
	const token = runId += 1;
	useOffice.setState((s) => ({
		selected: "hermes",
		intro: false,
		tick: s.tick + 1,
		results: {},
		resultsBrief: plan.standup ? "" : brief,
		running: !plan.standup,
		panel: !plan.standup
	}));
	if (plan.standup) return;
	runPipeline(plan, brief, {
		onStart: (id) => {
			patchResult(id, { status: "working" }, token);
			agentWorking(id, `${PROFILES[id].short} mulai mengerjakan bagiannya.`);
		},
		onWait: (id, seconds) => {
			patchResult(id, {
				status: "working",
				waiting: seconds
			}, token);
			agentWorking(id, `Kuota gratis sedang penuh. Aku tunggu ${seconds} detik.`);
		},
		onDone: (id, result, next) => {
			patchResult(id, result, token);
			agentDelivers(id, summaryOf(id, result), next);
		},
		onError: (id, message) => {
			patchResult(id, {
				status: "error",
				error: message
			}, token);
			agentFailed(id, clipText(`Gagal: ${message}`, 110));
		},
		onFinish: () => {
			if (token === runId) useOffice.setState((s) => ({
				running: false,
				tick: s.tick + 1
			}));
		}
	});
}
var ORDER = [
	"raka",
	"sari",
	"dimas",
	"nia",
	"hermes"
];
/**
* Pollinations' anonymous tier allows roughly one image every 15 seconds, so every
* picture in the page waits its turn in one shared queue and retries on failure.
*/
var chain = Promise.resolve();
function probe(url) {
	return new Promise((resolve) => {
		const img = new Image();
		const timer = setTimeout(() => resolve(false), 7e4);
		img.onload = () => {
			clearTimeout(timer);
			resolve(true);
		};
		img.onerror = () => {
			clearTimeout(timer);
			resolve(false);
		};
		img.src = url;
	});
}
function queueImage(url) {
	const job = chain.then(async () => {
		for (let attempt = 0; attempt < 3; attempt += 1) {
			if (await probe(url)) {
				await sleep(3e3);
				return true;
			}
			await sleep(16e3);
		}
		return false;
	});
	chain = job.catch(() => void 0);
	return job;
}
function useQueuedImage(prompt, seed, enabled) {
	const url = (0, import_react.useMemo)(() => imageUrl(prompt, seed), [prompt, seed]);
	const [state, setState] = (0, import_react.useState)("idle");
	(0, import_react.useEffect)(() => {
		if (!enabled || !prompt) return;
		let alive = true;
		setState("loading");
		queueImage(url).then((ok) => {
			if (alive) setState(ok ? "ready" : "failed");
		});
		return () => {
			alive = false;
		};
	}, [
		url,
		prompt,
		enabled
	]);
	return {
		url,
		state
	};
}
function AiImage({ prompt, seed, enabled = true, caption }) {
	const { url, state } = useQueuedImage(prompt, seed, enabled);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
		className: "shot-img",
		children: state === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: url,
			alt: caption,
			loading: "lazy"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shot-wait",
			children: state === "failed" ? "Gambar gagal dimuat. Layanan gratis sedang padat." : state === "idle" ? "Menunggu giliran" : "Foto sedang dibuat atau antre…"
		})
	});
}
function Chips({ items, hash }) {
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "res-chips",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hash ? `#${item.replace(/^#/, "")}` : item }, item))
	});
}
function Field({ label, value }) {
	if (!value) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "res-field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: value })]
	});
}
function Bullets({ label, items }) {
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "res-field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item)) }) })]
	});
}
function Photo({ d }) {
	const shots = objs(d.shots).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Konsep",
			value: str(d.konsep)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, { items: list(d.palet) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shot-grid",
			children: shots.map((shot, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shot",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiImage, {
						prompt: str(shot.prompt_en),
						seed: 101 + i,
						caption: str(shot.judul)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: str(shot.judul) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: str(shot.arahan) })
				]
			}, `${str(shot.judul)}-${i}`))
		})
	] });
}
function sceneSeconds(narasi) {
	const words = narasi.split(/\s+/).filter(Boolean).length;
	return Math.max(4, Math.min(9, Math.round(words * .45) + 2));
}
function Player({ scenes, onClose }) {
	const [i, setI] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [voice, setVoice] = (0, import_react.useState)(true);
	const timer = (0, import_react.useRef)(null);
	const scene = scenes[i];
	const frames = scenes.map((s, n) => ({
		prompt: str(s.prompt_en),
		seed: 201 + n
	}));
	const current = useQueuedImage(frames[i]?.prompt ?? "", frames[i]?.seed ?? 0, true);
	const rest = frames.slice(1).map((f) => ({ ...f }));
	(0, import_react.useEffect)(() => () => window.speechSynthesis?.cancel(), []);
	(0, import_react.useEffect)(() => {
		if (!playing || !scene) return;
		const narasi = str(scene.narasi);
		if (voice && narasi && "speechSynthesis" in window) {
			window.speechSynthesis.cancel();
			const u = new SpeechSynthesisUtterance(narasi);
			u.lang = "id-ID";
			window.speechSynthesis.speak(u);
		}
		timer.current = setTimeout(() => {
			if (i + 1 < scenes.length) setI(i + 1);
			else setPlaying(false);
		}, sceneSeconds(narasi) * 1e3);
		return () => {
			if (timer.current) clearTimeout(timer.current);
		};
	}, [
		playing,
		i,
		scene,
		scenes.length,
		voice
	]);
	if (!scene) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "player",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "player-stage",
				children: [current.state === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "kb",
					src: current.url,
					alt: str(scene.visual),
					style: { animationDuration: `${sceneSeconds(str(scene.narasi))}s` }
				}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shot-wait",
					children: current.state === "failed" ? "Frame gagal dimuat." : "Frame sedang dibuat atau antre…"
				}), str(scene.teks_layar) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "player-caption",
					children: str(scene.teks_layar)
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "player-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
						"Scene ",
						i + 1,
						"/",
						scenes.length,
						" · ",
						str(scene.waktu)
					] }),
					" ",
					str(scene.narasi)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "player-bar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "text-btn is-on",
						onClick: () => setPlaying((p) => !p),
						disabled: current.state !== "ready",
						children: [playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 14 }), playing ? "Berhenti" : "Putar"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-btn",
						onClick: () => {
							setPlaying(false);
							setI((n) => Math.max(0, n - 1));
						},
						disabled: i === 0,
						children: "Sebelumnya"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-btn",
						onClick: () => {
							setPlaying(false);
							setI((n) => Math.min(scenes.length - 1, n + 1));
						},
						disabled: i === scenes.length - 1,
						children: "Berikutnya"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "player-voice",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: voice,
							onChange: (e) => setVoice(e.target.checked)
						}), " Suara narasi"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						onClick: onClose,
						"aria-label": "Tutup pemutar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "player-prefetch",
				"aria-hidden": "true",
				children: rest.map((f, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prefetch, {
					prompt: f.prompt,
					seed: f.seed,
					active: n + 1 > i
				}, f.seed))
			})
		]
	});
}
function Prefetch({ prompt, seed, active }) {
	useQueuedImage(prompt, seed, active);
	return null;
}
function Video({ d }) {
	const scenes = objs(d.scenes).slice(0, 4);
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Judul",
			value: str(d.judul)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Durasi",
			value: str(d.durasi)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Musik",
			value: str(d.musik)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "scenes",
			children: scenes.map((s, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: str(s.waktu) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: str(s.visual) }),
				str(s.narasi) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "muted",
					children: ["Narasi: ", str(s.narasi)]
				}) : null,
				str(s.teks_layar) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "muted",
					children: ["Teks layar: ", str(s.teks_layar)]
				}) : null
			] }, `${str(s.waktu)}-${n}`))
		}),
		open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Player, {
			scenes,
			onClose: () => setOpen(false)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "text-btn",
			onClick: () => setOpen(true),
			disabled: !scenes.length,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { size: 16 }), "Buat pratinjau video"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted small",
			children: "Pratinjau memutar frame gambar AI dengan teks dan suara narasi di browser. Ini bukan file video."
		})
	] });
}
function Body$1({ id, res }) {
	const d = res.data;
	if (!d || !toText(id, res).trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "res-raw",
		children: res.raw
	});
	if (id === "raka") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Audiens",
			value: str(d.audiens)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullets, {
			label: "Tren",
			items: list(d.tren)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Angle",
			value: str(d.angle)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullets, {
			label: "Ide konten",
			items: list(d.ide)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
			items: list(d.hashtag),
			hash: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Waktu posting",
			value: str(d.waktu_posting)
		})
	] });
	if (id === "sari") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: "story-title",
			children: str(d.judul)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Hook",
			value: str(d.hook)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "story",
			children: str(d.cerita)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Caption",
			value: str(d.caption)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "CTA",
			value: str(d.cta)
		})
	] });
	if (id === "dimas") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Photo, { d });
	if (id === "nia") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { d });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Skor",
			value: str(d.skor) ? `${str(d.skor)} / 10` : ""
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Siap publish",
			value: d.siap_publish === true ? "Ya" : "Belum"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullets, {
			label: "Kekuatan",
			items: list(d.kekuatan)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bullets, {
			label: "Perbaikan",
			items: list(d.perbaikan)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Catatan",
			value: str(d.catatan)
		})
	] });
}
function statusLabel(res) {
	if (res.status === "done") return "Selesai";
	if (res.status === "error") return "Gagal";
	return res.waiting ? `Menunggu kuota ${res.waiting} dtk` : "Bekerja…";
}
function download(brief, results) {
	const blob = new Blob([toMarkdown(brief, results)], { type: "text/markdown;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "paket-konten.md";
	a.click();
	URL.revokeObjectURL(url);
}
function ResultsPanel() {
	const results = useOffice((s) => s.results);
	const brief = useOffice((s) => s.resultsBrief);
	const running = useOffice((s) => s.running);
	const [tab, setTab] = (0, import_react.useState)("raka");
	const present = ORDER.filter((id) => results[id]);
	const active = results[tab] ? tab : present[present.length - 1] ?? tab;
	const res = results[active];
	const anyDone = present.some((id) => results[id]?.status === "done");
	(0, import_react.useEffect)(() => {
		const working = ORDER.find((id) => results[id]?.status === "working");
		if (working) setTab(working);
	}, [results]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "results hit",
		"aria-label": "Hasil kerja tim",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sheet-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "brand-kicker",
					children: running ? "Tim sedang bekerja dengan AI" : "Hasil kerja AI"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: brief || "Hasil kerja" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "res-actions",
					children: [anyDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "text-btn",
						onClick: () => download(brief, results),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), "Unduh .md"]
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						onClick: () => setPanel(false),
						"aria-label": "Tutup hasil kerja",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "res-tabs",
				role: "tablist",
				children: ORDER.filter((id) => present.includes(id)).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": active === id,
					className: active === id ? `res-tab is-on who-${id}` : "res-tab",
					onClick: () => setTab(id),
					children: [PROFILES[id].team, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: statusLabel(results[id]) })]
				}, id))
			}),
			res ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "res-body",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "role",
						children: [
							PROFILES[active].name,
							" · ",
							PROFILES[active].role
						]
					}),
					res.status === "working" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: res.waiting ? `Kuota gratis penuh, mencoba lagi dalam ${res.waiting} detik…` : "Sedang menulis. Biasanya beberapa detik."
					}) : null,
					res.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "res-error",
						children: res.error
					}) : null,
					res.status === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body$1, {
						id: active,
						res
					}) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: "Belum ada hasil."
			})
		]
	});
}
var labelNodes = /* @__PURE__ */ new Map();
var SAMPLES = [
	"Kampanye 7 hari untuk peluncuran kopi susu baru",
	"Cerita pendek tentang pemilik warung kopi yang pantang menyerah",
	"Foto produk 5 gaya untuk toko sepatu lokal",
	"Standup: status konten minggu ini"
];
var STATE_LABEL = {
	work: "Di meja",
	walk: "Berjalan",
	talk: "Ngobrol"
};
function LabelLayer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "label-layer",
		"aria-hidden": "true",
		children: [ROOMS.map((room) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "room-tag",
			ref: (node) => {
				if (node) labelNodes.set(`room-${room.id}`, node);
				else labelNodes.delete(`room-${room.id}`);
			},
			children: room.name
		}, room.id)), AGENT_IDS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bubble",
			ref: (node) => {
				if (node) labelNodes.set(id, node);
				else labelNodes.delete(id);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: PROFILES[id].short }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: PROFILES[id].team }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: statusText(sim.agents[id]) })
			]
		}, id))]
	});
}
function Hud() {
	const mode = useOffice((s) => s.mode);
	const paused = useOffice((s) => s.paused);
	const speed = useOffice((s) => s.speed);
	const selected = useOffice((s) => s.selected);
	const intro = useOffice((s) => s.intro);
	const feed = useOffice((s) => s.feed);
	const panel = useOffice((s) => s.panel);
	const running = useOffice((s) => s.running);
	const hasResults = useOffice((s) => Object.keys(s.results).length > 0);
	useOffice((s) => s.tick);
	const [brief, setBrief] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		try {
			const prev = JSON.parse(localStorage.getItem("atrium-briefs-v2") || "[]");
			if (Array.isArray(prev)) setSaved(prev.slice(0, 4));
		} catch {}
	}, []);
	const latest = sim.log[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hud",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "topbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "brand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "brand-kicker",
							children: "Tim kreatif"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Atrium" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ticker",
						children: latest ? `${latest.clock}  ${latest.who} — ${latest.text}` : "Lantai baru bangun"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "top-actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "clock",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
									size: 16,
									strokeWidth: 1.75
								}), formatClock()]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "icon-btn",
								onClick: togglePause,
								"aria-pressed": paused,
								"aria-label": paused ? "Lanjutkan" : "Jeda karyawan",
								children: paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { size: 18 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "text-btn",
								onClick: cycleSpeed,
								"aria-label": "Kecepatan waktu",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { size: 16 }),
									speed,
									"×"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: mode === "orbit" ? "text-btn is-on" : "text-btn",
								onClick: () => setMode("orbit"),
								children: "Dari atas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: mode === "walk" ? "text-btn is-on" : "text-btn",
								onClick: () => setMode("walk"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { size: 16 }), "Jalan"]
							}),
							hasResults ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: panel ? "text-btn is-on" : "text-btn",
								onClick: () => setPanel(!panel),
								"aria-expanded": panel,
								children: running ? "Hasil (berjalan)" : "Hasil kerja"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-btn",
								onClick: toggleFeed,
								"aria-expanded": feed,
								children: "Aktivitas"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mid",
				children: [
					intro ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "intro hit",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "brand-kicker",
								children: "Studio yang bisa dilihat"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Lima orang, enam ruangan." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ide, Cerita, Foto, Video, dan Direktur Kreatif bekerja di studionya masing-masing, lalu menyerahkan hasil satu ke satu lewat gelembung. Kamu bisa keliling atau kirim brief — Hermes yang membagi dan menjaga alurnya." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "intro-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-btn",
									onClick: dismissIntro,
									children: "Lihat dari atas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-btn is-on",
									onClick: () => setMode("walk"),
									children: "Start — jalan keliling"
								})]
							})
						]
					}) : null,
					feed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "sheet hit",
						"aria-label": "Aktivitas",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sheet-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Aktivitas" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "icon-btn",
									onClick: toggleFeed,
									"aria-label": "Tutup aktivitas",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniMap, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "log",
								children: sim.log.slice(0, 10).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.clock }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.who }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.text })
								] }, item.id))
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "map-dock hit",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniMap, {})
					}),
					panel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsPanel, {}) : null,
					selected && !panel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dossier, { id: selected }) : null,
					mode === "walk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stick, {}) : null,
					mode === "orbit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "zoom hit",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "icon-btn",
							"aria-label": "Perbesar",
							onClick: () => {
								sim.orbit.dist = Math.max(8, sim.orbit.dist - 2);
							},
							children: "+"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "icon-btn",
							"aria-label": "Perkecil",
							onClick: () => {
								sim.orbit.dist = Math.min(32, sim.orbit.dist + 2);
							},
							children: "−"
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "dock",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "who-row",
						role: "list",
						children: AGENT_IDS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "listitem",
							className: selected === id ? `who who-${id} is-on` : `who who-${id}`,
							onClick: () => selectAgent(id),
							"aria-label": `${PROFILES[id].name}, ${PROFILES[id].team}`,
							children: PROFILES[id].short.slice(0, 1)
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "brief",
						onSubmit: (event) => {
							event.preventDefault();
							submitBrief(brief);
							setBrief("");
							setSaved((prev) => [brief.trim(), ...prev.filter((item) => item !== brief.trim())].filter(Boolean).slice(0, 4));
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "sr",
								htmlFor: "brief",
								children: "Brief untuk tim"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "brief",
								value: brief,
								onChange: (event) => setBrief(event.target.value),
								placeholder: "Tulis brief, misalnya: cerita pendek + foto + video tentang kopi susu baru",
								maxLength: 180
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "icon-btn is-on",
								"aria-label": "Kirim brief",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 18 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chips",
						children: [SAMPLES.map((sample) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "chip",
							onClick: () => submitBrief(sample),
							children: sample
						}, sample)), saved.filter((sample) => !SAMPLES.includes(sample)).map((sample) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "chip chip-old",
							onClick: () => submitBrief(sample),
							children: sample
						}, sample))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hint",
						children: mode === "walk" ? "W maju · S mundur · A belok kiri · D belok kanan · seret untuk menoleh" : "Seret untuk mutar denah · scroll atau tombol + − untuk zoom · klik orangnya"
					})
				]
			})
		]
	});
}
function Dossier({ id }) {
	const profile = PROFILES[id];
	const agent = sim.agents[id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "dossier hit",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sheet-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "brand-kicker",
					children: profile.team
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: profile.name })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "icon-btn",
					onClick: () => selectAgent(null),
					"aria-label": "Tutup profil",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "role",
				children: profile.role
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Ruangan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: profile.room })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: STATE_LABEL[agent.state] })] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "speech",
				children: [
					"“",
					statusText(agent),
					"”"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: profile.focus.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "note",
				children: "Saat kamu mengirim brief, hasil kerja agen ditulis oleh AI sungguhan (model gratis di Groq). Obrolan santai antar karakter saat tidak ada brief masih skenario."
			})
		]
	});
}
function MiniMap() {
	useOffice((s) => s.tick);
	const width = 220;
	const height = 148;
	const bounds = {
		minX: -12.7,
		maxX: 12.7,
		minZ: -8.7,
		maxZ: 8.7
	};
	const X = (x) => (x - bounds.minX) / (bounds.maxX - bounds.minX) * width;
	const Y = (z) => (z - bounds.minZ) / (bounds.maxZ - bounds.minZ) * height;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "minimap",
		viewBox: `0 0 ${width} ${height}`,
		role: "img",
		"aria-label": "Denah kantor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width,
				height,
				className: "map-bg",
				rx: 10
			}),
			ROOMS.map((room) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				onClick: () => room.agent && selectAgent(room.agent),
				className: "map-room",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: X(room.minX),
					y: Y(room.minZ),
					width: X(room.maxX) - X(room.minX),
					height: Y(room.maxZ) - Y(room.minZ),
					rx: 4
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: (X(room.minX) + X(room.maxX)) / 2,
					y: (Y(room.minZ) + Y(room.maxZ)) / 2,
					textAnchor: "middle",
					children: room.name.replace("Studio ", "").replace("Ruang ", "")
				})]
			}, room.id)),
			AGENT_IDS.map((id) => {
				const agent = sim.agents[id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: `dot dot-${id}`,
					cx: X(agent.x),
					cy: Y(agent.z),
					r: 4.2
				}, id);
			}),
			sim.cameraMode === "walk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "dot-you",
				cx: X(sim.visitor.x),
				cy: Y(sim.visitor.z),
				r: 3.4
			}) : null
		]
	});
}
function Stick() {
	const [knob, setKnob] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const origin = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	function move(clientX, clientY) {
		const dx = clientX - origin.current.x;
		const dy = clientY - origin.current.y;
		const max = 42;
		const clampedX = Math.max(-42, Math.min(max, dx));
		const clampedY = Math.max(-42, Math.min(max, dy));
		sim.stick.x = clampedX / max;
		sim.stick.y = -clampedY / max;
		setKnob({
			x: clampedX,
			y: clampedY
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "stick hit",
		"aria-label": "Tuas gerak",
		onPointerDown: (event) => {
			event.stopPropagation();
			event.currentTarget.setPointerCapture(event.pointerId);
			origin.current.x = event.clientX;
			origin.current.y = event.clientY;
			move(event.clientX, event.clientY);
		},
		onPointerMove: (event) => {
			if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
			event.stopPropagation();
			move(event.clientX, event.clientY);
		},
		onPointerUp: (event) => {
			event.currentTarget.releasePointerCapture(event.pointerId);
			sim.stick.x = 0;
			sim.stick.y = 0;
			setKnob({
				x: 0,
				y: 0
			});
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { transform: `translate(${knob.x}px, ${knob.y}px)` } })
	});
}
var SHIRT = {
	raka: PAL.ink,
	sari: PAL.moss,
	dimas: PAL.brass,
	nia: PAL.oakDeep,
	hermes: PAL.mist
};
function shadowTexture() {
	const canvas = document.createElement("canvas");
	canvas.width = 64;
	canvas.height = 64;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	const grd = ctx.createRadialGradient(32, 32, 4, 32, 32, 32);
	grd.addColorStop(0, "rgba(28,25,22,0.4)");
	grd.addColorStop(1, "rgba(28,25,22,0)");
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, 64, 64);
	const tex = new CanvasTexture(canvas);
	tex.colorSpace = SRGBColorSpace;
	return tex;
}
function pose(group, bob, walking, typing, drop) {
	group.position.y = drop + (walking ? Math.abs(Math.sin(bob)) * .055 : 0);
	const swing = walking ? Math.sin(bob) : 0;
	const legL = group.getObjectByName("legL");
	const legR = group.getObjectByName("legR");
	const armL = group.getObjectByName("armL");
	const armR = group.getObjectByName("armR");
	if (legL) legL.rotation.x = swing * .7;
	if (legR) legR.rotation.x = -swing * .7;
	if (armL) armL.rotation.x = typing ? -.9 + Math.sin(bob) * .22 : -swing * .55;
	if (armR) armR.rotation.x = typing ? -.9 + Math.sin(bob + 1.2) * .22 : swing * .55;
	const shadow = group.getObjectByName("shadow");
	if (shadow) shadow.position.y = -group.position.y + .03;
}
function Body({ shirt, pants, bun, glasses }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			name: "legL",
			position: [
				-.09,
				.78,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-.36,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.12,
					.7,
					.13
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: pants,
					roughness: .85
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			name: "legR",
			position: [
				.09,
				.78,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-.36,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.12,
					.7,
					.13
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: pants,
					roughness: .85
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.08,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.4,
				.5,
				.22
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: shirt,
				roughness: .78
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.22,
				.12
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.1,
				.08,
				.02
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PAL.brass,
				roughness: .4,
				metalness: .35
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			name: "armL",
			position: [
				-.26,
				1.24,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-.24,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.09,
					.46,
					.1
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: shirt,
					roughness: .8
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			name: "armR",
			position: [
				.26,
				1.24,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-.24,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.09,
					.46,
					.1
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: shirt,
					roughness: .8
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.5,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.155,
				18,
				14
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PAL.skin,
				roughness: .72
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.58,
				.01
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.148,
				18,
				12,
				0,
				Math.PI * 2,
				0,
				Math.PI * .52
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PAL.hair,
				roughness: .86
			})]
		}),
		bun ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.68,
				-.06
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.065,
				12,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PAL.hair,
				roughness: .86
			})]
		}) : null,
		glasses ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.5,
				.14
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.17,
				.03,
				.02
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: PAL.ink })]
		}) : null
	] });
}
var IDS = [
	"raka",
	"sari",
	"dimas",
	"nia",
	"hermes"
];
function Agents() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: IDS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentView, { id }, id)) });
}
function AgentView({ id }) {
	const ref = (0, import_react.useRef)(null);
	const shadowMap = (0, import_react.useMemo)(() => shadowTexture(), []);
	useFrame(() => {
		const group = ref.current;
		if (!group) return;
		const a = sim.agents[id];
		group.position.x = a.x;
		group.position.z = a.z;
		group.rotation.y = a.yaw;
		pose(group, a.bob, a.state === "walk", a.seated && a.state === "work", a.seated ? -.28 : 0);
		const ring = group.getObjectByName("ring");
		if (ring) ring.visible = sim.selected === id;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {
				shirt: SHIRT[id],
				pants: id === "hermes" ? PAL.oakDeep : PAL.ink,
				bun: id === "sari",
				glasses: id === "dimas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "ring",
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				position: [
					0,
					.04,
					0
				],
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
					.26,
					.34,
					28
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: PAL.brass })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "shadow",
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				position: [
					0,
					.03,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.3, 20] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: shadowMap ?? void 0,
					transparent: true,
					depthWrite: false,
					color: shadowMap ? PAL.paper : PAL.ink,
					opacity: shadowMap ? 1 : .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.95,
					0
				],
				onClick: (event) => {
					event.stopPropagation();
					if (sim.pointerMoved > 6) return;
					selectAgent(id);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.7,
					1.7,
					.6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					transparent: true,
					opacity: 0,
					depthWrite: false
				})]
			})
		]
	});
}
function Visitor() {
	const ref = (0, import_react.useRef)(null);
	useFrame(() => {
		const group = ref.current;
		if (!group) return;
		const v = sim.visitor;
		group.visible = sim.cameraMode === "walk";
		group.position.x = v.x;
		group.position.z = v.z;
		group.rotation.y = v.yaw;
		pose(group, v.bob, Math.abs(v.speed) > .2, false, 0);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {
			shirt: PAL.oak,
			pants: PAL.ink
		})
	});
}
var STYLE = {
	ground: {
		color: PAL.ground,
		roughness: 1,
		metalness: 0,
		cast: false,
		receive: true
	},
	floor: {
		color: PAL.oak,
		roughness: .86,
		metalness: 0,
		cast: false,
		receive: true
	},
	plaster: {
		color: PAL.plaster,
		roughness: .92,
		metalness: 0,
		cast: true,
		receive: true
	},
	partition: {
		color: PAL.partition,
		roughness: .9,
		metalness: 0,
		cast: true,
		receive: true
	},
	oak: {
		color: PAL.oak,
		roughness: .72,
		metalness: 0,
		cast: true,
		receive: true
	},
	oakDeep: {
		color: PAL.oakDeep,
		roughness: .78,
		metalness: 0,
		cast: true,
		receive: true
	},
	brass: {
		color: PAL.brass,
		roughness: .42,
		metalness: .35,
		cast: true,
		receive: true
	},
	metal: {
		color: PAL.metal,
		roughness: .55,
		metalness: .22,
		cast: true,
		receive: true
	},
	moss: {
		color: PAL.moss,
		roughness: .9,
		metalness: 0,
		cast: true,
		receive: false
	},
	paper: {
		color: PAL.paper,
		roughness: .95,
		metalness: 0,
		cast: true,
		receive: false
	},
	screen: {
		color: PAL.screen,
		roughness: .32,
		metalness: .05,
		emissive: PAL.moss,
		emissiveIntensity: .45,
		cast: false,
		receive: false
	},
	glass: {
		color: PAL.glass,
		roughness: .08,
		metalness: 0,
		opacity: .34,
		cast: false,
		receive: false
	},
	lamp: {
		color: PAL.lamp,
		roughness: .4,
		metalness: 0,
		emissive: PAL.lamp,
		emissiveIntensity: .7,
		cast: false,
		receive: false
	},
	rugStrat: {
		color: PAL.rugStrat,
		roughness: 1,
		metalness: 0,
		cast: false,
		receive: true
	},
	rugScript: {
		color: PAL.rugScript,
		roughness: 1,
		metalness: 0,
		cast: false,
		receive: true
	},
	rugVisual: {
		color: PAL.rugVisual,
		roughness: 1,
		metalness: 0,
		cast: false,
		receive: true
	},
	rugVideo: {
		color: PAL.rugVideo,
		roughness: 1,
		metalness: 0,
		cast: false,
		receive: true
	},
	rugMeet: {
		color: PAL.rugMeet,
		roughness: 1,
		metalness: 0,
		cast: false,
		receive: true
	},
	rugLobby: {
		color: PAL.rugLobby,
		roughness: 1,
		metalness: 0,
		cast: false,
		receive: true
	},
	runner: {
		color: PAL.runner,
		roughness: 1,
		metalness: 0,
		cast: false,
		receive: true
	}
};
function buildBuckets() {
	const groups = /* @__PURE__ */ new Map();
	for (const v of VISUALS) {
		const g = new BoxGeometry(v.w, v.h, v.d);
		g.translate(v.x, v.y + v.h / 2, v.z);
		const list = groups.get(v.mat) ?? [];
		list.push(g);
		groups.set(v.mat, list);
	}
	const buckets = [];
	for (const [key, geos] of groups) {
		const merged = mergeGeometries(geos, false);
		geos.forEach((g) => g.dispose());
		if (!merged) continue;
		const style = STYLE[key];
		buckets.push({
			key,
			geometry: merged,
			...style
		});
	}
	return buckets;
}
var desired = new Vector3();
var look = new Vector3();
var smooth = new Vector3(12, 14, 14);
var projected = new Vector3();
function StaticOffice() {
	const buckets = (0, import_react.useMemo)(() => buildBuckets(), []);
	const screen = (0, import_react.useRef)(null);
	useFrame(() => {
		if (screen.current) screen.current.emissiveIntensity = .34 + Math.sin(sim.t * 2.6) * .16;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [buckets.map((bucket) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: bucket.geometry,
		castShadow: bucket.cast,
		receiveShadow: bucket.receive,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			ref: bucket.key === "screen" ? screen : void 0,
			color: bucket.color,
			roughness: bucket.roughness,
			metalness: bucket.metalness,
			emissive: bucket.emissive ?? PAL.ink,
			emissiveIntensity: bucket.emissiveIntensity ?? 0,
			transparent: bucket.opacity != null,
			opacity: bucket.opacity ?? 1
		})
	}, bucket.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		position: [
			0,
			.02,
			0
		],
		onClick: () => {
			if (sim.pointerMoved > 6) return;
			selectAgent(null);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [24.4, 16.5] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			transparent: true,
			opacity: 0,
			depthWrite: false
		})]
	})] });
}
function Projector() {
	const camera = useThree((state) => state.camera);
	const size = useThree((state) => state.size);
	useFrame(() => {
		const place = (key, x, y, z, center) => {
			const el = labelNodes.get(key);
			if (!el) return;
			projected.set(x, y, z).project(camera);
			const sx = (projected.x * .5 + .5) * size.width;
			const sy = (-projected.y * .5 + .5) * size.height;
			const visible = projected.z < 1 && sx > -80 && sy > -80 && sx < size.width + 80 && sy < size.height + 80;
			el.style.opacity = visible ? "1" : "0";
			el.style.transform = center ? `translate3d(${sx}px, ${sy}px, 0) translate(-50%, -50%)` : `translate3d(${sx}px, ${sy}px, 0) translate(-50%, -118%)`;
		};
		for (const id of AGENT_IDS) {
			const agent = sim.agents[id];
			const lift = agent.seated ? -.28 : 0;
			place(id, agent.x, 1.95 + lift, agent.z, false);
			const line = labelNodes.get(id)?.querySelector("p");
			if (line) {
				const text = statusText(agent);
				if (line.textContent !== text) line.textContent = text;
			}
		}
		for (const room of ROOMS) place(`room-${room.id}`, (room.minX + room.maxX) / 2, .15, (room.minZ + room.maxZ) / 2, true);
	});
	return null;
}
function Systems() {
	const camera = useThree((state) => state.camera);
	const acc = (0, import_react.useRef)(0);
	const placed = (0, import_react.useRef)(false);
	useFrame((_, delta) => {
		const dt = Math.min(delta, .1);
		stepVisitor(dt);
		if (!sim.paused) stepOffice(Math.min(dt * sim.speed, .12));
		const snap = !placed.current || sim.camSnap;
		if (sim.cameraMode === "walk") {
			const v = sim.visitor;
			const fx = -Math.sin(v.yaw);
			const fz = -Math.cos(v.yaw);
			let dist = 4.5;
			for (let i = 0; i < 7; i += 1) {
				if (!pointBlocked(v.x - fx * dist, v.z - fz * dist)) break;
				dist *= .72;
			}
			desired.set(v.x - fx * dist, 1.72, v.z - fz * dist);
			look.set(v.x + fx * 1.2, 1.2, v.z + fz * 1.2);
		} else {
			const o = sim.orbit;
			if (sim.focus) {
				const a = sim.agents[sim.focus];
				const k = 1 - Math.exp(-3.2 * dt);
				o.tx += (a.x - o.tx) * k;
				o.tz += (a.z - o.tz) * k;
			}
			const cp = Math.cos(o.pitch);
			desired.set(o.tx + Math.sin(o.yaw) * cp * o.dist, Math.sin(o.pitch) * o.dist, o.tz + Math.cos(o.yaw) * cp * o.dist);
			look.set(o.tx, .6, o.tz);
		}
		if (snap) smooth.copy(desired);
		else smooth.lerp(desired, 1 - Math.exp(-7 * dt));
		camera.position.copy(smooth);
		camera.lookAt(look);
		placed.current = true;
		sim.camSnap = false;
		acc.current += dt;
		if (acc.current > .18) {
			acc.current = 0;
			bump();
		}
	});
	return null;
}
function pointBlocked(x, z) {
	return x < -12.1 || x > 12.1 || z < -8.1 || z > 8.1;
}
function OfficeCanvas() {
	const drag = (0, import_react.useRef)({
		on: false,
		x: 0,
		y: 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "stage",
		onPointerDown: (event) => {
			sim.pointerMoved = 0;
			drag.current = {
				on: true,
				x: event.clientX,
				y: event.clientY
			};
		},
		onPointerMove: (event) => {
			if (!drag.current.on) return;
			const dx = event.clientX - drag.current.x;
			const dy = event.clientY - drag.current.y;
			drag.current.x = event.clientX;
			drag.current.y = event.clientY;
			sim.pointerMoved += Math.abs(dx) + Math.abs(dy);
			if (sim.cameraMode === "walk") sim.visitor.yaw -= dx * .0055;
			else {
				if (Math.abs(dx) + Math.abs(dy) > .5) sim.focus = null;
				sim.orbit.yaw -= dx * .005;
				sim.orbit.pitch = Math.max(.38, Math.min(1.22, sim.orbit.pitch + dy * .0034));
			}
		},
		onPointerUp: () => {
			drag.current.on = false;
		},
		onPointerLeave: () => {
			drag.current.on = false;
		},
		onWheel: (event) => {
			if (sim.cameraMode !== "orbit") return;
			sim.orbit.dist = Math.max(8, Math.min(32, sim.orbit.dist + event.deltaY * .012));
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
			shadows: true,
			dpr: [1, 1.6],
			camera: {
				fov: 40,
				position: [
					12,
					14,
					14
				],
				near: .1,
				far: 120
			},
			gl: { antialias: true },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
					attach: "background",
					args: [PAL.sky]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
					attach: "fog",
					args: [
						PAL.sky,
						24,
						52
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
					"#f7f1e6",
					"#8a7560",
					.62
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .28 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
					position: [
						9,
						18,
						7
					],
					intensity: 1.55,
					color: PAL.sun,
					castShadow: true,
					"shadow-mapSize-width": 1024,
					"shadow-mapSize-height": 1024,
					"shadow-camera-near": 2,
					"shadow-camera-far": 46,
					"shadow-camera-left": -18,
					"shadow-camera-right": 18,
					"shadow-camera-top": 16,
					"shadow-camera-bottom": -16,
					"shadow-bias": -35e-5
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaticOffice, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Agents, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Visitor, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projector, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Systems, {})
			]
		})
	});
}
function typingTarget(target) {
	if (!(target instanceof HTMLElement)) return false;
	const tag = target.tagName;
	return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}
function OfficeApp() {
	(0, import_react.useEffect)(() => {
		mountProbe();
		const down = (event) => {
			if (typingTarget(event.target)) return;
			if (event.repeat && event.code === "Space") return;
			if (event.code === "Escape") {
				setMode("orbit");
				return;
			}
			if (event.code === "Space") {
				event.preventDefault();
				togglePause();
				return;
			}
			sim.keys.add(event.code);
			if (event.code.startsWith("Arrow") || event.code === "KeyW" || event.code === "KeyA" || event.code === "KeyS" || event.code === "KeyD") event.preventDefault();
		};
		const up = (event) => {
			sim.keys.delete(event.code);
		};
		const blur = () => {
			sim.keys.clear();
			sim.stick.x = 0;
			sim.stick.y = 0;
		};
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		window.addEventListener("blur", blur);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
			window.removeEventListener("blur", blur);
			sim.keys.clear();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "office-root",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelLayer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {})
		]
	});
}
//#endregion
export { OfficeApp };
