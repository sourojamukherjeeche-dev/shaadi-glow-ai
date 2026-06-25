import g1 from "@/assets/g1.jpg.asset.json";
import g2 from "@/assets/g2.jpg.asset.json";
import g3 from "@/assets/g3.jpg.asset.json";
import g4 from "@/assets/g4.jpg.asset.json";
import g5 from "@/assets/g5.jpg.asset.json";
import g6 from "@/assets/g6.jpg.asset.json";
import g7 from "@/assets/g7.jpg.asset.json";
import g8 from "@/assets/g8.jpg.asset.json";
import g9 from "@/assets/g9.jpg.asset.json";

const G = [g1.url, g2.url, g3.url, g4.url, g5.url, g6.url, g7.url, g8.url, g9.url];

// Each artist gets a unique rotation of the 9 source images so galleries differ.
const gal = (start: number) =>
  Array.from({ length: 5 }, (_, i) => G[(start + i * 2) % G.length]);

export type Review = {
  name: string; area: string; date: string; rating: number;
  dims: { label: string; score: number }[]; text: string;
};

export type Artist = {
  id: string; name: string; handle: string; followers: string;
  area: string; specialty: string; experience: string; tagline: string;
  priceMin: number; priceMax: number; skinTones: string;
  products: string; credentials: string;
  matchScore: number; rating: number; bookings: number;
  reliability: number; responseHrs: number;
  palette: { from: string; to: string };
  gallery: string[];
  packages: { name: string; price: number; details: string[] }[];
  pricingWhy: string;
  reviews: Review[];
  noorWhy: string[];
};

const rev = (name: string, area: string, date: string, dims: [string, number][], text: string): Review => ({
  name, area, date, rating: 5,
  dims: dims.map(([label, score]) => ({ label, score })),
  text,
});

export const ARTISTS: Artist[] = [
  {
    id: "chandni-singh",
    name: "Chandni Singh",
    handle: "chandnisinghstudio",
    followers: "247K",
    area: "Hauz Khas, South Delhi",
    specialty: "Natural Luxury Glam · Minimalist Bridal · Airbrush",
    experience: "21+ years",
    tagline: "Understated elegance — enhance, not mask",
    priceMin: 25000, priceMax: 60000,
    skinTones: "All tones, esp Wheatish-Dusky",
    products: "MAC Pro, Charlotte Tilbury, Chanel, Hourglass, Kryolan",
    credentials: "Academy founder · Vogue India / Femina featured",
    matchScore: 96, rating: 4.9, bookings: 412, reliability: 98, responseHrs: 2,
    palette: { from: "#C9956C", to: "#FFFFF0" },
    gallery: gal(0),
    packages: [
      { name: "Bridal Day Package", price: 40000, details: ["1.5hr trial 6wks prior", "Wedding day makeup (3hrs)", "Hair styling included", "Premium products (Charlotte Tilbury, MAC Pro, Hourglass)", "Touch-up kit", "Travel included (South Delhi/Noida/Gurgaon)"] },
      { name: "Pre-Bridal Package", price: 15000, details: ["3 function makeups (Mehendi, Haldi, Sangeet)", "Hair included", "Travel included within NCR"] },
      { name: "Full Season Package", price: 50000, details: ["All Pre-Bridal + Bridal Day + Reception", "Saves vs individual bookings"] },
    ],
    pricingWhy: "Chandni uses international-grade products (Charlotte Tilbury runs ₹5,000+ per product), has 21 years of expertise, includes travel, and dedicates your wedding day entirely to you — no other bookings. The price reflects the full experience, not just the makeup.",
    reviews: [
      rev("Ritika Malhotra", "South Delhi", "Dec 2024", [["Look Accuracy",5],["Longevity",5],["Communication",5]],
        "Chandni understood exactly what I wanted — natural but stunning. She showed me 3 different base options before settling on the perfect one for my dusky skin. My photos look like they came out of a magazine. Everyone kept asking who did my makeup. Worth every rupee."),
      rev("Neha Jain", "Gurgaon", "Nov 2024", [["Look Accuracy",5],["Longevity",5],["Punctuality",5]],
        "I was worried because I have oily skin and it always looks greasy in photos. Chandni used airbrush for my base and I looked matte and glowing for 12 hours. She also did my mom and sister — everyone looked amazing."),
      rev("Simran Arora", "Noida", "Feb 2025", [["Overall",5]],
        "Booked Chandni 5 months in advance on Noor's advice — so glad I did! The trial session was incredible. The makeup lasted from 6am to midnight without touching up. Magical."),
    ],
    noorWhy: [
      "Perfect for brides who want luxury looks that still feel like themselves",
      "21+ years means she handles every skin emergency calmly",
      "One of only a handful in Delhi using true airbrush on Indian skin",
    ],
  },
  {
    id: "meenakshi-dutt",
    name: "Meenakshi Dutt",
    handle: "meenakshidutt",
    followers: "180K",
    area: "Central Delhi (pan-NCR + destination)",
    specialty: "Bold Sculpted Bridal · Celebrity Style · HD Makeup",
    experience: "25+ years",
    tagline: "Grand, high-definition, built for the spotlight",
    priceMin: 50000, priceMax: 100000,
    skinTones: "All tones, celebrity clientele",
    products: "MAC Pro, NARS, Bobbi Brown, Estée Lauder, Temptu Airbrush",
    credentials: "Meenakshi Dutt Makeovers · Bollywood celeb MUA · Delhi's oldest luxury MUA brand",
    matchScore: 94, rating: 4.9, bookings: 680, reliability: 99, responseHrs: 3,
    palette: { from: "#2D1B3D", to: "#B8860B" },
    gallery: gal(2),
    packages: [
      { name: "Signature Bridal Day", price: 85000, details: ["Personal consultation", "Trial session (2hrs)", "Wedding day (4hrs)", "Senior assistant included", "Premium HD kit", "Travel pan-NCR"] },
      { name: "Celebrity Full Season", price: 200000, details: ["All functions (Mehendi → Reception)", "Family makeup add-on", "Destination travel quoted separately"] },
    ],
    pricingWhy: "When you book Meenakshi, you're getting 25 years of bridal wisdom and celebrity-grade artistry. Her kit alone is worth lakhs, and she dedicates senior assistants exclusively to your wedding day.",
    reviews: [
      rev("Pooja Kapoor", "Defence Colony", "Jan 2025", [["Look Accuracy",5],["Camera Finish",5]],
        "When you book Meenakshi, you're not just getting makeup — you're getting 25 years of bridal wisdom. My photographer said she's worked with every MUA in Delhi and Meenakshi's work is always the most flawless on camera."),
      rev("Ayesha Khan", "Gurgaon", "Dec 2024", [["Longevity",5]],
        "Yes, she's expensive. But the moment I saw my reflection I stopped caring about the price. She sculpted my face into something I didn't know was possible. The look lasted 14 hours at a winter wedding."),
    ],
    noorWhy: [
      "The choice if you want a grand, sculpted, celebrity-bride look",
      "Unmatched 25-year track record on camera-heavy weddings",
      "Backed by Delhi's most established bridal academy",
    ],
  },
  {
    id: "parul-garg",
    name: "Parul Garg",
    handle: "parulgargmakeup",
    followers: "2.3M",
    area: "Gurgaon (NCR + destination)",
    specialty: "HD Bridal Makeup · Airbrush · Camera-Ready Looks",
    experience: "10+ years",
    tagline: "Clean, camera-ready beauty that photographs like a dream",
    priceMin: 60000, priceMax: 100000,
    skinTones: "All tones, esp HD on Fair-Wheatish",
    products: "Charlotte Tilbury, MAC, Huda Beauty, NARS, Makeup Forever",
    credentials: "2.3M IG followers · Founded academy · Top-5 NCR MUA",
    matchScore: 93, rating: 4.9, bookings: 540, reliability: 97, responseHrs: 4,
    palette: { from: "#F4C2C2", to: "#F5E6D3" },
    gallery: gal(4),
    packages: [
      { name: "HD Bridal Day", price: 80000, details: ["Trial + wedding day", "Airbrush base", "Hair styling", "Premium international kit", "Touch-up assistant"] },
      { name: "Full Wedding Series", price: 180000, details: ["All functions", "Family rates", "Destination quotes available"] },
    ],
    pricingWhy: "Parul is one of India's most-followed bridal MUAs for a reason — her kit is fully international, her airbrush technique is HD-camera ready, and her trial process is unmatched.",
    reviews: [
      rev("Tanya Mehta", "Gurgaon", "Nov 2024", [["Camera Finish",5]],
        "Parul is the most popular Delhi MUA on Instagram for a reason. She spent 30 minutes during our consultation just understanding my skin's history. My bridal day makeup was flawless in person AND on camera — which is so rare."),
      rev("Riya Sharma", "Faridabad", "Jan 2025", [["Look Accuracy",5]],
        "Booking was so easy, I could see her availability directly. The airbrush finish was literally like I had a filter on my face but in real life."),
    ],
    noorWhy: [
      "Best HD/airbrush finish in Delhi for camera-heavy weddings",
      "Her academy-trained team backs up every booking",
      "Most consistent Instagram-to-reality match in NCR",
    ],
  },
  {
    id: "guneet-virdi",
    name: "Guneet Virdi",
    handle: "guneetvirdi",
    followers: "850K",
    area: "South Delhi (NCR + destination)",
    specialty: "Airbrush Base · Modern-Indian · Effortlessly Royal",
    experience: "15+ years",
    tagline: "Flawless airbrush base, glowing skin, softly sculpted — effortlessly royal",
    priceMin: 35000, priceMax: 80000,
    skinTones: "All tones, esp Wheatish + Dusky w/ airbrush",
    products: "Temptu Airbrush, Charlotte Tilbury, Bobbi Brown, NARS, MAC",
    credentials: "London College of Makeup certified · Bombay Times feature",
    matchScore: 95, rating: 4.9, bookings: 380, reliability: 98, responseHrs: 3,
    palette: { from: "#A3B18A", to: "#C9956C" },
    gallery: gal(6),
    packages: [
      { name: "Royal Bridal Day", price: 65000, details: ["Trial + wedding makeup", "Hair + draping option", "Airbrush base", "Hypoallergenic alternatives on request"] },
      { name: "Full Function Series", price: 140000, details: ["All functions", "Nail + draping add-ons", "Travel NCR included"] },
    ],
    pricingWhy: "Guneet brings London-level technique back to Delhi brides. Airbrush expertise + hypoallergenic kit options + 15 years means zero surprises.",
    reviews: [
      rev("Prerna Bhatia", "South Delhi", "Feb 2025", [["Skin Sensitivity",5]],
        "I have sensitive, reactive skin and I was terrified about bridal makeup. Guneet spent our trial understanding every product I'd reacted to before and built my entire look around hypoallergenic alternatives. Zero reaction, 100% glowing. She's a saint."),
      rev("Kiara Anand", "Noida", "Dec 2024", [["Look Accuracy",5]],
        "The airbrush finish is something I'd never experienced before. It literally felt like I was wearing nothing but I looked completely flawless."),
    ],
    noorWhy: [
      "Best for sensitive-skin brides — she'll customise the whole kit",
      "Effortless airbrush + glowing finish, no caked look",
      "Includes draping and nails if you need a one-stop artist",
    ],
  },
  {
    id: "jasmeet-kapany",
    name: "Jasmeet Kapany",
    handle: "jasmeetkapany",
    followers: "120K",
    area: "West Delhi (all NCR)",
    specialty: "Soft Glam · Minimal Bridal · Natural Enhancement",
    experience: "12+ years",
    tagline: "Soft, feminine, mood-board-perfect bridal glam",
    priceMin: 20000, priceMax: 45000,
    skinTones: "All tones, esp light-wheatish soft glam",
    products: "MAC, Urban Decay, Too Faced, NARS, Lancôme",
    credentials: "Featured Brides Today · soft-glam specialist",
    matchScore: 90, rating: 4.8, bookings: 290, reliability: 97, responseHrs: 4,
    palette: { from: "#E8B4B8", to: "#F5E6D3" },
    gallery: gal(8),
    packages: [
      { name: "Soft Glam Bridal Day", price: 35000, details: ["Trial + wedding day makeup", "Hair included", "Mid-day touch-up", "Travel NCR"] },
      { name: "All-Function Pack", price: 90000, details: ["Mehendi, Haldi, Sangeet, Wedding, Reception"] },
    ],
    pricingWhy: "Jasmeet hits the sweet spot — premium soft-glam quality at NCR-friendly prices because she keeps her kit focused and her client list curated.",
    reviews: [
      rev("Ananya Gupta", "West Delhi", "Nov 2024", [["Look Accuracy",5]],
        "If you love Pinterest-worthy, soft, romantic makeup — Jasmeet is your person. She understood my mood board in 5 minutes. The feathered brows, the glossy lip, the dewy skin — exactly my vision."),
      rev("Sneha Bajaj", "Gurgaon", "Jan 2025", [["Professionalism",5]],
        "My bridesmaids were obsessed with my makeup. Jasmeet even touched up my look between functions. Her price is so reasonable for the quality."),
    ],
    noorWhy: [
      "Best value for brides chasing a Pinterest soft-glam look",
      "Stays under budget without compromising kit quality",
      "Very calm, mood-board-led trial process",
    ],
  },
  {
    id: "tanya-batra",
    name: "Tanya Batra",
    handle: "tanyabatramakeup",
    followers: "95K",
    area: "East Delhi · Noida",
    specialty: "Minimalist Bridal · Dewy Glass Skin · Clean Beauty",
    experience: "8+ years",
    tagline: "Understated, dewy, glass-skin bridal — less is breathtaking",
    priceMin: 15000, priceMax: 35000,
    skinTones: "Specialises Dusky–Deep skin, glass skin technique",
    products: "Rare Beauty, Fenty, Huda Beauty, Hourglass, cruelty-free brands",
    credentials: "Clean beauty advocate · Featured The Wed Cafe · loved by Gen-Z brides",
    matchScore: 89, rating: 4.8, bookings: 215, reliability: 96, responseHrs: 4,
    palette: { from: "#C97B5C", to: "#FFFFF0" },
    gallery: gal(1),
    packages: [
      { name: "Glass Skin Bridal", price: 28000, details: ["Trial + wedding day", "Cruelty-free kit", "Hair styling", "Travel East Delhi/Noida"] },
      { name: "Mini Function Pack", price: 60000, details: ["3 functions + bridal day"] },
    ],
    pricingWhy: "Tanya keeps her bookings limited so every bride gets her full attention. Her clean-beauty kit means no compromise on quality despite the price.",
    reviews: [
      rev("Meera Singh", "Noida", "Oct 2024", [["Skin Tone Expertise",5]],
        "I'm dusky-skinned and I was sick of artists trying to lighten me or pile on heavy orange foundation. Tanya LOVES dark skin. She said 'your skin is my canvas' and I nearly cried."),
      rev("Nandita Rao", "East Delhi", "Dec 2024", [["Value",5]],
        "Tanya is the future of bridal makeup. Young, talented, and up-to-date with what brides actually want now. The products she used are all cruelty-free."),
    ],
    noorWhy: [
      "Most experienced glass-skin specialist in East Delhi",
      "Truly celebrates deeper skin tones — won't lighten you",
      "Fully cruelty-free kit, perfect for clean-beauty brides",
    ],
  },
  {
    id: "komal-gulati",
    name: "Komal Gulati",
    handle: "komalgulati_mua",
    followers: "160K",
    area: "South Delhi · Sainik Farms",
    specialty: "International Bridal · Modern Fusion · Neutral Glam",
    experience: "14+ years",
    tagline: "Global techniques, Indian heart — neutral, dewy, modern bridal",
    priceMin: 30000, priceMax: 70000,
    skinTones: "All tones, modern-fusion looks",
    products: "Charlotte Tilbury, MAC, Hourglass, Anastasia Beverly Hills, NARS",
    credentials: "International training · Confidence-building philosophy",
    matchScore: 92, rating: 4.9, bookings: 330, reliability: 98, responseHrs: 3,
    palette: { from: "#B8860B", to: "#F5E6D3" },
    gallery: gal(3),
    packages: [
      { name: "Modern Bridal Day", price: 55000, details: ["Trial + wedding day", "Neutral glam expertise", "Hair styling", "NCR travel"] },
      { name: "Destination Series", price: 160000, details: ["All functions + travel to destination weddings"] },
    ],
    pricingWhy: "Komal's international training shows in her colour theory and product layering. You're paying for technique that translates on camera and in person.",
    reviews: [
      rev("Aditi Malhotra", "South Delhi", "Mar 2025", [["Communication",5]],
        "Komal kept showing me the mirror and asking my opinion throughout. I felt so involved in my own look! She explained WHY she was choosing each product. Walked out feeling like the most beautiful and most informed bride."),
      rev("Sonal Khurana", "Gurgaon", "Nov 2024", [["Look Accuracy",5]],
        "I wanted a modern, international-inspired bridal look for my destination wedding in Goa — not the typical heavy Delhi bride look. Komal was the ONLY artist who truly understood that vision."),
    ],
    noorWhy: [
      "Best for destination brides wanting a global, editorial look",
      "Truly collaborative — explains every choice",
      "Strong on confidence, not transformation",
    ],
  },
  {
    id: "shruti-sharma",
    name: "Shruti Sharma",
    handle: "shrutisharma_mua",
    followers: "78K",
    area: "North Delhi · Pitampura",
    specialty: "Fresh Dewy Looks · TV+On-Camera · Soft Glam",
    experience: "10+ years",
    tagline: "Fresh, polished, translates beautifully on camera — wedding-day and TV-grade",
    priceMin: 18000, priceMax: 40000,
    skinTones: "All tones, esp on-camera finish",
    products: "MAC, Makeup Forever, Bobbi Brown, Urban Decay, Kryolan",
    credentials: "TV personality MUA · Haridwar/Mussoorie/Rishikesh destination specialist",
    matchScore: 88, rating: 4.8, bookings: 250, reliability: 97, responseHrs: 5,
    palette: { from: "#FFB7A5", to: "#E8B4B8" },
    gallery: gal(5),
    packages: [
      { name: "Bridal Day (On-Camera Finish)", price: 32000, details: ["Trial + wedding day", "Camera-tested base", "Hair styling", "North Delhi travel included"] },
      { name: "Destination Bridal", price: 95000, details: ["Travel to Haridwar/Mussoorie/Rishikesh included", "Multi-function coverage"] },
    ],
    pricingWhy: "Shruti's TV makeup background means her base is engineered for cameras + 4K video. Excellent value for North Delhi and destination brides.",
    reviews: [
      rev("Ishita Verma", "North Delhi", "Jan 2025", [["Camera Finish",5]],
        "Shruti does makeup that looks stunning on camera AND in person — which is so rare. I had a videographer following me all day and every single shot I looked perfect."),
      rev("Kamya Pandey", "Pitampura", "Feb 2025", [["Value",5]],
        "Reasonable price for such incredible skill. She came to our house in North Delhi, was on time, super professional, and made my mom and sister look beautiful too."),
    ],
    noorWhy: [
      "Best on-camera finish at this price tier in Delhi",
      "Specialises in destination weddings near the hills",
      "Most reliable for North Delhi brides",
    ],
  },
];

export const ARTIST_BY_ID = Object.fromEntries(ARTISTS.map((a) => [a.id, a]));
