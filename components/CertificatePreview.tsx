"use client";

import { useEffect, useRef, useState } from "react";
import { Confetti, type ConfettiRef } from "./confetti";

export default function CertificatePreview({ participant }: { participant: any }) {
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    async function generate() {
      setLoading(true);
      setPdfBlobUrl(null);

      const res = await fetch("/api/generatePdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(participant),
      });

      const { base64 } = await res.json();
      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const blob = new Blob([bytes], { type: "application/pdf" });
      objectUrl = URL.createObjectURL(blob);
      setPdfBlobUrl(objectUrl);
      setLoading(false);

      setTimeout(() => {
        confettiRef.current?.fire({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#f59e0b", "#fbbf24", "#fcd34d", "#d97706", "#ffffff", "#a78bfa"],
        });
      }, 100);
    }

    generate();

    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [participant]);

  return (
    <div className="w-full flex flex-col items-center gap-4 mb-8 relative">
      <Confetti
        ref={confettiRef}
        manualstart
        className="pointer-events-none fixed inset-0 z-50 size-full"
      />

      {loading && (
        <div className="flex flex-col items-center gap-3 py-10">
          <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-amber-950 text-sm">Generating certificate…</p>
        </div>
      )}
      {!loading && pdfBlobUrl && (
        <a
          href={pdfBlobUrl}
          download={`Certificate_${participant.Name}.pdf`}
          className="mt-2 max-w-sm px-6 py-3 rounded-xl font-bold text-amber-950
            shadow-lg transition-all text-center
            bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600
            hover:from-yellow-500 hover:to-yellow-700"
        >
          Download Certificate
        </a>
      )}
    </div>
  );
}
