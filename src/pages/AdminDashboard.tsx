import { useEffect, useState } from "react"
import { Users, TrendingUp, Eye } from "lucide-react"
import { Line } from "../components/Charts"
import API from "../services/api"
import ChatBot from "../components/ChatBot"
import Footer from "../components/Footer"

export default function AdminDashboard({ onLogout }: any) {

  const [entrepreneurs, setEntrepreneurs] = useState<any[]>([])
  const [investors, setInvestors] = useState<any[]>([])
  const [growth, setGrowth] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const usersRes = await API.get("/admin/users")
      setEntrepreneurs(usersRes.data.entrepreneurs)
      setInvestors(usersRes.data.investors)

      const growthRes = await API.get("/admin/growth")
      setGrowth(growthRes.data)

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // ⭐ Chart Data
  const chartData = {
    labels: growth.map((g) => g.label),
    datasets: [
      {
        label: "Entrepreneurs",
        data: growth.map((g) => g.entrepreneurs),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Investors",
        data: growth.map((g) => g.investors),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  }

  const totalUsers = entrepreneurs.length + investors.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1f] via-[#0d1326] to-black">

      {/* HEADER */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="text-white text-2xl font-bold flex gap-2 items-center">
            <TrendingUp size={22}/> Admin Dashboard
          </h1>
          <button onClick={onLogout} className="text-gray-300 hover:text-white">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400">Total Users</p>
            <h2 className="text-white text-3xl font-bold flex gap-2 items-center">
              <Users/> {totalUsers}
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400">Entrepreneurs</p>
            <h2 className="text-blue-400 text-3xl font-bold">
              {entrepreneurs.length}
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400">Investors</p>
            <h2 className="text-green-400 text-3xl font-bold">
              {investors.length}
            </h2>
          </div>

        </div>

        {/* CHART */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-white text-xl mb-4">User Growth</h2>

          {loading ? (
            <p className="text-gray-400">Loading chart...</p>
          ) : growth.length === 0 ? (
            <p className="text-gray-500">No growth data</p>
          ) : (
            <div className="h-80">
              <Line data={chartData} options={chartOptions}/>
            </div>
          )}
        </div>

        {/* TABLES */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* ENTREPRENEURS */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">Entrepreneurs</h3>

            {entrepreneurs.length === 0 ? (
              <p className="text-gray-500">No entrepreneurs found</p>
            ) : entrepreneurs.map((u) => (
              <div key={u.id} className="flex justify-between py-3 border-b border-white/5">
                <div>
                  <p className="text-white">{u.name}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(u.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Eye className="text-gray-400"/>
              </div>
            ))}
          </div>

          {/* INVESTORS */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">Investors</h3>

            {investors.length === 0 ? (
              <p className="text-gray-500">No investors found</p>
            ) : investors.map((u) => (
              <div key={u.id} className="flex justify-between py-3 border-b border-white/5">
                <div>
                  <p className="text-white">{u.name}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(u.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Eye className="text-gray-400"/>
              </div>
            ))}
          </div>

        </div>

      </main>

      <Footer/>
      <ChatBot/>

    </div>
  )
}