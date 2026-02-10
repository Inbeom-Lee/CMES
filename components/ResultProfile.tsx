import { CMES_LABELS, CMES_ORDER } from "@/lib/cmes";
import type { Scores } from "@/lib/cmes";

type Props = { scores: Scores; maxScore: number };

export function ResultProfile({ scores, maxScore }: Props) {
  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Your profile
      </h2>
      {CMES_ORDER.map((t) => (
        <div key={t}>
          <div className="flex justify-between text-sm">
            <span className="text-slate-700 dark:text-slate-300">
              {CMES_LABELS[t]}
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {scores[t]}
            </span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-500"
              style={{
                width: `${Math.round((scores[t] / maxScore) * 100)}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
