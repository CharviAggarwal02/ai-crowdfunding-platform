import { Rocket, DollarSign, Users, Target, Shield, TrendingUp, BarChart3, Zap, ArrowRight, Sparkles, Globe, Lock, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import Header from '../components/Header';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
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

      <Header onNavigate={onNavigate} />

      <main className="relative">
       {/* Hero Section */}
<section className="relative overflow-hidden min-h-screen flex items-center justify-center
bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_60%)]">
  
  {/* Spline - Centered positioning behind content with blending */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
    <div className="relative w-full max-w-7xl h-[600px] md:h-[750px] lg:h-[900px]">
      {/* Multi-directional gradient overlay to blend all edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_35%,rgba(10,14,26,0.2)_60%,rgba(10,14,26,0.6)_75%,rgba(10,14,26,0.9)_90%,#0A0E1A_100%)] z-10 pointer-events-none"></div>
      
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0E1A] via-[rgba(10,14,26,0.8)] to-transparent z-10 pointer-events-none"></div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0E1A] via-[rgba(10,14,26,0.8)] to-transparent z-10 pointer-events-none"></div>
      
      {/* Left gradient fade */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#0A0E1A] via-[rgba(10,14,26,0.6)] to-transparent z-10 pointer-events-none"></div>
      
      {/* Right gradient fade */}
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#0A0E1A] via-[rgba(10,14,26,0.6)] to-transparent z-10 pointer-events-none"></div>
      
      {/* Spline container with fade mask */}
      <div className="absolute inset-0 opacity-90" style={{
        maskImage: 'radial-gradient(ellipse at center, black 25%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.3) 75%, transparent 95%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.3) 75%, transparent 95%)'
      }}>
        <Spline scene="https://prod.spline.design/b66OutlXPl0PS6O9/scene.splinecode" />
      </div>
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 md:pt-32 md:pb-40 w-full relative z-10">

    <div className="text-center relative z-10">
      {/* Badge */}
      <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-full mb-8">
        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span className="text-sm text-gray-300 font-medium">
          AI + Web3 Crowdfunding Platform
        </span>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      {/* Heading */}
      <h1 className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
        <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
          Fund the Future
        </span>
      </h1>

      {/* Subtext */}
      <p className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
        Next-generation crowdfunding marketplace
      </p>

      <p className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
        Where innovative startups meet smart investors. Powered by AI insights and blockchain technology.
      </p>

      {/* Buttons */}
      <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('signup')}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:scale-105 transition"
        >
          Launch Your Startup
        </button>

        <button
          onClick={() => onNavigate('startups')}
          className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition"
        >
          Browse Startups
        </button>
      </div>
    </div>
  </div>

  {/* Bottom fade - extra layer for smooth transition */}
  <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0A0E1A] to-transparent pointer-events-none z-5"></div>
</section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative">
          <div className="text-center mb-16">
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-full mb-6 hover:border-purple-500/40 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300 font-medium">Platform Features</span>
            </div>
            <h2 className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-100 to-pink-300 bg-clip-text text-transparent">
                Built for a smarter economy
              </span>
            </h2>
            <p className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light">
              High-utility features that make crowdfunding accessible, transparent, and intelligent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Shield,
                title: 'Secure Platform',
                description: 'Bank-level security protecting your investments and data with transparent verification.',
                gradient: 'from-blue-500/20 to-cyan-500/20',
                iconColor: 'text-blue-400',
                borderColor: 'border-blue-500/20',
                hoverBorder: 'hover:border-blue-500/50',
                hoverShadow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
                delay: 'delay-100'
              },
              {
                icon: TrendingUp,
                title: 'AI Insights',
                description: 'Smart analytics to identify high-potential opportunities with ML-powered predictions.',
                gradient: 'from-green-500/20 to-emerald-500/20',
                iconColor: 'text-green-400',
                borderColor: 'border-green-500/20',
                hoverBorder: 'hover:border-green-500/50',
                hoverShadow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]',
                delay: 'delay-200'
              },
              {
                icon: BarChart3,
                title: 'Real-time Analytics',
                description: 'Track performance and market trends instantly with live data visualization.',
                gradient: 'from-orange-500/20 to-amber-500/20',
                iconColor: 'text-orange-400',
                borderColor: 'border-orange-500/20',
                hoverBorder: 'hover:border-orange-500/50',
                hoverShadow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]',
                delay: 'delay-300'
              },
              {
                icon: Zap,
                title: 'Quick Funding',
                description: 'Fast-track your funding with streamlined processes and automated workflows.',
                gradient: 'from-purple-500/20 to-pink-500/20',
                iconColor: 'text-purple-400',
                borderColor: 'border-purple-500/20',
                hoverBorder: 'hover:border-purple-500/50',
                hoverShadow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]',
                delay: 'delay-[400ms]'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ${feature.delay} group relative bg-white/5 backdrop-blur-xl border ${feature.borderColor} ${feature.hoverBorder} rounded-2xl p-8 hover:bg-white/10 hover:scale-105 ${feature.hoverShadow} cursor-pointer`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative">
          <div className="text-center mb-16">
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-full mb-6 hover:border-cyan-500/40 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300 font-medium">Simple Process</span>
            </div>
            <h2 className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-300 bg-clip-text text-transparent">
                How UpFund Works
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create Your Campaign',
                description: 'Set up your startup profile, funding goals, and campaign details in minutes.',
                icon: Rocket,
                delay: 'delay-100'
              },
              {
                step: '02',
                title: 'Get AI Insights',
                description: 'Our AI analyzes market trends and provides optimization recommendations.',
                icon: Sparkles,
                delay: 'delay-200'
              },
              {
                step: '03',
                title: 'Receive Funding',
                description: 'Connect with investors and receive funds securely through blockchain.',
                icon: DollarSign,
                delay: 'delay-300'
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                {/* Connection line - animated */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-0.5 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-cyan-500/50 to-transparent animate-on-scroll opacity-0 transition-opacity duration-1000 delay-500"></div>
                  </div>
                )}
                
                <div className={`animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ${item.delay} group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 transition-all duration-300 cursor-pointer`}>
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <item.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="text-6xl font-bold text-white/5 mb-4 group-hover:text-white/10 transition-colors duration-300">{item.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative">
          <div className="animate-on-scroll opacity-0 scale-95 transition-all duration-700 relative bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 overflow-hidden hover:border-cyan-500/30 hover:shadow-[0_0_50px_rgba(6,182,212,0.2)] transition-all duration-500 group cursor-pointer">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-6 group-hover:border-green-500/30 group-hover:scale-105 transition-all duration-300">
                <Lock className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300 font-medium">Trusted & Secure</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                  Why Choose UpFund?
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {[
                  { icon: Shield, label: 'SEC Compliant', delay: 'delay-100' },
                  { icon: Lock, label: 'Blockchain Secured', delay: 'delay-200' },
                  { icon: Check, label: 'Verified Startups', delay: 'delay-300' }
                ].map((item, index) => (
                  <div key={index} className={`animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 ${item.delay} flex flex-col items-center gap-3 hover:scale-110 transition-transform duration-300`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="text-white font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative">
          <div className="animate-on-scroll opacity-0 scale-95 transition-all duration-700 relative bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-12 md:p-16 overflow-hidden text-center hover:border-cyan-500/50 hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] transition-all duration-500 group cursor-pointer">
            {/* Background decoration */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  Ready to Get Started?
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-light">
                Join thousands of entrepreneurs and investors building the future together.
              </p>
              <button
                onClick={() => onNavigate('signup')}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_50px_rgba(59,130,246,0.8)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatBot />

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        /* Scroll animation classes */
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom delays */
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
        .delay-400 { transition-delay: 400ms; }
        .delay-500 { transition-delay: 500ms; }
        .delay-600 { transition-delay: 600ms; }
        .delay-700 { transition-delay: 700ms; }
        .delay-\[800ms\] { transition-delay: 800ms; }
        .delay-\[400ms\] { transition-delay: 400ms; }
      `}</style>
    </div>
  );
}