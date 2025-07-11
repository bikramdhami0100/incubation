import React, { useState, useEffect } from 'react';
import { 
  Loader2, 
  Database,  
  RefreshCw, 
  Clock, 
  Server,
  BarChart3,
} from 'lucide-react';

// Main Loading Component with multiple variants
function LoadingComponents({ 
  type = 'spinner', 
  message = 'Loading...', 
  progress = 0,
  size = 'medium',
  color = 'blue' 
}) {
  const [dots, setDots] = useState<string>('');
  const [pulseCount, setPulseCount] = useState<number>(0);
console.log(pulseCount)
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
      setPulseCount(prev => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses: Record<string, string> = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses: Record<string, string> = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    red: 'text-red-600'
  };

  // Spinner Loader
  if (type === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="relative">
          <Loader2 className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`} />
          <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-transparent border-t-blue-200 rounded-full animate-spin`} 
               style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">{message}{dots}</p>
      </div>
    );
  }

  // Database Loading
  if (type === 'database') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 animate-pulse">
            <Database className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
        </div>
        <p className="mt-4 text-gray-700 font-medium">Fetching data from database{dots}</p>
        <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
          <Server className="w-4 h-4" />
          <span>Connecting to server</span>
        </div>
      </div>
    );
  }

  // Progress Loader
  if (type === 'progress') {
    return (
      <div className="flex flex-col items-center justify-center p-8 w-full max-w-md mx-auto">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full">
            <div 
              className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"
              style={{ animationDuration: '1s' }}
            ></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-blue-600">{progress}%</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    );
  }

  // Skeleton Loader
  if (type === 'skeleton') {
    return (
      <div className="p-6 space-y-4">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="h-20 bg-gray-300 rounded-lg"></div>
            <div className="h-20 bg-gray-300 rounded-lg"></div>
            <div className="h-20 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  // Card Loading
  if (type === 'card') {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-center h-32">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 rounded-full animate-spin">
              <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-r-transparent animate-pulse"></div>
            </div>
            <BarChart3 className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-700 font-medium">{message}</p>
          <div className="flex items-center justify-center mt-2 space-x-1">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className={`w-2 h-2 bg-blue-600 rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Pulse Loader
  if (type === 'pulse') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-ping opacity-30"></div>
          <RefreshCw className="w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
        </div>
        <p className="mt-6 text-gray-700 font-medium text-lg">{message}</p>
        <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Please wait a moment</span>
        </div>
      </div>
    );
  }

  // Default return
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="w-6 h-6 text-blue-600 animate-spin mr-2" />
      <span className="text-gray-600">{message}</span>
    </div>
  );
}

// Demo Component to showcase all loading types
function LoadingDemo({type="spinner"}) {

//   const loadingTypes = [
//     { type: 'spinner', label: 'Spinner Loader', message: 'Loading dashboard data' },
//     { type: 'database', label: 'Database Fetch', message: 'Fetching records' },
//     { type: 'progress', label: 'Progress Loader', message: 'Processing request' },
//     { type: 'skeleton', label: 'Skeleton Loader', message: 'Loading content' },
//     { type: 'card', label: 'Card Loader', message: 'Loading analytics' },
//     { type: 'pulse', label: 'Pulse Loader', message: 'Synchronizing data' }
//   ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <LoadingComponents type={type} message="Saving changes" />
    </div>
  );
}

export default LoadingDemo;