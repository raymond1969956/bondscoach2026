import Header from "../../components/Header";

export default function SpelregelsPage() {
  return (
    <main className="min-h-screen bg-[#1a0d02] pb-24 text-white md:pb-0">
      <Header />
      <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
  <p className="text-sm uppercase tracking-[0.2em] text-orange-300">
    wk 2026 poule
  </p>

  <h1 className="mt-2 text-4xl font-black">Spelregels</h1>

  <p className="mt-4 text-orange-50/75">
    Simpel, gezellig en competitief. Voorspel alle WK-wedstrijden en strijd mee om de prijzenpot.
  </p>

  <div className="mt-8 space-y-4">
    {[
      [
        "€5 deelname",
        "Iedere deelnemer betaalt éénmalig €5 om mee te doen aan de poule.",
      ],
      [
        "Voorspellingen sluiten bij aftrap",
        "Zodra een wedstrijd begint kan de voorspelling niet meer aangepast worden.",
      ],
      [
        "3 punten voor exacte uitslag",
        "Voorspel je de exacte eindstand goed? Dan krijg je 3 punten.",
      ],
      [
        "1 punt voor juiste winnaar",
        "Heb je de winnaar of het gelijkspel correct, maar niet de exacte score? Dan krijg je 1 punt.",
      ],
      [
        "0 punten bij fout",
        "Zit je voorspelling ernaast? Dan krijg je geen punten.",
      ],
      [
        "Live klassement",
        "Het klassement wordt automatisch bijgewerkt zodra uitslagen worden ingevuld.",
      ],
      [
        "Hoogste score wint",
        "Aan het einde van het WK wint de deelnemer met de meeste punten.",
      ],
      [
        "Organisatie beslist",
        "Bij technische problemen of twijfelgevallen heeft de organisatie het laatste woord.",
      ],
    ].map(([title, text]) => (
      <div
        key={title}
        className="rounded-3xl border border-orange-300/35 bg-orange-500/20 p-5"
      >
        <h2 className="text-xl font-black">{title}</h2>
        <p className="mt-2 text-orange-50/75">{text}</p>
      </div>
    ))}
  </div>

  <div className="mt-10 rounded-3xl border border-orange-300/30 bg-orange-500/15 p-6 text-center">
    <p className="text-2xl font-black">
      Elke goal kan het klassement veranderen 🇳🇱⚽
    </p>
  </div>
</section>
    </main>
  );
}
