"use client";
import { useCallback, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { api } from "@/lib/api";
import type { Doc } from "@/lib/types";
import { Button, Card, Spinner } from "./ui";

export default function UploadCard({ onUploaded }: { onUploaded: (doc: Doc) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [drag, setDrag] = useState(false);

  const handle = useCallback(async (file: File | undefined) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setErr("Only PDF files are supported.");
      return;
    }
    setBusy(true); setErr("");
    try {
      const doc = await api.upload(file);
      onUploaded(doc);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [onUploaded]);

  return (
    <Card className="p-6">
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault(); setDrag(false);
          handle(e.dataTransfer.files?.[0]);
        }}
        className={`flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-10 text-center transition-colors ${
          drag
            ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
            : "border-[var(--color-line)] bg-[var(--color-paper)]"
        }`}
      >
        <Upload className="h-8 w-8 text-[var(--color-accent)]" />
        <div>
          <p className="font-display text-lg text-[var(--color-ink)]">Upload a book</p>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Text-native PDF only. Drop a file here or choose one.
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => handle(e.target.files?.[0])}
        />
        <Button onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? <><Spinner /> Uploading…</> : "Choose PDF"}
        </Button>
        {err && <p className="text-xs text-[var(--color-accent)]">{err}</p>}
      </div>
    </Card>
  );
}
