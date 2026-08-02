"use client";

import { create } from "zustand";
import type { GameState, ChatMessage, Color, Player } from "@/types/game";

interface GameStore extends GameState {
  setState: (s: Partial<GameState>) => void;
  addChat: (msg: ChatMessage) => void;
  setPlayer: (color: Color, player: Player) => void;
  reset: () => void;
}

const initial: GameState = {
  roomId: "",
  fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  turn: "white",
  status: "waiting",
  winner: null,
  moves: [],
  players: {},
  chat: [],
};

export const useGameStore = create<GameStore>((set) => ({
  ...initial,
  setState: (s) => set(s),
  addChat: (msg) => set((state) => ({ chat: [...state.chat, msg] })),
  setPlayer: (color, player) =>
    set((state) => ({ players: { ...state.players, [color]: player } })),
  reset: () => set(initial),
}));
