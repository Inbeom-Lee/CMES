"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { QUESTIONS } from "@/lib/questions";
import { addWeightsToScores } from "@/lib/questions";
import type { OptionWeights } from "@/lib/questions";
import type { CMESType } from "@/lib/cmes";
import { scoresToSearchParams } from "@/lib/cmes";

const INITIAL_SCORES: Record<CMESType, number> = {
  C: 0,
  M: 0,
  E: 0,
  S: 0,
};

function computeScoresFromAnswers(answers: OptionWeights[]): Record<CMESType, number> {
  let s = { ...INITIAL_SCORES };
  for (const w of answers) {
    s = addWeightsToScores(s, w);
  }
  return s;
}

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OptionWeights[]>([]);
  const scores = useMemo(
    () => computeScoresFromAnswers(answers),
    [answers]
  );
  const question = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  const handleOption = useCallback(
    (weights: OptionWeights) => {
      const nextAnswers = [...answers, weights];
      setAnswers(nextAnswers);
      if (isLast) {
        const finalScores = computeScoresFromAnswers(nextAnswers);
        const qs = scoresToSearchParams(finalScores);
        router.push(`/result?${qs}`);
      } else {
        setStep((s) => s + 1);
      }
    },
    [answers, isLast, router]
  );

  const handleBack = useCallback(() => {
    if (step === 0) return;
    setStep((s) => s - 1);
    setAnswers((a) => a.slice(0, -1));
  }, [step]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Question {step + 1} of {QUESTIONS.length}
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        {question.text}
      </h2>
      <ul className="mt-8 space-y-3">
        {question.options.map((opt) => (
          <li key={opt.label}>
            <button
              type="button"
              onClick={() => handleOption(opt.weights as OptionWeights)}
              className="w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-left text-slate-800 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:bg-indigo-900/20"
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
      {step > 0 && (
        <button
          type="button"
          onClick={handleBack}
          className="mt-6 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
        >
          Back
        </button>
      )}
    </div>
  );
}
