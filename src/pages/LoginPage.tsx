import { useState } from "react";
import { Mail, Lock, TrendingUp, Sparkles } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";
import { login } from "../services/authService";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
  onLoginSuccess?: (userData: any) => void;
  userRole?: "investor" | "entrepreneur" | "admin" | null;
}

export default function LoginPage({
  onNavigate,
  isLoggedIn,
  userName,
  onLogout,
  onLoginSuccess,
  userRole,
}: LoginPageProps) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login(email, password);

      alert("Login Success ✅");

      // Update App state with login info
      onLoginSuccess?.(data.user);

      // ⭐ Role based redirect
      if (data.user.role === "admin") {
        onNavigate("admin-dashboard");
      } 
      else if (data.user.role === "investor") {
        onNavigate("investor-dashboard");
      } 
      else {
        onNavigate("entrepreneur-dashboard");
      }

    } catch (err: any) {
      alert(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A]">

      <Header
        onNavigate={onNavigate}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={onLogout}
        userRole={userRole}
      />

      <main className="flex items-center justify-center py-20">

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-xl p-8 w-[420px]"
        >
          <div className="text-center mb-6">
            <Sparkles className="mx-auto text-cyan-400 mb-2" />
            <h2 className="text-2xl text-white font-bold">Sign In</h2>
            <p className="text-gray-400 text-sm">Welcome back to UpFund</p>
          </div>

          <div className="mb-4">
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 bg-white/10 text-white rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 bg-white/10 text-white rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-gray-400 mt-4 text-sm">
            Don’t have an account?{" "}
            <span
              className="text-cyan-400 cursor-pointer"
              onClick={() => onNavigate("signup")}
            >
              Sign up
            </span>
          </p>
        </form>

      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}