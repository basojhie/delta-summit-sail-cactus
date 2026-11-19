import assert from "node:assert/strict";
import test from "node:test";
import { clip, deliverLine, planBrief } from "./brief.ts";

test("standup brief calls all four workers and has no pipeline", () => {
  const plan = planBrief("Standup: status konten minggu ini");
  assert.equal(plan.standup, true);
  assert.deepEqual(plan.assignees, ["raka", "sari", "dimas", "nia"]);
  assert.deepEqual(plan.groups, []);
});

test("script brief routes to Sari then Nia, reviewed by Hermes", () => {
  const plan = planBrief("Naskah Reels 30 detik tentang tips hemat bulanan");
  assert.deepEqual(plan.assignees, ["sari", "nia"]);
  assert.deepEqual(plan.groups, [["sari"], ["nia"], ["hermes"]]);
});

test("photo brief routes to Dimas only", () => {
  const plan = planBrief("Foto produk 5 gaya untuk toko sepatu lokal");
  assert.deepEqual(plan.assignees, ["dimas"]);
  assert.deepEqual(plan.groups, [["dimas"], ["hermes"]]);
});

test("campaign brief runs the full pipeline with Dimas and Nia in parallel", () => {
  const plan = planBrief("Kampanye 7 hari untuk peluncuran kopi susu baru");
  assert.deepEqual(plan.groups, [["raka"], ["sari"], ["dimas", "nia"], ["hermes"]]);
});

test("unmatched brief falls back to the full pipeline", () => {
  const plan = planBrief("tolong bantu aku");
  assert.deepEqual(plan.assignees, ["raka", "sari", "dimas", "nia"]);
  assert.equal(plan.groups.at(-1)?.[0], "hermes");
});

test("research keywords route to Raka first", () => {
  const plan = planBrief("Riset tren dan kompetitor untuk akun fashion");
  assert.deepEqual(plan.groups[0], ["raka"]);
});

test("story brief routes to Sari, reviewed by Hermes", () => {
  const plan = planBrief("Cerita pendek tentang pemilik warung kopi");
  assert.deepEqual(plan.assignees, ["sari"]);
  assert.deepEqual(plan.groups, [["sari"], ["hermes"]]);
});

test("photo plus video brief runs Dimas and Nia in parallel", () => {
  const plan = planBrief("Foto dan video untuk peluncuran sepatu");
  assert.deepEqual(plan.groups.at(-2), ["dimas", "nia"]);
});

test("clip shortens long text and keeps short text", () => {
  assert.equal(clip("halo", 10), "halo");
  assert.equal(clip("a".repeat(100), 10).length, 10);
});

test("deliverLine names the brief and closes with a publish-ready review", () => {
  assert.match(deliverLine("hermes", "Carousel investasi"), /siap publish/);
  assert.match(deliverLine("sari", "Carousel investasi"), /Carousel investasi/);
});
