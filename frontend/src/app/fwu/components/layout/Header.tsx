"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Logo from '../common/Logo';
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  Users,
  Mail,
  Home,
  Lightbulb,
  GalleryHorizontalIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const menuItems: {
  name: string;
  href: string;
  icon: React.ReactNode;
  isHighlighted?: boolean;
  isNew?: boolean;
  description?: string;
}[] = [
  {
    name: 'Home',
    href: '/fwu',
    icon: <Home className="w-4 h-4" />,
    description: 'Welcome to our homepage'
  },
  {
    name: 'About',
    href: '/fwu/about',
    icon: <Users className="w-4 h-4" />,
    description: 'Learn about our university'
  },
  {
    name: 'News',
    href: '/fwu/news',
    icon: <Lightbulb className="w-4 h-4" />,
    description: 'Latest university news'
  },
   {
    name: 'Notices',
    href: '/fwu/notice',
    icon: <Lightbulb className="w-4 h-4" />,
    description: 'Latest university news'
  },
   {
    name: 'Committees',
    href: '/fwu/committees',
    icon: <Users className="w-4 h-4" />,
    description: 'View our ongoing projects'
  },
   {
    name: 'Gallery',
    href: '/fwu/gallery',
    icon: <GalleryHorizontalIcon className="w-4 h-4" />,
    description: 'View our ongoing projects'
  },

  {
    name: 'Faculty',
    href: '/fwu/faculty',
    icon: <Users className="w-4 h-4" />,
    description: 'Meet our faculty members'
  },

  {
    name: 'Contact',
    href: '/fwu/contact',
    icon: <Mail className="w-4 h-4" />,
    description: 'Get in touch with us'
  },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('/');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const path=usePathname();
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Set active menu item based on current path
    if (typeof window !== 'undefined') {
      setActiveItem(window?.location?.pathname);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('#mobile-menu') && !target.closest('#mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
       if (isLangDropdownOpen && !target.closest('#lang-dropdown-container')) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen, isLangDropdownOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);

  const switchLanguage = (lang: string) => {
    setCurrentLang(lang);
    setIsLangDropdownOpen(false);

  };

  return (
    <header className="sticky top-0 z-40 text-white">
      {/* Animated top border */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" style={{
        backgroundSize: '200% 100%',
        animation: 'gradientMove 8s linear infinite'
      }}></div>

      {/* Main header background with glass effect */}
      {/* ========================================================================================= */}
      {/* FIX: Removed `overflow-hidden` from this div. This was preventing the absolutely         */}
      {/* positioned language dropdown from appearing, as it was being "clipped" by this parent.    */}
      {/* ========================================================================================= */}
      <div className={`relative z-30 transition-all duration-500 ${
        scrolled
          ? 'bg-indigo-900/90 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-r from-indigo-900 to-blue-900'
      }`}>
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>

          {/* Animated dots */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto lg:px-8 relative">
          <div className="flex items-center justify-between h-20">
            {/* Logo with hover effect */}
            <div className="relative z-10 transform transition-transform duration-300 hover:scale-105">
              <Logo />
            </div>

            {/* Desktop Menu - Main Items Only */}
            <div className="hidden lg:flex items-center">
              <nav className="flex items-center space-x-1">
                {menuItems.slice(0, 6).map((item) => {
                  const isActive = path === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                       prefetch={true}
                      className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 relative group whitespace-nowrap ${
                        isActive
                          ? 'text-white before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-indigo-400'
                            : 'text-gray-300 hover:text-white'
                      }`}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <span className="relative">
                        {item?.name}
                      </span>
                      {hoveredItem === item.name && item.description && (
                        <div className="absolute z-40 left-1/2 transform -translate-x-1/2 mt-1 top-full w-48 p-2 bg-white/95 backdrop-blur-sm text-gray-800 text-xs rounded-lg shadow-lg border border-indigo-100 opacity-0 animate-fadeInFast">
                          {item.description}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                        </div>
                      )}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-blue-400 group-hover:w-full transition-all duration-300 ease-out"></span>
                    </Link>
                  );
                })}
              </nav>

              {/* Apply Button - Desktop */}
              <div className="ml-4 flex items-center">
                <Link
                  href="/fwu/apply/#application-form"
                  prefetch={true}
                  className="relative cursor-pointer overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center px-5 py-2.5 rounded-lg font-bold bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-md transition-all duration-300">
                    Apply Now
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/40 to-purple-600/40 blur-md group-hover:blur-lg transition-all duration-300 -z-10"></span>
                  </span>
                </Link>

                {/* Language Switcher - Desktop */}
                <div id="lang-dropdown-container" className="relative ml-3 z-50">
                  <button
                    onClick={toggleLangDropdown}
                    className="flex items-center text-white font-medium bg-white/10 hover:bg-white/15 px-3 py-2.5 rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20"
                  >
                    <Globe className="mr-1.5" />
                    <span>{currentLang}</span>
                    <ChevronDown className={`ml-1 transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isLangDropdownOpen && (
                    <div className="absolute z-50 right-0 mt-2 w-40 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-indigo-100 overflow-hidden transition-all duration-300 animate-fadeIn">
                      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-blue-500"></div>
                      <button
                        onClick={() => switchLanguage('EN')}
                        className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 cursor-pointer transition-colors duration-300 border-b border-gray-100"
                      >
                        <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 text-indigo-600">EN</span>
                        English
                      </button>
                      <button
                        onClick={() => switchLanguage('NE')}
                        className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 cursor-pointer transition-colors duration-300"
                      >
                        <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 text-indigo-600">NE</span>
                        नेपाली
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden z-50 flex items-center space-x-2">
              <Link
                href="/fwu/apply/#application-form"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-md transition-all duration-300">
                  Apply
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
              </Link>

              <button
                onClick={() => switchLanguage(currentLang === 'EN' ? 'NE' : 'EN')}
                className="p-2.5 text-white bg-white/10 hover:bg-white/15 rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20"
                aria-label="Switch Language"
              >
                <Globe size={20} />
              </button>

              <button
                id="mobile-menu-button"
                onClick={toggleMobileMenu}
                className="p-2.5 text-white bg-white/10 hover:bg-white/15 rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20"
                aria-label="Open menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subheader for additional navigation - Desktop only */}
      <div className="hidden lg:block z-20 bg-white/90  backdrop-blur-md border-t border-indigo-100/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-3">
            <nav className="flex items-center space-x-8">
              {menuItems.slice(6).map((item) => {
                const isActive = path === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={true}
                    className={`text-sm font-medium transition-all duration-300 relative group ${
                      isActive
                        ? 'text-indigo-600'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    <span className="flex items-center">
                      {item.name}
                    </span>
                    <span className="absolute z-20  bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-blue-400 group-hover:w-full transition-all duration-300 ease-out"></span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Left Side Mobile Menu with animation */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-indigo-900/80 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        <div
          className={`absolute top-0 left-0 bottom-0 w-full max-w-xs bg-gradient-to-b from-indigo-800 to-indigo-900 shadow-2xl transform transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-indigo-700/50">
            <div>
              <h3 className="text-xl font-bold text-white">Menu</h3>
              <p className="text-indigo-200 text-sm">Far Western University</p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full bg-indigo-700/50 text-white hover:bg-indigo-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="h-[calc(100%-160px)] overflow-y-auto p-2 custom-scrollbar">
            <nav className="py-2">
              <div className="space-y-1  mb-10">
                {menuItems.map((item, index) => {
                  const isActive = activeItem === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-indigo-700/50 text-white'
                          : item.isHighlighted
                            ? 'bg-blue-700/30 text-white border border-blue-600/30'
                            : 'text-indigo-100 hover:bg-indigo-700/30 hover:text-white'
                      }`}
                      style={{
                        transitionDelay: `${100 + index * 50}ms`,
                        animation: isMobileMenuOpen ? `fadeSlideIn 0.4s ease-out forwards ${100 + index * 50}ms` : 'none'
                      }}
                    >
                      <span className={`p-2.5 rounded-lg mr-3 text-white ${
                        item.isHighlighted
                          ? 'bg-blue-600/70'
                            : 'bg-indigo-600/50'
                      }`}>
                        {item.icon}
                      </span>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div>{item.name}</div>
                          <div className="text-xs text-indigo-300">{item.description}</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
          <div className="absolute z-50 backdrop-blur-3xl  bottom-0 left-0 right-0 p-4 border-t border-indigo-700/30">
            <div className="mb-4 z-50">
              <p className="text-xs z-50 uppercase tracking-wider text-indigo-300 mb-2">Language</p>
              <div className="flex space-x-2 z-50">
                <button
                  onClick={() => switchLanguage('EN')}
                  className={`flex-1 px-4 py-2 rounded-lg z-50 text-sm font-medium transition-colors duration-300 ${
                    currentLang === 'EN'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-indigo-800/50 text-indigo-200 hover:bg-indigo-700'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => switchLanguage('NE')}
                  className={`flex-1 px-4 z-50 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                    currentLang === 'NE'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-indigo-800/50 text-indigo-200 hover:bg-indigo-700'
                  }`}
                >
                  नेपाली
                </button>
              </div>
            </div>
            <p className="text-indigo-200 text-xs text-center">© 2024 Far Western University</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes gradientMove {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.2); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInFast {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 150, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.8);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.6) rgba(75, 85, 150, 0.2);
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.6);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.8);
        }
      `}</style>
    </header>
  );
};

export default Header;