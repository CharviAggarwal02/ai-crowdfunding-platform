export default function Footer() {
  return (
    <footer className="border-t border-gray-800/50 bg-gray-950/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">UpFund</h3>
            <p className="text-sm text-gray-400 max-w-md">
              Next-generation crowdfunding platform combining AI insights, blockchain technology, and smart analytics for smarter investment decisions.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Startups</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Market Analysis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <span>© {new Date().getFullYear()} UpFund. All rights reserved.</span>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


