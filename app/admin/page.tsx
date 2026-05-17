import Header from "@/components/Header";

const participants = [
  { name: "Jan de Vries", email: "jan@example.nl", paid: true },
  { name: "Sanne Bakker", email: "sanne@example.nl", paid: true },
  { name: "Nieuwe deelnemer", email: "nieuw@example.nl", paid: false },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#1a0d02] text-white">
      <Header />
      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <h1 className="text-4xl font-black">Organisator dashboard</h1>
        <div className="mt-8 overflow-hidden rounded-3xl border border-orange-300/35 bg-orange-500/20">
          {participants.map((p) => (
            <div key={p.email} className="grid grid-cols-[1fr_1fr_auto] items-center border-b border-orange-300/20 p-4">
              <span className="font-bold">{p.name}</span>
              <span className="text-orange-50/75">{p.email}</span>
              <button className={`rounded-xl px-4 py-2 font-bold ${p.paid ? "bg-yellow-300 text-[#140900]" : "bg-orange-400 text-[#140900]"}`}>
                {p.paid ? "betaald" : "zet op betaald"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
