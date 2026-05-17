
import Link from "next/link";
import Header from "@/components/Header";
import { Trophy, Users, Euro, Shield, CheckCircle2 } from "lucide-react";

const leaderboard = [
  { name: "Jan", points: 42 },
  { name: "Sanne", points: 38 },
  { name: "Peter", points: 31 },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1a0d02] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-orange-500/70 blur-3xl" />
        <div className="absolute right-[-10%] top-[15%] h-[30rem] w-[30rem] rounded-full bg-orange-400/55 blur-3xl" />
      </div>

      <Header />

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:py-20">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-300/35 bg-orange-500/30 px-4 py-2 text-sm text-orange-50/90 backdrop-blur">
            <Shield className="h-4 w-4 text-orange-300" /> eerst betalen, daarna deelnemen
          </div>

          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            De gezelligste WK 2026 poule voor vrienden, familie en collega’s.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-orange-50/80">
            Betaal €5 via Tikkie, voorspel alle wedstrijden en strijd samen om de prijzenpot.
            Hoe meer deelnemers, hoe groter de winst.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/betalen" className="rounded-xl bg-orange-400 px-6 py-3 text-center font-bold text-[#140900] hover:bg-orange-300">
              Betaal €5 en doe mee
            </Link>
            <Link href="/spelregels" className="rounded-xl border border-orange-300/30 bg-orange-500/20 px-6 py-3 text-center font-bold text-white hover:bg-orange-500/30">
              Bekijk spelregels
            </Link>
          </div>

          <div className="mt-8 rounded-3xl border border-orange-300/30 bg-orange-500/20 p-4 backdrop-blur">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-orange-100">
              <Users className="h-4 w-4" /> groepschat vibes tijdens het WK
            </div>
            <div className="space-y-2">
              <div className="ml-auto max-w-[85%] rounded-2xl bg-green-500/20 px-4 py-3 text-right text-sm">NEDERLANDDDD 🇳🇱🔥</div>
              <div className="max-w-[85%] rounded-2xl bg-orange-500/30 px-4 py-3 text-sm">Wie heeft dit serieus 3-0 voorspeld 😭</div>
              <div className="ml-auto max-w-[85%] rounded-2xl bg-green-500/20 px-4 py-3 text-right text-sm">Jan staat gewoon eerste hoor</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-orange-300/35 bg-orange-500/30 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-400 p-3 text-[#140900]">
                <Euro className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-black">Prijzenpot</h2>
                <p className="text-orange-50/75">€5 deelname per persoon</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-orange-500/20 p-4">
                <p className="text-sm text-orange-50/75">Deelnemers</p>
                <p className="text-3xl font-black">84</p>
              </div>
              <div className="rounded-2xl bg-orange-500/20 p-4">
                <p className="text-sm text-orange-50/75">Totale pot</p>
                <p className="text-3xl font-black">€420</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-orange-300/35 bg-orange-500/30 p-6 shadow-2xl backdrop-blur">
            <div className="mb-4 flex items-center gap-3">
              <Trophy className="h-6 w-6 text-orange-300" />
              <h2 className="text-xl font-black">WK klassement</h2>
            </div>
            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <div key={player.name} className="flex items-center justify-between rounded-2xl bg-orange-500/20 p-4">
                  <span className="font-bold">#{index + 1} {player.name}</span>
                  <span className="font-black">{player.points} punten</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Betaal eerst €5", "Via Tikkie. Daarna activeert de organisator je deelname."],
            ["Voorspel wedstrijden", "Vul je scores in voordat de wedstrijd begint."],
            ["Strijd om plek 1", "Elke goal kan het klassement veranderen."]
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl border border-orange-300/35 bg-orange-500/20 p-6 shadow-xl backdrop-blur">
              <CheckCircle2 className="mb-4 h-6 w-6 text-orange-300" />
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-2 text-orange-50/75">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
