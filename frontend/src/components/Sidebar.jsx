// import {
//   LayoutDashboard,
//   Upload,
//   Search,
//   ClipboardCheck,
//   Map,
//   FileClock,
//   Settings,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";

// import { useState } from "react";

// export default function Sidebar() {
//   const [open, setOpen] = useState(false);

//   const menu = [
//     {
//       label: "Dashboard",
//       icon: LayoutDashboard,
//       active: true,
//     },
//     {
//       label: "Upload Records",
//       icon: Upload,
//     },
//     {
//       label: "Search Records",
//       icon: Search,
//     },
//     {
//       label: "Verification Queue",
//       icon: ClipboardCheck,
//       badge: 18,
//     },
//     {
//       label: "GIS Land Map",
//       icon: Map,
//     },
//     {
//       label: "Audit Trail",
//       icon: FileClock,
//     },
//   ];

//   return (
//     <>
//       {/* Mobile button */}
//       <button
//         onClick={() => setOpen(true)}
//         className="fixed left-4 top-5 z-40 rounded-xl bg-slate-900 p-2 text-white lg:hidden"
//       >
//         <Menu size={21} />
//       </button>

//       {/* Mobile overlay */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 z-30 bg-black/30 lg:hidden"
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
//           open
//             ? "translate-x-0"
//             : "-translate-x-full lg:translate-x-0"
//         }`}
//       >

//         {/* Logo */}
//         <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">

//           <div className="flex items-center gap-3">

//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 font-black text-white">
//               L
//             </div>

//             <div>
//               <h1 className="font-bold">
//                 LandSetu
//               </h1>

//               <p className="text-[11px] text-slate-400">
//                 Digital Land Records
//               </p>
//             </div>

//           </div>

//           <button
//             onClick={() => setOpen(false)}
//             className="lg:hidden"
//           >
//             <X size={20} />
//           </button>

//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 space-y-1 px-3 py-5">

//           <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
//             Workspace
//           </p>

//           {menu.map((item) => {
//             const Icon = item.icon;

//             return (
//               <button
//                 key={item.label}
//                 className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
//                   item.active
//                     ? "bg-emerald-50 text-emerald-700"
//                     : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                 }`}
//               >

//                 <Icon size={19} />

//                 <span>{item.label}</span>

//                 {item.badge && (
//                   <span className="ml-auto rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-600">
//                     {item.badge}
//                   </span>
//                 )}

//               </button>
//             );
//           })}

//         </nav>

//         {/* Bottom */}
//         <div className="border-t border-slate-100 p-3">

//           <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50">
//             <Settings size={19} />
//             Settings
//           </button>

//           <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 hover:bg-red-50">
//             <LogOut size={19} />
//             Logout
//           </button>

//         </div>

//       </aside>
//     </>
//   );
// }

import { Link, useLocation } from "react-router-dom"; // <-- Added routing hooks
import {
  LayoutDashboard,
  Upload,
  Search,
  ClipboardCheck,
  Map,
  FileClock,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // <-- Get current URL path

  // Added 'path' property to each menu item based on our App.jsx routes
  const menu = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/", 
    },
    {
      label: "Upload Records",
      icon: Upload,
      path: "/upload",
    },
    {
      label: "Search Records",
      icon: Search,
      path: "/search", // Adjust based on your routing
    },
    {
      label: "Verification Queue",
      icon: ClipboardCheck,
      badge: 18,
      path: "/verify",
    },
    {
      label: "GIS Land Map",
      icon: Map,
      path: "/map",
    },
    {
      label: "Audit Trail",
      icon: FileClock,
      path: "/audit",
    },
  ];

  return (
    <>
      {/* Mobile button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-5 z-40 rounded-xl bg-slate-900 p-2 text-white lg:hidden"
      >
        <Menu size={21} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 font-black text-white">
              L
            </div>
            <div>
              <h1 className="font-bold">LandSetu</h1>
              <p className="text-[11px] text-slate-400">Digital Land Records</p>
            </div>
          </div>

          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-5">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path; // <-- Check if link is active

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setOpen(false)} // Close sidebar on mobile after clicking
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-600">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-slate-100 p-3">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <Settings size={19} />
            Settings
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 hover:bg-red-50">
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}