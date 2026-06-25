import { motion } from "framer-motion";
import { Check, CheckCircle2, Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "./Toaster";

export function ArtistApplyDialog({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [yrs, setYrs] = useState("");
  const [city, setCity] = useState("");
  const [insta, setInsta] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneOk = /^[6-9]\d{9}$/.test(phone);
  const ok = name.trim().length >= 2 && emailOk && phoneOk && yrs && city;

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      toast("Application received! Our team will reach out within 48 hours 💕");
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md grid place-items-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-[#FDF8F4] w-full max-w-md rounded-3xl gold-border shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-gradient-to-r from-[#2D1B3D] to-[#4a2e5e] text-[#FFFFF0] flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#FFD700]">For Artists</p>
            <p className="font-display text-xl">Join ShaadiGlow</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10" aria-label="Close"><X size={18} /></button>
        </div>
        {done ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#C9956C] to-[#B8860B] grid place-items-center mb-4">
              <CheckCircle2 size={36} className="text-white" />
            </div>
            <h3 className="font-display text-2xl">Thank you, {name.split(" ")[0]}! ✨</h3>
            <p className="text-sm text-[#2D1B3D]/70 mt-2">
              Our team will reach out within <b>48 hours</b> to schedule your portfolio review and verification call.
            </p>
            <button onClick={onClose} className="mt-5 btn-shimmer px-6 py-2.5 rounded-full text-sm font-semibold">Close</button>
          </div>
        ) : (
          <div className="p-5 space-y-3">
            <p className="text-sm text-[#2D1B3D]/75">
              Tell us about yourself — our verification team will review your portfolio and reach out within 48 hours.
            </p>
            <Input label="Full name" value={name} onChange={setName} placeholder="Your full name" />
            <Input label="Email" value={email} onChange={setEmail} placeholder="you@studio.com" type="email" valid={email.length > 0 ? emailOk : undefined} />
            <Input label="Mobile (India)" value={phone} onChange={(v) => setPhone(v.replace(/\D/g, "").slice(0, 10))} placeholder="98XXXXXXXX" valid={phone.length > 0 ? phoneOk : undefined} />
            <div className="grid grid-cols-2 gap-2">
              <SelectField label="Experience" value={yrs} onChange={setYrs} options={["1-3 yrs", "3-5 yrs", "5-10 yrs", "10+ yrs"]} />
              <SelectField label="Primary city" value={city} onChange={setCity} options={["South Delhi", "Gurgaon", "Noida", "West Delhi", "East Delhi", "Other NCR"]} />
            </div>
            <Input label="Instagram handle (optional)" value={insta} onChange={setInsta} placeholder="@yourhandle" />
            <button disabled={!ok || submitting} onClick={submit}
              className="mt-3 w-full btn-shimmer py-3 rounded-full font-semibold text-sm disabled:opacity-40">
              {submitting ? <><Loader2 className="animate-spin inline mr-2" size={14} />Submitting...</> : "Submit application →"}
            </button>
            <p className="text-[10px] text-center text-[#2D1B3D]/50">Our team will contact you shortly to verify your portfolio.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text", valid }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; valid?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-[#C9956C] font-semibold">{label}</label>
      <div className={`mt-1 flex items-center px-3.5 py-2.5 rounded-xl bg-white border-2 transition ${
        valid === false ? "border-red-400" : valid === true ? "border-emerald-400"
        : "border-[#C9956C]/30 focus-within:border-[#B8860B]"
      }`}>
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm" />
        {valid === true && <Check size={14} className="text-emerald-500" />}
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-[#C9956C] font-semibold">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white border-2 border-[#C9956C]/30 focus:border-[#B8860B] focus:outline-none text-sm">
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
