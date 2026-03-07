import { Search, Filter, DollarSign, Users, Calendar, TrendingUp, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer';

interface StartupBrowsePageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  userRole: 'investor' | 'entrepreneur' | 'admin' | null;
}

export default function StartupBrowsePage({ onNavigate, isLoggedIn, userRole }: StartupBrowsePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
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

  const startups = [
    {
      id: 1,
      name: 'Test Startup Inc',
      description: 'A revolutionary tech startup that will change the world',
      industry: 'Technology',
      status: 'Pending',
      fundingProgress: 68,
      fundingGoal: '$100,000',
      currentFunding: '$68,000',
      valuation: '$1.5M',
      teamSize: '5 people',
      foundedDate: '16.08.2025',
      equity: '10% equity',
    },
  ];

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

      <Header onNavigate={onNavigate} isLoggedIn={isLoggedIn} />

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="mb-12">
          {isLoggedIn && userRole && (
            <button
              onClick={() => {
                if (userRole === 'investor') {
                  onNavigate('investor-dashboard');
                } else if (userRole === 'admin') {
                  onNavigate('admin-dashboard');
                }
              }}
              className="flex items-center gap-2 text-gray-300 hover:text-cyan-300 mb-6 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
          )}
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-sm text-gray-300 font-medium">Discover Opportunities</span>
          </div>
          <h1 className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 text-4xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
              Discover Startups
            </span>
          </h1>
          <p className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 text-lg text-gray-300">
            Explore innovative startups and find your next investment opportunity
          </p>
        </div>

        <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-500">
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search startups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all text-white placeholder-gray-400"
              />
            </div>

            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all appearance-none text-white"
            >
              <option className="bg-[#0A0E1A]">All Industries</option>
              <option className="bg-[#0A0E1A]">Technology</option>
              <option className="bg-[#0A0E1A]">Healthcare</option>
              <option className="bg-[#0A0E1A]">Finance</option>
              <option className="bg-[#0A0E1A]">Education</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all appearance-none text-white"
            >
              <option className="bg-[#0A0E1A]">All Status</option>
              <option className="bg-[#0A0E1A]">Pending</option>
              <option className="bg-[#0A0E1A]">Funded</option>
              <option className="bg-[#0A0E1A]">Closed</option>
            </select>
          </div>

          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25">
            <Filter className="w-5 h-5" />
            Apply Filters
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-300">Found 1 startup</p>
        </div>

        <div className="grid gap-6">
          {startups.map((startup) => (
            <div
              key={startup.id}
              className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-400 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:scale-[1.02] transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-white">{startup.name}</h3>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-semibold rounded-full">
                      {startup.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{startup.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400">Industry</span>
                  </div>
                  <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm font-semibold rounded-full">
                    {startup.industry}
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Funding Progress</span>
                      <span className="text-sm font-semibold text-cyan-400">
                        {startup.fundingProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 h-3 rounded-full transition-all"
                        style={{ width: `${startup.fundingProgress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{startup.currentFunding} raised</span>
                      <span className="text-sm text-gray-300">{startup.fundingGoal}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Valuation</div>
                      <div className="font-semibold text-white">{startup.valuation}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Team Size</div>
                      <div className="font-semibold text-white">{startup.teamSize}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Founded</div>
                      <div className="font-semibold text-white">{startup.foundedDate}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-500/20 border border-violet-500/30 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Offer</div>
                      <div className="font-semibold text-white">{startup.equity}</div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('startup-details')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/25"
              >
                View Details
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
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
