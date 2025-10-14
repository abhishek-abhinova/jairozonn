import React from 'react';

const Logo = ({ size = 'medium', variant = 'default' }) => {
  const sizes = {
    small: { container: 'w-8 h-8', text: 'text-lg', subtext: 'text-xs' },
    medium: { container: 'w-12 h-12', text: 'text-2xl', subtext: 'text-sm' },
    large: { container: 'w-16 h-16', text: 'text-3xl', subtext: 'text-base' }
  };

  const variants = {
    default: 'from-blue-600 via-purple-600 to-indigo-600',
    light: 'from-blue-400 via-purple-400 to-indigo-400',
    dark: 'from-blue-800 via-purple-800 to-indigo-800'
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Modern Logo Icon */}
      <div className={`${sizes[size].container} relative`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${variants[variant]} rounded-2xl shadow-lg transform rotate-3 animate-pulse opacity-20`}></div>
        <div className={`relative ${sizes[size].container} bg-gradient-to-br ${variants[variant]} rounded-2xl shadow-xl flex items-center justify-center overflow-hidden`}>
          {/* Book Icon Background */}
          <svg className="absolute inset-0 w-full h-full p-2 text-white/20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4V20C14 21.1 13.1 22 12 22H4C2.9 22 2 21.1 2 20V4C2 2.9 2.9 2 4 2H12M12 4H4V20H12V4M20 6V18C20 19.1 19.1 20 18 20H16V18H18V8H16V6H18C19.1 6 20 6.9 20 6Z"/>
          </svg>
          
          {/* Letter J */}
          <span className={`${sizes[size].text} font-black text-white relative z-10 drop-shadow-lg`}>
            J
          </span>
          
          {/* Sparkle Effect */}
          <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
        </div>
      </div>
      
      {/* Brand Text */}
      <div className="flex flex-col">
        <h1 className={`${sizes[size].text} font-black bg-gradient-to-r ${variants[variant]} bg-clip-text text-transparent leading-none tracking-tight`}>
          Jairozon
        </h1>
        <p className={`${sizes[size].subtext} text-gray-500 font-medium -mt-1 tracking-wide`}>
          Educational Books
        </p>
      </div>
    </div>
  );
};

export default Logo;