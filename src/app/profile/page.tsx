"use client";

import { useState, useEffect } from "react";

interface Match {
  id: string;
  opponent: string;
  result: "win" | "loss" | "draw";
  date: string;
}

export default function ProfilePage() {
  const [name] = useState(() => localStorage.getItem("chess_name") || "Player");
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("chess_matches");
    if (stored) setMatches(JSON.parse(stored));
  }, []);

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <a href="/" className="text-sm text-slate-400 hover:text-white">← Home</a>
        <div className="bg-slate-800 rounded-2xl p-8 mt-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-3xl font-bold">
              {name[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-slate-400">Rating: 1200</p>
            </div>
          </div>
          <h2 className="font-bold mb-3">Recent matches</h2>
          {matches.length === 0 ? (
            <p className="text-slate-500">No matches yet — play a game to fill this list.</p>
          ) : (
            <ul className="space-y-2">
              {matches.map((m) => (
                <li key={m.id} className="bg-slate-700 p-3 rounded-lg flex justify-between">
                  <span>vs {m.opponent}</span>
                  <span className={m.result === "win" ? "text-emerald-400" : m.result === "loss" ? "text-rose-400" : "text-slate-400"}>
                    {m.result}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
