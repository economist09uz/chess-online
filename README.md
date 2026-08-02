# ♟️ Chess Online

Real-time 1v1 multiplayer chess with live chat. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features
- Standard 8x8 chess board, all pieces
- Full chess rules: castling, en passant, check, checkmate, promotion
- 1v1 online multiplayer with live move sync (Socket.IO)
- In-game chat between players
- Player profile with rating and match history
- Move history panel
- Game over modal (win / loss / draw / resign)

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- chess.js + react-chessboard
- Socket.IO
- Zustand

## Getting Started
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to play.

## Project Structure
```
src/
├── app/
│   ├── api/socket/        # Socket.IO server route
│   ├── game/[roomId]/     # Game room page
│   ├── profile/           # User profile
│   ├── layout.tsx
│   └── page.tsx           # Landing page
├── components/
│   ├── Board.tsx
│   ├── Chat.tsx
│   ├── GameInfo.tsx
│   ├── MoveHistory.tsx
│   └── PromotionModal.tsx
├── lib/
│   ├── chess.ts
│   ├── socket.ts
│   └── store.ts
└── types/
    └── game.ts
```

## License
MIT
