import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
        Discover your dream type
      </h1>
      <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
        CMES measures how your values connect to your dreams across four
        dimensions: <strong>Contribution</strong>, <strong>Mastery</strong>,{" "}
        <strong>Experience</strong>, and <strong>Stability</strong>. Answer a
        short set of questions to see your profile and get tailored suggestions.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Start the assessment
        </Link>
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Learn more
        </Link>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {[
          { label: "Contribution", desc: "Impact and giving back" },
          { label: "Mastery", desc: "Expertise and growth" },
          { label: "Experience", desc: "Adventure and variety" },
          { label: "Stability", desc: "Security and consistency" },
        ].map(({ label, desc }) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-5 text-left dark:border-slate-700 dark:bg-slate-800/50"
          >
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              {label}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
