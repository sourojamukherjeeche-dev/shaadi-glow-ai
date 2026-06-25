import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar, Check, CheckCircle2, CreditCard, Loader2, Lock,
  Mail, MapPin, Phone, Shield, Sparkles, X, Download
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Artist } from "@/lib/artists";
import { toast } from "./Toaster";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const LOCATIONS = ["South Delhi", "Gurgaon", "Noida", "West Delhi", "East Delhi", "Faridabad", "Central Delhi", "Destination (other)"];
const PAYMENTS = [
  { id: "upi", label: "UPI", sub: "GPay · PhonePe · Paytm", emoji: "📱" },
  { id: "card", label: "Credit / Debit Card", sub: "Visa · Mastercard · Rupay", emoji: "💳" },
  { id: "netbanking", label: "Net Banking", sub: "All major banks", emoji: "🏦" },
  { id: "wallet", label: "Wallet", sub: "Paytm · Mobikwik · Amazon Pay", emoji: "👛" },
];

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

export function BookingFlow({ artist, onClose }: { artist: Artist; onClose: () => void }) {
  const [step, setStep] = useState<Step>(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [weddingDate, setWeddingDate] = useState("");
  const [trialDate, setTrialDate] = useState("");
  const [slot, setSlot] = useState("");
  const [location, setLocation] = useState("");
  const [pkgIdx, setPkgIdx] = useState(0);
  const [pay, setPay] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [bookingId] = useState(() => "SG" + Math.random().toString(36).slice(2, 9).toUpperCase());

  const pkg = artist.packages[pkgIdx];
  const tax = Math.round(pkg.price * 0.18);
  const total = pkg.price + tax;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneOk = /^[6-9]\d{9}$/.test(phone);
  const nameOk = name.trim().length >= 2;

  const sendOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(code);
    toast(`Demo OTP sent: ${code}`, "info");
    setStep(1);
  };
  const verifyOtp = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      if (otp === sentOtp) {
        toast("Verified! Welcome to ShaadiGlow 💕");
        setStep(2);
      } else {
        toast("Wrong OTP — try the code shown above", "info");
      }
    }, 700);
  };
  const resendOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(code);
    toast(`New demo OTP: ${code}`, "info");
  };
  const pay_ = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep(5);
      toast(`🎊 ${artist.name} is officially yours!`);
    }, 1800);
  };

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => { otpRefs.current[0]?.focus(); }, [step]);

  const otpDigits = useMemo(() => otp.padEnd(6, " ").split("").slice(0, 6), [otp]);
  const setOtpDigit = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const arr = otp.split("");
    arr[i] = v;
    const next = arr.join("").slice(0, 6).replace(/\s/g, "");
    setOtp(next);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const stepLabels = ["Your details", "Verify", "When & where", "Package", "Payment", "Confirmed"];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md overflow-y-auto flex items-start sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="bg-[#FDF8F4] w-full sm:max-w-2xl min-h-screen sm:min-h-0 sm:rounded-3xl overflow-hidden gold-border shadow-2xl my-0 sm:my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 flex items-center gap-3 bg-gradient-to-r from-[#2D1B3D] to-[#4a2e5e] text-[#FFFFF0]">
          <Lock size={16} className="text-[#FFD700]" />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-[#FFD700]">Secure Booking · Escrow Protected</p>
            <p className="font-display text-lg truncate">Booking {artist.name}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10" aria-label="Close"><X size={18} /></button>
        </div>

        {/* progress */}
        <div className="px-5 pt-4">
          <div className="flex gap-1.5">
            {stepLabels.map((l, i) => (
              <div key={l} className="flex-1">
                <div className={`h-1.5 rounded-full transition-all ${i <= step ? "bg-gradient-to-r from-[#C9956C] to-[#B8860B]" : "bg-[#F5E6D3]"}`} />
                <p className={`mt-1 text-[10px] truncate transition ${i === step ? "text-[#B8860B] font-semibold" : "text-[#2D1B3D]/50"}`}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-6">
          <AnimatePresence mode="wait">
            {/* ---------- STEP 0: details ---------- */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-2xl mb-1">Let's start with the basics</h3>
                <p className="text-sm text-[#2D1B3D]/70 mb-5">We'll send you booking confirmation, reminders & receipts.</p>
                <div className="space-y-3">
                  <Field icon={<Sparkles size={16} />} label="Your name">
                    <input value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="Bride's name"
                      className="w-full bg-transparent outline-none text-sm" />
                  </Field>
                  <Field icon={<Mail size={16} />} label="Email" valid={emailOk} dirty={email.length > 0}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full bg-transparent outline-none text-sm" />
                  </Field>
                  <Field icon={<Phone size={16} />} label="Mobile (India)" valid={phoneOk} dirty={phone.length > 0}>
                    <span className="text-sm text-[#2D1B3D]/60 pr-1 border-r border-[#C9956C]/30 mr-2">+91</span>
                    <input value={phone} maxLength={10} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="98XXXXXXXX"
                      className="w-full bg-transparent outline-none text-sm tracking-wider" />
                  </Field>
                </div>
                <button
                  disabled={!emailOk || !phoneOk || !nameOk}
                  onClick={sendOtp}
                  className="mt-6 w-full btn-shimmer py-3 rounded-full font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                  Send OTP →
                </button>
              </motion.div>
            )}

            {/* ---------- STEP 1: OTP ---------- */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-2xl mb-1">Verify your mobile</h3>
                <p className="text-sm text-[#2D1B3D]/70 mb-4">Enter the 6-digit code we sent to <b>+91 {phone}</b></p>
                <div className="rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-900 px-3 py-2 mb-4">
                  🧪 Demo mode — your OTP is <b className="font-mono">{sentOtp}</b>
                </div>
                <div className="flex gap-2 justify-center mb-2">
                  {otpDigits.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      value={d.trim()}
                      onChange={(e) => setOtpDigit(i, e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Backspace" && !d.trim() && i > 0) otpRefs.current[i - 1]?.focus(); }}
                      maxLength={1} inputMode="numeric"
                      className="w-11 h-14 text-center text-xl font-display rounded-xl bg-white border-2 border-[#C9956C]/40 focus:border-[#B8860B] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 transition" />
                  ))}
                </div>
                <button onClick={resendOtp} className="text-xs text-[#C9956C] hover:underline mx-auto block mb-5">Didn't receive it? Resend</button>
                <div className="flex gap-2">
                  <button onClick={() => setStep(0)} className="flex-1 py-3 rounded-full border border-[#C9956C]/40 text-sm hover:bg-[#F5E6D3]">← Edit details</button>
                  <button onClick={verifyOtp} disabled={otp.length !== 6 || verifying}
                    className="flex-1 btn-shimmer py-3 rounded-full font-semibold text-sm disabled:opacity-40">
                    {verifying ? <Loader2 className="animate-spin inline" size={16} /> : "Verify →"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ---------- STEP 2: date + location ---------- */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-2xl mb-4">When & where?</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#C9956C] font-semibold flex items-center gap-1"><Calendar size={12} /> Wedding date</label>
                    <input type="date" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)}
                      min={new Date().toISOString().slice(0, 10)}
                      className="mt-2 w-full px-4 py-3 rounded-xl bg-white border-2 border-[#C9956C]/30 focus:border-[#B8860B] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#C9956C] font-semibold">Trial session</label>
                    <input type="date" value={trialDate} onChange={(e) => setTrialDate(e.target.value)}
                      min={new Date().toISOString().slice(0, 10)}
                      className="mt-2 w-full px-4 py-3 rounded-xl bg-white border-2 border-[#C9956C]/30 focus:border-[#B8860B] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30 text-sm" />
                    <p className="text-[10px] text-[#2D1B3D]/60 mt-1">{artist.name.split(" ")[0]} typically has slots in green dates · grey = booked</p>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#C9956C] font-semibold">Preferred trial time</label>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      {["9 AM", "12 PM", "3 PM", "6 PM"].map((t) => (
                        <button key={t} onClick={() => setSlot(t)}
                          className={`py-2.5 rounded-xl text-sm border-2 transition ${slot === t ? "border-[#B8860B] bg-gradient-to-br from-[#F5E6D3] to-[#FFFFF0] text-[#2D1B3D] font-semibold shadow-md" : "border-[#C9956C]/20 bg-white hover:border-[#C9956C]/50"}`}>
                          {slot === t && <Check size={12} className="inline -mt-0.5 mr-1 text-[#B8860B]" />}{t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#C9956C] font-semibold flex items-center gap-1"><MapPin size={12} /> Location</label>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {LOCATIONS.map((l) => (
                        <button key={l} onClick={() => setLocation(l)}
                          className={`py-2.5 px-3 rounded-xl text-xs border-2 transition text-left ${location === l ? "border-[#B8860B] bg-gradient-to-br from-[#F5E6D3] to-[#FFFFF0] font-semibold shadow-md" : "border-[#C9956C]/20 bg-white hover:border-[#C9956C]/50"}`}>
                          {location === l && <Check size={12} className="inline -mt-0.5 mr-1 text-[#B8860B]" />}{l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-full border border-[#C9956C]/40 text-sm hover:bg-[#F5E6D3]">← Back</button>
                  <button onClick={() => setStep(3)} disabled={!weddingDate || !trialDate || !slot || !location}
                    className="flex-1 btn-shimmer py-3 rounded-full font-semibold text-sm disabled:opacity-40">Continue →</button>
                </div>
              </motion.div>
            )}

            {/* ---------- STEP 3: package ---------- */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-2xl mb-4">Pick your package</h3>
                <div className="space-y-3">
                  {artist.packages.map((p, i) => (
                    <button key={p.name} onClick={() => setPkgIdx(i)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition ${pkgIdx === i ? "border-[#B8860B] bg-gradient-to-br from-[#F5E6D3] to-[#FFFFF0] shadow-lg" : "border-[#C9956C]/20 bg-white hover:border-[#C9956C]/50"}`}>
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {pkgIdx === i && <span className="w-5 h-5 rounded-full bg-[#B8860B] grid place-items-center"><Check size={12} className="text-white" /></span>}
                            <p className="font-display text-lg">{p.name}</p>
                          </div>
                          <ul className="mt-2 text-xs text-[#2D1B3D]/75 space-y-0.5">
                            {p.details.slice(0, 3).map((d) => <li key={d}>· {d}</li>)}
                          </ul>
                        </div>
                        <p className="font-display text-2xl text-[#B8860B]">{fmt(p.price)}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-2">
                  <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-full border border-[#C9956C]/40 text-sm hover:bg-[#F5E6D3]">← Back</button>
                  <button onClick={() => setStep(4)} className="flex-1 btn-shimmer py-3 rounded-full font-semibold text-sm">Review & Pay →</button>
                </div>
              </motion.div>
            )}

            {/* ---------- STEP 4: payment ---------- */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-2xl mb-4">Booking summary</h3>
                <div className="bg-white gold-border rounded-2xl p-4 text-sm space-y-1.5 mb-5">
                  <Row label="Artist" value={artist.name} />
                  <Row label="Package" value={pkg.name} />
                  <Row label="Wedding" value={new Date(weddingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} />
                  <Row label="Trial" value={`${new Date(trialDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · ${slot}`} />
                  <Row label="Location" value={location} />
                  <div className="border-t border-[#C9956C]/20 my-2" />
                  <Row label="Package" value={fmt(pkg.price)} />
                  <Row label="GST (18%)" value={fmt(tax)} />
                  <div className="flex justify-between font-display text-lg pt-1">
                    <span>Total</span><span className="text-[#B8860B]">{fmt(total)}</span>
                  </div>
                </div>
                <p className="text-xs uppercase tracking-widest text-[#C9956C] font-semibold mb-2 flex items-center gap-1"><CreditCard size={12} /> Payment method</p>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {PAYMENTS.map((p) => (
                    <button key={p.id} onClick={() => setPay(p.id)}
                      className={`p-3 rounded-xl border-2 text-left transition ${pay === p.id ? "border-[#B8860B] bg-gradient-to-br from-[#F5E6D3] to-[#FFFFF0] shadow-md" : "border-[#C9956C]/20 bg-white hover:border-[#C9956C]/50"}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{p.emoji}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold flex items-center gap-1">{p.label}
                            {pay === p.id && <Check size={12} className="text-[#B8860B]" />}
                          </p>
                          <p className="text-[10px] text-[#2D1B3D]/60 truncate">{p.sub}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="rounded-xl bg-[#F5E6D3] px-3 py-2 text-xs flex items-center gap-2 mb-5">
                  <Shield size={14} className="text-[#B8860B]" />
                  <span>Held in escrow. Released only after your trial.</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setStep(3)} disabled={processing} className="flex-1 py-3 rounded-full border border-[#C9956C]/40 text-sm hover:bg-[#F5E6D3]">← Back</button>
                  <button onClick={pay_} disabled={processing}
                    className="flex-[2] btn-shimmer py-3 rounded-full font-semibold text-sm disabled:opacity-60">
                    {processing
                      ? <><Loader2 className="animate-spin inline mr-2" size={14} />Processing securely...</>
                      : <>🔒 Pay {fmt(total)}</>}
                  </button>
                </div>
                <p className="text-[10px] text-center text-[#2D1B3D]/50 mt-3">Demo payment — no real charge. PCI-DSS · 256-bit encrypted.</p>
              </motion.div>
            )}

            {/* ---------- STEP 5: confirmation ---------- */}
            {step === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#C9956C] to-[#B8860B] grid place-items-center mb-4">
                  <CheckCircle2 size={44} className="text-white" />
                </motion.div>
                <h3 className="font-display text-3xl">You're booked! 🎊</h3>
                <p className="text-sm text-[#2D1B3D]/70 mt-1 mb-5">A confirmation email is on its way to <b>{email}</b></p>
                <div className="bg-white gold-border rounded-2xl p-5 text-left text-sm space-y-1.5 max-w-sm mx-auto">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#C9956C] font-semibold border-b border-[#C9956C]/20 pb-2 mb-2">
                    <span>Booking ID</span><span className="font-mono">{bookingId}</span>
                  </div>
                  <Row label="Artist" value={artist.name} />
                  <Row label="Package" value={pkg.name} />
                  <Row label="Trial" value={`${new Date(trialDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · ${slot}`} />
                  <Row label="Wedding" value={new Date(weddingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} />
                  <Row label="Location" value={location} />
                  <Row label="Paid" value={fmt(total)} highlight />
                  <Row label="Backup" value="Assigned · 2hr SLA" />
                </div>
                <div className="mt-5 flex gap-2 max-w-sm mx-auto">
                  <button onClick={() => window.print()} className="flex-1 py-3 rounded-full border border-[#C9956C]/40 text-sm hover:bg-[#F5E6D3] flex items-center justify-center gap-1">
                    <Download size={14} /> Receipt
                  </button>
                  <button onClick={onClose} className="flex-1 btn-shimmer py-3 rounded-full font-semibold text-sm">Done ✨</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({ icon, label, children, valid, dirty }: {
  icon: React.ReactNode; label: string; children: React.ReactNode; valid?: boolean; dirty?: boolean;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-[#C9956C] font-semibold">{label}</label>
      <div className={`mt-1.5 flex items-center gap-2 px-3.5 py-3 rounded-xl bg-white border-2 transition ${
        dirty && valid === false ? "border-red-400"
        : dirty && valid === true ? "border-emerald-400"
        : "border-[#C9956C]/30 focus-within:border-[#B8860B] focus-within:ring-2 focus-within:ring-[#FFD700]/30"
      }`}>
        <span className="text-[#C9956C]">{icon}</span>
        {children}
        {dirty && valid === true && <Check size={16} className="text-emerald-500" />}
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-[#2D1B3D]/60">{label}</span>
      <span className={highlight ? "font-display text-[#B8860B] font-semibold" : "font-medium text-right"}>{value}</span>
    </div>
  );
}
