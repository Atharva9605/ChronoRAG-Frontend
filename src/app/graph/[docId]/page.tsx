"use client";
import { use, useEffect, useState } from "react";
import Shell from "@/components/Shell";
import GraphView from "@/components/GraphView";
import { SectionTitle, Spinner } from "@/components/ui";
import { api } from "@/lib/api";
import type { GraphData } from "@/lib/types";

export default function GraphPage({ params }: { params: Promise<{ docId: string }> }) {
  const { docId } = use(params);
  const [data, setData] = useState<GraphData | null>(null);
  useEffect(() => { api.graph(docId).then(setData); }, [docId]);

  return (
    <Shell docId={docId}>
      <SectionTitle eyebrow="event graph" title="Temporal DAG"
        sub="Columns are story stages. Orange nodes are major events; orange edges are causal links. Cycles have already been repaired." />
      {data === null ? <Spinner /> :
        <>
          <p className="mb-4 text-sm text-[var(--color-ink-soft)]">
            {data.nodes.length} nodes · {data.edges.length} edges
          </p>
          <GraphView data={data} />
        </>}
    </Shell>
  );
}
