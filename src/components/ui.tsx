"use client";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

export function Card({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={clsx(
      "rounded-xl border border-[var(--color-line)] bg-white shadow-[0_1px_2px_rgba(14,26,51,.04)]",
      className)}>
      {children}
    </div>
  );
}

export function Button({
  children, onClick, variant = "primary", disabled, className, type = "button",
}: {
  children: ReactNode; onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  disabled?: boolean; className?: string; type?: "button" | "submit";
}) {
  const styles = {
    primary: "bg-[var(--color-ink)] text-white hover:bg-[#1B2A4A] disabled:bg-[#9AA3B5]",
    ghost: "border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-paper)]",
    danger: "text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]",
  }[variant];
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={clsx(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium",
        "transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        styles, className)}>
      {children}
    </button>
  );
}

export function Badge({ children, tone = "neutral" }:
  { children: ReactNode; tone?: "neutral" | "accent" | "major" | "minor" }) {
  const styles = {
    neutral: "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border-[var(--color-line)]",
    accent: "bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-[#E4CDBE]",
    major: "bg-[#E8EDF7] text-[var(--color-ink)] border-[#C9D5EA]",
    minor: "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border-[var(--color-line)]",
  }[tone];
  return (
    <span className={clsx(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
      styles)}>
      {children}
    </span>
  );
}

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={clsx("h-4 w-4 animate-spin", className)} />;
}

export function SectionTitle({ eyebrow, title, sub }:
  { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          {eyebrow}
        </div>
      )}
      <h1 className="font-display text-3xl text-[var(--color-ink)]">{title}</h1>
      {sub && <p className="mt-1.5 text-sm text-[var(--color-ink-soft)]">{sub}</p>}
    </div>
  );
}
