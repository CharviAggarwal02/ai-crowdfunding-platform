import { TrendingUp, Search, MessageSquare, Briefcase, Settings, LogOut, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer';

interface InvestorDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userProfile: {
    name: string;
    email: string;
  };
}

export default function InvestorDashboard({
  onNavigate,
  onLogout,
  userProfile,
}: InvestorDashboardProps) {
  const portfolioData = [
    { month: 'Jan', value: 120 },
    { month: 'Feb', value: 140 },
    { month: 'Mar', value: 130 },
    { month: 'Apr', value: 165 },
    { month: 'May', value: 155 },
    { month: 'Jun', value: 180 },
  ];

  const recentActivity = [
    {
      date: '2024-07-16',
      investment: 'Seed Round',
      company: 'Tech Innovations Inc.',
      amount: '$20,000',
      status: 'Completed',
    },
    {
      date: '2024-06-20',
      investment: 'Series A',
      company: 'Health Solutions Ltd.',
      amount: '$5,000',
      status: 'Completed',
    },
    {
      date: '2024-05-10',
      investment: 'Angel Investment',
      company: 'Financial Systems Corp.',
      amount: '$9,000',
      status: 'Pending',
    },
    {
      date: '2024-04-05',
      investment: 'Seed Round',
      company: 'Consumer Goods LLC',
      amount: '$6,000',
      status: 'Completed',
    },
    {
      date: '2024-03-15',
      investment: 'Series B',
      company: 'Tech Innovations P.C.',
      amount: '$10,000',
      status: 'Completed',
    },
  ];

  const maxValue = Math.max(...portfolioData.map((d) => d.value));

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

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
      <div className="flex relative z-10">
        <aside className="w-64 bg-white/5 backdrop-blur-xl min-h-screen p-6 border-r border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-full overflow-hidden flex items-center justify-center">
              <span className="text-white font-semibold">{getInitials(userProfile.name)}</span>
            </div>
            <span className="text-white font-semibold">{userProfile.name}</span>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium shadow-lg shadow-blue-500/25">
              <TrendingUp className="w-5 h-5" />
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-cyan-300 rounded-lg font-medium transition-all"
            >
              <Home className="w-5 h-5" />
              Home
            </button>
            <button
              onClick={() => onNavigate('startups')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-cyan-300 rounded-lg font-medium transition-all"
            >
              <Search className="w-5 h-5" />
              Explore
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-cyan-300 rounded-lg font-medium transition-all">
              <Briefcase className="w-5 h-5" />
              Portfolio
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-cyan-300 rounded-lg font-medium transition-all">
              <MessageSquare className="w-5 h-5" />
              Messages
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-cyan-300 rounded-lg font-medium transition-all">
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </nav>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-red-400 rounded-lg font-medium transition-all mt-auto absolute bottom-6"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Investment Dashboard</h1>
            <p className="text-slate-400">
              Track your investments, explore new opportunities, and manage your portfolio
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <div className="text-gray-400 text-sm mb-2">Total Investment</div>
              <div className="text-3xl font-bold text-white mb-1">$50,000</div>
              <div className="text-green-400 text-sm">+10%</div>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <div className="text-gray-400 text-sm mb-2">Portfolio Value</div>
              <div className="text-3xl font-bold text-white mb-1">$65,000</div>
              <div className="text-green-400 text-sm">+30%</div>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <div className="text-gray-400 text-sm mb-2">Overall Return</div>
              <div className="text-3xl font-bold text-white mb-1">+30%</div>
              <div className="text-green-400 text-sm">+5%</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-400 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Portfolio Performance</h2>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-white">+15%</span>
                    <span className="text-green-400 text-sm">+5%</span>
                  </div>
                </div>
                <div className="text-gray-400 text-sm">Last 6 Months</div>
              </div>

              <div className="h-48 flex items-end justify-between gap-2">
                {portfolioData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-white/10 rounded-t-lg relative">
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t-lg transition-all"
                        style={{ height: `${(data.value / maxValue) * 160}px` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-500 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Investment Distribution</h2>
                <div className="text-gray-400 text-sm">Current</div>
              </div>

              <div className="text-3xl font-bold text-white mb-6">$65,000</div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">Tech</span>
                    <span className="text-gray-300 text-sm">Healthcare</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">Finance</span>
                    <span className="text-gray-300 text-sm">Consumer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-600 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Investment</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Company</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((activity, index) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-4 px-4 text-gray-300">{activity.date}</td>
                      <td className="py-4 px-4 text-gray-300">{activity.investment}</td>
                      <td className="py-4 px-4 text-gray-300">{activity.company}</td>
                      <td className="py-4 px-4 text-gray-300">{activity.amount}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            activity.status === 'Completed'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}
                        >
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
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
