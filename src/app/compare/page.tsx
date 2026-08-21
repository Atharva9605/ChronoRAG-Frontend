"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Shell from "@/components/Shell";
import AnswerPanel from "@/components/AnswerPanel";
import { Button, Card, SectionTitle, Spinner } from "@/components/ui";
import { api } from "@/lib/api";
import type { CompareResult, Doc } from "@/lib/types";

const PRESETS = [
  "Does Manolin leave Santiago's boat before or after Santiago hooks the great fish and it tows the skiff?",
  "Does Manolin help Santiago with gear on shore before or after Santiago is alone far out with the fish towing his skiff?",
  "Does Santiago's unlucky streak and Manolin leaving happen before or after the fish begins circling the skiff?",
  "In story time, which comes first: Manolin offering sardines on shore, or the old man dreaming of lions after he returns?",
];

export default function ComparePage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [docId, setDocId] = useState("");
  const [question, setQuestion] = useState(PRESETS[0]);
  const [result, setResult] = useState<CompareResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.listDocs().then((d) => {
      setDocs(d);
      const ready = d.find((x) => x.naive_ready && x.kaalkram_ready);
      if (ready) setDocId(ready.id);
    });
  }, []);

  const run = async () => {
    if (!docId || !question.trim()) return;
    setLoading(true); setErr(""); setResult(null);
    try {
      setResult(await api.compare(docId, question.trim()));
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Shell docId={docId || undefined}>
      <SectionTitle
        eyebrow="side by side"
        title="Same book, same question, two architectures"
        sub="Ask a before/after question. Naive RAG retrieves by similarity (shuffled order). Kaalkram retrieves ordered events."
      />

      <Card className="mb-8 p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <select value={docId} onChange={(e) => setDocId(e.target.value)}
            className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm md:w-64">
            <option value="">Select a book…</option>
            {docs.map((d) => (
              <option key={d.id} value={d.id} disabled={!(d.naive_ready && d.kaalkram_ready)}>
                {d.title}{d.naive_ready && d.kaalkram_ready ? "" : "  (not built)"}
              </option>
            ))}
          </select>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-soft)]" />
            <input value={question} onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="Ask something that depends on order…"
              className="w-full rounded-lg border border-[var(--color-line)] bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[var(--color-accent)]" />
          </div>

          <Button onClick={run} disabled={loading || !docId}>
            {loading ? <><Spinner /> Running both…</> : "Run comparison"}
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p} onClick={() => setQuestion(p)}
              className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-ink-soft)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
              {p.length > 52 ? p.slice(0, 52) + "…" : p}
            </button>
          ))}
        </div>
      </Card>

      {err && (
        <Card className="mb-6 p-4 text-sm text-[var(--color-accent)]">{err}</Card>
      )}

      {loading && (
        <div className="grid gap-6 lg:grid-cols-2">
          {[0, 1].map((i) => (
            <Card key={i} className="relative h-72 overflow-hidden shimmer bg-[var(--color-paper)]" />
          ))}
        </div>
      )}

      {result && (
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <AnswerPanel data={result.naive} tone="muted"
            title="Naive RAG"
            subtitle="Fixed chunks → embeddings → top-k similarity → stuffed prompt" />
          <AnswerPanel data={result.kaalkram} tone="primary"
            title="Kaalkram"
            subtitle="Extracted events → deduplicated → temporal DAG → ordered retrieval" />
        </div>
      )}
    </Shell>
  );
}
