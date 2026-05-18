"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { createBrowserSupabaseClient } from "../../lib/supabase";

type Match = {
  id: string;
  round: string;
  home_team: string;
  away_team: string;
  starts_at: string;
  status: string;
};

type SavedPrediction = {
  id: string;
  name: string;
  home_team: string;
  away_team: string;
  predicted_home_score: number;
  predicted_away_score: number;
  created_at: string;
};
  

export default function VoorspellenPage() {
  const supabase = createBrowserSupabaseClient();

  const [name, setName] = useState("");
  const [savedPredictions, setSavedPredictions] = useState<SavedPrediction[]>([]);

  const [matches, setMatches] = useState<Match[]>([]);

async function loadMatches() {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .order("starts_at", { ascending: true });

  if (!error && data) {
    setMatches(data);
  }
}

async function loadPredictions() {
  const { data, error } = await supabase
    .from("test_predictions")
    .select("*")
    .order("created_at", { ascending: false });

  if (!error && data) {
    setSavedPredictions(data);
  }
}

useEffect(() => {
  loadMatches();
  loadPredictions();
}, []);
  const [scores, setScores] = useState<Record<string, { home: string; away: string }>>({});
  const [message, setMessage] = useState("");

  async function savePrediction(match: (typeof matches)[0]) {
    setMessage("");

    const score = scores[match.id];

    if (!name || !score?.home || !score?.away) {
      setMessage("Vul eerst je naam en beide scores in.");
      return;
    }
    loadPredictions();

  const { error } = await supabase.from("test_predictions").insert({
   name,
   match_id: match.id,
   home_team: match.home_team,
   away_team: match.away_team,
   predicted_home_score: Number(score.home),
   predicted_away_score: Number(score.away),
   });

    if (error) {
  console.log("SUPABASE ERROR:", error);
  setMessage(`Opslaan mislukt: ${error.message}`);
  return;
}

   setMessage(`Voorspelling opgeslagen voor ${match.home_team} - ${match.away_team}!`);
  }

  return (
    <main className="min-h-screen bg-[#1a0d02] pb-24 text-white md:pb-0">
      <Header />

      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-300">
  wk voorspellingen
</p>

<h1 className="mt-2 text-4xl font-black">Vul je voorspellingen in</h1>

<p className="mt-3 text-orange-50/75">
  Kies per wedstrijd de eindstand. Je voorspelling telt mee zodra je hem opslaat.
</p>

<div className="mt-5 rounded-2xl border border-orange-300/30 bg-orange-500/15 p-4 text-sm text-orange-50/80">
  ⚠️ Voorspellingen sluiten zodra de wedstrijd begint. Daarna kan je score niet meer aangepast worden.
</div>
<div className="mt-3 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
  💳 Alleen betaalde deelnemers tellen mee in het klassement. Niet betaald? Dan worden je voorspellingen verwijderd.
</div>

        <div className="mt-6 rounded-2xl border border-orange-300/35 bg-orange-500/20 p-5">
          <label className="text-sm font-bold text-orange-100">Naam deelnemer</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Bijv. Raymond"
            className="mt-2 w-full rounded-xl bg-orange-500/25 px-4 py-3 text-white outline-none placeholder:text-orange-100/50"
          />
        </div>

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
  {new Date(match.starts_at).toLocaleString("nl-NL")}
</p>

              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
  <p className="break-words text-right text-base font-bold leading-tight">
    {match.home_team}
  </p>

  <div className="flex shrink-0 items-center gap-1">
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

  <p className="break-words text-base font-bold leading-tight">
    {match.away_team}
  </p>
</div>
              <button
                onClick={() => savePrediction(match)}
                className="mt-5 w-full rounded-xl bg-orange-400 px-5 py-3 font-bold text-[#140900]"
              >
                Voorspelling opslaan
              </button>
            </div>
          ))}
        </div>
      <div className="mt-10 rounded-3xl border border-orange-300/35 bg-orange-500/20 p-5">
  <h2 className="text-2xl font-black">Opgeslagen voorspellingen</h2>

  <div className="mt-5 space-y-3">
    {savedPredictions.map((prediction) => (
      <div
        key={prediction.id}
        className="flex items-center justify-between rounded-2xl bg-orange-500/20 p-4"
      >
        <div>
          <p className="font-bold">{prediction.name}</p>
          <p className="text-sm text-orange-50/75">
            {prediction.home_team} - {prediction.away_team}
          </p>
        </div>

        <p className="text-xl font-black">
          {prediction.predicted_home_score} - {prediction.predicted_away_score}
        </p>
      </div>
    ))}
  </div>
</div></section>
    </main>
  );
}

