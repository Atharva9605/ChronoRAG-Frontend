"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import Shell from "@/components/Shell";
import UploadCard from "@/components/UploadCard";
import JobProgress from "@/components/JobProgress";
import { Badge, Button, Card, SectionTitle, Spinner } from "@/components/ui";
import { api } from "@/lib/api";
import type { Doc, Job } from "@/lib/types";

export default function LibraryPage() {
  const [docs, setDocs] = useState<Doc[] | null>(null);
  const [jobs, setJobs] = useState<Record<string, { naive?: string; kaalkram?: string }>>({});
  const [busy, setBusy] = useState<Record<string, boolean>>({});

  const refresh = useCallback(() => {
    api.listDocs().then(setDocs).catch(() => setDocs([]));
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const startBuild = async (id: string, kind: "naive" | "kaalkram") => {
    setBusy((b) => ({ ...b, [`${id}:${kind}`]: true }));
    try {
      const job = await api.build(id, kind);
      setJobs((j) => ({
        ...j,
        [id]: { ...j[id], [kind]: job.id },
      }));
    } catch (e) {
      console.error(e);
      setBusy((b) => ({ ...b, [`${id}:${kind}`]: false }));
    }
  };

  const onJobDone = useCallback((docId: string, kind: "naive" | "kaalkram", job: Job) => {
    setBusy((b) => {
      const key = `${docId}:${kind}`;
      if (b[key] === false) return b;
      return { ...b, [key]: false };
    });
    if (job.status === "done" || job.status === "error") refresh();
  }, [refresh]);

  const remove = async (id: string) => {
    await api.deleteDoc(id);
    refresh();
  };

  const onUploaded = useCallback((newDoc: Doc) => {
    setDocs((prev) => {
      if (!prev) return [newDoc];
      const exists = prev.some((d) => d.id === newDoc.id);
      if (exists) {
        return prev.map((d) => (d.id === newDoc.id ? newDoc : d));
      }
      return [newDoc, ...prev];
    });
    refresh();
  }, [refresh]);

  return (
    <Shell>
      <SectionTitle
        eyebrow="library"
        title="Your books"
        sub="Upload a PDF, build both pipelines, then open Compare to see the difference."
      />

      <div className="mb-10">
        <UploadCard onUploaded={onUploaded} />
      </div>

      {docs === null ? (
        <Spinner />
      ) : docs.length === 0 ? (
        <p className="text-sm text-[var(--color-ink-soft)]">No documents yet.</p>
      ) : (
        <div className="space-y-4">
          {docs.map((d) => (
            <Card key={d.id} className="p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-xl">{d.title}</h2>
                    <Badge tone="neutral">{d.page_count} pages</Badge>
                    {d.naive_ready && <Badge tone="major">naive ready</Badge>}
                    {d.kaalkram_ready && <Badge tone="accent">kaalkram ready</Badge>}
                  </div>
                  <p className="mt-1 font-mono text-xs text-[var(--color-ink-soft)]">
                    {d.id} · {d.filename}
                    {d.event_count > 0 ? ` · ${d.event_count} events` : ""}
                  </p>
                </div>
                <Button variant="danger" onClick={() => remove(d.id)} className="shrink-0">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </Button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    disabled={!!busy[`${d.id}:naive`]}
                    onClick={() => startBuild(d.id, "naive")}
                  >
                    {busy[`${d.id}:naive`] ? <Spinner /> : null}
                    Build naive
                  </Button>
                  {jobs[d.id]?.naive && (
                    <JobProgress
                      jobId={jobs[d.id].naive!}
                      onDone={(job) => onJobDone(d.id, "naive", job)}
                    />
                  )}
                </div>
                <div className="space-y-3">
                  <Button
                    disabled={!!busy[`${d.id}:kaalkram`]}
                    onClick={() => startBuild(d.id, "kaalkram")}
                  >
                    {busy[`${d.id}:kaalkram`] ? <Spinner /> : null}
                    Build Kaalkram
                  </Button>
                  {jobs[d.id]?.kaalkram && (
                    <JobProgress
                      jobId={jobs[d.id].kaalkram!}
                      onDone={(job) => onJobDone(d.id, "kaalkram", job)}
                    />
                  )}
                </div>
              </div>

              {d.kaalkram_ready && (
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <Link className="text-[var(--color-accent)] hover:underline" href={`/timeline/${d.id}`}>
                    Timeline
                  </Link>
                  <Link className="text-[var(--color-accent)] hover:underline" href={`/graph/${d.id}`}>
                    Graph
                  </Link>
                  <Link className="text-[var(--color-accent)] hover:underline" href={`/metrics/${d.id}`}>
                    Metrics
                  </Link>
                  {d.naive_ready && (
                    <Link className="text-[var(--color-accent)] hover:underline" href="/compare">
                      Compare
                    </Link>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </Shell>
  );
}
