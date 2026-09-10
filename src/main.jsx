import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  Instagram,
  Menu as MenuIcon,
  X,
  Phone,
  Mail,
  MapPin,
  Leaf,
  Check,
  Star,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Flame,
  Clock,
  CheckCircle2,
  Coffee,
  Calculator,
  TrendingUp,
  Coins,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Droplets,
  Award,
  Navigation,
  Ticket,
  Sliders,
  Eye,
  Copy,
  Sun,
  Moon
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   DATA: MENU ITEMS WITH IMAGES, CATEGORIES & HEALTH TAGS
========================================================= */
const MENU_DATA = [
  {
    no: "01",
    category: "Signature Coffee",
    title: "Thatibellam Filter Coffee",
    desc: "Slow-dripped South Indian decoction sweetened with pure, unrefined palm jaggery. Served in a traditional brass davarah.",
    price: "₹40",
    numericPrice: 40,
    badge: "★ Most Loved",
    badgeType: "gold",
    tag: "100% Palm Jaggery",
    dietary: ["diabetic-friendly", "iron-rich"],
    image: "/signature-coffee.jpg"
  },
  {
    no: "02",
    category: "Signature Coffee",
    title: "Classic Traditional Filter Coffee",
    desc: "Rich, aromatic chicory-blended filter coffee brewed the authentic grandma-approved way.",
    price: "₹30",
    numericPrice: 30,
    badge: "Authentic",
    badgeType: "classic",
    tag: "South Indian Classic",
    dietary: ["classic-brew"],
    image: "/menu-filter-coffee.jpg"
  },
  {
    no: "03",
    category: "Signature Coffee",
    title: "Bellam Cold Coffee",
    desc: "Chilled, thick and creamy espresso shaken with cold milk and velvety thatibellam nectar.",
    price: "₹60",
    numericPrice: 60,
    badge: "Chilled",
    badgeType: "cool",
    tag: "Guilt-Free Cold Coffee",
    dietary: ["cooling-elixirs", "energy-boost"],
    image: "/menu-cold-coffee.jpg"
  },
  {
    no: "04",
    category: "Traditional Tea",
    title: "Arogya Thatibellam Chai",
    desc: "Full-bodied Assam tea leaves simmered with freshly ground spices and unrefined palm jaggery.",
    price: "₹25",
    numericPrice: 25,
    badge: "House Special",
    badgeType: "gold",
    tag: "Digestive & Comforting",
    dietary: ["immunity-boost", "digestive"],
    image: "/signature-tea.jpg"
  },
  {
    no: "05",
    category: "Traditional Tea",
    title: "Allam (Ginger) Bellam Tea",
    desc: "Crushed fresh ginger and fragrant cardamom infused with palm jaggery. Perfect for immunity and throat soothing.",
    price: "₹25",
    numericPrice: 25,
    badge: "Immunity Boost",
    badgeType: "health",
    tag: "Ayurvedic Blend",
    dietary: ["immunity-boost", "ayurvedic"],
    image: "/menu-ginger-tea.jpg"
  },
  {
    no: "06",
    category: "Traditional Tea",
    title: "Bellam Lemon Tea",
    desc: "Zesty freshly squeezed lemon combined with warm spices and golden thatibellam. Clean, light, and alkalizing.",
    price: "₹30",
    numericPrice: 30,
    badge: "Detox",
    badgeType: "health",
    tag: "Natural Antioxidants",
    dietary: ["vegan-friendly", "immunity-boost", "detox"],
    image: "/menu-lemon-tea.jpg"
  },
  {
    no: "07",
    category: "Healthy Coolers",
    title: "Thatibellam Mint Cooler",
    desc: "Handcrafted palm jaggery nectar chilled with fresh garden mint, lemon twist, and cooling sabja (basil seeds).",
    price: "₹55",
    numericPrice: 55,
    badge: "Summer Favorite",
    badgeType: "cool",
    tag: "Natural Electrolytes",
    dietary: ["cooling-elixirs", "vegan-friendly", "diabetic-friendly"],
    image: "/signature-cooler.jpg"
  },
  {
    no: "08",
    category: "Healthy Coolers",
    title: "Nannari Palm Jaggery Sharbath",
    desc: "Ancient South Indian sarsaparilla root elixir sweetened with thatibellam. Revered for deep body-cooling properties.",
    price: "₹50",
    numericPrice: 50,
    badge: "Herbal Classic",
    badgeType: "health",
    tag: "Body Coolant",
    dietary: ["cooling-elixirs", "vegan-friendly", "herbal-remedy"],
    image: "/menu-nannari.jpg"
  },
  {
    no: "09",
    category: "Traditional Snacks",
    title: "Thatibellam Jaggery Ragi Cookies",
    desc: "Crisp, wholesome finger-millet cookies baked with pure cow ghee and palm jaggery. Zero refined flour.",
    price: "₹45",
    numericPrice: 45,
    badge: "Zero Maida",
    badgeType: "classic",
    tag: "Fiber-Rich Snack",
    dietary: ["diabetic-friendly", "zero-maida"],
    image: "/menu-ragi-cookies.jpg"
  },
  {
    no: "10",
    category: "Traditional Snacks",
    title: "Hot Kara Murukku & Mixture",
    desc: "Crunchy, artisanal South Indian savory snacks roasted in cold-pressed oil. The quintessential coffee companion.",
    price: "₹35",
    numericPrice: 35,
    badge: "Crispy",
    badgeType: "classic",
    tag: "Artisanal Savory",
    dietary: ["vegan-friendly", "artisanal-crunch"],
    image: "/menu-murukku.jpg"
  }
];

const FRANCHISE_STEPS = [
  ["01", "Connect & Apply", "Submit the quick enquiry form or chat on WhatsApp with our franchise development team."],
  ["02", "Concept & ROI Walkthrough", "Review our unit economics, low capex setup, margins, and 12-18 month payback model."],
  ["03", "Location & Store Setup", "Our retail architects guide site selection, high-footfall viability, and layout design."],
  ["04", "Training & Equipment", "Standardized brew equipment, secret thatibellam blends, and barista training delivered."],
  ["05", "Grand Launch & Support", "Inauguration marketing, social media support, and recurring operational guidance."]
];

const STORES_LIST = [
  {
    city: "Hyderabad",
    area: "Madhapur & Banjara Hills",
    timing: "6:00 AM – 11:00 PM",
    status: "Flagship Café & Takeaway",
    mapsUrl: "https://www.google.com/maps/search/Arogya+Thatibellam+Caffee+Hyderabad"
  },
  {
    city: "Vijayawada",
    area: "Benz Circle & MG Road",
    timing: "6:00 AM – 10:30 PM",
    status: "Walk-in & Express Kiosk",
    mapsUrl: "https://www.google.com/maps/search/Arogya+Thatibellam+Caffee+Vijayawada"
  },
  {
    city: "Visakhapatnam",
    area: "Siripuram & Beach Road",
    timing: "6:00 AM – 10:30 PM",
    status: "Sea-Breeze Café Hub",
    mapsUrl: "https://www.google.com/maps/search/Arogya+Thatibellam+Caffee+Visakhapatnam"
  },
  {
    city: "Guntur",
    area: "Lakshmipuram Main Road",
    timing: "6:00 AM – 10:00 PM",
    status: "Traditional Lounge",
    mapsUrl: "https://www.google.com/maps/search/Arogya+Thatibellam+Caffee+Guntur"
  }
];

const REVIEWS = [
  {
    name: "Dr. Sandeep Varma",
    role: "Cardiologist & Daily Filter Coffee Enthusiast",
    rating: 5,
    text: "As a physician, I advise patients against refined white sugar spikes. Arogya's Thatibellam coffee gives the comforting rich taste of traditional filter coffee with the low glycemic index and iron of pure palm jaggery. Brilliant concept."
  },
  {
    name: "Lavanya Reddy",
    role: "Café Regular, Hyderabad",
    rating: 5,
    text: "The aroma of brass tumbler coffee poured hot with palm jaggery transports you back to grandma's home. The mint cooler is equally mind-blowing during afternoons. My everyday go-to stop!"
  },
  {
    name: "Kalyan Chakravarthy",
    role: "Franchise Partner (Vijayawada Outlet)",
    rating: 5,
    text: "Setting up our Arogya outlet was seamless. The unit margins on thatibellam beverages are significantly better than standard coffee shops because of the health USP. We achieved breakeven in just 9 months."
  }
];

/* =========================================================
   HELPER COMPONENT: REVEAL SECTION WITH GSAP SCROLLTRIGGER
========================================================= */
function RevealSection({ children, className = "", id }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-item", {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}

/* =========================================================
   TOP SCROLL PROGRESS BAR
========================================================= */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const current = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setProgress(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}


/* =========================================================
   FLOATING QUICK-JUMP NAVIGATION DOCK
========================================================= */
function FloatingQuickNav({ tray = [], onOpenTray }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300 || (tray && tray.length > 0));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tray]);

  if (!visible) return null;

  const totalCount = tray ? tray.reduce((sum, item) => sum + item.qty, 0) : 0;
  const totalPrice = tray ? tray.reduce((sum, item) => sum + item.numericPrice * item.qty, 0) : 0;

  return (
    <nav className="floating-quick-dock" aria-label="Quick jump navigation">
      <a href="#why-thatibellam" className="quick-dock-item">
        <Leaf size={13} />
        <span>Health</span>
      </a>
      <a href="#menu" className="quick-dock-item highlight">
        <Coffee size={13} />
        <span>Menu</span>
      </a>
      <a href="#signatures" className="quick-dock-item">
        <Sparkles size={13} />
        <span>Signatures</span>
      </a>
      <a href="#franchise" className="quick-dock-item">
        <TrendingUp size={13} />
        <span>Franchise</span>
      </a>
      <button
        type="button"
        className={`quick-dock-item quick-dock-tray ${totalCount > 0 ? "has-items" : ""}`}
        onClick={onOpenTray}
        aria-label="Open Tasting Tray"
        title="Open Tasting Tray"
      >
        <span className="dock-tray-icon-wrap">
          <ShoppingBag size={13} />
          {totalCount > 0 && <span className="dock-tray-badge">{totalCount}</span>}
        </span>
        <span>Tasting Tray</span>
        {totalCount > 0 && <span className="dock-tray-price">₹{totalPrice}</span>}
      </button>
      <a
        href="https://wa.me/918309131127?text=Hello%20Arogya%20Thatibellam%20Caffee!%20I'd%20like%20to%20connect."
        target="_blank"
        rel="noreferrer"
        className="quick-dock-item quick-dock-wa"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={13} />
        <span>WhatsApp</span>
      </a>
    </nav>
  );
}

/* =========================================================
   AUTHENTIC WHATSAPP SVG SYMBOL
========================================================= */
function WhatsAppIcon({ size = 22, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

/* =========================================================
   FLOATING WHATSAPP CONNECT BUTTON (BOTTOM CORNER)
========================================================= */
function FloatingWhatsApp() {
  const message = encodeURIComponent(
    "Hello Arogya Thatibellam Caffee! I'd like to chat, check out your menu, and learn more about franchise opportunities."
  );
  return (
    <a
      href={`https://wa.me/918309131127?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <div className="wa-pulse" />
      <WhatsAppIcon size={22} className="wa-icon" />
      <span className="wa-label">Chat on WhatsApp</span>
    </a>
  );
}

/* Handcrafted Distinct Coffee Cup SVGs for Theme Toggle:
   - HotFilterCoffeeCup: Traditional steaming brass Davarah & Tumbler (Light Theme)
   - IcedDarkBrewCup: Chilled dark brew tumbler with floating ice cubes & straw (Dark Theme)
*/
function HotFilterCoffeeCup({ active = false }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="cup-svg cup-hot-graphic"
      aria-hidden="true"
    >
      <path
        d="M8.5 2.5 C8 4 9.5 5 9 6.5"
        stroke={active ? "#92400E" : "#FBBF24"}
        strokeWidth="1.4"
        strokeLinecap="round"
        className="wisp-steam wisp-1"
      />
      <path
        d="M13 2 C12.5 3.5 14 4.5 13.5 6"
        stroke={active ? "#B45309" : "#FDE68A"}
        strokeWidth="1.5"
        strokeLinecap="round"
        className="wisp-steam wisp-2"
      />
      <path
        d="M6 7.5 H16 L14.6 15.5 C14.4 16.8 13.2 17.8 11.9 17.8 H10.1 C8.8 17.8 7.6 16.8 7.4 15.5 L6 7.5 Z"
        fill={active ? "#78350F" : "#F59E0B"}
        fillOpacity={active ? "0.95" : "0.35"}
        stroke={active ? "#451A03" : "#FBBF24"}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <ellipse
        cx="11"
        cy="8"
        rx="4.8"
        ry="1.6"
        fill={active ? "#FEF3C7" : "#FFFBEB"}
        stroke={active ? "#B45309" : "#FBBF24"}
        strokeWidth="0.8"
      />
      <circle cx="10" cy="8" r="0.6" fill="#92400E" />
      <path
        d="M3.5 18 C3.5 16.8 7 16.4 11 16.4 C15 16.4 18.5 16.8 18.5 18 C18.5 20.2 15 20.6 11 20.6 C7 20.6 3.5 20.2 3.5 18 Z"
        fill={active ? "#B45309" : "#D97706"}
        fillOpacity={active ? "1" : "0.45"}
        stroke={active ? "#78350F" : "#FBBF24"}
        strokeWidth="1.3"
      />
    </svg>
  );
}

function IcedDarkBrewCup({ active = false }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="cup-svg cup-iced-graphic"
      aria-hidden="true"
    >
      <line
        x1="16.5"
        y1="2"
        x2="12"
        y2="10.5"
        stroke={active ? "#FBBF24" : "#E5A842"}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="15.2"
        y1="4.5"
        x2="14.3"
        y2="6.2"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 5 L7.4 19.5 C7.5 20.4 8.2 21.2 9.2 21.2 H14.8 C15.8 21.2 16.5 20.4 16.6 19.5 L18 5 Z"
        fill={active ? "#0E0704" : "#1C110B"}
        fillOpacity={active ? "0.95" : "0.35"}
        stroke={active ? "#FBBF24" : "rgba(255, 239, 188, 0.55)"}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M6.7 9.5 H17.3 L16.5 19.2 C16.4 19.8 15.8 20.3 15.2 20.3 H8.8 C8.2 20.3 7.6 19.8 7.5 19.2 L6.7 9.5 Z"
        fill={active ? "#1A0E07" : "#0A0503"}
      />
      <rect
        x="8.5"
        y="11.5"
        width="3.2"
        height="3.2"
        rx="0.7"
        fill="#FFFFFF"
        fillOpacity={active ? "0.9" : "0.55"}
        stroke={active ? "#60A5FA" : "#BAE6FD"}
        strokeWidth="0.6"
      />
      <rect
        x="12.2"
        y="14"
        width="3"
        height="3"
        rx="0.7"
        fill="#FFFFFF"
        fillOpacity={active ? "0.9" : "0.55"}
        stroke={active ? "#60A5FA" : "#BAE6FD"}
        strokeWidth="0.6"
      />
      <ellipse
        cx="12"
        cy="5"
        rx="6"
        ry="1.4"
        fill="none"
        stroke={active ? "#FBBF24" : "rgba(255, 239, 188, 0.7)"}
        strokeWidth="1.3"
      />
      <path
        d="M18.8 11.5 L19.2 12.8 L20.5 13.2 L19.2 13.6 L18.8 14.9 L18.4 13.6 L17.1 13.2 L18.4 12.8 Z"
        fill={active ? "#93C5FD" : "#FBBF24"}
        opacity={active ? "1" : "0.6"}
      />
    </svg>
  );
}

/* =========================================================
   01: NAVBAR
========================================================= */
function Navbar({ theme = "dawn", onToggleTheme, tray = [], onOpenTray }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    ["Story", "story"],
    ["Why Thatibellam", "why-thatibellam"],
    ["Menu", "menu"],
    ["Signatures", "signatures"],
    ["Experience", "experience"],
    ["Franchise", "franchise"],
    ["Locations", "stores"],
    ["FAQ", "faq"],
  ];

  const totalTrayCount = tray ? tray.reduce((sum, item) => sum + item.qty, 0) : 0;

  return (
    <header className={`navbar ${scrolled ? "nav-scrolled" : ""}`}>
      {/* CONTINUOUSLY MOVING HERITAGE FLORAL MOTIF BACKGROUND (UNINTERRUPTED SINGLE TRACK) */}
      <div className="navbar-motif-bg" aria-hidden="true">
        <div className="navbar-motif-strip">
          <div className="navbar-motif-track">
            {[...Array(10)].map((_, i) => (
              <span key={`m1-${i}`} className="navbar-motif-unit" />
            ))}
          </div>
          <div className="navbar-motif-track" aria-hidden="true">
            {[...Array(10)].map((_, i) => (
              <span key={`m2-${i}`} className="navbar-motif-unit" />
            ))}
          </div>
        </div>
      </div>
      {scrolled && <div className="navbar-bottom-accent-line" aria-hidden="true" />}

      <a className="brand" href="#top">
        <span className="brand-mark">A</span>
        <span>
          <b>AROGYA</b>
          <small>THATI BELLAM CAFFEE</small>
        </span>
      </a>
      <nav className={open ? "mobile-open" : ""}>
        {links.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a className="nav-cta" href="#franchise" onClick={() => setOpen(false)}>
          Franchise Enquiry <ArrowUpRight size={15} />
        </a>
      </nav>
      <div className="nav-controls">
        {totalTrayCount > 0 && (
          <button
            type="button"
            className="nav-tray-btn"
            onClick={onOpenTray}
            title={`Open Tasting Tray (${totalTrayCount} items)`}
            aria-label={`Open Tasting Tray (${totalTrayCount} items)`}
          >
            <ShoppingBag size={17} />
            <span className="nav-tray-badge">{totalTrayCount}</span>
          </button>
        )}
        <button
          type="button"
          className={`coffee-ambience-switch ${theme === "dusk" ? "theme-dusk-active" : "theme-dawn-active"}`}
          onClick={onToggleTheme}
          title={theme === "dusk" ? "Currently Dark Theme (Cold Coffee) • Click to switch to Light Theme" : "Currently Light Theme (Hot Coffee) • Click to switch to Dark Theme"}
          aria-label="Toggle between Hot Coffee Light Theme and Cold Coffee Dark Theme"
        >
          {/* Animated sliding thumb capsule */}
          <span className="cup-toggle-slider" aria-hidden="true" />

          {/* Left Slot: Steaming Hot Filter Coffee Cup (Light Theme) */}
          <span className={`cup-slot ${theme === "dawn" ? "active" : ""}`} title="Light Theme (Hot Coffee)">
            <HotFilterCoffeeCup active={theme === "dawn"} />
          </span>

          {/* Right Slot: Chilled Iced Dark Coffee Cup (Dark Theme) */}
          <span className={`cup-slot ${theme === "dusk" ? "active" : ""}`} title="Dark Theme (Cold Coffee)">
            <IcedDarkBrewCup active={theme === "dusk"} />
          </span>
        </button>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X /> : <MenuIcon />}
        </button>
      </div>
    </header>
  );
}

/* =========================================================
   HERO LIVE METRICS TICKER
========================================================= */
function HeroMetricsTicker() {
  const metrics = [
    {
      icon: <ShieldCheck size={16} />,
      value: "100%",
      label: "Refined-Sugar Free",
      sub: "Pure Palmyra Nectar"
    },
    {
      icon: <MapPin size={16} />,
      value: "3 Hubs",
      label: "Hyd • Vja • Vizag",
      sub: "Flagship Cafés & Kiosks"
    },
    {
      icon: <Coffee size={16} />,
      value: "15,000+",
      label: "Daily Sippers",
      sub: "Cult South Indian Following"
    },
    {
      icon: <Star size={16} />,
      value: "4.9 ★",
      label: "Google Rated",
      sub: "1,200+ Verified Reviews"
    }
  ];

  return (
    <div className="hero-metrics-ticker">
      {metrics.map((m, i) => (
        <div className="hero-metric-pill" key={i}>
          <div className="metric-pill-icon">{m.icon}</div>
          <div className="metric-pill-content">
            <div className="metric-pill-top">
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
            <small>{m.sub}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   AUTHENTIC THATIBELLAM CIRCULAR HERITAGE EMBLEM
   (Replaces the placeholder star symbol with a crafted
    Palmyra Palm, Steaming Brass Davarah, and Telugu seal)
========================================================= */
function HeroThatibellamBadge() {
  return (
    <div
      className="hero-badge hero-seal-badge"
      role="img"
      aria-label="Arogya Thatibellam Caffee: 100% Pure Palmyra Nectar Traditional Seal"
      title="Arogya Thatibellam Caffee • 100% Pure Wild Palm Jaggery"
    >
      <svg
        className="hero-seal-svg"
        viewBox="0 0 120 120"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Metallic outer brass rim gradient */}
          <linearGradient id="sealBezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2BF" />
            <stop offset="30%" stopColor="#D49830" />
            <stop offset="60%" stopColor="#FFE18E" />
            <stop offset="90%" stopColor="#96560B" />
            <stop offset="100%" stopColor="#693804" />
          </linearGradient>

          {/* Outer text track gold gradient */}
          <radialGradient id="sealTrackGrad" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#FFF9E6" />
            <stop offset="35%" stopColor="#F8D683" />
            <stop offset="70%" stopColor="#E2A536" />
            <stop offset="100%" stopColor="#B37315" />
          </radialGradient>

          {/* Core medallion radiant gold gradient */}
          <radialGradient id="sealMedallionGrad" cx="42%" cy="36%" r="62%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="30%" stopColor="#FDF2D0" />
            <stop offset="65%" stopColor="#F5D37E" />
            <stop offset="90%" stopColor="#D89929" />
            <stop offset="100%" stopColor="#A86A11" />
          </radialGradient>

          {/* Davarah cup brass gradient */}
          <linearGradient id="davarahGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFECA8" />
            <stop offset="50%" stopColor="#C98B2E" />
            <stop offset="100%" stopColor="#784207" />
          </linearGradient>

          {/* Circular path for perimeter text (radius 47, center 60,60) */}
          <path
            id="sealTextPath"
            d="M 60,60 m -47,0 a 47,47 0 1,1 94,0 a 47,47 0 1,1 -94,0"
            fill="none"
          />
        </defs>

        {/* 1. Outer Bezel & Shadow Disc */}
        <circle cx="60" cy="60" r="58.5" fill="url(#sealBezelGrad)" stroke="#4A2005" strokeWidth="0.8" />
        <circle cx="60" cy="60" r="56.5" fill="url(#sealTrackGrad)" />

        {/* 2. Outer Rotating Perimeter Text */}
        <g className="hero-seal-rotating-ring">
          <text className="seal-perimeter-text">
            <textPath
              href="#sealTextPath"
              startOffset="0%"
              textLength="287"
              lengthAdjust="spacing"
            >
              • 100% PURE PALMYRA NECTAR • AROGYA CAFFEE •
            </textPath>
          </text>
        </g>

        {/* 3. Inner Concentric Heritage Rings */}
        <circle cx="60" cy="60" r="39" fill="url(#sealBezelGrad)" stroke="#4A2005" strokeWidth="0.8" />
        <circle
          cx="60"
          cy="60"
          r="37.2"
          fill="none"
          stroke="#6E3507"
          strokeWidth="0.75"
          strokeDasharray="2.2, 1.8"
        />
        <circle cx="60" cy="60" r="35.5" fill="url(#sealMedallionGrad)" stroke="#612F07" strokeWidth="0.5" />

        {/* 4. Top: Handcrafted Palmyra Palm Tree (తాటి చెట్టు) & Clay Neera Pot */}
        <g className="seal-palmyra-emblem">
          {/* Trunk */}
          <path
            d="M 59.7 41.5 L 59.3 34.5 C 59.2 32.5 59.7 31 59.7 31 C 59.7 31 60.3 32.5 60.7 34.5 L 60.3 41.5 Z"
            fill="#5E2C08"
          />
          {/* Fan palm leaves radiating */}
          <path d="M 60 31 C 60 27 60 25.8 60 25.8" stroke="#3D1B03" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M 60 31 C 57.5 27.5 55 27 53.8 27" stroke="#4F2405" strokeWidth="1.15" strokeLinecap="round" />
          <path d="M 60 31 C 62.5 27.5 65 27 66.2 27" stroke="#4F2405" strokeWidth="1.15" strokeLinecap="round" />
          <path d="M 60 31 C 56.8 29 54 29.5 52.5 30.2" stroke="#663208" strokeWidth="1" strokeLinecap="round" />
          <path d="M 60 31 C 63.2 29 66 29.5 67.5 30.2" stroke="#663208" strokeWidth="1" strokeLinecap="round" />
          <path d="M 60 31 C 56.5 31.8 53.8 33 52 34.5" stroke="#7E400B" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M 60 31 C 63.5 31.8 66.2 33 68 34.5" stroke="#7E400B" strokeWidth="0.9" strokeLinecap="round" />
          {/* Clay Neera collection pot hung on trunk */}
          <ellipse cx="60" cy="36" rx="2.2" ry="1.7" fill="#8F430C" stroke="#3D1B03" strokeWidth="0.45" />
          <path d="M 58.2 35 L 61.8 35" stroke="#3D1B03" strokeWidth="0.5" strokeLinecap="round" />
          {/* Golden nectar droplet */}
          <circle cx="60" cy="39" r="1" fill="#FFAE33" stroke="#FFF7DE" strokeWidth="0.35" />
        </g>

        {/* 5. Center: Brand Serif Title */}
        <text
          x="60"
          y="50"
          textAnchor="middle"
          fontFamily="'DM Serif Display', Georgia, serif"
          fontSize="11.5"
          fontWeight="700"
          fill="#3B1506"
          letterSpacing="0.8"
        >
          THATI
        </text>
        <text
          x="60"
          y="61"
          textAnchor="middle"
          fontFamily="'DM Serif Display', Georgia, serif"
          fontSize="11.5"
          fontWeight="700"
          fill="#3B1506"
          letterSpacing="0.8"
        >
          BELLAM
        </text>

        {/* 6. Authentic Telugu Heritage Script */}
        <text
          x="60"
          y="69.5"
          textAnchor="middle"
          fontFamily="'Outfit', sans-serif"
          fontSize="6.8"
          fontWeight="700"
          fill="#6E2F05"
          letterSpacing="0.4"
        >
          తాటిబెల్లం
        </text>

        {/* 7. Bottom: Steaming Brass Davarah Coffee Cup & Coffee Beans (REPLACES GEMINI SYMBOL) */}
        <g className="seal-caffee-emblem">
          {/* Left Roasted Coffee Bean */}
          <ellipse
            cx="49.5"
            cy="79.5"
            rx="2.3"
            ry="1.5"
            transform="rotate(-28 49.5 79.5)"
            fill="#3B1705"
            stroke="#C98B2E"
            strokeWidth="0.45"
          />
          <line x1="48.2" y1="80.2" x2="50.8" y2="78.8" stroke="#E5A93B" strokeWidth="0.4" strokeLinecap="round" />

          {/* Right Roasted Coffee Bean */}
          <ellipse
            cx="70.5"
            cy="79.5"
            rx="2.3"
            ry="1.5"
            transform="rotate(28 70.5 79.5)"
            fill="#3B1705"
            stroke="#C98B2E"
            strokeWidth="0.45"
          />
          <line x1="69.2" y1="78.8" x2="71.8" y2="80.2" stroke="#E5A93B" strokeWidth="0.4" strokeLinecap="round" />

          {/* Brass Davarah Tumbler & Saucer */}
          <ellipse cx="60" cy="82.5" rx="6.8" ry="1.6" fill="url(#davarahGrad)" stroke="#4A2005" strokeWidth="0.5" />
          <path
            d="M 55.6 77.2 L 64.4 77.2 L 63 81.8 L 57 81.8 Z"
            fill="url(#davarahGrad)"
            stroke="#4A2005"
            strokeWidth="0.5"
          />
          <ellipse cx="60" cy="77.3" rx="4.2" ry="0.9" fill="#FFF2C6" />
          <path
            d="M 58.6 75.2 C 58 73.8 59.3 72.8 58.6 71.5 M 61.4 75.2 C 62 73.8 60.7 72.8 61.4 71.5"
            stroke="#C98B2E"
            strokeWidth="0.6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bottom Quality Tag */}
          <text
            x="60"
            y="89"
            textAnchor="middle"
            fontFamily="'Outfit', sans-serif"
            fontSize="5.4"
            fontWeight="800"
            fill="#451D04"
            letterSpacing="0.9"
          >
            100% PURE
          </text>
        </g>
      </svg>
    </div>
  );
}

/* =========================================================
   01: CINEMATIC HERO
========================================================= */
function Hero() {
  const ref = useRef(null);
  const visualRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: Number((x * 12).toFixed(2)), y: Number((-y * 12).toFixed(2)) });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15
      });
      gsap.from(".hero-visual", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.2,
        ease: "power4.inOut"
      });
      gsap.to(".hero-image", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="hero" id="top">
      <div className="hero-copy">
        <h1>
          Tradition<br />
          <span>in every</span><br />
          <em>sip.</em>
        </h1>
        <p>
          Ancient South Indian flavours reimagined for modern café culture — sweetened
          with <b>100% natural Thatibellam (Palm Jaggery)</b> instead of refined white sugar.
          Pure taste, honest health.
        </p>

        <div className="hero-trust-badge">
          <div className="stars-row">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#C98B2E" color="#C98B2E" />
            ))}
          </div>
          <span><b>4.9 / 5</b> from 1,200+ Coffee Lovers • 100% Chemical-Free</span>
        </div>

        <div className="hero-actions">
          <a href="#menu" className="btn btn-gold">
            Explore Menu <ArrowUpRight size={17} />
          </a>
          <a href="#why-thatibellam" className="btn btn-outline">
            Why Thatibellam? <ArrowDown size={15} />
          </a>
        </div>
      </div>

      <div
        ref={visualRef}
        className="hero-visual"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="hero-tilt-wrapper"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s ease" : "none"
          }}
        >
          <img
            className="hero-image"
            src="/hero-coffee.webp"
            alt="Traditional South Indian filter coffee with brass davarah cup and organic thatibellam"
          />

          {/* Enhanced aromatic filter coffee steam animation directly over the brass cup */}
          <div className="steam-container" aria-hidden="true">
            <div className="steam-base-haze" />
            <span className="steam-particle s1" />
            <span className="steam-particle s2" />
            <span className="steam-particle s3" />
            <span className="steam-particle s4" />
            <span className="steam-particle s5" />
            <span className="steam-particle s6" />
            <span className="steam-particle s7" />
            <span className="steam-particle s8" />
          </div>

          {/* Handcrafted Circular Thatibellam Seal (Modified, Gemini symbol removed) */}
          <HeroThatibellamBadge />
          <div className="hero-caption">
            A taste of tradition<br />
            brewed for wellness.
          </div>
        </div>
      </div>
      <div className="scroll-note">
        <span>SCROLL TO EXPLORE</span>
        <div />
      </div>
    </section>
  );
}

/* =========================================================
   02: OUR STORY
========================================================= */
function Story() {
  return (
    <RevealSection id="story" className="story section-light">
      <div className="story-heading reveal-item">
        <h2>
          A little<br />
          <em>piece of</em><br />
          heritage.
        </h2>
      </div>
      <div className="story-copy reveal-item">
        <p className="lead">
          Arogya Thatibellam Caffee was born to bridge ancient Indian wellness with
          today's vibrant café culture.
        </p>
        <p>
          For centuries, our grandparents relied on <b>thatibellam</b> (wild palm jaggery)
          for sustained energy and natural immunity. In a world crowded with artificially
          sweetened commercial coffee, we brought back the warmth of brass cups, hand-dripped
          decoctions, and unrefined golden sweetness.
        </p>
        <div className="story-highlights">
          <div className="story-pill">
            <Check size={14} /> 100% Refined-Sugar Free
          </div>
          <div className="story-pill">
            <Check size={14} /> Ancient Palm Jaggery
          </div>
          <div className="story-pill">
            <Check size={14} /> Authentic Brass Cup Experience
          </div>
        </div>
        <a className="round-link" href="#menu">
          Taste the difference <ArrowUpRight size={18} />
        </a>
      </div>
    </RevealSection>
  );
}

/* =========================================================
   THATIBELLAM HERITAGE SVG EMBLEMS (REPLACING GENERIC LEAVES)
========================================================= */
function PalmyraPalmIcon({ size = 26, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`thatibellam-svg-symbol ${className}`}
      aria-hidden="true"
    >
      <path
        d="M12 22 L11.2 13 C11 10.5 12 8 12 8 C12 8 13 10.5 12.8 13 L12 22 Z"
        fill="#C98B2E"
        stroke="#FFE599"
        strokeWidth="0.6"
      />
      <line x1="11" y1="18" x2="13" y2="18" stroke="#7A4213" strokeWidth="0.8" />
      <line x1="11.2" y1="15" x2="12.8" y2="15" stroke="#7A4213" strokeWidth="0.8" />
      <line x1="11.4" y1="12" x2="12.6" y2="12" stroke="#7A4213" strokeWidth="0.8" />
      <path d="M12 8 C12 3 12 2 12 2" stroke="#FFAE33" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 8 C10 4 8 3 7 3" stroke="#FFAE33" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 8 C14 4 16 3 17 3" stroke="#FFAE33" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 8 C9 6 6 6 4 6" stroke="#C98B2E" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 8 C15 6 18 6 20 6" stroke="#C98B2E" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 8 C8 8 5 10 3 11" stroke="#E6A135" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 8 C16 8 19 10 21 11" stroke="#E6A135" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="2.2" fill="#FFF2C6" />
    </svg>
  );
}

function JaggeryCrystalIcon({ size = 26, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`thatibellam-svg-symbol ${className}`}
      aria-hidden="true"
    >
      <polygon points="12,3 20,8 12,12 4,8" fill="#FFCF70" stroke="#FFF7DE" strokeWidth="0.8" />
      <polygon points="4,8 12,12 12,21 4,16" fill="#C98B2E" stroke="#FFE094" strokeWidth="0.8" />
      <polygon points="12,12 20,8 20,16 12,21" fill="#8C4A15" stroke="#FFE094" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="1.5" fill="#FFF9DF" />
      <path d="M12 2 L12 4 M12 20 L12 22" stroke="#FFAE33" strokeWidth="0.8" />
    </svg>
  );
}

function NeeraPotIcon({ size = 26, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`thatibellam-svg-symbol ${className}`}
      aria-hidden="true"
    >
      <path d="M7 3 L10 7 M17 3 L14 7" stroke="#FFAE33" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="12" cy="7" rx="5" ry="1.8" fill="#C98B2E" stroke="#FFEFBC" strokeWidth="1" />
      <path
        d="M8 8 C5 11 5 18 8 20 C10 21.5 14 21.5 16 20 C19 18 19 11 16 8 Z"
        fill="#9C5217"
        stroke="#FFB84D"
        strokeWidth="1.2"
      />
      <ellipse cx="12" cy="14" rx="3.5" ry="4" fill="rgba(255, 174, 51, 0.45)" />
      <circle cx="11" cy="12" r="1.2" fill="#FFF9DF" />
    </svg>
  );
}

function NectarDropIcon({ size = 26, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`thatibellam-svg-symbol ${className}`}
      aria-hidden="true"
    >
      <path
        d="M12 2 C12 2 4 12 4 16 C4 20.4 7.6 24 12 24 C16.4 24 20 20.4 20 16 C20 12 12 2 12 2 Z"
        fill="#FFAE33"
        stroke="#FFF9DF"
        strokeWidth="1.2"
      />
      <path d="M8 15 C8 12.5 10.5 8 11.5 6.5" stroke="#FFFDF5" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

function PalmFrondIcon({ size = 26, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`thatibellam-svg-symbol ${className}`}
      aria-hidden="true"
    >
      <path d="M3 21 C8 16 15 11 21 3" stroke="#C98B2E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 17 C10 13 14 11 18 10" stroke="#FFAE33" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M12 14 C14 10 18 8 22 7" stroke="#FFAE33" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M15 11 C17 7 20 5 23 4" stroke="#FFE082" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 19 C5 16 6 13 8 10" stroke="#FFAE33" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M9 16 C8 13 9 10 11 7" stroke="#FFAE33" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M12 13 C12 10 13 7 15 4" stroke="#FFE082" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}



function IngredientsAndHealth() {
  const [activeMetric, setActiveMetric] = useState(0);
  const [dailyCups, setDailyCups] = useState(2);

  const comparisons = [
    {
      title: "Glycemic Index",
      sugarVal: "High GI (~68)",
      sugarDesc: "Spikes & sudden crashes",
      jaggeryVal: "Low GI (35–40)",
      jaggeryDesc: "Steady, all-day stamina"
    },
    {
      title: "Nutrition",
      sugarVal: "Empty Calories",
      sugarDesc: "0% minerals, chemically stripped",
      jaggeryVal: "Iron & Minerals",
      jaggeryDesc: "Natural iron, potassium & calcium"
    },
    {
      title: "Purity",
      sugarVal: "Bleached Crystals",
      sugarDesc: "Treated with sulfur & chemicals",
      jaggeryVal: "100% Wild Sap",
      jaggeryDesc: "Traditional slow-boiled nectar"
    },
    {
      title: "Digestion",
      sugarVal: "Acidic",
      sugarDesc: "Causes acidity & inflammation",
      jaggeryVal: "Alkalizing",
      jaggeryDesc: "Ayurvedic digestive balance"
    }
  ];

  return (
    <section className="ingredients" id="why-thatibellam">
      {/* EMPTY RESERVED SPACE IN FLOATING BAR READY FOR NEXT CUSTOM DESIGN */}
      <div className="marquee-wrapper empty-design-space" aria-hidden="true" />

      <div className="ingredient-grid">
        <div className="ingredient-visual">
          <div className="thatibellam-photo-container">
            <div className="thatibellam-title-above">
              <span className="marquee-word-thatibellam">
                THATI BELLAM <small className="telugu-sub">తాటి బెల్లం</small>
              </span>
            </div>
            <div className="thatibellam-photo-frame">
              <img
                src="/jaggery-block.jpg"
                alt="Pure organic thatibellam palm jaggery blocks"
                className="jaggery-photo"
              />
              <div className="jaggery-floating-badge">
                <Sparkles size={16} />
                <span>Wild Harvested Palmyra Sap</span>
              </div>
              <div className="ingredient-note">
                THE GOLDEN AMBER<br />
                HEART OF OUR<br />
                SIGNATURE TASTE.
              </div>
            </div>
          </div>
        </div>

        <div className="ingredient-copy">
          <h2>
            Sweetness<br />
            with a<br />
            <em>purpose.</em>
          </h2>
          <p>
            100% natural, unrefined palm jaggery with low GI and essential minerals — zero refined sugar.
          </p>

          <div className="comparison-container">
            <div className="comparison-tabs">
              {comparisons.map((c, i) => (
                <button
                  key={c.title}
                  className={`comp-tab ${activeMetric === i ? "active" : ""}`}
                  onClick={() => setActiveMetric(i)}
                >
                  {c.title}
                </button>
              ))}
            </div>

            <div className="comparison-card">
              <div className="comp-side bad">
                <div className="comp-badge bad-badge">❌ White Sugar</div>
                <h4>{comparisons[activeMetric].sugarVal}</h4>
                <p>{comparisons[activeMetric].sugarDesc}</p>
              </div>

              <div className="comp-divider-vs">VS</div>

              <div className="comp-side good">
                <div className="comp-badge good-badge">
                  <JaggeryCrystalIcon size={15} /> Thatibellam
                </div>
                <h4>{comparisons[activeMetric].jaggeryVal}</h4>
                <p>{comparisons[activeMetric].jaggeryDesc}</p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE SUGAR SWAP HEALTH IMPACT METER */}
          <div className="sugar-meter-card">
            <div className="meter-head">
              <div className="meter-title-wrap">
                <Flame size={17} color="#C98B2E" />
                <h4>Daily Health Impact</h4>
              </div>
              <span className="meter-badge">Quick Calc</span>
            </div>

            <div className="meter-slider-wrap">
              <div className="slider-label-row">
                <span>Daily Cups:</span>
                <strong className="slider-val-badge">{dailyCups} {dailyCups === 1 ? "Cup" : "Cups"} / day</strong>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={dailyCups}
                onChange={(e) => setDailyCups(Number(e.target.value))}
                className="sugar-slider"
                aria-label="Daily cups of coffee or tea"
              />
              <div className="slider-ticks">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>

            <div className="meter-results-grid">
              <div className="meter-result-stat bad-avoided">
                <small>❌ Sugar Avoided</small>
                <strong>{(dailyCups * 10 * 365 / 1000).toFixed(1)} kg</strong>
                <span>chemicals avoided/yr</span>
              </div>
              <div className="meter-result-stat good-gained">
                <small><NectarDropIcon size={13} /> Minerals Gained</small>
                <strong>+{(dailyCups * 380).toLocaleString()} mg</strong>
                <span>natural iron & minerals</span>
              </div>
              <div className="meter-result-stat energy-benefit">
                <small>⚡ Low GI (35–40)</small>
                <strong>Zero Crashes</strong>
                <span>sustained energy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

/* =========================================================
   04: INTERACTIVE FILTERABLE MENU WITH DIETARY WELLNESS CHIPS
========================================================= */
function MenuSection({ onAddToTray }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDietary, setActiveDietary] = useState("All");

  const categories = ["All", "Signature Coffee", "Traditional Tea", "Healthy Coolers", "Traditional Snacks"];

  const dietaryFilters = [
    { id: "All", label: "All Items" },
    { id: "diabetic-friendly", label: "Diabetic-Friendly (Low GI)" },
    { id: "immunity-boost", label: "Immunity Boost" },
    { id: "cooling-elixirs", label: "Cooling Elixirs" },
    { id: "vegan-friendly", label: "Vegan Friendly" }
  ];

  let filteredItems = MENU_DATA;
  if (activeCategory !== "All") {
    filteredItems = filteredItems.filter((item) => item.category === activeCategory);
  }
  if (activeDietary !== "All") {
    filteredItems = filteredItems.filter(
      (item) => item.dietary && item.dietary.includes(activeDietary)
    );
  }

  const handleWhatsAppOrder = (itemTitle) => {
    const text = encodeURIComponent(
      `Hello! I'm interested in ordering/tasting "${itemTitle}" at Arogya Thatibellam Caffee.`
    );
    window.open(`https://wa.me/918309131127?text=${text}`, "_blank");
  };

  return (
    <RevealSection id="menu" className="menu-section">
      <div className="menu-heading">
        <div className="menu-intro">
          <h2 className="reveal-item">
            Flavours.<br />
            <em>Pure</em><br />
            wellness.
          </h2>
          <p className="reveal-item">
            Explore our handcrafted traditional menu with zero refined sugar.
            Explore our handcrafted traditional menu with zero refined sugar. Each authentic recipe is prepared fresh with pure palm jaggery.
          </p>
        </div>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="menu-tabs-wrapper reveal-item">
        <div className="menu-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`menu-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              {cat !== "All" && (
                <small className="cat-count">
                  ({MENU_DATA.filter((m) => m.category === cat).length})
                </small>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* DIETARY & WELLNESS FILTER CHIPS */}
      <div className="menu-dietary-row reveal-item">
        <span className="dietary-filter-heading">
          <Sparkles size={13} color="#C98B2E" /> Wellness Filter:
        </span>
        <div className="dietary-chips-list">
          {dietaryFilters.map((df) => (
            <button
              key={df.id}
              type="button"
              className={`dietary-chip-btn ${activeDietary === df.id ? "active" : ""}`}
              onClick={() => setActiveDietary(df.id)}
            >
              {df.label}
              {df.id !== "All" && (
                <span className="chip-counter">
                  {MENU_DATA.filter((m) => m.dietary && m.dietary.includes(df.id)).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-divider" />

      {/* ALTERNATING MENU LIST */}
      <div className="menu-list-premium">
        {filteredItems.map((item, index) => {
          const isGroupA = index % 2 === 0; // Items 1, 3, 5, 7, 9 (1-based)

          if (isGroupA) {
            // ITEMS 1, 3, 5, 7, 9:
            // COST BESIDE ITEM NAME ON ITS LEFT SIDE, PHOTO AT RIGHT CORNER COMPLETELY.
            return (
              <article
                className="menu-item menu-item-group-a reveal-item"
                key={item.no}
                onClick={() => handleWhatsAppOrder(item.title)}
                title="Click to enquire on WhatsApp"
              >
                <div className="menu-number">{item.no}</div>

                <div className="menu-item-info">
                  <div className="menu-badges-line">
                    <span className="menu-category">{item.category}</span>
                    {item.badge && (
                      <span className={`menu-pill pill-${item.badgeType}`}>
                        {item.badge}
                      </span>
                    )}
                    <span className="menu-tag">{item.tag}</span>
                  </div>
                  {/* PRICE JUST BESIDE ITEM NAME & ADD TO TRAY */}
                  <div className="menu-title-line">
                    <h3>{item.title}</h3>
                    <span className="menu-price-tag">{item.price}</span>
                    <button
                      type="button"
                      className="add-to-tray-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToTray && onAddToTray(item);
                      }}
                      title="Add to Tasting Tray"
                    >
                      <Plus size={13} /> Add to Tray
                    </button>
                    <span className="quick-wa-btn">
                      Enquire <ArrowUpRight size={13} />
                    </span>
                  </div>
                  <p>{item.desc}</p>
                </div>

                {/* PHOTO AT RIGHT CORNER COMPLETELY */}
                <div className="menu-thumb-wrap thumb-right-corner">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="menu-thumb-img"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </article>
            );
          } else {
            // ITEMS 2, 4, 6, 8, 10:
            // PHOTO AT LEFT CORNER, ITEM NAMES MOVED TO RIGHT, COST BESIDE ITEM NAME (RIGHT SIDE).
            return (
              <article
                className="menu-item menu-item-group-b reveal-item"
                key={item.no}
                onClick={() => handleWhatsAppOrder(item.title)}
                title="Click to enquire on WhatsApp"
              >
                {/* PHOTO AT LEFT CORNER */}
                <div className="menu-thumb-wrap thumb-left-corner">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="menu-thumb-img"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* ITEM NAMES & INFO MOVED TO RIGHT */}
                <div className="menu-item-info text-align-right">
                  <div className="menu-badges-line justify-end">
                    <span className="menu-tag">{item.tag}</span>
                    {item.badge && (
                      <span className={`menu-pill pill-${item.badgeType}`}>
                        {item.badge}
                      </span>
                    )}
                    <span className="menu-category">{item.category}</span>
                  </div>
                  {/* PRICE JUST BESIDE ITEM NAME & ADD TO TRAY */}
                  <div className="menu-title-line justify-end">
                    <span className="quick-wa-btn">
                      Enquire <ArrowUpRight size={13} />
                    </span>
                    <button
                      type="button"
                      className="add-to-tray-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToTray && onAddToTray(item);
                      }}
                      title="Add to Tasting Tray"
                    >
                      <Plus size={13} /> Add to Tray
                    </button>
                    <h3>{item.title}</h3>
                    <span className="menu-price-tag">{item.price}</span>
                  </div>
                  <p>{item.desc}</p>
                </div>

                <div className="menu-number">{item.no}</div>
              </article>
            );
          }
        })}
      </div>

      <div className="menu-footer reveal-item">
        <span>* Prices shown are standard retail recommendations and may vary slightly by outlet format.</span>
        <a
          href="https://wa.me/918309131127?text=Hi%2C%20please%20send%20me%20the%20complete%20Arogya%20Thatibellam%20Caffee%20PDF%20menu"
          target="_blank"
          rel="noreferrer"
          className="btn btn-dark btn-sm"
        >
          <MessageCircle size={15} /> Request Full PDF Menu via WhatsApp
        </a>
      </div>
    </RevealSection>
  );
}

/* =========================================================
   05: SIGNATURE CRAVINGS WITH AUTHENTIC PHOTOGRAPHY
========================================================= */
function Signatures() {
  const signatures = [
    {
      no: "01",
      kicker: "FLAGSHIP ICON",
      title: "Thatibellam Filter Coffee",
      tagline: "Bold South Indian decoction sweetened with palm jaggery in a brass cup.",
      notes: "Caramel, roasted chicory, deep malt",
      image: "/signature-coffee.jpg",
      badge: "Signature Brew"
    },
    {
      no: "02",
      kicker: "ICED & RESTORATIVE",
      title: "Palm Jaggery Mint Cooler",
      tagline: "Slow-pressed thatibellam nectar with crushed ice, garden mint & lime.",
      notes: "Refreshing citrus, sweet molasses, cooling herbs",
      image: "/signature-cooler.jpg",
      badge: "Summer Bestseller"
    },
    {
      no: "03",
      kicker: "AYURVEDIC COMFORT",
      title: "Earthen Pot Spiced Chai",
      tagline: "Slow-brewed strong tea infused with crushed ginger, cardamom & palm jaggery.",
      notes: "Warm spice, creamy milk, soothing warmth",
      image: "/signature-tea.jpg",
      badge: "Immunity Special"
    }
  ];

  return (
    <section id="signatures" className="products">
      <div className="products-head">
        <h2>
          Brewed to be<br />
          <em>craved.</em>
        </h2>
        <p className="signatures-sub">
          Experience the handcrafted drinks that earned Arogya its cult following across Andhra Pradesh and Telangana.
        </p>
      </div>

      <div className="product-grid">
        {signatures.map((sig) => (
          <article className="product-card-photo" key={sig.no}>
            <div className="product-image-wrap">
              {/* Background ambient backdrop that blurs when cup pops out */}
              <div
                className="product-bg-ambient"
                style={{ backgroundImage: `url(${sig.image})` }}
                aria-hidden="true"
              />
              <div className="product-pop-glow" />

              {/* The cup/glass that pops out with 3D animation */}
              <div className="product-cup-pop">
                <img src={sig.image} alt={sig.title} className="product-photo" />
              </div>

              <span className="product-photo-badge">{sig.badge}</span>
              <span className="product-index">{sig.no}</span>
            </div>
            <div className="product-content">
              <small>{sig.kicker}</small>
              <h3>{sig.title}</h3>
              <p>{sig.tagline}</p>
              <div className="product-notes">
                <span>Tasting Notes:</span> {sig.notes}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   06: THE EXPERIENCE
========================================================= */
function Experience() {
  return (
    <RevealSection id="experience" className="experience">
      <div className="experience-top">
        <h2 className="reveal-item">
          Come for the<br />
          <em>taste.</em><br />
          Stay for the feeling.
        </h2>
      </div>
      <div className="experience-line">
        <div className="experience-card reveal-item">
          <span>01</span>
          <h3>ARRIVE</h3>
          <p>
            Warm earthy brass tones, gentle aroma of freshly roasted filter coffee,
            and an ambiance designed to slow down the rush of city life.
          </p>
        </div>
        <div className="experience-card reveal-item">
          <span>02</span>
          <h3>DISCOVER</h3>
          <p>
            Taste the ancient caramel complexity of unrefined palm jaggery paired with
            traditional South Indian snacks — zero refined sugar guilt.
          </p>
        </div>
        <div className="experience-card reveal-item">
          <span>03</span>
          <h3>CONNECT</h3>
          <p>
            A vibrant neighborhood meeting point for friends, family, creators, and business
            conversations over a warm brass tumbler.
          </p>
        </div>
      </div>
    </RevealSection>
  );
}

/* =========================================================
   07: FRANCHISE OPPORTUNITY & INTERACTIVE LEAD FORM
========================================================= */
function Franchise() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    budget: "₹10L – ₹15L (Express Kiosk)",
    model: "Express Takeaway Kiosk (100–250 sq.ft)",
    timeline: "Ready Immediately (< 30 Days)",
    experience: "First-Time Entrepreneur (Needs guidance)"
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your name and phone number.");
      return;
    }

    const message = encodeURIComponent(
      `*Arogya Thatibellam Caffee — Official Franchise Application*\n\n` +
      `👤 *Applicant Name:* ${formData.name}\n` +
      `📞 *Phone / WhatsApp:* ${formData.phone}\n` +
      `📧 *Email:* ${formData.email || "Not provided"}\n` +
      `📍 *Target City & Locality:* ${formData.city || "Not specified"}\n` +
      `🏬 *Preferred Store Format:* ${formData.model}\n` +
      `💰 *Investment Budget:* ${formData.budget}\n` +
      `⏱️ *Launch Timeline:* ${formData.timeline}\n` +
      `💼 *Background:* ${formData.experience}\n\n` +
      `I would like to receive the official Arogya Franchise Deck, financial projections, and schedule an onboarding discussion.`
    );

    window.open(`https://wa.me/918309131127?text=${message}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="franchise" className="franchise">
      <div className="franchise-container">
        <p className="franchise-intro">
          Partner with Arogya Thatibellam Caffee to launch high-margin, low-capex café
          outlets in your city. Our unique palm-jaggery health USP creates repeat everyday customers.
        </p>

        {/* TWO BUSINESS MODELS CARDS */}
        <div className="franchise-models">
          <div className="model-card">
            <span className="model-tag">QUICK PAYBACK</span>
            <h4>Express / Kiosk Model</h4>
            <ul>
              <li><Check size={14} /> 100 – 250 sq.ft footprint</li>
              <li><Check size={14} /> High-turnover takeaway & delivery</li>
              <li><Check size={14} /> ₹10L – ₹15L initial setup</li>
              <li><Check size={14} /> Estimated 8–12 month payback</li>
            </ul>
          </div>
          <div className="model-card">
            <span className="model-tag highlight">FULL EXPERIENCE</span>
            <h4>Lounge Café Model</h4>
            <ul>
              <li><Check size={14} /> 400 – 1000+ sq.ft dine-in space</li>
              <li><Check size={14} /> Complete hot, iced & snack menu</li>
              <li><Check size={14} /> ₹20L – ₹30L total investment</li>
              <li><Check size={14} /> Higher average bill value</li>
            </ul>
          </div>
        </div>

        {/* EXPANDED FRANCHISE APPLICATION & 5 STEPS GRID */}
        <div className="franchise-grid">
          {/* EXPANDED QUICK FRANCHISE APPLICATION */}
          <div className="franchise-form-wrap expanded-form-wrap">
            <div className="form-head">
              <Sparkles size={20} color="#C98B2E" />
              <div>
                <h3>Quick Franchise Application</h3>
                <p>Submit your details to receive the official Franchise Deck & financial model instantly on WhatsApp.</p>
              </div>
            </div>

            {submitted ? (
              <div className="form-success">
                <CheckCircle2 size={36} color="#4E6B35" />
                <h4>Thank you, {formData.name}!</h4>
                <p>Your franchise enquiry has been formatted and opened in WhatsApp. Our expansion team will connect with you within 2 hours.</p>
                <button className="btn btn-outline btn-sm" onClick={() => setSubmitted(false)}>
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="franchise-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Reddy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>WhatsApp / Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred City & Locality *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyderabad (Gachibowli), Vijayawada"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Outlet Model</label>
                    <select
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    >
                      <option value="Express Takeaway Kiosk (100–250 sq.ft)">Express Takeaway Kiosk (100–250 sq.ft)</option>
                      <option value="Lounge Café Dine-in (400–1000+ sq.ft)">Lounge Café Dine-in (400–1000+ sq.ft)</option>
                      <option value="Highway Hub / Fuel Station Outlet">Highway Hub / Fuel Station Outlet</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Investment Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="₹10L – ₹15L (Kiosk Setup)">₹10L – ₹15L (Kiosk Setup)</option>
                      <option value="₹15L – ₹25L (Express Lounge)">₹15L – ₹25L (Express Lounge)</option>
                      <option value="₹25L – ₹40L (Flagship Lounge)">₹25L – ₹40L (Flagship Lounge)</option>
                      <option value="₹40L+ (Multi-Unit Master Franchise)">₹40L+ (Multi-Unit Master Franchise)</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expected Launch Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    >
                      <option value="Ready Immediately (< 30 Days)">Ready Immediately (&lt; 30 Days)</option>
                      <option value="Within 1 to 3 Months">Within 1 to 3 Months</option>
                      <option value="Exploring for 3 to 6 Months">Exploring for 3 to 6 Months</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Prior Business / Retail Experience</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    >
                      <option value="First-Time Entrepreneur (Needs guidance)">First-Time Entrepreneur (Needs guidance)</option>
                      <option value="Existing Café / F&B Owner">Existing Café / F&amp;B Owner</option>
                      <option value="Commercial Property Owner">Commercial Property Owner</option>
                      <option value="Corporate Professional / Investor">Corporate Professional / Investor</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-gold form-submit-btn w-100">
                  <Send size={16} /> Submit Application &amp; Chat on WhatsApp
                </button>
              </form>
            )}

            <div className="direct-contacts">
              <a href="tel:8309131127" className="contact-mini">
                <Phone size={15} /> Direct Calling Hotline: +91 83091 31127
              </a>
              <a href="mailto:arogyathatibellamcaffee@gmail.com" className="contact-mini">
                <Mail size={15} /> arogyathatibellamcaffee@gmail.com
              </a>
            </div>
          </div>

          {/* 5 STEPS TO LAUNCH & SUPPORT ECOSYSTEM */}
          <div className="franchise-steps-wrap expanded-steps-wrap">
            <div className="form-head">
              <Award size={20} color="#C98B2E" />
              <div>
                <h3>5 Steps to Launch Your Café</h3>
                <p>From initial application to grand opening in 45 days.</p>
              </div>
            </div>

            <div className="steps-list">
              {FRANCHISE_STEPS.map(([no, title, text]) => (
                <div className="step" key={no}>
                  <b>{no}</b>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <ArrowUpRight size={17} />
                </div>
              ))}
            </div>

            <div className="franchise-support-strip">
              <div className="support-badge-item">
                <CheckCircle2 size={15} color="#C98B2E" />
                <span>100% Barista &amp; Operational Training</span>
              </div>
              <div className="support-badge-item">
                <CheckCircle2 size={15} color="#C98B2E" />
                <span>Proprietary Palm Jaggery Supply Chain</span>
              </div>
              <div className="support-badge-item">
                <CheckCircle2 size={15} color="#C98B2E" />
                <span>Standardized Automated Equipment</span>
              </div>
              <div className="support-badge-item">
                <CheckCircle2 size={15} color="#C98B2E" />
                <span>38% – 42% Operating Net Margins</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   08: LOCATIONS & STORE LOCATOR
========================================================= */
function Stores() {
  const [activePin, setActivePin] = useState(null);

  const hubLocations = [
    {
      id: "hyd",
      city: "Hyderabad",
      area: "Madhapur & Banjara Hills",
      timing: "6:00 AM – 11:00 PM",
      status: "Flagship Hub",
      mapsUrl: "https://www.google.com/maps/search/Arogya+Thatibellam+Caffee+Hyderabad",
      x: 24.4,
      y: 32.3
    },
    {
      id: "vja",
      city: "Vijayawada",
      area: "Benz Circle & MG Road",
      timing: "6:00 AM – 10:30 PM",
      status: "Central Lounge",
      mapsUrl: "https://www.google.com/maps/search/Arogya+Thatibellam+Caffee+Vijayawada",
      x: 44.0,
      y: 61.0
    },
    {
      id: "viz",
      city: "Visakhapatnam",
      area: "Siripuram & Beach Road",
      timing: "6:00 AM – 10:30 PM",
      status: "Coastal Hub",
      mapsUrl: "https://www.google.com/maps/search/Arogya+Thatibellam+Caffee+Visakhapatnam",
      x: 78.0,
      y: 26.0
    }
  ];

  return (
    <section id="stores" className="stores">
      <div className="stores-copy">
        <h2>
          Visit us<br />
          <em>near you.</em>
        </h2>
        <p>
          Drop by our outlets for an authentic cup of thatibellam filter coffee, warm snacks,
          and a relaxed community atmosphere.
        </p>

        {/* QUICK CITY SELECTOR BUTTONS */}
        <div className="city-quick-selector">
          <span className="city-quick-label">
            <Navigation size={12} color="#C98B2E" /> Select Regional Hub:
          </span>
          <div className="city-quick-buttons">
            {hubLocations.map((loc) => (
              <button
                key={loc.id}
                type="button"
                className={`city-pill-btn ${activePin === loc.id ? "active" : ""}`}
                onClick={() => setActivePin(activePin === loc.id ? null : loc.id)}
              >
                <Coffee size={12} /> {loc.city}
                <span className="city-pulse-dot" />
              </button>
            ))}
          </div>
        </div>

        <div className="stores-cards-list">
          {STORES_LIST.map((store) => {
            const isMatch =
              (activePin === "hyd" && store.city === "Hyderabad") ||
              (activePin === "vja" && store.city === "Vijayawada") ||
              (activePin === "viz" && store.city === "Visakhapatnam");
            return (
              <div
                className={`store-card-item ${isMatch ? "highlighted-hub" : ""}`}
                key={store.city}
                onMouseEnter={() => {
                  if (store.city === "Hyderabad") setActivePin("hyd");
                  if (store.city === "Vijayawada") setActivePin("vja");
                  if (store.city === "Visakhapatnam") setActivePin("viz");
                }}
              >
                <div className="store-info-col">
                  <div className="store-badge-city">
                    <MapPin size={14} /> <b>{store.city}</b>
                    <span>{store.status}</span>
                    <span className="store-live-dot">● Open Now</span>
                  </div>
                  <h4>{store.area}</h4>
                  <div className="store-timings">
                    <Clock size={13} /> {store.timing} (Daily)
                  </div>
                </div>
                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="store-directions-btn"
                >
                  <Navigation size={13} /> Get Directions
                </a>
              </div>
            );
          })}
        </div>

        <div className="store-extra-note">
          <span>Looking to open an outlet in your locality?</span>
          <a href="#franchise">Enquire for Franchise Area Rights →</a>
        </div>
      </div>

      <div className="store-map">
        {/* Authentic SVG Regional Geographic Map (Telangana & Andhra Pradesh) */}
        <svg
          className="regional-vector-map"
          viewBox="0 0 800 620"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Landmass & Terrain Gradients */}
            <linearGradient id="tgLandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2CFA5" />
              <stop offset="50%" stopColor="#DAC392" />
              <stop offset="100%" stopColor="#CFB37E" />
            </linearGradient>

            <linearGradient id="apLandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8D6AD" />
              <stop offset="45%" stopColor="#DEC796" />
              <stop offset="100%" stopColor="#D4BA85" />
            </linearGradient>

            {/* Ocean Depth Gradients */}
            <linearGradient id="oceanDeepGrad" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#9EBFAB" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#8CB29C" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#789A88" stopOpacity="0.98" />
            </linearGradient>

            <linearGradient id="shelfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B3CFBC" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#9EBFAB" stopOpacity="0.2" />
            </linearGradient>

            {/* Sacred River Waterway Gradient */}
            <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A6F5A" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#3A5B47" stopOpacity="0.85" />
            </linearGradient>

            {/* Flowing Coffee Decoction Highway Gradient */}
            <linearGradient id="liquidCoffeeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFAE33" />
              <stop offset="25%" stopColor="#FFF3D1" />
              <stop offset="50%" stopColor="#C98B2E" />
              <stop offset="80%" stopColor="#FFAE33" />
              <stop offset="100%" stopColor="#7A4213" />
            </linearGradient>

            {/* Radiant Auras for Floating Cup & Bean */}
            <radialGradient id="cupGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFAE33" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#C98B2E" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#C98B2E" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="beanGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFC861" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#9C5A1D" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#9C5A1D" stopOpacity="0" />
            </radialGradient>

            {/* Topographic Elevation Stippling Pattern */}
            <pattern id="contourLines" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0 10 Q 10 5 20 10" fill="none" stroke="rgba(77, 48, 20, 0.05)" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Cartographic Background Grid (Graticule) */}
          <g className="map-graticule">
            <line x1="195" y1="20" x2="195" y2="600" stroke="rgba(77, 48, 20, 0.1)" strokeDasharray="3 5" />
            <text x="195" y="16" fill="rgba(77, 48, 20, 0.4)" fontSize="8.5" fontWeight="700" textAnchor="middle">78° E</text>

            <line x1="360" y1="20" x2="360" y2="600" stroke="rgba(77, 48, 20, 0.1)" strokeDasharray="3 5" />
            <text x="360" y="16" fill="rgba(77, 48, 20, 0.4)" fontSize="8.5" fontWeight="700" textAnchor="middle">80° E</text>

            <line x1="525" y1="20" x2="525" y2="600" stroke="rgba(77, 48, 20, 0.1)" strokeDasharray="3 5" />
            <text x="525" y="16" fill="rgba(77, 48, 20, 0.4)" fontSize="8.5" fontWeight="700" textAnchor="middle">82° E</text>

            <line x1="690" y1="20" x2="690" y2="600" stroke="rgba(77, 48, 20, 0.1)" strokeDasharray="3 5" />
            <text x="690" y="16" fill="rgba(77, 48, 20, 0.4)" fontSize="8.5" fontWeight="700" textAnchor="middle">84° E</text>

            <line x1="20" y1="160" x2="780" y2="160" stroke="rgba(77, 48, 20, 0.1)" strokeDasharray="3 5" />
            <text x="14" y="163" fill="rgba(77, 48, 20, 0.4)" fontSize="8.5" fontWeight="700" textAnchor="end">18° N</text>

            <line x1="20" y1="330" x2="780" y2="330" stroke="rgba(77, 48, 20, 0.1)" strokeDasharray="3 5" />
            <text x="14" y="333" fill="rgba(77, 48, 20, 0.4)" fontSize="8.5" fontWeight="700" textAnchor="end">16° N</text>

            <line x1="20" y1="500" x2="780" y2="500" stroke="rgba(77, 48, 20, 0.1)" strokeDasharray="3 5" />
            <text x="14" y="503" fill="rgba(77, 48, 20, 0.4)" fontSize="8.5" fontWeight="700" textAnchor="end">14° N</text>
          </g>

          {/* Bay of Bengal Ocean with Coastal Depth Shelf */}
          {/* Coastal Shelf Depth Buffer */}
          <path
            d="M 700 30 C 670 70, 630 110, 595 155 C 550 200, 520 230, 495 260 C 470 295, 460 330, 455 370 C 445 410, 420 440, 390 480 C 360 515, 335 550, 315 620 L 800 620 L 800 0 L 730 0 Z"
            fill="url(#shelfGrad)"
          />
          {/* Main Bay of Bengal Ocean Body */}
          <path
            d="M 715 80 C 685 110, 645 150, 624 161 C 580 210, 550 245, 525 275 C 515 295, 495 325, 485 365 C 475 405, 460 440, 430 475 C 390 515, 360 550, 345 620 L 800 620 L 800 0 L 720 0 Z"
            fill="url(#oceanDeepGrad)"
            stroke="rgba(74, 111, 90, 0.35)"
            strokeWidth="1.5"
          />

          {/* Animated Wave Ripples in Bay of Bengal */}
          <g className="ocean-ripples" opacity="0.65">
            <path d="M 660 280 Q 690 270 720 280 T 780 280" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" className="wave-ripple ripple-1" />
            <path d="M 630 350 Q 660 340 690 350 T 750 350" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" className="wave-ripple ripple-2" />
            <path d="M 590 430 Q 620 420 650 430 T 710 430" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" className="wave-ripple ripple-3" />
            <path d="M 540 510 Q 570 500 600 510 T 660 510" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeLinecap="round" className="wave-ripple ripple-4" />
          </g>

          {/* Bay of Bengal Classical Cartographic Typography */}
          <text
            x="680"
            y="380"
            fill="rgba(255, 255, 255, 0.72)"
            fontSize="15"
            fontFamily="'DM Serif Display', serif"
            letterSpacing="6"
            textAnchor="middle"
            transform="rotate(-52 680 380)"
          >
            BAY OF BENGAL
          </text>
          <text
            x="705"
            y="405"
            fill="rgba(255, 255, 255, 0.45)"
            fontSize="7.5"
            fontWeight="700"
            letterSpacing="3"
            textAnchor="middle"
            transform="rotate(-52 705 405)"
          >
            COROMANDEL & EASTERN SEA
          </text>

          {/* ANDHRA PRADESH Landmass (Coastal Andhra & Rayalaseema) */}
          <path
            d="M 715 80 C 685 110, 645 150, 624 161 C 580 210, 550 245, 525 275 C 515 295, 495 325, 485 365 C 475 405, 460 440, 430 475 C 390 515, 360 550, 345 620 L 210 610 C 170 570, 145 520, 135 450 C 130 395, 145 355, 165 330 C 195 340, 240 325, 280 305 C 310 290, 335 270, 350 240 C 365 205, 375 170, 400 150 C 460 135, 530 115, 600 95 C 650 85, 690 80, 715 80 Z"
            fill="url(#apLandGrad)"
            stroke="rgba(77, 48, 20, 0.35)"
            strokeWidth="1.5"
          />

          {/* TELANGANA Landmass (Deccan Plateau) */}
          <path
            d="M 220 50 C 260 60, 300 80, 320 95 C 340 110, 365 140, 375 170 C 365 205, 350 240, 335 270 C 310 290, 275 305, 230 325 C 195 340, 180 345, 165 330 C 145 295, 130 250, 120 200 C 115 160, 125 120, 145 80 C 170 60, 195 45, 220 50 Z"
            fill="url(#tgLandGrad)"
            stroke="rgba(77, 48, 20, 0.4)"
            strokeWidth="1.5"
          />

          {/* Topographic Elevation Texture */}
          <rect x="110" y="40" width="610" height="570" fill="url(#contourLines)" opacity="0.6" pointerEvents="none" />

          {/* Eastern Ghats Mountain Ranges Topography */}
          <g className="eastern-ghats-relief" stroke="rgba(77, 48, 20, 0.22)" strokeWidth="1.2" fill="none">
            <path d="M 590 120 C 570 140, 550 150, 530 170" strokeDasharray="2 3" />
            <path d="M 575 110 C 555 130, 535 145, 515 160" />
            <path d="M 555 100 C 535 120, 515 135, 495 155" />
            <text x="545" y="105" fill="rgba(77, 48, 20, 0.4)" fontSize="7" fontWeight="800" letterSpacing="1">EASTERN GHATS</text>

            <path d="M 430 175 C 410 190, 395 210, 385 230" strokeDasharray="3 3" />
            <path d="M 445 185 C 425 205, 410 220, 400 240" />

            <path d="M 270 330 C 250 360, 240 400, 235 440" strokeDasharray="2 3" />
            <path d="M 285 340 C 265 375, 255 410, 250 450" />
            <text x="250" y="410" fill="rgba(77, 48, 20, 0.35)" fontSize="6.5" fontWeight="700" letterSpacing="1" transform="rotate(-65 250 410)">NALLAMALA RANGE</text>
          </g>

          {/* Inter-State Boundary (Telangana & Andhra Pradesh) */}
          <path
            d="M 375 170 C 365 205, 350 240, 335 270 C 310 290, 275 305, 230 325 C 195 340, 180 345, 165 330"
            fill="none"
            stroke="rgba(77, 48, 20, 0.45)"
            strokeWidth="1.8"
            strokeDasharray="5 4"
          />

          {/* Regional State Labels */}
          <text x="225" y="125" fill="rgba(77, 48, 20, 0.55)" fontSize="13" fontFamily="'DM Serif Display', serif" letterSpacing="3">
            TELANGANA
          </text>
          <text x="225" y="140" fill="rgba(77, 48, 20, 0.4)" fontSize="7.5" fontWeight="800" letterSpacing="2">
            DECCAN PLATEAU
          </text>

          <text x="490" y="235" fill="rgba(77, 48, 20, 0.55)" fontSize="13" fontFamily="'DM Serif Display', serif" letterSpacing="3">
            ANDHRA PRADESH
          </text>
          <text x="490" y="250" fill="rgba(77, 48, 20, 0.4)" fontSize="7.5" fontWeight="800" letterSpacing="2">
            COASTAL & GODAVARI DELTA
          </text>

          <text x="180" y="470" fill="rgba(77, 48, 20, 0.4)" fontSize="11" fontFamily="'DM Serif Display', serif" letterSpacing="2">
            RAYALASEEMA
          </text>

          {/* Sacred Rivers (Godavari & Krishna & Penna) */}
          {/* Godavari River Trunk & Delta */}
          <path
            d="M 130 115 C 180 105, 230 110, 275 125 C 320 140, 360 165, 400 195 C 440 230, 480 250, 525 275"
            fill="none"
            stroke="url(#riverGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M 480 250 C 500 270, 515 290, 520 305"
            fill="none"
            stroke="url(#riverGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <text x="350" y="152" fill="rgba(54, 88, 70, 0.75)" fontSize="7" fontWeight="800" letterSpacing="1">
            GODAVARI RIVER 〰
          </text>

          {/* Krishna River Trunk & Delta (Flows right past Vijayawada) */}
          <path
            d="M 155 315 C 190 335, 230 325, 275 295 C 300 280, 325 330, 352 378 C 385 415, 435 435, 475 440"
            fill="none"
            stroke="url(#riverGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <text x="255" y="280" fill="rgba(54, 88, 70, 0.75)" fontSize="7" fontWeight="800" letterSpacing="1">
            KRISHNA RIVER 〰
          </text>

          {/* Penna River */}
          <path
            d="M 150 440 C 210 460, 270 480, 345 530"
            fill="none"
            stroke="url(#riverGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Neighboring States Geographic Context */}
          <text x="180" y="38" fill="rgba(77, 48, 20, 0.3)" fontSize="8" fontWeight="800" letterSpacing="2">MAHARASHTRA</text>
          <text x="45" y="260" fill="rgba(77, 48, 20, 0.3)" fontSize="8" fontWeight="800" letterSpacing="2" transform="rotate(-90 45 260)">KARNATAKA</text>
          <text x="650" y="55" fill="rgba(77, 48, 20, 0.3)" fontSize="8" fontWeight="800" letterSpacing="2">ODISHA</text>
          <text x="350" y="65" fill="rgba(77, 48, 20, 0.3)" fontSize="8" fontWeight="800" letterSpacing="2">CHHATTISGARH</text>
          <text x="250" y="615" fill="rgba(77, 48, 20, 0.3)" fontSize="8" fontWeight="800" letterSpacing="2">TAMIL NADU</text>

          {/* Secondary Landmark Cities */}
          <g className="landmark-cities" fill="rgba(77, 48, 20, 0.75)" fontSize="7.5" fontWeight="700">
            <a href="https://www.google.com/maps/search/Arogya+Thatibellam+Caffee+Warangal" target="_blank" rel="noreferrer" style={{ cursor: "pointer" }}>
              <circle cx="280" cy="180" r="2.5" fill="#C98B2E" />
              <text x="286" y="183">Warangal</text>
            </a>
            <a href="https://www.google.com/maps/search/Arogya+Thatibellam+Caffee+Rajahmundry" target="_blank" rel="noreferrer" style={{ cursor: "pointer" }}>
              <circle cx="485" cy="255" r="2.5" fill="#C98B2E" />
              <text x="492" y="258">Rajahmundry</text>
            </a>
            <a href="https://www.google.com/maps/search/Arogya+Thatibellam+Caffee+Tirupati" target="_blank" rel="noreferrer" style={{ cursor: "pointer" }}>
              <circle cx="280" cy="545" r="2.5" fill="#C98B2E" />
              <text x="288" y="548">Tirupati</text>
            </a>
            <a href="https://www.google.com/maps/search/Arogya+Thatibellam+Caffee+Guntur" target="_blank" rel="noreferrer" style={{ cursor: "pointer" }}>
              <circle cx="335" cy="415" r="3.2" fill="#C98B2E" />
              <text x="342" y="418" fontWeight="800" fill="#2D1B0B">Guntur</text>
            </a>
          </g>

          {/* Cartographic Compass Rose (Top-Left) */}
          <g transform="translate(65, 80) scale(0.7)" className="compass-rose">
            <circle cx="0" cy="0" r="28" fill="none" stroke="rgba(201, 139, 46, 0.4)" strokeWidth="1" strokeDasharray="2 3" />
            <circle cx="0" cy="0" r="20" fill="none" stroke="rgba(77, 48, 20, 0.25)" strokeWidth="1" />
            <polygon points="0,-24 4,-6 0,0 -4,-6" fill="#C98B2E" />
            <polygon points="0,24 4,6 0,0 -4,6" fill="rgba(77, 48, 20, 0.5)" />
            <polygon points="24,0 6,4 0,0 6,-4" fill="rgba(77, 48, 20, 0.5)" />
            <polygon points="-24,0 -6,4 0,0 -6,-4" fill="rgba(77, 48, 20, 0.5)" />
            <text x="0" y="-28" textAnchor="middle" fill="#C98B2E" fontSize="9" fontWeight="900">N</text>
          </g>

          {/* Scale Bar (Bottom-Left) */}
          <g transform="translate(45, 585)" className="scale-bar">
            <line x1="0" y1="0" x2="120" y2="0" stroke="rgba(77, 48, 20, 0.6)" strokeWidth="2" />
            <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(77, 48, 20, 0.6)" strokeWidth="2" />
            <line x1="60" y1="-3" x2="60" y2="3" stroke="rgba(77, 48, 20, 0.6)" strokeWidth="1.5" />
            <line x1="120" y1="-4" x2="120" y2="4" stroke="rgba(77, 48, 20, 0.6)" strokeWidth="2" />
            <text x="0" y="-8" fontSize="7" fontWeight="800" fill="rgba(77, 48, 20, 0.6)">0</text>
            <text x="52" y="-8" fontSize="7" fontWeight="800" fill="rgba(77, 48, 20, 0.6)">100</text>
            <text x="108" y="-8" fontSize="7" fontWeight="800" fill="rgba(77, 48, 20, 0.6)">200 KM</text>
          </g>

          {/* ========================================================
              MUTUAL CONNECTING COFFEE HIGHWAY ROUTES (HYD ⇄ VJA ⇄ VIZ)
             ======================================================== */}
          {/* Master Mutual Circuit Path Definition (Clockwise):
              Hyd (195, 200) -> Vja (352, 378) -> Viz (624, 161) -> Hyd (195, 200) */}
          <g className="mutual-coffee-routes">
            {/* Outer Ambient Route Glow Ribbon */}
            <path
              d="M 195 200 C 235 240, 290 310, 352 378 C 435 350, 535 270, 624 161 C 490 145, 330 160, 195 200 Z"
              fill="none"
              stroke="rgba(201, 139, 46, 0.22)"
              strokeWidth="10"
              strokeLinejoin="round"
            />
            {/* Deep Espresso Highway Foundation Line */}
            <path
              d="M 195 200 C 235 240, 290 310, 352 378 C 435 350, 535 270, 624 161 C 490 145, 330 160, 195 200 Z"
              fill="none"
              stroke="rgba(77, 48, 20, 0.55)"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Flowing Golden Liquid Decoction Stream */}
            <path
              d="M 195 200 C 235 240, 290 310, 352 378 C 435 350, 535 270, 624 161 C 490 145, 330 160, 195 200 Z"
              fill="none"
              stroke="url(#liquidCoffeeGrad)"
              strokeWidth="2.5"
              strokeDasharray="14 18"
              className="liquid-coffee-stream"
              strokeLinejoin="round"
            />
          </g>

          {/* Route Info Badge Tags along the Corridors */}
          <g className="corridor-tags" fontSize="7" fontWeight="800">
            {/* Hyd to Vja */}
            <g transform="translate(265, 295) rotate(48)">
              <rect x="-42" y="-9" width="84" height="17" rx="8.5" fill="rgba(45, 27, 11, 0.85)" stroke="#C98B2E" strokeWidth="0.8" />
              <text x="0" y="3" fill="#FFEFBC" textAnchor="middle">HYD ⇄ VJA • NH 65</text>
            </g>
            {/* Vja to Viz */}
            <g transform="translate(490, 275) rotate(-38)">
              <rect x="-44" y="-9" width="88" height="17" rx="8.5" fill="rgba(45, 27, 11, 0.85)" stroke="#C98B2E" strokeWidth="0.8" />
              <text x="0" y="3" fill="#FFEFBC" textAnchor="middle">VJA ⇄ VIZ • NH 16</text>
            </g>
            {/* Viz to Hyd */}
            <g transform="translate(415, 140) rotate(-4)">
              <rect x="-48" y="-9" width="96" height="17" rx="8.5" fill="rgba(45, 27, 11, 0.85)" stroke="#C98B2E" strokeWidth="0.8" />
              <text x="0" y="3" fill="#FFEFBC" textAnchor="middle">VIZ ⇄ HYD • EXPRESS</text>
            </g>
          </g>

          {/* ========================================================
              COFFEE FLOAT ANIMATION:
              1. Floating Hot Coffee Cups ☕ gliding clockwise (Hyd -> Vja -> Viz -> Hyd)
              2. Floating Golden Roasted Coffee Beans 🫘 gliding counter-clockwise
             ======================================================== */}
          {/* FLOATING COFFEE CUP 1 (Starts from Hyderabad -> Vijayawada) */}
          <g className="coffee-float-cup">
            <animateMotion
              path="M 195 200 C 235 240, 290 310, 352 378 C 435 350, 535 270, 624 161 C 490 145, 330 160, 195 200 Z"
              dur="12s"
              begin="0s"
              repeatCount="indefinite"
              rotate="auto"
            />
            {/* Cup Graphic with Aura & Steam */}
            <g transform="scale(1.15) translate(-14, -14)">
              <circle cx="14" cy="14" r="17" fill="url(#cupGlowGrad)" />
              <ellipse cx="14" cy="20" rx="9" ry="2.5" fill="#FFE599" stroke="#946115" strokeWidth="1" />
              <path d="M 8 11 L 9.5 18 C 9.5 19.2 11.5 20 14 20 C 16.5 20 18.5 19.2 18.5 18 L 20 11 Z" fill="#FFAE33" stroke="#FFF9DF" strokeWidth="1.2" />
              <ellipse cx="14" cy="11" rx="6" ry="2" fill="#5B2E0B" stroke="#FFAE33" strokeWidth="0.8" />
              <path d="M 11 8 Q 10 5 12 3" stroke="#FFF9DF" strokeWidth="1.2" strokeLinecap="round" fill="none" className="steam-wisp-1" />
              <path d="M 14 7 Q 15 4 14 2" stroke="#FFF9DF" strokeWidth="1.2" strokeLinecap="round" fill="none" className="steam-wisp-2" />
              <path d="M 17 8 Q 18 5 16 3" stroke="#FFF9DF" strokeWidth="1.2" strokeLinecap="round" fill="none" className="steam-wisp-3" />
            </g>
          </g>

          {/* FLOATING COFFEE CUP 2 (Starts from Vijayawada -> Visakhapatnam) */}
          <g className="coffee-float-cup">
            <animateMotion
              path="M 195 200 C 235 240, 290 310, 352 378 C 435 350, 535 270, 624 161 C 490 145, 330 160, 195 200 Z"
              dur="12s"
              begin="-4s"
              repeatCount="indefinite"
              rotate="auto"
            />
            <g transform="scale(1.15) translate(-14, -14)">
              <circle cx="14" cy="14" r="17" fill="url(#cupGlowGrad)" />
              <ellipse cx="14" cy="20" rx="9" ry="2.5" fill="#FFE599" stroke="#946115" strokeWidth="1" />
              <path d="M 8 11 L 9.5 18 C 9.5 19.2 11.5 20 14 20 C 16.5 20 18.5 19.2 18.5 18 L 20 11 Z" fill="#FFAE33" stroke="#FFF9DF" strokeWidth="1.2" />
              <ellipse cx="14" cy="11" rx="6" ry="2" fill="#5B2E0B" stroke="#FFAE33" strokeWidth="0.8" />
              <path d="M 11 8 Q 10 5 12 3" stroke="#FFF9DF" strokeWidth="1.2" strokeLinecap="round" fill="none" className="steam-wisp-1" />
              <path d="M 14 7 Q 15 4 14 2" stroke="#FFF9DF" strokeWidth="1.2" strokeLinecap="round" fill="none" className="steam-wisp-2" />
              <path d="M 17 8 Q 18 5 16 3" stroke="#FFF9DF" strokeWidth="1.2" strokeLinecap="round" fill="none" className="steam-wisp-3" />
            </g>
          </g>

          {/* FLOATING COFFEE CUP 3 (Starts from Visakhapatnam -> Hyderabad) */}
          <g className="coffee-float-cup">
            <animateMotion
              path="M 195 200 C 235 240, 290 310, 352 378 C 435 350, 535 270, 624 161 C 490 145, 330 160, 195 200 Z"
              dur="12s"
              begin="-8s"
              repeatCount="indefinite"
              rotate="auto"
            />
            <g transform="scale(1.15) translate(-14, -14)">
              <circle cx="14" cy="14" r="17" fill="url(#cupGlowGrad)" />
              <ellipse cx="14" cy="20" rx="9" ry="2.5" fill="#FFE599" stroke="#946115" strokeWidth="1" />
              <path d="M 8 11 L 9.5 18 C 9.5 19.2 11.5 20 14 20 C 16.5 20 18.5 19.2 18.5 18 L 20 11 Z" fill="#FFAE33" stroke="#FFF9DF" strokeWidth="1.2" />
              <ellipse cx="14" cy="11" rx="6" ry="2" fill="#5B2E0B" stroke="#FFAE33" strokeWidth="0.8" />
              <path d="M 11 8 Q 10 5 12 3" stroke="#FFF9DF" strokeWidth="1.2" strokeLinecap="round" fill="none" className="steam-wisp-1" />
              <path d="M 14 7 Q 15 4 14 2" stroke="#FFF9DF" strokeWidth="1.2" strokeLinecap="round" fill="none" className="steam-wisp-2" />
              <path d="M 17 8 Q 18 5 16 3" stroke="#FFF9DF" strokeWidth="1.2" strokeLinecap="round" fill="none" className="steam-wisp-3" />
            </g>
          </g>

          {/* RECIPROCAL FLOATING ROASTED COFFEE BEANS (Flowing in opposite direction) */}
          {/* BEAN 1 (Vizag -> Vijayawada) */}
          <g className="coffee-float-bean">
            <animateMotion
              path="M 195 200 C 330 160, 490 145, 624 161 C 535 270, 435 350, 352 378 C 290 310, 235 240, 195 200 Z"
              dur="15s"
              begin="0s"
              repeatCount="indefinite"
              rotate="auto"
            />
            <g transform="scale(0.95) translate(-12, -12)">
              <circle cx="12" cy="12" r="14" fill="url(#beanGlowGrad)" />
              <ellipse cx="12" cy="12" rx="9" ry="6.5" fill="#3D1D09" stroke="#FFAE33" strokeWidth="1.4" />
              <path d="M 4 12 Q 8 10 12 12 Q 16 14 20 12" stroke="#FFEFBC" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </g>
          </g>

          {/* BEAN 2 (Vijayawada -> Hyderabad) */}
          <g className="coffee-float-bean">
            <animateMotion
              path="M 195 200 C 330 160, 490 145, 624 161 C 535 270, 435 350, 352 378 C 290 310, 235 240, 195 200 Z"
              dur="15s"
              begin="-5s"
              repeatCount="indefinite"
              rotate="auto"
            />
            <g transform="scale(0.95) translate(-12, -12)">
              <circle cx="12" cy="12" r="14" fill="url(#beanGlowGrad)" />
              <ellipse cx="12" cy="12" rx="9" ry="6.5" fill="#3D1D09" stroke="#FFAE33" strokeWidth="1.4" />
              <path d="M 4 12 Q 8 10 12 12 Q 16 14 20 12" stroke="#FFEFBC" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </g>
          </g>

          {/* BEAN 3 (Hyderabad -> Vizag) */}
          <g className="coffee-float-bean">
            <animateMotion
              path="M 195 200 C 330 160, 490 145, 624 161 C 535 270, 435 350, 352 378 C 290 310, 235 240, 195 200 Z"
              dur="15s"
              begin="-10s"
              repeatCount="indefinite"
              rotate="auto"
            />
            <g transform="scale(0.95) translate(-12, -12)">
              <circle cx="12" cy="12" r="14" fill="url(#beanGlowGrad)" />
              <ellipse cx="12" cy="12" rx="9" ry="6.5" fill="#3D1D09" stroke="#FFAE33" strokeWidth="1.4" />
              <path d="M 4 12 Q 8 10 12 12 Q 16 14 20 12" stroke="#FFEFBC" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </g>
          </g>
        </svg>

        {/* Radiating Concentric Pulse Rings behind Center Logo */}
        <div className="map-concentric-ring ring-1" />
        <div className="map-concentric-ring ring-2" />

        {/* 3 Coffee Cup Location Pointers - Clicking directly opens Google Maps */}
        {hubLocations.map((loc) => (
          <a
            key={loc.id}
            href={loc.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className={`coffee-map-pin pin-${loc.id} ${activePin === loc.id ? "active" : ""}`}
            style={{ left: `${loc.x}%`, top: `${loc.y}%`, textDecoration: "none" }}
            onMouseEnter={() => setActivePin(loc.id)}
            onMouseLeave={() => setActivePin(null)}
            title={`Open ${loc.city} Hub in Google Maps`}
            aria-label={`Open ${loc.city} Hub in Google Maps`}
          >
            <div className="coffee-pin-pulse" />
            <div className="coffee-pin-marker">
              <Coffee size={17} className="coffee-cup-icon" />
            </div>

            <div className="coffee-pin-label">
              <strong>{loc.city}</strong>
              <small>{loc.status}</small>
            </div>

            {/* Interactive Preview on Hover (without separate 'click on google maps' button) */}
            <div className="coffee-pin-tooltip">
              <div className="tooltip-top">
                <Coffee size={14} color="#C98B2E" />
                <span>{loc.city} Hub</span>
              </div>
              <p>{loc.area}</p>
              <div className="tooltip-timing">
                <Clock size={11} /> {loc.timing}
              </div>
            </div>
          </a>
        ))}

        {/* Center Arogya Thatibellam Caffee Logo Emblem */}
        <div className="map-center">
          <Leaf size={22} />
          <span>AROGYA</span>
          <small>THATI BELLAM CAFFEE</small>
          <div className="map-center-tag">TELUGU HERITAGE HUBS</div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   09: SOCIAL PROOF & GOOGLE REVIEWS
========================================================= */
function Testimonials() {
  return (
    <RevealSection className="testimonials" id="reviews">
      <div className="google-rating-banner reveal-item">
        <div className="google-logo-badge">
          <b>G</b>
          <span>Google Reviews</span>
        </div>
        <div className="rating-number">
          <strong>4.9</strong>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="#C98B2E" color="#C98B2E" />
            ))}
          </div>
        </div>
        <div className="review-stats">
          Based on 1,200+ authenticated customer ratings across outlets
        </div>
      </div>

      <div className="reviews-grid reveal-item">
        {REVIEWS.map((rev, i) => (
          <div className="review-card" key={i}>
            <div className="rev-stars">
              {[...Array(rev.rating)].map((_, idx) => (
                <Star key={idx} size={14} fill="#C98B2E" color="#C98B2E" />
              ))}
            </div>
            <p className="rev-text">“{rev.text}”</p>
            <div className="rev-author">
              <b>{rev.name}</b>
              <small>{rev.role}</small>
            </div>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}

/* =========================================================
   10: ACCESSIBLE FAQ ACCORDION
========================================================= */
function FAQ() {
  const [active, setActive] = useState(0);

  const faqs = [
    [
      "What makes Thatibellam (Palm Jaggery) healthier than refined sugar?",
      "Thatibellam is made from unrefined wild date/palmyra palm nectar. Unlike white sugar, it undergoes zero chemical bleaching. It has a significantly lower Glycemic Index (GI 35-40 vs 65+ for sugar), which prevents insulin crashes, and is naturally loaded with iron, potassium, magnesium, and calcium."
    ],
    [
      "Can diabetic customers drink Thatibellam coffee?",
      "Palm jaggery is unrefined and absorbed much more gradually into the bloodstream than cane sugar. While many health-conscious and borderline diabetic customers enjoy Thatibellam coffee, we always recommend consulting your doctor based on individual blood glucose management plans."
    ],
    [
      "What is the average investment required for an Arogya Franchise?",
      "Our compact Express/Kiosk format starts at ₹10 Lakhs to ₹15 Lakhs, including equipment, branding, and initial inventory. Full-format Café Lounges range between ₹18 Lakhs and ₹28 Lakhs. Most franchisees achieve operational breakeven within 3 to 4 months."
    ],
    [
      "Do I need prior food & beverage or café experience to run a franchise?",
      "No! Arogya provides complete end-to-end operational training, standard brew recipes, automated equipment, and raw material supply chain (including our exclusive authentic Thatibellam blend), so anyone with business dedication can operate successfully."
    ],
    [
      "Where do you source your Thatibellam from?",
      "We partner directly with traditional palm-tapping artisan clusters in Andhra Pradesh, ensuring pure, unadulterated, sustainably harvested palm jaggery of the highest grade."
    ]
  ];

  return (
    <section className="faq" id="faq">
      <div className="faq-head">
        <h2>
          Curious?<br />
          <em>Answers here.</em>
        </h2>
        <p className="faq-subtitle">
          Everything you need to know about our health benefits, brewing methods, and franchise setup.
        </p>
      </div>

      <div className="faq-list">
        {faqs.map(([q, a], i) => (
          <div className={`faq-item ${active === i ? "active" : ""}`} key={q}>
            <button
              onClick={() => setActive(active === i ? -1 : i)}
              aria-expanded={active === i}
            >
              <span>0{i + 1}</span>
              <b>{q}</b>
              <ChevronDown size={20} />
            </button>
            <div className="faq-answer">
              <p>{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   "FIRST CUP ON US" HERITAGE WELCOME TASTING PASS
========================================================= */
function WelcomeTastingPass() {
  const [copied, setCopied] = useState(false);
  const code = "AROGYA-GOLD";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClaimWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Arogya Thatibellam Caffee! I would like to claim my "First Cup On Us" Heritage Tasting Pass (Voucher Code: ${code}). Please verify and register my complimentary tasting pour!`
    );
    window.open(`https://wa.me/918309131127?text=${text}`, "_blank");
  };

  return (
    <section className="welcome-pass-section reveal-item" id="welcome-pass">
      <div className="welcome-pass-container">
        <div className="tasting-pass-card">
          {/* Left / Main Voucher Body */}
          <div className="pass-body">
            <div className="pass-top-meta">
              <div className="pass-brand">
                <span className="pass-mark">A</span>
                <div>
                  <strong>AROGYA</strong>
                  <small>THATI BELLAM CAFFEE</small>
                </div>
              </div>
              <span className="pass-pill-badge">WELCOME GUEST PASS</span>
            </div>

            <div className="pass-offer">
              <span className="pass-offer-kicker">HERITAGE TASTING VOUCHER</span>
              <h3>First Cup On Us.</h3>
              <p>
                Present this digital pass at any Arogya Thatibellam Caffee counter in Hyderabad, Vijayawada, or Visakhapatnam to receive a <b>complimentary tasting pour</b> of our Signature Thatibellam Filter Coffee.
              </p>
            </div>

            <div className="pass-terms">
              <span>• Valid for all first-time guests</span>
              <span>• 100% Wild Palm Jaggery</span>
              <span>• Served in authentic Brass Davarah</span>
            </div>
          </div>

          {/* Perforated Divider */}
          <div className="pass-perforation">
            <div className="notch notch-top" />
            <div className="perf-line" />
            <div className="notch notch-bottom" />
          </div>

          {/* Right Coupon Stub with Secret Code & Claim Button */}
          <div className="pass-stub">
            <small className="stub-label">OFFICIAL PASS CODE</small>
            <div className="stub-code-box" onClick={handleCopy} title="Click to copy code">
              <code>{code}</code>
              <button type="button" className="copy-code-btn" aria-label="Copy voucher code">
                {copied ? <Check size={14} color="#4E6B35" /> : <Copy size={14} />}
              </button>
            </div>
            {copied && <span className="copied-text">Copied to clipboard!</span>}

            <button
              type="button"
              className="btn btn-gold btn-sm stub-claim-btn"
              onClick={handleClaimWhatsApp}
            >
              <Ticket size={14} /> Claim on WhatsApp
            </button>
            <small className="stub-validity">Show at counter or WhatsApp before ordering</small>
          </div>
        </div>

        {/* Consolidated Direct Contact Strip */}
        <div className="pass-contact-strip">
          <span>Planning an event, group visit, or interested in our café franchise?</span>
          <div className="pass-contact-links">
            <a
              href="https://wa.me/918309131127?text=Hi%20Arogya%2C%20I%20want%20to%20connect%20with%20your%20team."
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              <MessageCircle size={15} /> Chat on WhatsApp
            </a>
            <a href="tel:8309131127" className="contact-link">
              <Phone size={15} /> Call 8309131127
            </a>
            <a href="mailto:arogyathatibellamcaffee@gmail.com" className="contact-link">
              <Mail size={15} /> Email Management
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TASTING TRAY FLOATING BAR & ORDER DRAWER
========================================================= */
function TastingTrayBar({ tray, onOpenTray }) {
  if (!tray || tray.length === 0) return null;

  const totalCount = tray.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = tray.reduce((sum, item) => sum + item.numericPrice * item.qty, 0);

  return (
    <div className="tasting-tray-dock" onClick={onOpenTray}>
      <div className="tray-dock-left">
        <div className="tray-dock-icon">
          <ShoppingBag size={18} />
          <span className="tray-count-bubble">{totalCount}</span>
        </div>
        <div className="tray-dock-info">
          <strong>Tasting Tray ({totalCount} {totalCount === 1 ? "item" : "items"})</strong>
          <span>Total: ₹{totalPrice}</span>
        </div>
      </div>
      <button className="tray-review-btn" type="button">
        Review & Order <ArrowUpRight size={15} />
      </button>
    </div>
  );
}

function TastingTrayModal({ isOpen, onClose, tray, onUpdateQty, onRemove, onClear, onAddToTray }) {
  const [selectedHub, setSelectedHub] = useState("Hyderabad (Madhapur & Banjara Hills)");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const totalCount = tray.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = tray.reduce((sum, item) => sum + item.numericPrice * item.qty, 0);

  // Intelligent Heritage Food & Drink Pairing Recommendation
  const hasCookies = tray.some((t) => t.no === "09");
  const hasMurukku = tray.some((t) => t.no === "10");
  const hasCoffee = tray.some((t) => t.category === "Signature Coffee");

  let suggestedPairing = null;
  if (!hasCookies) {
    suggestedPairing = MENU_DATA.find((m) => m.no === "09");
  } else if (!hasMurukku) {
    suggestedPairing = MENU_DATA.find((m) => m.no === "10");
  } else if (!hasCoffee) {
    suggestedPairing = MENU_DATA.find((m) => m.no === "01");
  } else {
    suggestedPairing = MENU_DATA.find((m) => m.no === "07");
  }

  const handleWhatsAppCheckout = () => {
    if (tray.length === 0) return;

    let itemsText = tray
      .map((item) => `• ${item.qty}x ${item.title} (${item.price} each = ₹${item.numericPrice * item.qty})`)
      .join("\n");

    const message = encodeURIComponent(
      `*Namaskaram Arogya Thatibellam Caffee!* ☕🌿\n\n` +
      `I would like to order this Tasting Tray:\n` +
      `--------------------------------\n` +
      `${itemsText}\n` +
      `--------------------------------\n` +
      `*Total Value:* ₹${totalPrice} (${totalCount} items)\n` +
      `*Selected Hub:* ${selectedHub}\n` +
      (notes ? `*Special Notes:* ${notes}\n` : "") +
      `--------------------------------\n` +
      `Please confirm order availability and preparation time.`
    );

    window.open(`https://wa.me/918309131127?text=${message}`, "_blank");
  };

  return (
    <div className="tray-modal-overlay" onClick={onClose}>
      <div className="tray-modal-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="tray-modal-header">
          <div className="modal-title-wrap">
            <ShoppingBag size={18} color="#C98B2E" />
            <h3>Your Heritage Tasting Tray</h3>
            <span className="modal-tray-count">{totalCount} items</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close tray">
            <X size={20} />
          </button>
        </div>

        {tray.length === 0 ? (
          <div className="tray-empty-state">
            <Coffee size={40} color="#C98B2E" />
            <h4>Your tray is empty</h4>
            <p>Browse our menu above and click "+ Add to Tray" on your favorite drinks and snacks.</p>
            <button className="btn btn-gold btn-sm" onClick={onClose}>
              Explore Menu
            </button>
          </div>
        ) : (
          <div className="tray-modal-body">
            <div className="tray-items-list">
              {tray.map((item) => (
                <div className="tray-item-row" key={item.no}>
                  <img src={item.image} alt={item.title} className="tray-item-img" />
                  <div className="tray-item-details">
                    <h4>{item.title}</h4>
                    <span className="tray-item-unit-price">{item.price} each</span>
                    {item.desc && <small className="tray-item-sub">{item.desc}</small>}
                  </div>
                  <div className="tray-qty-controls">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onUpdateQty(item.no, -1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="qty-val">{item.qty}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onUpdateQty(item.no, 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <div className="tray-item-total">
                    ₹{item.numericPrice * item.qty}
                  </div>
                  <button
                    type="button"
                    className="tray-remove-btn"
                    onClick={() => onRemove(item.no)}
                    title="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* CHEF'S HERITAGE PAIRING SUGGESTION */}
            {suggestedPairing && (
              <div className="tray-pairing-box">
                <div className="tray-pairing-header">
                  <Sparkles size={14} color="#C98B2E" />
                  <span>Chef's Heritage Pairing Suggestion</span>
                </div>
                <div className="tray-pairing-card">
                  <img
                    src={suggestedPairing.image}
                    alt={suggestedPairing.title}
                    className="tray-pairing-img"
                  />
                  <div className="tray-pairing-info">
                    <div className="tray-pairing-title-row">
                      <strong>{suggestedPairing.title}</strong>
                      <span className="tray-pairing-price">{suggestedPairing.price}</span>
                    </div>
                    <p>{suggestedPairing.desc}</p>
                  </div>
                  <button
                    type="button"
                    className="btn-add-pairing"
                    onClick={() => onAddToTray && onAddToTray(suggestedPairing)}
                    title="Add recommended pairing"
                  >
                    <Plus size={13} /> Add
                  </button>
                </div>
              </div>
            )}

            <div className="tray-order-settings">
              <div className="tray-setting-group">
                <label>Select Your Preferred Café Hub:</label>
                <select value={selectedHub} onChange={(e) => setSelectedHub(e.target.value)}>
                  <option value="Hyderabad (Madhapur & Banjara Hills)">Hyderabad (Madhapur & Banjara Hills)</option>
                  <option value="Vijayawada (Benz Circle & MG Road)">Vijayawada (Benz Circle & MG Road)</option>
                  <option value="Visakhapatnam (Siripuram & Beach Road)">Visakhapatnam (Siripuram & Beach Road)</option>
                  <option value="Guntur (Lakshmipuram Main Road)">Guntur (Lakshmipuram Main Road)</option>
                </select>
              </div>

              <div className="tray-setting-group">
                <label>Preparation Notes / Preferences:</label>
                <input
                  type="text"
                  placeholder="e.g. Extra hot, Less sweet, Pack for takeaway..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="tray-bill-summary">
              <div className="bill-row">
                <span>Subtotal ({totalCount} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="bill-row">
                <span>Authentic Brass Cup Experience</span>
                <span className="free-tag">Complimentary</span>
              </div>
              <div className="bill-divider" />
              <div className="bill-row grand-total">
                <strong>Grand Total</strong>
                <strong>₹{totalPrice}</strong>
              </div>
            </div>

            <div className="tray-actions">
              <button
                type="button"
                className="btn btn-gold tray-checkout-btn"
                onClick={handleWhatsAppCheckout}
              >
                <Send size={16} /> Place Tasting Tray Order on WhatsApp
              </button>
              <button type="button" className="tray-clear-btn" onClick={onClear}>
                Clear Tray
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   11: HIGH-CONVERSION FINAL CALL TO ACTION
========================================================= */
function CTA() {
  return (
    <section className="final-cta" id="contact">
      <div className="cta-glow" />
      <h2>
        Ready for a healthier<br />
        <em>cup of tradition?</em>
      </h2>
      <p>
        Whether you are craving an authentic brass-cup filter coffee or planning to launch
        your city's favorite café franchise, we are one message away.
      </p>

      <div className="cta-actions">
        <a
          className="btn btn-gold"
          href="https://wa.me/918309131127?text=Hi%20Arogya%2C%20I%20want%20to%20connect%20with%20your%20team."
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} /> Chat on WhatsApp
        </a>
        <a className="btn btn-outline" href="tel:8309131127">
          <Phone size={16} /> Call 8309131127
        </a>
        <a className="btn btn-outline" href="mailto:arogyathatibellamcaffee@gmail.com">
          <Mail size={16} /> Email Management
        </a>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */
function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">A</div>
          <h3>AROGYA</h3>
          <p>THATI BELLAM CAFFEE</p>
          <span>
            Tradition in Taste,<br />
            Health in Every Sip.
          </span>
          <div className="footer-fssai">
            <ShieldCheck size={14} /> 100% Food Grade • Certified Natural Palm Jaggery
          </div>
        </div>

        <div>
          <small>EXPLORE</small>
          <a href="#story">Our Heritage</a>
          <a href="#why-thatibellam">Why Thatibellam</a>
          <a href="#menu">Full Menu</a>
          <a href="#signatures">Signature Cravings</a>
          <a href="#experience">The Café Experience</a>
          <a href="#stores">Store Locations</a>
        </div>

        <div>
          <small>FRANCHISE & BUSINESS</small>
          <a href="#franchise">Franchise Models</a>
          <a href="#franchise">Apply for Franchise</a>
          <a href="tel:8309131127">
            <Phone size={14} /> +91 8309131127
          </a>
          <a href="mailto:arogyathatibellamcaffee@gmail.com">
            <Mail size={14} /> arogyathatibellamcaffee@gmail.com
          </a>
          <span className="footer-location">
            <MapPin size={14} /> Andhra Pradesh & Telangana
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Arogya Thatibellam Caffee. All rights reserved.</span>
        <a
          href="https://www.instagram.com/arogya.thatibellam.caffee/"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram size={17} /> @arogya.thatibellam.caffee
        </a>
        <span>Rooted in Telugu Heritage</span>
      </div>
    </footer>
  );
}

/* =========================================================
   ROOT APPLICATION
========================================================= */
function App() {
  const [tray, setTray] = useState([]);
  const [trayOpen, setTrayOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  // Tasting Tray Cart Actions
  const addToTray = (item) => {
    setTray((prev) => {
      const existing = prev.find((t) => t.no === item.no);
      if (existing) {
        return prev.map((t) => (t.no === item.no ? { ...t, qty: t.qty + 1 } : t));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setTrayOpen(true);
  };

  const updateTrayQty = (itemNo, delta) => {
    setTray((prev) =>
      prev
        .map((t) => {
          if (t.no === itemNo) {
            const newQty = t.qty + delta;
            return newQty > 0 ? { ...t, qty: newQty } : null;
          }
          return t;
        })
        .filter(Boolean)
    );
  };

  const removeFromTray = (itemNo) => {
    setTray((prev) => prev.filter((t) => t.no !== itemNo));
  };

  const clearTray = () => setTray([]);

  // Dawn to Dusk Ambience Theme
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("arogya-theme") || "dawn";
    }
    return "dawn";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("arogya-theme", theme);
    } catch (_) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dawn" ? "dusk" : "dawn"));
  };

  return (
    <div className="site visible">
      <ScrollProgressBar />
      <FloatingWhatsApp />

      {/* TASTING TRAY ORDER DRAWER MODAL */}
      <TastingTrayModal
        isOpen={trayOpen}
        onClose={() => setTrayOpen(false)}
        tray={tray}
        onUpdateQty={updateTrayQty}
        onRemove={removeFromTray}
        onClear={clearTray}
        onAddToTray={addToTray}
      />

      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        tray={tray}
        onOpenTray={() => setTrayOpen(true)}
      />
      <Hero />
      <Story />
      <IngredientsAndHealth />
      <MenuSection onAddToTray={addToTray} />
      <Signatures />
      <Experience />
      <Franchise />
      <Stores />
      <Testimonials />
      <FAQ />
      <WelcomeTastingPass />
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
