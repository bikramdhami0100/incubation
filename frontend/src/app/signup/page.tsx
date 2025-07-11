"use client"
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Upload, ChevronDown, Users, Trophy, Rocket, Camera, Check, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

// 1. Define interfaces for complex state objects
interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
  profile_image: File |null;
}

interface Role {
  value: string;
  label: string;
  description: string;

}

// 2. Type the functional component itself
const SignUp: React.FC = () => {
  // 3. Type useState hooks
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: '',
    profile_image: null,
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState<boolean>(false);

  // 4. Type the roles array
  const roles: Role[] = [
      { value: 'admin', label: 'Admin', description: 'Manage users and moderate content' },
      { value: 'superadmin', label: 'Super Admin', description: 'Full system access and control' },
      { value: 'coordinator', label: 'Coordinator', description: 'Coordinate and manage incubation activities' },
    //   { value: 'user', label: 'User', description: 'General access to incubator resources' },
  ];

  // 5. Type function parameters
  const handleInputChange = (field: keyof FormData, value: string): void => {
    console.log(field, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const imageFormData = new FormData();
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0]; // Use optional chaining for safety
    if (file) {
      imageFormData.append('profile_image', file);
      setProfileImage(file);

      setFormData(prev => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        // Assert event.target.result as string, as readAsDataURL produces a string
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

 const handleSubmit = async () => {
  setIsLoading(true);

  try {
    if (!profileImage) {
      throw new Error('Please upload a profile image');
    }

    // Prepare form data using FormData
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('role', formData.role);
    form.append('profile_image', profileImage); // File must be appended like this

     console.log(form, 'this is form');
    const response = await axios.post('http://127.0.0.1:8000/api/signup', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response.data, 'this is response');
  } catch (error) {
    console.error('Signup error:', error);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute top-40 right-40 w-6 h-6 bg-purple-400/30 rounded-full animate-bounce animation-delay-3000"></div>
        <div className="absolute bottom-40 left-1/3 w-5 h-5 bg-blue-400/30 rounded-full animate-bounce animation-delay-5000"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">  
        {/* Left Side - Enhanced Branding */}
        <div className="text-white space-y-8 lg:pr-8">
          {/* Logo and Title */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-8">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl ">
                  {/* <Lightbulb className="w-10 h-10 text-white" /> */}
                    <Image
                                    src={"/circlelogo.png"}
                                    alt="Logo"
                                    width={100}
                                    height={100}
                                    className="h-16 w-16 object-contain rounded-md"
                                    priority
                                    quality={100}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="ml-6">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Far Western University
                </h1>
                <p className="text-xl text-indigo-200 font-semibold">Incubation Center</p>
              </div>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Join the<br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Innovation
              </span><br />
              Revolution
            </h2>
            
            <p className="text-xl text-indigo-200 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Become part of Nepal&#39;s most dynamic startup ecosystem and transform your entrepreneurial dreams into reality
            </p>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2 text-lg">Expert Mentorship</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">Connect with industry veterans and successful entrepreneurs</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2 text-lg">Rapid Acceleration</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">Fast-track your startup with our proven methodology</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2 text-lg">Proven Success</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">Join our community of successful startup founders</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2 text-lg">Innovation Hub</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">Access cutting-edge resources and technologies</p>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Signup Form */}
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-500/20 to-transparent rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">Create Account</h3>
                <p className="text-indigo-200">Join the future of entrepreneurship</p>
              </div>

              <div className="space-y-6">
                {/* Profile Image Upload */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden border-4 border-white/20 shadow-xl">
                      {imagePreview ? (
                        <Image src={imagePreview} alt="Profile" width={96} height={96} className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-white">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                      placeholder="Create a strong password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <label htmlFor="role-select" className="text-sm font-medium text-white">Role</label>
                  <div className="relative">
                    <button
                      id="role-select"
                      type="button"
                      onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                      className="w-full pl-4 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all flex items-center justify-between"
                    >
                      <span className={formData.role ? 'text-white' : 'text-gray-300'}>
                        {formData.role ? roles.find(r => r.value === formData.role)?.label : 'Select your role'}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showRoleDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto custom-scrollbar">
                        {roles.map((role) => (
                          <button
                            key={role.value}
                            type="button"
                            onClick={() => {
                              handleInputChange('role', role.value);
                              setShowRoleDropdown(false);
                            }}
                            className="w-full px-4 py-2.5 text-left hover:bg-white/20 transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center justify-between group hover:scale-[0.98] transform duration-150"
                          >
                            <div className="text-white font-medium">{role.label}</div>
                            {formData.role === role.value && (
                              <Check className="w-5 h-5 text-green-400 animate-fadeIn" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 rounded border-white/20 bg-white/10"
                    required // Added required attribute
                  />
                  <label htmlFor="terms" className="text-sm text-indigo-200 leading-relaxed">
                    I agree to the{' '}
                    <Link href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Privacy Policy</Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed group transform hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Sign In Link */}
              <div className="mt-8 text-center">
                <p className="text-indigo-200">
                  Already have an account?{' '}
                  <Link href="#" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center text-indigo-200 text-sm">
            <p>© 2024 Far Western University Incubation Center</p>
            <p className="mt-1">Empowering Nepal&#39;s Next Generation of Entrepreneurs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;