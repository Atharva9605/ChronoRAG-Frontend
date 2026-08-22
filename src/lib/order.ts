/** Extract a BEFORE / AFTER decision from free-form pipeline answers. */
export type OrderDecision = "before" | "after" | "unclear";

export function decideOrder(text: string): OrderDecision {
  const t = text.toLowerCase().trim();
  if (!t) return "unclear";

  if (/\*{0,2}before\*{0,2}\.?\s*$/i.test(t)) return "before";
  if (/\*{0,2}after\*{0,2}\.?\s*$/i.test(t)) return "after";

  const first = t.split(/[.!?]/)[0] ?? t;
  const hasBefore = /\bbefore\b/.test(first);
  const hasAfter = /\bafter\b/.test(first);
  if (hasBefore && !hasAfter) return "before";
  if (hasAfter && !hasBefore) return "after";

  const claim = t.match(
    /\b(?:happen(?:s|ed)?|occur(?:s|red)?|come(?:s|s)?|came|is|was|did|leave(?:s|d)?|help(?:s|ed)?|offer(?:s|ed)?|share(?:s|d)?|refuse(?:s|d)?|attack(?:s|ed)?|observe(?:s|d)?|see(?:s|ing)?|saw|experience(?:s|d)?)\b[^.]{0,120}\b(before|after)\b/,
  );
  if (claim) return claim[1] as OrderDecision;

  const all = [...t.matchAll(/\b(before|after)\b/g)];
  if (all.length === 0) return "unclear";
  if (hasBefore && hasAfter) {
    const lastInFirst = [...first.matchAll(/\b(before|after)\b/g)].at(-1);
    if (lastInFirst) return lastInFirst[1] as OrderDecision;
  }
  return all[0][1] as OrderDecision;
}
