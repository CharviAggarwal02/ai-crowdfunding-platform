import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Line, Doughnut, Bar } from '../components/Charts';

interface PerformanceAnalyticsPageProps {
  onNavigate: (page: string) => void;
}

const kpis = {
  totalFunds: 82450,
  totalInvestors: 1204,
  conversionRate: 12.5,
  averagePledge: 68.48,
};

const velocityData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
  datasets: [
    {
      label: 'Pledges',
      data: [220, 180, 260, 320, 290],
      borderColor: 'rgb(59,130,246)',
      backgroundColor: 'rgba(59,130,246,0.25)',
      fill: true,
      tension: 0.35,
    },
  ],
};

const chartAxes = {
  x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: 'rgba(255,255,255,0.7)' } },
  y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: 'rgba(255,255,255,0.7)' } },
};

const demographicsData = {
  labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
  datasets: [
    {
      data: [12, 38, 28, 16, 6],
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

const trafficSourcesData = {
  labels: ['Direct', 'Social', 'Referral', 'Email', 'Paid'],
  datasets: [
    {
      label: 'Visitors',
      data: [4200, 3600, 2300, 1800, 1200],
      backgroundColor: 'rgba(99,102,241,0.85)'
    },
  ],
};

const recentPledges = [
  { name: 'Alex Johnson', amount: 150, time: '2m ago' },
  { name: 'Lara Chen', amount: 80, time: '12m ago' },
  { name: 'Priya Patel', amount: 200, time: '25m ago' },
  { name: 'John Smith', amount: 50, time: '1h ago' },
];

export default function PerformanceAnalyticsPage({ onNavigate }: PerformanceAnalyticsPageProps) {
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
          <button onClick={() => onNavigate('entrepreneur-dashboard')} className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <div className="text-sm opacity-80">Last 30 Days</div>
          <button className="px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-sm text-white shadow-lg shadow-blue-500/25 transition-all">Export Report</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <section className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
            <div className="text-sm text-gray-400">Total Funds Raised</div>
            <div className="text-2xl font-semibold mt-1 text-white">${kpis.totalFunds.toLocaleString()}</div>
          </div>
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
            <div className="text-sm text-gray-400">Total Investors</div>
            <div className="text-2xl font-semibold mt-1 text-white">{kpis.totalInvestors.toLocaleString()}</div>
          </div>
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
            <div className="text-sm text-gray-400">Conversion Rate</div>
            <div className="text-2xl font-semibold mt-1 text-white">{kpis.conversionRate}%</div>
          </div>
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-400 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
            <div className="text-sm text-gray-400">Average Pledge</div>
            <div className="text-2xl font-semibold mt-1 text-white">${kpis.averagePledge.toFixed(2)}</div>
          </div>
        </section>

        <section className="lg:col-span-2 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-500 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 h-[320px] hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
          <div className="text-sm text-gray-400 mb-2">Funding Velocity</div>
          <Line data={velocityData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: chartAxes }} />
        </section>
        <section className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-600 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 h-[320px] hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
          <div className="text-sm text-gray-400 mb-2">Investor Demographics</div>
          <Doughnut data={demographicsData} />
        </section>

        <section className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-700 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
          <div className="text-sm text-gray-400 mb-2">Recent Pledges</div>
          <ul className="divide-y divide-white/10">
            {recentPledges.map((p) => (
              <li key={p.name} className="py-3 flex items-center justify-between text-sm">
                <span className="text-gray-300">{p.name}</span>
                <span className="text-gray-400">${p.amount}</span>
                <span className="text-gray-500">{p.time}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-800 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
          <div className="text-sm text-gray-400 mb-2">Traffic Sources</div>
          <Bar data={trafficSourcesData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: chartAxes }} />
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
