import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Calendar, CheckCircle2, ChevronDown, Heart, Instagram, MapPin,
  Pause, Play, Send, ShieldCheck, Sparkles, Star, Volume2, VolumeX
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ArtistProfileDialog } from "@/components/ArtistProfileDialog";
import { ArtistApplyDialog } from "@/components/ArtistApplyDialog";
import { BookingFlow } from "@/components/BookingFlow";
import { ChatDialog } from "@/components/ChatDialog";
import { Bokeh, Counter, Glitters } from "@/components/Decorations";
import { NoorFloating, noorSayPage } from "@/components/Noor";
import { Toaster, toast } from "@/components/Toaster";
import { useFavorites } from "@/lib/favorites";
import { ARTISTS, type Artist } from "@/lib/artists";
import heroVideo from "@/assets/hero.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShaadiGlow AI — Delhi's Luxurious Bridal Beauty Booking Platform" },
      { name: "description", content: "Delhi's only bridal platform with verified portfolios, direct artist chat, and a wedding-day backup guarantee. Meet Noor, your AI bridal guide." },
      { property: "og:title", content: "ShaadiGlow AI — Bridal Beauty Certainty Engine" },
      { property: "og:description", content: "Find your perfect Delhi bridal artist with verified galleries, transparent pricing, and a backup-artist guarantee." },
    ],
  }),
  component: Landing,
});

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
};

function Hero({ onArtistApply }: { onArtistApply: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current; if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  const toggleMute = () => {
    const v = videoRef.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
  };
  const togglePlay = () => {
    const v = videoRef.current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  const words = "Know Exactly What You'll Look Like. Before You Book.".split(" ");

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        src={heroVideo.url}
        autoPlay loop playsInline muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, rgba(45,27,61,0.82) 0%, rgba(45,27,61,0.55) 50%, rgba(201,149,108,0.5) 100%)",
      }} />
      <Bokeh />
      <Glitters />

      {/* Video controls — high-contrast pill bottom-right */}
      <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-20 flex gap-1.5 items-center bg-black/65 backdrop-blur-md rounded-full p-1.5 shadow-2xl border border-white/20">
        <button onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"} title={playing ? "Pause" : "Play"}
          className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 active:scale-95 grid place-items-center text-white transition focus:outline-none focus:ring-2 focus:ring-[#FFD700]">
          {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
        </button>
        <button onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"} title={muted ? "Unmute" : "Mute"}
          className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 active:scale-95 grid place-items-center text-white transition focus:outline-none focus:ring-2 focus:ring-[#FFD700]">
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-6">
        <div className="flex items-center gap-2 text-[#FFFFF0]">
          <Sparkles className="text-[#FFD700]" size={22} />
          <span className="font-display text-2xl shimmer-text">ShaadiGlow AI</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-[#FFFFF0]/90">
          <a href="#artists" className="hover:text-[#FFD700] transition">Discover</a>
          <a href="#planner" className="hover:text-[#FFD700] transition">Noor Planner</a>
          <a href="#how" className="hover:text-[#FFD700] transition">How It Works</a>
          <a href="#promise" className="hover:text-[#FFD700] transition">The Promise</a>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onArtistApply}
            className="hidden md:block text-xs text-[#FFD700] px-3 py-2 rounded-full border border-[#FFD700]/50 hover:bg-[#FFD700]/10 transition">
            I'm an Artist
          </button>
          <button onClick={() => toast("Sign-in coming soon — book directly as a guest 💕", "info")}
            className="text-sm text-[#FFFFF0] px-4 py-2 rounded-full border border-[#FFFFF0]/40 hover:bg-white/10 transition">
            Sign In
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl px-6 md:px-12 pt-16 md:pt-24 pb-32">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-[#FFD700] font-display italic text-sm tracking-[0.3em] uppercase mb-5">
          ✦ Delhi's Premier Bridal Beauty Platform ✦
        </motion.p>
        <h1 className="font-display text-[#FFFFF0] text-5xl md:text-7xl leading-[1.05] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
          {words.map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.07, duration: 0.6 }}
              className="inline-block mr-3">{w}</motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          className="mt-6 text-[#F5E6D3] text-base md:text-lg max-w-xl leading-relaxed">
          Delhi's only bridal platform with video portfolios, direct artist chat, and a wedding-day backup guarantee.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}
          className="mt-8 flex flex-wrap gap-4">
          <a href="#artists" className="btn-shimmer px-7 py-3.5 rounded-full font-medium tracking-wide active:scale-95 transition">
            Find My Artist ✦
          </a>
          <a href="#planner" className="px-7 py-3.5 rounded-full border border-[#F5E6D3] text-[#F5E6D3] hover:bg-[#F5E6D3]/15 active:scale-95 transition">
            Build My Beauty Roadmap ✨
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute left-1/2 bottom-6 -translate-x-1/2 text-[#FFD700]"
        animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: "✨", title: "Tell Noor Your Vision", body: "Share your wedding date, skin type, budget, and dream look. Noor builds your personalised beauty roadmap instantly." },
    { icon: "▶", title: "See Real Work, Not Just Photos", body: "Browse verified galleries, watch real bridal sessions, and message artists directly — all before committing." },
    { icon: "🛡", title: "Book With Total Confidence", body: "Secure escrow payments. Backup artist on standby. Your dream look, guaranteed." },
  ];
  return (
    <section id="how" className="relative py-24 bg-[#FDF8F4] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: "repeating-linear-gradient(135deg, #C9956C 0 1px, transparent 1px 18px)",
      }} />
      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-[#C9956C] font-display italic tracking-widest text-xs uppercase">The Journey</p>
            <h2 className="font-display text-5xl mt-2 text-[#2D1B3D]">Your Bridal Beauty Journey</h2>
            <div className="divider-gold w-32 mx-auto my-4" />
            <p className="text-[#2D1B3D]/70 max-w-xl mx-auto">From overwhelmed to absolutely glowing — in three steps.</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <motion.div whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(201,149,108,0.4)" }}
                className="bg-[#FFFFF0] gold-border rounded-3xl p-8 h-full transition-shadow">
                <div className="w-14 h-14 grid place-items-center text-2xl rounded-2xl bg-gradient-to-br from-[#F5E6D3] to-[#C9956C] mb-5">
                  {s.icon}
                </div>
                <h3 className="font-display text-2xl mb-2 text-[#2D1B3D]">{s.title}</h3>
                <p className="text-sm text-[#2D1B3D]/75 leading-relaxed">{s.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIFeatures() {
  const items = [
    { title: "Noor Beauty Planner", body: "Your personalised 6-month bridal beauty roadmap. Month-by-month treatments, booking deadlines, product routines, and red-flag warnings." },
    { title: "AI Artist Match Engine", body: "92/100 match scores calculated from your skin tone, style, budget, location, and the artist's verified bride portfolio." },
    { title: "The Risk Advisor", body: "Noor warns you before you make a costly mistake. Wrong treatment timing. Overloaded artists. Booking too late in peak season." },
    { title: "Transparent Pricing", body: "Every price explained. Why does Artist A cost ₹20,000 and Artist B ₹60,000? We break it down. No surprises." },
  ];
  return (
    <section className="relative py-24 bg-[#2D1B3D] text-[#FFFFF0] overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, #FFD700 0%, transparent 40%), radial-gradient(circle at 80% 80%, #C9956C 0%, transparent 50%)",
      }} />
      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-[#FFD700] font-display italic tracking-widest text-xs uppercase">Powered by Noor</p>
            <h2 className="font-display text-5xl mt-2 shimmer-text">The Noor Intelligence Suite</h2>
            <div className="divider-gold w-32 mx-auto my-4" />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <motion.div whileHover={{ scale: 1.02, borderColor: "#FFD700" }}
                className="rounded-3xl p-7 border border-[#C9956C]/30 bg-white/[0.04] backdrop-blur transition">
                <h3 className="font-display text-2xl text-[#FFD700]">{f.title}</h3>
                <p className="mt-3 text-sm text-[#F5E6D3]/90 leading-relaxed">{f.body}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtistCard({ artist, onOpen, onChat }: { artist: Artist; onOpen: () => void; onChat: () => void }) {
  const { toggle, isFav } = useFavorites();
  const saved = isFav(artist.id);
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(201,149,108,0.5)" }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group bg-[#FFFFF0] gold-border rounded-3xl overflow-hidden cursor-pointer relative"
      onClick={onOpen}
    >
      <div className="relative h-64 overflow-hidden">
        <img src={artist.gallery[0]} alt={artist.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          <span className="bg-[#FFFFF0]/95 backdrop-blur text-[#B8860B] text-xs font-semibold px-2.5 py-1 rounded-full shadow">
            <Counter to={artist.matchScore} />/100 Match
          </span>
          <button onClick={(e) => {
              e.stopPropagation();
              const nowFav = toggle(artist.id);
              toast(nowFav ? `Saved ${artist.name.split(" ")[0]} to favorites ❤️` : "Removed from favorites");
            }}
            aria-label={saved ? "Remove from favorites" : "Save to favorites"}
            className="w-9 h-9 rounded-full bg-white/95 grid place-items-center hover:scale-110 active:scale-95 transition shadow-md">
            <Heart size={16} className={saved ? "fill-[#8B0000] text-[#8B0000]" : "text-[#2D1B3D]"} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-[#FFFFF0]">
          <p className="font-display text-2xl leading-tight drop-shadow-md">{artist.name}</p>
          <p className="text-xs opacity-90 flex items-center gap-1"><MapPin size={11} /> {artist.area}</p>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {artist.specialty.split(" · ").slice(0, 2).map((s) => (
            <span key={s} className="text-[10px] bg-[#F5E6D3] text-[#2D1B3D] px-2 py-1 rounded-full">{s}</span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-display text-[#B8860B] text-lg">₹{(artist.priceMin / 1000).toFixed(0)}k–₹{(artist.priceMax / 1000).toFixed(0)}k</span>
          <span className="flex items-center gap-1 text-xs text-[#2D1B3D]/70">
            <Star size={12} className="fill-[#B8860B] text-[#B8860B]" /> {artist.rating} · {artist.bookings}
          </span>
        </div>
        <div>
          <div className="flex justify-between text-[10px] text-[#2D1B3D]/60 mb-1">
            <span>Reliability</span><span>{artist.reliability}%</span>
          </div>
          <div className="h-1.5 bg-[#F5E6D3] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#C9956C] to-[#B8860B]" style={{ width: `${artist.reliability}%` }} />
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={(e) => { e.stopPropagation(); onChat(); }}
            className="flex-1 text-xs py-2 rounded-full border border-[#C9956C]/40 hover:bg-[#F5E6D3] active:scale-95 transition text-[#2D1B3D]">
            💬 Chat
          </button>
          <button onClick={(e) => { e.stopPropagation(); onOpen(); }}
            className="flex-1 btn-shimmer text-xs py-2 rounded-full font-medium active:scale-95 transition">
            View Profile →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Artists({ onOpen, onChat }: { onOpen: (a: Artist) => void; onChat: (a: Artist) => void }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => { if (inView) noorSayPage("artists"); }, [inView]);
  const { favs } = useFavorites();
  const [showFavsOnly, setShowFavsOnly] = useState(false);
  const list = showFavsOnly ? ARTISTS.filter((a) => favs.includes(a.id)) : ARTISTS;

  return (
    <section id="artists" ref={ref} className="relative py-24 bg-[#FDF8F4]">
      <Bokeh />
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-[#C9956C] font-display italic tracking-widest text-xs uppercase">Verified · Trusted · Loved</p>
            <h2 className="font-display text-5xl mt-2 text-[#2D1B3D]">Delhi's Most Trusted Bridal Artists</h2>
            <div className="divider-gold w-32 mx-auto my-4" />
            <p className="text-[#2D1B3D]/70">Handpicked, verified, and reviewed by real brides.</p>
          </div>
        </Reveal>
        <div className="flex justify-center mb-6 gap-2">
          <button onClick={() => setShowFavsOnly(false)}
            className={`px-4 py-2 rounded-full text-xs font-semibold border-2 transition ${!showFavsOnly ? "border-[#B8860B] bg-gradient-to-r from-[#F5E6D3] to-[#FFFFF0] text-[#2D1B3D] shadow-md" : "border-[#C9956C]/30 bg-white text-[#2D1B3D]/70 hover:border-[#C9956C]/60"}`}>
            All artists ({ARTISTS.length})
          </button>
          <button onClick={() => setShowFavsOnly(true)}
            className={`px-4 py-2 rounded-full text-xs font-semibold border-2 transition flex items-center gap-1 ${showFavsOnly ? "border-[#B8860B] bg-gradient-to-r from-[#F5E6D3] to-[#FFFFF0] text-[#2D1B3D] shadow-md" : "border-[#C9956C]/30 bg-white text-[#2D1B3D]/70 hover:border-[#C9956C]/60"}`}>
            <Heart size={12} className={favs.length ? "fill-[#8B0000] text-[#8B0000]" : ""} /> Favorites ({favs.length})
          </button>
        </div>
        {list.length === 0 ? (
          <div className="text-center py-16 text-[#2D1B3D]/60">
            <Heart size={32} className="mx-auto mb-3 opacity-40" />
            <p>No favorites yet. Tap the heart on any artist card to save them here.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {list.map((a, i) => (
              <Reveal key={a.id} delay={(i % 4) * 0.08}>
                <ArtistCard artist={a} onOpen={() => onOpen(a)} onChat={() => onChat(a)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Guarantee() {
  return (
    <section id="promise" className="relative bg-[#2D1B3D] text-[#FFFFF0] py-20 border-y border-[#B8860B]/40 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(110deg, transparent 30%, rgba(255,215,0,0.12) 50%, transparent 70%)",
        backgroundSize: "200% 100%",
        animation: "shimmer-sweep 6s linear infinite",
      }} />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-display text-5xl"><span className="shimmer-text">The ShaadiGlow Promise</span> 💍</h2>
          <p className="mt-6 text-lg text-[#F5E6D3] leading-relaxed">
            If your booked artist cancels within 7 days of your wedding, we activate your pre-assigned backup artist
            within <span className="text-[#FFD700] font-semibold">2 hours</span>. Your escrow is protected. Your day is protected.
            <br /><span className="italic">No other platform makes this promise. We do.</span>
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-2"><ShieldCheck className="text-[#FFD700]" size={20} /> Secure Escrow Payments</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="text-[#FFD700]" size={20} /> Backup Artist Guarantee</span>
            <span className="flex items-center gap-2"><Star className="text-[#FFD700]" size={20} /> Verified Portfolios Only</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function NoorPlanner() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => { if (inView) noorSayPage("planner"); }, [inView]);

  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [skin, setSkin] = useState("");
  const [budget, setBudget] = useState(80000);
  const [look, setLook] = useState("");
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setDone(true); toast("Your roadmap is ready! ✨"); }, 1800);
  };

  const months = [
    { label: "6 months out", todos: ["Book your trial", "Start hydration routine", "Identify your wedding artist"] },
    { label: "4 months out", todos: ["Begin facials (gentle)", "Confirm pre-bridal packages", "Lock down all function dates"] },
    { label: "2 months out", todos: ["Trial session ✨", "Finalise look brief", "Hair treatments only — no risky procedures"] },
    { label: "Wedding week", todos: ["Hydration + sleep", "No new products", "Confirm backup with ShaadiGlow"] },
  ];

  const SelectCard = ({ value, current, onClick, children }: {
    value: string; current: string; onClick: () => void; children: React.ReactNode;
  }) => {
    const sel = current === value;
    return (
      <button onClick={onClick}
        className={`relative py-4 px-3 rounded-2xl border-2 text-sm transition-all ${
          sel
            ? "border-[#B8860B] bg-gradient-to-br from-[#F5E6D3] to-[#FFFFF0] text-[#2D1B3D] font-semibold shadow-lg scale-[1.03]"
            : "border-[#C9956C]/25 bg-white text-[#2D1B3D] hover:border-[#C9956C]/60 hover:shadow-md"
        }`}>
        {sel && (
          <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#B8860B] grid place-items-center shadow">
            <CheckCircle2 size={12} className="text-white" />
          </span>
        )}
        {children}
      </button>
    );
  };

  return (
    <section id="planner" ref={ref} className="relative py-24 bg-gradient-to-b from-[#F5E6D3] to-[#FDF8F4] overflow-hidden">
      <Bokeh />
      <div className="relative max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-[#C9956C] font-display italic tracking-widest text-xs uppercase">Noor's Roadmap</p>
            <h2 className="font-display text-5xl mt-2 text-[#2D1B3D]">Your Noor Beauty Roadmap ✨</h2>
            <div className="divider-gold w-32 mx-auto my-4" />
            <p className="text-[#2D1B3D]/75 max-w-xl mx-auto">Tell me about your wedding and I'll build your personalised month-by-month beauty timeline.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-[#FFFFF0] gold-border rounded-3xl p-6 md:p-10 shadow-xl">
            {!done && !generating && (
              <>
                <div className="flex gap-2 mb-6">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? "bg-gradient-to-r from-[#C9956C] to-[#B8860B]" : "bg-[#F5E6D3]"}`} />
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div key="0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                      <h3 className="font-display text-2xl mb-4 text-[#2D1B3D]">When's the big day?</h3>
                      <div className="relative inline-block">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9956C] pointer-events-none" />
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                          min={new Date().toISOString().slice(0, 10)}
                          className="pl-10 pr-4 py-3 rounded-xl border-2 border-[#C9956C]/30 focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#FFD700]/30 bg-white text-[#2D1B3D]" />
                      </div>
                    </motion.div>
                  )}
                  {step === 1 && (
                    <motion.div key="1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                      <h3 className="font-display text-2xl mb-4 text-[#2D1B3D]">Tell me about your skin</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { v: "Dry", e: "💧" }, { v: "Oily", e: "✨" },
                          { v: "Combination", e: "🌗" }, { v: "Sensitive", e: "🌸" },
                        ].map((s) => (
                          <SelectCard key={s.v} value={s.v} current={skin} onClick={() => setSkin(s.v)}>
                            <p className="text-2xl mb-1">{s.e}</p>
                            <p className="font-display text-base">{s.v}</p>
                          </SelectCard>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                      <h3 className="font-display text-2xl mb-4 text-[#2D1B3D]">Your dream look</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                        {["Natural Dewy", "Soft Glam", "Traditional Heavy", "Minimalist", "Bollywood Glam", "Modern Fusion"].map((l) => (
                          <SelectCard key={l} value={l} current={look} onClick={() => setLook(l)}>{l}</SelectCard>
                        ))}
                      </div>
                      <label className="block text-sm font-medium mb-2 text-[#2D1B3D]">Budget per function: <span className="font-display text-[#B8860B]">₹{budget.toLocaleString("en-IN")}</span></label>
                      <input type="range" min={20000} max={300000} step={5000} value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full accent-[#B8860B]" />
                      <div className="flex justify-between text-[10px] text-[#2D1B3D]/60 mt-1">
                        <span>₹20k</span><span>₹3L</span>
                      </div>
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div key="3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="text-center py-6">
                      <h3 className="font-display text-2xl mb-3 text-[#2D1B3D]">Ready to generate? ✨</h3>
                      <p className="text-sm text-[#2D1B3D]/75 mb-6">Wedding: <b>{date || "—"}</b> · Skin: <b>{skin || "—"}</b> · Budget: <b>₹{budget.toLocaleString("en-IN")}</b> · Look: <b>{look || "—"}</b></p>
                      <button onClick={generate} className="btn-shimmer px-8 py-3 rounded-full font-medium active:scale-95 transition">Generate My Roadmap ✨</button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
                    className="text-sm text-[#2D1B3D]/60 disabled:opacity-30 hover:text-[#B8860B] transition">← Back</button>
                  {step < 3 && (
                    <button onClick={() => setStep(step + 1)}
                      disabled={(step === 0 && !date) || (step === 1 && !skin) || (step === 2 && !look)}
                      className="btn-shimmer px-6 py-2 rounded-full text-sm disabled:opacity-40 active:scale-95 transition">Next →</button>
                  )}
                </div>
              </>
            )}
            {generating && (
              <div className="py-16 text-center">
                <div className="inline-block animate-spin w-12 h-12 rounded-full border-4 border-[#C9956C] border-t-transparent mb-4" />
                <p className="font-display italic text-[#C9956C] text-lg">Noor is crafting your personalised roadmap...</p>
              </div>
            )}
            {done && (
              <div>
                <p className="font-display italic text-lg mb-6 text-[#2D1B3D]">"Aaaa okay! Based on your wedding, here's exactly what to do — and when 💕"</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {months.map((m) => (
                    <div key={m.label} className="bg-gradient-to-br from-[#F5E6D3] to-[#FFFFF0] rounded-2xl p-5 gold-border">
                      <p className="font-display text-xl text-[#B8860B]">{m.label}</p>
                      <ul className="mt-3 space-y-1.5 text-sm text-[#2D1B3D]">
                        {m.todos.map((t) => <li key={t} className="flex gap-2"><span className="text-[#C9956C]">✓</span> {t}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-sm">
                  <p className="font-medium text-amber-900">⚠️ Noor's Gentle Warning</p>
                  <p className="text-amber-800 mt-1">Avoid chemical peels or new facials in the final 3 weeks. Stick to what your skin already loves.</p>
                </div>
                <div className="mt-6 flex gap-3 flex-wrap">
                  <a href="#artists" className="btn-shimmer px-6 py-2.5 rounded-full text-sm active:scale-95 transition">Find artists in my budget →</a>
                  <button onClick={() => { setDone(false); setStep(0); }} className="px-6 py-2.5 rounded-full text-sm border border-[#C9956C]/40 hover:bg-[#F5E6D3] text-[#2D1B3D] transition">Start over</button>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const seeded = [
    { name: "Priya Khanna", area: "South Delhi", date: "Dec 2024", artist: "Chandni Singh",
      text: "I spent weeks on WedMeGood seeing the same filtered photos. On ShaadiGlow I could actually see Chandni's work on dusky skin like mine. I cried watching the gallery — that's exactly what I wanted. Booked her the same day." },
    { name: "Aisha Mirza", area: "Gurgaon", date: "Feb 2025", artist: "Noor Beauty Planner",
      text: "Noor literally told me I was about to book a chemical peel 3 weeks before my wedding. I had no idea that was risky! She saved my face. My skin was flawless on my wedding day." },
    { name: "Divya Sharma", area: "Noida", date: "Nov 2024", artist: "Backup Guarantee",
      text: "My first artist confirmed and then ghosted me 10 days before. ShaadiGlow activated my backup artist Guneet within 90 minutes. They literally saved my wedding." },
  ];
  const [extra, setExtra] = useState<typeof seeded>([]);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [text, setText] = useState("");

  const submit = () => {
    if (name.trim().length < 2 || text.trim().length < 10) {
      toast("Please add your name and a longer review", "info"); return;
    }
    setExtra((e) => [{ name, area: area || "Delhi NCR", date: "Today", artist: "ShaadiGlow", text }, ...e]);
    setName(""); setArea(""); setText("");
    toast("Thank you! Your review is live ❤️");
  };

  return (
    <section className="relative py-24 bg-[#FDF8F4] overflow-hidden">
      <Bokeh />
      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[#C9956C] font-display italic tracking-widest text-xs uppercase">Real Brides · Real Stories</p>
            <h2 className="font-display text-5xl mt-2 text-[#2D1B3D]">Real Brides. Real Glow.</h2>
            <div className="divider-gold w-32 mx-auto my-4" />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[...extra, ...seeded].slice(0, 6).map((r, i) => (
            <Reveal key={r.name + i} delay={i * 0.08}>
              <div className="bg-[#FFFFF0] gold-border rounded-3xl p-6 h-full">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-[#B8860B] text-[#B8860B]" />)}
                </div>
                <p className="text-sm leading-relaxed text-[#2D1B3D]/90">"{r.text}"</p>
                <div className="mt-5 pt-4 border-t border-[#C9956C]/20 text-xs">
                  <p className="font-display text-base text-[#2D1B3D]">{r.name}</p>
                  <p className="text-[#2D1B3D]/60">{r.area} · {r.date}</p>
                  <p className="text-[#C9956C] mt-1">{r.artist}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="bg-white gold-border rounded-3xl p-6 max-w-2xl mx-auto">
            <h3 className="font-display text-2xl text-[#2D1B3D] mb-1">Add your review</h3>
            <p className="text-xs text-[#2D1B3D]/60 mb-4">Help other brides — share your ShaadiGlow story.</p>
            <div className="grid sm:grid-cols-2 gap-2 mb-2">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                className="px-3 py-2.5 rounded-xl bg-white border-2 border-[#C9956C]/25 focus:border-[#B8860B] focus:outline-none text-sm" />
              <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area (e.g. South Delhi)"
                className="px-3 py-2.5 rounded-xl bg-white border-2 border-[#C9956C]/25 focus:border-[#B8860B] focus:outline-none text-sm" />
            </div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Tell us about your experience..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl bg-white border-2 border-[#C9956C]/25 focus:border-[#B8860B] focus:outline-none text-sm resize-none" />
            <div className="flex justify-between items-center mt-3">
              <p className="text-[10px] text-[#2D1B3D]/50">{text.length}/500 characters</p>
              <button onClick={submit} className="btn-shimmer px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 active:scale-95 transition">
                <Send size={13} /> Post review
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-24 overflow-hidden" style={{
      background: "linear-gradient(135deg, #C9956C, #B8860B, #C9956C)",
    }}>
      <Glitters />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-display text-5xl md:text-6xl text-[#FFFFF0]">Your Wedding Day Glow Starts Today</h2>
          <p className="mt-6 text-[#FFFFF0]/95">Join 2,400+ Delhi brides who found their perfect bridal artist on ShaadiGlow.</p>
          <a href="#planner" className="inline-block mt-8 bg-[#2D1B3D] text-[#FFD700] px-10 py-4 rounded-full font-medium border-2 border-[#FFD700] hover:scale-105 active:scale-95 transition">
            Start With Noor ✨
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ onArtistApply }: { onArtistApply: () => void }) {
  return (
    <footer className="bg-[#2D1B3D] text-[#F5E6D3]/85 py-14 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 text-sm">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Sparkles className="text-[#FFD700]" size={20} />
            <span className="font-display text-2xl shimmer-text">ShaadiGlow AI</span>
          </div>
          <p className="mt-3 italic">Delhi's Bridal Beauty Certainty Engine.</p>
        </div>
        <div>
          <p className="font-display text-[#FFD700] mb-3">For Brides</p>
          <ul className="space-y-1.5">
            <li><a href="#artists" className="hover:text-[#FFD700] transition">Discover Artists</a></li>
            <li><a href="#planner" className="hover:text-[#FFD700] transition">Noor Planner</a></li>
            <li><a href="#how" className="hover:text-[#FFD700] transition">How It Works</a></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-[#FFD700] mb-3">For Artists</p>
          <ul className="space-y-1.5">
            <li><button onClick={onArtistApply} className="hover:text-[#FFD700] transition text-left">Join ShaadiGlow</button></li>
            <li><a href="#promise" className="hover:text-[#FFD700] transition">Our Promise</a></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-[#FFD700] mb-3">Connect</p>
          <ul className="space-y-1.5">
            <li><a href="https://instagram.com/shaadiglowai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#FFD700] transition"><Instagram size={14} /> Instagram</a></li>
            <li>hello@shaadiglow.ai</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-[#C9956C]/20 text-xs text-center">
        © 2025 ShaadiGlow AI · Delhi NCR · Made with 💕 for every bride
      </div>
    </footer>
  );
}

function Landing() {
  const [openArtist, setOpenArtist] = useState<Artist | null>(null);
  const [chatArtist, setChatArtist] = useState<Artist | null>(null);
  const [bookArtist, setBookArtist] = useState<Artist | null>(null);
  const [artistApply, setArtistApply] = useState(false);

  return (
    <main className="bg-[#FDF8F4] text-[#2D1B3D] min-h-screen">
      <Hero onArtistApply={() => setArtistApply(true)} />
      <HowItWorks />
      <AIFeatures />
      <Artists onOpen={setOpenArtist} onChat={setChatArtist} />
      <Guarantee />
      <NoorPlanner />
      <Testimonials />
      <FinalCTA />
      <Footer onArtistApply={() => setArtistApply(true)} />
      <NoorFloating />
      <Toaster />
      <AnimatePresence>
        {openArtist && (
          <ArtistProfileDialog
            artist={openArtist}
            onClose={() => setOpenArtist(null)}
            onBook={(a) => { setOpenArtist(null); setBookArtist(a); }}
          />
        )}
        {chatArtist && <ChatDialog artist={chatArtist} onClose={() => setChatArtist(null)} />}
        {bookArtist && <BookingFlow artist={bookArtist} onClose={() => setBookArtist(null)} />}
        {artistApply && <ArtistApplyDialog onClose={() => setArtistApply(false)} />}
      </AnimatePresence>
    </main>
  );
}
