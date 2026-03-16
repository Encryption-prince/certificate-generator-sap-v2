"use client";
import { useState, useEffect } from "react";

export default function SearchBar({ onSelect }: { onSelect: (p: any) => void }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (!query.trim()) { setSuggestions([]); return; }
    fetch(`/api/searchParticipants?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then(setSuggestions);
  }, [query]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your full name"
        className="w-full p-4 rounded-xl border border-gray-300 text-amber-950 placeholder-gray-500
          transition-all duration-300 focus:outline-none focus:border-amber-500
          focus:ring-2 focus:ring-amber-400/40"
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-xl mt-1 overflow-hidden max-h-52 overflow-y-auto z-20">
          {suggestions.map((p, i) => (
            <li
              key={i}
              className="p-3 hover:bg-gray-100 cursor-pointer text-gray-800 text-left"
              onClick={() => { onSelect(p); setQuery(""); setSuggestions([]); }}
            >
              <span className="font-medium">{p.Name}</span>
              {p.College && <span className="text-gray-500 text-sm ml-2">— {p.College}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
