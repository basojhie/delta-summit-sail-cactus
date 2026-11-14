import { useEffect } from "react";
import { Hud, LabelLayer } from "./Hud";
import { OfficeCanvas } from "./OfficeCanvas";
import { mountProbe, sim } from "./sim";
import { setMode, togglePause } from "./store";

function typingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

export function OfficeApp() {
  useEffect(() => {
    mountProbe();
    const down = (event: KeyboardEvent) => {
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
      if (event.code.startsWith("Arrow") || event.code === "KeyW" || event.code === "KeyA" || event.code === "KeyS" || event.code === "KeyD") {
        event.preventDefault();
      }
    };
    const up = (event: KeyboardEvent) => {
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

  return (
    <div className="office-root">
      <OfficeCanvas />
      <LabelLayer />
      <Hud />
    </div>
  );
}
