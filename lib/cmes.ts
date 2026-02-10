export type CMESType = "C" | "M" | "E" | "S";

export const CMES_LABELS: Record<CMESType, string> = {
  C: "Contribution",
  M: "Mastery",
  E: "Experience",
  S: "Stability",
};

export const CMES_ORDER: CMESType[] = ["C", "M", "E", "S"];

export type Scores = Record<CMESType, number>;

export function getPrimaryType(scores: Scores): CMESType {
  let max = -1;
  let primary: CMESType = "C";
  for (const t of CMES_ORDER) {
    if (scores[t] > max) {
      max = scores[t];
      primary = t;
    }
  }
  return primary;
}

export function scoresToSearchParams(scores: Scores): string {
  return new URLSearchParams({
    C: String(scores.C),
    M: String(scores.M),
    E: String(scores.E),
    S: String(scores.S),
  }).toString();
}

export function searchParamsToScores(searchParams: URLSearchParams): Scores | null {
  const C = Number(searchParams.get("C"));
  const M = Number(searchParams.get("M"));
  const E = Number(searchParams.get("E"));
  const S = Number(searchParams.get("S"));
  if (
    Number.isNaN(C) ||
    Number.isNaN(M) ||
    Number.isNaN(E) ||
    Number.isNaN(S)
  ) {
    return null;
  }
  return { C, M, E, S };
}
