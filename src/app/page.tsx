"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function HomePage() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState("");

  const createGame = () => {
    const roomId = uuidv4().slice(0, 8);
    router.push(`/game/${roomId}?host=1`);
  };

  const joinGame = () => {
    if (joinCode.trim()) router.push(`/game/${joinCode.trim()}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-2 text-center">♟️ Chess Online</h1>
        <p className="text-slate-400 text-center mb-8">Play chess with friends in real time</p>

        <button
          onClick={createGame}
          className="w-full bg-emerald-600 hover:bg-emerald-500 transition py-3 rounded-lg font-semibold mb-4"
        >
          Create new game
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-slate-500 text-sm">or</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        <input
          type="text"
          placeholder="Enter room code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          className="w-full bg-slate-700 px-4 py-3 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={joinGame}
          disabled={!joinCode.trim()}
          className="w-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 transition py-3 rounded-lg font-semibold"
        >
          Join game
        </button>
      </div>
    </main>
  );
}
