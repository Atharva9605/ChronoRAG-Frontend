"use client";
import { use, useEffect, useState } from "react";
import Shell from "@/components/Shell";
import TimelineRail from "@/components/TimelineRail";
import { SectionTitle, Spinner } from "@/components/ui";
import { api } from "@/lib/api";
import type { EventRow } from "@/lib/types";

export default function TimelinePage({ params }: { params: Promise<{ docId: string }> }) {
  const { docId } = use(params);
  const [events, setEvents] = useState<EventRow[] | null>(null);

  useEffect(() => { api.events(docId).then(setEvents); }, [docId]);

  return (
    <Shell docId={docId}>
      <SectionTitle eyebrow="pass 3 output" title="Reconstructed story timeline"
        sub="Ordered by story stage, then by first source page. Framing scenes are re-anchored, not left where they were printed." />
      {events === null ? <Spinner /> : <TimelineRail events={events} />}
    </Shell>
  );
}
