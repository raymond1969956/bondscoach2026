import Link from "next/link";
import { Trophy } from "lucide-react";

export default function Header() {
  return (
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
        <Link href="/klassement">Klassement</Link>
        <Link href="/spelregels">Spelregels</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/betalen" className="rounded-xl bg-orange-400 px-4 py-2 font-bold text-[#140900]">
          Doe mee
        </Link>
      </nav>
    </header>
  );
}
