import { ArrowLeft, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProjectUpdatesPageProps {
  onNavigate: (page: string) => void;
}

export default function ProjectUpdatesPage({ onNavigate }: ProjectUpdatesPageProps) {
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
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="font-semibold">Project Updates</div>
          <button className="px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-sm flex items-center gap-2 text-white shadow-lg shadow-blue-500/25 transition-all">
            <Plus className="w-4 h-4" /> Post New Update
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <section className="lg:col-span-2 space-y-4">
          {[1, 2].map((i) => (
            <article key={i} className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
              <h3 className="font-semibold mb-2 text-white">Update Title {i}</h3>
              <p className="text-gray-300 text-sm">Short summary of your update. Share progress, milestones, or manufacturing status.</p>
              <div className="mt-3 text-xs text-gray-500">12k views • 182 comments</div>
            </article>
          ))}

          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
            <div className="font-semibold mb-4 text-white">Q&A from Backers</div>
            {[1, 2].map((q) => (
              <div key={q} className="border-t border-white/10 py-3 first:border-t-0">
                <div className="text-sm text-gray-300">Sample question {q}?</div>
                <button className="mt-2 text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/15 border border-white/10 text-white transition-all">Answer</button>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
            <div className="font-medium mb-2 text-white">Quick Stats</div>
            <div className="text-sm text-gray-300">Unread Messages: 3</div>
            <div className="text-sm text-gray-300">New Questions: 5</div>
            <div className="text-sm text-gray-300">Total Backers: 1,482</div>
          </div>

          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-400 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
            <div className="font-medium mb-2 text-white">Response Templates</div>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>Shipping Address Confirmation</li>
              <li>Thank You Note</li>
              <li>Feature Request Response</li>
            </ul>
          </div>
        </aside>
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
