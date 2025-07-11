import { useState, useEffect } from 'react';
import { Search, X, Bell, Filter, Sparkles, TrendingUp } from 'lucide-react';

interface NoticeHeroProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
}

export default function NoticeHero({ searchTerm, onSearchChange }: NoticeHeroProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
    setIsVisible(true);
  }, [searchTerm]);

  const handleSubmit = () => {
    onSearchChange(localSearchTerm.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleClear = () => {
    setLocalSearchTerm('');
    onSearchChange('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-500/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Header with enhanced animation */}
          <div className={`mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Icon with glow effect */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-3xl border border-white/20 flex items-center justify-center group hover:scale-110 transition-all duration-300 shadow-2xl">
                <Bell className="w-10 h-10 text-white group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            {/* Main heading with gradient text */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Official
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Notices
              </span>
            </h1>
            
            {/* Subtitle with enhanced styling */}
            <p className="text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-light">
              Stay informed with the latest{' '}
              <span className="font-semibold text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 px-3 py-1 rounded-lg border border-white/20 backdrop-blur-sm">
                notices
              </span>
              {' '}and important communications from FWU
            </p>

            {/* Decorative line */}
            <div className="mt-6 flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-80"></div>
            </div>
          </div>

          {/* Enhanced Search Form */}
          <div className={`mb-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                {/* Glowing border effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition duration-300"></div>
                
                <div className="relative bg-white/15 backdrop-blur-xl rounded-2xl p-2 border border-white/20 shadow-2xl">
                  <div className="flex items-center">
                    <div className="flex-1 relative">
                      <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-200/80 z-10" />
                      <input
                        type="text"
                        placeholder="Search notices by title, content, or keywords..."
                        value={localSearchTerm}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="w-full pl-14 pr-6 py-5 bg-transparent text-white placeholder-blue-200/70 border-0 focus:outline-none text-lg font-medium"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {localSearchTerm && (
                        <button
                          type="button"
                          onClick={handleClear}
                          className="p-3 text-blue-200 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group/clear"
                          title="Clear search"
                        >
                          <X className="w-5 h-5 group-hover/clear:rotate-90 transition-transform duration-200" />
                        </button>
                      )}
                      
                      <button
                        onClick={handleSubmit}
                        className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
                      >
                        <Search className="w-5 h-5" />
                        <span>Search</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className={`flex flex-wrap justify-center gap-4 mb-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="group flex items-center space-x-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm px-5 py-3 rounded-full border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-green-100 font-medium text-sm">Live Updates</span>
            </div>
            
            <div className="group flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm px-5 py-3 rounded-full border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 cursor-pointer">
              <Filter className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform duration-200" />
              <span className="text-blue-100 font-medium text-sm">All Categories</span>
            </div>
            
            <div className="group flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-5 py-3 rounded-full border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 cursor-pointer">
              <TrendingUp className="w-4 h-4 text-purple-200 group-hover:translate-y-0.5 transition-transform duration-200" />
              <span className="text-purple-100 font-medium text-sm">Trending</span>
            </div>
            
            {searchTerm && (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm px-5 py-3 rounded-full border border-orange-500/30 animate-pulse">
                <span className="text-orange-100 font-medium text-sm">
                  Searching:{searchTerm}
                </span>
                <button
                  onClick={() => onSearchChange('')}
                  className="text-orange-200 hover:text-white transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Bottom CTA */}
          <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-blue-200/70 text-sm font-medium">
              🚀 Stay connected with FWU Incubation Center&apos;s official communications
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.1)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.1)" />
            </linearGradient>
          </defs>
          <path 
            d="M0 60L48 65C96 70 192 80 288 75C384 70 480 50 576 45C672 40 768 50 864 65C960 80 1056 100 1152 105C1248 110 1344 100 1392 95L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" 
            fill="url(#waveGradient)" 
          />
        </svg>
      </div>
    </section>
  );
}