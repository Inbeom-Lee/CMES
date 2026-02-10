import Link from "next/link";
import { AuthNav } from "./AuthNav";

export function LayoutNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-semibold text-slate-800 dark:text-slate-100"
        >
          CMES
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/history"
            className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          >
            My history
          </Link>
          <AuthNav />
          <Link
            href="/quiz"
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Start quiz
          </Link>
        </div>
      </div>
    </nav>
  );
}
