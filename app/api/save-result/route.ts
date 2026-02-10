import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { CMESType } from "@/lib/cmes";

type Body = { scores: Record<CMESType, number>; primaryType: CMESType };

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", redirectToAuth: true },
        { status: 401 }
      );
    }
    const body = (await request.json()) as Body;
    const { scores, primaryType } = body;
    if (
      !scores ||
      typeof primaryType !== "string" ||
      !["C", "M", "E", "S"].includes(primaryType)
    ) {
      return NextResponse.json(
        { error: "Invalid scores or primaryType" },
        { status: 400 }
      );
    }
    const { error } = await supabase.from("results").insert({
      user_id: user.id,
      primary_type: primaryType,
      scores: {
        C: Number(scores.C) || 0,
        M: Number(scores.M) || 0,
        E: Number(scores.E) || 0,
        S: Number(scores.S) || 0,
      },
    });
    if (error) {
      const hint = error.code === "42P01"
        ? " Run the SQL in supabase/migrations/001_create_results.sql in the Supabase SQL Editor."
        : "";
      return NextResponse.json(
        { error: error.message + hint },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    if (message.includes("Missing Supabase")) {
      return NextResponse.json(
        { error: "Supabase not configured", redirectToAuth: false },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
