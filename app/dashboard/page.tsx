import Header from "../../components/Header";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#1a0d02] text-white">
      <Header />
      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8">
        <h1 className="text-4xl font-black">Mijn dashboard</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-orange-500/20 p-6"><p>Punten</p><p className="text-4xl font-black">42</p></div>
          <div className="rounded-3xl bg-orange-500/20 p-6"><p>Positie</p><p className="text-4xl font-black">#1</p></div>
          <div className="rounded-3xl bg-orange-500/20 p-6"><p>Exact goed</p><p className="text-4xl font-black">6</p></div>
        </div>
      </section>
    </main>
  );
}
