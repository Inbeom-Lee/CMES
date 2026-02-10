"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AuthNav() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null | "loading">("loading");
  useEffect(() => {
    let mounted = true;
    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user: u } }) => {
        if (mounted) setUser(u ? { email: u.email } : null);
      });
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (mounted)
          setUser(session?.user ? { email: session.user.email } : null);
      });
      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    } catch {
      setUser(null);
      return undefined;
    }
  }, []);

  async function signOut() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } catch {
      router.refresh();
    }
  }

  if (user === "loading") {
    return (
      <Link
        href="/login"
        className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
      >
        Sign in
      </Link>
    );
  }
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {user.email}
        </span>
        <button
          type="button"
          onClick={signOut}
          className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <Link
      href="/login"
      className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
    >
      Sign in
    </Link>
  );
}
