"use client"
import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

function ForgetPassword() {
  const [formData, setFormData] = useState<FormData>({
    email: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forget-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const data=await response.json();
      console.log(data)
      if (data.ok) {
        setIsSubmitted(true);
        //  if(typeof window !== 'undefined') {
        //   localStorage.setItem('forgetToken', data?.token)
        //  }
      } else {
        setErrors({ email: data.error || 'Failed to send reset email' });
      }
      // console.log(response)
      
    } catch (error) {
      setErrors({ email:error instanceof Error ? error.message : String(error) });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Email Sent Successfully!
          </h1>
          
          <p className="text-gray-600 mb-8">
            We&apos;ve sent a password reset link to <span className="font-semibold text-gray-900">{formData.email}</span>. 
            Please check your email and follow the instructions to reset your password.
          </p>
          
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full cursor-pointer bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reset Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <div className="mt-2 flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className={` cursor-pointer w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
            } text-white`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Reset Link
              </>
            )}
          </button>
        </div>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <Link
            href={"/login"}
            className= "text-indigo-600 cursor-pointer hover:text-indigo-800 font-medium transition-colors duration-200 flex items-center justify-center gap-1 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;