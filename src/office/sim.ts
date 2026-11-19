import {
  AGENT_IDS,
  LOUNGE_LINES,
  MEET_LINES,
  NODES,
  PLACE,
  PROFILES,
  VISIT_LINES,
  WORK_LINES,
  blocked,
  route,
  type AgentId,
} from "./world";
import { clip, deliverLine, handoffLine, planBrief, taskLine } from "./brief";

export type CameraMode = "orbit" | "walk";
export type Intent = "work" | "lounge" | "meet" | "visit";

export type Agent = {
  id: AgentId;
  at: string;
  home: string;
  x: number;
  z: number;
  yaw: number;
  path: string[];
  intent: Intent;
  state: "work" | "walk" | "talk";
  seated: boolean;
  speech: string;
  speechT: number;
  cooldown: number;
  afterHome: boolean;
  lineOverride: string | null;
  bob: number;
  cursor: number;
  phase: number;
};

export type Pipeline = { groups: AgentId[][]; i: number; t: number; brief: string };

export type LogItem = { id: number; who: string; text: string; clock: string };

const MEET_SEATS = ["meetWest", "meetEast", "meetSouth", "meetSW"] as const;
const DOORS: Record<AgentId, string> = {
  raka: "stratDoor",
  sari: "scriptDoor",
  dimas: "visualDoor",
  nia: "videoDoor",
  hermes: "lobbyEntry",
};

function makeAgent(id: AgentId, phase: number): Agent {
  const home = PROFILES[id].home;
  const node = NODES[home]!;
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
    speech: WORK_LINES[id][0]!,
    speechT: 9,
    cooldown: 4 + phase * 1.3,
    afterHome: false,
    lineOverride: null,
    bob: phase,
    cursor: 0,
    phase,
  };
}

export const sim = {
  agents: {
    raka: makeAgent("raka", 0.2),
    sari: makeAgent("sari", 1.1),
    dimas: makeAgent("dimas", 2.2),
    nia: makeAgent("nia", 3.4),
    hermes: makeAgent("hermes", 4.1),
  } as Record<AgentId, Agent>,
  visitor: { x: 0, z: 3.35, yaw: 0, speed: 0, bob: 0 },
  keys: new Set<string>(),
  probeKeys: null as Set<string> | null,
  probeSteer: null as number | null,
  stick: { x: 0, y: 0 },
  cameraMode: "orbit" as CameraMode,
  paused: false,
  speed: 1,
  selected: null as AgentId | null,
  hold: 0,
  untilStandup: 22,
  pipe: null as Pipeline | null,
  clockMin: 9 * 60 + 12,
  t: 0,
  log: [] as LogItem[],
  seq: 1,
  focus: null as AgentId | null,
  camSnap: false,
  orbit: { yaw: 0.62, pitch: 0.98, dist: 18.5, tx: 0, tz: 0.4 },
  pointerMoved: 0,
};

function person(id: AgentId) {
  return sim.agents[id];
}

export function formatClock(min = sim.clockMin) {
  const m = ((Math.floor(min) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

function pushLog(who: string, text: string) {
  sim.log.unshift({ id: sim.seq++, who, text, clock: formatClock() });
  if (sim.log.length > 28) sim.log.pop();
}

function say(a: Agent, text: string, important: boolean) {
  a.speech = text;
  a.speechT = 11;
  if (important) pushLog(PROFILES[a.id].short, text);
}

function nextWorkLine(a: Agent) {
  const lines = WORK_LINES[a.id];
  a.cursor = (a.cursor + 1) % lines.length;
  return lines[a.cursor]!;
}

export function statusText(a: Agent) {
  if (a.speechT > 0 && a.speech) return a.speech;
  if (a.state === "walk") {
    const dest = a.path[a.path.length - 1] ?? a.at;
    return `Menuju ${PLACE[dest] ?? "ruangan"}`;
  }
  if (a.state === "talk") return "Lagi ngobrol";
  return "Fokus di meja";
}

function arrive(a: Agent) {
  const node = NODES[a.at];
  if (!node) return;
  if (node.yaw != null) a.yaw = node.yaw;
  a.seated = !!node.seat && a.intent !== "lounge" && a.intent !== "visit";
  a.state = a.intent === "work" ? "work" : "talk";
  if (a.lineOverride) {
    a.speech = a.lineOverride;
    a.speechT = 10;
    a.lineOverride = null;
  } else if (a.intent === "lounge") {
    say(a, LOUNGE_LINES[a.id], false);
  } else if (a.intent === "visit") {
    say(a, VISIT_LINES[a.id], false);
  } else if (a.intent === "meet") {
    say(a, MEET_LINES[a.id], false);
  } else {
    say(a, nextWorkLine(a), false);
  }
  a.cooldown = a.intent === "meet" ? 8.5 : 5.5 + Math.random() * 4;
  a.afterHome = a.intent === "meet" || a.intent === "lounge" || a.intent === "visit";
}

export function go(a: Agent, dest: string, intent: Intent) {
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

function pickAmbient(a: Agent) {
  if (sim.hold > 0) {
    say(a, nextWorkLine(a), false);
    a.cooldown = 5;
    return;
  }
  const r = Math.random();
  if (r < 0.52) {
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
  if (r < 0.78) {
    if (a.at === "lounge") go(a, a.home, "work");
    else go(a, "lounge", "lounge");
    return;
  }
  const others = AGENT_IDS.filter((id) => id !== a.id);
  const other = others[Math.floor(Math.random() * others.length)]!;
  go(a, DOORS[other], "visit");
}

function beginStandup() {
  sim.hold = 16;
  pushLog("Hermes", "Standup singkat di ruang rapat.");
  const workers: AgentId[] = ["raka", "sari", "dimas", "nia"];
  workers.forEach((id, i) => {
    const a = person(id);
    a.lineOverride = MEET_LINES[id];
    say(a, MEET_LINES[id], false);
    go(a, MEET_SEATS[i]!, "meet");
  });
  const h = person("hermes");
  h.lineOverride = "Standup. Satu kabar, tanpa cerita panjang.";
  say(h, h.lineOverride, false);
  go(h, "meetHead", "meet");
}

const STAGE_GAP = 11;
const STAGE_START = 16;

export function assignBrief(text: string) {
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
    go(a, MEET_SEATS[i]!, "meet");
  });
  // The real work is done by the AI pipeline (see ai.ts); the scripted pipe stays unused.
  sim.pipe = null;
  sim.hold = Math.max(sim.hold, STAGE_START + STAGE_GAP);
  return { plan, brief: clean };
}

/** An agent starts (or keeps) working on its part while the model call is running. */
export function agentWorking(id: AgentId, line: string) {
  const a = person(id);
  a.lineOverride = line;
  say(a, line, false);
  sim.hold = Math.max(sim.hold, 40);
}

/** An agent announces real finished work and walks it over to the next agent. */
export function agentDelivers(id: AgentId, line: string, next?: AgentId) {
  const a = person(id);
  say(a, line, true);
  if (next) {
    a.lineOverride = handoffLine(id, PROFILES[next].short);
    go(a, DOORS[next], "visit");
  }
  sim.hold = Math.max(sim.hold, 40);
}

export function agentFailed(id: AgentId, line: string) {
  const a = person(id);
  say(a, line, true);
}

function stepPipe(dt: number) {
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
      const target = next[0]!;
      a.lineOverride = handoffLine(id, PROFILES[target].short);
      go(a, DOORS[target], "visit");
    }
  }
  p.i += 1;
  p.t = STAGE_GAP;
  sim.hold = Math.max(sim.hold, STAGE_GAP + 4);
  if (!next) sim.pipe = null;
}

function stepAgent(a: Agent, dt: number) {
  a.speechT = Math.max(0, a.speechT - dt);
  a.cooldown -= dt;
  if (a.path.length) {
    a.state = "walk";
    a.seated = false;
    const nextId = a.path[0]!;
    const n = NODES[nextId]!;
    const dx = n.x - a.x;
    const dz = n.z - a.z;
    const dist = Math.hypot(dx, dz);
    const step = Math.min(dist, 1.85 * dt);
    if (dist < 0.09) {
      a.x = n.x;
      a.z = n.z;
      a.path.shift();
      a.at = nextId;
      if (!a.path.length) arrive(a);
    } else {
      a.x += (dx / dist) * step;
      a.z += (dz / dist) * step;
      const targetYaw = Math.atan2(-dx, -dz);
      let d = targetYaw - a.yaw;
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

export function stepOffice(dt: number) {
  sim.t += dt;
  sim.clockMin += dt * 0.9;
  sim.hold = Math.max(0, sim.hold - dt);
  sim.untilStandup -= dt;
  if (sim.untilStandup <= 0 && sim.hold <= 0) {
    beginStandup();
    sim.untilStandup = 52 + Math.random() * 12;
  }
  stepPipe(dt);
  for (const id of AGENT_IDS) stepAgent(sim.agents[id], dt);
}

function held(code: string) {
  if (sim.probeKeys) return sim.probeKeys.has(code);
  return sim.keys.has(code);
}

export function stepVisitor(dt: number) {
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
  if (Math.abs(throttle) + Math.abs(strafe) > 0.1) v.bob += dt * 10;
}

export function mountProbe() {
  window.__controlsTest = {
    getYaw: () => sim.visitor.yaw,
    getSpeed: () => sim.visitor.speed,
    setKeys: (codes: string[]) => {
      sim.probeKeys = new Set(codes);
    },
    setSteer: (v: number) => {
      sim.probeSteer = v;
    },
  };
}

declare global {
  interface Window {
    __controlsTest?: {
      getYaw: () => number;
      getSpeed: () => number;
      setKeys?: (codes: string[]) => void;
      setSteer?: (v: number) => void;
    };
  }
}

pushLog("Hermes", "Studio dibuka. Lima orang sudah di mejanya.");
