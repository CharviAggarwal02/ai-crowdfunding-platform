import {
  TrendingUp,
  Search,
  MessageSquare,
  Briefcase,
  Settings,
  LogOut,
  Home
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  getSummary,
  getCategoryDistribution,
  getRecentCampaigns
} from "../services/analyticsService";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from "recharts";

import ChatBot from "../components/ChatBot";
import Footer from "../components/Footer";
import InvestorMessagingModal from "../components/InvestorMessagingModal";

const COLORS = ["#06b6d4", "#3b82f6", "#8b5cf6", "#22c55e", "#f59e0b"];

interface Props {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export default function InvestorDashboard({
  onNavigate,
  onLogout
}: Props) {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [stats, setStats] = useState<any>(null);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [showMessaging, setShowMessaging] = useState(false);

  // ⭐ REAL DATA FROM BACKEND
  const [myInvestments, setMyInvestments] = useState<any[]>([]);

  // KEEP CHART SAME
  const portfolioData = [
    { month: "Jan", value: 120 },
    { month: "Feb", value: 140 },
    { month: "Mar", value: 130 },
    { month: "Apr", value: 165 },
    { month: "May", value: 155 },
    { month: "Jun", value: 180 }
  ];

  const getInitials = (name?: string) => {
    if (!name) return "IN";
    return name
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // KEEP EXISTING CHART APIs
        const summary = await getSummary();
        setStats(summary);

        const categories = await getCategoryDistribution();
        setCategoryData(categories);

        const campaigns = await getRecentCampaigns();
        setRecentActivity(campaigns);

        // ⭐ FETCH INVESTMENTS
        if (user?.id) {
          const res = await fetch(
            `http://127.0.0.1:8000/api/investments/${user.id}`
          );

          const data = await res.json();
          setMyInvestments(data);
        }

      } catch (err) {
        console.error("Dashboard Error:", err);
      }
    };

    loadData();
  }, []);

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
              {user?.firstName || "Investor"}
            </span>
          </div>

          <nav className="space-y-3">

            <button className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg w-full">
              <TrendingUp className="w-5 h-5" />
              Dashboard
            </button>

            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg w-full"
            >
              <Home className="w-5 h-5" />
              Home
            </button>

            <button
              onClick={() => onNavigate("startups")}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg w-full"
            >
              <Search className="w-5 h-5" />
              Explore
            </button>

            <button className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg w-full">
              <Briefcase className="w-5 h-5" />
              Portfolio
            </button>

            <button
              onClick={() => {
                if (myInvestments.length > 0) {
                  setShowMessaging(true);
                }
              }}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg w-full"
            >
              <MessageSquare className="w-5 h-5" />
              Messages
            </button>

            <button className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg w-full">
              <Settings className="w-5 h-5" />
              Settings
            </button>

          </nav>

          <button
            onClick={() => onLogout && onLogout()}
            className="mt-10 flex items-center gap-3 text-gray-400 hover:text-red-400"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>

        </aside>

        {/* Main */}
        <main className="flex-1 p-6 md:p-10">

          <div className="max-w-7xl mx-auto">

            <h1 className="text-3xl font-bold text-white mb-2">
              Investment Dashboard
            </h1>

            <p className="text-slate-400 mb-10">
              Track your investments and analyze Kickstarter market trends
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm mb-2">Total Funding</p>
                <p className="text-2xl font-bold text-white">
                  {stats?.totalFunding
                    ? `$${Number(stats.totalFunding).toLocaleString()}`
                    : "Loading..."}
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm mb-2">Total Projects</p>
                <p className="text-2xl font-bold text-white">
                  {stats?.totalProjects || "Loading..."}
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm mb-2">Success Rate</p>
                <p className="text-2xl font-bold text-white">
                  {stats?.successRate
                    ? `${Number(stats.successRate).toFixed(2)}%`
                    : "Loading..."}
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-gray-400 text-sm mb-2">Average Pledge</p>
                <p className="text-2xl font-bold text-white">
                  {stats?.avgPledge
                    ? `$${Number(stats.avgPledge).toLocaleString()}`
                    : "Loading..."}
                </p>
              </div>

            </div>

            {/* Charts KEEP SAME */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-xl text-white mb-4">
                  Portfolio Performance
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={portfolioData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#06b6d4"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-xl text-white mb-4">
                  Kickstarter Category Distribution
                </h2>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="pledged"
                      nameKey="category"
                      outerRadius={100}
                      label
                    >
                      {categoryData.map((_entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* Recent Campaigns KEEP SAME */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">

              <h2 className="text-xl text-white mb-6">
                Recent Campaigns
              </h2>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-gray-400 text-sm">
                        Date
                      </th>
                      <th className="text-left py-3 text-gray-400 text-sm">
                        Category
                      </th>
                      <th className="text-left py-3 text-gray-400 text-sm">
                        Campaign
                      </th>
                      <th className="text-left py-3 text-gray-400 text-sm">
                        Amount
                      </th>
                      <th className="text-left py-3 text-gray-400 text-sm">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {recentActivity.map((a, i) => (
                      <tr key={i} className="border-b border-white/10">

                        <td className="py-4 text-gray-300">
                          {a.date}
                        </td>

                        <td className="py-4 text-gray-300">
                          {a.category}
                        </td>

                        <td className="py-4 text-gray-300">
                          {a.company}
                        </td>

                        <td className="py-4 text-gray-300">
                          {a.amount}
                        </td>

                        <td className="py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                            {a.status}
                          </span>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            {/* My Investments */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-10">

              <h2 className="text-xl text-white mb-6">
                My Investments
              </h2>

              {myInvestments.length === 0 ? (

                <div className="text-center py-10 text-gray-400">
                  No investments yet
                </div>

              ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {myInvestments.map((item: any) => {

                    const percent =
                      (item.startup.currentFunding /
                        item.startup.fundingGoal) * 100;

                    return (
                      <div
                        key={item.id}
                        className="bg-white/5 border border-white/10 rounded-lg p-6"
                      >

                        <h3 className="text-lg font-bold text-white mb-2">
                          {item.startup.name}
                        </h3>

                        <p className="text-gray-400 text-sm mb-4">
                          {item.startup.description}
                        </p>

                        <div className="space-y-3 bg-white/5 rounded p-3 mb-4">

                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">
                              Investment
                            </span>

                            <span className="text-cyan-400 font-semibold">
                              ${Number(item.amount).toLocaleString()}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">
                              Date
                            </span>

                            <span className="text-white">
                              {new Date(item.date).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">
                              Funding Goal
                            </span>

                            <span className="text-white">
                              ${Number(
                                item.startup.fundingGoal
                              ).toLocaleString()}
                            </span>
                          </div>

                        </div>

                        <div className="w-full bg-white/10 h-2 rounded-full mb-2">

                          <div
                            className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full"
                            style={{
                              width: `${Math.min(100, percent)}%`
                            }}
                          />

                        </div>

                        <p className="text-xs text-gray-400">
                          {percent.toFixed(0)}% funded
                        </p>

                      </div>
                    );
                  })}

                </div>
              )}

            </div>

          </div>

        </main>

      </div>

      <Footer />
      <ChatBot />

      {showMessaging && (
        <InvestorMessagingModal
          investedStartups={myInvestments}
          userName={user?.firstName || "Investor"}
          onClose={() => setShowMessaging(false)}
        />
      )}

    </div>
  );
}