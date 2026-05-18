import Link from "next/link";
import { Trophy, Home, ListOrdered, PencilLine, Info, Star } from "lucide-react";

export default function Header() {
  return (
    <>
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-400 text-[#140900]">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold leading-tight">Bondscoach2026</p>
            <p className="text-xs text-orange-100/75">oranje. gezelligheid. strijd.</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-orange-50/90 md:flex">
          <Link href="/voorspellen">Voorspellen</Link>
          <Link href="/bonus">Bonus</Link>
          <Link href="/klassement">Klassement</Link>
          <Link href="/spelregels">Spelregels</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/betalen" className="rounded-xl bg-orange-400 px-4 py-2 font-bold text-[#140900]">
            Doe mee
          </Link>
        </nav>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-orange-300/20 bg-[#1a0d02]/95 px-3 py-2 backdrop-blur md:hidden">
        <div className="grid grid-cols-5 gap-2 text-xs text-orange-50/80">
          <Link href="/" className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 active:bg-orange-500/20">
            <Home className="h-5 w-5" />
            Home
          </Link>

          <Link href="/voorspellen" className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 active:bg-orange-500/20">
            <PencilLine className="h-5 w-5" />
            Voorspel
          </Link>

          <Link href="/bonus" className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 active:bg-orange-500/20">
  <Star className="h-5 w-5" />
  Bonus
</Link>

          <Link href="/klassement" className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 active:bg-orange-500/20">
            <ListOrdered className="h-5 w-5" />
            Stand
          </Link>

          <Link href="/spelregels" className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 active:bg-orange-500/20">
            <Info className="h-5 w-5" />
            Regels
          </Link>
        </div>
      </nav>
    </>
  );
}