import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Agents, Visitor } from "./characters";
import { buildBuckets } from "./geometry";
import { labelNodes } from "./labels";
import { sim, statusText, stepOffice, stepVisitor } from "./sim";
import { bump, selectAgent } from "./store";
import { AGENT_IDS, PAL, ROOMS } from "./world";

const desired = new THREE.Vector3();
const look = new THREE.Vector3();
const smooth = new THREE.Vector3(12, 14, 14);
const projected = new THREE.Vector3();

function StaticOffice() {
  const buckets = useMemo(() => buildBuckets(), []);
  const screen = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(() => {
    if (screen.current) screen.current.emissiveIntensity = 0.34 + Math.sin(sim.t * 2.6) * 0.16;
  });
  return (
    <>
      {buckets.map((bucket) => (
        <mesh key={bucket.key} geometry={bucket.geometry} castShadow={bucket.cast} receiveShadow={bucket.receive}>
          <meshStandardMaterial
            ref={bucket.key === "screen" ? screen : undefined}
            color={bucket.color}
            roughness={bucket.roughness}
            metalness={bucket.metalness}
            emissive={bucket.emissive ?? PAL.ink}
            emissiveIntensity={bucket.emissiveIntensity ?? 0}
            transparent={bucket.opacity != null}
            opacity={bucket.opacity ?? 1}
          />
        </mesh>
      ))}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
        onClick={() => {
          if (sim.pointerMoved > 6) return;
          selectAgent(null);
        }}
      >
        <planeGeometry args={[24.4, 16.5]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  );
}

function Projector() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  useFrame(() => {
    const place = (key: string, x: number, y: number, z: number, center: boolean) => {
      const el = labelNodes.get(key);
      if (!el) return;
      projected.set(x, y, z).project(camera);
      const sx = (projected.x * 0.5 + 0.5) * size.width;
      const sy = (-projected.y * 0.5 + 0.5) * size.height;
      const visible = projected.z < 1 && sx > -80 && sy > -80 && sx < size.width + 80 && sy < size.height + 80;
      el.style.opacity = visible ? "1" : "0";
      el.style.transform = center
        ? `translate3d(${sx}px, ${sy}px, 0) translate(-50%, -50%)`
        : `translate3d(${sx}px, ${sy}px, 0) translate(-50%, -118%)`;
    };
    for (const id of AGENT_IDS) {
      const agent = sim.agents[id];
      const lift = agent.seated ? -0.28 : 0;
      place(id, agent.x, 1.95 + lift, agent.z, false);
      const line = labelNodes.get(id)?.querySelector("p");
      if (line) {
        const text = statusText(agent);
        if (line.textContent !== text) line.textContent = text;
      }
    }
    for (const room of ROOMS) {
      place(`room-${room.id}`, (room.minX + room.maxX) / 2, 0.15, (room.minZ + room.maxZ) / 2, true);
    }
  });
  return null;
}

function Systems() {
  const camera = useThree((state) => state.camera);
  const acc = useRef(0);
  const placed = useRef(false);
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    stepVisitor(dt);
    if (!sim.paused) stepOffice(Math.min(dt * sim.speed, 0.12));
    const snap = !placed.current || sim.camSnap;
    if (sim.cameraMode === "walk") {
      const v = sim.visitor;
      const fx = -Math.sin(v.yaw);
      const fz = -Math.cos(v.yaw);
      let dist = 4.5;
      for (let i = 0; i < 7; i += 1) {
        if (!pointBlocked(v.x - fx * dist, v.z - fz * dist)) break;
        dist *= 0.72;
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
      look.set(o.tx, 0.6, o.tz);
    }
    if (snap) smooth.copy(desired);
    else smooth.lerp(desired, 1 - Math.exp(-7 * dt));
    camera.position.copy(smooth);
    camera.lookAt(look);
    placed.current = true;
    sim.camSnap = false;
    acc.current += dt;
    if (acc.current > 0.18) {
      acc.current = 0;
      bump();
    }
  });
  return null;
}

function pointBlocked(x: number, z: number) {
  return x < -12.1 || x > 12.1 || z < -8.1 || z > 8.1;
}

export function OfficeCanvas() {
  const drag = useRef({ on: false, x: 0, y: 0 });
  return (
    <div
      className="stage"
      onPointerDown={(event) => {
        sim.pointerMoved = 0;
        drag.current = { on: true, x: event.clientX, y: event.clientY };
      }}
      onPointerMove={(event) => {
        if (!drag.current.on) return;
        const dx = event.clientX - drag.current.x;
        const dy = event.clientY - drag.current.y;
        drag.current.x = event.clientX;
        drag.current.y = event.clientY;
        sim.pointerMoved += Math.abs(dx) + Math.abs(dy);
        if (sim.cameraMode === "walk") {
          sim.visitor.yaw -= dx * 0.0055;
        } else {
          if (Math.abs(dx) + Math.abs(dy) > 0.5) sim.focus = null;
          sim.orbit.yaw -= dx * 0.005;
          sim.orbit.pitch = Math.max(0.38, Math.min(1.22, sim.orbit.pitch + dy * 0.0034));
        }
      }}
      onPointerUp={() => {
        drag.current.on = false;
      }}
      onPointerLeave={() => {
        drag.current.on = false;
      }}
      onWheel={(event) => {
        if (sim.cameraMode !== "orbit") return;
        sim.orbit.dist = Math.max(8, Math.min(32, sim.orbit.dist + event.deltaY * 0.012));
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ fov: 40, position: [12, 14, 14], near: 0.1, far: 120 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={[PAL.sky]} />
        <fog attach="fog" args={[PAL.sky, 24, 52]} />
        <hemisphereLight args={["#f7f1e6", "#8a7560", 0.62]} />
        <ambientLight intensity={0.28} />
        <directionalLight
          position={[9, 18, 7]}
          intensity={1.55}
          color={PAL.sun}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={2}
          shadow-camera-far={46}
          shadow-camera-left={-18}
          shadow-camera-right={18}
          shadow-camera-top={16}
          shadow-camera-bottom={-16}
          shadow-bias={-0.00035}
        />
        <StaticOffice />
        <Agents />
        <Visitor />
        <Projector />
        <Systems />
      </Canvas>
    </div>
  );
}
