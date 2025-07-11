"use client"
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {
  ArrowLeft,

  Sparkles,

  RefreshCw
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const { theme } = useTheme()
   const  navigation=useRouter();
  useEffect(() => {
    setMounted(true)
    // Trigger animation after component mounts
    setTimeout(() => setIsAnimating(true), 100)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === 'dark'

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className={`flex items-center justify-center p-4 relative overflow-hidden transition-all duration-1000 ${
      isDark
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black'
        : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900'
    }`}>
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orbs */}
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse ${
          isDark ? 'bg-blue-600' : 'bg-purple-500'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse ${
          isDark ? 'bg-purple-600' : 'bg-blue-500'
        }`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse ${
          isDark ? 'bg-indigo-600' : 'bg-indigo-500'
        }`} style={{ animationDelay: '4s' }}></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-30 ${
              isDark ? 'bg-white' : 'bg-white'
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-gentle ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          ></div>
        ))}

        {/* Sparkle effects */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className={`absolute ${isDark ? 'text-blue-400/40' : 'text-yellow-400/60'}`}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              animation: `sparkle-rotate ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          >
            <Sparkles size={8 + Math.random() * 8} />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto -mt-40">
        {/* Animated 404 SVG */}
        <div className={`transition-all duration-1000 ${isAnimating ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
          <svg
            width="400"
            height="200"
            viewBox="0 0 400 200"
            className="mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gradient404" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDark ? "#3B82F6" : "#8B5CF6"} />
                <stop offset="50%" stopColor={isDark ? "#8B5CF6" : "#EC4899"} />
                <stop offset="100%" stopColor={isDark ? "#EC4899" : "#F59E0B"} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* 404 Text */}
            {/* <text
              x="200"
              y="120"
              fontSize="120"
              fontWeight="bold"
              textAnchor="middle"
              fill="url(#gradient404)"
              filter="url(#glow)"
              className="animate-pulse"
            >
              404
            </text> */}

            {/* Decorative elements */}
            <circle cx="80" cy="60" r="8" fill={isDark ? "#60A5FA" : "#A78BFA"} className="animate-bounce" style={{ animationDelay: '0.5s' }} />
            <circle cx="320" cy="60" r="6" fill={isDark ? "#F472B6" : "#FBBF24"} className="animate-bounce" style={{ animationDelay: '1s' }} />
            <circle cx="60" cy="140" r="4" fill={isDark ? "#34D399" : "#10B981"} className="animate-bounce" style={{ animationDelay: '1.5s' }} />
            <circle cx="340" cy="140" r="5" fill={isDark ? "#FBBF24" : "#F59E0B"} className="animate-bounce" style={{ animationDelay: '2s' }} />
          </svg>
        </div>

        {/* Simple & Attractive 404 Illustration */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative">
            {/* Main 404 Circle */}
            <div className={`relative w-80 h-80 mx-auto rounded-full flex items-center justify-center ${
              isDark
                ? 'bg-gradient-to-br from-slate-800 to-gray-900 shadow-2xl'
                : 'bg-gradient-to-br from-white to-gray-100 shadow-2xl'
            }`}>
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
                isDark ? 'bg-blue-500' : 'bg-purple-500'
              }`}></div>

              {/* 404 Text */}
              <div className="relative z-10 text-center">
                <h1 className={`text-8xl font-black bg-gradient-to-r bg-clip-text text-transparent ${
                  isDark
                    ? 'from-blue-400 via-purple-400 to-pink-400'
                    : 'from-purple-500 via-pink-500 to-red-500'
                }`}>
                  404
                </h1>
              </div>

              {/* Floating elements around circle */}
              <div className="absolute inset-0">
                {/* Top */}
                <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full animate-bounce ${
                  isDark ? 'bg-blue-400' : 'bg-purple-400'
                }`} style={{ animationDelay: '0s' }}></div>

                {/* Top Right */}
                <div className={`absolute top-12 right-12 w-3 h-3 rounded-full animate-bounce ${
                  isDark ? 'bg-purple-400' : 'bg-pink-400'
                }`} style={{ animationDelay: '0.5s' }}></div>

                {/* Right */}
                <div className={`absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 rounded-full animate-bounce ${
                  isDark ? 'bg-pink-400' : 'bg-red-400'
                }`} style={{ animationDelay: '1s' }}></div>

                {/* Bottom Right */}
                <div className={`absolute bottom-12 right-12 w-3 h-3 rounded-full animate-bounce ${
                  isDark ? 'bg-cyan-400' : 'bg-orange-400'
                }`} style={{ animationDelay: '1.5s' }}></div>

                {/* Bottom */}
                <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full animate-bounce ${
                  isDark ? 'bg-green-400' : 'bg-yellow-400'
                }`} style={{ animationDelay: '2s' }}></div>

                {/* Bottom Left */}
                <div className={`absolute bottom-12 left-12 w-3 h-3 rounded-full animate-bounce ${
                  isDark ? 'bg-yellow-400' : 'bg-green-400'
                }`} style={{ animationDelay: '2.5s' }}></div>

                {/* Left */}
                <div className={`absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 rounded-full animate-bounce ${
                  isDark ? 'bg-indigo-400' : 'bg-blue-400'
                }`} style={{ animationDelay: '3s' }}></div>

                {/* Top Left */}
                <div className={`absolute top-12 left-12 w-3 h-3 rounded-full animate-bounce ${
                  isDark ? 'bg-rose-400' : 'bg-indigo-400'
                }`} style={{ animationDelay: '3.5s' }}></div>
              </div>
            </div>

            {/* Cute Character */}
            <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center animate-bounce ${
              isDark ? 'bg-yellow-400' : 'bg-yellow-300'
            }`} style={{ animationDuration: '2s' }}>
              <div className="text-2xl">🤔</div>
            </div>
          </div>
        </div>


        {/* Main Content */}
        <div className={`space-y-8 transition-all duration-1000 delay-500 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className={`text-5xl md:text-7xl font-black bg-gradient-to-r bg-clip-text text-transparent ${
              isDark
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-purple-500 via-pink-500 to-red-500'
            }`}>
              Oops!
            </h1>
            <p className={`text-2xl md:text-3xl font-bold transition-colors duration-500 ${
              isDark ? 'text-gray-200' : 'text-white'
            }`}>
              Page Not Found
            </p>
            <p className={`text-lg max-w-xl mx-auto leading-relaxed transition-colors duration-500 ${
              isDark ? 'text-gray-400' : 'text-blue-200'
            }`}>
              The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track! ✨
            </p>
          </div>

          {/* Simple Stats */}
          <div className="flex items-center justify-center space-x-8 md:space-x-12">
            <div className="text-center">
              <div className={`text-3xl md:text-4xl font-black mb-2 ${
                isDark ? 'text-blue-400' : 'text-purple-400'
              }`}>
                500+
              </div>
              <div className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-blue-200'
              }`}>
                Happy Users
              </div>
            </div>

            <div className="text-center">
              <div className={`text-3xl md:text-4xl font-black mb-2 ${
                isDark ? 'text-purple-400' : 'text-pink-400'
              }`}>
                99%
              </div>
              <div className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-blue-200'
              }`}>
                Success Rate
              </div>
            </div>

            <div className="text-center">
              <div className={`text-3xl md:text-4xl font-black mb-2 ${
                isDark ? 'text-pink-400' : 'text-red-400'
              }`}>
                24/7
              </div>
              <div className={`text-sm font-medium ${
                isDark ? 'text-gray-400' : 'text-blue-200'
              }`}>
                Support
              </div>
            </div>
          </div>

          {/* Simple Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
               onClick={()=>{
                navigation.back();
               }}
              className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isDark
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
              }`}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Go Back</span>
            </button>

            <button
              onClick={handleRefresh}
              className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold text-lg border-2 transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10'
                  : 'border-white/30 text-white hover:border-white hover:bg-white/10'
              }`}
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Refresh</span>
            </button>
          </div>

          {/* Simple Footer */}
          <div className={`pt-8 text-center transition-colors duration-500 ${
            isDark ? 'text-gray-400' : 'text-blue-200'
          }`}>
            <p className="text-sm mb-2">
              Need help? We&apos;re here for you! 💙
            </p>
            <p className="text-xs">
              © 2024 Far Western University • Incubation Center
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(5px, -5px) rotate(45deg); }
          50% { transform: translate(-3px, -8px) rotate(90deg); }
          75% { transform: translate(-5px, 3px) rotate(135deg); }
        }
        @keyframes sparkle-rotate {
          0%, 100% { opacity: 0.4; transform: rotate(0deg) scale(1); }
          25% { opacity: 0.8; transform: rotate(90deg) scale(1.1); }
          50% { opacity: 1; transform: rotate(180deg) scale(1.2); }
          75% { opacity: 0.8; transform: rotate(270deg) scale(1.1); }
        }
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8)); }
        }
      `}</style>
    </div>
  )
}