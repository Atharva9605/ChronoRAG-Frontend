"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { BookOpen, GitCompare, Network, BarChart3, ListOrdered } from "lucide-react";

const NAV = [
  { href: "/", label: "Library", icon: BookOpen },
  { href: "/compare", label: "Compare", icon: GitCompare },
];

export default function Shell({ children, docId }:
  { children: React.ReactNode; docId?: string }) {
  const path = usePathname();
  const links = [
    ...NAV,
    ...(docId ? [
      { href: `/timeline/${docId}`, label: "Timeline", icon: ListOrdered },
      { href: `/graph/${docId}`, label: "Graph", icon: Network },
      { href: `/metrics/${docId}`, label: "Metrics", icon: BarChart3 },
    ] : []),
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-6 py-3.5">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-display text-xl font-semibold tracking-tight">Kaalkram</span>
            <span className="text-[11px] uppercase tracking-widest text-[var(--color-ink-soft)]">
              timeline-aware rag
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}
                className={clsx(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors",
                  path === href
                    ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                    : "text-[var(--color-ink-soft)] hover:bg-[var(--color-paper)]")}>
                <Icon className="h-3.5 w-3.5" />{label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="h-[3px] w-full bg-[var(--color-accent)]" />
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
