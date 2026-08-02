export type Color = "white" | "black";

export type GameStatus =
  | "waiting"
  | "playing"
  | "check"
  | "checkmate"
  | "stalemate"
  | "draw"
  | "resigned";

export interface Player {
  id: string;
  name: string;
  rating: number;
  color: Color;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
}

export interface GameState {
  roomId: string;
  fen: string;
  turn: Color;
  status: GameStatus;
  winner: Color | null;
  moves: string[];
  players: { white?: Player; black?: Player };
  chat: ChatMessage[];
}

export interface MovePayload {
  from: string;
  to: string;
  promotion?: "q" | "r" | "b" | "n";
}
