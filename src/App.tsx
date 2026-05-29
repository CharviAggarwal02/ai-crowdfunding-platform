import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import StartupBrowsePage from "./pages/StartupBrowsePage";
import StartupDetailsPage from "./pages/StartupDetailsPage";
import InvestorDashboard from "./pages/InvestorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MarketAnalysisPage from "./pages/MarketAnalysisPage";
import EntrepreneurDashboard from "./pages/EntrepreneurDashboard";
import CreateCampaignPage from "./pages/CreateCampaignPage";
import PerformanceAnalyticsPage from "./pages/PerformanceAnalyticsPage";
import ProjectUpdatesPage from "./pages/ProjectUpdatesPage";

type Page =
  | "home"
  | "signup"
  | "login"
  | "startups"
  | "startup-details"
  | "investor-dashboard"
  | "admin-dashboard"
  | "market-analysis"
  | "entrepreneur-dashboard"
  | "create-campaign"
  | "performance-analytics"
  | "project-updates";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

function StartupDetailsRoute({
  onNavigate,
  isLoggedIn,
  userRole,
  userName,
  onLogout,
}: {
  onNavigate: (page: string, data?: any) => void;
  isLoggedIn: boolean;
  userRole: "investor" | "entrepreneur" | "admin" | null;
  userName: string;
  onLogout: () => void;
}) {
  const { startupId } = useParams();
  const parsedStartupId = startupId ? Number(startupId) : null;

  return (
    <StartupDetailsPage
      startupId={Number.isFinite(parsedStartupId) ? parsedStartupId : null}
      onNavigate={onNavigate}
      isLoggedIn={isLoggedIn}
      userRole={userRole}
      userName={userName}
      onLogout={onLogout}
    />
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<
    "investor" | "entrepreneur" | "admin" | null
  >(null);
  const [userName, setUserName] = useState<string>("");

  // Initialize login state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUserName(userData.firstName || "");
        setUserRole(userData.role || null);
      } catch (err) {
        console.error("Failed to parse user data from localStorage", err);
      }
    }
  }, []);

  // Handle successful login
  const handleLoginSuccess = (userData: any) => {
    setIsLoggedIn(true);
    setUserName(userData.firstName || "");
    setUserRole(userData.role || null);
  };

  // Bridge existing page-key navigation to URL routes.
  const handleNavigation = (page: string, data?: any) => {
    if (page === "startup-details") {
      if (typeof data === "number") {
        navigate(`/startup-details/${data}`);
      } else {
        navigate("/startups");
      }
      return;
    }

    const routeMap: Record<Exclude<Page, "startup-details">, string> = {
      home: "/",
      signup: "/signup",
      login: "/login",
      startups: "/startups",
      "investor-dashboard": "/investor-dashboard",
      "admin-dashboard": "/admin-dashboard",
      "market-analysis": "/market-analysis",
      "entrepreneur-dashboard": "/entrepreneur-dashboard",
      "create-campaign": "/create-campaign",
      "performance-analytics": "/performance-analytics",
      "project-updates": "/project-updates",
    };

    const targetPath = routeMap[page as Exclude<Page, "startup-details">];
    navigate(targetPath ?? "/");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            onNavigate={handleNavigation}
            isLoggedIn={isLoggedIn}
            userName={userName}
            onLogout={handleLogout}
            userRole={userRole}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <SignupPage
            onNavigate={handleNavigation}
            isLoggedIn={isLoggedIn}
            userName={userName}
            onLogout={handleLogout}
            userRole={userRole}
          />
        }
      />
      <Route
        path="/login"
        element={
          <LoginPage
            onNavigate={handleNavigation}
            isLoggedIn={isLoggedIn}
            userName={userName}
            onLogout={handleLogout}
            onLoginSuccess={handleLoginSuccess}
            userRole={userRole}
          />
        }
      />
      <Route
        path="/startups"
        element={
          <StartupBrowsePage
            onNavigate={handleNavigation}
            isLoggedIn={isLoggedIn}
            userRole={userRole}
            userName={userName}
            onLogout={handleLogout}
          />
        }
      />
      <Route
        path="/startup-details/:startupId"
        element={
          <StartupDetailsRoute
            onNavigate={handleNavigation}
            isLoggedIn={isLoggedIn}
            userRole={userRole}
            userName={userName}
            onLogout={handleLogout}
          />
        }
      />
      <Route
        path="/investor-dashboard"
        element={<InvestorDashboard onNavigate={handleNavigation} />}
      />
      <Route
        path="/admin-dashboard"
        element={<AdminDashboard onLogout={handleLogout} />}
      />
      <Route
        path="/market-analysis"
        element={
          <MarketAnalysisPage
            onNavigate={handleNavigation}
            isLoggedIn={isLoggedIn}
            userName={userName}
            onLogout={handleLogout}
            userRole={userRole}
          />
        }
      />
      <Route
        path="/entrepreneur-dashboard"
        element={
          <EntrepreneurDashboard
            onNavigate={handleNavigation}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
            userName={userName}
            userRole={userRole}
          />
        }
      />
      <Route
        path="/create-campaign"
        element={<CreateCampaignPage onNavigate={handleNavigation} />}
      />
      <Route
        path="/performance-analytics"
        element={<PerformanceAnalyticsPage onNavigate={handleNavigation} />}
      />
      <Route
        path="/project-updates"
        element={<ProjectUpdatesPage onNavigate={handleNavigation} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;