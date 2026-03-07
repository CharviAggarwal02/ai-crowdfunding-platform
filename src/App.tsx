import { useState } from 'react';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import StartupBrowsePage from './pages/StartupBrowsePage';
import StartupDetailsPage from './pages/StartupDetailsPage';
import InvestorDashboard from './pages/InvestorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MarketAnalysisPage from './pages/MarketAnalysisPage';
import EntrepreneurDashboard from './pages/EntrepreneurDashboard';
import CreateCampaignPage from './pages/CreateCampaignPage';
import PerformanceAnalyticsPage from './pages/PerformanceAnalyticsPage';
import ProjectUpdatesPage from './pages/ProjectUpdatesPage';

interface UserProfile {
  name: string;
  email: string;
}

type Page =
  | 'home'
  | 'signup'
  | 'login'
  | 'startups'
  | 'startup-details'
  | 'investor-dashboard'
  | 'admin-dashboard'
  | 'market-analysis'
  | 'entrepreneur-dashboard'
  | 'create-campaign'
  | 'performance-analytics'
  | 'project-updates';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'investor' | 'entrepreneur' | 'admin' | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (role: 'investor' | 'entrepreneur' | 'admin', userData: UserProfile) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserProfile(userData);
    if (role === 'investor') {
      setCurrentPage('investor-dashboard');
    } else if (role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('entrepreneur-dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserProfile(null);
    setCurrentPage('home');
  };

  return (
    <>
      {currentPage === 'home' && (
        <HomePage onNavigate={handleNavigation} />
      )}
      {currentPage === 'signup' && (
        <SignupPage onNavigate={handleNavigation} onLogin={handleLogin} />
      )}
      {currentPage === 'login' && (
        <LoginPage onNavigate={handleNavigation} onLogin={handleLogin} />
      )}
      {currentPage === 'startups' && (
        <StartupBrowsePage onNavigate={handleNavigation} isLoggedIn={isLoggedIn} userRole={userRole} />
      )}
      {currentPage === 'startup-details' && (
        <StartupDetailsPage onNavigate={handleNavigation} isLoggedIn={isLoggedIn} userRole={userRole} />
      )}
      {currentPage === 'investor-dashboard' && (
        <InvestorDashboard onNavigate={handleNavigation} onLogout={handleLogout} userProfile={userProfile || { name: 'Guest User', email: '' }} />
      )}
      {currentPage === 'admin-dashboard' && (
        <AdminDashboard onNavigate={handleNavigation} onLogout={handleLogout} />
      )}
      {currentPage === 'market-analysis' && (
        <MarketAnalysisPage onNavigate={handleNavigation} isLoggedIn={isLoggedIn} />
      )}
      {currentPage === 'entrepreneur-dashboard' && (
        <EntrepreneurDashboard onNavigate={handleNavigation} onLogout={handleLogout} userProfile={userProfile} />
      )}
      {currentPage === 'create-campaign' && (
        <CreateCampaignPage onNavigate={handleNavigation} />
      )}
      {currentPage === 'performance-analytics' && (
        <PerformanceAnalyticsPage onNavigate={handleNavigation} />
      )}
      {currentPage === 'project-updates' && (
        <ProjectUpdatesPage onNavigate={handleNavigation} />
      )}
    </>
  );
}

export default App;
