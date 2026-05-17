import Header from "@/components/Header";

const matches = [
  { id: 1, home: "Nederland", away: "Canada", time: "Vrijdag 21:00" },
  { id: 2, home: "Brazilië", away: "Servië", time: "Zaterdag 18:00" },
  { id: 3, home: "Argentinië", away: "Japan", time: "Zondag 20:00" },
];

export default function VoorspellenPage() {
  return (
    <main className="min-h-screen bg-[#1a0d02] text-white">
      <Header />
      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
        <h1 className="text-4xl font-black">Voorspellingen</h1>
        <p className="mt-3 text-orange-50/75">Alleen betaalde deelnemers kunnen voorspellingen opslaan.</p>

        <div className="mt-8 grid gap-4">
          {matches.map((match) => (
            <div key={match.id} className="rounded-3xl border border-orange-300/35 bg-orange-500/20 p-5">
              <p className="text-sm text-orange-50/70">{match.time}</p>
              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <p className="text-right text-xl font-bold">{match.home}</p>
                <div className="flex items-center gap-2">
                  <input className="h-12 w-12 rounded-xl bg-orange-500/25 text-center text-xl font-black outline-none" placeholder="0" />
                  <span>-</span>
                  <input className="h-12 w-12 rounded-xl bg-orange-500/25 text-center text-xl font-black outline-none" placeholder="0" />
                </div>
                <p className="text-xl font-bold">{match.away}</p>
              </div>
              <button className="mt-5 w-full rounded-xl bg-orange-400 px-5 py-3 font-bold text-[#140900]">
                Voorspelling opslaan
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
