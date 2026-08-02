"use client";

import { useState, useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";
import { useGameStore } from "@/lib/store";

interface Props { roomId: string; playerName: string; }

export default function Chat({ roomId, playerName }: Props) {
  const chat = useGameStore((s) => s.chat);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const send = () => {
    if (!text.trim()) return;
    getSocket().emit("chat", { roomId, text, senderName: playerName });
    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2 mb-3 max-h-64">
        {chat.length === 0 && <p className="text-slate-500 text-sm">No messages yet...</p>}
        {chat.map((m) => (
          <div key={m.id} className="text-sm">
            <span className="font-semibold text-emerald-400">{m.senderName}: </span>
            <span className="text-slate-200">{m.text}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
          className="flex-1 bg-slate-700 px-3 py-2 rounded outline-none text-sm focus:ring-2 focus:ring-emerald-500"
        />
        <button onClick={send} className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded text-sm font-semibold">Send</button>
      </div>
    </div>
  );
}
