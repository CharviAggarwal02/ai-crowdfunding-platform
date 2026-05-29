import {
  Search,
  Filter,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from "lucide-react";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import ChatBot from "../components/ChatBot";
import Footer from "../components/Footer";

import { getStartups } from "../services/startupService";

interface StartupBrowsePageProps {
  onNavigate: (page: string, data?: any) => void;
  isLoggedIn: boolean;
  userRole: "investor" | "entrepreneur" | "admin" | null;
  userName?: string;
  onLogout?: () => void;
}

export default function StartupBrowsePage({
  onNavigate,
  isLoggedIn,
  userRole,
  userName,
  onLogout
}: StartupBrowsePageProps) {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [scrollY, setScrollY] = useState(0);

  /* Publish Form States */
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "Technology",
    fundingGoal: "",
    valuation: "",
    teamSize: "",
    foundedDate: "",
    equity: "",
    status: "live"
  });

  /* Background scroll animation */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Fetch startups from API */
  useEffect(() => {

    const loadStartups = async () => {

      try {

        const data = await getStartups();
        setStartups(data);

      } catch (err) {

        console.error("Startup fetch error:", err);

      } finally {

        setLoading(false);

      }

    };

    loadStartups();

  }, []);

  /* Filtering logic */

  const filteredStartups = startups.filter((startup) => {

    const matchesSearch =
      startup.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      selectedIndustry === "All Industries" ||
      startup.industry === selectedIndustry;

    const matchesStatus =
      selectedStatus === "All Status" ||
      startup.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesIndustry && matchesStatus;

  });

  /* Handle Form Input Changes */
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* Handle Form Submit */
  /* ---------- HANDLE FORM SUBMIT (FULL UPDATED CODE) ---------- */

const handlePublishSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    console.log("Publishing startup:", formData);

    const token = localStorage.getItem("token");

    // Payload exactly matching backend keys
    const payload = {
      name: formData.name,
      description: formData.description,
      industry: formData.industry,
      status: formData.status,
      fundingGoal: Number(formData.fundingGoal),
      valuation: Number(formData.valuation),
      teamSize: Number(formData.teamSize),
      equity: Number(formData.equity),
      foundedDate: formData.foundedDate
    };

    const response = await fetch(
      "http://127.0.0.1:8000/api/startups/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    console.log("Backend Response:", data);

    if (response.ok) {
      alert("Startup Published Successfully 🚀");

      // Save startup id on the logged-in entrepreneur for messaging
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser && data?.id != null) {
          const u = JSON.parse(storedUser);
          const updated = { ...u, startupId: data.id };
          localStorage.setItem("user", JSON.stringify(updated));
        }
      } catch (e) {
        console.log(e);
      }

      // close modal
      setShowPublishForm(false);

      // reset form
      setFormData({
        name: "",
        description: "",
        industry: "Technology",
        fundingGoal: "",
        valuation: "",
        teamSize: "",
        foundedDate: "",
        equity: "",
        status: "live"
      });

      // reload startup list
      setLoading(true);

      const updatedStartups = await getStartups();
      setStartups(updatedStartups);

      setLoading(false);

    } else {
      alert(data.detail || "Failed to publish startup");
    }

  } catch (error) {
    console.error("Publish Error:", error);
    alert("Backend connection failed");
  }
};

  return (

<div className="min-h-screen bg-[#0A0E1A] relative overflow-hidden">

{/* Background gradients */}

<div className="absolute inset-0 pointer-events-none">

<div
className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"
style={{ transform: `translateY(${scrollY * 0.5}px)` }}
></div>

<div
className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20"
style={{ transform: `translateY(${scrollY * 0.3}px)` }}
></div>

</div>

<Header
  onNavigate={onNavigate}
  isLoggedIn={isLoggedIn}
  userName={userName}
  onLogout={onLogout}
  userRole={userRole}
/>

<main className="max-w-7xl mx-auto px-6 py-12 relative z-10">

{/* Page Header */}

<div className="mb-12">

{isLoggedIn && userRole && (

<button
onClick={() => {

if (userRole === "investor") {
onNavigate("investor-dashboard");
}

if (userRole === "admin") {
onNavigate("admin-dashboard");
}

}}
className="flex items-center gap-2 text-gray-300 hover:text-cyan-300 mb-6"
>

<ArrowLeft className="w-5 h-5"/>
Back to Dashboard

</button>

)}

<div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">

<Sparkles className="w-4 h-4 text-cyan-400"/>

<span className="text-sm text-gray-300">
Discover Opportunities
</span>

</div>

<h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">

Discover Startups

</h1>

<p className="text-lg text-gray-300">

Explore innovative startups and find your next investment opportunity

</p>

</div>

{/* Filters */}

<div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">

<div className="grid grid-cols-3 gap-4">

{/* Search */}

<div className="relative">

<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>

<input
type="text"
placeholder="Search startups..."
value={searchQuery}
onChange={(e)=>setSearchQuery(e.target.value)}
className="w-full pl-12 pr-4 py-3 bg-[#0A0E1A] border border-white/10 rounded-lg text-white"
/>

</div>

{/* Industry Filter */}

<select
value={selectedIndustry}
onChange={(e)=>setSelectedIndustry(e.target.value)}
className="px-4 py-3 bg-[#0A0E1A] border border-white/10 rounded-lg text-white"
>

<option value="All Industries">All Industries</option>
<option value="Technology">Technology</option>
<option value="Apps">Apps</option>
<option value="Games">Games</option>
<option value="Design">Design</option>

</select>

{/* Status Filter */}

<select
value={selectedStatus}
onChange={(e)=>setSelectedStatus(e.target.value)}
className="px-4 py-3 bg-[#0A0E1A] border border-white/10 rounded-lg text-white"
>

<option value="All Status">All Status</option>
<option value="live">Live</option>
<option value="successful">Funded</option>
<option value="failed">Closed</option>

</select>

</div>

<div className="mt-4 flex gap-4 items-center">

  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg flex items-center gap-2">
    <Filter className="w-5 h-5"/>
    Apply Filters
  </button>

  <button 
    onClick={() => setShowPublishForm(true)}
    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg flex items-center gap-2"
  >
    <Filter className="w-5 h-5"/>
    Publish
  </button>

</div>

</div>

{/* Startup Count */}

<p className="text-gray-300 mb-6">

{loading
? "Loading startups..."
: `Found ${filteredStartups.length} startups`}

</p>

{/* Startup Cards */}

<div className="grid gap-6">

{filteredStartups.map((startup)=>(

<div
key={startup.id}
className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition"
>

<div className="flex items-center justify-between mb-4">

<h3 className="text-2xl font-bold text-white">

{startup.name}

</h3>

<span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">

{startup.status}

</span>

</div>

<p className="text-gray-300 mb-6">

{startup.description}

</p>

{/* Funding Progress */}

<div className="mb-4">

<div className="flex justify-between text-sm text-gray-400 mb-1">

<span>Funding Progress</span>
<span>{startup.fundingProgress}%</span>

</div>

<div className="w-full bg-white/10 h-3 rounded-full">

<div
className="bg-gradient-to-r from-blue-600 to-cyan-500 h-3 rounded-full"
style={{width:`${startup.fundingProgress}%`}}
></div>

</div>

</div>

<div className="flex justify-between text-sm text-gray-300 mb-6">

<span>{startup.currentFunding} raised</span>
<span>{startup.fundingGoal}</span>

</div>

{/* Info Grid */}

<div className="grid grid-cols-2 gap-6 mb-6">

<div className="flex items-center gap-3">

<DollarSign className="text-green-400"/>
<span className="text-white">{startup.valuation}</span>

</div>

<div className="flex items-center gap-3">

<Users className="text-orange-400"/>
<span className="text-white">{startup.teamSize}</span>

</div>

<div className="flex items-center gap-3">

<Calendar className="text-blue-400"/>
<span className="text-white">{startup.foundedDate}</span>

</div>

<div className="flex items-center gap-3">

<TrendingUp className="text-purple-400"/>
<span className="text-white">{startup.equity}</span>

</div>

</div>

<button
onClick={()=>onNavigate("startup-details", startup.id)}
className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
>

View Details
<ArrowRight className="w-5 h-5"/>

</button>

</div>

))}

</div>

{/* Publish Form Modal */}
{showPublishForm && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-[#0A0E1A] border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Publish Your Startup</h2>
        <button
          onClick={() => setShowPublishForm(false)}
          className="text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>
      </div>

      <form onSubmit={handlePublishSubmit} className="space-y-6">
        {/* Startup Name */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Startup Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Enter startup name"
            className="w-full px-4 py-2 bg-[#1A1E30] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="Describe your startup..."
            rows={4}
            className="w-full px-4 py-2 bg-[#1A1E30] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            required
          />
        </div>

        {/* Industry & Status Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Industry
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleFormChange}
              className="w-full px-4 py-2 bg-[#1A1E30] border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="Technology">Technology</option>
              <option value="Apps">Apps</option>
              <option value="Games">Games</option>
              <option value="Design">Design</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleFormChange}
              className="w-full px-4 py-2 bg-[#1A1E30] border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="live">Live</option>
              <option value="successful">Funded</option>
              <option value="failed">Closed</option>
            </select>
          </div>
        </div>

        {/* Funding Goal & Valuation Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Funding Goal
            </label>
            <input
              type="number"
              name="fundingGoal"
              value={formData.fundingGoal}
              onChange={handleFormChange}
              placeholder="e.g. 100000"
              className="w-full px-4 py-2 bg-[#1A1E30] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Valuation
            </label>
            <input
              type="number"
              name="valuation"
              value={formData.valuation}
              onChange={handleFormChange}
              placeholder="e.g. 500000"
              className="w-full px-4 py-2 bg-[#1A1E30] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>
        </div>

        {/* Team Size & Equity Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Team Size
            </label>
            <input
              type="number"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleFormChange}
              placeholder="e.g. 5"
              className="w-full px-4 py-2 bg-[#1A1E30] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Equity (%)
            </label>
            <input
              type="number"
              name="equity"
              value={formData.equity}
              onChange={handleFormChange}
              placeholder="e.g. 10"
              className="w-full px-4 py-2 bg-[#1A1E30] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>
        </div>

        {/* Founded Date */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Founded Date
          </label>
          <input
            type="datetime-local"
            name="foundedDate"
            value={formData.foundedDate}
            onChange={handleFormChange}
            className="w-full px-4 py-2 bg-[#1A1E30] border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            required
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => setShowPublishForm(false)}
            className="flex-1 px-6 py-3 border border-white/10 text-white font-semibold rounded-lg hover:border-white/30 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Publish Startup
          </button>
        </div>
      </form>
    </div>
  </div>
)}

</main>

<Footer/>
<ChatBot/>

</div>

);
}