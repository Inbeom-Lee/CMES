import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CMES_LABELS } from "@/lib/cmes";
import type { CMESType } from "@/lib/cmes";

export default async function HistoryPage() {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          My history
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Configure Supabase (env) to use sign-in and history.
        </p>
      </div>
    );
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          My history
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Sign in to see your saved results.
        </p>
        <Link
          href="/login?redirect=/history"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Sign in
        </Link>
      </div>
    );
  }
  const { data: results, error } = await supabase
    .from("results")
    .select("id, primary_type, scores, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-red-600 dark:text-red-400">
          Failed to load history. Try again later.
        </p>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
        My history
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Your saved assessment results.
      </p>
      {!results?.length ? (
        <p className="mt-8 text-slate-500 dark:text-slate-400">
          No saved results yet. Complete the quiz and save your result from the
          result page.
        </p>
      ) : (
        <ul className="mt-8 space-y-3">
          {results.map((r) => {
            const scores = (r.scores ?? {}) as Record<CMESType, number>;
            const qs = new URLSearchParams({
              C: String(scores.C ?? 0),
              M: String(scores.M ?? 0),
              E: String(scores.E ?? 0),
              S: String(scores.S ?? 0),
            }).toString();
            const date = new Date(r.created_at).toLocaleDateString(undefined, {
              dateStyle: "medium",
            });
            return (
              <li key={r.id}>
                <Link
                  href={`/result?${qs}`}
                  className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:bg-indigo-50/30 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-indigo-500 dark:hover:bg-indigo-900/20"
                >
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">
                    {CMES_LABELS[r.primary_type as CMESType]}
                  </span>
                  <span className="ml-2 text-slate-500 dark:text-slate-400">
                    — {date}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
