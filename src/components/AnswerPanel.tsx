"use client";
import { useState } from "react";
import { Check, ChevronDown, Coins, FileText, X } from "lucide-react";
import clsx from "clsx";
import type { PipelineAnswer } from "@/lib/types";
import { Badge, Card } from "./ui";
import { decideOrder, type OrderDecision } from "@/lib/order";

export default function AnswerPanel({
  data, title, subtitle, tone, gold, factMatch = null, showDecision = false, checked = false,
}: {
  data: PipelineAnswer;
  title: string;
  subtitle: string;
  tone: "muted" | "primary";
  gold?: OrderDecision | "fact" | null;
  factMatch?: string | null;
  /** Only for before/after ordering questions */
  showDecision?: boolean;
  /** Only color / grade after the user checks against the book */
  checked?: boolean;
}) {
  const [openEvidence, setOpenEvidence] = useState(false);
  const [openTrace, setOpenTrace] = useState(false);
  const tokens = data.prompt_tokens + data.completion_tokens;
  const displayAnswer = formatAnswer(data.answer);
  const decision = decideOrder(displayAnswer);

  const matchesGold = (() => {
    if (!checked || !gold) return null;
    if (gold === "fact") {
      const re = new RegExp(factMatch || String.raw`\b84\b|eighty[-\s]?four`, "i");
      return re.test(data.answer);
    }
    if ((gold === "before" || gold === "after") &&
        (decision === "before" || decision === "after")) {
      return decision === gold;
    }
    return null;
  })();

  return (
    <Card className={clsx(
      "flex flex-col overflow-hidden transition-colors",
      checked && matchesGold === true && "border-[#B7CFB9] bg-[#F6FAF6] ring-1 ring-[#B7CFB9]",
      checked && matchesGold === false && "border-[#E5C4B8] bg-[#FBF6F4] ring-1 ring-[#E5C4B8]",
      !checked && tone === "primary" && "ring-1 ring-[var(--color-accent)]",
    )}>
      <div className={clsx(
        "border-b border-[var(--color-line)] px-5 py-4",
        checked && matchesGold === true && "bg-[#EEF5EE]",
        checked && matchesGold === false && "bg-[#F7EEEA]",
        !checked && (tone === "primary" ? "bg-[var(--color-accent-soft)]" : "bg-[var(--color-paper)]"),
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
            <Badge tone={tone === "primary" ? "accent" : "neutral"}>
              {tone === "primary" ? "ours" : "baseline"}
            </Badge>
          </div>
        </div>
        <p className="mt-0.5 text-xs text-[var(--color-ink-soft)]">{subtitle}</p>
      </div>

      {showDecision && (decision === "before" || decision === "after") && (
        <div className="flex items-center gap-3 border-b border-[var(--color-line)] px-5 py-3">
          <span className="text-xs text-[var(--color-ink-soft)]">Decision</span>
          <span className={clsx(
            "rounded-md border px-2.5 py-1 text-sm font-medium tracking-wide",
            decision === "before"
              ? "border-[#C9D5EA] bg-[#E8EDF7] text-[var(--color-ink)]"
              : "border-[#E4CDBE] bg-[var(--color-accent-soft)] text-[var(--color-accent)]",
          )}>
            {decision === "before" ? "Before" : "After"}
          </span>
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

      <Disclosure label={`Retrieved evidence (${data.retrieved.length})`}
                  open={openEvidence} setOpen={setOpenEvidence}>
        <ol className="space-y-2">
          {data.retrieved.map((r, i) => (
            <li key={i} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] p-3">
              <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-[var(--color-ink-soft)]">#{String(r.rank)}</span>
                {r.name != null && <span className="font-medium">{String(r.name)}</span>}
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
          {data.trace.map((t, i) => (
            <li key={i} className="flex gap-2 text-xs text-[var(--color-ink-soft)]">
              <span className="font-mono text-[var(--color-accent)]">{i + 1}.</span>{t}
            </li>
          ))}
        </ol>
      </Disclosure>
    </Card>
  );
}

/** Strip markdown noise (e.g. **AFTER.**) and drop a trailing lone BEFORE/AFTER line — shown in the chip instead. */
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
