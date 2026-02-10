"use client";

import { useState } from "react";
import type { Scores } from "@/lib/cmes";
import type { CMESType } from "@/lib/cmes";

type Props = {
  scores: Scores;
  primaryType: CMESType;
  redirectToResultUrl?: string;
};

export function SaveResultButton({
  scores,
  primaryType,
  redirectToResultUrl = "/result",
}: Props) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/save-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scores, primaryType }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSaved(true);
      } else {
        if (data?.redirectToAuth) {
          window.location.href = `/login?redirect=${encodeURIComponent(redirectToResultUrl)}`;
          return;
        }
        setError(data?.error ?? "Failed to save");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
    <button
      type="button"
      onClick={handleSave}
      disabled={loading || saved}
      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-70"
    >
      {saved ? "Saved" : loading ? "Saving…" : "Save to my history"}
    </button>
    {error && (
      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
    )}
    </div>
  );
}
