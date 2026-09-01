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
  ChevronRight
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

export default function CitizenHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("khasra"); // 'khasra' | 'name' | 'track'
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Form States
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [village, setVillage] = useState("");
  const [khasraNo, setKhasraNo] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setShowResult(false);
    
    // Fake API Delay
    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
    }, 1200);
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
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/60">Government of India · Department of Land Records</p>
              <p className="font-semibold" style={{ fontFamily: "'Merriweather', serif" }}>
                भूमि अभिलेख डिजिटलीकरण मंच <span className="text-white/50 font-normal">— Citizen Portal</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 sm:px-6 lg:px-10 max-w-6xl mx-auto">
        
        {/* Welcome Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Merriweather', serif", color: COLORS.navy }}>
            Search & Verify Land Records
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Access your digitally verified land records, track your physical document digitization status, or report discrepancies directly to the Tehsildar.
          </p>
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
                        <select 
                          required value={district} onChange={(e) => setDistrict(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                          <option value="">Select District...</option>
                          <option value="Gorakhpur">Gorakhpur</option>
                          <option value="Lucknow">Lucknow</option>
                          <option value="Varanasi">Varanasi</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Tehsil (तहसील)</label>
                        <select 
                          required value={tehsil} onChange={(e) => setTehsil(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                          <option value="">Select Tehsil...</option>
                          <option value="Sadar">Sadar</option>
                          <option value="Chauri Chaura">Chauri Chaura</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Village (गाँव)</label>
                        <input 
                          required type="text" placeholder="Enter Village Name" value={village} onChange={(e) => setVillage(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Khasra / Gata No. (खसरा संख्या)</label>
                        <input 
                          required type="text" placeholder="e.g. 124/2" value={khasraNo} onChange={(e) => setKhasraNo(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" disabled={isSearching}
                      className="w-full flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 disabled:opacity-70"
                      style={{ background: `linear-gradient(120deg, ${COLORS.navy}, ${COLORS.green})` }}
                    >
                      {isSearching ? "Searching Records..." : <><Search size={18} /> Search Record</>}
                    </button>
                  </form>
                )}

                {activeTab === "name" && (
                  <div className="text-center py-10 text-slate-500">
                    <User className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                    <p>Search by name is available for registered users only to protect privacy.</p>
                  </div>
                )}

                {activeTab === "track" && (
                  <div className="text-center py-10 text-slate-500">
                    <History className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                    <p>Enter your 12-digit Application ID to track digitization status.</p>
                    <input type="text" placeholder="Application ID" className="mt-4 w-full max-w-sm rounded-xl border border-slate-300 py-2.5 px-4 text-center mx-auto block" />
                  </div>
                )}
              </div>
            </div>

            {/* Simulated Search Result */}
            {showResult && (
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-white shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-emerald-600" size={24} />
                    <h3 className="font-bold text-emerald-900 text-lg">Digitally Verified Record Found</h3>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Active</span>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Owner Name</p>
                      <p className="font-bold text-slate-900 mt-1">Ram Prasad Sharma</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Khasra No.</p>
                      <p className="font-bold text-slate-900 mt-1">{khasraNo || "124/2"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Total Area</p>
                      <p className="font-bold text-slate-900 mt-1">1.25 Hectares</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Last Updated</p>
                      <p className="font-bold text-slate-900 mt-1">12 Aug 2026</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                    <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">
                      <Download size={18} /> Download Certified Copy
                    </button>
                    {/* THE MASTERSTROKE BUTTON */}
                    <button className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100">
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
                What's New
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <ChevronRight size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-slate-600">AI Digitization is now active for Gorakhpur and Lucknow districts.</p>
                </li>
                <li className="flex gap-3">
                  <ChevronRight size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-slate-600">Old torn maps (Shajra) can now be viewed in high resolution online.</p>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl p-6 shadow-sm text-white" style={{ background: COLORS.navy }}>
              <h3 className="font-bold flex items-center gap-2 mb-2">
                <Building2 size={18} className="text-white/80" />
                Need Help?
              </h3>
              <p className="text-sm text-white/70 mb-4">
                If you face issues viewing your record, please visit your nearest Tehsil office with your Aadhar Card.
              </p>
              <button className="w-full rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/20 border border-white/20">
                Locate Tehsil Center
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t" style={{ borderColor: "#E4DCC8", background: "#FCFAF4" }}>
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© Department of Land Records · Government of India</p>
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