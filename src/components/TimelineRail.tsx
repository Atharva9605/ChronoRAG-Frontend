"use client";
import { useState } from "react";
import clsx from "clsx";
import type { EventRow } from "@/lib/types";
import { Badge } from "./ui";

export default function TimelineRail({ events }: { events: EventRow[] }) {
  const [filter, setFilter] = useState<"all" | "major" | "minor">("all");
  const shown = events.filter((e) => filter === "all" || e.category === filter);

  const stages = shown.reduce<Record<string, EventRow[]>>((acc, e) => {
    (acc[e.timeline_anchor] ||= []).push(e);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6 flex gap-2">
        {(["all", "major", "minor"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={clsx("rounded-full border px-3 py-1 text-xs font-medium capitalize",
              filter === f
                ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                : "border-[var(--color-line)] text-[var(--color-ink-soft)]")}>
            {f} ({f === "all" ? events.length : events.filter((e) => e.category === f).length})
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {Object.entries(stages)
          .sort((a, b) => a[1][0].stage_order - b[1][0].stage_order)
          .map(([stage, rows]) => (
            <section key={stage}>
              <div className="mb-4 flex items-center gap-3">
                <h2 className="font-display text-xl">{stage}</h2>
                <span className="text-xs text-[var(--color-ink-soft)]">{rows.length} events</span>
                <div className="h-px flex-1 bg-[var(--color-line)]" />
              </div>

              <ol className="relative space-y-4 border-l border-[var(--color-line)] pl-6">
                {rows.map((e) => (
                  <li key={e.id} className="relative">
                    <span className={clsx(
                      "absolute -left-[27px] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-[var(--color-paper)]",
                      e.category === "major" ? "bg-[var(--color-accent)]" : "bg-[var(--color-line)]")} />
                    <div className="rounded-lg border border-[var(--color-line)] bg-white p-4">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <h3 className="font-medium">{e.event_name}</h3>
                        <Badge tone={e.category === "major" ? "major" : "minor"}>{e.category}</Badge>
                        {e.merge_count > 1 && <Badge tone="accent">{e.merge_count}× merged</Badge>}
                        <span className="ml-auto font-mono text-xs text-[var(--color-accent)]">
                          p. {e.source_pages.join(", ")}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{e.core_event}</p>
                      <div className="mt-2.5 grid gap-1 text-xs text-[var(--color-ink-soft)] sm:grid-cols-2">
                        {e.antecedent_cause && (
                          <p><span className="font-medium text-[var(--color-ink)]">Caused by:</span> {e.antecedent_cause}</p>
                        )}
                        {e.consequent_effect && (
                          <p><span className="font-medium text-[var(--color-ink)]">Leads to:</span> {e.consequent_effect}</p>
                        )}
                      </div>
                      {e.characters.length > 0 && (
                        <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
                          {e.characters.join(" · ")}{e.location ? ` — ${e.location}` : ""}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
      </div>
    </div>
  );
}
