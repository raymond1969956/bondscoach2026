import Header from "@/components/Header";

export default function SpelregelsPage() {
  return (
    <main className="min-h-screen bg-[#1a0d02] text-white">
      <Header />
      <section className="mx-auto max-w-4xl px-5 py-12 md:px-8">
        <h1 className="text-4xl font-black">Spelregels & prijzenpot</h1>
        <div className="mt-8 space-y-5 text-orange-50/85">
          <p><strong>Deelname:</strong> €5 per persoon. Eerst betalen, daarna deelnemen.</p>
          <p><strong>Voorspellingen:</strong> moeten vóór de aftrap zijn ingevuld. Daarna sluiten ze automatisch.</p>
          <p><strong>Punten:</strong> exacte uitslag 10 punten, juiste winnaar + doelsaldo 7 punten, juiste winnaar/gelijkspel 5 punten.</p>
          <p><strong>Prijzenpot:</strong> afhankelijk van het aantal deelnemers. Bijvoorbeeld 70% / 20% / 10% voor plek 1, 2 en 3.</p>
          <p><strong>Tiebreaker:</strong> meeste exacte uitslagen, daarna bonusvragen, daarna gedeelde prijs.</p>
        </div>
      </section>
    </main>
  );
}
