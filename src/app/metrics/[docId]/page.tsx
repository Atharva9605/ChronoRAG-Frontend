"use client";
import { use, useEffect, useState } from "react";
import Shell from "@/components/Shell";
import MetricsPanel from "@/components/MetricsPanel";
import { SectionTitle, Spinner } from "@/components/ui";
import { api } from "@/lib/api";

export default function MetricsPage({ params }: { params: Promise<{ docId: string }> }) {
  const { docId } = use(params);
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => { api.metrics(docId).then(setData); }, [docId]);

  return (
    <Shell docId={docId}>
      <SectionTitle
        eyebrow="evaluation"
        title="Pipeline metrics"
        sub="Structural stats from extraction and query runs. Ordering accuracy stays blank until gold labels are supplied."
      />
      {data === null ? <Spinner /> : <MetricsPanel data={data} />}
    </Shell>
  );
}
