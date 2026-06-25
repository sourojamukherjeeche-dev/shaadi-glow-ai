import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const GLITTERS = Array.from({ length: 30 }, (_, i) => i);

export function Glitters() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {GLITTERS.map((i) => {
        const left = (i * 37) % 100;
        const delay = (i * 0.7) % 12;
        const duration = 9 + (i % 7);
        return (
          <span key={i}
            className="absolute bottom-0 w-1.5 h-1.5 rounded-full"
            style={{
              left: `${left}%`,
              background: "radial-gradient(circle, #FFD700, rgba(255,215,0,0))",
              boxShadow: "0 0 8px #FFD700",
              animation: `float-up ${duration}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

export function Bokeh() {
  const orbs = useMemo(() => [
    { size: 380, top: "10%", left: "5%", color: "rgba(201,149,108,0.18)" },
    { size: 280, top: "60%", left: "70%", color: "rgba(245,230,211,0.25)" },
    { size: 320, top: "30%", left: "80%", color: "rgba(232,180,184,0.18)" },
    { size: 220, top: "75%", left: "15%", color: "rgba(255,215,0,0.12)" },
  ], []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full blur-3xl"
          style={{ width: o.size, height: o.size, top: o.top, left: o.left, background: o.color }}
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
          transition={{ duration: 18 + i * 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v}{suffix}</>;
}
