"use client";

import { useState } from "react";
import Header from "../../components/Header";
import { createBrowserSupabaseClient } from "../../lib/supabase";

export default function BonusPage() {
  const supabase = createBrowserSupabaseClient();

  const [name, setName] = useState("");
  const [worldChampion, setWorldChampion] = useState("");
  const [topScorer, setTopScorer] = useState("");
  const [finalist1, setFinalist1] = useState("");
  
  const [netherlandsGoals, setNetherlandsGoals] = useState("");
  const [message, setMessage] = useState("");

  async function saveBonus() {
    setMessage("");

    if (!name || !worldChampion || !topScorer || !finalist1 || !netherlandsGoals) {
      setMessage("Vul alle bonusvragen in.");
      return;
    }

    const { error } = await supabase.from("bonus_predictions").insert({
      name,
      world_champion: worldChampion,
      top_scorer: topScorer,
      finalist_1: finalist1,
      finalist_2: "",
      netherlands_goals: Number(netherlandsGoals),
    });

    if (error) {
      setMessage(`Opslaan mislukt: ${error.message}`);
      return;
    }

    setMessage("Bonusvoorspellingen opgeslagen!");
  }

  return (
    <main className="min-h-screen bg-[#1a0d02] pb-24 text-white md:pb-0">
      <Header />

      <section className="mx-auto max-w-3xl px-5 py-12 md:px-8">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-300">
          extra punten
        </p>

        <h1 className="mt-2 text-4xl font-black">Bonusvragen</h1>

        <p className="mt-3 text-orange-50/75">
          Vul je bonusvoorspellingen in vóór de start van het WK.
        </p>

        <div className="mt-5 rounded-2xl border border-orange-300/30 bg-orange-500/15 p-4 text-sm text-orange-50/80">
          ⚠️ Bonusvragen kunnen later niet zomaar aangepast worden. Alleen betaalde deelnemers tellen mee.
        </div>

        {message && (
          <div className="mt-5 rounded-2xl bg-orange-400 px-4 py-3 font-bold text-[#140900]">
            {message}
          </div>
        )}

        <div className="mt-8 space-y-4">
          {[
            ["Naam deelnemer", name, setName, "Bijv. Raymond"],
            ["Wie wordt wereldkampioen?", worldChampion, setWorldChampion, "Bijv. Nederland"],
            ["Wie wordt topscorer?", topScorer, setTopScorer, "Bijv. Mbappé"],
            ["Noem één finalist", finalist1, setFinalist1, "Bijv. Nederland"],
            
          ].map(([label, value, setter, placeholder]) => (
            <div
              key={String(label)}
              className="rounded-2xl border border-orange-300/35 bg-orange-500/20 p-5"
            >
              <label className="text-sm font-bold text-orange-100">
                {String(label)}
              </label>
              <input
                value={String(value)}
                onChange={(e) => (setter as (value: string) => void)(e.target.value)}
                placeholder={String(placeholder)}
                className="mt-2 w-full rounded-xl bg-orange-500/25 px-4 py-3 text-white outline-none placeholder:text-orange-100/50"
              />
            </div>
          ))}

          <div className="rounded-2xl border border-orange-300/35 bg-orange-500/20 p-5">
            <label className="text-sm font-bold text-orange-100">
              Hoeveel goals maakt Nederland in totaal?
            </label>
            <input
              type="number"
              min="0"
              value={netherlandsGoals}
              onChange={(e) => setNetherlandsGoals(e.target.value)}
              placeholder="Bijv. 11"
              className="mt-2 w-full rounded-xl bg-orange-500/25 px-4 py-3 text-white outline-none placeholder:text-orange-100/50"
            />
          </div>

          <button
            onClick={saveBonus}
            className="w-full rounded-xl bg-orange-400 px-5 py-4 font-bold text-[#140900]"
          >
            Bonusvoorspellingen opslaan
          </button>
        </div>
      </section>
    </main>
  );
}