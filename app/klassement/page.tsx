"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { createBrowserSupabaseClient } from "../../lib/supabase";

type Prediction = {
  id: string;
  name: string;
  points: number;
  predicted_home_score: number;
  predicted_away_score: number;
};

type LeaderboardPlayer = {
  name: string;
  totalPoints: number;
  predictions: number;
};

export default function KlassementPage() {
  const supabase = createBrowserSupabaseClient();
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);

  async function loadLeaderboard() {
    const { data, error } = await supabase
      .from("test_predictions")
      .select("*");

    if (error || !data) return;

    const grouped: Record<string, LeaderboardPlayer> = {};

    data.forEach((prediction: Prediction) => {
      if (!grouped[prediction.name]) {
        grouped[prediction.name] = {
          name: prediction.name,
          totalPoints: 0,
          predictions: 0,
        };
      }

      grouped[prediction.name].totalPoints += prediction.points || 0;
      grouped[prediction.name].predictions += 1;
    });

    const sorted = Object.values(grouped).sort(
      (a, b) => b.totalPoints - a.totalPoints
    );

    setLeaderboard(sorted);
  }

  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
    <main className="min-h-screen bg-[#1a0d02] pb-24 text-white md:pb-0">
      <Header />

      <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-300">
          live stand
        </p>
        <h1 className="mt-2 text-4xl font-black">WK klassement</h1>
        <p className="mt-3 text-orange-50/75">
          De stand wordt automatisch bijgewerkt zodra uitslagen zijn ingevuld.
        </p>
        {leaderboard.length > 0 && (
  <div className="mt-8 grid gap-4 md:grid-cols-3">
    {leaderboard.slice(0, 3).map((player, index) => (
      <div
        key={player.name}
        className={`rounded-3xl border border-orange-300/35 p-6 text-center shadow-2xl ${
          index === 0
            ? "bg-gradient-to-br from-yellow-300/40 to-orange-500/30 md:-mt-4"
            : "bg-orange-500/20"
        }`}
      >
        <div className="text-5xl">
          {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
        </div>
        <h2 className="mt-4 text-2xl font-black">{player.name}</h2>
        <p className="mt-2 text-4xl font-black">{player.totalPoints}</p>
        <p className="text-sm text-orange-50/75">punten</p>
      </div>
    ))}
  </div>
)}

        <div className="mt-8 space-y-3">
          {leaderboard.map((player, index) => (
            <div
              key={player.name}
              className="flex items-center justify-between rounded-2xl border border-orange-300/35 bg-orange-500/20 p-5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-400 font-black text-[#140900]">
                  #{index + 1}
                </div>

                <div>
                  <p className="text-xl font-black">{player.name}</p>
                  <p className="text-sm text-orange-50/75">
                    {player.predictions} voorspellingen ingevuld
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-3xl font-black">{player.totalPoints}</p>
                <p className="text-xs text-orange-50/70">punten</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}