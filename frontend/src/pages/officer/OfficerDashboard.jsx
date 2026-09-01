import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Upload,
  Search,
  Map,
  ArrowUpRight,
  Landmark,
  ShieldCheck,
  Users,
  Globe,
  ScrollText,
  Timer,
  Building2,
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS
   Saffron / Navy (Ashoka-chakra blue) / Green — drawn straight
   from the national tricolour, used as thin structural accents
   rather than decoration. Headline face: "Tiro Devanagari Hindi"
   paired with "Merriweather" for an official-gazette feel;
   body in Inter; record data in IBM Plex Mono.
   ============================================================ */

const COLORS = {
  saffron: "#FF9933",
  navy: "#0B3D6B",
  green: "#0F7A3D",
  gold: "#C79A3D",
  ink: "#1C2530",
  paper: "#F7F5EF",
};

/* A generic radial emblem — concentric rings + evenly spaced
   spokes. Deliberately abstract (not the State Emblem / Ashoka
   Chakra) so it reads as "official seal" without reproducing a
   protected government symbol. */
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

/* A simple, brand-toned illustration of a land parcel with a
   document/stamp overlay — built as flat SVG shapes (no stock
   photography) so it's fully original and license-free. */
function HeroIllustration({ className = "" }) {
  return (
    <svg viewBox="0 0 480 320" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAF2FB" />
          <stop offset="100%" stopColor="#F7F5EF" />
        </linearGradient>
      </defs>
      <rect width="480" height="320" fill="url(#skyFade)" rx="20" />

      {/* land plots */}
      <g opacity="0.9">
        <rect x="40" y="190" width="130" height="90" fill="#DDEFE0" stroke={COLORS.green} strokeWidth="2" />
        <rect x="170" y="190" width="110" height="90" fill="#F5E7C9" stroke={COLORS.saffron} strokeWidth="2" />
        <rect x="280" y="190" width="150" height="90" fill="#E4ECF6" stroke={COLORS.navy} strokeWidth="2" />
        <line x1="40" y1="235" x2="430" y2="235" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
      </g>

      {/* document card */}
      <g transform="translate(150,40)">
        <rect x="0" y="0" width="170" height="130" rx="10" fill="white" stroke="#D9D2BE" strokeWidth="1.5" />
        <rect x="16" y="18" width="90" height="8" rx="4" fill={COLORS.navy} opacity="0.8" />
        <rect x="16" y="36" width="138" height="5" rx="2.5" fill="#D9D2BE" />
        <rect x="16" y="48" width="138" height="5" rx="2.5" fill="#D9D2BE" />
        <rect x="16" y="60" width="90" height="5" rx="2.5" fill="#D9D2BE" />
        {/* seal */}
        <circle cx="128" cy="96" r="22" fill="none" stroke={COLORS.gold} strokeWidth="2.5" />
        <circle cx="128" cy="96" r="14" fill="none" stroke={COLORS.gold} strokeWidth="1.5" />
        <path d="M128 96 l0 34 l-8 -10 l8 10 l8 -10" fill="none" stroke={COLORS.gold} strokeWidth="2" />
      </g>

      {/* tricolour flag accent */}
      <g transform="translate(370,50)">
        <rect x="0" y="0" width="3" height="70" fill="#8a8a8a" />
        <rect x="3" y="4" width="46" height="10" fill={COLORS.saffron} />
        <rect x="3" y="14" width="46" height="10" fill="#ffffff" stroke="#eee" />
        <rect x="3" y="24" width="46" height="10" fill={COLORS.green} />
      </g>
    </svg>
  );
}

const stats = [
  { title: "Records Processed", hindi: "संसाधित अभिलेख", value: "1,284", change: "+12.5%", icon: FileText, tone: COLORS.navy },
  { title: "Verified Records", hindi: "सत्यापित अभिलेख", value: "1,102", change: "+8.2%", icon: CheckCircle2, tone: COLORS.green },
  { title: "Pending Verification", hindi: "सत्यापन लंबित", value: "126", change: "18 need review", icon: Clock3, tone: COLORS.saffron },
  { title: "Low Confidence", hindi: "निम्न विश्वसनीयता", value: "56", change: "Needs attention", icon: AlertTriangle, tone: "#C0392B" },
];

export default function OfficerDashboard() {
  const [view, setView] = useState("officer"); // "officer" | "citizen"
  const navigate = useNavigate();

  return (
    // <div className="min-h-screen w-full" style={{ background: COLORS.paper, color: COLORS.ink, margin: 0, boxSizing: "border-box" }}>
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: COLORS.paper, color: COLORS.ink, margin: 0, boxSizing: "border-box" }}>
      {/* ---- Tricolour hairline ---- */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1" style={{ background: COLORS.saffron }} />
        <div className="flex-1" style={{ background: "#FFFFFF" }} />
        <div className="flex-1" style={{ background: COLORS.green }} />
      </div>

      {/* ---- Official header bar ---- */}
      <header className="text-white" style={{ background: COLORS.navy }}>
        <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <SealMark size={34} className="text-white/90 shrink-0" />
            <div className="leading-tight">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/60">Government of India · Department of Land Records</p>
              <p className="font-semibold" style={{ fontFamily: "'Merriweather', serif" }}>
                भूमि अभिलेख डिजिटलीकरण मंच <span className="text-white/50 font-normal">— Land Records Digitisation Platform</span>
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-white/10 px-1 py-1 sm:flex" role="tablist" aria-label="Switch view">
            <button
              role="tab"
              aria-selected={view === "officer"}
              // Yahan humne navigation add kar diya hai
              onClick={() => navigate("/login")} 
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                view === "officer" ? "bg-white text-[--navy]" : "text-white/70 hover:text-white"
              }`}
              style={view === "officer" ? { color: COLORS.navy } : {}}
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} /> Official Login
              </span>
            </button>
            <button
              role="tab"
              // Yahan navigate("/") laga diya gaya hai
              onClick={() => navigate("/citizenHome")} 
              className="rounded-full px-4 py-1.5 text-sm font-medium transition text-white/70 hover:text-white hover:bg-white/10"
            >
              <span className="inline-flex items-center gap-1.5">
                <Users size={14} /> Citizen Portal
              </span>
            </button>
           
          </div>
        </div>
      </header>

      <main>
        <section className="w-full p-4 sm:p-6 lg:p-10">
          {/* ---- Welcome / status strip ---- */}
          <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-1 text-sm font-semibold" style={{ color: COLORS.green }}>नमस्ते, Officer</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
                Land Records Overview
              </h2>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600">
                Digitise, validate and manage historical land records — built for department officers and open for citizens to track and verify.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-full px-4 py-2 text-sm font-medium sm:flex items-center gap-2"
                   style={{ background: "#EAF6EE", color: COLORS.green }}>
                <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: COLORS.green }} />
                System Operational
              </div>
              <button
                onClick={() => navigate("/upload")}
                className="flex w-fit items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5"
                style={{ background: `linear-gradient(120deg, ${COLORS.green}, ${COLORS.navy})` }}
              >
                <Upload size={18} />
                Upload Record
              </button>
            </div>
          </div>

          {/* ---- Hero band: full-width illustration only ---- */}
          <div className="mb-9 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <HeroIllustration className="w-full h-auto block" />
          </div>

          {/* ---- Citizen banner (only in citizen view) ---- */}
          {view === "citizen" && (
            <div className="mb-7 rounded-2xl border p-5 flex items-center gap-4"
                 style={{ borderColor: "#E4DCC8", background: "#FFF9EE" }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
                   style={{ background: COLORS.saffron, color: "white" }}>
                <Globe size={22} />
              </div>
              <div>
                <p className="font-semibold">Citizen access</p>
                <p className="text-sm text-slate-600">
                  Search your land record by khasra/survey number, or track the status of a digitisation request you've filed.
                </p>
              </div>
            </div>
          )}

          {/* ---- Stats Grid ---- */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* ---- Quick Actions ---- */}
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
              <Landmark size={18} style={{ color: COLORS.navy }} />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <ActionCard
                icon={Upload}
                title="Upload Land Record"
                description="Upload scanned documents, PDFs or images."
                tone={COLORS.green}
                onClick={() => navigate("/upload")}
              />
              <ActionCard
                icon={Search}
                title="Search Records"
                description="Find digitised records using land details."
                tone={COLORS.navy}
                onClick={() => navigate("/")}
              />
              <ActionCard
                icon={Map}
                title="Explore Land Map"
                description="View verified records on the GIS map."
                tone={COLORS.saffron}
                onClick={() => navigate("/map")}
              />
            </div>
          </div>

          {/* ---- Main Grid ---- */}
          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RecentRecords />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold">AI Processing</h3>
                  <p className="text-sm text-slate-500">Current system activity</p>
                </div>
                <div className="rounded-xl p-2" style={{ background: "#EAF6EE", color: COLORS.green }}>
                  <ArrowUpRight size={20} />
                </div>
              </div>
              <div className="space-y-5">
                <ProgressItem label="OCR Extraction" value="92%" tone={COLORS.navy} />
                <ProgressItem label="Document Validation" value="84%" tone={COLORS.green} />
                <ProgressItem label="Record Classification" value="76%" tone={COLORS.saffron} />
              </div>
              <div className="mt-6 rounded-xl p-4" style={{ background: "#F3F0E6" }}>
                <p className="text-sm font-semibold">AI Engine Status</p>
                <div className="mt-2 flex items-center gap-2 text-sm" style={{ color: COLORS.green }}>
                  <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: COLORS.green }} />
                  Processing normally
                </div>
              </div>
            </div>
          </div>

          {/* ---- Why this platform exists (kept last, full width) ---- */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.green }}>Why this platform exists</p>
            <h3 className="mt-2 text-2xl font-bold" style={{ fontFamily: "'Merriweather', serif" }}>
              Decades of paper land records, made trustworthy and searchable
            </h3>
            <p className="mt-3 max-w-3xl text-sm sm:text-base text-slate-600">
              Millions of land records across India still sit in paper registers — fragile, hard to search, and easy to dispute.
              This platform turns each one into a verified digital record, so an officer can validate it in minutes and a citizen
              can check their own land's status without visiting an office.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <ImpactPoint icon={ScrollText} tone={COLORS.navy} title="No more lost paperwork" desc="Every record is scanned, OCR-read and permanently preserved." />
              <ImpactPoint icon={Timer} tone={COLORS.saffron} title="Minutes, not months" desc="AI-assisted checks cut manual verification time sharply." />
              <ImpactPoint icon={Building2} tone={COLORS.green} title="One record, one truth" desc="Officers and citizens see the same verified source." />
            </div>
          </div>
        </section>

        {/* ---- Government footer ---- */}
        <footer className="mt-10 border-t" style={{ borderColor: "#E4DCC8", background: "#FCFAF4" }}>
          <div className="w-full px-4 py-6 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© Department of Land Records · Government of India</p>
            <div className="flex gap-4">
              <span className="hover:text-slate-700 cursor-pointer">RTI</span>
              <span className="hover:text-slate-700 cursor-pointer">Grievance Redressal</span>
              <span className="hover:text-slate-700 cursor-pointer">Accessibility</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ---------------- Impact Point ---------------- */
function ImpactPoint({ icon: Icon, tone, title, desc }) {
  return (
    <div className="flex gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${tone}1A`, color: tone }}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-500 leading-snug">{desc}</p>
      </div>
    </div>
  );
}

/* ---------------- Stat Card ---------------- */
function StatCard({ title, hindi, value, change, icon: Icon, tone }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${tone}1A`, color: tone }}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-2xl font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{value}</p>
      <p className="text-sm font-medium text-slate-700 mt-1">{title}</p>
      <p className="text-xs text-slate-400">{hindi}</p>
      <p className="mt-2 text-xs font-medium" style={{ color: tone }}>{change}</p>
    </div>
  );
}

/* ---------------- Action Card ---------------- */
function ActionCard({ icon: Icon, title, description, tone, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2"
      style={{ "--tw-ring-color": tone }}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md" style={{ background: tone }}>
        <Icon size={21} />
      </div>
      <div className="min-w-0">
        <h4 className="font-bold text-slate-800">{title}</h4>
        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      </div>
      <ArrowUpRight size={18} className="ml-auto text-slate-300 transition group-hover:text-slate-700" />
    </button>
  );
}

/* ---------------- Progress ---------------- */
function ProgressItem({ label, value, tone }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-bold text-slate-800">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: value, background: tone }} />
      </div>
    </div>
  );
}

/* ---------------- Recent Records (stub) ---------------- */
function RecentRecords() {
  const rows = [
    { id: "LR-2026-00931", village: "Chandrapur", status: "Verified", tone: "#0F7A3D" },
    { id: "LR-2026-00930", village: "Basti Kalan", status: "Pending", tone: "#FF9933" },
    { id: "LR-2026-00929", village: "Rampur", status: "Low Confidence", tone: "#C0392B" },
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm h-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold">Recent Records</h3>
        <span className="text-xs text-slate-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>updated just now</span>
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-semibold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{r.id}</p>
              <p className="text-xs text-slate-500">{r.village}</p>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: `${r.tone}1A`, color: r.tone }}>
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
