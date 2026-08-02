import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chess Online",
  description: "Play chess online with friends in real time",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white min-h-screen">{children}</body>
    </html>
  );
}
