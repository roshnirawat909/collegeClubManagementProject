import React, { useState, useEffect } from "react";
import { authAPI } from './services/api.js';
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ClubsSection from "./components/ClubsSection.jsx";
import FeedbackForm from "./components/FeedbackForm.jsx";
import AttendanceSection from "./components/AttendanceSection.jsx";
import ApplicationForm from "./components/ApplicationForm.jsx";
import CertificatesSection from "./components/certificatesSection.jsx";
import SacCouncilSection from "./components/SacCouncilSection.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import UpdatesSection from "./components/UpdatesSection.jsx";
import Profile from "./components/Profile.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      setShowRegister(false);
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const register = (userData, token) => {
    setToken(token);
    setUser(userData);
    setShowRegister(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await authAPI.profile();
          setUser(response.data);
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
         
          console.error('Failed to load user profile', err);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  // logout defined above

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "clubs", label: "Clubs", icon: "🎯" },
    { key: "feedback", label: "Feedback", icon: "💬" },
    { key: "attendance", label: "Attendance", icon: "✅" },
    { key: "application", label: "Apply", icon: "📝" },
    { key: "certificates", label: "Certificates", icon: "🏆" },
    { key: "sac", label: "SAC Council", icon: "👥" },
    { key: "updates", label: "Updates", icon: "📢" },
    { key: "profile", label: "Profile", icon: "👤" },
  ];

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!user) {
    return showRegister ? (
      <RegisterForm onRegister={register} onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <LoginForm onLogin={login} onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ClubHub
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === item.key
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              {user.role === "admin" && (
                <button
                  onClick={() => setActiveSection("admin")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === "admin"
                      ? "bg-purple-500 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100 hover:text-purple-600"
                  }`}
                >
                  <span className="mr-1">⚙️</span>
                  Admin
                </button>
              )}
            </nav>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {user.name}
                </span>
                <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded-full">
                  {user.role}
                </span>
              </div>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
              >
                <span className="mr-1">🚪</span>
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              {/* User Info */}
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-slate-800">{user.name}</p>
                  <p className="text-sm text-slate-500 capitalize">{user.role}</p>
                </div>
              </div>
              
              {/* Nav Items */}
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveSection(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.key
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              {user.role === "admin" && (
                <button
                  onClick={() => {
                    setActiveSection("admin");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeSection === "admin"
                      ? "bg-purple-50 text-purple-600 font-medium"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="mr-2">⚙️</span>
                  Admin
                </button>
              )}
              
              {/* Logout Button */}
              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center"
              >
                <span className="mr-2">🚪</span>
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
{activeSection === "dashboard" && <Dashboard user={user} setActiveSection={setActiveSection} />}
          {activeSection === "clubs" && <ClubsSection user={user} />}
          {activeSection === "feedback" && <FeedbackForm user={user} />}
          {activeSection === "attendance" && <AttendanceSection user={user} />}
          {activeSection === "application" && <ApplicationForm user={user} />}
          {activeSection === "certificates" && <CertificatesSection user={user} />}
          {activeSection === "sac" && <SacCouncilSection />}
          {activeSection === "admin" && user.role === "admin" && <AdminPanel user={user} />}
{activeSection === "updates" && <UpdatesSection user={user} />}
{activeSection === "profile" && <Profile user={user} setUser={setUser} setActiveSection={setActiveSection} />}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2024 College Club Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

