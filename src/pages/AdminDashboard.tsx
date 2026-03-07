import { useState, useEffect } from 'react';
import { Settings, User, Calendar, Clock, Search, Eye, BarChart3 } from 'lucide-react';
import { Line } from '../components/Charts';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

// Sample data for entrepreneurs
const entrepreneurs = [
  {
    name: 'Olivia Chen',
    company: 'The innovator\'s Backpack',
    registrationDate: '2023-10-25',
    avatar: 'OC'
  },
  {
    name: 'Benjamin Carter',
    company: 'Eco-Friendly Drone',
    registrationDate: '2023-10-24',
    avatar: 'BC'
  },
  {
    name: 'Sophia Rodriguez',
    company: 'Smart Garden System',
    registrationDate: '2023-10-23',
    avatar: 'SR'
  },
  {
    name: 'Ethan Martinez',
    company: 'AI Health Monitor',
    registrationDate: '2023-10-22',
    avatar: 'EM'
  },
  {
    name: 'Ava Thompson',
    company: 'Solar Power Bank',
    registrationDate: '2023-10-21',
    avatar: 'AT'
  },
];

// Sample data for investors
const investors = [
  {
    name: 'Liam Goldberg',
    joined: 'Joined 2 days ago',
    registrationDate: '2023-10-24',
    avatar: 'LG'
  },
  {
    name: 'Ava Nguyen',
    joined: 'Joined 3 days ago',
    registrationDate: '2023-10-23',
    avatar: 'AN'
  },
  {
    name: 'Mason Williams',
    joined: 'Joined 5 days ago',
    registrationDate: '2023-10-21',
    avatar: 'MW'
  },
  {
    name: 'Isabella Brown',
    joined: 'Joined 1 week ago',
    registrationDate: '2023-10-18',
    avatar: 'IB'
  },
  {
    name: 'Noah Davis',
    joined: 'Joined 1 week ago',
    registrationDate: '2023-10-17',
    avatar: 'ND'
  },
];

// Chart data for user growth
const getChartData = (timeframe: string) => {
  if (timeframe === 'Weekly') {
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      entrepreneurs: [12, 15, 18, 22, 25, 28, 32],
      investors: [8, 10, 12, 15, 18, 20, 23],
    };
  } else if (timeframe === 'Yearly') {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      entrepreneurs: [45, 52, 60, 68, 75, 82, 90, 98, 105, 112, 120, 128],
      investors: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
    };
  } else {
    // Monthly (default)
    return {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      entrepreneurs: [25, 35, 45, 55],
      investors: [18, 25, 32, 40],
    };
  }
};

const axisDark = {
  x: { 
    grid: { color: 'rgba(255,255,255,0.06)' }, 
    ticks: { color: 'rgba(255,255,255,0.7)' } 
  },
  y: { 
    grid: { color: 'rgba(255,255,255,0.06)' }, 
    ticks: { color: 'rgba(255,255,255,0.7)' } 
  },
};

export default function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const [timeframe, setTimeframe] = useState<'Weekly' | 'Monthly' | 'Yearly'>('Monthly');
  const [scrollY, setScrollY] = useState(0);
  const chartData = getChartData(timeframe);

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

  const growthChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Entrepreneurs',
        data: chartData.entrepreneurs,
        borderColor: 'rgb(59, 130, 246)', // blue
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Investors',
        data: chartData.investors,
        borderColor: 'rgb(34, 197, 94)', // green
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255,255,255,0.7)',
          padding: 15,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgba(255,255,255,0.9)',
        bodyColor: 'rgba(255,255,255,0.7)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
      },
    },
    scales: axisDark,
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

      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-500/30 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xl font-bold text-white">Crowdfund Analytics</span>
            </div>

            <nav className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('home')}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Dashboard
              </button>
              <button
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Campaigns
              </button>
              <button
                className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
              >
                Analytics
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="User Profile"
              >
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* User Growth Analytics Section */}
        <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-8 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">User Growth Analytics</h2>
              <p className="text-gray-400">Track registration trends for entrepreneurs and investors.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeframe('Weekly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeframe === 'Weekly'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeframe('Monthly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeframe === 'Monthly'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeframe('Yearly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeframe === 'Yearly'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="h-80">
            <Line data={growthChartData} options={chartOptions} />
          </div>
        </div>

        {/* User Monitoring Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">User Monitoring</h2>
          <p className="text-gray-400 mb-6">Track and analyze user activity on the platform.</p>

          {/* Filter Controls */}
          <div className="flex gap-4 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Registration Date</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Last Active Date</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">Search Users</span>
            </button>
          </div>

          {/* Two Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Entrepreneurs Panel */}
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <h3 className="text-xl font-bold text-white mb-1">Entrepreneurs</h3>
              <p className="text-sm text-gray-400 mb-6">Recently registered entrepreneurs</p>

              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 pb-2 border-b border-gray-700 text-xs font-semibold text-gray-400 uppercase">
                  <div className="col-span-5">Name</div>
                  <div className="col-span-4">Registration Date</div>
                  <div className="col-span-3 text-right">Actions</div>
                </div>

                {entrepreneurs.map((entrepreneur, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 items-center py-3 border-b border-white/10 last:border-0"
                  >
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {entrepreneur.avatar}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{entrepreneur.name}</div>
                        <div className="text-gray-400 text-xs">{entrepreneur.company}</div>
                      </div>
                    </div>
                    <div className="col-span-4 text-gray-300 text-sm">
                      {entrepreneur.registrationDate}
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investors Panel */}
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <h3 className="text-xl font-bold text-white mb-1">Investors</h3>
              <p className="text-sm text-gray-400 mb-6">Recently registered investors</p>

              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 pb-2 border-b border-white/10 text-xs font-semibold text-gray-400 uppercase">
                  <div className="col-span-5">Name</div>
                  <div className="col-span-4">Registration Date</div>
                  <div className="col-span-3 text-right">Actions</div>
                </div>

                {investors.map((investor, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 items-center py-3 border-b border-white/10 last:border-0"
                  >
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {investor.avatar}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{investor.name}</div>
                        <div className="text-gray-400 text-xs">{investor.joined}</div>
                      </div>
                    </div>
                    <div className="col-span-4 text-gray-300 text-sm">
                      {investor.registrationDate}
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <button className="p-2 text-gray-400 hover:text-green-400 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
