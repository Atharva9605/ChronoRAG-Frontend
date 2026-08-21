export type Doc = {
  id: string; title: string; filename: string; page_count: number;
  naive_ready: boolean; kaalkram_ready: boolean; event_count: number;
};

export type Job = {
  id: string; doc_id: string; kind: string; status: string;
  stage: string; progress: number; detail: Record<string, unknown>;
  error: string | null;
};

export type Citation = { label: string; pages: number[] };

export type PipelineAnswer = {
  pipeline: string; answer: string; latency_ms: number;
  prompt_tokens: number; completion_tokens: number;
  citations: Citation[];
  retrieved: Record<string, unknown>[];
  trace: string[];
};

export type CompareResult = {
  question: string; naive: PipelineAnswer; kaalkram: PipelineAnswer;
};

export type EventRow = {
  id: string; event_name: string; category: "major" | "minor";
  timeline_anchor: string; stage_order: number; location: string;
  characters: string[]; core_event: string;
  antecedent_cause: string; consequent_effect: string;
  source_pages: number[]; first_page: number; merge_count: number;
};

export type GraphData = {
  nodes: { id: string; name: string; category: string; anchor: string;
           stage_order: number; first_page: number; pages: number[]; core: string }[];
  edges: { src: string; dst: string; confidence: number; kind: string }[];
};
