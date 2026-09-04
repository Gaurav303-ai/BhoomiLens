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
  Cpu,
  Zap,
  CheckSquare,
} from "lucide-react";

const COLORS = {
  saffron: "#FF9933",
  navy: "#0B3D6B",
  green: "#0F7A3D",
  gold: "#C79A3D",
  ink: "#1C2530",
  paper: "#F7F5EF",
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

      {/* document card with AI badge */}
      <g transform="translate(150,30)">
        <rect x="0" y="0" width="180" height="140" rx="12" fill="white" stroke="#D9D2BE" strokeWidth="1.5" />
        <rect x="16" y="16" width="90" height="8" rx="4" fill={COLORS.navy} opacity="0.8" />
        <rect x="16" y="34" width="148" height="5" rx="2.5" fill="#D9D2BE" />
        <rect x="16" y="46" width="148" height="5" rx="2.5" fill="#D9D2BE" />
        <rect x="16" y="58" width="100" height="5" rx="2.5" fill="#D9D2BE" />
        
        {/* AI Extraction scanning line simulation */}
        <rect x="16" y="75" width="148" height="24" rx="6" fill="#EAF6EE" stroke={COLORS.green} strokeWidth="1" strokeDasharray="3 3" />
        <text x="24" y="91" fill={COLORS.green} fontSize="10" fontFamily="monospace" fontWeight="bold">Gemini Flash OCR: 98.4%</text>

        {/* seal */}
        <circle cx="138" cy="114" r="18" fill="none" stroke={COLORS.gold} strokeWidth="2" />
      </g>

      {/* tricolour flag accent */}
      <g transform="translate(370,40)">
        <rect x="0" y="0" width="3" height="70" fill="#8a8a8a" />
        <rect x="3" y="4" width="46" height="10" fill={COLORS.saffron} />
        <rect x="3" y="14" width="46" height="10" fill="#ffffff" stroke="#eee" />
        <rect x="3" y="24" width="46" height="10" fill={COLORS.green} />
      </g>
    </svg>
  );
}

const stats = [
  { title: "Records Processed", hindi: "संसाधित अभिलेख", value: "1,284", change: "+12.5% today", icon: FileText, tone: COLORS.navy },
  { title: "HITL Verified", hindi: "सत्यापित अभिलेख", value: "1,102", change: "99.1% accuracy", icon: CheckCircle2, tone: COLORS.green },
  { title: "Pending Review", hindi: "सत्यापन लंबित", value: "126", change: "18 urgent queues", icon: Clock3, tone: COLORS.saffron },
  { title: "Low Confidence", hindi: "निम्न विश्वसनीयता", value: "56", change: "Flagged for AI audit", icon: AlertTriangle, tone: "#C0392B" },
];

export default function OfficerDashboard() {
  const [view, setView] = useState("officer");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: COLORS.paper, color: COLORS.ink, margin: 0, boxSizing: "border-box" }}>
      {/* ---- Tricolour hairline ---- */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1" style={{ background: COLORS.saffron }} />
        <div className="flex-1" style={{ background: "#FFFFFF" }} />
        <div className="flex-1" style={{ background: COLORS.green }} />
      </div>

      {/* ---- High-Tech Official Header Bar ---- */}
      <header className="text-white sticky top-0 z-50 shadow-md backdrop-blur-md bg-opacity-95" style={{ background: COLORS.navy }}>
        <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <SealMark size={34} className="text-white/90 shrink-0" />
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.14em] text-white/60">Problem 26018 · HITL Pipeline</span>
                <span className="rounded-full bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 font-mono border border-amber-500/30">AI-Active</span>
              </div>
              <p className="font-semibold text-sm sm:text-base" style={{ fontFamily: "'Merriweather', serif" }}>
                भूमि अभिलेख डिजिटलीकरण मंच <span className="text-white/50 font-normal hidden md:inline">— Bhoomi Lens Portal</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-white/10 px-1 py-1 sm:flex" role="tablist">
              <button
                role="tab"
                aria-selected={view === "officer"}
                onClick={() => setView("officer")}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  view === "officer" ? "bg-white text-slate-900 shadow" : "text-white/70 hover:text-white"
                }`}
                style={view === "officer" ? { color: COLORS.navy } : {}}
              >
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Officer HITL
                </span>
              </button>
              <button
                role="tab"
                aria-selected={view === "citizen"}
                onClick={() => {
                  setView("citizen");
                  navigate("/citizenHome");
                }}
                className="rounded-full px-4 py-1.5 text-sm font-medium transition text-white/70 hover:text-white hover:bg-white/10"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Users size={14} /> Citizen Portal
                </span>
              </button>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 transition font-mono"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="w-full p-4 sm:p-6 lg:p-10">
          {/* ---- Welcome / status strip ---- */}
          <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: "#EAF6EE", color: COLORS.green }}>
                  <Zap size={12} /> Gemini Flash 3 OCR Connected
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ fontFamily: "'Merriweather', serif" }}>
                Tehsildar Command Dashboard
              </h2>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600">
                Human-in-the-Loop validation pipeline for historical land records, Khasra extraction, and automated cadastral verification.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-full px-4 py-2 text-sm font-medium sm:flex items-center gap-2 shadow-sm border border-emerald-200"
                   style={{ background: "#EAF6EE", color: COLORS.green }}>
                <span className="h-2.5 w-2.5 rounded-full animate-ping" style={{ background: COLORS.green }} />
                Model Engine Live
              </div>
              <button
                onClick={() => navigate("/upload")}
                className="flex w-fit items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                style={{ background: `linear-gradient(120deg, ${COLORS.green}, ${COLORS.navy})` }}
              >
                <Upload size={18} />
                Upload & Extract Document
              </button>
            </div>
          </div>

          {/* ---- Hero banner / illustration ---- */}
          <div className="mb-9 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            <HeroIllustration className="w-full h-auto block" />
          </div>

          {/* ---- Stats Grid ---- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* ---- Quick Actions ---- */}
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
              <Landmark size={18} style={{ color: COLORS.navy }} />
              Operational Workflows (Problem 26018)
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <ActionCard
                icon={Upload}
                title="AI Document Ingestion"
                description="Upload scanned Khasra/Khatauni sheets for instant multimodal OCR parsing."
                tone={COLORS.green}
                onClick={() => navigate("/upload")}
              />
              <ActionCard
                icon={CheckSquare}
                title="HITL Review Queue"
                description="Inspect low-confidence fields and authorize final land mutation records."
                tone={COLORS.navy}
                onClick={() => navigate("/")}
              />
              <ActionCard
                icon={Map}
                title="GIS Cadastral Map"
                description="Cross-verify parcel boundaries with digitized survey vector layers."
                tone={COLORS.saffron}
                onClick={() => navigate("/map")}
              />
            </div>
          </div>

          {/* ---- Main Grid ---- */}
          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RecentRecords navigate={navigate} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold flex items-center gap-1.5">
                    <Cpu size={16} className="text-blue-600" /> AI Pipeline Telemetry
                  </h3>
                  <p className="text-sm text-slate-500">Gemini Flash execution metrics</p>
                </div>
                <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded">v3.2-flash</span>
              </div>
              <div className="space-y-5">
                <ProgressItem label="Multimodal OCR Accuracy" value="98.4%" tone={COLORS.navy} />
                <ProgressItem label="Entity Match Confidence" value="91.2%" tone={COLORS.green} />
                <ProgressItem label="Cadastral Indexing Speed" value="88.0%" tone={COLORS.saffron} />
              </div>
              <div className="mt-6 rounded-xl p-4 border border-emerald-100" style={{ background: "#F3F0E6" }}>
                <p className="text-sm font-semibold text-slate-800">System Optimization</p>
                <p className="text-xs text-slate-600 mt-1">Zero latency local proxy active for high-speed hackathon verification.</p>
                <div className="mt-3 flex items-center gap-2 text-xs font-medium" style={{ color: COLORS.green }}>
                  <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: COLORS.green }} />
                  Ready for live Gemini OCR integration
                </div>
              </div>
            </div>
          </div>

          {/* ---- Impact footer banner ---- */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.green }}>Problem Statement 26018 Solution Architecture</p>
            <h3 className="mt-2 text-2xl font-bold" style={{ fontFamily: "'Merriweather', serif" }}>
              Digitizing Land Registries through Secure Human-in-the-Loop Verification
            </h3>
            <p className="mt-3 max-w-3xl text-sm sm:text-base text-slate-600">
              Eliminating multi-year land disputes by transforming brittle paper records into cryptographically secure, AI-parsed digital assets verified directly by authorized Tehsildars.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <ImpactPoint icon={ScrollText} tone={COLORS.navy} title="Multimodal AI Extraction" desc="Gemini extracts handwritten Hindi and Urdu revenue scripts instantly." />
              <ImpactPoint icon={Timer} tone={COLORS.saffron} title="HITL Audit Control" desc="Officers verify flagged ambiguities before final database commit." />
              <ImpactPoint icon={Building2} tone={COLORS.green} title="Transparent Ledger" desc="Immutable audit trails prevent unauthorized retrospective mutations." />
            </div>
          </div>
        </section>

        {/* ---- Footer ---- */}
        <footer className="mt-10 border-t" style={{ borderColor: "#E4DCC8", background: "#FCFAF4" }}>
          <div className="w-full px-4 py-6 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© Department of Land Records · Government of India (Problem 26018 Hackathon Build)</p>
            <div className="flex gap-4 font-mono">
              <span>API: v1.8-SECURE</span>
              <span>PORT: 8000</span>
              <span className="text-emerald-600 font-bold">ONLINE</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function ImpactPoint({ icon: Icon, tone, title, desc }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm" style={{ background: `${tone}1A`, color: tone }}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-500 leading-snug mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function StatCard({ title, hindi, value, change, icon: Icon, tone }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${tone}1A`, color: tone }}>
          <Icon size={18} />
        </div>
        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded" style={{ background: `${tone}15`, color: tone }}>
          Live
        </span>
      </div>
      <p className="text-2xl font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{value}</p>
      <p className="text-sm font-medium text-slate-700 mt-1">{title}</p>
      <p className="text-xs text-slate-400">{hindi}</p>
      <p className="mt-3 text-xs font-semibold flex items-center gap-1" style={{ color: tone }}>
        {change}
      </p>
    </div>
  );
}

function ActionCard({ icon: Icon, title, description, tone, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md" style={{ background: tone }}>
        <Icon size={21} />
      </div>
      <div className="min-w-0">
        <h4 className="font-bold text-slate-800">{title}</h4>
        <p className="mt-1 text-sm leading-snug text-slate-500">{description}</p>
      </div>
      <ArrowUpRight size={18} className="ml-auto text-slate-300 transition group-hover:text-slate-700 shrink-0" />
    </button>
  );
}

function ProgressItem({ label, value, tone }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-bold font-mono text-slate-800">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: value, background: tone }} />
      </div>
    </div>
  );
}

function RecentRecords({ navigate }) {
  const rows = [
    { id: "LR-2026-00931", village: "Chandrapur Revenue Block", status: "Verified", tone: "#0F7A3D", confidence: "99.2%" },
    { id: "LR-2026-00930", village: "Basti Kalan Sector 4", status: "Pending HITL", tone: "#FF9933", confidence: "87.5%" },
    { id: "LR-2026-00929", village: "Rampur Tehsil Unit", status: "Low Confidence", tone: "#C0392B", confidence: "64.1%" },
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm h-full flex flex-col justify-between">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold">Recent Digitisation Queue</h3>
            <p className="text-xs text-slate-500">Live records pending or verified via Gemini OCR</p>
          </div>
          <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-mono font-medium">
            Sync Active
          </span>
        </div>
        <div className="divide-y divide-slate-100">
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between py-3.5">
              <div>
                <p className="text-sm font-bold text-slate-800 font-mono flex items-center gap-2">
                  {r.id}
                  <span className="text-[10px] font-sans font-normal text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">AI Conf: {r.confidence}</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{r.village}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${r.tone}1A`, color: r.tone }}>
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button 
        onClick={() => navigate("/upload")}
        className="mt-5 w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition"
      >
        View Full Database Registry →
      </button>
    </div>
  );
}