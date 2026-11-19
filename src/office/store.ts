import { create } from "zustand";
import { agentDelivers, agentFailed, agentWorking, assignBrief, sim, type CameraMode } from "./sim";
import { clipText, runPipeline, summaryOf, type AgentResult } from "./ai";
import { PROFILES, type AgentId } from "./world";

type OfficeState = {
  mode: CameraMode;
  paused: boolean;
  speed: number;
  selected: AgentId | null;
  intro: boolean;
  feed: boolean;
  tick: number;
  /** Real AI output per agent for the latest brief. */
  results: Partial<Record<AgentId, AgentResult>>;
  resultsBrief: string;
  running: boolean;
  panel: boolean;
};

export const useOffice = create<OfficeState>(() => ({
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
  panel: false,
}));

export function bump() {
  useOffice.setState((s) => ({ tick: s.tick + 1 }));
}

export function setMode(mode: CameraMode) {
  sim.cameraMode = mode;
  if (mode === "walk") sim.camSnap = true;
  useOffice.setState({ mode, intro: false });
}

export function togglePause() {
  sim.paused = !sim.paused;
  useOffice.setState({ paused: sim.paused });
}

export function cycleSpeed() {
  sim.speed = sim.speed === 1 ? 2 : sim.speed === 2 ? 4 : 1;
  useOffice.setState({ speed: sim.speed });
}

export function selectAgent(id: AgentId | null) {
  sim.selected = id;
  sim.focus = id;
  useOffice.setState({ selected: id, intro: false });
}

export function dismissIntro() {
  useOffice.setState({ intro: false });
}

export function toggleFeed() {
  useOffice.setState((s) => ({ feed: !s.feed }));
}

export function setPanel(open: boolean) {
  useOffice.setState({ panel: open });
}

let runId = 0;

function patchResult(id: AgentId, result: AgentResult, token: number) {
  if (token !== runId) return;
  useOffice.setState((s) => ({ results: { ...s.results, [id]: result }, tick: s.tick + 1 }));
}

export function submitBrief(text: string) {
  const clean = text.trim();
  if (!clean) return;
  const { plan, brief } = assignBrief(clean);
  try {
    const prev = JSON.parse(localStorage.getItem("atrium-briefs") || "[]") as string[];
    const next = [clean, ...prev.filter((item) => item !== clean)].slice(0, 6);
    localStorage.setItem("atrium-briefs", JSON.stringify(next));
  } catch {
    /* ignore quota / private mode */
  }
  sim.selected = "hermes";
  sim.focus = "hermes";
  const token = (runId += 1);
  useOffice.setState((s) => ({
    selected: "hermes",
    intro: false,
    tick: s.tick + 1,
    results: {},
    resultsBrief: plan.standup ? "" : brief,
    running: !plan.standup,
    panel: !plan.standup,
  }));
  if (plan.standup) return;

  void runPipeline(plan, brief, {
    onStart: (id) => {
      patchResult(id, { status: "working" }, token);
      agentWorking(id, `${PROFILES[id].short} mulai mengerjakan bagiannya.`);
    },
    onWait: (id, seconds) => {
      patchResult(id, { status: "working", waiting: seconds }, token);
      agentWorking(id, `Kuota gratis sedang penuh. Aku tunggu ${seconds} detik.`);
    },
    onDone: (id, result, next) => {
      patchResult(id, result, token);
      agentDelivers(id, summaryOf(id, result), next);
    },
    onError: (id, message) => {
      patchResult(id, { status: "error", error: message }, token);
      agentFailed(id, clipText(`Gagal: ${message}`, 110));
    },
    onFinish: () => {
      if (token === runId) useOffice.setState((s) => ({ running: false, tick: s.tick + 1 }));
    },
  });
}
