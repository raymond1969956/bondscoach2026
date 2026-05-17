import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "../../../../lib/supabase";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    const supabase = createAdminSupabaseClient();

    const { error } = await supabase
      .from("profiles")
      .update({
        has_paid: true,
        paid_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Deelnemer kon niet op betaald worden gezet." },
      { status: 500 }
    );
  }
}
