import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

type Toast = { id: number; text: string; tone: "success" | "info" };
let pushFn: ((t: Omit<Toast, "id">) => void) | null = null;
let idc = 0;

export function toast(text: string, tone: "success" | "info" = "success") {
  pushFn?.({ text, tone });
}

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);
  useEffect(() => {
    pushFn = (t) => {
      const id = ++idc;
      setItems((s) => [...s, { ...t, id }]);
      setTimeout(() => setItems((s) => s.filter((x) => x.id !== id)), 3800);
    };
    return () => { pushFn = null; };
  }, []);
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div key={t.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-full bg-[#2D1B3D] text-[#FFFFF0] shadow-2xl gold-border max-w-sm">
            {t.tone === "success"
              ? <CheckCircle2 size={18} className="text-[#FFD700]" />
              : <Info size={18} className="text-[#FFD700]" />}
            <p className="text-sm flex-1">{t.text}</p>
            <button onClick={() => setItems((s) => s.filter((x) => x.id !== t.id))} className="opacity-60 hover:opacity-100"><X size={14} /></button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
