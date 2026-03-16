"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import CertificatePreview from "@/components/CertificatePreview";

export default function Home() {
  const [participant, setParticipant] = useState<any>(null);

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-transparent overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-radial" />

      <header className="w-full p-5 backdrop-blur-lg bg-white/60 shadow-sm border-b border-white/60 flex justify-center">
        <img src="/sap-logo.png" alt="SAP Community Kolkata" className="h-20 sm:h-24" />
      </header>

      <main className="mt-10 w-full flex justify-center">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 w-[min(90%,420px)] text-center shadow-xl">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 drop-shadow-lg">
            Certificate Portal
          </h1>
          <p className="text-gray-600 text-sm mt-2 mb-6">
            SAP Community Kolkata 2026
            <br />
            Mini Session 02
          </p>
          <SearchBar onSelect={setParticipant} />
        </div>
      </main>

      {participant && (
        <div className="w-full flex justify-center mt-6">
          <CertificatePreview participant={participant} />
        </div>
      )}
    </div>
  );
}
