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
    label: "Ganga descent vs Shiva bow (Backstory)",
    question:
      "Did Sage Vishvamitra narrate the descent of River Ganga before or after Rama broke Lord Shiva's bow in Mithila?",
    gold: "before",
    verdict: "Before",
    facts: [
      "Vishvamitra narrates the ancient history of King Bhagiratha and River Ganga while journeying to Mithila (Book I).",
      "Rama breaks Lord Shiva's great bow at King Janaka's court in Mithila later in the journey.",
      "Ganga backstory narration occurs before breaking the bow.",
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
    label: "Guha boat vs Bharata sandals",
    question:
      "Did the Nishada king Guha help Rama, Sita, and Lakshmana cross the Ganga before or after Bharata visited Chitrakoota to request Rama's sandals?",
    gold: "before",
    verdict: "Before",
    facts: [
      "Guha meets Rama and rows the exile party across the Ganga near the beginning of their journey.",
      "Bharata follows their trail to Mount Chitrakoota later to plead with Rama to return.",
      "Crossing with Guha comes first; Bharata's arrival at Chitrakoota is after.",
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
    label: "Khara's Army vs Golden Deer",
    question:
      "Did Rama slay Khara and his 14,000 demon warriors before or after Maricha took the form of the golden deer?",
    gold: "before",
    verdict: "Before",
    facts: [
      "Khara leads his army to attack Rama after Surpanakha is disfigured, and Rama slays them all at Janasthana.",
      "Enraged by Khara's destruction, Ravana approaches Maricha to plan the golden deer deception.",
      "Khara's battle happens before the golden deer deception.",
    ],
  },
  {
    label: "Tataka slain vs Ahalya freed",
    question:
      "Did Rama slay the demoness Tataka before or after freeing Ahalya from her curse?",
    gold: "before",
    verdict: "Before",
    facts: [
      "Rama slays Tataka in the forest on the way to Siddhashrama (Book I).",
      "Later, upon reaching the hermitage of Sage Gautama near Mithila, Rama releases Ahalya from her curse.",
      "Tataka's death occurs before Ahalya's redemption.",
    ],
  },
  {
    label: "Jatayu battle vs Ravana council",
    question:
      "Did Jatayu fight Ravana in the sky before or after Ravana held his council in Lanka to display captive Sita?",
    gold: "before",
    verdict: "Before",
    facts: [
      "The noble vulture Jatayu intercepts Ravana's chariot in mid-air as he flees Panchavati with Sita.",
      "Ravana reaches Lanka and summons his council after striking down Jatayu.",
      "Jatayu's sky battle happens before Ravana arrives in Lanka.",
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

  const selectPreset = (q: string) => {
    setQuestion(q);
    setChecked(false);
    setBookOpen(true);
    setKaalkram(null);
    setNaive(null);
    setErrKaalkram("");
    setErrNaive("");
  };

  const run = () => {
    if (!docId || !question.trim()) return;
    const q = question.trim();

    setChecked(false);
    setBookOpen(true);
    setKaalkram(null);
    setNaive(null);
    setErrKaalkram("");
    setErrNaive("");
    setLoadingKaalkram(true);
    setLoadingNaive(true);

    api.ask(docId, "kaalkram", q)
      .then(setKaalkram)
      .catch((e: unknown) => setErrKaalkram(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoadingKaalkram(false));

    api.ask(docId, "naive", q)
      .then(setNaive)
      .catch((e: unknown) => setErrNaive(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoadingNaive(false));
  };

  return (
    <Shell docId={docId || undefined}>
      <SectionTitle
        eyebrow="side by side"
        title="Same book, same question, two architectures"
        sub="Ask a before/after question. Naive RAG retrieves by similarity (shuffled order). Kaalkram retrieves ordered events."
      />

      <Card className="mb-6 p-5">
        <div className="flex flex-col gap-3 md:flex-row" suppressHydrationWarning>
          <select
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
            suppressHydrationWarning
            aria-label="Select book"
            className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm md:w-64"
          >
            <option value="">Select a book…</option>
            {docs.map((d) => (
              <option key={d.id} value={d.id} disabled={!(d.naive_ready && d.kaalkram_ready)}>
                {d.title}{d.naive_ready && d.kaalkram_ready ? "" : "  (not built)"}
              </option>
            ))}
          </select>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-soft)]" />
            <input
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                setChecked(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="Ask something that depends on order…"
              suppressHydrationWarning
              aria-label="Question to compare"
              className="w-full rounded-lg border border-[var(--color-line)] bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[var(--color-accent)]"
            />
          </div>

          <Button onClick={run} disabled={running || !docId}>
            {running ? (
              <>
                <Spinner /> Running…
              </>
            ) : (
              "Run comparison"
            )}
          </Button>
        </div>

        <div className="mt-3 flex min-h-8 flex-wrap gap-2" suppressHydrationWarning>
          {mounted &&
            currentPresets.map((p) => (
              <button
                key={p.question}
                type="button"
                onClick={() => selectPreset(p.question)}
                className={chipClass(question === p.question)}
              >
                {p.label}
              </button>
            ))}
        </div>
      </Card>

      {(loadingKaalkram || kaalkram || errKaalkram || loadingNaive || naive || errNaive) && (
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <PanelSlot
            title="Kaalkram"
            subtitle="Extracted events → deduplicated → temporal DAG → ordered retrieval"
            tone="primary"
            loading={loadingKaalkram}
            data={kaalkram}
            err={errKaalkram}
            gold={goldForPanels}
            factMatch={factMatch}
            showDecision={showDecision}
            checked={checked}
          />
          <PanelSlot
            title="Naive RAG"
            subtitle="Fixed chunks → embeddings → top-k similarity → stuffed prompt"
            tone="muted"
            loading={loadingNaive}
            data={naive}
            err={errNaive}
            gold={goldForPanels}
            factMatch={factMatch}
            showDecision={showDecision}
            checked={checked}
          />
        </div>
      )}

      {canCheck && !checked && (
        <div className="mt-6 flex justify-center">
          <Button
            variant="ghost"
            onClick={() => {
              setChecked(true);
              setBookOpen(true);
            }}
          >
            <BookOpen className="h-4 w-4" />
            Check against the book
          </Button>
        </div>
      )}

      {checked && activePreset && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setBookOpen((o) => !o)}
            className="mb-2 flex w-full items-center justify-between rounded-lg border border-[var(--color-line)] bg-white px-4 py-2.5 text-left text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-paper)]"
          >
            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Book answer
              <span className="text-[var(--color-ink)]">· {activePreset.verdict}</span>
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${bookOpen ? "rotate-180" : ""}`} />
          </button>

          {bookOpen && (
            <Card className="px-5 py-4">
              <p className="text-sm text-[var(--color-ink)]">
                Correct decision: <span className="font-medium">{activePreset.verdict}</span>
              </p>
              <ul className="mt-3 space-y-1.5">
                {activePreset.facts.map((f) => (
                  <li key={f} className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                    · {f}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}
    </Shell>
  );
}

function chipClass(active: boolean) {
  return [
    "rounded-full border px-3 py-1 text-xs transition-colors",
    active
      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
      : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
  ].join(" ");
}

function PanelSlot({
  title,
  subtitle,
  tone,
  loading,
  data,
  err,
  gold,
  factMatch,
  showDecision,
  checked,
}: {
  title: string;
  subtitle: string;
  tone: "muted" | "primary";
  loading: boolean;
  data: PipelineAnswer | null;
  err: string;
  gold: OrderDecision | "fact" | null;
  factMatch: string | null;
  showDecision: boolean;
  checked: boolean;
}) {
  if (loading) {
    return <Card className="relative h-72 overflow-hidden shimmer bg-[var(--color-paper)]" />;
  }
  if (err) {
    return (
      <Card className="p-5 text-sm text-[var(--color-accent)]">
        <h3 className="mb-2 font-display text-lg">{title}</h3>
        {err}
      </Card>
    );
  }
  if (data) {
    return (
      <AnswerPanel
        data={data}
        tone={tone}
        title={title}
        subtitle={subtitle}
        gold={gold}
        factMatch={factMatch}
        showDecision={showDecision}
        checked={checked}
      />
    );
  }
  return null;
}
