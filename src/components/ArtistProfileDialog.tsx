import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Instagram, MessageCircle, ShieldCheck, Star, X } from "lucide-react";
import { useState } from "react";
import type { Artist } from "@/lib/artists";
import { ChatDialog } from "./ChatDialog";
import { noorSay } from "./Noor";

export function ArtistProfileDialog({ artist, onClose, onBook }: { artist: Artist; onClose: () => void; onBook?: (a: Artist) => void }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const book = () => {
    if (onBook) { onBook(artist); return; }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="relative mx-auto my-6 max-w-5xl bg-[#FDF8F4] rounded-3xl overflow-hidden gold-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur grid place-items-center hover:bg-white">
          <X size={18} />
        </button>

        {/* banner */}
        <div className="h-44 relative overflow-hidden" style={{
          background: `linear-gradient(135deg, ${artist.palette.from}, ${artist.palette.to})`,
        }}>
          <div className="absolute inset-0 opacity-30" style={{
            background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            animation: "shimmer-sweep 5s linear infinite",
          }} />
          <div className="absolute inset-0 flex items-end justify-between p-6">
            <div className="text-[#FFFFF0]">
              <p className="font-display italic text-sm tracking-widest opacity-90">✦ ShaadiGlow Verified ✦</p>
              <h2 className="font-display text-4xl md:text-5xl">{artist.name}</h2>
              <p className="italic text-sm opacity-90 mt-1">"{artist.tagline}"</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* stats */}
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F5E6D3]"><Star size={14} className="fill-[#B8860B] text-[#B8860B]" /> {artist.rating} · {artist.bookings} bookings</span>
              <span className="px-3 py-1.5 rounded-full bg-[#F5E6D3]">📍 {artist.area}</span>
              <a href={`https://instagram.com/${artist.handle}`} target="_blank" rel="noreferrer"
                 className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#C9956C] to-[#B8860B] text-[#FFFFF0] hover:scale-105 transition">
                <Instagram size={14} /> @{artist.handle} ({artist.followers}) ↗
              </a>
            </div>

            {/* Noor insight */}
            <div className="glass gold-border rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="text-xs uppercase tracking-widest text-[#C9956C] font-semibold">Noor's recommendation</div>
                <div className="ml-auto text-3xl font-display text-[#B8860B]">{artist.matchScore}<span className="text-sm text-[#2D1B3D]/60">/100</span></div>
              </div>
              <h4 className="font-display text-xl mt-1 mb-3">Why Noor recommends {artist.name.split(" ")[0]}</h4>
              <ul className="space-y-1.5 text-sm">
                {artist.noorWhy.map((w) => (
                  <li key={w} className="flex gap-2"><span className="text-[#C9956C]">✦</span> {w}</li>
                ))}
              </ul>
            </div>

            {/* Reliability */}
            <div>
              <h4 className="font-display text-xl mb-3">Reliability Index</h4>
              <div className="space-y-2.5">
                {[
                  ["Booking Completion", artist.reliability],
                  ["On-Time Arrival", Math.min(100, artist.reliability + 1)],
                  ["Response Rate", 99],
                  ["Review Consistency", Math.min(100, artist.reliability - 1)],
                ].map(([l, v]) => (
                  <div key={l as string}>
                    <div className="flex justify-between text-xs text-[#2D1B3D]/70 mb-1"><span>{l}</span><span>{v}%</span></div>
                    <div className="h-2 bg-[#F5E6D3] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#C9956C] to-[#B8860B]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Packages */}
            <div>
              <h4 className="font-display text-xl mb-3">Transparent Pricing</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {artist.packages.map((p) => (
                  <div key={p.name} className="bg-[#FFFFF0] gold-border rounded-2xl p-4">
                    <p className="font-display text-lg">{p.name}</p>
                    <p className="text-2xl font-display text-[#B8860B] mt-1">₹{p.price.toLocaleString("en-IN")}</p>
                    <ul className="mt-2 text-xs text-[#2D1B3D]/80 space-y-1">
                      {p.details.map((d) => <li key={d}>· {d}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <details className="mt-3 text-sm">
                <summary className="cursor-pointer text-[#C9956C] font-medium">Why this pricing?</summary>
                <p className="mt-2 text-[#2D1B3D]/80 leading-relaxed">{artist.pricingWhy}</p>
              </details>
            </div>

            {/* Gallery */}
            <div>
              <h4 className="font-display text-xl mb-3">{artist.name.split(" ")[0]}'s Portfolio</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {artist.gallery.map((src, i) => (
                  <motion.button key={src + i}
                    whileHover={{ scale: 1.03 }}
                    className="aspect-[3/4] rounded-xl overflow-hidden gold-border bg-[#F5E6D3]"
                    onClick={() => setLightbox(src)}
                  >
                    <img src={src} alt={`${artist.name} portfolio ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </motion.button>
                ))}
              </div>
              <a href={`https://instagram.com/${artist.handle}`} target="_blank" rel="noreferrer"
                 className="mt-4 inline-flex items-center gap-2 text-sm text-[#C9956C] hover:underline">
                <Instagram size={16} /> Full wedding videos & reels on Instagram ↗
              </a>
            </div>

            {/* Reviews */}
            <div>
              <h4 className="font-display text-xl mb-3">Real Brides · Verified Reviews</h4>
              <div className="space-y-3">
                {artist.reviews.map((r) => (
                  <div key={r.name} className="bg-[#FFFFF0] gold-border rounded-2xl p-4">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <p className="font-medium">{r.name} <span className="text-xs text-[#2D1B3D]/60">· {r.area} · {r.date}</span></p>
                      <span className="flex items-center gap-0.5 text-xs text-[#B8860B] font-semibold">
                        ✓ Verified Booking
                      </span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#B8860B] text-[#B8860B]" />)}
                    </div>
                    <p className="text-sm mt-2 text-[#2D1B3D]/85 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <aside className="md:sticky md:top-4 md:self-start space-y-3">
            <div className="bg-[#2D1B3D] text-[#FFFFF0] rounded-2xl p-5">
              <p className="font-display text-2xl">Book {artist.name.split(" ")[0]}</p>
              <p className="text-xs text-[#F5E6D3]/80 mt-1">Estimated range</p>
              <p className="text-3xl font-display text-[#FFD700] mt-1">₹{artist.priceMin.toLocaleString("en-IN")}–₹{artist.priceMax.toLocaleString("en-IN")}</p>
              <div className="mt-4 p-3 bg-white/5 rounded-xl text-xs space-y-1">
                <p className="text-[#FFD700]">🛡️ Your backup is assigned</p>
                <p className="opacity-80">Activated within 2 hours if anything goes wrong.</p>
              </div>
              <button onClick={() => setChatOpen(true)}
                className="mt-4 w-full py-2.5 rounded-full border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 transition flex items-center justify-center gap-2 text-sm">
                <MessageCircle size={16} /> Message {artist.name.split(" ")[0]} First
              </button>
              <button onClick={book}
                className="mt-2 w-full btn-shimmer py-3 rounded-full font-semibold text-sm">
                Book Now →
              </button>
              <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] text-center text-[#F5E6D3]/80">
                <div><ShieldCheck size={16} className="mx-auto mb-1 text-[#FFD700]" />Escrow</div>
                <div><CheckCircle2 size={16} className="mx-auto mb-1 text-[#FFD700]" />Backup</div>
                <div><Instagram size={16} className="mx-auto mb-1 text-[#FFD700]" />Verified</div>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>

      <AnimatePresence>
        {chatOpen && <ChatDialog artist={artist} onClose={() => setChatOpen(false)} />}
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 grid place-items-center p-4"
            onClick={() => setLightbox(null)}
          >
            <img src={lightbox} alt="" className="max-h-[92vh] max-w-full rounded-2xl shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
