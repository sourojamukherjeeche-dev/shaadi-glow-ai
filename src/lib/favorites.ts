import { useEffect, useState } from "react";

const KEY = "shaadiglow_favorites";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

const listeners = new Set<() => void>();

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>(() => read());
  useEffect(() => {
    const sync = () => setFavs(read());
    listeners.add(sync);
    return () => { listeners.delete(sync); };
  }, []);
  const toggle = (id: string) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    listeners.forEach((l) => l());
    return next.includes(id);
  };
  return { favs, toggle, isFav: (id: string) => favs.includes(id) };
}
