import Header from "../../components/Header";

export default function BetalenPage() {
  const tikkieUrl = process.env.NEXT_PUBLIC_TIKKIE_URL || "#";

  return (
    <main className="min-h-screen bg-[#1a0d02] text-white">
      <Header />
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <div className="rounded-3xl border border-orange-300/35 bg-orange-500/25 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.2em] text-orange-300">meedoen</p>
          <h1 className="mt-3 text-4xl font-black">Betaal eerst €5 via Tikkie</h1>
          <p className="mt-4 text-orange-50/80">
            Na betaling controleert de organisator de Tikkie-betaling en wordt uw account geactiveerd.
            Daarna kunt u voorspellingen invullen.
          </p>

          <a
            href={tikkieUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-xl bg-orange-400 px-6 py-3 font-bold text-[#140900] hover:bg-orange-300"
          >
            Open Tikkie
          </a>

          <div className="mt-8 rounded-2xl bg-orange-500/20 p-4 text-sm text-orange-50/80">
            Vermeld bij betaling bij voorkeur uw naam, zodat de organisator de betaling makkelijk kan koppelen.
          </div>
        </div>
      </section>
    </main>
  );
}
