import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { PAL, VISUALS, type MatKey } from "./world";

export type Bucket = {
  key: MatKey;
  color: string;
  roughness: number;
  metalness: number;
  emissive?: string;
  emissiveIntensity?: number;
  opacity?: number;
  cast: boolean;
  receive: boolean;
  geometry: THREE.BufferGeometry;
};

const STYLE: Record<
  MatKey,
  { color: string; roughness: number; metalness: number; emissive?: string; emissiveIntensity?: number; opacity?: number; cast: boolean; receive: boolean }
> = {
  ground: { color: PAL.ground, roughness: 1, metalness: 0, cast: false, receive: true },
  floor: { color: PAL.oak, roughness: 0.86, metalness: 0, cast: false, receive: true },
  plaster: { color: PAL.plaster, roughness: 0.92, metalness: 0, cast: true, receive: true },
  partition: { color: PAL.partition, roughness: 0.9, metalness: 0, cast: true, receive: true },
  oak: { color: PAL.oak, roughness: 0.72, metalness: 0, cast: true, receive: true },
  oakDeep: { color: PAL.oakDeep, roughness: 0.78, metalness: 0, cast: true, receive: true },
  brass: { color: PAL.brass, roughness: 0.42, metalness: 0.35, cast: true, receive: true },
  metal: { color: PAL.metal, roughness: 0.55, metalness: 0.22, cast: true, receive: true },
  moss: { color: PAL.moss, roughness: 0.9, metalness: 0, cast: true, receive: false },
  paper: { color: PAL.paper, roughness: 0.95, metalness: 0, cast: true, receive: false },
  screen: { color: PAL.screen, roughness: 0.32, metalness: 0.05, emissive: PAL.moss, emissiveIntensity: 0.45, cast: false, receive: false },
  glass: { color: PAL.glass, roughness: 0.08, metalness: 0, opacity: 0.34, cast: false, receive: false },
  lamp: { color: PAL.lamp, roughness: 0.4, metalness: 0, emissive: PAL.lamp, emissiveIntensity: 0.7, cast: false, receive: false },
  rugGit: { color: PAL.rugGit, roughness: 1, metalness: 0, cast: false, receive: true },
  rugTerm: { color: PAL.rugTerm, roughness: 1, metalness: 0, cast: false, receive: true },
  rugGroq: { color: PAL.rugGroq, roughness: 1, metalness: 0, cast: false, receive: true },
  rugCf: { color: PAL.rugCf, roughness: 1, metalness: 0, cast: false, receive: true },
  rugMeet: { color: PAL.rugMeet, roughness: 1, metalness: 0, cast: false, receive: true },
  rugLobby: { color: PAL.rugLobby, roughness: 1, metalness: 0, cast: false, receive: true },
  runner: { color: PAL.runner, roughness: 1, metalness: 0, cast: false, receive: true },
};

export function buildBuckets(): Bucket[] {
  const groups = new Map<MatKey, THREE.BufferGeometry[]>();
  for (const v of VISUALS) {
    const g = new THREE.BoxGeometry(v.w, v.h, v.d);
    g.translate(v.x, v.y + v.h / 2, v.z);
    const list = groups.get(v.mat) ?? [];
    list.push(g);
    groups.set(v.mat, list);
  }
  const buckets: Bucket[] = [];
  for (const [key, geos] of groups) {
    const merged = mergeGeometries(geos, false);
    geos.forEach((g) => g.dispose());
    if (!merged) continue;
    const style = STYLE[key];
    buckets.push({ key, geometry: merged, ...style });
  }
  return buckets;
}
