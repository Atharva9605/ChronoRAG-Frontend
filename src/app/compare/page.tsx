"use client";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, ChevronDown, Search } from "lucide-react";
import Shell from "@/components/Shell";
import AnswerPanel from "@/components/AnswerPanel";
import { Button, Card, SectionTitle, Spinner } from "@/components/ui";
import { api } from "@/lib/api";
import type { OrderDecision } from "@/lib/order";
import type { Doc, PipelineAnswer } from "@/lib/types";

type Preset = {
  question: string;
  label: string;
  gold: OrderDecision | "fact";
  verdict: string;
  facts: string[];
  /** For factual presets: regex tested against the answer when checking the book */
  factMatch?: string;
};

const OLD_MAN_PRESETS: Preset[] = [
  {
    label: "Refuse vs sharks",
    question:
      "Did Santiago refuse Manolin's offer to fish together again before or after the sharks attacked the dead marlin?",
    gold: "before",
    verdict: "Before",
    facts: [
      "Santiago refuses Manolin’s offer to fish together again on the shore at the opening (p. 2).",
      "Sharks attack the dead marlin on the voyage home, after the catch — much later in story time.",
      "Naive often flips this because shark passages dominate similarity; Kaalkram keeps shore → sea order.",
    ],
  },
  {
    label: "Tourists vs Manolin leaves",
    question:
      "Do tourists observe the fish remains before or after Manolin first leaves Santiago's boat at the start?",
    gold: "after",
    verdict: "After",
    facts: [
      "Manolin leaves Santiago’s boat early because of the 84-day unlucky streak (p. 2).",
      "Tourists see the fish remains at the Terrace in the aftermath (p. 49).",
      "Correct order: leave first, tourists much later.",
    ],
  },
  {
    label: "Sees fish vs gear",
    question:
      "Is the old man seeing the fish clearly for the first time while fighting it before or after Manolin helps carry gear on shore at the start of the story?",
    gold: "after",
    verdict: "After",
    facts: [
      "Manolin helps carry gear on shore during setup at the start of the story (p. 2).",
      "Santiago first sees the fish clearly as a massive shadow during the fight at sea (p. 34).",
      "Shore help at the start comes first; the clear sighting is later.",
    ],
  },
  {
    label: "Sharks vs Terrace beer",
    question:
      "Do the sharks attack the dead marlin on the way home before or after Manolin and Santiago share a beer at the Terrace at the beginning?",
    gold: "after",
    verdict: "After",
    facts: [
      "Beer at the Terrace is part of the opening shore setup (p. 3).",
      "Shark attacks happen on the homeward voyage after the marlin is killed.",
      "Beer first; sharks after.",
    ],
  },
  {
    label: "Factual · 84 days",
    question: "How many days had Santiago gone without catching a fish at the start of the story?",
    gold: "fact",
    verdict: "84 days",
    factMatch: String.raw`\b84\b|eighty[-\s]?four`,
    facts: [
      "Opening of the novella: Santiago has gone eighty-four days without a catch (p. 2).",
      "Normal factual retrieval — both pipelines should get this right.",
    ],
  },
  {
    label: "Factual · boy's name",
    question: "What is the name of the boy who helps Santiago?",
    gold: "fact",
    verdict: "Manolin",
    factMatch: String.raw`\bmanolin\b`,
    facts: [
      "The boy who helps Santiago is named Manolin (p. 2).",
      "A sharp factual lookup — both Naive RAG and Kaalkram should answer Manolin.",
    ],
  },
];

const RAMAYANA_PRESETS: Preset[] = [
  {
    label: "Shravana Kumar vs Exile (Flashback)",
    question:
      "Did King Dasharatha accidentally shoot the young hermit boy Shravana Kumar before or after Rama's exile to the Dandaka forest?",
    gold: "before",
    verdict: "Before",
    facts: [
      "King Dasharatha accidentally shot Shravana Kumar during his youth, recounted as a dying flashback (pp. 443-451).",
      "Rama's exile to the forest happens decades later during Dasharatha's old age (pp. 345-353).",
      "Naive RAG fails because the memory is told on page 443; Kaalkram recognizes the true youth timeline.",
    ],
  },
  {
    label: "Boons vs Golden Deer",
    question:
      "Did Kaikeyi demand her two boons from King Dasharatha before or after the golden deer Maricha appeared at Panchavati?",
    gold: "before",
    verdict: "Before",
    facts: [
      "Kaikeyi demands Rama's exile and Bharata's coronation in Ayodhya (Book II).",
      "The golden deer Maricha appears years later in the Dandaka forest at Panchavati (Book III).",
      "Demand for boons happens strictly before the golden deer appearance.",
    ],
  },
  {
    label: "Surpanakha vs Sita Abducted",
    question:
      "Did Lakshmana disfigure the demoness Surpanakha before or after Ravana abducted Sita?",
    gold: "before",
    verdict: "Before",
    facts: [
      "Lakshmana punishes Surpanakha at Panchavati when she attacks Sita.",
      "Surpanakha's complaint provokes Ravana to seek revenge and abduct Sita.",
      "Surpanakha confrontation happens before the abduction.",
    ],
  },
  {
    label: "Factual · 14 Years Exile",
    question: "For how many years was Rama commanded to live in exile in the forest?",
    gold: "fact",
    verdict: "14 years",
    factMatch: String.raw`\b14\b|fourteen`,
    facts: [
      "Kaikeyi commanded that Rama must reside in the Dandaka forest as a hermit for fourteen years.",
      "Both pipelines should ground this explicit number.",
    ],
  },
  {
    label: "Factual · Golden Deer Name",
    question: "Which demon disguised himself as the golden deer with silver spots to deceive Sita?",
    gold: "fact",
    verdict: "Maricha",
    factMatch: String.raw`\bmaricha\b|mārīca|marich`,
    facts: [
      "Maricha took the form of a wondrous golden deer to lure Rama away from the hermitage.",
    ],
  },
];

export default function ComparePage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [docId, setDocId] = useState("");
  const [question, setQuestion] = useState("");
  const [kaalkram, setKaalkram] = useState<PipelineAnswer | null>(null);
  const [naive, setNaive] = useState<PipelineAnswer | null>(null);
  const [loadingKaalkram, setLoadingKaalkram] = useState(false);
  const [loadingNaive, setLoadingNaive] = useState(false);
  const [errKaalkram, setErrKaalkram] = useState("");
  const [errNaive, setErrNaive] = useState("");
  const [checked, setChecked] = useState(false);
  const [bookOpen, setBookOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  const selectedDoc = useMemo(
    () => docs.find((d) => d.id === docId) ?? null,
    [docs, docId]
  );

  const currentPresets = useMemo(() => {
    if (!selectedDoc) return OLD_MAN_PRESETS;
    const name = (selectedDoc.filename || selectedDoc.title || "").toLowerCase();
    if (name.includes("ramayana") || name.includes("valmiki")) {
      return RAMAYANA_PRESETS;
    }
    return OLD_MAN_PRESETS;
  }, [selectedDoc]);

  // Set default question when presets change
  useEffect(() => {
    if (currentPresets.length > 0) {
      setQuestion(currentPresets[0].question);
    }
  }, [currentPresets]);

  const activePreset = useMemo(
    () => currentPresets.find((p) => p.question === question.trim()) ?? null,
    [currentPresets, question],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    api.listDocs().then((d) => {
      setDocs(d);
      const ready = d.find((x) => x.naive_ready && x.kaalkram_ready);
      if (ready) setDocId(ready.id);
    });
  }, []);

  const running = loadingKaalkram || loadingNaive;
  const hasResults = !!(kaalkram || naive || errKaalkram || errNaive);
  const bothSettled = !running && hasResults;
  const canCheck = bothSettled && !!activePreset;

  const goldForPanels = checked && activePreset
    ? activePreset.gold
    : null;
  const factMatch = checked && activePreset?.gold === "fact"
    ? activePreset.factMatch ?? null
    : null;
  const showDecision =
    activePreset
      ? activePreset.gold === "before" || activePreset.gold === "after"
      : /before\s+or\s+after|which comes first/i.test(question);

  async function handleRun(qOverride?: string) {
    const q = (qOverride ?? question).trim();
    if (!docId || !q || running) return;

    setKaalkram(null);
    setNaive(null);
    setErrKaalkram("");
    setErrNaive("");
    setChecked(false);
    setLoadingKaalkram(true);
    setLoadingNaive(true);

    api.queryKaalkram(docId, q)
      .then(setKaalkram)
      .catch((e) => setErrKaalkram(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoadingKaalkram(false));

    api.queryNaive(docId, q)
      .then(setNaive)
      .catch((e) => setErrNaive(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoadingNaive(false));
  }

  function pickPreset(p: Preset) {
    setQuestion(p.question);
    handleRun(p.question);
  }

  return (
    <Shell active="compare">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <SectionTitle
            eyebrow="Side by Side"
            title="Same book, same question, two architectures"
            description="Ask a before/after question. Naive RAG retrieves by similarity (shuffled order). Kaalkram retrieves ordered events."
          />
        </div>

        {/* Input Bar */}
        <Card className="p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative sm:w-64">
              <select
                aria-label="Select document"
                value={docId}
                onChange={(e) => setDocId(e.target.value)}
                className="w-full h-11 pl-3 pr-8 rounded-lg border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                {docs.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2.5 top-3.5 pointer-events-none text-muted-foreground" />
            </div>

            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="e.g. Did Santiago refuse the boy before or after the sharks attacked?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !running) handleRun();
                }}
                className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
            </div>

            <Button
              onClick={() => handleRun()}
              disabled={running || !docId || !question.trim()}
              className="h-11 px-6 shrink-0"
            >
              {running ? (
                <>
                  <Spinner className="mr-2" /> Running...
                </>
              ) : (
                "Run comparison"
              )}
            </Button>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-border/50">
            {currentPresets.map((p) => {
              const active = question === p.question;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => pickPreset(p)}
                  disabled={running}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    active
                      ? "bg-primary/10 border-primary text-primary font-medium"
                      : "bg-muted/40 border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Side-by-Side Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnswerPanel
            pipeline="kaalkram"
            answer={kaalkram}
            loading={loadingKaalkram}
            error={errKaalkram}
            showDecision={showDecision}
            gold={goldForPanels}
            factMatch={factMatch}
          />
          <AnswerPanel
            pipeline="naive"
            answer={naive}
            loading={loadingNaive}
            error={errNaive}
            showDecision={showDecision}
            gold={goldForPanels}
            factMatch={factMatch}
          />
        </div>

        {/* Check Against The Book (Verdict Drawer) */}
        {mounted && activePreset && (
          <div className="flex flex-col items-center space-y-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setChecked(true);
                setBookOpen(true);
              }}
              disabled={!canCheck}
              title={
                !canCheck
                  ? "Run a comparison with an active preset to check against the ground truth"
                  : undefined
              }
              className="gap-2 border-border shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              Check against the book
            </Button>

            {checked && (
              <Card className="w-full p-4 space-y-3 bg-muted/20 border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Ground Truth Verdict
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {activePreset.verdict}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBookOpen((v) => !v)}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    {bookOpen ? "Hide facts" : "Show facts"}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        bookOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {bookOpen && (
                  <ul className="space-y-1.5 text-xs text-muted-foreground list-disc list-inside">
                    {activePreset.facts.map((f, i) => (
                      <li key={i} className="leading-relaxed">
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            )}
          </div>
        )}
      </div>
    </Shell>
  );
}
