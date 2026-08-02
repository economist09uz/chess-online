import { Chess, Move, Square } from "chess.js";

export const createGame = () => new Chess();

export const getLegalMoves = (game: Chess, square: Square): string[] => {
  try {
    return game.moves({ square, verbose: true }).map((m: Move) => m.to);
  } catch {
    return [];
  }
};

export const isCheck = (game: Chess): boolean => game.inCheck();

export const isGameOver = (game: Chess): boolean => game.isGameOver();

export const moveToNotation = (game: Chess, from: string, to: string, promotion?: string): Move | null => {
  try {
    return game.move({ from, to, promotion: promotion as "q" | "r" | "b" | "n" | undefined });
  } catch {
    return null;
  }
};

export const gameStatus = (game: Chess): "playing" | "check" | "checkmate" | "stalemate" | "draw" => {
  if (game.isCheckmate()) return "checkmate";
  if (game.isStalemate()) return "stalemate";
  if (game.isDraw()) return "draw";
  if (game.inCheck()) return "check";
  return "playing";
};

export type { Chess, Move, Square };
