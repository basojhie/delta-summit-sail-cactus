import { i as __toESM, n as __exportAll } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@react-three/fiber+[...].mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-XATcHLq6.js
var router_XATcHLq6_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-K2ohoVR-.css";
var APP_NAME = "Atrium";
var Route$2 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Studio 3D untuk lima agen tim kreatif konten: Ide, Cerita, Foto, Video, dan Creative Director."
			},
			{
				name: "theme-color",
				content: "#f3eee6"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,650&family=Outfit:wght@400;500;600&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "id",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter = () => import("./routes-C4SABvbJ.mjs");
var Route$1 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var AI_AGENT_IDS = [
	"raka",
	"sari",
	"dimas",
	"nia",
	"hermes"
];
var BASE = "Kamu anggota tim konten kreatif berbahasa Indonesia. Balas HANYA dengan satu objek JSON valid, tanpa markdown dan tanpa teks lain. Tulis dalam bahasa Indonesia, kecuali kolom yang namanya berakhiran _en (bahasa Inggris). Konkret, singkat, dan siap pakai. Jangan mengarang fakta, angka statistik, atau nama merek yang tidak ada di brief. Kolom \"ringkas\" wajib ada: satu kalimat maksimal 90 karakter, kamu ucapkan ke rekan satu tim.";
var AGENT_SETUP = {
	raka: {
		maxTokens: 800,
		system: `${BASE}\n\nPeranmu: Raka, strategis dan periset konten. Dari brief, tentukan arah konten.\nSkema JSON: {"ringkas": string, "audiens": string, "tren": [3 string], "angle": string, "ide": [3 string, masing-masing judul + satu kalimat], "hashtag": [6 string tanpa #], "waktu_posting": string}`
	},
	sari: {
		maxTokens: 1100,
		system: `${BASE}\n\nPeranmu: Sari, storyteller dan penulis naskah. Tulis cerita atau naskah utuh yang enak dibaca/didengar, dengan pembuka yang kuat, alur jelas, dan penutup. Panjang cerita 120 sampai 220 kata. Ikuti angle dari Raka jika ada.
Skema JSON: {"ringkas": string, "judul": string, "hook": string, "cerita": string, "caption": string, "cta": string}`
	},
	dimas: {
		maxTokens: 1e3,
		system: `${BASE}\n\nPeranmu: Dimas, fotografer dan kreator visual. Susun konsep sesi foto yang bisa langsung dieksekusi dan tepat 3 shot.\nKolom prompt_en adalah prompt gambar bahasa Inggris, 25 sampai 45 kata: subjek, suasana, cahaya, komposisi, gaya foto. Jangan menaruh teks, logo, atau orang terkenal di dalam gambar.
Skema JSON: {"ringkas": string, "konsep": string, "palet": [4 string nama warna], "shots": [{"judul": string, "arahan": string, "prompt_en": string}]}`
	},
	nia: {
		maxTokens: 1100,
		system: `${BASE}\n\nPeranmu: Nia, produser video pendek (Reels/TikTok/Shorts). Susun storyboard tepat 4 scene yang total 20 sampai 40 detik.\nScene pertama harus hook dalam 3 detik. Kolom narasi dibacakan sebagai voiceover, maksimal 20 kata per scene. Kolom prompt_en adalah prompt gambar bahasa Inggris, 25 sampai 45 kata, untuk frame scene itu. Tanpa teks atau logo di gambar.
Skema JSON: {"ringkas": string, "judul": string, "durasi": string, "musik": string, "scenes": [{"waktu": string, "visual": string, "narasi": string, "teks_layar": string, "prompt_en": string}]}`
	},
	hermes: {
		maxTokens: 700,
		system: `${BASE}\n\nPeranmu: Hermes, Creative Director. Review hasil kerja tim terhadap brief secara jujur. Beri skor 1 sampai 10, jangan menggelembungkan nilai. Sebut kekuatan nyata dan perbaikan yang spesifik.
Skema JSON: {"ringkas": string, "skor": number, "siap_publish": boolean, "kekuatan": [2 sampai 3 string], "perbaikan": [2 sampai 3 string], "catatan": string}`
	}
};
var MAX_CONTEXT = 3600;
function validateAgentRequest(body) {
	if (!body || typeof body !== "object") return {
		ok: false,
		message: "Body harus berupa objek JSON."
	};
	const { agent, brief, context } = body;
	if (typeof agent !== "string" || !AI_AGENT_IDS.includes(agent)) return {
		ok: false,
		message: "Agen tidak dikenal."
	};
	if (typeof brief !== "string" || !brief.trim()) return {
		ok: false,
		message: "Brief kosong."
	};
	const ctx = typeof context === "string" ? context : "";
	return {
		ok: true,
		value: {
			agent,
			brief: brief.trim().slice(0, 400),
			context: ctx.slice(0, MAX_CONTEXT)
		}
	};
}
function userPrompt(req) {
	const ctx = req.context.trim();
	return ctx ? `Brief dari klien:\n${req.brief}\n\nHasil kerja rekan tim sejauh ini:\n${ctx}\n\nKerjakan bagianmu sekarang. Balas JSON saja.` : `Brief dari klien:\n${req.brief}\n\nKerjakan bagianmu sekarang. Balas JSON saja.`;
}
var hits = /* @__PURE__ */ new Map();
/** Sliding-window limiter. Best effort only: each serverless instance keeps its own memory. */
function hitRateLimit(key, now = Date.now(), limit = 14, windowMs = 6e4) {
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
var GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
var DEFAULT_MODEL = "openai/gpt-oss-120b";
function json(body, status = 200, extra = {}) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "no-store",
			...extra
		}
	});
}
async function callGroq(url, key, body) {
	return fetch(url, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `Bearer ${key}`
		},
		body: JSON.stringify(body),
		signal: AbortSignal.timeout(45e3)
	});
}
var Route = createFileRoute("/api/agent")({ server: { handlers: { POST: async ({ request }) => {
	const { env } = await import("./env.server-DRkkE6Ij.mjs");
	const origin = request.headers.get("origin");
	if (origin) {
		let host = "";
		try {
			host = new URL(origin).host;
		} catch {}
		if (host !== new URL(request.url).host) return json({
			error: "forbidden",
			message: "Origin tidak diizinkan."
		}, 403);
	}
	if (hitRateLimit((request.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "anon")) return json({
		error: "rate_limited",
		message: "Terlalu banyak permintaan. Tunggu sebentar.",
		retryAfter: 12
	}, 429);
	const key = env("GROQ_API_KEY");
	if (!key) return json({
		error: "no_key",
		message: "GROQ_API_KEY belum dipasang di Vercel (Settings → Environment Variables)."
	}, 503);
	let raw;
	try {
		raw = await request.json();
	} catch {
		return json({
			error: "bad_request",
			message: "JSON tidak valid."
		}, 400);
	}
	const parsed = validateAgentRequest(raw);
	if (!parsed.ok) return json({
		error: "bad_request",
		message: parsed.message
	}, 400);
	const { agent } = parsed.value;
	const setup = AGENT_SETUP[agent];
	const model = env("GROQ_MODEL") ?? DEFAULT_MODEL;
	const url = env("GROQ_API_URL") ?? GROQ_URL;
	const payload = {
		model,
		temperature: .8,
		max_completion_tokens: setup.maxTokens,
		messages: [{
			role: "system",
			content: setup.system
		}, {
			role: "user",
			content: userPrompt(parsed.value)
		}],
		response_format: { type: "json_object" }
	};
	if (/gpt-oss/i.test(model)) payload.reasoning_effort = "low";
	try {
		let res = await callGroq(url, key, payload);
		if (res.status === 400) {
			delete payload.response_format;
			res = await callGroq(url, key, payload);
		}
		if (res.status === 429) return json({
			error: "rate_limited",
			message: "Kuota gratis Groq sedang penuh.",
			retryAfter: Number(res.headers.get("retry-after")) || 12
		}, 429);
		if (res.status === 401 || res.status === 403) return json({
			error: "bad_key",
			message: "GROQ_API_KEY ditolak Groq. Periksa kuncinya."
		}, 502);
		if (!res.ok) return json({
			error: "upstream",
			message: `Groq membalas HTTP ${res.status}.`
		}, 502);
		const text = (await res.json()).choices?.[0]?.message?.content?.trim();
		if (!text) return json({
			error: "empty",
			message: "Groq membalas kosong."
		}, 502);
		return json({
			text,
			model
		});
	} catch {
		return json({
			error: "upstream",
			message: "Tidak bisa menghubungi Groq (timeout)."
		}, 504);
	}
} } } });
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	ApiAgentRoute: Route.update({
		id: "/api/agent",
		path: "/api/agent",
		getParentRoute: () => Route$2
	})
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { getRouter, router_XATcHLq6_exports as t };
