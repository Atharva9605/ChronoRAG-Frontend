"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import type { Job } from "@/lib/types";
import { Spinner } from "./ui";

export default function JobProgress({ jobId, onDone }:
  { jobId: string; onDone?: (job: Job) => void }) {
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    let alive = true;
    const tick = async () => {
      try {
        const j = await api.job(jobId);
        if (!alive) return;
        setJob(j);
        if (j.status === "done" || j.status === "error") { onDone?.(j); return; }
      } catch (err) {
        if (!alive) return;
        setJob({ id: jobId, status: "error", error: "Job not found or server error", progress: 0, detail: {} });
        return; 
      }
      if (alive) setTimeout(tick, 1200);
    };
    tick();
    return () => { alive = false; };
  }, [jobId]);

  if (!job) return <div className="flex items-center gap-2 text-sm"><Spinner /> starting…</div>;

  if (job.status === "error")
    return (
      <div className="flex items-start gap-2 rounded-lg bg-[var(--color-accent-soft)] p-3 text-sm text-[var(--color-accent)]">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <span className="font-mono text-xs">{job.error}</span>
      </div>
    );

  const pct = Math.round(job.progress * 100);
  const done = job.status === "done";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-[var(--color-ink-soft)]">
          {done ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Spinner />}
          {done ? "Complete" : job.stage || "working…"}
        </span>
        <span className="font-mono text-xs tabular-nums">{pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-line)]">
        <div className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500"
             style={{ width: `${pct}%` }} />
      </div>
      {done && Object.keys(job.detail).length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs text-[var(--color-ink-soft)]">
          {Object.entries(job.detail).map(([k, v]) => (
            <span key={k}><b className="font-medium text-[var(--color-ink)]">{String(v)}</b> {k.replace(/_/g, " ")}</span>
          ))}
        </div>
      )}
    </div>
  );
}
