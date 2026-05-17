import Header from "@/components/Header";

const players = [
  { name: "Jan", points: 42, exact: 6 },
  { name: "Sanne", points: 38, exact: 5 },
  { name: "Peter", points: 31, exact: 3 },
  { name: "Lisa", points: 27, exact: 2 },
];

export default function KlassementPage() {
  return (
    <main className="min-h-screen bg-[#1a0d02] text-white">
      <Header />
      <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
        <h1 className="text-4xl font-black">WK klassement</h1>
        <div className="mt-8 space-y-3">
          {players.map((player, index) => (
            <div key={player.name} className="flex items-center justify-between rounded-2xl border border-orange-300/35 bg-orange-500/20 p-5">
              <div>
                <p className="font-black">#{index + 1} {player.name}</p>
                <p className="text-sm text-orange-50/75">{player.exact} exacte voorspellingen</p>
              </div>
              <p className="text-2xl font-black">{player.points}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
