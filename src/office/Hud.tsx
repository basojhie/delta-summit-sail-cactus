import { useEffect, useRef, useState } from "react";
import { Clock3, Footprints, Gauge, Pause, Play, Send, X } from "lucide-react";
import { formatClock, sim, statusText } from "./sim";
import { cycleSpeed, dismissIntro, selectAgent, setMode, submitBrief, toggleFeed, togglePause, useOffice } from "./store";
import { AGENT_IDS, PROFILES, ROOMS, type AgentId } from "./world";
import { labelNodes } from "./labels";

const SAMPLES = [
  "Kampanye 7 hari untuk peluncuran kopi susu baru",
  "Naskah Reels 30 detik tentang tips hemat bulanan",
  "Carousel 8 slide: 5 kesalahan pemula investasi",
  "Standup: status konten minggu ini",
];

const STATE_LABEL = { work: "Di meja", walk: "Berjalan", talk: "Ngobrol" } as const;

export function LabelLayer() {
  return (
    <div className="label-layer" aria-hidden="true">
      {ROOMS.map((room) => (
        <div
          key={room.id}
          className="room-tag"
          ref={(node) => {
            if (node) labelNodes.set(`room-${room.id}`, node);
            else labelNodes.delete(`room-${room.id}`);
          }}
        >
          {room.name}
        </div>
      ))}
      {AGENT_IDS.map((id) => (
        <div
          key={id}
          className="bubble"
          ref={(node) => {
            if (node) labelNodes.set(id, node);
            else labelNodes.delete(id);
          }}
        >
          <strong>{PROFILES[id].short}</strong>
          <em>{PROFILES[id].team}</em>
          <p>{statusText(sim.agents[id])}</p>
        </div>
      ))}
    </div>
  );
}

export function Hud() {
  const mode = useOffice((s) => s.mode);
  const paused = useOffice((s) => s.paused);
  const speed = useOffice((s) => s.speed);
  const selected = useOffice((s) => s.selected);
  const intro = useOffice((s) => s.intro);
  const feed = useOffice((s) => s.feed);
  useOffice((s) => s.tick);
  const [brief, setBrief] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const prev = JSON.parse(localStorage.getItem("atrium-briefs-v2") || "[]") as string[];
      if (Array.isArray(prev)) setSaved(prev.slice(0, 4));
    } catch {
      /* ignore */
    }
  }, []);

  const latest = sim.log[0];

  return (
    <div className="hud">
      <header className="topbar">
        <div className="brand">
          <p className="brand-kicker">Tim kreatif</p>
          <h1>Atrium</h1>
        </div>
        <p className="ticker">{latest ? `${latest.clock}  ${latest.who} — ${latest.text}` : "Lantai baru bangun"}</p>
        <div className="top-actions">
          <span className="clock">
            <Clock3 size={16} strokeWidth={1.75} />
            {formatClock()}
          </span>
          <button type="button" className="icon-btn" onClick={togglePause} aria-pressed={paused} aria-label={paused ? "Lanjutkan" : "Jeda karyawan"}>
            {paused ? <Play size={18} /> : <Pause size={18} />}
          </button>
          <button type="button" className="text-btn" onClick={cycleSpeed} aria-label="Kecepatan waktu">
            <Gauge size={16} />
            {speed}×
          </button>
          <button type="button" className={mode === "orbit" ? "text-btn is-on" : "text-btn"} onClick={() => setMode("orbit")}>
            Dari atas
          </button>
          <button type="button" className={mode === "walk" ? "text-btn is-on" : "text-btn"} onClick={() => setMode("walk")}>
            <Footprints size={16} />
            Jalan
          </button>
          <button type="button" className="text-btn" onClick={toggleFeed} aria-expanded={feed}>
            Aktivitas
          </button>
        </div>
      </header>

      <div className="mid">
        {intro ? (
          <section className="intro hit">
            <p className="brand-kicker">Studio yang bisa dilihat</p>
            <h2>Lima orang, enam ruangan.</h2>
            <p>
              Strategi, Naskah, Visual, Video, dan Direktur Kreatif bekerja di studionya masing-masing, lalu
              menyerahkan hasil satu ke satu lewat gelembung. Kamu bisa keliling atau kirim brief — Hermes yang
              membagi dan menjaga alurnya.
            </p>
            <div className="intro-actions">
              <button type="button" className="text-btn" onClick={dismissIntro}>
                Lihat dari atas
              </button>
              <button type="button" className="text-btn is-on" onClick={() => setMode("walk")}>
                Start — jalan keliling
              </button>
            </div>
          </section>
        ) : null}

        {feed ? (
          <section className="sheet hit" aria-label="Aktivitas">
            <div className="sheet-head">
              <h2>Aktivitas</h2>
              <button type="button" className="icon-btn" onClick={toggleFeed} aria-label="Tutup aktivitas">
                <X size={18} />
              </button>
            </div>
            <MiniMap />
            <ol className="log">
              {sim.log.slice(0, 10).map((item) => (
                <li key={item.id}>
                  <span>{item.clock}</span>
                  <b>{item.who}</b>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : (
          <div className="map-dock hit">
            <MiniMap />
          </div>
        )}

        {selected ? <Dossier id={selected} /> : null}

        {mode === "walk" ? <Stick /> : null}
        {mode === "orbit" ? (
          <div className="zoom hit">
            <button type="button" className="icon-btn" aria-label="Perbesar" onClick={() => { sim.orbit.dist = Math.max(8, sim.orbit.dist - 2); }}>
              +
            </button>
            <button type="button" className="icon-btn" aria-label="Perkecil" onClick={() => { sim.orbit.dist = Math.min(32, sim.orbit.dist + 2); }}>
              −
            </button>
          </div>
        ) : null}
      </div>

      <footer className="dock">
        <div className="who-row" role="list">
          {AGENT_IDS.map((id) => (
            <button
              key={id}
              type="button"
              role="listitem"
              className={selected === id ? `who who-${id} is-on` : `who who-${id}`}
              onClick={() => selectAgent(id)}
              aria-label={`${PROFILES[id].name}, ${PROFILES[id].team}`}
            >
              {PROFILES[id].short.slice(0, 1)}
            </button>
          ))}
        </div>
        <form
          className="brief"
          onSubmit={(event) => {
            event.preventDefault();
            submitBrief(brief);
            setBrief("");
            setSaved((prev) => [brief.trim(), ...prev.filter((item) => item !== brief.trim())].filter(Boolean).slice(0, 4));
          }}
        >
          <label className="sr" htmlFor="brief">
            Brief untuk tim
          </label>
          <input
            id="brief"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
            placeholder="Tulis brief konten, misalnya carousel 8 slide tips hemat"
            maxLength={180}
          />
          <button type="submit" className="icon-btn is-on" aria-label="Kirim brief">
            <Send size={18} />
          </button>
        </form>
        <div className="chips">
          {SAMPLES.map((sample) => (
            <button key={sample} type="button" className="chip" onClick={() => submitBrief(sample)}>
              {sample}
            </button>
          ))}
          {saved.filter((sample) => !SAMPLES.includes(sample)).map((sample) => (
            <button key={sample} type="button" className="chip chip-old" onClick={() => submitBrief(sample)}>
              {sample}
            </button>
          ))}
        </div>
        <p className="hint">
          {mode === "walk"
            ? "W maju · S mundur · A belok kiri · D belok kanan · seret untuk menoleh"
            : "Seret untuk mutar denah · scroll atau tombol + − untuk zoom · klik orangnya"}
        </p>
      </footer>
    </div>
  );
}

function Dossier({ id }: { id: AgentId }) {
  const profile = PROFILES[id];
  const agent = sim.agents[id];
  return (
    <aside className="dossier hit">
      <div className="sheet-head">
        <div>
          <p className="brand-kicker">{profile.team}</p>
          <h2>{profile.name}</h2>
        </div>
        <button type="button" className="icon-btn" onClick={() => selectAgent(null)} aria-label="Tutup profil">
          <X size={18} />
        </button>
      </div>
      <p className="role">{profile.role}</p>
      <dl>
        <div>
          <dt>Ruangan</dt>
          <dd>{profile.room}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{STATE_LABEL[agent.state]}</dd>
        </div>
      </dl>
      <p className="speech">“{statusText(agent)}”</p>
      <ul>
        {profile.focus.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="note">
        Percakapan dan hasil kerja ini masih skenario di Atrium, belum dibuat oleh AI sungguhan.
      </p>
    </aside>
  );
}

function MiniMap() {
  useOffice((s) => s.tick);
  const width = 220;
  const height = 148;
  const bounds = { minX: -12.7, maxX: 12.7, minZ: -8.7, maxZ: 8.7 };
  const X = (x: number) => ((x - bounds.minX) / (bounds.maxX - bounds.minX)) * width;
  const Y = (z: number) => ((z - bounds.minZ) / (bounds.maxZ - bounds.minZ)) * height;
  return (
    <svg className="minimap" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Denah kantor">
      <rect width={width} height={height} className="map-bg" rx={10} />
      {ROOMS.map((room) => (
        <g key={room.id} onClick={() => room.agent && selectAgent(room.agent)} className="map-room">
          <rect
            x={X(room.minX)}
            y={Y(room.minZ)}
            width={X(room.maxX) - X(room.minX)}
            height={Y(room.maxZ) - Y(room.minZ)}
            rx={4}
          />
          <text x={(X(room.minX) + X(room.maxX)) / 2} y={(Y(room.minZ) + Y(room.maxZ)) / 2} textAnchor="middle">
            {room.name.replace("Studio ", "").replace("Ruang ", "")}
          </text>
        </g>
      ))}
      {AGENT_IDS.map((id) => {
        const agent = sim.agents[id];
        return <circle key={id} className={`dot dot-${id}`} cx={X(agent.x)} cy={Y(agent.z)} r={4.2} />;
      })}
      {sim.cameraMode === "walk" ? <circle className="dot-you" cx={X(sim.visitor.x)} cy={Y(sim.visitor.z)} r={3.4} /> : null}
    </svg>
  );
}

function Stick() {
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const origin = useRef({ x: 0, y: 0 });

  function move(clientX: number, clientY: number) {
    const dx = clientX - origin.current.x;
    const dy = clientY - origin.current.y;
    const max = 42;
    const clampedX = Math.max(-max, Math.min(max, dx));
    const clampedY = Math.max(-max, Math.min(max, dy));
    sim.stick.x = clampedX / max;
    sim.stick.y = -clampedY / max;
    setKnob({ x: clampedX, y: clampedY });
  }

  return (
    <div
      className="stick hit"
      aria-label="Tuas gerak"
      onPointerDown={(event) => {
        event.stopPropagation();
        event.currentTarget.setPointerCapture(event.pointerId);
        origin.current.x = event.clientX;
        origin.current.y = event.clientY;
        move(event.clientX, event.clientY);
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        event.stopPropagation();
        move(event.clientX, event.clientY);
      }}
      onPointerUp={(event) => {
        event.currentTarget.releasePointerCapture(event.pointerId);
        sim.stick.x = 0;
        sim.stick.y = 0;
        setKnob({ x: 0, y: 0 });
      }}
    >
      <span style={{ transform: `translate(${knob.x}px, ${knob.y}px)` }} />
    </div>
  );
}
