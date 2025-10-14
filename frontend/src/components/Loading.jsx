import React from 'react';

const Loading = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      {/* Modern spinner */}
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin`}>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
        </div>
        <div className={`absolute inset-2 ${size === 'large' ? 'inset-3' : size === 'small' ? 'inset-1' : 'inset-2'} border-2 border-gray-100 rounded-full animate-spin`} style={{animationDirection: 'reverse', animationDuration: '1.5s'}}>
          <div className="absolute inset-0 border-2 border-transparent border-b-pink-500 border-l-yellow-500 rounded-full animate-spin" style={{animationDirection: 'reverse'}}></div>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="text-center">
        <p className="text-gray-600 font-medium animate-pulse">{text}</p>
        <div className="flex justify-center space-x-1 mt-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

// Full page loading overlay
export const LoadingOverlay = ({ isVisible, text = 'Loading...' }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 card-modern">
        <Loading size="large" text={text} />
      </div>
    </div>
  );
};

// Skeleton loader for cards
export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-80 bg-gray-200 skeleton"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded skeleton"></div>
        <div className="h-6 bg-gray-200 rounded skeleton w-3/4"></div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded skeleton w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded skeleton w-1/4"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded-xl skeleton"></div>
      </div>
    </div>
  );
};

export default Loading;