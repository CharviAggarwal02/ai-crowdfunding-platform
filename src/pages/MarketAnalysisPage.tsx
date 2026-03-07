import { TrendingUp, Bell, Settings, User, Download, Laptop, Gamepad2, Palette, Film, Leaf, Send, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Line } from '../components/Charts';

interface MarketAnalysisPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
}

const overviewTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Total Capital ($B)',
      data: [12.5, 13.8, 16.2, 18.1, 20.4, 25.8],
      borderColor: 'rgb(59,130,246)',
      backgroundColor: 'rgba(59,130,246,0.25)',
      fill: true,
      tension: 0.35,
    }
  ]
};

const axisDark = {
  x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: 'rgba(255,255,255,0.7)' } },
  y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: 'rgba(255,255,255,0.7)' } },
};

export default function MarketAnalysisPage({ onNavigate, isLoggedIn }: MarketAnalysisPageProps) {
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

      {/* Custom Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-500/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xl font-bold text-white">Crowdfund Analytics</span>
            </div>

            <nav className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="text-sm font-medium">Home</span>
              </button>
              {!isLoggedIn && (
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Log In
                </button>
              )}
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Market Overview Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
                  Market Overview
                </span>
              </h1>
              <p className="text-gray-300">Crowdfunding market analysis and insights</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/10 hover:border-cyan-500/30 transition-all">
                Last 12 Months
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25">
                <Download className="w-4 h-4" />
                Download Report
              </button>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            {/* Overall Funding Trends */}
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <h3 className="text-lg font-semibold text-white mb-1">Overall Funding Trends</h3>
              <p className="text-sm text-gray-400 mb-4">Total capital raised over time</p>

              {/* Filter Buttons */}
              <div className="flex gap-2 mb-6">
                <button className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-medium rounded-lg shadow-lg shadow-blue-500/25">
                  All
                </button>
                <button className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs font-medium rounded-lg hover:bg-white/10 hover:border-cyan-500/30 transition-all">
                  Technology
                </button>
                <button className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs font-medium rounded-lg hover:bg-white/10 hover:border-cyan-500/30 transition-all">
                  Gaming
                </button>
                <button className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs font-medium rounded-lg hover:bg-white/10 hover:border-cyan-500/30 transition-all">
                  Design
                </button>
              </div>

              {/* Chart Area */}
              <div className="h-48">
                <Line data={overviewTrendData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: axisDark }} />
              </div>
            </div>

            {/* Market KPIs */}
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <h3 className="text-lg font-semibold text-white mb-6">Market KPIs</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">$25.8B</div>
                  <div className="text-sm text-green-500">+15.2% YoY</div>
                  <div className="text-xs text-gray-400 mt-1">Total Funding</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">5.2M</div>
                  <div className="text-sm text-green-500">+8.1% YoY</div>
                  <div className="text-xs text-gray-400 mt-1">Total Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">42.5%</div>
                  <div className="text-sm text-red-500">-13% YoY</div>
                  <div className="text-xs text-gray-400 mt-1">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">$98.50</div>
                  <div className="text-sm text-green-500">+4.5% YoY</div>
                  <div className="text-xs text-gray-400 mt-1">Average Pledge</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sector-Specific Analytics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Sector-Specific Analytics</h2>
          
          <div className="grid grid-cols-4 gap-6">
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Laptop className="w-5 h-5 text-white" />
                </div>
                <div className="text-white font-semibold">Technology</div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">$8.2B</div>
              <div className="text-sm text-gray-400 mb-3">Total Raised</div>
              <div className="text-lg font-semibold text-green-500">65.1%</div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-400 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-white font-semibold">Gaming</div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">$5.5B</div>
              <div className="text-sm text-gray-400 mb-3">Total Raised</div>
              <div className="text-lg font-semibold text-green-400">38.7%</div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-500 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-pink-500/20 border border-pink-500/30 rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-pink-400" />
                </div>
                <div className="text-white font-semibold">Design</div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">$4.1B</div>
              <div className="text-sm text-gray-400 mb-3">Total Raised</div>
              <div className="text-lg font-semibold text-green-400">52.3%</div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-600 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <div className="text-white font-semibold">Film & Video</div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">$2.9B</div>
              <div className="text-sm text-gray-400 mb-3">Total Raised</div>
              <div className="text-lg font-semibold text-green-500">45.8%</div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </div>
          </div>
        </section>

        {/* Top Performing Projects */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Top Performing Projects</h2>
          
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-700 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">PROJECT</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">CATEGORY</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">TOTAL RAISED</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">BACKERS</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">FUNDING %</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Ecoflask */}
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                          <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">Ecoflask</div>
                          <div className="text-xs text-gray-400">GreenWare</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white">Design</td>
                    <td className="py-4 px-6 text-white font-semibold">$23M</td>
                    <td className="py-4 px-6 text-white">25,430</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-xs bg-white/10 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <div className="text-sm font-semibold text-green-400">1050%</div>
                        <button className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-medium rounded hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Aura Drone */}
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                          <Send className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">Aura Drone</div>
                          <div className="text-xs text-gray-400">AeroDynamics</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white">Technology</td>
                    <td className="py-4 px-6 text-white font-semibold">$1.8M</td>
                    <td className="py-4 px-6 text-white">15,820</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-xs bg-white/10 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                        <div className="text-sm font-semibold text-green-400">900%</div>
                        <button className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-medium rounded hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Pixel Quest Saga */}
                  <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                          <Gamepad2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">Pixel Quest Saga</div>
                          <div className="text-xs text-gray-400">IndieForge</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white">Gaming</td>
                    <td className="py-4 px-6 text-white font-semibold">$1.5M</td>
                    <td className="py-4 px-6 text-white">52,100</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-xs bg-white/10 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <div className="text-sm font-semibold text-green-400">750%</div>
                        <button className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-medium rounded hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

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

