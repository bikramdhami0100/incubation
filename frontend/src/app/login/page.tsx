"use client"
import React, { useState, useEffect } from 'react'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Zap, Shield } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import Link from 'next/link'
import { setCookie } from '../fwucontext/CustomCookies'

function Login() {
  //  const loginContext = useContext<LoginContextType | undefined>(LoginContext);
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const router = useRouter()

  // This ensures the component is only rendered on the client, preventing hydration errors.
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true)
    try {
     const response = (await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        email,
        password,
      },{
        withCredentials: true
      })).data;
      
      console.log(response)
      
      if (response.ok) {
        if (typeof window !== 'undefined') {
          // loginContext?.setIsLogin(response?.token)
          localStorage.setItem('token',`${response?.token}`);
          setCookie('adminId', response?.id, { days: 7 });
          setCookie('token', response?.token, { days: 7 });
          toast.success('Login successful! Redirecting...')
          router.push('/dashboard');
        }
      } else {
         toast.error(response.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? "Failed to connect to the server." : String(error))
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null // Return null on the server to prevent a flash of unstyled content
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-400">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          ></div>
        ))}
       
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
        {/* Logo and Title */}
        <div className="flex flex-col items-center text-center mb-8 animate-fade-in-up">
            <Link href="/" className="group">
                 {/* <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl bg-white/30 transition-all duration-500 group-hover:scale-110"> */}
                    <Image
                        src={"/logo.png"}
                        alt="Company Logo"
                        width={200}
                        height={200}
                        className=" w-full h-full object-contain rounded-full relative z-10"
                        priority
                    />
                {/* </div> */}
            </Link>
         
        </div>

        {/* Login Form Card */}
        <div className="w-full relative bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 transition-all duration-500 hover:shadow-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className={`text-sm font-semibold text-slate-700 transition-colors duration-300 ${focusedField === 'email' ? 'text-indigo-600' : ''}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-300 ${focusedField === 'email' ? 'text-indigo-600' : ''}`} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-slate-800 placeholder-gray-500 bg-white/50 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
               <div className="flex justify-between items-center">
                    <label htmlFor="password" className={`text-sm font-semibold text-slate-700 transition-colors duration-300 ${focusedField === 'password' ? 'text-indigo-600' : ''}`}>
                        Password
                    </label>
                    <Link
                        href="/forget-password"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300 hover:underline"
                        >
                        Forgot password?
                    </Link>
                </div>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-300 ${focusedField === 'password' ? 'text-indigo-600' : ''}`} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl text-slate-800 placeholder-gray-500 bg-white/50 border border-gray-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-bold text-lg py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/40 disabled:opacity-70 disabled:cursor-not-allowed group disabled:bg-indigo-400 disabled:shadow-none transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                  <span>Loging In...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>LogIn</span>
                  <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          {/* <div className="mt-8 text-center">
            <p className="text-base text-slate-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div> */}
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center space-x-2 opacity-80">
          <Shield className="w-4 h-4 text-slate-600" />
          <span className="text-xs font-medium text-slate-600">
            256-bit SSL Encrypted
          </span>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes sparkle-twinkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Login