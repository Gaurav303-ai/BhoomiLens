// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Upload, CheckCircle2, Cpu, ArrowRight, FileText, ShieldCheck } from "lucide-react";

// const COLORS = {
//   saffron: "#FF9933",
//   navy: "#0B3D6B",
//   green: "#0F7A3D",
//   paper: "#F7F5EF",
// };

// export default function UploadDocument() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [extractedResult, setExtractedResult] = useState(null);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUploadAndExtract = async (e) => {
//     e.preventDefault();
//     if (!file) return alert("Please select a document image first!");

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("document", file); // Multer field name 'document'

//     try {
//       const response = await fetch("http://localhost:8000/api/users/documents/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();
//       if (response.ok && result.success) {
//         setExtractedResult(result.data);
//       } else {
//         alert(result.message || "Extraction failed");
//       }
//     } catch (err) {
//       console.error("Upload network error:", err);
//       // Fallback demo data agar backend active na ho
//       setExtractedResult({
//         ownerName: "Ram Prasad Sharma",
//         khasraNumber: "124/2",
//         village: "Chandrapur",
//         totalArea: "1.25 Hectares",
//         confidenceScore: "98.4%"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHitlApproval = () => {
//     alert("Record successfully verified and committed to state database! 🎉");
//     navigate("/OfficerDashboard");
//   };

//   return (
//     <div className="min-h-screen w-full p-6 sm:p-10" style={{ background: COLORS.paper, color: COLORS.navy }}>
//       <div className="max-w-4xl mx-auto">
        
//         {/* Header */}
//         <div className="mb-8 flex items-center justify-between border-b pb-4 border-slate-300">
//           <div>
//             <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
//               <Cpu size={14} /> Problem 26018 · Gemini Flash Multimodal OCR Pipeline
//             </div>
//             <h1 className="text-2xl font-bold font-serif">Historical Document Digitization & HITL Review</h1>
//           </div>
//           <button onClick={() => navigate("/OfficerDashboard")} className="text-sm font-semibold underline">
//             ← Back to Dashboard
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
//           {/* Left: Upload Form */}
//           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
//             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
//               <Upload size={18} className="text-blue-600" /> Step 1: Upload Paper Record
//             </h3>
            
//             <form onSubmit={handleUploadAndExtract} className="space-y-4">
//               <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition cursor-pointer">
//                 <FileText className="mx-auto h-12 w-12 text-slate-400 mb-2" />
//                 <input type="file" onChange={handleFileChange} accept="image/*,application/pdf" className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
//                 <p className="text-xs text-slate-400 mt-2">Upload scanned Khasra, Khatauni or Jamabandi sheets</p>
//               </div>

//               <button 
//                 type="submit" 
//                 disabled={loading}
//                 className="w-full py-3 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 shadow-md"
//                 style={{ background: COLORS.green }}
//               >
//                 {loading ? "Gemini AI Parsing Document..." : <>Extract Data via Gemini AI <ArrowRight size={16} /></>}
//               </button>
//             </form>
//           </div>

//           {/* Right: AI Extraction & HITL Verification */}
//           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
//             <div>
//               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
//                 <ShieldCheck size={18} className="text-emerald-600" /> Step 2: AI Parsed Results & HITL Review
//               </h3>

//               {extractedResult ? (
//                 <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
//                   <div className="flex justify-between border-b pb-2">
//                     <span className="text-slate-500">Owner Name:</span>
//                     <span className="font-bold text-slate-800">{extractedResult.ownerName}</span>
//                   </div>
//                   <div className="flex justify-between border-b pb-2">
//                     <span className="text-slate-500">Khasra Number:</span>
//                     <span className="font-bold font-mono text-slate-800">{extractedResult.khasraNumber}</span>
//                   </div>
//                   <div className="flex justify-between border-b pb-2">
//                     <span className="text-slate-500">Village:</span>
//                     <span className="font-bold text-slate-800">{extractedResult.village}</span>
//                   </div>
//                   <div className="flex justify-between border-b pb-2">
//                     <span className="text-slate-500">Total Area:</span>
//                     <span className="font-bold text-slate-800">{extractedResult.totalArea}</span>
//                   </div>
//                   <div className="flex justify-between items-center pt-1">
//                     <span className="text-slate-500">OCR Confidence:</span>
//                     <span className="bg-emerald-100 text-emerald-800 text-xs font-mono font-bold px-2 py-0.5 rounded">
//                       {extractedResult.confidenceScore || "98.4%"}
//                     </span>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-12 text-slate-400 border border-dashed rounded-xl">
//                   <p className="text-sm">Awaiting document upload...</p>
//                   <p className="text-xs mt-1">Structured JSON fields will appear here automatically.</p>
//                 </div>
//               )}
//             </div>

//             {extractedResult && (
//               <button 
//                 onClick={handleHitlApproval}
//                 className="mt-6 w-full py-3 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 shadow-md"
//                 style={{ background: COLORS.navy }}
//               >
//                 <CheckCircle2 size={18} /> Authorize & Commit to Registry
//               </button>
//             )}
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, CheckCircle2, Cpu, ArrowRight, FileText, ShieldCheck, AlertTriangle, Pencil, Lock } from "lucide-react";

const COLORS = {
  saffron: "#FF9933",
  navy: "#0B3D6B",
  green: "#0F7A3D",
  red: "#C0392B",
  paper: "#F7F5EF",
};

// Below this, the officer must review/edit every field before proceeding.
const CONFIDENCE_THRESHOLD = 95;

const EMPTY_RESULT = { ownerName: "", khasraNumber: "", village: "", totalArea: "", confidenceScore: 0 };

export default function UploadDocument() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedResult, setExtractedResult] = useState(null);
  const [editableResult, setEditableResult] = useState(EMPTY_RESULT);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setExtractedResult(null);
    setConfirmed(false);
  };

  const handleUploadAndExtract = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a document image first!");

    setLoading(true);
    setExtractedResult(null);
    setConfirmed(false);

    const formData = new FormData();
    formData.append("document", file); // Multer field name 'document'

    let result;
    try {
      const response = await fetch("http://localhost:8000/api/users/documents/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.success) {
        result = data.data;
      } else {
        alert(data.message || "Extraction failed");
      }
    } catch (err) {
      console.error("Upload network error:", err);
      // Fallback demo data if backend isn't running — remove once wired up.
      result = {
        ownerName: "Ram Prasad Sharma",
        khasraNumber: "124/2",
        village: "Chandrapur",
        totalArea: "1.25 Hectares",
        confidenceScore: 82.5, // try lowering/raising this to see both flows
      };
    }

    if (result) {
      const score = typeof result.confidenceScore === "string" ? parseFloat(result.confidenceScore) : result.confidenceScore;
      const normalised = { ...result, confidenceScore: score };
      setExtractedResult(normalised);
      setEditableResult(normalised);
      // Low confidence → force the officer into edit mode immediately.
      setIsEditing(score < CONFIDENCE_THRESHOLD);
    }
    setLoading(false);
  };

  const handleFieldChange = (field, value) => {
    setEditableResult((prev) => ({ ...prev, [field]: value }));
  };

  const isHighConfidence = extractedResult && extractedResult.confidenceScore >= CONFIDENCE_THRESHOLD;
  // Officer can proceed if: confidence is high AND not editing, OR they've explicitly confirmed edited values.
  const canProceed = extractedResult && ((isHighConfidence && !isEditing) || confirmed);

  const handleConfirmEdits = () => {
    setConfirmed(true);
    setIsEditing(false);
  };

  const handleHitlApproval = () => {
    // Replace with actual API call:
    // await fetch("/api/records/commit", { method: "POST", body: JSON.stringify(editableResult) });
    alert("Record successfully verified and committed to state database! 🎉");
    navigate("/OfficerDashboard");
  };

  return (
    <div className="min-h-screen w-full p-6 sm:p-10" style={{ background: COLORS.paper, color: COLORS.navy }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between border-b pb-4 border-slate-300">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
              <Cpu size={14} /> Problem 26018 · Gemini Flash Multimodal OCR Pipeline
            </div>
            <h1 className="text-2xl font-bold font-serif">Historical Document Digitization & HITL Review</h1>
          </div>
          <button onClick={() => navigate("/OfficerDashboard")} className="text-sm font-semibold underline">
            ← Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Upload Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Upload size={18} className="text-blue-600" /> Step 1: Upload Paper Record
            </h3>

            <form onSubmit={handleUploadAndExtract} className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition cursor-pointer">
                <FileText className="mx-auto h-12 w-12 text-slate-400 mb-2" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-slate-400 mt-2">Upload scanned Khasra, Khatauni or Jamabandi sheets</p>
              </div>

              <button
                type="submit"
                disabled={loading || !file}
                className="w-full py-3 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                style={{ background: COLORS.green }}
              >
                {loading ? "Gemini AI Parsing Document..." : <>Extract Data via Gemini AI <ArrowRight size={16} /></>}
              </button>
            </form>
          </div>

          {/* Right: AI Extraction & HITL Verification */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-600" /> Step 2: AI Parsed Results & HITL Review
              </h3>

              {extractedResult ? (
                <>
                  {/* Confidence banner — tells the officer what's expected of them */}
                  <div
                    className="flex items-center gap-2 rounded-lg px-3 py-2 mb-4 text-xs font-semibold"
                    style={{
                      background: isHighConfidence ? "#EAF6EE" : "#FDECEA",
                      color: isHighConfidence ? COLORS.green : COLORS.red,
                    }}
                  >
                    {isHighConfidence ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                    {isHighConfidence
                      ? `High confidence (${extractedResult.confidenceScore}%) — ready to proceed`
                      : `Low confidence (${extractedResult.confidenceScore}%) — please review and correct the fields below`}
                  </div>

                  <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                    <Field label="Owner Name" value={editableResult.ownerName} editable={isEditing} onChange={(v) => handleFieldChange("ownerName", v)} />
                    <Field label="Khasra Number" value={editableResult.khasraNumber} editable={isEditing} mono onChange={(v) => handleFieldChange("khasraNumber", v)} />
                    <Field label="Village" value={editableResult.village} editable={isEditing} onChange={(v) => handleFieldChange("village", v)} />
                    <Field label="Total Area" value={editableResult.totalArea} editable={isEditing} onChange={(v) => handleFieldChange("totalArea", v)} last />
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-slate-500">OCR Confidence:</span>
                      <span
                        className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                        style={{ background: isHighConfidence ? "#D1F2DE" : "#FADBD8", color: isHighConfidence ? COLORS.green : COLORS.red }}
                      >
                        {extractedResult.confidenceScore}%
                      </span>
                    </div>
                  </div>

                  {/* Edit toggle — always available even for high-confidence results */}
                  {!isEditing && (
                    <button
                      onClick={() => { setIsEditing(true); setConfirmed(false); }}
                      className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700"
                    >
                      <Pencil size={12} /> Edit fields manually
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-slate-400 border border-dashed rounded-xl">
                  <p className="text-sm">Awaiting document upload...</p>
                  <p className="text-xs mt-1">Structured JSON fields will appear here automatically.</p>
                </div>
              )}
            </div>

            {extractedResult && (
              <>
                {isEditing ? (
                  <button
                    onClick={handleConfirmEdits}
                    className="mt-6 w-full py-3 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 shadow-md"
                    style={{ background: COLORS.saffron }}
                  >
                    <CheckCircle2 size={18} /> Confirm Corrected Values
                  </button>
                ) : (
                  <button
                    onClick={handleHitlApproval}
                    disabled={!canProceed}
                    className="mt-6 w-full py-3 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                    style={{ background: COLORS.navy }}
                  >
                    {canProceed ? <CheckCircle2 size={18} /> : <Lock size={16} />}
                    {isHighConfidence ? "Authorize & Commit to Registry" : "Authorize & Commit (Human-Verified)"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Field ---------------- */
function Field({ label, value, editable, mono, onChange, last }) {
  return (
    <div className={`flex justify-between items-center gap-3 ${!last ? "border-b pb-2" : "pb-1"}`}>
      <span className="text-slate-500 shrink-0">{label}:</span>
      {editable ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full max-w-[60%] rounded-lg border border-amber-300 bg-amber-50 px-2 py-1 text-right text-sm outline-none focus:ring-2 focus:ring-amber-200 ${mono ? "font-mono" : ""}`}
        />
      ) : (
        <span className={`font-bold text-slate-800 text-right ${mono ? "font-mono" : ""}`}>{value}</span>
      )}
    </div>
  );
}
