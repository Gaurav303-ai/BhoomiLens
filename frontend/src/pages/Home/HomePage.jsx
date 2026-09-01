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

/* Circular process diagram: 4 steps arranged around a centre hub.
   Pure SVG + absolutely positioned labels — no external image. */
const STEPS = [
  { icon: Upload, title: "Upload", desc: "Officer scans & uploads the paper record", tone: COLORS.saffron },
  { icon: ScanLine, title: "OCR & Extract", desc: "AI reads text, khasra numbers, owner details", tone: COLORS.navy },
  { icon: CheckCircle2, title: "Verify", desc: "Officer confirms or corrects extracted data", tone: COLORS.green },
  { icon: Database, title: "Publish", desc: "Record becomes a searchable digital entry", tone: COLORS.gold },
];

function CircleDiagram() {
  const size = 380;
  const radius = 140;
  const center = size / 2;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#E4DCC8" strokeWidth="2" strokeDasharray="6 6" />
      </svg>

      {/* centre hub */}
      <div
        className="absolute flex flex-col items-center justify-center rounded-full text-center shadow-md"
        style={{
          width: 130,
          height: 130,
          left: center - 65,
          top: center - 65,
          background: COLORS.navy,
          color: "white",
        }}
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
          <div
            key={step.title}
            className="absolute flex w-36 flex-col items-center text-center"
            style={{ left: x - 72, top: y - 46 }}
          >
            <div
              className="mb-2 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md"
              style={{ background: step.tone }}
            >
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

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: COLORS.paper, color: COLORS.ink }}>
      {/* Tricolour hairline */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1" style={{ background: COLORS.saffron }} />
        <div className="flex-1" style={{ background: "#FFFFFF" }} />
        <div className="flex-1" style={{ background: COLORS.green }} />
      </div>

      {/* Header */}
      <header className="text-white" style={{ background: COLORS.navy }}>
        <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <SealMark size={32} className="text-white/90 shrink-0" />
            <div className="leading-tight">
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/60">Government of India · Department of Land Records</p>
              <p className="font-semibold text-sm sm:text-base" style={{ fontFamily: "'Merriweather', serif" }}>
                भूमि अभिलेख डिजिटलीकरण मंच
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-white/70">
            <PhoneCall size={14} /> Helpline: 1800-11-2026
          </div>
        </div>
      </header>

      {/* ---- Hero: choose your portal ---- */}
      <section className="w-full px-4 py-12 sm:px-6 lg:px-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.green }}>
          Smart India Hackathon · Problem Statement 26018
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold max-w-3xl mx-auto" style={{ fontFamily: "'Merriweather', serif" }}>
          One platform to digitise, verify and access India's land records
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-600">
          Built for two kinds of users — department officers who process and verify records, and citizens who want
          to search or track their own land record without visiting an office.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/login")}
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white shadow-md" style={{ background: COLORS.navy }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <p className="font-bold text-slate-800">Officer Portal</p>
              <p className="text-sm text-slate-500 mt-0.5">Upload, verify and manage land records.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium" style={{ color: COLORS.navy }}>
                Sign in <ArrowRight size={14} className="transition group-hover:translate-x-1" />
              </span>
            </div>
          </button>

          <button
            onClick={() => navigate("/citizenHome")}
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white shadow-md" style={{ background: COLORS.saffron }}>
              <Users size={26} />
            </div>
            <div>
              <p className="font-bold text-slate-800">Citizen Portal</p>
              <p className="text-sm text-slate-500 mt-0.5">Search your record or track a request.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium" style={{ color: COLORS.saffron }}>
                Continue <ArrowRight size={14} className="transition group-hover:translate-x-1" />
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* ---- What we do — circular diagram ---- */}
      <section className="w-full px-4 py-14 sm:px-6 lg:px-10" style={{ background: "white" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.green }}>What we do</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Merriweather', serif" }}>
              From a paper register to a verified digital record
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Every land record follows the same lifecycle on this platform — scanned, read automatically,
              checked by a human officer, and only then published as the official digital source of truth.
              Citizens can look up any published record; officers manage every step before that.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><Clock size={14} style={{ color: COLORS.navy }} /> Average turnaround: under 48 hours per record</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} style={{ color: COLORS.green }} /> Every entry is officer-verified before publishing</li>
            </ul>
          </div>
          <CircleDiagram />
        </div>
      </section>

      {/* ---- Helpline / support ---- */}
      <section className="w-full px-4 py-12 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.green }}>Need help?</p>
          <h3 className="mt-1 text-xl font-bold" style={{ fontFamily: "'Merriweather', serif" }}>
            Support & Helpline
          </h3>
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

      {/* Footer */}
      <footer className="mt-4 border-t" style={{ borderColor: "#E4DCC8", background: "#FCFAF4" }}>
        <div className="w-full px-4 py-6 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
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
