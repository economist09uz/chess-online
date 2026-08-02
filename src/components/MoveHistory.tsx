"use client";

import { useGameStore } from "@/lib/store";

export default function MoveHistory() {
  const moves = useGameStore((s) => s.moves);

  const pairs: { num: number; white?: string; black?: string }[] = [];
  for (let i = 0; i < moves.length; i += 2) {
    pairs.push({ num: i / 2 + 1, white: moves[i], black: moves[i + 1] });
  }

  return (
    <div className="max-h-64 overflow-y-auto scrollbar-thin">
      {pairs.length === 0 ? (
        <p className="text-slate-500 text-sm">No moves yet.</p>
      ) : (
        <table className="w-full text-sm">
          <tbody>
            {pairs.map((p) => (
              <tr key={p.num} className="border-b border-slate-700 last:border-0">
                <td className="py-1 text-slate-500 w-8">{p.num}.</td>
                <td className="py-1 font-mono">{p.white}</td>
                <td className="py-1 font-mono">{p.black || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
