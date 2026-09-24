"use client";
import { useState } from "react";
import { Check, ChevronDown, Coins, FileText, X } from "lucide-react";
import clsx from "clsx";
import type { ChainStep, PipelineAnswer, RelationLabel } from "@/lib/types";
import { Badge, Card } from "./ui";

const CANNOT_DETAILS = [
  "unordered", "during", "overlap", "ambiguous", "not_found",
  "contains", "simultaneous", "unknown_event",
] as const;

export function parseDetail(data: PipelineAnswer): string | null {
  for (const line of data.trace ?? []) {
    const m = /^detail=(.+)$/i.exec(line.trim());
    if (m) return m[1].trim();
  }
  const fromAnswer = /\(([^)]+)\)\s*$/.exec(data.answer.trim());
  if (fromAnswer) {
    const d = fromAnswer[1].trim().toLowerCase();
    if ((CANNOT_DETAILS as readonly string[]).includes(d)) return d;
  }
  for (const d of CANNOT_DETAILS) {
    if (new RegExp(`\\b${d}\\b`, "i").test(data.answer)) return d;
  }
  return null;
}

export function parseChain(data: PipelineAnswer): ChainStep[] {
  for (const line of data.trace ?? []) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("chain=")) continue;
    try {
      const parsed = JSON.parse(trimmed.slice("chain=".length)) as unknown;
      if (Array.isArray(parsed)) return parsed as ChainStep[];
    } catch {
      /* ignore malformed */
    }
  }
  return [];
}

function relationOf(data: PipelineAnswer): RelationLabel | null {
  return data.relation ?? null;
}

export default function AnswerPanel({
  data, title, subtitle, tone, gold = null, showDecision = false, checked = false,
  showEvidenceChain = false,
}: {
  data: PipelineAnswer;
  title: string;
  subtitle: string;
  tone: "muted" | "primary" | "v2";
  gold?: string | null;
  /** Only for before/after ordering questions */
  showDecision?: boolean;
  /** Only color / grade after the user checks against gold */
  checked?: boolean;
  /** v2: show structured evidence chain from trace */
  showEvidenceChain?: boolean;
}) {
  const [openEvidence, setOpenEvidence] = useState(false);
  const [openChain, setOpenChain] = useState(true);
  const [openTrace, setOpenTrace] = useState(false);
  const tokens = data.prompt_tokens + data.completion_tokens;
  const displayAnswer = formatAnswer(data.answer);
  const decision = relationOf(data);
  const detail = parseDetail(data);
  const chain = showEvidenceChain ? parseChain(data) : [];
  const unsettled = decision === "cannot_determine";

  const matchesGold = (() => {
    if (!checked || !gold || !decision) return null;
    return decision === gold;
  })();

  return (
    <Card className={clsx(
      "flex flex-col overflow-hidden transition-colors",
      checked && matchesGold === true && "border-[#B7CFB9] bg-[#F6FAF6] ring-1 ring-[#B7CFB9]",
      checked && matchesGold === false && "border-[#E5C4B8] bg-[#FBF6F4] ring-1 ring-[#E5C4B8]",
      !checked && tone === "primary" && "ring-1 ring-[var(--color-accent)]",
      !checked && tone === "v2" && "ring-1 ring-[#3D6B45]",
    )}>
      <div className={clsx(
        "border-b border-[var(--color-line)] px-5 py-4",
        checked && matchesGold === true && "bg-[#EEF5EE]",
        checked && matchesGold === false && "bg-[#F7EEEA]",
        !checked && tone === "primary" && "bg-[var(--color-accent-soft)]",
        !checked && tone === "v2" && "bg-[#EEF5EE]",
        !checked && tone === "muted" && "bg-[var(--color-paper)]",
      )}>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg">{title}</h3>
          <div className="flex items-center gap-2">
            {checked && matchesGold === true && (
              <span className="inline-flex items-center gap-1 text-xs text-[#3D6B45]">
                <Check className="h-3.5 w-3.5" /> correct
              </span>
            )}
            {checked && matchesGold === false && (
              <span className="inline-flex items-center gap-1 text-xs text-[var(--color-accent)]">
                <X className="h-3.5 w-3.5" /> incorrect
              </span>
            )}
            <Badge tone={tone === "muted" ? "neutral" : tone === "v2" ? "major" : "accent"}>
              {tone === "v2" ? "v2" : tone === "primary" ? "v1" : "baseline"}
            </Badge>
          </div>
        </div>
        <p className="mt-0.5 text-xs text-[var(--color-ink-soft)]">{subtitle}</p>
      </div>

      {showDecision && decision && decision !== "not_applicable" && (
        <div className="flex flex-wrap items-center gap-3 border-b border-[var(--color-line)] px-5 py-3">
          <span className="text-xs text-[var(--color-ink-soft)]">Relation</span>
          <span className={clsx(
            "rounded-md border px-2.5 py-1 text-sm font-medium tracking-wide",
            decision === "before" && "border-[#C9D5EA] bg-[#E8EDF7] text-[var(--color-ink)]",
            decision === "after" && "border-[#E4CDBE] bg-[var(--color-accent-soft)] text-[var(--color-accent)]",
            decision === "cannot_determine" && "border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink-soft)]",
          )}>
            {labelRelation(decision)}
          </span>
          {data.confidence != null && (
            <span className="font-mono text-xs text-[var(--color-ink-soft)]">
              conf {(data.confidence * 100).toFixed(0)}%
            </span>
          )}
        </div>
      )}

      {unsettled && (
        <div className="border-b border-[var(--color-line)] bg-[var(--color-paper)] px-5 py-3">
          <p className="text-sm font-medium text-[var(--color-ink)]">
            The text does not settle this
          </p>
          {detail && (
            <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
              Detail: <span className="font-mono">{detail}</span>
            </p>
          )}
        </div>
      )}

      <div className="flex-1 px-5 py-5">
        <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-[var(--color-ink)]">
          {displayAnswer}
        </p>
      </div>

      <div className="flex items-center gap-5 border-t border-[var(--color-line)] px-5 py-2.5 text-xs text-[var(--color-ink-soft)]">
        <span className="flex items-center gap-1.5">
          <Coins className="h-3.5 w-3.5" />{tokens.toLocaleString()} tokens
        </span>
        <span className="flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5" />{data.retrieved.length} retrieved
        </span>
      </div>

      {showEvidenceChain && chain.length > 0 && (
        <Disclosure
          label={`Evidence chain (${chain.length})`}
          open={openChain}
          setOpen={setOpenChain}
        >
          <ol className="space-y-2">
            {chain.map((step, i) => (
              <li key={i} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] p-3">
                <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono text-[var(--color-ink-soft)]">#{i + 1}</span>
                  <Badge tone="major">{step.strict === false ? "non-strict" : "before"}</Badge>
                  {(step.sources ?? []).map((s) => (
                    <Badge key={s} tone="neutral">{s}</Badge>
                  ))}
                  {step.p != null && (
                    <span className="font-mono text-[var(--color-ink-soft)]">
                      w {Number(step.p).toFixed(2)}
                    </span>
                  )}
                  <span className="ml-auto font-mono text-[var(--color-accent)]">
                    {step.from} → {step.to}
                  </span>
                </div>
                {(step.evidence ?? []).map((ev, j) => (
                  <div key={j} className="mt-1.5">
                    {ev.pages && ev.pages.length > 0 && (
                      <span className="font-mono text-[10px] text-[var(--color-accent)]">
                        p. {ev.pages.join(", ")}
                      </span>
                    )}
                    {ev.quote && (
                      <p className="text-xs leading-relaxed text-[var(--color-ink-soft)]">
                        “{ev.quote}”
                      </p>
                    )}
                    {!ev.quote && ev.note && (
                      <p className="text-xs text-[var(--color-ink-soft)]">{ev.note}</p>
                    )}
                  </div>
                ))}
              </li>
            ))}
          </ol>
        </Disclosure>
      )}

      <Disclosure label={`Retrieved evidence (${data.retrieved.length})`}
                  open={openEvidence} setOpen={setOpenEvidence}>
        <ol className="space-y-2">
          {data.retrieved.map((r, i) => (
            <li key={i} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] p-3">
              <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-[var(--color-ink-soft)]">#{String(r.rank ?? i + 1)}</span>
                {r.name != null && <span className="font-medium">{String(r.name)}</span>}
                {r.unit_id != null && (
                  <span className="font-mono text-[var(--color-ink-soft)]">{String(r.unit_id)}</span>
                )}
                {r.score !== undefined && (
                  <span className="font-mono text-[var(--color-ink-soft)]">sim {String(r.score)}</span>
                )}
                {r.stage != null && <Badge tone="neutral">{String(r.stage)}</Badge>}
                {r.category != null && (
                  <Badge tone={r.category === "major" ? "major" : "minor"}>{String(r.category)}</Badge>
                )}
                <span className="ml-auto font-mono text-[var(--color-accent)]">
                  {Array.isArray(r.pages) ? `p. ${(r.pages as unknown[]).join(", ")}` : ""}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[var(--color-ink-soft)]">{String(r.preview ?? "")}</p>
            </li>
          ))}
        </ol>
      </Disclosure>

      <Disclosure label="How this answer was produced" open={openTrace} setOpen={setOpenTrace}>
        <ol className="space-y-1.5">
          {data.trace
            .filter((t) => !t.startsWith("chain=") && !t.startsWith("detail="))
            .map((t, i) => (
              <li key={i} className="flex gap-2 text-xs text-[var(--color-ink-soft)]">
                <span className="font-mono text-[var(--color-accent)]">{i + 1}.</span>{t}
              </li>
            ))}
        </ol>
      </Disclosure>
    </Card>
  );
}

function labelRelation(r: string): string {
  if (r === "before") return "Before";
  if (r === "after") return "After";
  if (r === "cannot_determine") return "Cannot determine";
  return r;
}

/** Strip markdown noise from free-form answers. */
function formatAnswer(raw: string): string {
  let t = raw
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");
  t = t.replace(/\n*\s*\*{0,2}(before|after)\*{0,2}\.?\s*$/i, "").trim();
  return t;
}

function Disclosure({ label, open, setOpen, children }: {
  label: string; open: boolean; setOpen: (v: boolean) => void; children: React.ReactNode;
}) {
  return (
    <div className="border-t border-[var(--color-line)]">
      <button onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-2.5 text-xs font-medium text-[var(--color-ink-soft)] hover:bg-[var(--color-paper)]">
        {label}
        <ChevronDown className={clsx("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
}
