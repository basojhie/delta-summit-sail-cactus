import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Film, Play, Square, X } from "lucide-react";
import { imageUrl, list, objs, sleep, str, toMarkdown, toText, type AgentData, type AgentResult } from "./ai";
import { setPanel, useOffice } from "./store";
import { PROFILES, type AgentId } from "./world";

const ORDER: AgentId[] = ["raka", "sari", "dimas", "nia", "hermes"];

/**
 * Pollinations' anonymous tier allows roughly one image every 15 seconds, so every
 * picture in the page waits its turn in one shared queue and retries on failure.
 */
let chain: Promise<unknown> = Promise.resolve();

function probe(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    const timer = setTimeout(() => resolve(false), 70_000);
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

function queueImage(url: string): Promise<boolean> {
  const job = chain.then(async () => {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      if (await probe(url)) {
        await sleep(3000);
        return true;
      }
      await sleep(16_000);
    }
    return false;
  });
  chain = job.catch(() => undefined);
  return job;
}

function useQueuedImage(prompt: string, seed: number, enabled: boolean) {
  const url = useMemo(() => imageUrl(prompt, seed), [prompt, seed]);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "failed">("idle");
  useEffect(() => {
    if (!enabled || !prompt) return;
    let alive = true;
    setState("loading");
    void queueImage(url).then((ok) => {
      if (alive) setState(ok ? "ready" : "failed");
    });
    return () => {
      alive = false;
    };
  }, [url, prompt, enabled]);
  return { url, state };
}

function AiImage({ prompt, seed, enabled = true, caption }: { prompt: string; seed: number; enabled?: boolean; caption: string }) {
  const { url, state } = useQueuedImage(prompt, seed, enabled);
  return (
    <figure className="shot-img">
      {state === "ready" ? (
        <img src={url} alt={caption} loading="lazy" />
      ) : (
        <div className="shot-wait">{state === "failed" ? "Gambar gagal dimuat. Layanan gratis sedang padat." : state === "idle" ? "Menunggu giliran" : "Foto sedang dibuat atau antre…"}</div>
      )}
    </figure>
  );
}

function Chips({ items, hash }: { items: string[]; hash?: boolean }) {
  if (!items.length) return null;
  return (
    <div className="res-chips">
      {items.map((item) => (
        <span key={item}>{hash ? `#${item.replace(/^#/, "")}` : item}</span>
      ))}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="res-field">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Bullets({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="res-field">
      <dt>{label}</dt>
      <dd>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </dd>
    </div>
  );
}

function Photo({ d }: { d: AgentData }) {
  const shots = objs(d.shots).slice(0, 3);
  return (
    <>
      <Field label="Konsep" value={str(d.konsep)} />
      <Chips items={list(d.palet)} />
      <div className="shot-grid">
        {shots.map((shot, i) => (
          <div key={`${str(shot.judul)}-${i}`} className="shot">
            <AiImage prompt={str(shot.prompt_en)} seed={101 + i} caption={str(shot.judul)} />
            <h4>{str(shot.judul)}</h4>
            <p>{str(shot.arahan)}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function sceneSeconds(narasi: string) {
  const words = narasi.split(/\s+/).filter(Boolean).length;
  return Math.max(4, Math.min(9, Math.round(words * 0.45) + 2));
}

function Player({ scenes, onClose }: { scenes: AgentData[]; onClose: () => void }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [voice, setVoice] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scene = scenes[i];
  const frames = scenes.map((s, n) => ({ prompt: str(s.prompt_en), seed: 201 + n }));
  const current = useQueuedImage(frames[i]?.prompt ?? "", frames[i]?.seed ?? 0, true);
  // Pre-queue the remaining frames so playback does not stall on every scene.
  const rest = frames.slice(1).map((f) => ({ ...f }));
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  useEffect(() => {
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
    }, sceneSeconds(narasi) * 1000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [playing, i, scene, scenes.length, voice]);

  if (!scene) return null;
  return (
    <div className="player">
      <div className="player-stage">
        {current.state === "ready" ? (
          <img key={i} className="kb" src={current.url} alt={str(scene.visual)} style={{ animationDuration: `${sceneSeconds(str(scene.narasi))}s` }} />
        ) : (
          <div className="shot-wait">{current.state === "failed" ? "Frame gagal dimuat." : "Frame sedang dibuat atau antre…"}</div>
        )}
        {str(scene.teks_layar) ? <p className="player-caption">{str(scene.teks_layar)}</p> : null}
      </div>
      <p className="player-line">
        <b>
          Scene {i + 1}/{scenes.length} · {str(scene.waktu)}
        </b>{" "}
        {str(scene.narasi)}
      </p>
      <div className="player-bar">
        <button type="button" className="text-btn is-on" onClick={() => setPlaying((p) => !p)} disabled={current.state !== "ready"}>
          {playing ? <Square size={14} /> : <Play size={14} />}
          {playing ? "Berhenti" : "Putar"}
        </button>
        <button type="button" className="text-btn" onClick={() => { setPlaying(false); setI((n) => Math.max(0, n - 1)); }} disabled={i === 0}>
          Sebelumnya
        </button>
        <button type="button" className="text-btn" onClick={() => { setPlaying(false); setI((n) => Math.min(scenes.length - 1, n + 1)); }} disabled={i === scenes.length - 1}>
          Berikutnya
        </button>
        <label className="player-voice">
          <input type="checkbox" checked={voice} onChange={(e) => setVoice(e.target.checked)} /> Suara narasi
        </label>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Tutup pemutar">
          <X size={16} />
        </button>
      </div>
      <div className="player-prefetch" aria-hidden="true">
        {rest.map((f, n) => (
          <Prefetch key={f.seed} prompt={f.prompt} seed={f.seed} active={n + 1 > i} />
        ))}
      </div>
    </div>
  );
}

function Prefetch({ prompt, seed, active }: { prompt: string; seed: number; active: boolean }) {
  useQueuedImage(prompt, seed, active);
  return null;
}

function Video({ d }: { d: AgentData }) {
  const scenes = objs(d.scenes).slice(0, 4);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Field label="Judul" value={str(d.judul)} />
      <Field label="Durasi" value={str(d.durasi)} />
      <Field label="Musik" value={str(d.musik)} />
      <ol className="scenes">
        {scenes.map((s, n) => (
          <li key={`${str(s.waktu)}-${n}`}>
            <b>{str(s.waktu)}</b>
            <p>{str(s.visual)}</p>
            {str(s.narasi) ? <p className="muted">Narasi: {str(s.narasi)}</p> : null}
            {str(s.teks_layar) ? <p className="muted">Teks layar: {str(s.teks_layar)}</p> : null}
          </li>
        ))}
      </ol>
      {open ? (
        <Player scenes={scenes} onClose={() => setOpen(false)} />
      ) : (
        <button type="button" className="text-btn" onClick={() => setOpen(true)} disabled={!scenes.length}>
          <Film size={16} />
          Buat pratinjau video
        </button>
      )}
      <p className="muted small">Pratinjau memutar frame gambar AI dengan teks dan suara narasi di browser. Ini bukan file video.</p>
    </>
  );
}

function Body({ id, res }: { id: AgentId; res: AgentResult }) {
  const d = res.data;
  // Models sometimes answer with unexpected keys; never show an empty card.
  if (!d || !toText(id, res).trim()) return <p className="res-raw">{res.raw}</p>;
  if (id === "raka") {
    return (
      <>
        <Field label="Audiens" value={str(d.audiens)} />
        <Bullets label="Tren" items={list(d.tren)} />
        <Field label="Angle" value={str(d.angle)} />
        <Bullets label="Ide konten" items={list(d.ide)} />
        <Chips items={list(d.hashtag)} hash />
        <Field label="Waktu posting" value={str(d.waktu_posting)} />
      </>
    );
  }
  if (id === "sari") {
    return (
      <>
        <h4 className="story-title">{str(d.judul)}</h4>
        <Field label="Hook" value={str(d.hook)} />
        <p className="story">{str(d.cerita)}</p>
        <Field label="Caption" value={str(d.caption)} />
        <Field label="CTA" value={str(d.cta)} />
      </>
    );
  }
  if (id === "dimas") return <Photo d={d} />;
  if (id === "nia") return <Video d={d} />;
  return (
    <>
      <Field label="Skor" value={str(d.skor) ? `${str(d.skor)} / 10` : ""} />
      <Field label="Siap publish" value={d.siap_publish === true ? "Ya" : "Belum"} />
      <Bullets label="Kekuatan" items={list(d.kekuatan)} />
      <Bullets label="Perbaikan" items={list(d.perbaikan)} />
      <Field label="Catatan" value={str(d.catatan)} />
    </>
  );
}

function statusLabel(res: AgentResult) {
  if (res.status === "done") return "Selesai";
  if (res.status === "error") return "Gagal";
  return res.waiting ? `Menunggu kuota ${res.waiting} dtk` : "Bekerja…";
}

function download(brief: string, results: Partial<Record<AgentId, AgentResult>>) {
  const blob = new Blob([toMarkdown(brief, results)], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "paket-konten.md";
  a.click();
  URL.revokeObjectURL(url);
}

export function ResultsPanel() {
  const results = useOffice((s) => s.results);
  const brief = useOffice((s) => s.resultsBrief);
  const running = useOffice((s) => s.running);
  const [tab, setTab] = useState<AgentId>("raka");
  const present = ORDER.filter((id) => results[id]);
  const active = results[tab] ? tab : (present[present.length - 1] ?? tab);
  const res = results[active];
  const anyDone = present.some((id) => results[id]?.status === "done");

  // Follow the agent that is currently working so the panel never looks frozen.
  useEffect(() => {
    const working = ORDER.find((id) => results[id]?.status === "working");
    if (working) setTab(working);
  }, [results]);

  return (
    <section className="results hit" aria-label="Hasil kerja tim">
      <div className="sheet-head">
        <div>
          <p className="brand-kicker">{running ? "Tim sedang bekerja dengan AI" : "Hasil kerja AI"}</p>
          <h2>{brief || "Hasil kerja"}</h2>
        </div>
        <div className="res-actions">
          {anyDone ? (
            <button type="button" className="text-btn" onClick={() => download(brief, results)}>
              <Download size={16} />
              Unduh .md
            </button>
          ) : null}
          <button type="button" className="icon-btn" onClick={() => setPanel(false)} aria-label="Tutup hasil kerja">
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="res-tabs" role="tablist">
        {ORDER.filter((id) => present.includes(id)).map((id) => (
          <button key={id} type="button" role="tab" aria-selected={active === id} className={active === id ? `res-tab is-on who-${id}` : "res-tab"} onClick={() => setTab(id)}>
            {PROFILES[id].team}
            <small>{statusLabel(results[id]!)}</small>
          </button>
        ))}
      </div>
      {res ? (
        <div className="res-body">
          <p className="role">{PROFILES[active].name} · {PROFILES[active].role}</p>
          {res.status === "working" ? <p className="muted">{res.waiting ? `Kuota gratis penuh, mencoba lagi dalam ${res.waiting} detik…` : "Sedang menulis. Biasanya beberapa detik."}</p> : null}
          {res.status === "error" ? <p className="res-error">{res.error}</p> : null}
          {res.status === "done" ? <Body id={active} res={res} /> : null}
        </div>
      ) : (
        <p className="muted">Belum ada hasil.</p>
      )}
    </section>
  );
}
