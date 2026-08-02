"use client";

import { useState, useMemo } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { getSocket } from "@/lib/socket";
import { useGameStore } from "@/lib/store";
import { getLegalMoves } from "@/lib/chess";

interface Props {
  roomId: string;
  playerName: string;
}

export default function Board({ roomId, playerName }: Props) {
  const fen = useGameStore((s) => s.fen);
  const turn = useGameStore((s) => s.turn);
  const status = useGameStore((s) => s.status);
  const [optionSquares, setOptionSquares] = useState<Record<string, React.CSSProperties>>({});
  const [pendingPromotion, setPendingPromotion] = useState<{ from: string; to: string } | null>(null);

  const game = useMemo(() => new Chess(fen), [fen]);

  const onPieceDragBegin = (piece: string, sourceSquare: string) => {
    if (status !== "playing" && status !== "check") return;
    const moves = getLegalMoves(game, sourceSquare as any);
    const styles: Record<string, React.CSSProperties> = {};
    moves.forEach((to) => {
      styles[to] = {
        background: game.get(to as any) ? "radial-gradient(circle, rgba(0,0,0,0.1) 85%, transparent 85%)" : "radial-gradient(circle, rgba(0,0,0,0.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    });
    setOptionSquares(styles);
  };

  const isPromotion = (from: string, to: string): boolean => {
    const piece = game.get(from as any);
    if (!piece || piece.type !== "p") return false;
    if (piece.color === "w" && to[1] === "8") return true;
    if (piece.color === "b" && to[1] === "1") return true;
    return false;
  };

  const onPieceDrop = (from: string, to: string, piece: string) => {
    setOptionSquares({});
    if (status === "waiting" || status === "checkmate" || status === "stalemate" || status === "draw" || status === "resigned") return false;
    if ((turn === "white" && !piece.startsWith("w")) || (turn === "black" && !piece.startsWith("b"))) return false;
    if (isPromotion(from, to)) {
      setPendingPromotion({ from, to });
      return false;
    }
    getSocket().emit("move", { roomId, from, to });
    return true;
  };

  const completePromotion = (piece: "q" | "r" | "b" | "n") => {
    if (!pendingPromotion) return;
    getSocket().emit("move", { roomId, from: pendingPromotion.from, to: pendingPromotion.to, promotion: piece });
    setPendingPromotion(null);
  };

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-slate-400">Turn:</span>
        <span className="font-semibold capitalize">{turn === "white" ? "♔ White" : "♚ Black"} {status === "check" && <span className="text-rose-400 ml-2">CHECK!</span>}</span>
      </div>
      <div className="w-full max-w-[600px] mx-auto">
        <Chessboard
          position={fen}
          onPieceDragBegin={onPieceDragBegin as any}
          onPieceDrop={onPieceDrop as any}
          customSquareStyles={optionSquares}
          customDarkSquareStyle={{ backgroundColor: "#b58863" }}
          customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
          boardWidth={560}
        />
      </div>
      {pendingPromotion && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="font-bold mb-3 text-center">Promote to:</h3>
            <div className="flex gap-2">
              {([["q", "♕"], ["r", "♖"], ["b", "♗"], ["n", "♘"]] as const).map(([p, sym]) => (
                <button key={p} onClick={() => completePromotion(p)} className="bg-slate-700 hover:bg-slate-600 w-14 h-14 rounded text-3xl">{sym}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
