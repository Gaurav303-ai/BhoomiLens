import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  Upload,
  ScanLine,
  CheckCircle2,
  Database,
  PhoneCall,
  Mail,
  Clock,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Type,
  Languages,
  ChevronDown,
  FileText,
  Map as MapIcon,
  Lock,
  Smartphone,
  HelpCircle,
  Download,
  FileBadge,
  AlertCircle,
} from "lucide-react";

const COLORS = {
  saffron: "#FF9933",
  navy: "#0B3D6B",
  green: "#0F7A3D",
  gold: "#C79A3D",
  ink: "#1C2530",
  paper: "#F7F5EF",
};

const STRINGS = {
  en: {
    tagline: "Government of India · Department of Land Records",
    title: "भूमि अभिलेख डिजिटलीकरण मंच",
    subtitle: "Land Records Digitisation Platform",
    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navHow: "How It Works",
    navResources: "Resources",
    navContact: "Contact",
    officerPortal: "Officer Portal",
    citizenPortal: "Citizen Portal",
    heroTag: "Smart India Hackathon · Problem Statement 26018",
    heroTitle: "One platform to digitise, verify and access India's land records",
    heroDesc:
      "Built for two kinds of users — department officers who process and verify records, and citizens who want to search or track their own land record without visiting an office.",
    signIn: "Sign in",
    continue: "Continue",
    officerDesc: "Upload, verify and manage land records.",
    citizenDesc: "Search your record or track a request.",
    statRecords: "Records Digitised",
    statVerified: "Verified Entries",
    statDistricts: "Districts Onboarded",
    statOfficers: "Officers Active",
    whatWeDo: "What we do",
    whatWeDoTitle: "From a paper register to a verified digital record",
    whatWeDoDesc:
      "Every land record follows the same lifecycle on this platform — scanned, read automatically, checked by a human officer, and only then published as the official digital source of truth.",
    featuresTag: "Key Features",
    featuresTitle: "Why this platform is different",
    faqTag: "Support",
    faqTitle: "Frequently Asked Questions",
    helpTag: "Need help?",
    helpTitle: "Support & Helpline",
  },
  hi: {
    tagline: "भारत सरकार · भूमि अभिलेख विभाग",
    title: "भूमि अभिलेख डिजिटलीकरण मंच",
    subtitle: "लैंड रिकॉर्ड्स डिजिटलीकरण प्लेटफ़ॉर्म",
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navServices: "सेवाएं",
    navHow: "यह कैसे काम करता है",
    navResources: "संसाधन",
    navContact: "संपर्क करें",
    officerPortal: "अधिकारी पोर्टल",
    citizenPortal: "नागरिक पोर्टल",
    heroTag: "स्मार्ट इंडिया हैकथॉन · समस्या कथन 26018",
    heroTitle: "भारत के भूमि अभिलेखों को डिजिटाइज़, सत्यापित और सुलभ बनाने का एक मंच",
    heroDesc:
      "दो तरह के उपयोगकर्ताओं के लिए बनाया गया — विभागीय अधिकारी जो रिकॉर्ड सत्यापित करते हैं, और नागरिक जो बिना कार्यालय गए अपना भूमि रिकॉर्ड खोजना या ट्रैक करना चाहते हैं।",
    signIn: "साइन इन करें",
    continue: "जारी रखें",
    officerDesc: "भूमि रिकॉर्ड अपलोड, सत्यापित और प्रबंधित करें।",
    citizenDesc: "अपना रिकॉर्ड खोजें या अनुरोध ट्रैक करें।",
    statRecords: "डिजिटाइज़ रिकॉर्ड",
    statVerified: "सत्यापित प्रविष्टियाँ",
    statDistricts: "शामिल जिले",
    statOfficers: "सक्रिय अधिकारी",
    whatWeDo: "हम क्या करते हैं",
    whatWeDoTitle: "कागज़ी रजिस्टर से एक सत्यापित डिजिटल रिकॉर्ड तक",
    whatWeDoDesc:
      "हर भूमि रिकॉर्ड इस प्लेटफ़ॉर्म पर एक ही जीवनचक्र से गुज़रता है — स्कैन, स्वतः पठन, अधिकारी द्वारा सत्यापन, और तभी आधिकारिक डिजिटल स्रोत के रूप में प्रकाशित।",
    featuresTag: "मुख्य विशेषताएं",
    featuresTitle: "यह मंच अलग क्यों है",
    faqTag: "सहायता",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    helpTag: "मदद चाहिए?",
    helpTitle: "सहायता और हेल्पलाइन",
  },
};

function SealMark({ size = 40, className = "" }) {
  const spokes = Array.from({ length: 16 });
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      {spokes.map((_, i) => {
        const angle = (i / spokes.length) * Math.PI * 2;
        const x1 = 50 + Math.cos(angle) * 34;
        const y1 = 50 + Math.sin(angle) * 34;
        const x2 = 50 + Math.cos(angle) * 46;
        const y2 = 50 + Math.sin(angle) * 46;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" />;
      })}
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </svg>
  );
}

function CircleDiagram() {
  const STEPS = [
    { icon: Upload, title: "Upload", desc: "Officer scans & uploads the paper record", tone: COLORS.saffron },
    { icon: ScanLine, title: "OCR & Extract", desc: "AI reads text, khasra numbers, owner details", tone: COLORS.navy },
    { icon: CheckCircle2, title: "Verify", desc: "Officer confirms or corrects extracted data", tone: COLORS.green },
    { icon: Database, title: "Publish", desc: "Record becomes a searchable digital entry", tone: COLORS.gold },
  ];
  const size = 380;
  const radius = 140;
  const center = size / 2;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size, maxWidth: "100%" }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#E4DCC8" strokeWidth="2" strokeDasharray="6 6" />
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center rounded-full text-center shadow-md"
        style={{ width: 130, height: 130, left: center - 65, top: center - 65, background: COLORS.navy, color: "white" }}
      >
        <SealMark size={28} className="mb-1 text-white/90" />
        <p className="text-[11px] font-semibold leading-tight px-2">Land Record<br />Lifecycle</p>
      </div>
      {STEPS.map((step, i) => {
        const angle = (i / STEPS.length) * Math.PI * 2 - Math.PI / 2;
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        const Icon = step.icon;
        return (
          <div key={step.title} className="absolute flex w-36 flex-col items-center text-center" style={{ left: x - 72, top: y - 46 }}>
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md" style={{ background: step.tone }}>
              <Icon size={20} />
            </div>
            <p className="text-sm font-semibold">{step.title}</p>
            <p className="text-xs text-slate-500 leading-snug">{step.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

const NAV_ITEMS = [
  { key: "navHome", path: "/" },
  { key: "navAbout", path: "/about" },
  { key: "navServices", path: "/services" },
  { key: "navHow", path: "/#how-it-works" },
  { key: "navResources", path: "/resources" },
  { key: "navContact", path: "/#contact" },
];

const FEATURES = [
  { icon: Lock, title: "Secure by design", desc: "Role-based access, audit trails, and encrypted storage for every record.", tone: COLORS.navy },
  { icon: ScanLine, title: "AI-assisted OCR", desc: "Automatic extraction of khasra numbers, owner names and survey details.", tone: COLORS.green },
  { icon: Smartphone, title: "Mobile-first citizen access", desc: "Check your land record status from any phone, no office visit needed.", tone: COLORS.saffron },
  { icon: MapIcon, title: "GIS-linked records", desc: "Every verified record can be viewed against its plot on the land map.", tone: COLORS.gold },
];

const FAQS = [
  { q: "Who can upload a land record?", a: "Only authenticated department officers with a verified Government ID and registered phone number can upload or edit records." },
  { q: "Can citizens edit their own records?", a: "No. Citizens can search, view and track records, but all edits go through officer verification to maintain a single source of truth." },
  { q: "How long does verification take?", a: "Most records are verified within 48 hours of upload, depending on document quality and district workload." },
  { q: "Is my data secure?", a: "Yes. All records are encrypted at rest and in transit, and every action is logged for audit purposes." },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("en");
  const [fontScale, setFontScale] = useState(1);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const t = useMemo(() => STRINGS[lang], [lang]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${16 * fontScale}px`;
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [fontScale]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: COLORS.paper, color: COLORS.ink }}>
      <div className="h-1.5 w-full flex">
        <div className="flex-1" style={{ background: COLORS.saffron }} />
        <div className="flex-1" style={{ background: "#FFFFFF" }} />
        <div className="flex-1" style={{ background: COLORS.green }} />
      </div>

      <div className="w-full text-xs" style={{ background: "#08304F", color: "rgba(255,255,255,0.8)" }}>
        <div className="flex w-full items-center justify-between px-4 py-1.5 sm:px-6 lg:px-10">
          <div className="hidden sm:flex items-center gap-1.5">
            <PhoneCall size={12} /> Helpline: 1800-11-2026
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <button onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))} className="flex items-center gap-1 hover:text-white" aria-label="Switch language">
              <Languages size={12} /> {lang === "en" ? "हिंदी" : "English"}
            </button>
            <div className="flex items-center gap-1">
              <Type size={12} />
              <button onClick={() => setFontScale((s) => Math.max(0.85, +(s - 0.1).toFixed(2)))} className="px-1.5 hover:text-white" aria-label="Decrease font size">A-</button>
              <button onClick={() => setFontScale(1)} className="px-1.5 hover:text-white" aria-label="Reset font size">A</button>
              <button onClick={() => setFontScale((s) => Math.min(1.4, +(s + 0.1).toFixed(2)))} className="px-1.5 hover:text-white" aria-label="Increase font size">A+</button>
            </div>
          </div>
        </div>
      </div>

      <header className="text-white sticky top-0 z-30 shadow-sm" style={{ background: COLORS.navy }}>
        <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 text-left">
            <SealMark size={32} className="text-white/90 shrink-0" />
            <div className="leading-tight">
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/60">{t.tagline}</p>
              <p className="font-semibold text-sm sm:text-base" style={{ fontFamily: "'Merriweather', serif" }}>
                {t.title} <span className="hidden sm:inline text-white/50 font-normal text-xs">— {t.subtitle}</span>
              </p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {NAV_ITEMS.map((item) => (
              <a key={item.key} href={item.path} className="text-white/80 hover:text-white transition">{t[item.key]}</a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <button onClick={() => navigate("/login")} className="rounded-full px-4 py-1.5 text-sm font-medium bg-white/10 hover:bg-white/20 transition flex items-center gap-1.5">
              <ShieldCheck size={14} /> {t.officerPortal}
            </button>
            <button onClick={() => navigate("/citizenHome")} className="rounded-full px-4 py-1.5 text-sm font-semibold bg-white transition flex items-center gap-1.5" style={{ color: COLORS.navy }}>
              <Users size={14} /> {t.citizenPortal}
            </button>
          </div>

          <button className="lg:hidden text-white" onClick={() => setMobileNavOpen((o) => !o)} aria-label="Toggle navigation">
            {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileNavOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 py-4 space-y-3" style={{ background: COLORS.navy }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.key} href={item.path} className="block text-sm text-white/85">{t[item.key]}</a>
            ))}
            <div className="flex gap-2 pt-2">
              <button onClick={() => navigate("/login")} className="flex-1 rounded-lg bg-white/10 py-2 text-sm font-medium">{t.officerPortal}</button>
              <button onClick={() => navigate("/citizenHome")} className="flex-1 rounded-lg bg-white py-2 text-sm font-semibold" style={{ color: COLORS.navy }}>{t.citizenPortal}</button>
            </div>
          </div>
        )}
      </header>

      <section className="w-full px-4 py-12 sm:px-6 lg:px-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.green }}>{t.heroTag}</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold max-w-3xl mx-auto" style={{ fontFamily: "'Merriweather', serif" }}>{t.heroTitle}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-600">{t.heroDesc}</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          <button onClick={() => navigate("/login")} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white shadow-md" style={{ background: COLORS.navy }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <p className="font-bold text-slate-800">{t.officerPortal}</p>
              <p className="text-sm text-slate-500 mt-0.5">{t.officerDesc}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium" style={{ color: COLORS.navy }}>
                {t.signIn} <ArrowRight size={14} className="transition group-hover:translate-x-1" />
              </span>
            </div>
          </button>

          <button onClick={() => navigate("/citizenHome")} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white shadow-md" style={{ background: COLORS.saffron }}>
              <Users size={26} />
            </div>
            <div>
              <p className="font-bold text-slate-800">{t.citizenPortal}</p>
              <p className="text-sm text-slate-500 mt-0.5">{t.citizenDesc}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium" style={{ color: COLORS.saffron }}>
                {t.continue} <ArrowRight size={14} className="transition group-hover:translate-x-1" />
              </span>
            </div>
          </button>
        </div>
      </section>

      <section className="w-full" style={{ background: COLORS.navy }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10 text-white">
          {[
            { label: t.statRecords, value: "1,284" },
            { label: t.statVerified, value: "1,102" },
            { label: t.statDistricts, value: "18" },
            { label: t.statOfficers, value: "63" },
          ].map((s) => (
            <div key={s.label} className="px-4 py-6 text-center">
              <p className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{s.value}</p>
              <p className="mt-1 text-xs text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="w-full px-4 py-14 sm:px-6 lg:px-10" style={{ background: "white" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.green }}>{t.whatWeDo}</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Merriweather', serif" }}>{t.whatWeDoTitle}</h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">{t.whatWeDoDesc}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><Clock size={14} style={{ color: COLORS.navy }} /> Average turnaround: under 48 hours per record</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: COLORS.green }} /> Every entry is officer-verified before publishing</li>
            </ul>
          </div>
          <CircleDiagram />
        </div>
      </section>

      <section className="w-full px-4 py-14 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.green }}>{t.featuresTag}</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Merriweather', serif" }}>{t.featuresTitle}</h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl mb-3" style={{ background: `${f.tone}1A`, color: f.tone }}>
                <f.icon size={20} />
              </div>
              <p className="font-semibold text-slate-800">{f.title}</p>
              <p className="mt-1 text-sm text-slate-500 leading-snug">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-4 py-14 sm:px-6 lg:px-10" style={{ background: "white" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.green }}>{t.faqTag}</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Merriweather', serif" }}>{t.faqTitle}</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={faq.q} className="rounded-xl border border-slate-200 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-slate-800 hover:bg-slate-50">
                  <span className="flex items-center gap-2"><HelpCircle size={15} style={{ color: COLORS.navy }} /> {faq.q}</span>
                  <ChevronDown size={16} className={`transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <div className="px-4 pb-4 text-sm text-slate-600">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.green }}>Resources</p>
          <h3 className="mt-1 text-xl font-bold" style={{ fontFamily: "'Merriweather', serif" }}>Downloads & Guidelines</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              { label: "User Guide (PDF)", icon: FileText },
              { label: "Officer Onboarding Kit", icon: FileBadge },
              { label: "Grievance Form", icon: Download },
              { label: "Report an Issue", icon: AlertCircle },
            ].map((r) => (
              <button key={r.label} className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                <r.icon size={14} /> {r.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="w-full px-4 py-12 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.green }}>{t.helpTag}</p>
          <h3 className="mt-1 text-xl font-bold" style={{ fontFamily: "'Merriweather', serif" }}>{t.helpTitle}</h3>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: "#EAF2FB", color: COLORS.navy }}>
                <PhoneCall size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">Toll-free Helpline</p>
                <p className="text-sm text-slate-500">1800-11-2026 (9 AM – 6 PM, Mon–Sat)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: "#EAF6EE", color: COLORS.green }}>
                <Mail size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">Email Support</p>
                <p className="text-sm text-slate-500">support@landrecords.gov.in</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: "#FFF3E0", color: COLORS.saffron }}>
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">Visit a Kiosk</p>
                <p className="text-sm text-slate-500">Nearest Common Service Centre (CSC)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-4 border-t" style={{ borderColor: "#E4DCC8", background: "#FCFAF4" }}>
        <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <SealMark size={22} style={{ color: COLORS.navy }} />
              <span className="font-semibold text-slate-800">Land Records</span>
            </div>
            <p className="text-xs text-slate-500">An initiative of the Department of Land Records, Government of India.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700 mb-2">Explore</p>
            <ul className="space-y-1.5 text-slate-500 text-xs">
              <li><a href="/about" className="hover:text-slate-700">About the Platform</a></li>
              <li><a href="/#how-it-works" className="hover:text-slate-700">How It Works</a></li>
              <li><a href="/resources" className="hover:text-slate-700">Resources</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-700 mb-2">Portals</p>
            <ul className="space-y-1.5 text-slate-500 text-xs">
              <li><button onClick={() => navigate("/login")} className="hover:text-slate-700">Officer Login</button></li>
              <li><button onClick={() => navigate("/officer/signup")} className="hover:text-slate-700">Officer Registration</button></li>
              <li><button onClick={() => navigate("/citizenHome")} className="hover:text-slate-700">Citizen Portal</button></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-700 mb-2">Legal</p>
            <ul className="space-y-1.5 text-slate-500 text-xs">
              <li><a href="/privacy" className="hover:text-slate-700">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-slate-700">Terms & Conditions</a></li>
              <li><a href="/accessibility" className="hover:text-slate-700">Accessibility Statement</a></li>
            </ul>
          </div>
        </div>
        <div className="w-full px-4 py-5 sm:px-6 lg:px-10 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500" style={{ borderColor: "#E4DCC8" }}>
          <p>© Department of Land Records · Government of India</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-700 cursor-pointer">RTI</span>
            <span className="hover:text-slate-700 cursor-pointer">Grievance Redressal</span>
            <span className="hover:text-slate-700 cursor-pointer">Accessibility</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
