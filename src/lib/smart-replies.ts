import type { Artist } from "./artists";

type Group = { keys: string[]; reply: (a: Artist) => string };

export const GROUPS: Group[] = [
  {
    keys: ["price","cost","expensive","kitna","budget","affordable","cheap","worth","paisa","rate","how much","charges","fees"],
    reply: (a) => `I completely understand — and I love that you asked! ✨ My pricing reflects the full experience I provide, not just the makeup. At ₹${a.priceMin.toLocaleString("en-IN")}–₹${a.priceMax.toLocaleString("en-IN")} you're investing in hours of dedicated, personalised artistry on the most photographed day of your life. I'd love to do a trial so you can see the quality before committing — would that work for you? 🌸`,
  },
  {
    keys: ["trial","test","rehearsal","practice","try before","sample","demo","first see"],
    reply: () => `YES — I always recommend a trial! Honestly it's my favourite part of the bridal journey 💄✨ In our trial session (1.5–2hrs) we try your exact bridal look step by step, I note every product/shade that works for YOUR skin, you give feedback, we adjust — no surprises on wedding day! Want me to check available trial dates? 📅`,
  },
  {
    keys: ["skin","dusky","wheatish","fair","dark","oily","dry","acne","pigmentation","sensitive","allergic","reaction","marks","uneven","tone","complexion","breakout"],
    reply: (a) => `Thank you for sharing this — I always want to know your skin story before we meet! 💕 I work with ${a.skinTones.toLowerCase()}. Tell me a bit more about what your skin has been doing recently and I'll walk you through exactly what I'll use — and what I won't 🌸`,
  },
  {
    keys: ["natural","heavy","glam","traditional","minimal","dewy","smokey","bold","soft","classic","modern","bollywood","look","style","aesthetic","mood board","reference"],
    reply: (a) => `Ooh I love this direction! 🎨 ${a.specialty.split(" · ")[0]} is right in my wheelhouse — I've done many brides with this look. Got reference photos or a mood board? Attach right here — I'd love to see your vision before our trial! 📸`,
  },
  {
    keys: ["products","mac","charlotte tilbury","nars","airbrush","hd","huda","brand","cruelty","organic","vegan","kit","foundation"],
    reply: (a) => `Great question! 💄 My kit includes ${a.products}. Professional-grade only — they photograph better, last 12–16hrs no touch-ups, and I know exactly how each formula performs on Indian skin tones. Want my complete product list to review before trial? 📋`,
  },
  {
    keys: ["available","book","date","slot","january","february","march","april","may","june","july","august","september","october","november","december","this year","next year","confirm","reserve","hold my date","busy","full"],
    reply: () => `Let me check right now! 🗓️ For your wedding date the slot looks AVAILABLE ✅. To confirm on ShaadiGlow: 30% advance secures the slot (secure escrow 🔒), I'm dedicated ONLY to you on your date, and a backup artist is auto-assigned. Shall I block this for you? 💍`,
  },
  {
    keys: ["package","included","what do i get","full package","all functions","mehendi","haldi","combo","bundle","full service"],
    reply: (a) => `Love that you're thinking about the full picture! 💕 My most popular bundle is the ${a.packages.at(-1)!.name} at ₹${a.packages.at(-1)!.price.toLocaleString("en-IN")} — it covers your full wedding journey with one trusted artist. Want me to send the full breakdown? 🌸`,
  },
  {
    keys: ["hair","hairstyle","updo","braid","blowout","extensions","gajra","open hair","half up","hair colour","damaged","thin hair","frizzy"],
    reply: () => `Hair is half the bridal look and I take it seriously! 💇‍♀️✨ I offer bridal buns with gajra, side-swept waves, half-up half-down, structured updos with accessories, or open blow-dry with volume — all included in my bridal packages. Got a hair reference image? Share it and I'll confirm how to achieve it!`,
  },
  {
    keys: ["cancel","refund","policy","what if","postpone","reschedule","change date","backup","guarantee"],
    reply: () => `Valid question — I want you 100% secure 💕 Cancel 14+ days before: full refund ✅. 7–14 days: 50%. Within 7 days: non-refundable (I turn down other bookings for your date). Most important: ShaadiGlow assigns a backup artist from booking — emergency? Backup activates within 2 hours. Your day is always protected 🛡️`,
  },
  {
    keys: ["travel","come to","location","venue","home","at my place","outside delhi","destination","gurgaon","noida","faridabad","outstation","travel fee"],
    reply: (a) => `I come to you! 💕 Standard coverage: ${a.area}. I arrive 15min early with all equipment — nothing to arrange 🌸 What's your venue/area? I'll confirm travel details right away!`,
  },
  {
    keys: ["allergic","patch test","reaction","sensitive products","broke out","never worn","scared","will it suit"],
    reply: () => `Glad you told me — important to discuss before trial 💕 Full product list sent before we meet, trial includes a patch test on your inner arm, and hypoallergenic alternatives for every kit product. Your skin is my responsibility. Want my kit list now to check with your dermatologist? 📋`,
  },
  {
    keys: ["comparing","other artists","someone else","better price","talking to","not sure yet","deciding","why you"],
    reply: (a) => `Understandable — talk to a few! 💕 What sets my work apart: ${a.experience} of experience, speciality in ${a.specialty.split(" · ")[0]}, premium kit (${a.products.split(",")[0]}), and ${a.reliability}% reliability. I recommend a trial before deciding — no pressure till you love the mirror result 🪞💕`,
  },
];

export function findSmartReply(message: string, artist: Artist): string | null {
  const m = message.toLowerCase();
  for (const g of GROUPS) {
    if (g.keys.some((k) => m.includes(k))) return g.reply(artist);
  }
  return null;
}

export const DEFAULT_REPLY = (a: Artist) =>
  `Thank you so much for reaching out! 💕 I'd love to be part of your wedding journey. The fastest way for me to help is a quick trial — would you like me to share my next available dates? Meanwhile, anything specific you'd like to ask about my work or packages? 🌸`;
