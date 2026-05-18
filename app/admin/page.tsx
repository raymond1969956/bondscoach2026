"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { createBrowserSupabaseClient } from "../../lib/supabase";

type Match = {
  id: string;
  round: string;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  starts_at: string;
  status: string;
};
function calculatePoints(
  predictedHome: number,
  predictedAway: number,
  actualHome: number,
  actualAway: number
) {
  if (predictedHome === actualHome && predictedAway === actualAway) {
    return 3;
  }

  const predictedResult =
    predictedHome > predictedAway ? "home" : predictedHome < predictedAway ? "away" : "draw";

  const actualResult =
    actualHome > actualAway ? "home" : actualHome < actualAway ? "away" : "draw";

  if (predictedResult === actualResult) {
    return 1;
  }

  return 0;
}
export default function AdminPage() {
  const supabase = createBrowserSupabaseClient;

  const [matches, setMatches] = useState<Match[]>([]);
  const [scores, setScores] = useState<Record<string, { home: string; away: string }>>({});
  const [message, setMessage] = useState("");

  async function loadMatches() {
    const { data, error } = await supabase()
      .from("matches")
      .select("*")
      .order("starts_at", { ascending: true });

    if (!error && data) {
      setMatches(data);

      const initialScores: Record<string, { home: string; away: string }> = {};

      data.forEach((match) => {
        initialScores[match.id] = {
          home: match.home_score !== null ? String(match.home_score) : "",
          away: match.away_score !== null ? String(match.away_score) : "",
        };
      });

      setScores(initialScores);
    }
  }

  useEffect(() => {
    loadMatches();
  }, []);

  async function saveResult(match: Match) {
    setMessage("");

    const score = scores[match.id];

    if (!score?.home || !score?.away) {
      setMessage("Vul beide scores in.");
      return;
    }

    const { error } = await supabase()
  .from("matches")
      .update({
        home_score: Number(score.home),
        away_score: Number(score.away),
        status: "finished",
      })
      .eq("id", match.id);

    if (error) {
      setMessage(`Opslaan mislukt: ${error.message}`);
      return;
    }
    const { data: predictions } = await supabase
  .from("test_predictions")
  .select("*")
  .eq("match_id", match.id);

if (predictions) {
  for (const prediction of predictions) {
    const points = calculatePoints(
      prediction.predicted_home_score,
      prediction.predicted_away_score,
      Number(score.home),
      Number(score.away)
    );

    await supabase
      .from("test_predictions")
      .update({ points })
      .eq("id", prediction.id);
  }
}

    setMessage(`Uitslag opgeslagen voor ${match.home_team} - ${match.away_team}`);
    loadMatches();
  }

  return (
    <main className="min-h-screen bg-[#1a0d02] text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <h1 className="text-4xl font-black">Organisator dashboard</h1>
        <p className="mt-3 text-orange-50/75">
          Vul hier uitslagen in. Later koppelen we hier automatisch puntenberekening aan.
        </p>

        {message && (
          <div className="mt-5 rounded-2xl bg-orange-400 px-4 py-3 font-bold text-[#140900]">
            {message}
          </div>
        )}

        <div className="mt-8 grid gap-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="rounded-3xl border border-orange-300/35 bg-orange-500/20 p-5"
            >
              <p className="text-sm text-orange-50/70">
                {match.round} • {new Date(match.starts_at).toLocaleString("nl-NL")}
              </p>

              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <p className="text-right text-xl font-bold">{match.home_team}</p>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={scores[match.id]?.home || ""}
                    onChange={(e) =>
                      setScores((prev) => ({
                        ...prev,
                        [match.id]: {
                          home: e.target.value,
                          away: prev[match.id]?.away || "",
                        },
                      }))
                    }
                    className="h-12 w-12 rounded-xl bg-orange-500/25 text-center text-xl font-black outline-none"
                    placeholder="0"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    min="0"
                    value={scores[match.id]?.away || ""}
                    onChange={(e) =>
                      setScores((prev) => ({
                        ...prev,
                        [match.id]: {
                          home: prev[match.id]?.home || "",
                          away: e.target.value,
                        },
                      }))
                    }
                    className="h-12 w-12 rounded-xl bg-orange-500/25 text-center text-xl font-black outline-none"
                    placeholder="0"
                  />
                </div>

                <p className="text-xl font-bold">{match.away_team}</p>
              </div>

              <button
                onClick={() => saveResult(match)}
                className="mt-5 w-full rounded-xl bg-orange-400 px-5 py-3 font-bold text-[#140900]"
              >
                Uitslag opslaan
              </button>

              <p className="mt-3 text-sm text-orange-50/70">
                Status: {match.status}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}