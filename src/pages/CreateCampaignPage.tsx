import { ArrowLeft, Save, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';
import API from "../services/api"

interface CreateCampaignPageProps {
  onNavigate: (page: string) => void;
}

export default function CreateCampaignPage({ onNavigate }: CreateCampaignPageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [campaign, setCampaign] = useState({
    title: "",
    tagline: "",
    category: "Technology",
    description: "",
    goal_amount: ""
  })

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

    const createCampaign = async () => {

    try {

      const res = await API.post("/startups", {
        name: campaign.title,
        category: campaign.category,
        goal_amount: Number(campaign.goal_amount),
        description: campaign.description
      })

      alert("Campaign created successfully!")

      onNavigate("entrepreneur-dashboard")

    } catch (err:any) {

      alert(err.response?.data?.detail || "Failed to create campaign")

    }

  }

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
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => onNavigate('entrepreneur-dashboard')} className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-500/30 rounded-lg grid place-items-center">
              <Rocket className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="font-semibold text-white">Create Your Campaign</span>
          </div>
          <button className="px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 text-sm flex items-center gap-2 text-white transition-all">
            <Save className="w-4 h-4" /> Save Draft
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6 relative z-10">
        <aside className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 h-max hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-500">
          <div className="text-sm opacity-80 mb-2">Campaign Setup</div>
          <ol className="space-y-2 text-sm">
            <li className="opacity-100">• Project Basics</li>
            <li className="opacity-70">• Story</li>
            <li className="opacity-70">• Funding Goals</li>
            <li className="opacity-70">• Reward Tiers</li>
          </ol>
          <button className="mt-6 w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 text-white">Preview Campaign</button>
        </aside>

        <section className="lg:col-span-2 space-y-6">
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-500">
            <div className="text-sm text-gray-300 mb-4">Completion Progress</div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: '32%' }} />
            </div>
          </div>

          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-500">
            <div className="font-medium text-white">Project Basics</div>
                        <input
              value={campaign.title}
              onChange={(e)=>setCampaign({...campaign,title:e.target.value})}
              className="..."
              placeholder="Campaign Title"
            />
            <input
              value={campaign.tagline}
              onChange={(e) => setCampaign({...campaign, tagline: e.target.value})}
              className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all"
              placeholder="Short Blurb/Tagline"
            />
            <select
              value={campaign.category}
              onChange={(e) => setCampaign({...campaign, category: e.target.value})}
              className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all"
            >
              <option className="bg-[#0A0E1A]">Technology</option>
              <option className="bg-[#0A0E1A]">Design</option>
              <option className="bg-[#0A0E1A]">Games</option>
            </select>
            <div className="border border-dashed border-white/20 rounded-lg p-6 text-center text-gray-400 hover:border-cyan-500/30 transition-colors cursor-pointer">
              Click to upload or drag & drop
            </div>
          </div>

          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-3 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-500">
            <div className="font-medium text-white">The Story</div>
            <textarea className="w-full min-h-[160px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 outline-none transition-all" placeholder="Tell your story..." />
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 text-white">Save & Continue</button>
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
          animation-delay: