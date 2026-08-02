"use client";

import { useGameStore } from "@/lib/store";
import { getSocket } from "@/lib/socket";

export default function GameInfo({ roomId }: { roomId: string }) {
  const turn = useGameStore((s) => s.turn);
  const status = useGameStore((s) => s.status);

  return (
    <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between">
      <div>
        <p className="text-xs text-slate-400">Current turn</p>
        <p className="font-bold capitalize">{turn === "white" ? "♔ White" : "♚ Black"}</p>
      </div>
      {status === "playing" || status === "check" ? (
        <button onClick={() => getSocket().emit("resign", { roomId, color: turn })} className="bg-rose-600 hover:bg-rose-500 px-3 py-2 rounded text-sm font-semibold">Resign</button>
      ) : (
        <span className="text-slate-400 text-sm capitalize">{status}</span>
      )}
    </div>
  );
}
