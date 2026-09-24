"use client";
import { use, useEffect, useMemo, useState } from "react";
import Shell from "@/components/Shell";
import MetricsPanel from "@/components/MetricsPanel";
import { Badge, Card, SectionTitle, Spinner } from "@/components/ui";
import { api } from "@/lib/api";
import type { EvalRun, V2GraphData } from "@/lib/types";

type Ci = { value?: number | null; lo?: number | null; hi?: number | null; n?: number };

function fmt(n: number | null | undefined, digits = 3): string {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toFixed(digits);
}

function fmtCi(ci: Ci | null | undefined): string {
  if (!ci || ci.value == null) return "—";
  if (ci.lo == null || ci.hi == null) return fmt(ci.value);
  return `${fmt(ci.value)} [${fmt(ci.lo)}, ${fmt(ci.hi)}]`;
}

function asRecord(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}

function pickRepeat(summary: Record<string, unknown> | null): Record<string, unknown> {
  if (!summary) return {};
  const repeats = asRecord(summary.repeats);
  if ("0" in repeats) return asRecord(repeats["0"]);
  const keys = Object.keys(repeats);
  if (keys.length) return asRecord(repeats[keys[0]]);
  return summary;
}

export default function MetricsPage({ params }: { params: Promise<{ docId: string }> }) {
  const { docId } = use(params);
  const [legacy, setLegacy] = useState<Record<string, unknown> | null>(null);
  const [runs, setRuns] = useState<EvalRun[] | null>(null);
  const [selected, setSelected] = useState<string>("");
  const [v2, setV2] = useState<V2GraphData | null>(null);
  const [v2Err, setV2Err] = useState("");

  useEffect(() => {
    api.metrics(docId).then(setLegacy).catch(() => setLegacy({}));
    api.evalRuns(docId).then((r) => {
      setRuns(r);
      if (r.length) setSelected(r[0].run_id);
    }).catch(() => setRuns([]));
    api.v2Graph(docId).then(setV2).catch((e: unknown) => {
      setV2(null);
      setV2Err(e instanceof Error ? e.message : String(e));
    });
  }, [docId]);

  const active = useMemo(
    () => (runs ?? []).find((r) => r.run_id === selected) ?? null,
    [runs, selected],
  );
  const report = pickRepeat(active?.summary ?? null);
  const retrieval = asRecord(report.retrieval);
  const ordering = asRecord(report.ordering);
  const consistency = asRecord(report.consistency);
  const cost = asRecord(report.cost);
  const buildEvents = asRecord(legacy?.build_events);

  const recallCurve = useMemo(() => {
    const ks = [1, 3, 5, 8, 10, 20];
    return ks.map((k) => {
      const ci = retrieval[`recall@${k}`] as Ci | undefined;
      return { k, value: ci?.value ?? null, lo: ci?.lo ?? null, hi: ci?.hi ?? null };
    }).filter((r) => r.value != null);
  }, [retrieval]);

  const stratumBars = useMemo(() => {
    return (["aligned", "inverted", "unordered", "overall"] as const).map((s) => {
      const row = asRecord(ordering[s]);
      const acc = typeof row.accuracy === "number" ? row.accuracy : null;
      const ci = row.accuracy_ci as Ci | undefined;
      return { stratum: s, accuracy: acc ?? ci?.value ?? null, ci };
    }).filter((r) => r.accuracy != null);
  }, [ordering]);

  const maxRecall = Math.max(0.01, ...recallCurve.map((r) => r.value ?? 0));
  const removed = v2?.removed ?? [];

  return (
    <Shell docId={docId}>
      <SectionTitle
        eyebrow="evaluation"
        title="Pipeline metrics"
        sub="Eval-run reports (CIs, recall@k, stratum accuracy, consistency, cost), build health, and v2 removed contradictions. Numbers come from eval_runner summaries."
      />

      {/* Eval runs */}
      <Card className="mb-8 p-5">
        <h3 className="mb-3 font-display text-lg">Eval runs</h3>
        {runs === null ? (
          <Spinner />
        ) : runs.length === 0 ? (
          <p className="text-sm text-[var(--color-ink-soft)]">No eval runs stored for this document yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-wider text-[var(--color-ink-soft)]">
                  <th className="py-2 pr-3 font-medium">Run</th>
                  <th className="py-2 pr-3 font-medium">Pipeline</th>
                  <th className="py-2 pr-3 font-medium">Gold</th>
                  <th className="py-2 pr-3 font-medium">Status</th>
                  <th className="py-2 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((r) => (
                  <tr
                    key={r.run_id}
                    onClick={() => setSelected(r.run_id)}
                    className={`cursor-pointer border-b border-[var(--color-line)] last:border-0 ${
                      selected === r.run_id ? "bg-[var(--color-accent-soft)]" : "hover:bg-[var(--color-paper)]"
                    }`}
                  >
                    <td className="py-2 pr-3 font-mono text-xs">{r.run_id}</td>
                    <td className="py-2 pr-3">
                      <Badge tone={r.pipeline.includes("v2") ? "major" : r.pipeline.includes("naive") ? "neutral" : "accent"}>
                        {r.pipeline}
                      </Badge>
                    </td>
                    <td className="py-2 pr-3 font-mono text-xs">{r.gold_set_id ?? "—"}</td>
                    <td className="py-2 pr-3">{r.status}</td>
                    <td className="py-2 text-xs text-[var(--color-ink-soft)]">
                      {r.created_at ? new Date(r.created_at).toLocaleString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {active?.summary && (
        <div className="mb-8 space-y-6">
          <h3 className="font-display text-lg">
            Report · {active.pipeline}
            <span className="ml-2 font-mono text-xs text-[var(--color-ink-soft)]">{active.run_id}</span>
          </h3>

          {/* Ordering / stratum */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-5">
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-[var(--color-ink-soft)]">
                Stratum accuracy (95% CI)
              </h4>
              {stratumBars.length === 0 ? (
                <p className="text-sm text-[var(--color-ink-soft)]">No ordering metrics in this run.</p>
              ) : (
                <ul className="space-y-3">
                  {stratumBars.map((row) => (
                    <li key={row.stratum}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span>{row.stratum}</span>
                        <span className="font-mono">{fmtCi(row.ci ?? { value: row.accuracy })}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[var(--color-paper)]">
                        <div
                          className="h-full rounded-full bg-[var(--color-accent)]"
                          style={{ width: `${Math.max(0, Math.min(100, (row.accuracy ?? 0) * 100))}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card className="p-5">
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-[var(--color-ink-soft)]">
                Recall@k
              </h4>
              {recallCurve.length === 0 ? (
                <p className="text-sm text-[var(--color-ink-soft)]">No recall curve in this run.</p>
              ) : (
                <ul className="space-y-3">
                  {recallCurve.map((row) => (
                    <li key={row.k}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span>recall@{row.k}</span>
                        <span className="font-mono">
                          {fmt(row.value)}{row.lo != null ? ` [${fmt(row.lo)}, ${fmt(row.hi)}]` : ""}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[var(--color-paper)]">
                        <div
                          className="h-full rounded-full bg-[var(--color-ink)]"
                          style={{ width: `${((row.value ?? 0) / maxRecall) * 100}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>

          {/* Consistency + cost */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-5">
              <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-ink-soft)]">
                Consistency
              </h4>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-[var(--color-ink-soft)]">Symmetry</dt>
                  <dd className="font-mono">{fmt(consistency.symmetry as number | null)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-ink-soft)]">Transitivity (all)</dt>
                  <dd className="font-mono">
                    {fmt(
                      (asRecord(consistency.transitivity).consistency_all as number | null) ?? null,
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-ink-soft)]">Transitivity (committed)</dt>
                  <dd className="font-mono">
                    {fmt(
                      (asRecord(consistency.transitivity).consistency_committed as number | null) ?? null,
                    )}
                  </dd>
                </div>
              </dl>
            </Card>

            <Card className="p-5">
              <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-ink-soft)]">
                Cost
              </h4>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-[var(--color-ink-soft)]">Latency p50</dt>
                  <dd className="font-mono">{fmt(cost.latency_p50_ms as number | null, 0)} ms</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-ink-soft)]">Latency p95</dt>
                  <dd className="font-mono">{fmt(cost.latency_p95_ms as number | null, 0)} ms</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-ink-soft)]">Prompt tokens (mean)</dt>
                  <dd className="font-mono">{fmt(cost.prompt_tokens_mean as number | null, 0)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-ink-soft)]">Completion tokens (mean)</dt>
                  <dd className="font-mono">{fmt(cost.completion_tokens_mean as number | null, 0)}</dd>
                </div>
              </dl>
            </Card>
          </div>

          {/* Headline retrieval table */}
          <Card className="overflow-x-auto p-5">
            <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--color-ink-soft)]">
              Retrieval summary (mean [95% CI])
            </h4>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] text-xs text-[var(--color-ink-soft)]">
                  {["recall@1", "recall@5", "recall@10", "recall@20", "precision@5", "mrr", "ndcg@10", "pair_recall@5"].map((k) => (
                    <th key={k} className="py-2 pr-3 font-medium">{k}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {["recall@1", "recall@5", "recall@10", "recall@20", "precision@5", "mrr", "ndcg@10", "pair_recall@5"].map((k) => (
                    <td key={k} className="py-2 pr-3 font-mono text-xs">
                      {fmtCi(retrieval[k] as Ci | undefined)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {/* Build health */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-3 font-display text-lg">Build events</h3>
          {Object.keys(buildEvents).length === 0 ? (
            <p className="text-sm text-[var(--color-ink-soft)]">No build_events recorded.</p>
          ) : (
            <ul className="space-y-2">
              {Object.entries(buildEvents)
                .sort((a, b) => Number(b[1]) - Number(a[1]))
                .map(([kind, n]) => (
                  <li key={kind} className="flex justify-between text-sm">
                    <span className="font-mono text-xs">{kind}</span>
                    <span className="font-mono">{String(n)}</span>
                  </li>
                ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <h3 className="mb-3 font-display text-lg">v2 removed contradictions</h3>
          {v2Err && !v2 && (
            <p className="text-sm text-[var(--color-ink-soft)]">No v2 graph ({v2Err.slice(0, 80)}).</p>
          )}
          {v2 && (
            <>
              <p className="mb-3 text-xs text-[var(--color-ink-soft)]">
                {removed.length} removed
                {v2.stats && typeof v2.stats.removed_weight === "number"
                  ? ` · weight ${fmt(v2.stats.removed_weight as number)}`
                  : ""}
              </p>
              {removed.length === 0 ? (
                <p className="text-sm text-[var(--color-ink-soft)]">No contradictions removed.</p>
              ) : (
                <ul className="max-h-64 space-y-2 overflow-y-auto">
                  {removed.slice(0, 40).map((row, i) => {
                    const rem = row.removed ?? {};
                    return (
                      <li key={i} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2 text-xs">
                        <span className="font-mono">
                          {rem.u} → {rem.v}
                        </span>
                        <span className="ml-2 text-[var(--color-ink-soft)]">
                          p={fmt(rem.p)} · {(rem.sources ?? []).join(", ")}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </Card>
      </div>

      {/* Legacy structural metrics */}
      <div className="mb-4">
        <h3 className="mb-3 font-display text-lg">Structural (v1 extraction)</h3>
        {legacy === null ? <Spinner /> : <MetricsPanel data={legacy} />}
      </div>
    </Shell>
  );
}
