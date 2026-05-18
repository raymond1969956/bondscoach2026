import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bondscoach2026",
  description: "De gezelligste WK 2026 poule van Nederland.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
  <body className="bg-[#1a0d02] text-white">
    {children}
  </body>
</html>
  );
}
