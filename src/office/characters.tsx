import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sim } from "./sim";
import { selectAgent } from "./store";
import { PAL, type AgentId } from "./world";

const SHIRT: Record<AgentId, string> = {
  raka: PAL.ink,
  sari: PAL.moss,
  dimas: PAL.brass,
  nia: PAL.oakDeep,
  hermes: PAL.mist,
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
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function pose(group: THREE.Group, bob: number, walking: boolean, typing: boolean, drop: number) {
  group.position.y = drop + (walking ? Math.abs(Math.sin(bob)) * 0.055 : 0);
  const swing = walking ? Math.sin(bob) : 0;
  const legL = group.getObjectByName("legL");
  const legR = group.getObjectByName("legR");
  const armL = group.getObjectByName("armL");
  const armR = group.getObjectByName("armR");
  if (legL) legL.rotation.x = swing * 0.7;
  if (legR) legR.rotation.x = -swing * 0.7;
  if (armL) armL.rotation.x = typing ? -0.9 + Math.sin(bob) * 0.22 : -swing * 0.55;
  if (armR) armR.rotation.x = typing ? -0.9 + Math.sin(bob + 1.2) * 0.22 : swing * 0.55;
  const shadow = group.getObjectByName("shadow");
  if (shadow) shadow.position.y = -group.position.y + 0.03;
}

function Body({
  shirt,
  pants,
  bun,
  glasses,
}: {
  shirt: string;
  pants: string;
  bun?: boolean;
  glasses?: boolean;
}) {
  return (
    <>
      <group name="legL" position={[-0.09, 0.78, 0]}>
        <mesh position={[0, -0.36, 0]} castShadow>
          <boxGeometry args={[0.12, 0.7, 0.13]} />
          <meshStandardMaterial color={pants} roughness={0.85} />
        </mesh>
      </group>
      <group name="legR" position={[0.09, 0.78, 0]}>
        <mesh position={[0, -0.36, 0]} castShadow>
          <boxGeometry args={[0.12, 0.7, 0.13]} />
          <meshStandardMaterial color={pants} roughness={0.85} />
        </mesh>
      </group>
      <mesh position={[0, 1.08, 0]} castShadow>
        <boxGeometry args={[0.4, 0.5, 0.22]} />
        <meshStandardMaterial color={shirt} roughness={0.78} />
      </mesh>
      <mesh position={[0, 1.22, 0.12]}>
        <boxGeometry args={[0.1, 0.08, 0.02]} />
        <meshStandardMaterial color={PAL.brass} roughness={0.4} metalness={0.35} />
      </mesh>
      <group name="armL" position={[-0.26, 1.24, 0]}>
        <mesh position={[0, -0.24, 0]} castShadow>
          <boxGeometry args={[0.09, 0.46, 0.1]} />
          <meshStandardMaterial color={shirt} roughness={0.8} />
        </mesh>
      </group>
      <group name="armR" position={[0.26, 1.24, 0]}>
        <mesh position={[0, -0.24, 0]} castShadow>
          <boxGeometry args={[0.09, 0.46, 0.1]} />
          <meshStandardMaterial color={shirt} roughness={0.8} />
        </mesh>
      </group>
      <mesh position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.155, 18, 14]} />
        <meshStandardMaterial color={PAL.skin} roughness={0.72} />
      </mesh>
      <mesh position={[0, 1.58, 0.01]} castShadow>
        <sphereGeometry args={[0.148, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        <meshStandardMaterial color={PAL.hair} roughness={0.86} />
      </mesh>
      {bun ? (
        <mesh position={[0, 1.68, -0.06]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color={PAL.hair} roughness={0.86} />
        </mesh>
      ) : null}
      {glasses ? (
        <mesh position={[0, 1.5, 0.14]}>
          <boxGeometry args={[0.17, 0.03, 0.02]} />
          <meshBasicMaterial color={PAL.ink} />
        </mesh>
      ) : null}
    </>
  );
}

const IDS: AgentId[] = ["raka", "sari", "dimas", "nia", "hermes"];

export function Agents() {
  return (
    <>
      {IDS.map((id) => (
        <AgentView key={id} id={id} />
      ))}
    </>
  );
}

function AgentView({ id }: { id: AgentId }) {
  const ref = useRef<THREE.Group>(null);
  const shadowMap = useMemo(() => shadowTexture(), []);
  useFrame(() => {
    const group = ref.current;
    if (!group) return;
    const a = sim.agents[id];
    group.position.x = a.x;
    group.position.z = a.z;
    group.rotation.y = a.yaw;
    pose(group, a.bob, a.state === "walk", a.seated && a.state === "work", a.seated ? -0.28 : 0);
    const ring = group.getObjectByName("ring");
    if (ring) ring.visible = sim.selected === id;
  });
  return (
    <group ref={ref}>
      <Body shirt={SHIRT[id]} pants={id === "hermes" ? PAL.oakDeep : PAL.ink} bun={id === "sari"} glasses={id === "dimas"} />
      <mesh name="ring" rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]} visible={false}>
        <ringGeometry args={[0.26, 0.34, 28]} />
        <meshBasicMaterial color={PAL.brass} />
      </mesh>
      <mesh name="shadow" rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <circleGeometry args={[0.3, 20]} />
        <meshBasicMaterial map={shadowMap ?? undefined} transparent depthWrite={false} color={shadowMap ? PAL.paper : PAL.ink} opacity={shadowMap ? 1 : 0.2} />
      </mesh>
      <mesh
        position={[0, 0.95, 0]}
        onClick={(event) => {
          event.stopPropagation();
          if (sim.pointerMoved > 6) return;
          selectAgent(id);
        }}
      >
        <boxGeometry args={[0.7, 1.7, 0.6]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function Visitor() {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const group = ref.current;
    if (!group) return;
    const v = sim.visitor;
    group.visible = sim.cameraMode === "walk";
    group.position.x = v.x;
    group.position.z = v.z;
    group.rotation.y = v.yaw;
    pose(group, v.bob, Math.abs(v.speed) > 0.2, false, 0);
  });
  return (
    <group ref={ref}>
      <Body shirt={PAL.oak} pants={PAL.ink} />
    </group>
  );
}
