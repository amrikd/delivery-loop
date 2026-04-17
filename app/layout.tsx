import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delivery Loop",
  description: "AI-native delivery event",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
        style={{ backgroundColor: "#0a0a0f" }}
      >
        <StarterNav />
        {children}
      </body>
    </html>
  );
}

/**
 * Starter chrome. Replace this with the designer's <Navbar /> once it ships.
 * Lives in layout.tsx (dev territory) — when the designer builds `components/Navbar.tsx`,
 * swap this function for `<Navbar />`.
 */
function StarterNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#1c1c24] bg-[#0a0a0f]/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-indigo-300"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 via-pink-500 to-cyan-500 text-[10px] font-bold">
            ↺
          </span>
          <span>Delivery Loop</span>
          <span className="ml-1 rounded-md border border-[#2a2a35] bg-[#141419] px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">
            v2
          </span>
        </Link>
        <div className="flex items-center gap-1 text-sm">
          <NavLink href="/" label="Home" />
          <NavLink href="/gallery" label="Gallery" />
          <NavLink href="/explore" label="Explore" />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-1.5 text-neutral-400 transition-colors hover:bg-[#141419] hover:text-white"
    >
      {label}
    </Link>
  );
}
