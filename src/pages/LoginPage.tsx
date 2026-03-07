import { useState, useEffect } from 'react';
import { TrendingUp, Mail, Lock, User, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer';
import API from "../services/api";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (role: 'investor' | 'entrepreneur' | 'admin', userData: { name: string, email: string }) => void;
}

export default function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'investor' as 'investor' | 'entrepreneur' | 'admin',
  });
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

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const response = await API.post("/auth/login", {
      email: formData.email,
      password: formData.password
    });

    const data = response.data;

    // store token
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
    }

    onLogin(formData.role, {
      name: formData.name || formData.email,
      email: formData.email
    });

  } catch (error: any) {
    alert(error.response?.data?.detail || "Login failed");
  }
};

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
                Welcome Back
              </span>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 hover:rotate-3 transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>
            <p className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 text-gray-300">Sign in to your UpFund account</p>
          </div>

          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-400 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
            <h2 className="text-xl font-bold text-white mb-6">Sign In</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role
                </label>
                <div className="relative">
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as 'investor' | 'entrepreneur' | 'admin',
                      })
                    }
                    className="w-full pl-4 pr-10 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all appearance-none text-white"
                  >
                    <option value="investor" className="bg-[#0A0E1A]">Investor</option>
                    <option value="entrepreneur" className="bg-[#0A0E1A]">Entrepreneur</option>
                    <option value="admin" className="bg-[#0A0E1A]">Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-cyan-500 border-white/20 rounded focus:ring-cyan-500 bg-white/5" />
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <button type="button" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/25"
              >
                Sign In
              </button>

              <p className="text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('signup')}
                  className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                >
                  Sign up here
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
