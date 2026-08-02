"use client";

import { useGameStore } from "@/lib/store";
import { getSocket } from "@/lib/socket";

export default function GameOverModal() {
  const status = useGameStore((s) => s.status);
  const winner = useGameStore((s) => s.winner);
  const roomId = useGameStore((s) => s.roomId);

  if (!["checkmate", "stalemate", "draw", "resigned"].includes(status)) return null;

  const title =
    status === "checkmate" ? (winner === "white" ? "♔ White wins!" : "♚ Black wins!") :
    status === "resigned" ? (winner === "white" ? "♔ White wins by resignation" : "♚ Black wins by resignation") :
    status === "stalemate" ? "Stalemate" : "Draw";

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-8 rounded-2xl text-center max-w-sm">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-slate-400 mb-6">Game over</p>
        <div className="flex gap-3">
          <a href="/" className="flex-1 bg-emerald-600 hover:bg-emerald-500 py-3 rounded-lg font-semibold">Home</a>
          <button onClick={() => window.location.reload()} className="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-lg font-semibold">Rematch</button>
        </div>
      </div>
    </div>
  );
}
