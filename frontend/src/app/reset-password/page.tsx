"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Key, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

// Define interfaces for state management
interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
  general?: string; // For API or token errors
}

function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State variables
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get token and email from URL. Using state to hold them.
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    const emailFromUrl = searchParams.get('email');

    if (!tokenFromUrl || !emailFromUrl) {
      setErrors({ general: "Invalid or expired reset link. Please try again." });
    } else {
      setToken(tokenFromUrl);
      setEmail(emailFromUrl);
    }
  }, [searchParams]);

  // Form validation logic
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.password) {
      newErrors.password = 'New password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    // Optional: Add more complex password validation (e.g., regex for numbers/symbols)

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !token || !email) return;

    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          token,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        // Password reset successful
        // Redirect to login page
        if(typeof window !== 'undefined') {
            localStorage.setItem('token', data?.token);
        };

        router.push('/login');
        setIsSuccess(true);
      } else {
        setErrors({ general: data.error || 'Failed to reset password. The link may be invalid or expired.' });
      }
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : "An unexpected error occurred. Please check your connection and try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear the specific error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Password Reset Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            You can now log in with your new password.
          </p>
          <Link
            href="/login"
            className="w-full cursor-pointer bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Go to Login
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Main form view
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Key className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Reset Your Password
          </h1>
          <p className="text-gray-600">
            Create a new, strong password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter new password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-2 text-red-600 text-sm">{errors.password}</p>}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm your new password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-2 text-red-600 text-sm">{errors.confirmPassword}</p>}
          </div>

          {/* General Error Display */}
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !token}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-white ${
              isLoading || !token
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;