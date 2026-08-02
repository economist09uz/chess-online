"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { getSocket } from "@/lib/socket";
import { useGameStore } from "@/lib/store";
import Chat from "@/components/Chat";
import MoveHistory from "@/components/MoveHistory";
import GameOverModal from "@/components/GameOverModal";

const Board = dynamic(() => import("@/components/Board"), { ssr: false });

export default function GameRoom() {
  const params = useParams();
  const roomId = params?.roomId as string;
  const [name] = useState(() => `Player${Math.floor(Math.random() * 1000)}`);
  const { setState, addChat } = useGameStore();

  useEffect(() => {
    const socket = getSocket();
    socket.emit("join", { roomId, name });

    socket.on("state", (s: any) => setState(s));
    socket.on("chat", (m: any) => addChat(m));
    socket.on("joined", (p: any) => console.log("joined", p));

    return () => {
      socket.off("state");
      socket.off("chat");
      socket.off("joined");
    };
  }, [roomId, name, setState, addChat]);

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-slate-800 rounded-2xl p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">♟️ Room: {roomId}</h1>
            <a href="/" className="text-sm text-slate-400 hover:text-white">← Home</a>
          </div>
          <Board roomId={roomId} playerName={name} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-800 rounded-2xl p-4">
            <h2 className="font-bold mb-3">Move history</h2>
            <MoveHistory />
          </div>
          <div className="bg-slate-800 rounded-2xl p-4 flex-1 min-h-[300px]">
            <h2 className="font-bold mb-3">Chat</h2>
            <Chat roomId={roomId} playerName={name} />
          </div>
        </div>
      </div>
      <GameOverModal />
    </main>
  );
}
