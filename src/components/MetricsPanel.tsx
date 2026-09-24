"use client";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Card } from "./ui";

type Metrics = Record<string, unknown>;

export default function MetricsPanel({ data }: { data: Metrics }) {
  const stageDist = (data.stage_distribution ?? {}) as Record<string, number>;
  const stageData = Object.entries(stageDist).map(([name, count]) => ({
    name: name.length > 22 ? name.slice(0, 20) + "…" : name,
    count,
  }));

  const avgNaive = Number(data.avg_naive_tokens ?? 0);
  const avgKaal = Number(data.avg_kaalkram_tokens ?? 0);
  const queryRuns = Number(data.query_runs ?? 0);

  const tokenData = [
    { name: "Naive RAG", tokens: avgNaive },
    { name: "Kaalkram", tokens: avgKaal },
  ];

  const tiles = [
    { label: "Events extracted", value: Number(data.events_total ?? 0) },
    {
      label: "Duplicate rate",
      value: `${(Number(data.duplicate_rate ?? 0) * 100).toFixed(1)}%`,
    },
    {
      label: "Page traceability",
      value: `${(Number(data.page_traceability ?? 0) * 100).toFixed(1)}%`,
    },
    {
      label: "Avg tokens / query",
      value: Math.round((avgNaive + avgKaal) / (queryRuns ? 2 : 1) || 0),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <Card key={t.label} className="p-5">
            <p className="text-xs uppercase tracking-wider text-[var(--color-ink-soft)]">{t.label}</p>
            <p className="mt-2 font-display text-3xl text-[var(--color-ink)]">{t.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 font-display text-lg">Events by story stage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6E2DA" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#B5582D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 font-display text-lg">Avg tokens per pipeline</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tokenData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6E2DA" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="tokens" fill="#0E1A33" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-5 text-sm text-[var(--color-ink-soft)]">
        <p>
          Structural stats from extraction. Ordering accuracy, recall@k, and consistency
          are shown above from <span className="font-mono">eval-runs</span> summaries
          (never typed by hand).
        </p>
      </Card>
    </div>
  );
}
