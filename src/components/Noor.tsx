import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import noorImgUrl from "@/assets/noor.png";

type Bubble = { id: number; text: string };
let bubbleId = 0;

export function NoorAvatar({ size = 72 }: { size?: number }) {
  return (
    <div
      className="relative rounded-full overflow-hidden ring-2 ring-[#FFD700] shadow-[0_8px_24px_-4px_rgba(184,134,11,0.55)] bg-gradient-to-br from-[#F5E6D3] to-[#E8B4B8]"
      style={{ width: size, height: size, animation: "breathe 3.5s ease-in-out infinite" }}
    >
      <img
        src={noorImgUrl}
        alt="Noor — your AI bridal guide"
        width={size}
        height={size}
        className="w-full h-full object-cover object-top scale-110"
        loading="lazy"
      />
      <span
        className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white"
        title="Noor is online"
      />
    </div>
  );
}

const PAGE_BUBBLES: Record<string, string[]> = {
  hero: [
    "Namaste! I'm Noor 💕 Tap me anytime — I'll help you find your perfect bridal artist!",
    "Psst — try the Noor Planner to build your 6-month beauty roadmap ✨",
  ],
  artists: [
    "Click any artist to see her gallery, pricing and chat with her 📸",
    "Every artist is verified by me personally. No filters, no fakes 💎",
  ],
  planner: ["Yay!! This is my FAVOURITE thing. Let's build your roadmap 🎉"],
  chat: ["This chat is protected by ShaadiGlow escrow — share anything safely 💬"],
  booked: ["CONGRATULATIONS BRIDE!! 🎊 You're officially glowing up!"],
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    global = {
      push: (text: string) => {
        const id = ++bubbleId;
        setBubbles([{ id, text }]);
        setTimeout(() => setBubbles((b) => b.filter((x) => x.id !== id)), 5200);
      },
    };
    const t = setTimeout(() => noorSayPage("hero"), 2200);
    return () => {
      global = null;
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {(open || bubbles.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="max-w-[280px] bg-white gold-border rounded-2xl rounded-br-sm px-4 py-3 text-sm text-[#2D1B3D] font-medium shadow-2xl"
          >
            <div className="flex gap-2 items-start">
              <NoorAvatar size={32} />
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-[#C9956C] font-bold mb-0.5">Noor · AI Guide</p>
                <p className="leading-snug">
                  {bubbles[0]?.text ?? "Hi! I'm Noor 💕 Need help finding your perfect bridal artist, building a roadmap, or booking a trial?"}
                </p>
                {open && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <a href="#artists" onClick={() => setOpen(false)} className="text-[11px] px-2.5 py-1 rounded-full bg-[#F5E6D3] hover:bg-[#E8B4B8] transition">Find artists</a>
                    <a href="#planner" onClick={() => setOpen(false)} className="text-[11px] px-2.5 py-1 rounded-full bg-[#F5E6D3] hover:bg-[#E8B4B8] transition">Build roadmap</a>
                    <a href="#promise" onClick={() => setOpen(false)} className="text-[11px] px-2.5 py-1 rounded-full bg-[#F5E6D3] hover:bg-[#E8B4B8] transition">Our promise</a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        aria-label="Open Noor — AI bridal guide"
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#FFD700]/40 rounded-full"
      >
        <NoorAvatar size={68} />
      </button>
    </div>
  );
}
