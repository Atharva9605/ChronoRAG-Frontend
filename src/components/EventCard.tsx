"use client";
import type { EventRow } from "@/lib/types";
import { Badge } from "./ui";

export default function EventCard({ event: e }: { event: EventRow }) {
  return (
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
  );
}
