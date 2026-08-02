import { Server as IOServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import { Chess } from "chess.js";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";

interface SocketServer extends HTTPServer {
  io?: IOServer;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

let io: IOServer | null = null;

const games = new Map<string, Chess>();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket) {
    res.status(500).end();
    return;
  }
  const socket = res.socket as unknown as SocketWithIO;

  if (!socket.server.io) {
    io = new IOServer(socket.server, { path: "/api/socket", addTrailingSlash: false });
    socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("join", ({ roomId, name }: { roomId: string; name: string }) => {
        socket.join(roomId);
        if (!games.has(roomId)) games.set(roomId, new Chess());
        io!.to(roomId).emit("joined", { id: socket.id, name });
      });

      socket.on("move", ({ roomId, from, to, promotion }: { roomId: string; from: string; to: string; promotion?: string }) => {
        const game = games.get(roomId);
        if (!game) return;
        const move = game.move({ from, to, promotion });
        if (!move) return;
        io!.to(roomId).emit("state", {
          fen: game.fen(),
          turn: game.turn() === "w" ? "white" : "black",
          status: game.isCheckmate() ? "checkmate" : game.isStalemate() ? "stalemate" : game.isDraw() ? "draw" : game.inCheck() ? "check" : "playing",
          winner: game.isCheckmate() ? (game.turn() === "w" ? "black" : "white") : null,
          move: move.san,
        });
      });

      socket.on("chat", ({ roomId, text, senderName }: { roomId: string; text: string; senderName: string }) => {
        io!.to(roomId).emit("chat", { id: socket.id, senderName, text, timestamp: Date.now() });
      });

      socket.on("resign", ({ roomId, color }: { roomId: string; color: "white" | "black" }) => {
        io!.to(roomId).emit("state", { status: "resigned", winner: color === "white" ? "black" : "white" });
      });
    });
  }

  res.end();
}
