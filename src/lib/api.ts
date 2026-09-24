import type {
  Doc, EvalRun, EventRow, GoldSet, GraphData, Job, PipelineAnswer, V2GraphData,
} from "./types";

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export type AskKind = "naive" | "kaalkram" | "kaalkram_v2";
export type BuildKind = "naive" | "kaalkram" | "kaalkram_v2";

async function jsonFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

export const api = {
  listDocs: () => jsonFetch<Doc[]>("/api/documents"),

  upload: async (file: File): Promise<Doc> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${BASE}/api/documents`, { method: "POST", body: fd });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  deleteDoc: (id: string) =>
    jsonFetch<{ deleted: string }>(`/api/documents/${id}`, { method: "DELETE" }),

  build: (id: string, kind: BuildKind) =>
    jsonFetch<Job>(`/api/documents/${id}/build/${kind}`, { method: "POST" }),

  job: (jobId: string) => jsonFetch<Job>(`/api/jobs/${jobId}`),

  docJobs: (id: string) =>
    jsonFetch<Record<string, Job | null>>(`/api/documents/${id}/jobs`),

  ask: (id: string, kind: AskKind, question: string) =>
    jsonFetch<PipelineAnswer>(`/api/documents/${id}/ask/${kind}`, {
      method: "POST", body: JSON.stringify({ question }),
    }),

  gold: (id: string) => jsonFetch<GoldSet>(`/api/documents/${id}/gold`),

  events: (id: string) => jsonFetch<EventRow[]>(`/api/documents/${id}/events`),
  graph: (id: string) => jsonFetch<GraphData>(`/api/documents/${id}/graph`),
  v2Graph: (id: string) => jsonFetch<V2GraphData>(`/api/documents/${id}/v2/graph`),
  metrics: (id: string) => jsonFetch<Record<string, unknown>>(`/api/documents/${id}/metrics`),
  evalRuns: (id: string) => jsonFetch<EvalRun[]>(`/api/documents/${id}/eval-runs`),
};
