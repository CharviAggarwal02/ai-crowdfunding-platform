import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { Line, Doughnut, Bar } from "../components/Charts"
import API from "../services/api"

interface PerformanceAnalyticsPageProps {
  onNavigate: (page: string) => void
}

export default function PerformanceAnalyticsPage({
  onNavigate
}: PerformanceAnalyticsPageProps) {

  const [summary, setSummary] = useState<any>(null)
  const [trend, setTrend] = useState<any[]>([])
  const [sectors, setSectors] = useState<any[]>([])
  const [recent, setRecent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // ⭐ FETCH ANALYTICS
  useEffect(() => {
    const loadAnalytics = async () => {
      try {

        const [summaryRes, trendRes, sectorRes, recentRes] =
          await Promise.all([
            API.get("/analytics/summary"),
            API.get("/analytics/funding-trend"),
            API.get("/analytics/sectors"),
            API.get("/analytics/recent")
          ])

        setSummary(summaryRes.data)
        setTrend(trendRes.data || [])
        setSectors(sectorRes.data || [])
        setRecent(recentRes.data || [])

      } catch (err) {
        console.log("Analytics error", err)
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  // ⭐ LOADER UI
  if (loading || !summary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0E1A] text-white">
        Loading Analytics...
      </div>
    )
  }

  // ⭐ FUNDING TREND CHART
  const fundingData = {
    labels: trend.map(t => t.month),
    datasets: [
      {
        label: "Funding",
        data: trend.map(t => t.pledged),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.25)",
        fill: true,
        tension: 0.4
      }
    ]
  }

  // ⭐ SECTOR CHART
  const sectorData = {
    labels: sectors.map(s => s.category),
    datasets: [
      {
        data: sectors.map(s => s.totalRaised),
        backgroundColor: [
          "#3b82f6",
          "#6366f1",
          "#14b8a6",
          "#eab308"
        ],
        borderWidth: 0
      }
    ]
  }

  // ⭐ TRAFFIC DEMO BAR (UI DEMO)
  const trafficData = {
    labels: ["Direct", "Social", "Referral", "Email", "Ads"],
    datasets: [
      {
        label: "Visitors",
        data: [4200, 3500, 2300, 1800, 900],
        backgroundColor: "rgba(99,102,241,0.8)"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">

      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#0A0E1A]/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">

          <button
            onClick={() => onNavigate("entrepreneur-dashboard")}
            className="flex gap-2 items-center text-gray-300 hover:text-cyan-400"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-gray-400">
            Last 30 Days
          </div>

          <button className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded">
            Export
          </button>

        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">

        {/* KPI CARDS */}
        <section className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="text-gray-400 text-sm">Total Funding</div>
            <div className="text-2xl font-bold mt-1">
              ${summary.totalFunding?.toLocaleString()}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="text-gray-400 text-sm">Projects</div>
            <div className="text-2xl font-bold mt-1">
              {summary.totalProjects}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="text-gray-400 text-sm">Success Rate</div>
            <div className="text-2xl font-bold mt-1">
              {summary.successRate}%
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="text-gray-400 text-sm">Avg Pledge</div>
            <div className="text-2xl font-bold mt-1">
              ${summary.avgPledge?.toLocaleString()}
            </div>
          </div>

        </section>

        {/* FUNDING TREND */}
        <section className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="mb-3 text-gray-300">Funding Trend</div>
          <div className="h-72">
            <Line data={fundingData} options={{ responsive: true }} />
          </div>
        </section>

        {/* SECTOR DISTRIBUTION */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="mb-3 text-gray-300">Top Sectors</div>
          <Doughnut data={sectorData} />
        </section>

        {/* RECENT CAMPAIGNS */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="mb-3 text-gray-300">Recent Campaigns</div>

          <div className="space-y-3">
            {recent.map((r, i) => (
              <div key={i} className="flex justify-between text-sm border-b border-white/10 pb-2">
                <div>
                  <div className="text-white">{r.company}</div>
                  <div className="text-gray-500 text-xs">{r.category}</div>
                </div>
                <div className="text-right">
                  <div>{r.amount}</div>
                  <div className="text-gray-500 text-xs">{r.status}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRAFFIC SOURCES */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="mb-3 text-gray-300">Traffic Sources</div>
          <Bar data={trafficData} options={{ responsive: true }} />
        </section>

      </main>
    </div>
  )
}