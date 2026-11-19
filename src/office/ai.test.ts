import assert from "node:assert/strict";
import test from "node:test";
import { AiError, buildContext, callAgent, imageUrl, parseJson, runPipeline, summaryOf, toMarkdown, toText, type AgentResult } from "./ai.ts";
import { AGENT_SETUP, hitRateLimit, resetRateLimit, userPrompt, validateAgentRequest } from "./ai-prompts.ts";
import { planBrief } from "./brief.ts";

const done = (data: Record<string, unknown>): AgentResult => ({ status: "done", data });

test("parseJson tolerates code fences and chatter", () => {
  assert.deepEqual(parseJson('```json\n{"a":1}\n```'), { a: 1 });
  assert.deepEqual(parseJson('Tentu! {"a":"b"} semoga membantu'), { a: "b" });
  assert.equal(parseJson("bukan json"), null);
  assert.equal(parseJson("[1,2]"), null);
  assert.equal(parseJson('{"rusak":'), null);
});

test("summaryOf prefers ringkas and falls back gracefully", () => {
  assert.equal(summaryOf("sari", done({ ringkas: "Cerita siap.", judul: "X" })), "Cerita siap.");
  assert.equal(summaryOf("sari", done({ judul: "Warung Kopi" })), "Warung Kopi");
  assert.equal(summaryOf("nia", { status: "done", raw: "teks bebas" }), "teks bebas");
  assert.match(summaryOf("nia", { status: "done" }), /Nia/);
});

test("toText and buildContext carry earlier work forward", () => {
  const raka = done({ audiens: "Pecinta kopi", angle: "Ritual pagi", hashtag: ["kopi", "#pagi"] });
  const text = toText("raka", raka);
  assert.match(text, /Audiens: Pecinta kopi/);
  assert.match(text, /#kopi #pagi/);
  const ctx = buildContext({ raka, sari: { status: "error", error: "x" } });
  assert.match(ctx, /Raka \(Ide & Riset\)/);
  assert.doesNotMatch(ctx, /Sari/);
  assert.ok(buildContext({ raka }, 20).length < 80);
});

test("toMarkdown exports finished agents only", () => {
  const md = toMarkdown("Brief X", { sari: done({ judul: "Judul A", cerita: "Isi" }), nia: { status: "working" } });
  assert.match(md, /\*\*Brief:\*\* Brief X/);
  assert.match(md, /\*\*Judul:\*\* Judul A/);
  assert.doesNotMatch(md, /Nia/);
});

test("imageUrl encodes the prompt and pins size and seed", () => {
  const url = imageUrl("a cup & saucer", 7);
  assert.ok(url.startsWith("https://image.pollinations.ai/prompt/a%20cup%20%26%20saucer?"));
  assert.match(url, /seed=7/);
  assert.match(url, /width=768/);
});

test("validateAgentRequest rejects bad input and clips long fields", () => {
  assert.equal(validateAgentRequest(null).ok, false);
  assert.equal(validateAgentRequest({ agent: "x", brief: "a" }).ok, false);
  assert.equal(validateAgentRequest({ agent: "sari", brief: "   " }).ok, false);
  const ok = validateAgentRequest({ agent: "sari", brief: "a".repeat(900), context: "c".repeat(9000) });
  assert.ok(ok.ok);
  if (ok.ok) {
    assert.equal(ok.value.brief.length, 400);
    assert.equal(ok.value.context.length, 3600);
  }
});

test("every agent prompt demands JSON with a ringkas field", () => {
  for (const [id, setup] of Object.entries(AGENT_SETUP)) {
    assert.match(setup.system, /JSON/, id);
    assert.match(setup.system, /ringkas/, id);
    assert.ok(setup.maxTokens >= 600, id);
  }
  assert.match(userPrompt({ agent: "sari", brief: "kopi", context: "" }), /Brief dari klien:\nkopi/);
  assert.match(userPrompt({ agent: "sari", brief: "kopi", context: "ide" }), /rekan tim/);
});

test("rate limiter blocks after the limit and recovers", () => {
  resetRateLimit();
  for (let i = 0; i < 3; i += 1) assert.equal(hitRateLimit("ip", 1000 + i, 3, 60_000), false);
  assert.equal(hitRateLimit("ip", 1010, 3, 60_000), true);
  assert.equal(hitRateLimit("ip", 70_000, 3, 60_000), false);
});

function fakeFetch(replies: { status: number; body: unknown }[]): typeof fetch {
  let n = 0;
  return (async () => {
    const r = replies[Math.min(n, replies.length - 1)]!;
    n += 1;
    return new Response(JSON.stringify(r.body), { status: r.status });
  }) as typeof fetch;
}

test("callAgent surfaces server errors with their code", async () => {
  await assert.rejects(
    callAgent("sari", "b", "", undefined, fakeFetch([{ status: 503, body: { error: "no_key", message: "Kunci belum ada" } }])),
    (e: unknown) => e instanceof AiError && e.code === "no_key" && /Kunci/.test(e.message),
  );
});

test("runPipeline runs agents in order, hands context on, and stops on no_key", async () => {
  const plan = planBrief("Cerita pendek tentang kopi");
  const calls: string[] = [];
  const events: string[] = [];
  const fetcher = (async (_url: string, init: { body: string }) => {
    const { agent, context } = JSON.parse(init.body) as { agent: string; context: string };
    calls.push(`${agent}:${context.length > 0}`);
    return new Response(JSON.stringify({ text: JSON.stringify({ ringkas: `${agent} oke`, judul: "J" }) }), { status: 200 });
  }) as unknown as typeof fetch;
  await runPipeline(
    plan,
    "Cerita pendek tentang kopi",
    {
      onStart: (id) => events.push(`start:${id}`),
      onWait: () => {},
      onDone: (id, res, next) => events.push(`done:${id}>${next ?? "-"}:${res.data?.ringkas}`),
      onError: (id) => events.push(`err:${id}`),
      onFinish: () => events.push("finish"),
    },
    fetcher,
  );
  assert.deepEqual(calls, ["sari:false", "hermes:true"]);
  assert.deepEqual(events, ["start:sari", "done:sari>hermes:sari oke", "start:hermes", "done:hermes>-:hermes oke", "finish"]);

  const stopped: string[] = [];
  await runPipeline(
    planBrief("Foto dan video untuk peluncuran sepatu"),
    "x",
    {
      onStart: () => {},
      onWait: () => {},
      onDone: () => {},
      onError: (id) => stopped.push(id),
      onFinish: () => stopped.push("finish"),
    },
    fakeFetch([{ status: 503, body: { error: "no_key", message: "m" } }]),
  );
  assert.equal(stopped.length, 2);
  assert.equal(stopped[1], "finish");
});
