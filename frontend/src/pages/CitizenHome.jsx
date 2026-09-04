import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  FileText,
  History,
  User,
  ShieldCheck,
  Download,
  AlertTriangle,
  Building2,
  ChevronRight,
  ChevronDown,
  Cpu,
  Lock,
  Award,
  CheckCircle2,
  FileCheck2,
  Activity,
  Mic,
  Wifi,
  WifiOff,
  Landmark,
  Info,
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

/* Breakdown behind the AI confidence score — makes the model's
   output explainable rather than a single opaque number. */
const CONFIDENCE_BREAKDOWN = [
  { label: "Owner name match", value: 100 },
  { label: "Area / measurement match", value: 98 },
  { label: "Signature & seal verification", value: 99 },
  { label: "Historical revenue cross-check", value: 100 },
];

export default function CitizenHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("khasra"); // 'khasra' | 'name' | 'track'
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);
  const [grievanceText, setGrievanceText] = useState("");
  const [showConfidenceDetail, setShowConfidenceDetail] = useState(false);
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [listening, setListening] = useState(false);

  // Form States
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [village, setVillage] = useState("");
  const [khasraNo, setKhasraNo] = useState("");
  const [ulpin, setUlpin] = useState("");
  const [appId, setAppId] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setShowResult(false);
    setShowConfidenceDetail(false);

    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
    }, 1200);
  };

  const handleTrack = (e) => {
    e.preventDefault();
    setIsTracking(true);
    setTrackResult(null);

    setTimeout(() => {
      setIsTracking(false);
      setTrackResult({
        id: appId || "BL-2026-9042",
        status: "Under Tehsildar HITL Verification",
        stage: "AI OCR Extracted & Queued for Official Sign-off",
        date: "Sept 3, 2026",
        officer: "Tehsil HQ - Gorakhpur Sector 2",
      });
    }, 1000);
  };

  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    setGrievanceSubmitted(true);
  };

  // Mock voice search — wires up to Web Speech API if the browser
  // supports it, otherwise just toggles the listening indicator.
  const handleVoiceSearch = () => {
    setListening(true);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN";
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVillage(transcript);
        setListening(false);
      };
      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);
      recognition.start();
    } else {
      setTimeout(() => setListening(false), 1500);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: COLORS.paper, color: COLORS.ink, margin: 0, boxSizing: "border-box" }}>
      {/* ---- Tricolour hairline ---- */}
      <div className="h-1.5 w-full flex fixed top-0 z-50">
        <div className="flex-1" style={{ background: COLORS.saffron }} />
        <div className="flex-1" style={{ background: "#FFFFFF" }} />
        <div className="flex-1" style={{ background: COLORS.green }} />
      </div>

      {/* ---- Header ---- */}
      <header className="text-white pt-1.5" style={{ background: COLORS.navy }}>
        <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <SealMark size={34} className="text-white/90 shrink-0" />
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/60">Government of India · Department of Land Records</p>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono border border-emerald-500/30">Problem 26018 Live</span>
              </div>
              <p className="font-semibold text-sm sm:text-base" style={{ fontFamily: "'Merriweather', serif" }}>
                भूमि अभिलेख डिजिटलीकरण मंच <span className="text-white/50 font-normal">— Citizen Portal & Public Ledger</span>
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {/* Low-bandwidth mode toggle — for rural / patchy-network users */}
            <button
              onClick={() => setLowBandwidth((v) => !v)}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5 font-medium"
              title="Reduces visuals for slow connections"
            >
              {lowBandwidth ? <WifiOff size={13} className="text-amber-300" /> : <Wifi size={13} className="text-emerald-300" />}
              {lowBandwidth ? "Low Bandwidth: On" : "Low Bandwidth Mode"}
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5 font-medium"
            >
              <ShieldCheck size={14} className="text-amber-400" /> Officer Portal Login
            </button>
          </div>
        </div>
      </header>

      {lowBandwidth && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-800 text-xs text-center py-2 px-4">
          Low bandwidth mode is on — animations and heavy visuals are reduced. Prefer SMS status checks? Send <span className="font-mono font-semibold">KHATA &lt;ID&gt;</span> to <span className="font-mono font-semibold">51969</span>.
        </div>
      )}

      <main className="px-4 py-8 sm:px-6 lg:px-10 max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-emerald-200">
            <Award size={14} className="text-emerald-600" /> National Land Record Digitization Hackathon Showcase
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Merriweather', serif", color: COLORS.navy }}>
            Search & Verify Land Records with AI Precision
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Access cryptographically secure, digitally verified land titles, track historical paper record conversions in real-time, and flag disputes directly to the Tehsildar workflow.
          </p>
        </div>

        {/* Jury Trust Banner */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Cpu size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Multimodal AI Engine</p>
              <p className="text-sm font-bold text-slate-800">Gemini Flash OCR Parsed</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <FileCheck2 size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">HITL Verification</p>
              <p className="text-sm font-bold text-slate-800">100% Tehsildar Signed-Off</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Lock size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Data Integrity</p>
              <p className="text-sm font-bold text-slate-800">Immutable Audit Trail</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Search Interface */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-slate-200 bg-slate-50">
                <button
                  onClick={() => setActiveTab("khasra")}
                  className={`flex-1 py-4 text-sm font-semibold transition flex items-center justify-center gap-2 ${activeTab === "khasra" ? "bg-white text-[--navy] border-b-2" : "text-slate-500 hover:text-slate-800"}`}
                  style={activeTab === "khasra" ? { borderColor: COLORS.navy, color: COLORS.navy } : {}}
                >
                  <MapPin size={18} /> By Khasra / Khatauni
                </button>
                <button
                  onClick={() => setActiveTab("name")}
                  className={`flex-1 py-4 text-sm font-semibold transition flex items-center justify-center gap-2 ${activeTab === "name" ? "bg-white text-[--navy] border-b-2" : "text-slate-500 hover:text-slate-800"}`}
                  style={activeTab === "name" ? { borderColor: COLORS.navy, color: COLORS.navy } : {}}
                >
                  <User size={18} /> By Owner Name
                </button>
                <button
                  onClick={() => setActiveTab("track")}
                  className={`flex-1 py-4 text-sm font-semibold transition flex items-center justify-center gap-2 ${activeTab === "track" ? "bg-white text-[--navy] border-b-2" : "text-slate-500 hover:text-slate-800"}`}
                  style={activeTab === "track" ? { borderColor: COLORS.navy, color: COLORS.navy } : {}}
                >
                  <History size={18} /> Track Status
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-8">
                {activeTab === "khasra" && (
                  <form onSubmit={handleSearch}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">District (ज़िला)</label>
                        <select required value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                          <option value="">Select District...</option>
                          <option value="Gorakhpur">Gorakhpur</option>
                          <option value="Lucknow">Lucknow</option>
                          <option value="Varanasi">Varanasi</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Tehsil (तहसील)</label>
                        <select required value={tehsil} onChange={(e) => setTehsil(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                          <option value="">Select Tehsil...</option>
                          <option value="Sadar">Sadar</option>
                          <option value="Chauri Chaura">Chauri Chaura</option>
                        </select>
                      </div>
                      <div className="relative">
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Village (गाँव)</label>
                        <input
                          required
                          type="text"
                          placeholder="Enter Village Name"
                          value={village}
                          onChange={(e) => setVillage(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        {/* Voice search — helps users less comfortable typing */}
                        <button
                          type="button"
                          onClick={handleVoiceSearch}
                          className={`absolute right-2 top-[34px] flex h-7 w-7 items-center justify-center rounded-lg transition ${listening ? "bg-red-100 text-red-600 animate-pulse" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}
                          title="बोलकर खोजें (Search by voice)"
                        >
                          <Mic size={15} />
                        </button>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Khasra / Gata No. (खसरा संख्या)</label>
                        <input required type="text" placeholder="e.g. 124/2" value={khasraNo} onChange={(e) => setKhasraNo(e.target.value)} className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          ULPIN <span className="text-xs font-normal text-slate-400">(Unique Land Parcel ID — optional, if known)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. UP-19-045-002-0124"
                          value={ulpin}
                          onChange={(e) => setUlpin(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-mono"
                        />
                        <p className="mt-1 text-[11px] text-slate-400">Aligned with the National ULPIN (Bhu-Aadhaar) framework — entering it speeds up an exact match.</p>
                      </div>
                    </div>
                    <button type="submit" disabled={isSearching} className="w-full flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 disabled:opacity-70" style={{ background: `linear-gradient(120deg, ${COLORS.navy}, ${COLORS.green})` }}>
                      {isSearching ? "Querying Secure Ledger..." : <><Search size={18} /> Search Record</>}
                    </button>
                  </form>
                )}

                {activeTab === "name" && (
                  <div className="py-6 text-center">
                    <User className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                    <p className="text-sm font-semibold text-slate-700">Secure Owner Name Lookup</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">To protect individual privacy under land guidelines, please enter your verified mobile number linked with your property records.</p>
                    <div className="mt-5 max-w-sm mx-auto flex gap-2">
                      <input type="tel" placeholder="10-digit mobile number" maxLength={10} className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm outline-none" />
                      <button className="bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shrink-0">Send OTP</button>
                    </div>
                  </div>
                )}

                {activeTab === "track" && (
                  <form onSubmit={handleTrack} className="py-2">
                    <div className="text-center mb-4">
                      <History className="mx-auto h-10 w-10 text-slate-300 mb-2" />
                      <p className="text-sm font-semibold text-slate-700">Track Physical Document Digitization</p>
                      <p className="text-xs text-slate-500">Enter your application reference or old file number.</p>
                    </div>
                    <div className="max-w-md mx-auto flex gap-2 mb-4">
                      <input type="text" required placeholder="e.g. BL-2026-9042" value={appId} onChange={(e) => setAppId(e.target.value)} className="w-full rounded-xl border border-slate-300 py-2.5 px-4 text-sm outline-none" />
                      <button type="submit" disabled={isTracking} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shrink-0 hover:bg-slate-800 transition">
                        {isTracking ? "Checking..." : "Track"}
                      </button>
                    </div>

                    {trackResult && (
                      <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-left">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">{trackResult.id}</span>
                          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                            <Activity size={12} className="animate-pulse" /> {trackResult.status}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-800 mt-2">{trackResult.stage}</p>
                        <p className="text-xs text-slate-500 mt-1">Assigned Office: {trackResult.officer}</p>
                        <p className="text-xs text-slate-400 mt-0.5">Last Logged: {trackResult.date}</p>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* Simulated Search Result */}
            {showResult && (
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-white shadow-lg overflow-hidden">
                <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-emerald-600" size={24} />
                    <div>
                      <h3 className="font-bold text-emerald-900 text-lg">Digitally Verified Record Found</h3>
                      <p className="text-xs text-emerald-700">Parsed via Gemini Flash OCR & Signed by Tehsildar</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Active</span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Owner Name</p>
                      <p className="font-bold text-slate-900 mt-1">Ram Prasad Sharma</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Khasra No.</p>
                      <p className="font-bold text-slate-900 mt-1">{khasraNo || "124/2"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">ULPIN</p>
                      <p className="font-bold text-slate-900 mt-1 font-mono text-sm">{ulpin || "UP-19-045-002-0124"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Total Area</p>
                      <p className="font-bold text-slate-900 mt-1">1.25 Hectares</p>
                    </div>
                  </div>

                  {/* Explainable confidence score */}
                  <div className="rounded-xl border border-slate-200 mb-6 overflow-hidden">
                    <button
                      onClick={() => setShowConfidenceDetail((v) => !v)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">AI</div>
                        <div className="text-left">
                          <p className="text-xs font-semibold text-slate-800">Confidence Score: 99.4%</p>
                          <p className="text-[11px] text-slate-500">Tap to see how this score was calculated</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400">HASH: #8f92a1c</span>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${showConfidenceDetail ? "rotate-180" : ""}`} />
                      </div>
                    </button>
                    {showConfidenceDetail && (
                      <div className="p-4 border-t border-slate-200 space-y-3">
                        {CONFIDENCE_BREAKDOWN.map((row) => (
                          <div key={row.label}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-600">{row.label}</span>
                              <span className="font-semibold text-slate-800">{row.value}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${row.value}%`, background: COLORS.green }} />
                            </div>
                          </div>
                        ))}
                        <p className="text-[11px] text-slate-400 flex items-start gap-1.5 pt-1">
                          <Info size={12} className="mt-0.5 shrink-0" />
                          Overall score is the weighted average shown above; scores below 90% on any factor are auto-flagged for manual Tehsildar review before publishing.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Downstream use — banks / financial institutions */}
                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 mb-6 flex items-start gap-3">
                    <Landmark size={18} className="text-blue-700 mt-0.5 shrink-0" />
                    <p className="text-xs text-blue-800">
                      This verified record can be shared directly with banks and financial institutions via a secure API — for loan applications, mutation processing, or collateral verification — without re-submitting paper documents.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                    <button onClick={() => alert("Downloading officially watermarked and signed Khasra PDF copy...")} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 shadow-sm">
                      <Download size={18} /> Download Certified Copy
                    </button>
                    <button onClick={() => setShowGrievanceModal(true)} className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100">
                      <AlertTriangle size={18} /> Report Data Error
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Info / Notices */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                <FileText size={18} style={{ color: COLORS.saffron }} />
                System Updates & Highlights
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <ChevronRight size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-slate-600">AI Digitization is fully active for Gorakhpur and Lucknow revenue blocks.</p>
                </li>
                <li className="flex gap-3">
                  <ChevronRight size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-slate-600">Old historical maps (Shajra) are now digitized in high-resolution vector format.</p>
                </li>
                <li className="flex gap-3">
                  <ChevronRight size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-slate-600">Direct HITL escalation pipeline reduces citizen dispute resolution time by 80%.</p>
                </li>
                <li className="flex gap-3">
                  <ChevronRight size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-slate-600">ULPIN (Bhu-Aadhaar) mapping now covers 3 pilot districts.</p>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl p-6 shadow-sm text-white" style={{ background: COLORS.navy }}>
              <h3 className="font-bold flex items-center gap-2 mb-2">
                <Building2 size={18} className="text-white/80" />
                Need Assistance?
              </h3>
              <p className="text-sm text-white/70 mb-4">
                If you face issues viewing your record, please visit your nearest Tehsil office or access our grievance portal with your identity documents.
              </p>
              <button onClick={() => alert("Redirecting to Tehsil locator directory...")} className="w-full rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/20 border border-white/20">
                Locate Tehsil Center
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Grievance Modal */}
      {showGrievanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <AlertTriangle className="text-red-600" size={20} /> Report Land Record Discrepancy
              </h3>
              <button
                onClick={() => {
                  setShowGrievanceModal(false);
                  setGrievanceSubmitted(false);
                  setGrievanceText("");
                }}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {grievanceSubmitted ? (
              <div className="py-6 space-y-4">
                <div className="text-center space-y-2">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                  <h4 className="font-bold text-slate-800 text-base">Grievance Registered Successfully</h4>
                  <p className="text-xs text-slate-500">Your report has been securely routed to the Tehsildar HITL audit queue.</p>
                </div>

                {/* SLA tracker — sets a clear resolution expectation */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold text-slate-700 mb-3">Expected resolution: within 48 hours</p>
                  <div className="flex items-center gap-2">
                    {["Filed", "Assigned", "Under Review", "Resolved"].map((stage, i) => (
                      <div key={stage} className="flex-1 text-center">
                        <div
                          className="mx-auto mb-1 h-2 rounded-full"
                          style={{ background: i === 0 ? COLORS.green : "#E2E8F0" }}
                        />
                        <p className={`text-[10px] ${i === 0 ? "font-semibold text-slate-700" : "text-slate-400"}`}>{stage}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleGrievanceSubmit} className="space-y-4">
                <p className="text-xs text-slate-600">
                  Found a mismatch in area, owner name, or boundary details? Submit your correction request directly to the reviewing officer.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Discrepancy Type</label>
                  <select required className="w-full rounded-xl border border-slate-300 p-2.5 text-sm outline-none bg-white">
                    <option value="">Choose issue...</option>
                    <option value="name">Incorrect Owner Name Spelling</option>
                    <option value="area">Area / Measurement Mismatch</option>
                    <option value="khasra">Khasra Boundary Mapping Error</option>
                    <option value="other">Other Historical Record Error</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Description</label>
                  <textarea required rows={3} value={grievanceText} onChange={(e) => setGrievanceText(e.target.value)} placeholder="Provide specific details or corrections required..." className="w-full rounded-xl border border-slate-300 p-2.5 text-sm outline-none"></textarea>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowGrievanceModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button type="submit" className="flex-1 py-2.5 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 shadow-sm">Submit to Tehsildar</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 border-t" style={{ borderColor: "#E4DCC8", background: "#FCFAF4" }}>
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© Department of Land Records · Government of India (Problem 26018 Hackathon)</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-700 cursor-pointer">Help & FAQs</span>
            <span className="hover:text-slate-700 cursor-pointer">Terms of Use</span>
            <span className="hover:text-slate-700 cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
