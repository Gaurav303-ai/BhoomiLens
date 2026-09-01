import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OfficerDashboard from './pages/officer/OfficerDashboard';
import CitizenHome from './pages/CitizenHome';
import Upload from './pages/Upload';
import OfficerLogin from './pages/auth/OfficerLogin';
import OfficerSignup from './pages/auth/OfficerSignup';
import HomePage from './pages/Home/HomePage';
function App() {
  return (
    <Router>
      <div className="font-sans text-slate-900 antialiased">
        <Routes>
           {/* Document Upload Route */}
           <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<Upload />} />
          {/* Default URL ab Citizen Home hoga */}
          <Route path="/citizenHome" element={<CitizenHome />} />
          <Route path="/login" element={<OfficerLogin />} />
          <Route path="/signup" element={<OfficerSignup />} />
          {/* Main Dashboard Route */}
          <Route path="/OfficerDashboard" element={<OfficerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;