import { ArrowLeft, Calendar, DollarSign, Users, TrendingUp, MapPin, Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer';

interface StartupDetailsPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  userRole: 'investor' | 'entrepreneur' | 'admin' | null;
}

export default function StartupDetailsPage({ onNavigate, isLoggedIn, userRole }: StartupDetailsPageProps) {
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

  const startup = {
    name: 'TechForward Solutions',
    logo: '/WhatsApp Image 2025-10-05 at 01.10.48_70462bcf.jpg',
    tagline: 'Revolutionizing workplace productivity with AI-driven tools designed for the modern enterprise',
    founded: 'Founded 2023',
    employees: '8 employees',
    fundingGoal: 100000,
    currentFunding: 60000,
    fundingProgress: 60,
    minInvestment: 1000,
    backers: 42,
  };

  const team = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      image: null,
    },
    {
      name: 'Jane Doe',
      role: 'CTO',
      image: null,
    },
  ];

  const updates = [
    {
      id: 1,
      title: 'Secured Key Partnership!',
      description: 'We just signed a deal with a major enterprise client to pilot our platform!',
      date: '2 days ago',
    },
    {
      id: 2,
      title: 'Q2 Roadmap Update',
      description: 'Completed our mobile app development and launched our customer feedback program.',
      date: '1 week ago',
    },
  ];

  const userGrowthData = [
    { month: 'Jan', value: 10 },
    { month: 'Feb', value: 25 },
    { month: 'Mar', value: 45 },
    { month: 'Apr', value: 70 },
    { month: 'May', value: 85 },
    { month: 'Jun', value: 100 },
  ];

  const revenueData = [
    { quarter: 'Q1', value: 30 },
    { quarter: 'Q2', value: 50 },
    { quarter: 'Q3', value: 80 },
    { quarter: 'Q4 proj', value: 100 },
  ];

  const maxUserGrowth = Math.max(...userGrowthData.map((d) => d.value));
  const maxRevenue = Math.max(...revenueData.map((d) => d.value));

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
        <button
          onClick={() => onNavigate('startups')}
          className="flex items-center gap-2 text-gray-300 hover:text-cyan-300 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Startups</span>
        </button>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <div className="flex items-start gap-6 mb-8">
                <img
                  src={startup.logo}
                  alt={startup.name}
                  className="w-24 h-24 rounded-xl object-cover border border-gray-200"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-3">{startup.name}</h1>
                  <p className="text-gray-300 mb-4">{startup.tagline}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{startup.founded}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{startup.employees}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h2 className="text-xl font-bold text-white mb-4">About the Project</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  TechForward Solutions is on the vanguard of workplace innovation, leveraging advanced AI to streamline
                  productivity. Our flagship tools, 'SmartTask' and 'CollabSpace', revolutionize task management and team
                  collaboration, enabling organizations to save time, reduce operational costs, and amplify outcomes. With
                  cutting-edge voice technology, machine learning protocols, and seamless cloud integration, we're reshaping
                  how businesses operate globally.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our intelligent platform integrates task management, automated scheduling, and real-time collaboration
                  seamlessly. Trusted by over 500 organizations, our tools provide clear visibility into workflows, data-driven
                  insights to enhance productivity, and robust cloud infrastructure for scalability. Whether a startup or an
                  enterprise, we help teams collaborate effectively, track performance, and achieve their strategic goals with
                  precision.
                </p>
              </div>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <h2 className="text-xl font-bold text-white mb-6">Key Metrics</h2>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-4">User Growth</h3>
                  <div className="text-2xl font-bold text-white mb-1">50k</div>
                  <div className="h-48 flex items-end justify-between gap-2">
                    {userGrowthData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-white/10 rounded-t-lg relative">
                          <div
                            className="w-full bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t-lg transition-all"
                            style={{ height: `${(data.value / maxUserGrowth) * 160}px` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-4">Revenue Projection</h3>
                  <div className="text-2xl font-bold text-white mb-1">$160k</div>
                  <div className="h-48 flex items-end justify-between gap-3">
                    {revenueData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-white/10 rounded-t-lg relative">
                          <div
                            className={`w-full ${
                              index === 3 ? 'bg-gradient-to-t from-purple-400 to-purple-300' : 'bg-gradient-to-t from-purple-600 to-purple-400'
                            } rounded-t-lg transition-all`}
                            style={{ height: `${(data.value / maxRevenue) * 160}px` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{data.quarter}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <h2 className="text-xl font-bold text-white mb-6">Recent Updates</h2>
              <div className="space-y-6">
                {updates.map((update) => (
                  <div key={update.id} className="flex gap-4 pb-6 border-b border-white/10 last:border-0 last:pb-0">
                    <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">{update.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">{update.description}</p>
                      <span className="text-xs text-gray-400">{update.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sticky top-6 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Funding Progress</div>
                <div className="text-3xl font-bold text-white mb-1">
                  ${startup.currentFunding.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400 mb-4">
                  of ${startup.fundingGoal.toLocaleString()}
                </div>

                <div className="w-full bg-white/10 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 h-3 rounded-full transition-all"
                    style={{ width: `${startup.fundingProgress}%` }}
                  />
                </div>
                <div className="text-sm text-gray-300">{startup.fundingProgress}% funded</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-sm text-gray-400">Minimum Investment</span>
                  <span className="font-semibold text-white">${startup.minInvestment}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-sm text-gray-400">Backers</span>
                  <span className="font-semibold text-white">{startup.backers}</span>
                </div>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 mb-3">
                Invest Now
              </button>
              <button className="w-full py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all">
                Follow
              </button>
            </div>

            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-400 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <h3 className="text-lg font-bold text-white mb-6">Team</h3>
              <div className="space-y-4">
                {team.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{member.name}</div>
                      <div className="text-sm text-gray-400">{member.role}</div>
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
