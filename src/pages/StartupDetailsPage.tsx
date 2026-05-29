import { ArrowLeft, Calendar, Users } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ChatBot from "../components/ChatBot";
import Footer from "../components/Footer";
import MessagingInterface from "../components/MessagingInterface";
import { getStartupById } from "../services/startupService.js";

interface StartupDetailsPageProps {
  startupId: number | null;
  onNavigate: (page: string, data?: any) => void;
  isLoggedIn: boolean;
  userRole: "investor" | "entrepreneur" | "admin" | null;
  userName?: string;
  onLogout?: () => void;
}

export default function StartupDetailsPage({
  startupId,
  onNavigate,
  isLoggedIn,
  userName,
  userRole,
  onLogout
}: StartupDetailsPageProps) {

  const getInvestedStartupsStorageKey = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      const u = JSON.parse(storedUser);
      const userKey =
        u?.id != null
          ? String(u.id)
          : typeof u?.email === "string" && u.email.trim()
            ? u.email.trim().toLowerCase()
            : null;
      return userKey ? `investedStartups:${userKey}` : null;
    } catch {
      return null;
    }
  };

  const [startup, setStartup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {

    const loadStartup = async () => {
      try {
        if (startupId !== null) {
          const data = await getStartupById(startupId);
          setStartup(data);
        }
      } catch (err) {
        console.error("Error loading startup", err);
      } finally {
        setLoading(false);
      }
    };

    loadStartup();

  }, [startupId]);

  const handleInvestConfirm = async () => {
  try {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login first");
      return;
    }

    const user = JSON.parse(storedUser);

    if (!investmentAmount || Number(investmentAmount) <= 0) {
      alert("Enter valid investment amount");
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/api/invest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        startup_id: startup.id,
        investor_id: user.id,
        amount: parseFloat(investmentAmount)
      })
    });

    const data = await res.json();

    if (res.ok) {
      // Save invested startup locally
      const key = getInvestedStartupsStorageKey();

      if (key) {
        const oldData = JSON.parse(localStorage.getItem(key) || "[]");

        if (!oldData.includes(startup.id)) {
          oldData.push(startup.id);
          localStorage.setItem(key, JSON.stringify(oldData));
        }
      }

      setShowInvestModal(false);
      setInvestmentAmount("");
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      console.log("Blockchain Hash:", data.blockchain_hash);

    } else {
      alert(data.detail || "Investment failed");
    }

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center text-white text-xl">
        Loading Startup...
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center text-white text-xl">
        Startup not found
      </div>
    );
  }

  const fundingProgress =
    (startup.currentFunding / startup.fundingGoal) * 100;

  return (
    <div className="min-h-screen bg-[#0A0E1A]">

      <Header
        onNavigate={onNavigate}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={onLogout}
        userRole={userRole}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">

        <button
          onClick={() => onNavigate("startups")}
          className="flex items-center gap-2 text-gray-300 hover:text-cyan-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Startups
        </button>

        <div className="grid grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-8">

            <h1 className="text-3xl font-bold text-white mb-3">
              {startup.name}
            </h1>

            <p className="text-gray-300 mb-4">
              {startup.description}
            </p>

            <div className="flex gap-6 text-gray-400">

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {startup.foundedDate}
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {startup.teamSize}
              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">

            <div className="text-sm text-gray-400 mb-2">
              Funding Progress
            </div>

            <div className="text-3xl font-bold text-white mb-1">
              ${startup.currentFunding?.toLocaleString()|| "0"}
            </div>

            <div className="text-sm text-gray-400 mb-4">
              of ${startup.fundingGoal?.toLocaleString()|| "0"}
            </div>

            <div className="w-full bg-white/10 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-cyan-500 h-3 rounded-full"
                style={{ width: `${fundingProgress}%` }}
              />
            </div>

            <div className="text-sm text-gray-300 mb-6">
              {fundingProgress.toFixed(0)}% funded
            </div>

            <button 
              onClick={() => setShowInvestModal(true)}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg mb-3 hover:opacity-90 transition"
            >
              Invest Now
            </button>

            <button 
              onClick={() => setShowMessaging(true)}
              className="w-full py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
            >
              Message
            </button>

          </div>

        </div>

      </main>

      <Footer />
      <ChatBot />
      
      {showMessaging && (
        <MessagingInterface
          startupName={startup.name}
          onClose={() => setShowMessaging(false)}
          userRole={userRole}
          userName={userName}
        />
      )}

      {/* Investment Modal */}
      {showInvestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A0E1A] border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Invest in {startup.name}</h2>
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
              <p className="text-gray-400 text-sm mb-1">Current Funding Goal</p>
              <p className="text-xl font-semibold text-white">${startup.fundingGoal?.toLocaleString()}</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-2">Investment Amount ($)</label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 bg-[#1A1E30] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowInvestModal(false);
                  setInvestmentAmount("");
                }}
                className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleInvestConfirm}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:opacity-90 transition font-medium"
              >
                Confirm Investment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-6 right-6 bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-400 font-medium z-50 animate-pulse">
          ✓ Investment successful! {startup.name} has been added to your portfolio.
        </div>
      )}

    </div>
  );
}