import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Artist } from "@/lib/artists";
import { DEFAULT_REPLY, findSmartReply } from "@/lib/smart-replies";

type Msg = { id: number; from: "bride" | "artist"; text: string };
let mid = 0;

export function ChatDialog({ artist, onClose }: { artist: Artist; onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: ++mid, from: "artist", text: `Hi! I'm ${artist.name} 💕 So happy you reached out. Tell me about your wedding — date, functions, and the vibe you're dreaming of 🌸` },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { id: ++mid, from: "bride", text }]);
    setInput("");
    setTyping(true);
    const reply = findSmartReply(text, artist) ?? DEFAULT_REPLY(artist);
    const delay = 900 + Math.min(reply.length * 12, 2200);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: ++mid, from: "artist", text: reply }]);
    }, delay);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="bg-[#FDF8F4] w-full sm:max-w-md h-[88vh] sm:h-[640px] sm:rounded-3xl rounded-t-3xl flex flex-col overflow-hidden gold-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 flex items-center gap-3 border-b border-[#C9956C]/30 bg-gradient-to-r from-[#2D1B3D] to-[#4a2e5e] text-[#FFFFF0]">
          <div className="w-10 h-10 rounded-full grid place-items-center text-base font-display font-semibold"
               style={{ background: `linear-gradient(135deg, ${artist.palette.from}, ${artist.palette.to})`, color: "#2D1B3D" }}>
            {artist.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-lg leading-tight truncate">{artist.name}</p>
            <p className="text-[11px] text-[#F5E6D3]/80">@{artist.handle} · usually replies in {artist.responseHrs}h</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10"><X size={18} /></button>
        </div>
        <div className="px-3 py-2 bg-[#F5E6D3] text-[11px] text-[#2D1B3D] text-center border-b border-[#C9956C]/20">
          💬 This conversation is protected. ShaadiGlow secures all artist communications.
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-[#FDF8F4]">
          {msgs.map((m) => (
            <motion.div key={m.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.from === "bride" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                m.from === "bride"
                  ? "bg-[#2D1B3D] text-[#FFFFF0] rounded-2xl rounded-br-sm"
                  : "bg-[#F5E6D3] text-[#2D1B3D] rounded-2xl rounded-bl-sm gold-border"
              }`}>
                {m.text}
              </div>
            </motion.div>
          ))}
          <AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex justify-start">
                <div className="bg-[#F5E6D3] text-[#2D1B3D] rounded-2xl rounded-bl-sm px-4 py-3 gold-border flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i} className="w-2 h-2 rounded-full bg-[#C9956C]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={endRef} />
        </div>
        <div className="p-3 border-t border-[#C9956C]/30 flex gap-2 bg-[#FFFFF0]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about pricing, trials, availability..."
            className="flex-1 px-4 py-2.5 rounded-full border border-[#C9956C]/40 bg-white text-sm focus:outline-none focus:border-[#C9956C]"
          />
          <button onClick={send} className="btn-shimmer w-11 h-11 rounded-full grid place-items-center text-[#FFFFF0]">
            <Send size={18} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
