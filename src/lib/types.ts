export type Doc = {
  id: string; title: string; filename: string; page_count: number;
  naive_ready: boolean; kaalkram_ready: boolean; event_count: number;
  /** Present once backend exposes it; optional until then. */
  v2_ready?: boolean;
};

export type Job = {
  id: string; doc_id: string; kind: string; status: string;
  stage: string; progress: number; detail: Record<string, unknown>;
  error: string | null;
};

export type Citation = { label: string; pages: number[] };

/** before | after | cannot_determine | not_applicable */
export type RelationLabel =
  | "before"
  | "after"
  | "cannot_determine"
  | "not_applicable"
  | string;

export type PipelineAnswer = {
  pipeline: string;
  answer: string;
  relation: RelationLabel | null;
  confidence: number | null;
  cited_spans: number[][];
  latency_ms: number;
  prompt_tokens: number;
  completion_tokens: number;
  citations: Citation[];
  retrieved: Record<string, unknown>[];
  trace: string[];
};

export type CompareResult = {
  question: string; naive: PipelineAnswer; kaalkram: PipelineAnswer;
};

export type GoldQuestion = {
  question_id: string;
  qtype: string | null;
  stratum: string | null;
  question: string;
  gold_label: string | null;
};

export type GoldSet = {
  gold_set_id: string | null;
  questions: GoldQuestion[];
};

export type V2GraphData = {
  events: unknown[];
  edges: unknown[];
  removed: {
    removed?: {
      u?: string; v?: string; strict?: boolean; p?: number;
      sources?: string[]; evidence?: unknown[];
    };
    cycle?: unknown[];
  }[];
  stats: Record<string, unknown> | null;
  weights: Record<string, number> | null;
  prompt_version?: string | null;
};

export type EvalRun = {
  run_id: string;
  created_at: string;
  pipeline: string;
  gold_set_id: string | null;
  git_commit: string | null;
  status: string;
  summary: Record<string, unknown> | null;
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

/** Evidence-chain step parsed from v2 answer.trace (`chain=...`). */
export type ChainStep = {
  from?: string;
  to?: string;
  strict?: boolean;
  p?: number;
  sources?: string[];
  evidence?: {
    span?: number[];
    pages?: number[];
    quote?: string;
    note?: string;
    mention?: string;
  }[];
};
