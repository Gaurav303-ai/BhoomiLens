// // import { useState } from "react";
// // import { IdCard, Phone, Lock, User, Mail, Building2, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
// // import { useNavigate } from "react-router-dom";
// // const COLORS = {
// //   saffron: "#FF9933",
// //   navy: "#0B3D6B",
// //   green: "#0F7A3D",
// //   gold: "#C79A3D",
// //   ink: "#1C2530",
// //   paper: "#F7F5EF",
// // };

// // function SealMark({ size = 40, className = "", style }) {
// //   const spokes = Array.from({ length: 16 });
// //   return (
// //     <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style}>
// //       <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
// //       <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
// //       {spokes.map((_, i) => {
// //         const angle = (i / spokes.length) * Math.PI * 2;
// //         const x1 = 50 + Math.cos(angle) * 34;
// //         const y1 = 50 + Math.sin(angle) * 34;
// //         const x2 = 50 + Math.cos(angle) * 46;
// //         const y2 = 50 + Math.sin(angle) * 46;
// //         return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" />;
// //       })}
// //       <circle cx="50" cy="50" r="6" fill="currentColor" />
// //     </svg>
// //   );
// // }

// // const DEPARTMENTS = [
// //   "Land Records Officer",
// //   "Tehsildar",
// //   "Sub-Registrar",
// //   "District Collectorate Staff",
// //   "GIS / Survey Officer",
// // ];

// // function Field({ id, label, icon: Icon, error, children }) {
// //   return (
// //     <div>
// //       <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
// //       <div className="relative">
// //         {Icon && <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />}
// //         {children}
// //       </div>
// //       {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
// //     </div>
// //   );
// // }

// // const inputCls = (hasError, extraLeft = "pl-9") =>
// //   `w-full rounded-xl border py-2.5 ${extraLeft} pr-3 text-sm outline-none transition focus:ring-2 ${
// //     hasError ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:ring-blue-200"
// //   }`;

// // export default function OfficerSignup() {
// //     const navigate = useNavigate();
  
// //   const [form, setForm] = useState({
// //     fullName: "",
// //     email: "",
// //     department: "",
// //     govId: "",
// //     phone: "",
// //     otp: "",
// //     password: "",
// //     confirmPassword: "",
// //     agree: false,
// //   });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [step, setStep] = useState(1); // 1: details, 2: verify phone, 3: password
// //   const [submitting, setSubmitting] = useState(false);

// //   function set(field, value) {
// //     setForm((f) => ({ ...f, [field]: value }));
// //     setErrors((e) => ({ ...e, [field]: undefined }));
// //   }

// //   function validateStep1() {
// //     const e = {};
// //     if (!form.fullName.trim()) e.fullName = "Full name is required.";
// //     if (!form.email.trim()) e.email = "Official email is required.";
// //     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
// //     if (!form.department) e.department = "Select your designation.";
// //     if (!form.govId.trim()) e.govId = "Government ID is required.";
// //     else if (!/^[A-Za-z0-9]{6,16}$/.test(form.govId.trim())) e.govId = "Enter a valid Government ID (6–16 alphanumeric characters).";
// //     if (!form.phone.trim()) e.phone = "Phone number is required.";
// //     else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit Indian mobile number.";
// //     return e;
// //   }

// //   function validateStep2() {
// //     const e = {};
// //     if (!form.otp.trim()) e.otp = "Enter the OTP sent to your phone.";
// //     else if (!/^\d{6}$/.test(form.otp.trim())) e.otp = "OTP must be 6 digits.";
// //     return e;
// //   }

// //   function validateStep3() {
// //     const e = {};
// //     if (!form.password) e.password = "Password is required.";
// //     else if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
// //     if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords do not match.";
// //     if (!form.agree) e.agree = "You must accept the terms to continue.";
// //     return e;
// //   }

// //   function handleSendOtp() {
// //     const e = validateStep1();
// //     setErrors(e);
// //     if (Object.keys(e).length > 0) return;
// //     // Replace with actual API call:
// //     // await fetch("/api/auth/officer/send-otp", { method: "POST", body: JSON.stringify({ phone: form.phone }) });
// //     setStep(2);
// //   }

// //   function handleVerifyOtp() {
// //     const e = validateStep2();
// //     setErrors(e);
// //     if (Object.keys(e).length > 0) return;
// //     // Replace with actual API call:
// //     // await fetch("/api/auth/officer/verify-otp", { method: "POST", body: JSON.stringify({ phone: form.phone, otp: form.otp }) });
// //     setStep(3);
// //   }

// //   function handleSubmit(ev) {
// //     ev.preventDefault();
// //     const e = validateStep3();
// //     setErrors(e);
// //     if (Object.keys(e).length > 0) return;

// //     setSubmitting(true);
// //     // Replace with actual API call:
// //     // await fetch("/api/auth/officer/register", {
// //     //   method: "POST",
// //     //   headers: { "Content-Type": "application/json" },
// //     //   body: JSON.stringify(form),
// //     // });
// //     setTimeout(() => {
// //       setSubmitting(false);
// //       navigate("/officer/login");
// //     }, 900);
// //   }

// //   return (
// //     <div className="min-h-screen w-full flex items-center justify-center px-4 py-10" style={{ background: COLORS.paper, color: COLORS.ink }}>
// //       <div className="fixed top-0 left-0 h-1.5 w-full flex">
// //         <div className="flex-1" style={{ background: COLORS.saffron }} />
// //         <div className="flex-1" style={{ background: "#FFFFFF" }} />
// //         <div className="flex-1" style={{ background: COLORS.green }} />
// //       </div>

// //       <div className="w-full max-w-lg">
// //         <div className="mb-6 flex flex-col items-center text-center">
// //           <SealMark size={44} className="mb-3" style={{ color: COLORS.navy }} />
// //           <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
// //             Government of India · Department of Land Records
// //           </p>
// //           <h1 className="mt-1 text-xl font-bold" style={{ fontFamily: "'Merriweather', serif" }}>
// //             Officer Registration
// //           </h1>
// //           <p className="text-sm text-slate-500">Verified using your Government ID and registered phone number.</p>
// //         </div>

// //         {/* Step indicator */}
// //         <div className="mb-5 flex items-center justify-center gap-2">
// //           {["Details", "Verify phone", "Set password"].map((label, i) => {
// //             const n = i + 1;
// //             const active = step === n;
// //             const done = step > n;
// //             return (
// //               <div key={label} className="flex items-center gap-2">
// //                 <div
// //                   className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold"
// //                   style={{
// //                     background: done ? COLORS.green : active ? COLORS.navy : "#E5E1D3",
// //                     color: done || active ? "white" : COLORS.ink,
// //                   }}
// //                 >
// //                   {done ? "✓" : n}
// //                 </div>
// //                 <span className={`text-xs ${active ? "font-semibold" : "text-slate-400"}`}>{label}</span>
// //                 {n < 3 && <div className="h-px w-6 bg-slate-300" />}
// //               </div>
// //             );
// //           })}
// //         </div>

// //         <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
// //           {/* ---------- Step 1: Details incl. Government ID + phone ---------- */}
// //           {step === 1 && (
// //             <div className="space-y-4">
// //               <Field id="fullName" label="Full Name" icon={User} error={errors.fullName}>
// //                 <input
// //                   id="fullName"
// //                   type="text"
// //                   autoComplete="name"
// //                   placeholder="As per official records"
// //                   value={form.fullName}
// //                   onChange={(e) => set("fullName", e.target.value)}
// //                   className={inputCls(errors.fullName)}
// //                 />
// //               </Field>

// //               <Field id="email" label="Official Email" icon={Mail} error={errors.email}>
// //                 <input
// //                   id="email"
// //                   type="email"
// //                   autoComplete="email"
// //                   placeholder="name@landrecords.gov.in"
// //                   value={form.email}
// //                   onChange={(e) => set("email", e.target.value)}
// //                   className={inputCls(errors.email)}
// //                 />
// //               </Field>

// //               <Field id="department" label="Designation" icon={Building2} error={errors.department}>
// //                 <select
// //                   id="department"
// //                   value={form.department}
// //                   onChange={(e) => set("department", e.target.value)}
// //                   className={inputCls(errors.department) + " bg-white appearance-none"}
// //                 >
// //                   <option value="">Select designation</option>
// //                   {DEPARTMENTS.map((d) => (
// //                     <option key={d} value={d}>{d}</option>
// //                   ))}
// //                 </select>
// //               </Field>

// //               {/* Government ID — required */}
// //               <Field id="govId" label="Government ID" icon={IdCard} error={errors.govId}>
// //                 <input
// //                   id="govId"
// //                   type="text"
// //                   autoComplete="off"
// //                   placeholder="e.g. UP-LR-234891"
// //                   value={form.govId}
// //                   onChange={(e) => set("govId", e.target.value)}
// //                   className={inputCls(errors.govId)}
// //                 />
// //               </Field>
// //               <p className="-mt-2 text-xs text-slate-400">Used to verify your posting against departmental records. Not shared publicly.</p>

// //               {/* Phone number — required */}
// //               <Field id="phone" label="Phone Number" icon={Phone} error={errors.phone}>
// //                 <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-slate-400">+91</span>
// //                 <input
// //                   id="phone"
// //                   type="tel"
// //                   inputMode="numeric"
// //                   autoComplete="tel"
// //                   placeholder="98765 43210"
// //                   value={form.phone}
// //                   onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
// //                   className={inputCls(errors.phone, "pl-16")}
// //                 />
// //               </Field>
// //               <p className="-mt-2 text-xs text-slate-400">We'll send a one-time code here to verify it's really you.</p>

// //               <button
// //                 type="button"
// //                 onClick={handleSendOtp}
// //                 className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5"
// //                 style={{ background: `linear-gradient(120deg, ${COLORS.green}, ${COLORS.navy})` }}
// //               >
// //                 Send OTP <ArrowRight size={16} />
// //               </button>
// //             </div>
// //           )}

// //           {/* ---------- Step 2: Verify phone via OTP ---------- */}
// //           {step === 2 && (
// //             <div className="space-y-4">
// //               <p className="text-sm text-slate-600">
// //                 A 6-digit code was sent to <span className="font-semibold text-slate-800">+91 {form.phone}</span>.
// //               </p>
// //               <Field id="otp" label="Enter OTP" error={errors.otp}>
// //                 <input
// //                   id="otp"
// //                   type="text"
// //                   inputMode="numeric"
// //                   maxLength={6}
// //                   placeholder="••••••"
// //                   value={form.otp}
// //                   onChange={(e) => set("otp", e.target.value.replace(/\D/g, "").slice(0, 6))}
// //                   className={inputCls(errors.otp, "pl-3") + " tracking-[0.5em] text-center font-semibold"}
// //                 />
// //               </Field>

// //               <div className="flex items-center justify-between text-xs text-slate-500">
// //                 <button type="button" onClick={handleSendOtp} className="font-medium" style={{ color: COLORS.navy }}>
// //                   Resend OTP
// //                 </button>
// //                 <span>Didn't get it? Check the number entered.</span>
// //               </div>

// //               <div className="flex gap-3">
// //                 <button
// //                   type="button"
// //                   onClick={() => setStep(1)}
// //                   className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
// //                 >
// //                   <ArrowLeft size={15} /> Back
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={handleVerifyOtp}
// //                   className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5"
// //                   style={{ background: `linear-gradient(120deg, ${COLORS.green}, ${COLORS.navy})` }}
// //                 >
// //                   Verify <ArrowRight size={16} />
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           {/* ---------- Step 3: Set password ---------- */}
// //           {step === 3 && (
// //             <form onSubmit={handleSubmit} noValidate className="space-y-4">
// //               <Field id="password" label="Create Password" icon={Lock} error={errors.password}>
// //                 <input
// //                   id="password"
// //                   type={showPassword ? "text" : "password"}
// //                   autoComplete="new-password"
// //                   placeholder="••••••••"
// //                   value={form.password}
// //                   onChange={(e) => set("password", e.target.value)}
// //                   className={inputCls(errors.password) + " pr-10"}
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword((s) => !s)}
// //                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
// //                   aria-label={showPassword ? "Hide password" : "Show password"}
// //                 >
// //                   {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
// //                 </button>
// //               </Field>

// //               <Field id="confirmPassword" label="Confirm Password" icon={Lock} error={errors.confirmPassword}>
// //                 <input
// //                   id="confirmPassword"
// //                   type={showPassword ? "text" : "password"}
// //                   autoComplete="new-password"
// //                   placeholder="••••••••"
// //                   value={form.confirmPassword}
// //                   onChange={(e) => set("confirmPassword", e.target.value)}
// //                   className={inputCls(errors.confirmPassword)}
// //                 />
// //               </Field>

// //               <label className="flex items-start gap-2 text-sm text-slate-600">
// //                 <input
// //                   type="checkbox"
// //                   checked={form.agree}
// //                   onChange={(e) => set("agree", e.target.checked)}
// //                   className="mt-0.5 rounded border-slate-300"
// //                 />
// //                 I confirm the details above are accurate and I agree to the department's Terms of Use and Privacy Policy.
// //               </label>
// //               {errors.agree && <p className="text-xs text-red-600">{errors.agree}</p>}

// //               <div className="flex gap-3">
// //                 <button
// //                   type="button"
// //                   onClick={() => setStep(2)}
// //                   className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
// //                 >
// //                   <ArrowLeft size={15} /> Back
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   disabled={submitting}
// //                   className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 disabled:opacity-70"
// //                   style={{ background: `linear-gradient(120deg, ${COLORS.green}, ${COLORS.navy})` }}
// //                 >
// //                   {submitting ? "Creating account..." : "Create account"}
// //                 </button>
// //               </div>
// //             </form>
// //           )}
// //         </div>
// //         <p className="mt-5 text-center text-sm text-slate-600">
// //       Already registered?{" "}
// //       <button onClick={() => navigate("/login")} className="font-semibold" style={{ color: COLORS.green }}>
// //         Sign in instead
// //       </button>
// //     </p>
// //         {/* <p className="mt-5 text-center text-sm text-slate-600">
// //           Already registered?{" "}
// //           <button onClick={() => navigate("/officer/login")} className="font-semibold" style={{ color: COLORS.green }}>
// //             Sign in instead
// //           </button>
// //         </p> */}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Shield, UserCheck, ArrowRight, Mail, Phone, Briefcase } from 'lucide-react';

// const COLORS = {
//   saffron: "#FF9933",
//   navy: "#0B3D6B",
//   green: "#0F7A3D",
//   paper: "#F7F5EF",
// };

// export default function OfficerSignup() {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1); // Step 1: Details, Step 2: OTP Verification, Step 3: Password
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Form states
//   const [formData, setFormData] = useState({
//     employeeID: "",
//     firstName: "",
//     lastName: "",
//     designation: "",
//     phoneNumber: "",
//     signupId: "",
//     email: "",
//     verificationCode: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // STEP 1: Submit Initial Details & Request OTP
//   const handleInitialSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/signup_session', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           employeeID: formData.employeeID,
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           designation: formData.designation,
//           phoneNumber: formData.phoneNumber
//         })
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         setFormData(prev => ({
//           ...prev,
//           signupId: result.data.user.signupId,
//           email: result.data.user.email
//         }));
//         setStep(2); // Move to OTP verification step
//       } else {
//         setError(result.message || "Signup failed. Please check Employee ID.");
//       }
//     } catch (err) {
//       setError("Server connection error. Ensure backend is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 2: Verify Email OTP Code
//   const handleVerifyEmail = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/verify_email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           user: {
//             signupId: formData.signupId,
//             email: formData.email
//           },
//           verificationCode: formData.verificationCode
//         })
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         setStep(3); // Move to Set Password step
//       } else {
//         setError(result.message || "Invalid or expired verification code.");
//       }
//     } catch (err) {
//       setError("Server connection error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 3: Set Password & Complete Registration
//   const handleSetPassword = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/set_password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           user: {
//             signupId: formData.signupId,
//             email: formData.email
//           },
//           password: formData.password
//         })
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         alert("Registration completed successfully! Please login.");
//         navigate('/login'); // Redirect to login page
//       } else {
//         setError(result.message || "Could not set password.");
//       }
//     } catch (err) {
//       setError("Server connection error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4" style={{ background: COLORS.paper }}>
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        
//         {/* Header */}
//         <div className="p-6 text-white text-center" style={{ background: COLORS.navy }}>
//           <Shield className="mx-auto h-10 w-10 text-amber-400 mb-2" />
//           <h2 className="text-xl font-bold font-serif">Bhoomi Lens · Officer Portal</h2>
//           <p className="text-xs text-slate-300 mt-1">Secure Land Record Digitization Access</p>
//         </div>

//         {/* Error message */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-3 m-4 text-xs text-red-700">
//             {error}
//           </div>
//         )}

//         <div className="p-6">
//           {/* STEP 1 FORM */}
//           {step === 1 && (
//             <form onSubmit={handleInitialSignup} className="space-y-4">
//               <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Step 1: Officer Verification</h3>
//               <div>
//                 <label className="block text-xs font-semibold text-slate-600 mb-1">Employee ID (Whitelisted)</label>
//                 <input required type="text" name="employeeID" placeholder="e.g. EMP-2026-001" value={formData.employeeID} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-600 mb-1">First Name</label>
//                   <input required type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-600 mb-1">Last Name</label>
//                   <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-slate-600 mb-1">Designation</label>
//                 <input required type="text" name="designation" placeholder="e.g. Tehsildar / Revenue Officer" value={formData.designation} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
//                 <input required type="text" name="phoneNumber" placeholder="10-digit mobile number" value={formData.phoneNumber} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
//               </div>
//               <button disabled={loading} type="submit" className="w-full py-3 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 mt-4 shadow-md" style={{ background: COLORS.navy }}>
//                 {loading ? "Verifying ID..." : <>Proceed to Email Verification <ArrowRight size={16} /></>}
//               </button>
//             </form>
//           )}

//           {/* STEP 2 FORM: OTP */}
//           {step === 2 && (
//             <form onSubmit={handleVerifyEmail} className="space-y-4">
//               <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Step 2: Enter Verification Code</h3>
//               <p className="text-xs text-slate-500 mb-4">A secure verification code has been sent to your official government email linked with Employee ID.</p>
//               <div>
//                 <label className="block text-xs font-semibold text-slate-600 mb-1">Verification Code (OTP)</label>
//                 <input required type="text" name="verificationCode" placeholder="Enter code received on email" value={formData.verificationCode} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm text-center font-mono tracking-widest outline-none focus:border-blue-500" />
//               </div>
//               <button disabled={loading} type="submit" className="w-full py-3 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 mt-4 shadow-md" style={{ background: COLORS.green }}>
//                 {loading ? "Verifying..." : "Verify Code"}
//               </button>
//             </form>
//           )}

//           {/* STEP 3 FORM: Password */}
//           {step === 3 && (
//             <form onSubmit={handleSetPassword} className="space-y-4">
//               <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Step 3: Set Account Password</h3>
//               <div>
//                 <label className="block text-xs font-semibold text-slate-600 mb-1">Secure Password</label>
//                 <input required type="password" name="password" placeholder="Create strong password" value={formData.password} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
//               </div>
//               <button disabled={loading} type="submit" className="w-full py-3 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 mt-4 shadow-md" style={{ background: COLORS.navy }}>
//                 {loading ? "Registering..." : "Complete Registration"}
//               </button>
//             </form>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, UserCheck, ArrowRight, Mail, Phone, Briefcase } from 'lucide-react';

const COLORS = {
  saffron: "#FF9933",
  navy: "#0B3D6B",
  green: "#0F7A3D",
  paper: "#F7F5EF",
};

export default function OfficerSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Details, Step 2: OTP Verification, Step 3: Password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    employeeID: "",
    firstName: "",
    lastName: "",
    designation: "",
    phoneNumber: "",
    signupId: "",
    email: "",
    verificationCode: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // STEP 1: Submit Initial Details & Request OTP (Updated to /api/users/signup_session)
  const handleInitialSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:8000/api/users/auth/signup_session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeID: formData.employeeID,
          firstName: formData.firstName,
          lastName: formData.lastName,
          designation: formData.designation,
          phoneNumber: formData.phoneNumber
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormData(prev => ({
          ...prev,
          signupId: result.data.user.signupId,
          email: result.data.user.email
        }));
        setStep(2); // Move to OTP verification step
      } else {
        setError(result.message || "Signup failed. Please check Employee ID.");
      }
    } catch (err) {
      setError("Server connection error. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify Email OTP Code (Updated to /api/users/verify_email)
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:8000/api/users/auth/verify_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            signupId: formData.signupId,
            email: formData.email
          },
          verificationCode: formData.verificationCode
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStep(3); // Move to Set Password step
      } else {
        setError(result.message || "Invalid or expired verification code.");
      }
    } catch (err) {
      setError("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Set Password & Complete Registration (Updated to /api/users/set_password)
  const handleSetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:8000/api/users/auth/set_password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            signupId: formData.signupId,
            email: formData.email
          },
          password: formData.password
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Registration completed successfully! Please login.");
        navigate('/login'); // Redirect to login page
      } else {
        setError(result.message || "Could not set password.");
      }
    } catch (err) {
      setError("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: COLORS.paper }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 text-white text-center" style={{ background: COLORS.navy }}>
          <Shield className="mx-auto h-10 w-10 text-amber-400 mb-2" />
          <h2 className="text-xl font-bold font-serif">Bhoomi Lens · Officer Portal</h2>
          <p className="text-xs text-slate-300 mt-1">Secure Land Record Digitization Access</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 m-4 text-xs text-red-700">
            {error}
          </div>
        )}

        <div className="p-6">
          {/* STEP 1 FORM */}
          {step === 1 && (
            <form onSubmit={handleInitialSignup} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Step 1: Officer Verification</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Employee ID (Whitelisted)</label>
                <input required type="text" name="employeeID" placeholder="e.g. EMP-2026-001" value={formData.employeeID} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">First Name</label>
                  <input required type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Last Name</label>
                  <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Designation</label>
                <input required type="text" name="designation" placeholder="e.g. Tehsildar / Revenue Officer" value={formData.designation} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                <input required type="text" name="phoneNumber" placeholder="10-digit mobile number" value={formData.phoneNumber} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
              </div>
              <button disabled={loading} type="submit" className="w-full py-3 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 mt-4 shadow-md" style={{ background: COLORS.navy }}>
                {loading ? "Verifying ID..." : <>Proceed to Email Verification <ArrowRight size={16} /></>}
              </button>
            </form>
          )}

          {/* STEP 2 FORM: OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyEmail} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Step 2: Enter Verification Code</h3>
              <p className="text-xs text-slate-500 mb-4">A secure verification code has been sent to your official government email linked with Employee ID.</p>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Verification Code (OTP)</label>
                <input required type="text" name="verificationCode" placeholder="Enter code received on email" value={formData.verificationCode} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm text-center font-mono tracking-widest outline-none focus:border-blue-500" />
              </div>
              <button disabled={loading} type="submit" className="w-full py-3 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 mt-4 shadow-md" style={{ background: COLORS.green }}>
                {loading ? "Verifying..." : "Verify Code"}
              </button>
            </form>
          )}

          {/* STEP 3 FORM: Password */}
          {step === 3 && (
            <form onSubmit={handleSetPassword} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Step 3: Set Account Password</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Secure Password</label>
                <input required type="password" name="password" placeholder="Create strong password" value={formData.password} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-blue-500" />
              </div>
              <button disabled={loading} type="submit" className="w-full py-3 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 mt-4 shadow-md" style={{ background: COLORS.navy }}>
                {loading ? "Registering..." : "Complete Registration"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}