import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Bubble = { id: number; text: string };
let bubbleId = 0;

const NoorFace = ({ size = 56 }: { size?: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className="drop-shadow-lg">
    <defs>
      <radialGradient id="noorBg" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#F5E6D3" />
        <stop offset="100%" stopColor="#C9956C" />
      </radialGradient>
      <linearGradient id="noorHair" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#1a0f0a" />
        <stop offset="100%" stopColor="#3a1f10" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#noorBg)" />
    {/* hair top */}
    <path d="M18 50 C 20 18, 80 18, 82 50 L 78 42 C 70 30, 30 30, 22 42 Z" fill="url(#noorHair)" />
    {/* face */}
    <ellipse cx="50" cy="58" rx="26" ry="30" fill="#D9A57A" />
    {/* maang tikka */}
    <circle cx="50" cy="30" r="3.2" fill="#FFD700" />
    <circle cx="50" cy="30" r="1.2" fill="#8B0000" />
    {/* eyes */}
    <ellipse cx="40" cy="56" rx="3.2" ry="2.2" fill="#2b1810" />
    <ellipse cx="60" cy="56" rx="3.2" ry="2.2" fill="#2b1810" />
    <circle cx="40.8" cy="55.4" r="0.8" fill="#fff" />
    <circle cx="60.8" cy="55.4" r="0.8" fill="#fff" />
    {/* brows */}
    <path d="M35 51 Q 40 49 45 51" stroke="#2b1810" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    <path d="M55 51 Q 60 49 65 51" stroke="#2b1810" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    {/* bindi */}
    <circle cx="50" cy="48" r="1.4" fill="#8B0000" />
    {/* nose */}
    <path d="M50 60 Q 49 65 50 67" stroke="#a87655" strokeWidth="0.8" fill="none" />
    {/* lips */}
    <path d="M44 73 Q 50 76 56 73 Q 50 71 44 73 Z" fill="#9B4853" />
    {/* jhumka left */}
    <circle cx="22" cy="62" r="3" fill="#FFD700" />
    <circle cx="22" cy="68" r="2" fill="#FFD700" />
    {/* jhumka right */}
    <circle cx="78" cy="62" r="3" fill="#FFD700" />
    <circle cx="78" cy="68" r="2" fill="#FFD700" />
  </svg>
);

export function NoorAvatar({ size = 72 }: { size?: number }) {
  return (
    <div
      className="relative rounded-full bg-gradient-to-br from-[#F5E6D3] to-[#C9956C] flex items-center justify-center"
      style={{ width: size, height: size, animation: "breathe 3s ease-in-out infinite, pulse-ring 2.4s ease-out infinite" }}
    >
      <NoorFace size={size - 8} />
    </div>
  );
}

const PAGE_BUBBLES: Record<string, string[]> = {
  hero: [
    "Namaste! I'm Noor 💕 Let me help you find your perfect bridal artist!",
    "Psst — scroll down and hover the artist cards to peek at their gallery ✨",
  ],
  artists: [
    "Click any artist to see her gallery, pricing and chat with her 📸",
    "Every artist is verified by me personally. No filters, no fakes 💎",
  ],
  planner: [
    "Yay!! This is my FAVOURITE thing to do. Let's build your roadmap 🎉",
  ],
  chat: [
    "This chat is protected by ShaadiGlow escrow — share anything safely 💬",
  ],
  booked: [
    "CONGRATULATIONS BRIDE!! 🎊 You're officially glowing up!",
  ],
};

let global: { push: (t: string) => void } | null = null;
export function noorSay(text: string) {
  global?.push(text);
}
export function noorSayPage(page: keyof typeof PAGE_BUBBLES) {
  const arr = PAGE_BUBBLES[page];
  if (arr) noorSay(arr[Math.floor(Math.random() * arr.length)]);
}

export function NoorFloating() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [dancing, setDancing] = useState(false);

  useEffect(() => {
    global = {
      push: (text: string) => {
        const id = ++bubbleId;
        setBubbles([{ id, text }]);
        if (text.includes("CONGRATULATIONS")) {
          setDancing(true);
          setTimeout(() => setDancing(false), 2400);
        }
        setTimeout(() => setBubbles((b) => b.filter((x) => x.id !== id)), 4800);
      },
    };
    const t = setTimeout(() => noorSayPage("hero"), 2500);
    return () => {
      global = null;
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="max-w-[260px] glass gold-border rounded-2xl rounded-br-sm px-4 py-3 text-sm text-[#2D1B3D] font-medium shadow-xl"
          >
            <div className="flex gap-2 items-start">
              <div className="flex-shrink-0"><NoorFace size={28} /></div>
              <p className="leading-snug">{b.text}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div
        className="pointer-events-auto cursor-pointer"
        style={dancing ? { animation: "happy-spin 1.2s ease-in-out 2" } : undefined}
        onClick={() => noorSay("I'm here to help! Try the planner or click any artist 💕")}
      >
        <NoorAvatar size={72} />
      </div>
    </div>
  );
}

/** Hero version: bigger Noor character */
export function NoorHero() {
  return (
    <div className="relative flex flex-col items-center" style={{ animation: "breathe 4s ease-in-out infinite" }}>
      <div className="relative">
        <NoorFace size={220} />
        {/* shimmering dupatta */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full opacity-60 blur-sm"
          style={{
            background: "linear-gradient(135deg, rgba(201,149,108,0.7), rgba(255,215,0,0.4), rgba(139,0,0,0.5))",
            animation: "dupatta 4s ease-in-out infinite",
          }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="mt-10 glass gold-border rounded-2xl px-5 py-3 max-w-xs text-center"
      >
        <p className="text-sm text-[#2D1B3D]">Namaste! I'm <span className="font-display italic text-[#C9956C]">Noor</span>. Let's find your perfect bridal artist 💕</p>
      </motion.div>
    </div>
  );
}
