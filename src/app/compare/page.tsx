"use client";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, ChevronDown, Search } from "lucide-react";
import Shell from "@/components/Shell";
import AnswerPanel from "@/components/AnswerPanel";
import { Button, Card, SectionTitle, Spinner } from "@/components/ui";
import { api } from "@/lib/api";
import type { Doc, GoldQuestion, PipelineAnswer } from "@/lib/types";

export default function ComparePage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [docId, setDocId] = useState("");
  const [question, setQuestion] = useState("");
  const [goldQs, setGoldQs] = useState<GoldQuestion[]>([]);
  const [goldSetId, setGoldSetId] = useState<string | null>(null);
  const [goldLoading, setGoldLoading] = useState(false);

  const [v1, setV1] = useState<PipelineAnswer | null>(null);
  const [v2, setV2] = useState<PipelineAnswer | null>(null);
  const [naive, setNaive] = useState<PipelineAnswer | null>(null);
  const [loadingV1, setLoadingV1] = useState(false);
  const [loadingV2, setLoadingV2] = useState(false);
  const [loadingNaive, setLoadingNaive] = useState(false);
  const [errV1, setErrV1] = useState("");
  const [errV2, setErrV2] = useState("");
  const [errNaive, setErrNaive] = useState("");
  const [checked, setChecked] = useState(false);
  const [bookOpen, setBookOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  const activePreset = useMemo(
    () => goldQs.find((p) => p.question === question.trim()) ?? null,
    [goldQs, question],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    api.listDocs().then((d) => {
      setDocs(d);
      const ready = d.find((x) => x.naive_ready && x.kaalkram_ready);
      if (ready) setDocId(ready.id);
    });
  }, []);

  useEffect(() => {
    if (!docId) {
      setGoldQs([]);
      setGoldSetId(null);
      return;
    }
    setGoldLoading(true);
    api.gold(docId)
      .then((g) => {
        setGoldQs(g.questions ?? []);
        setGoldSetId(g.gold_set_id);
        if (g.questions?.length && !question) {
          setQuestion(g.questions[0].question);
        }
      })
      .catch(() => {
        setGoldQs([]);
        setGoldSetId(null);
      })
      .finally(() => setGoldLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only reload gold when doc changes
  }, [docId]);

  const running = loadingV1 || loadingV2 || loadingNaive;
  const hasResults = !!(v1 || v2 || naive || errV1 || errV2 || errNaive);
  const bothSettled = !running && hasResults;
  const canCheck = bothSettled && !!activePreset?.gold_label;

  const goldForPanels = checked && activePreset?.gold_label
    ? activePreset.gold_label
    : null;
  const showDecision =
    activePreset
      ? ["before", "after", "cannot_determine"].includes(activePreset.gold_label ?? "")
      : /before\s+or\s+after|which comes first|cannot.?determine/i.test(question);

  const selectPreset = (q: string) => {
    setQuestion(q);
    setChecked(false);
    setBookOpen(true);
    setV1(null);
    setV2(null);
    setNaive(null);
    setErrV1("");
    setErrV2("");
    setErrNaive("");
  };

  const run = () => {
    if (!docId || !question.trim()) return;
    const q = question.trim();
    const withMinDelay = async <T,>(p: Promise<T>, t0: number): Promise<T> => {
      const value = await p;
      const left = 3000 - (Date.now() - t0);
      if (left > 0) await new Promise((r) => setTimeout(r, left));
      return value;
    };

    setChecked(false);
    setBookOpen(true);
    setV1(null);
    setV2(null);
    setNaive(null);
    setErrV1("");
    setErrV2("");
    setErrNaive("");
    setLoadingV1(true);
    setLoadingV2(true);
    setLoadingNaive(true);

    const t1 = Date.now();
    void withMinDelay(api.ask(docId, "kaalkram", q), t1)
      .then(setV1)
      .catch((e: unknown) => setErrV1(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoadingV1(false));

    const t2 = Date.now();
    void withMinDelay(api.ask(docId, "kaalkram_v2", q), t2)
      .then(setV2)
      .catch((e: unknown) => setErrV2(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoadingV2(false));

    const tN = Date.now();
    void withMinDelay(api.ask(docId, "naive", q), tN)
      .then(setNaive)
      .catch((e: unknown) => setErrNaive(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoadingNaive(false));
  };

  return (
    <Shell docId={docId || undefined}>
      <SectionTitle
        eyebrow="side by side"
        title="Same document, three pipelines"
        sub="Naive RAG by similarity; Kaalkram v1 ordered events; Kaalkram v2 temporal graph. Presets load from the document gold set."
      />

      <Card className="mb-6 p-5">
        <div className="flex flex-col gap-3 md:flex-row" suppressHydrationWarning>
          <select value={docId} onChange={(e) => {
            setDocId(e.target.value);
            setQuestion("");
            setChecked(false);
            setV1(null); setV2(null); setNaive(null);
          }}
            suppressHydrationWarning
            className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm md:w-64">
            <option value="">Select a document…</option>
            {docs.map((d) => (
              <option key={d.id} value={d.id} disabled={!d.naive_ready && !d.kaalkram_ready}>
                {d.title}{d.naive_ready || d.kaalkram_ready ? "" : "  (not built)"}
              </option>
            ))}
          </select>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-soft)]" />
            <input value={question} onChange={(e) => {
              setQuestion(e.target.value);
              setChecked(false);
            }}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="Ask something that depends on order…"
              suppressHydrationWarning
              className="w-full rounded-lg border border-[var(--color-line)] bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[var(--color-accent)]" />
          </div>

          <Button onClick={run} disabled={running || !docId}>
            {running ? <><Spinner /> Running…</> : "Run comparison"}
          </Button>
        </div>

        <div className="mt-3 flex min-h-8 flex-wrap gap-2" suppressHydrationWarning>
          {goldLoading && (
            <span className="text-xs text-[var(--color-ink-soft)]">Loading gold presets…</span>
          )}
          {!goldLoading && mounted && goldQs.length === 0 && docId && (
            <span className="text-xs text-[var(--color-ink-soft)]">
              No gold set for this document yet.
            </span>
          )}
          {mounted && goldQs.slice(0, 24).map((p) => (
            <button
              key={p.question_id}
              type="button"
              onClick={() => selectPreset(p.question)}
              className={chipClass(question === p.question)}
              title={p.question}
            >
              {chipLabel(p)}
            </button>
          ))}
        </div>
        {goldSetId && (
          <p className="mt-2 font-mono text-[10px] text-[var(--color-ink-soft)]">
            gold: {goldSetId} · {goldQs.length} questions
          </p>
        )}
      </Card>

      {(loadingV1 || v1 || errV1 || loadingV2 || v2 || errV2 || loadingNaive || naive || errNaive) && (
        <div className="grid items-start gap-6 lg:grid-cols-3">
          <PanelSlot
            title="Naive RAG"
            subtitle="Fixed chunks → embeddings → top-k similarity"
            tone="muted"
            loading={loadingNaive}
            data={naive}
            err={errNaive}
            gold={goldForPanels}
            showDecision={showDecision}
            checked={checked}
          />
          <PanelSlot
            title="Kaalkram v1"
            subtitle="Extracted events → temporal DAG → ordered retrieval"
            tone="primary"
            loading={loadingV1}
            data={v1}
            err={errV1}
            gold={goldForPanels}
            showDecision={showDecision}
            checked={checked}
          />
          <PanelSlot
            title="Kaalkram v2"
            subtitle="Frames → constraints → interval graph → grounded relation"
            tone="v2"
            loading={loadingV2}
            data={v2}
            err={errV2}
            gold={goldForPanels}
            showDecision={showDecision}
            checked={checked}
            showEvidenceChain
          />
        </div>
      )}

      {canCheck && !checked && (
        <div className="mt-6 flex justify-center">
          <Button variant="ghost" onClick={() => { setChecked(true); setBookOpen(true); }}>
            <BookOpen className="h-4 w-4" />
            Check against gold
          </Button>
        </div>
      )}

      {checked && activePreset?.gold_label && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setBookOpen((o) => !o)}
            className="mb-2 flex w-full items-center justify-between rounded-lg border border-[var(--color-line)] bg-white px-4 py-2.5 text-left text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-paper)]"
          >
            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Gold label
              <span className="text-[var(--color-ink)]">· {activePreset.gold_label}</span>
              {activePreset.stratum && (
                <span className="font-mono text-[10px]">[{activePreset.stratum}]</span>
              )}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${bookOpen ? "rotate-180" : ""}`} />
          </button>

          {bookOpen && (
            <Card className="px-5 py-4">
              <p className="text-sm text-[var(--color-ink)]">
                Gold: <span className="font-medium">{activePreset.gold_label}</span>
                {activePreset.qtype ? ` · ${activePreset.qtype}` : ""}
                {activePreset.stratum ? ` · stratum ${activePreset.stratum}` : ""}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                {activePreset.question}
              </p>
            </Card>
          )}
        </div>
      )}
    </Shell>
  );
}

function chipLabel(p: GoldQuestion): string {
  const short = p.question.length > 42 ? p.question.slice(0, 40) + "…" : p.question;
  const tag = p.gold_label ?? p.stratum ?? p.qtype;
  return tag ? `${tag} · ${short}` : short;
}

function chipClass(active: boolean) {
  return [
    "rounded-full border px-3 py-1 text-xs transition-colors max-w-[14rem] truncate",
    active
      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
      : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
  ].join(" ");
}

function PanelSlot({
  title, subtitle, tone, loading, data, err, gold, showDecision, checked, showEvidenceChain,
}: {
  title: string;
  subtitle: string;
  tone: "muted" | "primary" | "v2";
  loading: boolean;
  data: PipelineAnswer | null;
  err: string;
  gold: string | null;
  showDecision: boolean;
  checked: boolean;
  showEvidenceChain?: boolean;
}) {
  if (loading) {
    return (
      <Card className="relative h-72 overflow-hidden shimmer bg-[var(--color-paper)]" />
    );
  }
  if (err) {
    return (
      <Card className="p-5 text-sm text-[var(--color-accent)]">
        <h3 className="mb-2 font-display text-lg">{title}</h3>
        {err}
      </Card>
    );
  }
  if (data) {
    return (
      <AnswerPanel
        data={data}
        tone={tone}
        title={title}
        subtitle={subtitle}
        gold={gold}
        showDecision={showDecision}
        checked={checked}
        showEvidenceChain={showEvidenceChain}
      />
    );
  }
  return null;
}
