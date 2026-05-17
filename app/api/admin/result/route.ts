import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "../../../../lib/supabase";

export async function POST(request: Request) {
  try {
    const { matchId, homeScore, awayScore } = await request.json();
    const supabase = createAdminSupabaseClient();

    const { error } = await supabase
      .from("matches")
      .update({
        home_score: homeScore,
        away_score: awayScore,
        status: "finished",
      })
      .eq("id", matchId);

    if (error) throw error;

    await supabase.rpc("recalculate_match_points", {
      target_match_id: matchId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Uitslag kon niet worden opgeslagen." },
      { status: 500 }
    );
  }
}
