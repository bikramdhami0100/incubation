"use client";
import Link from "next/link";
import Logo from "../common/Logo";
import {
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  GraduationCap,
  Newspaper,
  Bell,
  Users,
  HelpCircle,

} from "lucide-react";
import { useEffect, useState } from "react";

const quickLinks = [
  {
    name: "Apply Now",
    href: "/fwu/apply",
    icon: <GraduationCap className="text-yellow-400" />,
  },
  {
    name: "Incubation News",
    href: "/fwu/news",
    icon: <Newspaper className="text-yellow-400" />,
  },
  {
    name: "Incubation Notices",
    href: "/fwu/notice",
    icon: <Bell className="text-yellow-400" />,
  },
  {
    name: "Our Faculty",
    href: "/fwu/faculty",
    icon: <Users className="text-yellow-400" />,
  },
  {
    name: "Frequently Asked Questions",
    href: "/fwu/faq",
    icon: <HelpCircle className="text-yellow-400" />,
  },
];

const socialLinks = [
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    href: "https://facebook.com/fwu",
    label: "Facebook",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    href: "https://twitter.com/fwu",
    label: "Twitter",
    color: "bg-sky-500 hover:bg-sky-600",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    href: "https://linkedin.com/company/fwu",
    label: "LinkedIn",
    color: "bg-blue-700 hover:bg-blue-800",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001 12.017.001z" />
      </svg>
    ),
    href: "https://instagram.com/fwu",
    label: "Instagram",
    color:
      "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500",
  },
];

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Fade in animation on load
    setIsVisible(true);

    // Show/hide scroll to top button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if(typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Wave Top Divider */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-24"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      {/* Main Footer Content */}
      <div
        className={`bg-gradient-to-b from-indigo-900 via-indigo-950 to-blue-950 pt-24 pb-8 relative transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Animated Decorative Elements */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full"
          style={{
            filter: "blur(100px)",
            animation: "pulse 8s infinite alternate",
          }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full"
          style={{
            filter: "blur(100px)",
            animation: "float 10s infinite alternate",
          }}
        ></div>
        <div
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-teal-500/5 rounded-full"
          style={{
            filter: "blur(80px)",
            animation: "pulse-slow 15s infinite alternate",
          }}
        ></div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `moveUpSlow ${
                  Math.random() * 15 + 15
                }s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

        {/* Star field effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7,
                animation: `twinkle ${
                  Math.random() * 5 + 3
                }s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Logo & About */}
            <div
              className="space-y-6 transform transition-all duration-700"
              style={{ animationDelay: "0ms" }}
            >
              <div className="transform transition-transform duration-300 hover:scale-105">
                <Logo variant="dark" />
              </div>
              <p className="text-gray-300 leading-relaxed">
                Empowering the next generation of innovators and entrepreneurs
                at Far Western University, Nepal.
              </p>

              {/* Newsletter Signup */}
              <div className="pt-4">
                <h4 className="text-white text-sm font-semibold mb-3">
                  Subscribe to our newsletter
                </h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-blue-900/50 border border-blue-700 rounded-l-md px-4 py-2 text-sm text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
                  />
                  <button className="bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-blue-900 font-bold px-4 py-2 rounded-r-md transition-all duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div
              className="transform transition-all duration-700"
              style={{ animationDelay: "200ms" }}
            >
              <h3 className="text-xl font-bold text-white mb-6 relative">
                Quick Links
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full"></span>
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li
                    key={link.name}
                    className="transform hover:-translate-x-2 transition-transform duration-300"
                  >
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-center group"
                    >
                      <span className="w-8 h-8 bg-blue-800/50 rounded-md flex items-center justify-center mr-3 group-hover:bg-blue-700/70 transition-colors">
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div
              className="transform transition-all duration-700"
              style={{ animationDelay: "400ms" }}
            >
              <h3 className="text-xl font-bold text-white mb-6 relative">
                Contact Us
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full"></span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <div className="w-8 h-8 bg-blue-800/50 rounded-md flex items-center justify-center mr-3 text-teal-400 group-hover:bg-blue-700/70 transition-colors">
                    <MapPin />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    Bheemdatta Municipality-18, Mahendranagar, Kanchanpur, Nepal
                  </span>
                </li>
                <li className="flex items-center group">
                  <div className="w-8 h-8 bg-blue-800/50 rounded-md flex items-center justify-center mr-3 text-teal-400 group-hover:bg-blue-700/70 transition-colors">
                    <Phone />
                  </div>
                  <a
                    href="tel:+97799000000"
                    className="text-gray-300 group-hover:text-white transition-colors"
                  >
                    +977 99-000000
                  </a>
                </li>
                <li className="flex items-center group">
                  <div className="w-8 h-8 bg-blue-800/50 rounded-md flex items-center justify-center mr-3 text-teal-400 group-hover:bg-blue-700/70 transition-colors">
                    <Mail />
                  </div>
                  <a
                    href="mailto:info@fwu.edu.np"
                    className="text-gray-300 group-hover:text-white transition-colors"
                  >
                    info@fwu.edu.np
                  </a>
                </li>
              </ul>

              {/* Google Maps */}
              <div className="mt-6 rounded-lg overflow-hidden shadow-lg border-2 border-blue-700/50 hover:border-teal-400/30 transition-all duration-500 group">
                <div className="bg-gradient-to-r from-blue-800/80 to-indigo-800/80 text-xs text-center py-2 text-gray-300 font-medium flex items-center justify-center">
                  <MapPin className="text-teal-400 mr-2" />
                  <span>Campus Location</span>
                </div>
                <div className="relative h-48 w-full overflow-hidden">
                  {/* Map iframe */}
                 
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3491.073374165811!2d80.17771069999999!3d28.95554810000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a1ad7bf92b64bb%3A0x869ed4d319273a66!2sFar-Western%20University!5e0!3m2!1sen!2snp!4v1751455005658!5m2!1sen!2snp" width="600" height="450" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                  </iframe>

                  {/* Overlay with pulse effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"></div>

                  {/* Pulsing location marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <div className="relative">
                      <div className="w-4 h-4 bg-teal-400 rounded-full"></div>
                      <div className="absolute inset-0 w-4 h-4 bg-teal-400 rounded-full animate-ping opacity-75"></div>
                      <div className="absolute -inset-2 w-8 h-8 bg-teal-400/30 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Get directions button */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <a
                      href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3491.073374165811!2d80.17771069999999!3d28.95554810000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a1ad7bf92b64bb%3A0x869ed4d319273a66!2sFar-Western%20University!5e0!3m2!1sen!2snp!4v1751455005658!5m2!1sen!2snp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-600/90 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded-md flex items-center transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                      Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Social Media */}
            <div
              className="transform transition-all duration-700"
              style={{ animationDelay: "600ms" }}
            >
              <h3 className="text-xl font-bold text-white mb-6 relative">
                Connect With Us
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full"></span>
              </h3>

              {/* Social Media Icons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`${social.color} rounded-lg p-3 flex items-center text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group`}
                  >
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                      {social.icon}
                    </div>
                    <span className="text-sm font-medium">{social.label}</span>
                  </a>
                ))}
              </div>

              {/* Working Hours */}
              <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-700/30">
                <h4 className="text-white text-sm font-semibold mb-3 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Office Hours
                </h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex justify-between">
                    <span> Sunday- Thursday:</span>
                    <span className="text-teal-400">9:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Friday:</span>
                    <span className="text-teal-400">9:00 AM - 1:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="text-yellow-400">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="relative">
            {/* Decorative divider */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
              <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent w-full"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <div className="w-10 h-10 rounded-full bg-indigo-950 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 mt-8">
              {/* Copyright & Credits */}
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <div className="flex items-center justify-center md:justify-start mb-2">
                    <div className="w-8 h-8 bg-indigo-800/50 rounded-full flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-indigo-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                        />
                      </svg>
                    </div>
                    <span className="text-indigo-300 font-semibold">
                      Far Western University
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} Far Western University, Nepal.
                    All Rights Reserved.
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Established by the Act of Parliament, 2010
                  </p>
                </div>

                <div className="flex flex-col items-center md:items-end">
                  <div className="flex items-center space-x-4 mb-4">
                    <Link
                      href="/privacy"
                      className="text-gray-400 hover:text-indigo-300 text-sm transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <span className="text-gray-600">•</span>
                    <Link
                      href="/terms"
                      className="text-gray-400 hover:text-indigo-300 text-sm transition-colors"
                    >
                      Terms of Use
                    </Link>
                    <span className="text-gray-600">•</span>
                    <Link
                      href="/sitemap"
                      className="text-gray-400 hover:text-indigo-300 text-sm transition-colors"
                    >
                      Sitemap
                    </Link>
                  </div>

                  <div className="flex items-center space-x-3">
                    <a
                      href="https://www.facebook.com/fwu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-300 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.twitter.com/fwu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-300 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/fwu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-300 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/fwu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-indigo-300 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001 12.017.001z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Credits */}
              <div className="text-center mt-8 pt-4 border-t border-indigo-800/30">
                <p className="text-gray-500 text-xs flex items-center justify-center">
                  Designed with{" "}
                  <span className="text-red-500 mx-1 animate-pulse">♥</span> by
                  Innovators for Innovators
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-lg transform transition-all duration-500 hover:scale-110 hover:shadow-indigo-500/30 z-50 ${
            showScrollTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
          aria-label="Scroll to top"
        >
          <div className="absolute inset-0 rounded-full bg-indigo-600 animate-ping opacity-20"></div>
          <div className="relative z-10 flex items-center justify-center">
            <ChevronUp className="text-white" />
          </div>
        </button>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes moveUpSlow {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-1000px);
            opacity: 0;
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
