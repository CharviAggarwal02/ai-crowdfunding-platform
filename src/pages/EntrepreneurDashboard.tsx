import {
  BarChart3,
  PieChart,
  FileText,
  TrendingUp,
  Users,
  Target,
  IndianRupee,
  Home,
  Settings,
  LogOut,
  MessageSquare,
  Briefcase
} from "lucide-react"
import { useEffect, useState } from "react"
import { Line, Doughnut } from "../components/Charts"
import ChatBot from "../components/ChatBot"
import Footer from "../components/Footer"
import EntrepreneurMessagingModal from "../components/EntrepreneurMessagingModal"
import API from "../services/api"
import { getStartups } from "../services/startupService.js"

interface Props {
  onNavigate: (page: string) => void
  onLogout: () => void
}

export default function EntrepreneurDashboard({
  onNavigate,
  onLogout
}: Props) {

  // ✅ SAFE USER LOAD
  const storedUser = localStorage.getItem("user")
  const user = storedUser ? JSON.parse(storedUser) : null

  const getInitials = (name?: string) => {
    if (!name) return "EN"
    return name.split(" ").map(w => w[0]).join("").toUpperCase()
  }

  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showMessaging, setShowMessaging] = useState(false)
  const [investors, setInvestors] = useState<any[]>([])
  const [resolvedStartupId, setResolvedStartupId] = useState<number>(0)
  const [showStartupPicker, setShowStartupPicker] = useState(false)
  const [allStartups, setAllStartups] = useState<any[]>([])
  const [startupSearch, setStartupSearch] = useState("")

  useEffect(() => {
    loadCampaigns()
    loadInvestors()
  }, [])

  const loadCampaigns = async () => {
    try {
      const res = await API.get("/campaigns/")
      setCampaigns(res.data || [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const loadInvestors = () => {
    try {
      const investorsData = JSON.parse(localStorage.getItem("investors") || "[]")
      setInvestors(investorsData)
    } catch (err) {
      console.log(err)
    }
  }

  // ✅ Find the JWT token from localStorage regardless of key name
  const getToken = (): string => {
    // Try common key names first
    const commonKeys = ["token", "accessToken", "access_token", "authToken", "jwt"]
    for (const key of commonKeys) {
      const val = localStorage.getItem(key)
      if (val && val.startsWith("eyJ")) return val
    }
    // Scan all keys for anything that looks like a JWT
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!
      const val = localStorage.getItem(key) || ""
      if (val.startsWith("eyJ")) return val
      // Sometimes token is nested inside a JSON object
      try {
        const parsed = JSON.parse(val)
        if (parsed?.token?.startsWith?.("eyJ")) return parsed.token
        if (parsed?.accessToken?.startsWith?.("eyJ")) return parsed.accessToken
        if (parsed?.access_token?.startsWith?.("eyJ")) return parsed.access_token
      } catch {
        // not JSON, skip
      }
    }
    return ""
  }

  // ✅ Open messages — fetch startups owned by this entrepreneur from API
  const openMessages = async () => {
    // Check if we already saved a startup selection
    try {
      const saved = localStorage.getItem("entrepreneurSelectedStartupId")
      const savedId = saved ? Number(saved) : 0
      if (Number.isFinite(savedId) && savedId > 0) {
        console.log("[DASHBOARD] Using saved startupId:", savedId)
        setResolvedStartupId(savedId)
        setShowMessaging(true)
        return
      }
    } catch {
      // ignore
    }

    // Fetch from /api/startups/my
    try {
      const token = getToken()
      console.log("[DASHBOARD] Token found:", token ? "yes" : "no")

      const res = await fetch("http://127.0.0.1:8000/api/startups/my", {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.ok) {
        const data = await res.json()
        const myStartups = Array.isArray(data) ? data : [data]
        console.log("[DASHBOARD] My startups from API:", myStartups)

        if (myStartups.length === 1) {
          // Only one startup — use it directly, no picker needed
          const id = Number(myStartups[0].id)
          console.log("[DASHBOARD] Auto-selected startup id:", id)
          setResolvedStartupId(id)
          localStorage.setItem("entrepreneurSelectedStartupId", String(id))
          setShowMessaging(true)
          return
        }

        if (myStartups.length > 1) {
          // Multiple startups — let entrepreneur pick
          setAllStartups(myStartups)
          setShowStartupPicker(true)
          return
        }
      } else {
        console.warn("[DASHBOARD] /api/startups/my returned:", res.status)
      }
    } catch (err) {
      console.error("[DASHBOARD] Failed to fetch my startups:", err)
    }

    // Final fallback — show all startups so entrepreneur can manually pick
    try {
      const startups = await getStartups()
      setAllStartups(Array.isArray(startups) ? startups : [])
    } catch (err) {
      setAllStartups([])
    }
    setShowStartupPicker(true)
  }

  /* KPI CALCULATIONS */
  const totalRaised = campaigns.reduce((a, c) => a + (c.pledged || 0), 0)
  const totalGoal = campaigns.reduce((a, c) => a + (c.goal || 0), 0)
  const totalCampaigns = campaigns.length
  const avgFunding = totalCampaigns ? Math.round(totalRaised / totalCampaigns) : 0

  /* FUNDING TREND */
  const recentCampaigns = campaigns.slice(-6)

  const fundingData = {
    labels: recentCampaigns.map(c => c.name),
    datasets: [
      {
        label: "Funding",
        data: recentCampaigns.map(c => c.pledged || 0),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.25)",
        fill: true,
        tension: 0.4
      }
    ]
  }

  /* CATEGORY PIE */
  const categoryMap: any = {}
  campaigns.forEach(c => {
    if (!categoryMap[c.category]) categoryMap[c.category] = 0
    categoryMap[c.category] += c.pledged || 0
  })

  const pieData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          "#3b82f6",
          "#6366f1",
          "#14b8a6",
          "#eab308",
          "#f43f5e",
          "#10b981"
        ],
        borderWidth: 0
      }
    ]
  }

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex flex-col">

      <div className="flex flex-1">

        {/* Sidebar */}
        <aside className="w-64 bg-[#0f172a] border-r border-white/10 p-6 hidden md:block">

          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {getInitials(user?.firstName)}
              </span>
            </div>
            <span className="text-white font-semibold">
              {user?.firstName || "Entrepreneur"}
            </span>
          </div>

          <nav className="space-y-3">

            <button className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg w-full">
              <TrendingUp className="w-5 h-5" /> Dashboard
            </button>

            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg w-full"
            >
              <Home className="w-5 h-5" /> Home
            </button>

            <button
              onClick={() => onNavigate("create-campaign")}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg w-full"
            >
              <FileText className="w-5 h-5" /> Create Campaign
            </button>

            <button
              onClick={() => onNavigate("project-updates")}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg w-full"
            >
              <MessageSquare className="w-5 h-5" /> Updates
            </button>

            <button
              onClick={() => onNavigate("performance-analytics")}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg w-full"
            >
              <Briefcase className="w-5 h-5" /> Analytics
            </button>

            <button
              onClick={openMessages}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg w-full transition"
            >
              <MessageSquare className="w-5 h-5" /> Messages
            </button>

            <button className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg w-full">
              <Settings className="w-5 h-5" /> Settings
            </button>

          </nav>

          <button
            onClick={() => onLogout && onLogout()}
            className="mt-10 flex items-center gap-3 text-gray-400 hover:text-red-400"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>

        </aside>

        {/* Main */}
        <main className="flex-1 p-6 md:p-10">

          <div className="max-w-7xl mx-auto space-y-8">

            {/* KPI CARDS */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card title="Total Raised" value={`₹ ${totalRaised}`} icon={<IndianRupee />} />
              <Card title="Funding Goal" value={`₹ ${totalGoal}`} icon={<Target />} />
              <Card title="Campaigns" value={totalCampaigns} icon={<TrendingUp />} />
              <Card title="Avg Funding" value={`₹ ${avgFunding}`} icon={<Users />} />
            </div>

            {/* CHART + PIE */}
            <div className="grid lg:grid-cols-3 gap-6">

              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between mb-4">
                  <h2 className="text-white font-semibold text-lg">Funding Trend</h2>
                  <button
                    onClick={() => onNavigate("create-campaign")}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-white"
                  >
                    New Campaign
                  </button>
                </div>
                <div className="h-72">
                  {!loading && campaigns.length > 0 && <Line data={fundingData} />}
                  {!loading && campaigns.length === 0 && <p className="text-gray-400">No campaigns yet</p>}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-4">Category Funding</h2>
                <div className="h-72">
                  {!loading && campaigns.length > 0 && <Doughnut data={pieData} />}
                </div>
              </div>

            </div>

            {/* CAMPAIGN LIST */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4">Your Campaigns</h2>
              {campaigns.map(c => {
                const progress = Math.min(Math.round((c.pledged / c.goal) * 100), 100)
                return (
                  <div key={c.id} className="mb-5">
                    <div className="flex justify-between text-white">
                      <span>{c.name}</span>
                      <span>₹ {c.pledged} / ₹ {c.goal}</span>
                    </div>
                    <div className="w-full bg-white/10 h-3 rounded-full mt-2">
                      <div
                        className="h-3 bg-gradient-to-r from-blue-500 to-green-400 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid md:grid-cols-3 gap-6">
              <ActionCard title="Create Campaign" icon={<FileText />} onClick={() => onNavigate("create-campaign")} />
              <ActionCard title="Performance Analytics" icon={<BarChart3 />} onClick={() => onNavigate("performance-analytics")} />
              <ActionCard title="Post Updates" icon={<PieChart />} onClick={() => onNavigate("project-updates")} />
            </div>

          </div>

        </main>

      </div>

      <ChatBot />
      <Footer />

      {/* ✅ STARTUP PICKER — shown when entrepreneur has multiple startups or /my fails */}
      {showStartupPicker && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-cyan-500/20 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Select your published startup</h2>
              <button
                onClick={() => setShowStartupPicker(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-red-400"
              >
                <LogOut className="w-5 h-5 rotate-180" />
              </button>
            </div>

            <input
              value={startupSearch}
              onChange={(e) => setStartupSearch(e.target.value)}
              placeholder="Search startup name (e.g. delliote)"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition mb-4"
            />

            <div className="max-h-[50vh] overflow-y-auto space-y-2">
              {allStartups
                .filter((s) =>
                  typeof s?.name === "string"
                    ? s.name.toLowerCase().includes(startupSearch.toLowerCase())
                    : false
                )
                .map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      const id = Number(s.id)
                      if (Number.isFinite(id) && id > 0) {
                        setResolvedStartupId(id)
                        localStorage.setItem("entrepreneurSelectedStartupId", String(id))
                        setShowStartupPicker(false)
                        setShowMessaging(true)
                      }
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
                  >
                    <div className="text-white font-semibold">{s.name}</div>
                    <div className="text-xs text-gray-400">Startup ID: {s.id}</div>
                  </button>
                ))}

              {allStartups.length === 0 && (
                <div className="text-gray-400 text-sm">No startups found.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ✅ MESSAGING MODAL */}
      {showMessaging && (
        <EntrepreneurMessagingModal
          investors={investors}
          userName={user?.firstName || "Entrepreneur"}
          onClose={() => setShowMessaging(false)}
          startupId={resolvedStartupId}
        />
      )}

    </div>
  )
}

/* REUSABLE COMPONENTS */

function Card({ title, value, icon }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h2 className="text-white text-2xl font-bold mt-1">{value}</h2>
        </div>
        <div className="text-cyan-400">{icon}</div>
      </div>
    </div>
  )
}

function ActionCard({ title, icon, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition"
    >
      <div className="text-cyan-400 mb-2">{icon}</div>
      <div className="text-white font-semibold">{title}</div>
    </button>
  )
}