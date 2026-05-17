import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "../../../lib/supabase";

export async function POST(request: Request) {
  try {
    const { userId, matchId, homeScore, awayScore } = await request.json();
    const supabase = createAdminSupabaseClient();

    const { data: profile } = await supabase
      .from("profiles")
      .select("has_paid")
      .eq("id", userId)
      .single();

    if (!profile?.has_paid) {
      return NextResponse.json(
        { error: "U moet eerst betalen voordat u kunt voorspellen." },
        { status: 403 }
      );
    }

    const { error } = await supabase.from("predictions").upsert({
      user_id: userId,
      match_id: matchId,
      predicted_home_score: homeScore,
      predicted_away_score: awayScore,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Voorspelling kon niet worden opgeslagen." },
      { status: 500 }
    );
  }
}
