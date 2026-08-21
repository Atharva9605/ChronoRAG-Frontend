import type { CompareResult, Doc, EventRow, GraphData, Job, PipelineAnswer } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

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

  build: (id: string, kind: "naive" | "kaalkram") =>
    jsonFetch<Job>(`/api/documents/${id}/build/${kind}`, { method: "POST" }),

  job: (jobId: string) => jsonFetch<Job>(`/api/jobs/${jobId}`),

  docJobs: (id: string) =>
    jsonFetch<Record<string, Job | null>>(`/api/documents/${id}/jobs`),

  compare: (id: string, question: string) =>
    jsonFetch<CompareResult>(`/api/documents/${id}/compare`, {
      method: "POST", body: JSON.stringify({ question }),
    }),

  ask: (id: string, kind: "naive" | "kaalkram", question: string) =>
    jsonFetch<PipelineAnswer>(`/api/documents/${id}/ask/${kind}`, {
      method: "POST", body: JSON.stringify({ question }),
    }),

  events: (id: string) => jsonFetch<EventRow[]>(`/api/documents/${id}/events`),
  graph: (id: string) => jsonFetch<GraphData>(`/api/documents/${id}/graph`),
  metrics: (id: string) => jsonFetch<Record<string, unknown>>(`/api/documents/${id}/metrics`),
};
