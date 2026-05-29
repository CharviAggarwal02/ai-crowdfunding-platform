import { Moon, Sun, Menu, X, LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import upfundLogo from "../../UPFUND.jpg";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  showMarketAnalysis?: boolean;
  userName?: string;
  onLogout?: () => void;
  userRole?: "investor" | "entrepreneur" | "admin" | null;
}

const navLinkClass =
  "text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors relative group";

const navUnderlineClass =
  "absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300";

const iconButtonClass =
  "p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/90 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800/50 transition-colors rounded-lg";

export default function Header({
  onNavigate,
  isLoggedIn,
  showMarketAnalysis = true,
  userName,
  onLogout,
  userRole,
}: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    if (profileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/80">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate("home")}
          >
            <img
              src={upfundLogo}
              alt="UpFund logo"
              className="h-9 w-auto rounded-lg group-hover:opacity-80 transition-opacity"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              UpFund
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => onNavigate("home")} className={navLinkClass}>
              Home
              <span className={navUnderlineClass}></span>
            </button>
            <button onClick={() => onNavigate("startups")} className={navLinkClass}>
              Startups
              <span className={navUnderlineClass}></span>
            </button>
            {showMarketAnalysis && (
              <button
                onClick={() => onNavigate("market-analysis")}
                className={navLinkClass}
              >
                Market Analysis
                <span className={navUnderlineClass}></span>
              </button>
            )}

            <button
              type="button"
              onClick={toggleTheme}
              className={iconButtonClass}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isLoggedIn && userName ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100/90 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {userName}
                  </span>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200/80 dark:border-gray-800/50 overflow-hidden z-50">
                    <button
                      onClick={() => {
                        onNavigate("profile");
                        setProfileMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      View Profile
                    </button>
                    {userRole === "entrepreneur" && (
                      <button
                        onClick={() => {
                          onNavigate("entrepreneur-dashboard");
                          setProfileMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors border-t border-gray-200/80 dark:border-gray-800/50"
                      >
                        <User className="w-4 h-4" />
                        Entrepreneur Dashboard
                      </button>
                    )}
                    {userRole === "investor" && (
                      <button
                        onClick={() => {
                          onNavigate("investor-dashboard");
                          setProfileMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors border-t border-gray-200/80 dark:border-gray-800/50"
                      >
                        <User className="w-4 h-4" />
                        Investor Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onLogout?.();
                        setProfileMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-colors border-t border-gray-200/80 dark:border-gray-800/50"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => onNavigate("login")}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate("signup")}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
                >
                  Get Started
                </button>
              </>
            )}
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 border-t border-gray-200/80 pt-4 pb-4 dark:border-gray-800/50">
            <button
              onClick={() => {
                onNavigate("home");
                setMobileMenuOpen(false);
              }}
              className="block w-full py-2 text-left text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate("startups");
                setMobileMenuOpen(false);
              }}
              className="block w-full py-2 text-left text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Startups
            </button>
            {showMarketAnalysis && (
              <button
                onClick={() => {
                  onNavigate("market-analysis");
                  setMobileMenuOpen(false);
                }}
                className="block w-full py-2 text-left text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Market Analysis
              </button>
            )}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100/90 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {isDark ? "Light mode" : "Dark mode"}
            </button>
            {isLoggedIn && userName ? (
              <>
                <div className="flex items-center gap-2 px-2 py-2 border-t border-gray-200/80 dark:border-gray-800/50">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {userName}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onNavigate("profile");
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100/90 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white"
                >
                  <User className="h-5 w-5" />
                  View Profile
                </button>
                {userRole === "entrepreneur" && (
                  <button
                    onClick={() => {
                      onNavigate("entrepreneur-dashboard");
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100/90 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white"
                  >
                    <User className="h-5 w-5" />
                    Entrepreneur Dashboard
                  </button>
                )}
                {userRole === "investor" && (
                  <button
                    onClick={() => {
                      onNavigate("investor-dashboard");
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100/90 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white"
                  >
                    <User className="h-5 w-5" />
                    Investor Dashboard
                  </button>
                )}
                <button
                  onClick={() => {
                    onLogout?.();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50/50 dark:text-red-400 dark:hover:bg-red-950/20"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onNavigate("login");
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full py-2 text-left text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onNavigate("signup");
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2 text-center text-sm font-medium text-white"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
