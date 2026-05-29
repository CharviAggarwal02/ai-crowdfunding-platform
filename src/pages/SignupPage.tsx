import { useState } from "react";
import { signup } from "../services/authService";
import Header from "../components/Header";
import ChatBot from "../components/ChatBot";
import Footer from "../components/Footer";

interface SignupPageProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
  userRole?: "investor" | "entrepreneur" | "admin" | null;
}

export default function SignupPage({
  onNavigate,
  isLoggedIn,
  userName,
  onLogout,
  userRole,
}: SignupPageProps) {
  const [role, setRole] = useState("entrepreneur");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log("Signup Submit Triggered");

    try {
      setLoading(true);
      setError("");

      await signup({
        firstName,
        lastName,
        email,
        password,
        role,
      });

      alert("Signup Successful ✅");

      onNavigate("login");

    } catch (err: any) {
      console.log(err?.response?.data || err.message);
      setError(
        err?.response?.data?.detail ||
        "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex flex-col">
      <Header
        onNavigate={onNavigate}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={onLogout}
        userRole={userRole}
      />
      <div className="flex-1 flex items-center justify-center pt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-xl p-8 w-[420px]"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Create Account
          </h2>

          {/* Role */}
          <label className="text-gray-300 text-sm mb-1 block">
            Select Account Type
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-[#1f2937] text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
          >
            <option value="entrepreneur">Entrepreneur (Startup Founder)</option>
            <option value="investor">Investor</option>
            <option value="admin">Admin</option>
          </select>

          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            className="w-full mb-4 p-3 rounded-lg bg-white/10 text-white border border-white/10"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            className="w-full mb-4 p-3 rounded-lg bg-white/10 text-white border border-white/10"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 rounded-lg bg-white/10 text-white border border-white/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 rounded-lg bg-white/10 text-white border border-white/10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Error */}
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login */}
          <p className="text-gray-400 text-sm mt-4 text-center">
            Already have an account?{" "}
            <span
              className="text-cyan-400 cursor-pointer"
              onClick={() => onNavigate("login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
      <ChatBot />
      <Footer />
    </div>
  );
}