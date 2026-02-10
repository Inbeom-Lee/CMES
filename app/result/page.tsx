import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getPrimaryType,
  CMES_LABELS,
  CMES_ORDER,
  searchParamsToScores,
} from "@/lib/cmes";
import { getSuggestedPlatformsByType } from "@/lib/suggestedPlatforms";
import { ResultProfile } from "@/components/ResultProfile";
import { SaveResultButton } from "@/components/SaveResultButton";

type Props = { searchParams: Promise<Record<string, string | string[]>> };

export default async function ResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const single = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;
  const sp = new URLSearchParams();
  sp.set("C", single(params.C) ?? "");
  sp.set("M", single(params.M) ?? "");
  sp.set("E", single(params.E) ?? "");
  sp.set("S", single(params.S) ?? "");
  const scores = searchParamsToScores(sp);
  if (!scores) {
    redirect("/quiz");
  }
  const primary = getPrimaryType(scores);
  const platformsByType = getSuggestedPlatformsByType();
  const suggested = platformsByType[primary];
  const maxScore = Math.max(...CMES_ORDER.map((t) => scores[t]), 1);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
        Your dream type
      </h1>
      <p className="mt-2 text-xl text-indigo-600 dark:text-indigo-400">
        {CMES_LABELS[primary]}
      </p>
      <ResultProfile scores={scores} maxScore={maxScore} />
      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Suggested for you
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {suggested.description}
        </p>
        <a
          href={suggested.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {suggested.label} →
        </a>
      </section>
      <div className="mt-8 flex flex-wrap gap-4">
        <SaveResultButton
        scores={scores}
        primaryType={primary}
        redirectToResultUrl={`/result?${new URLSearchParams({
          C: String(scores.C),
          M: String(scores.M),
          E: String(scores.E),
          S: String(scores.S),
        }).toString()}`}
      />
        <Link
          href="/quiz"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Retake quiz
        </Link>
      </div>
    </div>
  );
}
