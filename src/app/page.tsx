"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import Shell from "@/components/Shell";
import UploadCard from "@/components/UploadCard";
import JobProgress from "@/components/JobProgress";
import { Badge, Button, Card, SectionTitle, Spinner } from "@/components/ui";
import { api, type BuildKind } from "@/lib/api";
import type { Doc, Job } from "@/lib/types";

type DocJobs = { naive?: string; kaalkram?: string; kaalkram_v2?: string };

export default function LibraryPage() {
  const [docs, setDocs] = useState<Doc[] | null>(null);
  const [jobs, setJobs] = useState<Record<string, DocJobs>>({});
  const [busy, setBusy] = useState<Record<string, boolean>>({});

  const refresh = useCallback(() => {
    api.listDocs().then(setDocs).catch(() => setDocs([]));
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const startBuild = async (id: string, kind: BuildKind) => {
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

  const onJobDone = useCallback((docId: string, kind: BuildKind, job: Job) => {
    setBusy((b) => ({ ...b, [`${docId}:${kind}`]: false }));
    if (job.status === "done") refresh();
  }, [refresh]);

  const remove = async (id: string) => {
    await api.deleteDoc(id);
    refresh();
  };

  return (
    <Shell>
      <SectionTitle
        eyebrow="library"
        title="Your documents"
        sub="Upload a PDF, build naive / Kaalkram v1 / Kaalkram v2, then open Compare."
      />

      <div className="mb-10">
        <UploadCard onUploaded={() => refresh()} />
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
                    {d.kaalkram_ready && <Badge tone="accent">v1 ready</Badge>}
                    {d.v2_ready && <Badge tone="major">v2 ready</Badge>}
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

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {(["naive", "kaalkram", "kaalkram_v2"] as BuildKind[]).map((kind) => (
                  <div key={kind} className="space-y-3">
                    <Button
                      variant={kind === "naive" ? "ghost" : "primary"}
                      disabled={!!busy[`${d.id}:${kind}`]}
                      onClick={() => startBuild(d.id, kind)}
                    >
                      {busy[`${d.id}:${kind}`] ? <Spinner /> : null}
                      {kind === "naive" ? "Build naive" : kind === "kaalkram" ? "Build Kaalkram v1" : "Build Kaalkram v2"}
                    </Button>
                    {jobs[d.id]?.[kind] && (
                      <JobProgress
                        jobId={jobs[d.id][kind]!}
                        onDone={(job) => onJobDone(d.id, kind, job)}
                      />
                    )}
                  </div>
                ))}
              </div>

              {(d.kaalkram_ready || d.naive_ready) && (
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  {d.kaalkram_ready && (
                    <>
                      <Link className="text-[var(--color-accent)] hover:underline" href={`/timeline/${d.id}`}>
                        Timeline
                      </Link>
                      <Link className="text-[var(--color-accent)] hover:underline" href={`/graph/${d.id}`}>
                        Graph
                      </Link>
                    </>
                  )}
                  <Link className="text-[var(--color-accent)] hover:underline" href={`/metrics/${d.id}`}>
                    Metrics
                  </Link>
                  <Link className="text-[var(--color-accent)] hover:underline" href="/compare">
                    Compare
                  </Link>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </Shell>
  );
}
