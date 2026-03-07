import { Moon, Sun, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import upfundLogo from '../../UPFUND.jpg';

interface HeaderProps {
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  showMarketAnalysis?: boolean;
}

export default function Header({ onNavigate, isLoggedIn, showMarketAnalysis = true }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize theme - default to dark like CarbonX
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = stored ? stored === 'dark' : (prefersDark || true); // Default to dark
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <header className="bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <img src={upfundLogo} alt="UpFund logo" className="h-9 w-auto rounded-lg group-hover:opacity-80 transition-opacity" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">UpFund</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('startups')}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              Startups
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            {showMarketAnalysis && (
              <button
                onClick={() => onNavigate('market-analysis')}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
              >
                Market Analysis
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {!isLoggedIn && (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
                >
                  Get Started
                </button>
              </>
            )}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800/50 pt-4 space-y-3">
            <button
              onClick={() => {
                onNavigate('startups');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-medium text-gray-400 hover:text-white transition-colors py-2"
            >
              Startups
            </button>
            {showMarketAnalysis && (
              <button
                onClick={() => {
                  onNavigate('market-analysis');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-sm font-medium text-gray-400 hover:text-white transition-colors py-2"
              >
                Market Analysis
              </button>
            )}
            {!isLoggedIn && (
              <>
                <button
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-medium text-gray-400 hover:text-white transition-colors py-2"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onNavigate('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium rounded-lg text-center"
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
