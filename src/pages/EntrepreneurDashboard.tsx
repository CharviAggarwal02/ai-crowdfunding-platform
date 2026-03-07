import { BarChart3, PieChart, FileText, Rocket, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Line, Doughnut } from '../components/Charts';

interface EntrepreneurDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userProfile?: { name: string; email: string } | null;
}

const fundingData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
  datasets: [
    {
      label: 'Funding ($)',
      data: [12000, 18500, 24000, 33000, 42000],
      borderColor: 'rgb(59,130,246)',
      backgroundColor: 'rgba(59,130,246,0.25)',
      fill: true,
      tension: 0.35,
    },
  ],
};

const fundingOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: 'rgba(255,255,255,0.7)' } },
    y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: 'rgba(255,255,255,0.7)' } },
  },
};

const pledgeDistributionData = {
  labels: ['$10', '$25', '$50', '$100', '$250+'],
  datasets: [
    {
      label: 'Pledges',
      data: [180, 240, 160, 90, 22],
      backgroundColor: [
        'rgba(59,130,246,0.9)',
        'rgba(99,102,241,0.9)',
        'rgba(20,184,166,0.9)',
        'rgba(234,179,8,0.9)',
        'rgba(244,63,94,0.9)'
      ],
      borderWidth: 0,
    },
  ],
};

export default function EntrepreneurDashboard({ onNavigate, onLogout, userProfile }: EntrepreneurDashboardProps) {
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

      <header className="border-b border-white/10 relative z-10 backdrop-blur-xl bg-[#0A0E1A]/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-500/30 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-xl font-bold text-white">Founder Dashboard</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden md:block opacity-80">{userProfile?.name || 'Entrepreneur'}</span>
            <button onClick={onLogout} className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 transition">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
        <section className="lg:col-span-3 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Funding Progress</h2>
            <button onClick={() => onNavigate('create-campaign')} className="px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm shadow-lg shadow-blue-500/25 transition-all">Post an update</button>
          </div>
          <div className="h-64">
            <Line data={fundingData} options={fundingOptions} />
          </div>
        </section>

        <nav className="space-y-4">
          <button onClick={() => onNavigate('create-campaign')} className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
            <FileText className="w-5 h-5 text-cyan-400" />
            <div>
              <div className="font-medium text-white">Create Your Campaign</div>
              <div className="text-sm text-gray-400">Set up basics, story and goals</div>
            </div>
          </button>
          <button onClick={() => onNavigate('performance-analytics')} className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <div>
              <div className="font-medium text-white">Performance Analytics</div>
              <div className="text-sm text-gray-400">Track velocity and sources</div>
            </div>
          </button>
          <button onClick={() => onNavigate('project-updates')} className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
            <PieChart className="w-5 h-5 text-cyan-400" />
            <div>
              <div className="font-medium text-white">Project Updates & Q&A</div>
              <div className="text-sm text-gray-400">Share progress with backers</div>
            </div>
          </button>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300">
            <div className="font-medium mb-3">Pledge Distribution</div>
            <Doughnut data={pledgeDistributionData} />
          </div>
        </nav>
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
