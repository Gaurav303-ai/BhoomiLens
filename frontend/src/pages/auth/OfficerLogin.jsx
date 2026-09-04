import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, IdCard, Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

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

export default function OfficerLogin() {
  const [govId, setGovId] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!govId.trim()) e.govId = "Government ID is required.";
    
    if (!phone.trim()) e.phone = "Phone number is required.";
    else if (!/^[6-9]\d{9}$/.test(phone.trim())) e.phone = "Enter a valid 10-digit Indian mobile number.";

    if (!password) e.password = "Password is required.";
    else if (password.length < 8) e.password = "Password must be at least 8 characters.";

    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:8000/api/users/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          employeeID: govId, 
          phoneNumber: phone, 
          password 
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        navigate("/OfficerDashboard");
      } else {
        setErrors({ server: result.message || "Invalid credentials or login failed." });
      }
    } catch (err) {
      console.error("Connection error:", err);
      setErrors({ server: "Server connection error. Ensure backend is running on port 8000." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10" style={{ background: COLORS.paper, color: COLORS.ink }}>
      {/* Tricolour hairline top */}
      <div className="fixed top-0 left-0 h-1.5 w-full flex">
        <div className="flex-1" style={{ background: COLORS.saffron }} />
        <div className="flex-1" style={{ background: "#FFFFFF" }} />
        <div className="flex-1" style={{ background: COLORS.green }} />
      </div>

      <div className="w-full max-w-md">
        {/* Header / brand */}
        <div className="mb-6 flex flex-col items-center text-center">
          <SealMark size={44} className="mb-3" style={{ color: COLORS.navy }} />
          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
            Government of India · Department of Land Records
          </p>
          <h1 className="mt-1 text-xl font-bold" style={{ fontFamily: "'Merriweather', serif" }}>
            भूमि अभिलेख डिजिटलीकरण मंच
          </h1>
          <p className="text-sm text-slate-500">Officer Login</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "#EAF2FB", color: COLORS.navy }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="font-semibold text-sm">Authorised Personnel Only</p>
              <p className="text-xs text-slate-500">Access is logged and monitored.</p>
            </div>
          </div>

          {errors.server && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 text-xs text-red-700">
              {errors.server}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Government ID */}
            <div>
              <label htmlFor="govId" className="mb-1.5 block text-sm font-medium text-slate-700">
                Government ID
              </label>
              <div className="relative">
                <IdCard size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="govId"
                  type="text"
                  autoComplete="username"
                  placeholder="e.g. UP-LR-234891"
                  value={govId}
                  onChange={(e) => setGovId(e.target.value)}
                  className={`w-full rounded-xl border py-2.5 pl-9 pr-3 text-sm outline-none transition focus:ring-2 ${
                    errors.govId ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:ring-blue-200"
                  }`}
                  aria-invalid={!!errors.govId}
                  aria-describedby={errors.govId ? "govId-error" : undefined}
                />
              </div>
              {errors.govId && <p id="govId-error" className="mt-1 text-xs text-red-600">{errors.govId}</p>}
            </div>

            {/* Phone number */}
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                Registered Phone Number
              </label>
              <div className="relative">
                <Phone size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-slate-400">+91</span>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className={`w-full rounded-xl border py-2.5 pl-16 pr-3 text-sm outline-none transition focus:ring-2 ${
                    errors.phone ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:ring-blue-200"
                  }`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
              </div>
              {errors.phone && <p id="phone-error" className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-xl border py-2.5 pl-9 pr-10 text-sm outline-none transition focus:ring-2 ${
                    errors.password ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:ring-blue-200"
                  }`}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p id="password-error" className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="rounded border-slate-300" />
                Keep me signed in
              </label>
              <button type="button" onClick={() => navigate("/forgot-password")} className="font-medium" style={{ color: COLORS.navy }}>
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
              style={{ background: `linear-gradient(120deg, ${COLORS.green}, ${COLORS.navy})` }}
            >
              {submitting ? "Verifying..." : "Sign in"}
              {!submitting && <ArrowRight size={16} />}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-slate-600">
          Don't have an account linked yet?{" "}
          <button onClick={() => navigate("/signup")} className="font-semibold" style={{ color: COLORS.green }}>
            Register your account
          </button>
        </p>

        <p className="mt-6 text-center text-xs text-slate-400">
          By continuing you agree to the department's Terms of Use and Privacy Policy.
        </p>
      </div>
    </div>
  );
}