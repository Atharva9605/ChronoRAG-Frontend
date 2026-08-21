import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaalkram — Timeline-Aware RAG",
  description: "Side-by-side demo of naive RAG versus Kaalkram timeline-aware retrieval",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
