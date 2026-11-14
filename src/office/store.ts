import { create } from "zustand";
import { assignBrief, sim, type CameraMode } from "./sim";
import type { AgentId } from "./world";

type OfficeState = {
  mode: CameraMode;
  paused: boolean;
  speed: number;
  selected: AgentId | null;
  intro: boolean;
  feed: boolean;
  tick: number;
};

export const useOffice = create<OfficeState>(() => ({
  mode: "orbit",
  paused: false,
  speed: 1,
  selected: null,
  intro: true,
  feed: false,
  tick: 0,
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

export function submitBrief(text: string) {
  const clean = text.trim();
  if (!clean) return;
  assignBrief(clean);
  try {
    const prev = JSON.parse(localStorage.getItem("atrium-briefs") || "[]") as string[];
    const next = [clean, ...prev.filter((item) => item !== clean)].slice(0, 6);
    localStorage.setItem("atrium-briefs", JSON.stringify(next));
  } catch {
    /* ignore quota / private mode */
  }
  sim.selected = "hermes";
  sim.focus = "hermes";
  useOffice.setState((s) => ({ selected: "hermes", intro: false, tick: s.tick + 1 }));
}
