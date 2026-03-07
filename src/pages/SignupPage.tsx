import { useState, useEffect, useRef } from 'react';
import { TrendingUp, User, Briefcase, Lock, ChevronDown, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer';
<<<<<<< HEAD
import API from "../services/api";
=======
>>>>>>> 72f8142569886c698ad711df7ac4c6c518b8ec75

interface SignupPageProps {
  onNavigate: (page: string) => void;
  onLogin: (
    role: 'investor' | 'entrepreneur' | 'admin',
    userData: { name: string; email: string }
  ) => void;
}

export default function SignupPage({ onNavigate, onLogin }: SignupPageProps) {
  const [selectedRole, setSelectedRole] = useState<'investor' | 'entrepreneur' | 'admin' | ''>('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const roles = [
    { value: 'entrepreneur', label: 'Entrepreneur (Startup Founder)', icon: Briefcase },
    { value: 'investor', label: 'Investor (Fund Startups)', icon: User },
    { value: 'admin', label: 'Admin', icon: Lock },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
<<<<<<< HEAD
  e.preventDefault();

  setError(null);
  setSuccess(null);

  if (!selectedRole) {
    setError("Please select a role.");
    return;
  }

  if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
    setError("Please fill all fields.");
    return;
  }

  setSubmitting(true);

  try {
    const response = await API.post("/auth/signup", {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: selectedRole,
    });

    const data = response.data;

    setSuccess("Account created successfully!");

    // If backend returns token
    if (data?.access_token) {
      localStorage.setItem("token", data.access_token);
    }

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    onLogin(selectedRole as "investor" | "entrepreneur" | "admin", {
      name: fullName || formData.email,
      email: formData.email,
    });

  } catch (err: any) {
    setError(err.response?.data?.detail || "Signup failed. Please try again.");
  } finally {
    setSubmitting(false);
  }
};
=======
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedRole) {
      setError('Please select a role.');
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill all fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: selectedRole,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || 'Signup failed');
      }
      const data = await res.json();
      setSuccess('Account created successfully. You can now sign in.');
      
      // Call onLogin with the selected role after successful signup
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      onLogin(selectedRole as 'investor' | 'entrepreneur' | 'admin', {
        name: fullName || formData.email,
        email: formData.email,
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };
>>>>>>> 72f8142569886c698ad711df7ac4c6c518b8ec75

  return (
    <div className="min-h-screen bg-[#0A0E1A] relative overflow-hidden">
      {/* Animated background gradients with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        <div 
          className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        <div 
          className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        ></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <Header onNavigate={onNavigate} />

      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-sm text-gray-300 font-medium">
                Join the Future
              </span>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 hover:rotate-3 transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
                Join UpFund
              </span>
            </h1>
            <p className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 text-gray-300">Create your account and start your journey</p>
          </div>

          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-400 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
            <h2 className="text-xl font-bold text-white mb-6">Create Account</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  I am a
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-left flex items-center justify-between hover:border-cyan-500/50 hover:bg-white/10 transition-all"
                  >
                    <span className={selectedRole ? 'text-white' : 'text-gray-400'}>
                      {selectedRole
                        ? roles.find((r) => r.value === selectedRole)?.label
                        : 'Select your role'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>

                  {showRoleDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg overflow-hidden">
                      {roles.map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => {
                            setSelectedRole(role.value as 'investor' | 'entrepreneur' | 'admin');
                            setShowRoleDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3 border-b border-white/10 last:border-0"
                        >
                          <role.icon className="w-5 h-5 text-cyan-400" />
                          <span className="text-white">{role.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="John"
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Create a password"
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all text-white placeholder-gray-400"
                />
              </div>

              {error && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{error}</div>
              )}
              {success && (
                <div className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">{success}</div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/25 disabled:opacity-60"
              >
                {submitting ? 'Creating Account...' : 'Create Account'}
              </button>

              <p className="text-center text-sm text-gray-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <ChatBot />

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
