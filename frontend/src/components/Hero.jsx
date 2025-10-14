import { useContext } from 'react';
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { navigate } = useContext(AppContext);

  return (
    <div className="my-4 md:my-8 rounded-2xl md:rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 shadow-2xl p-6 md:p-12 relative overflow-hidden min-h-[400px] md:min-h-[500px] animate-gradient hero-mobile">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-400 opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-400 opacity-15 rounded-full animate-ping"></div>
        <div className="sparkle sparkle-1"></div>
        <div className="sparkle sparkle-2"></div>
        <div className="sparkle sparkle-3"></div>
        <div className="sparkle sparkle-4"></div>
        <div className="sparkle sparkle-5"></div>
      </div>


      {/* Hero Content */}
      <div className="relative z-10 flex-1 text-center lg:text-left">
        <div className="mb-6">
          <span className="inline-block bg-yellow-400 text-gray-800 px-4 py-2 rounded-full text-sm font-bold mb-4 animate-bounce">
            🎓 Educational Excellence Since 2024
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-4 md:mb-6 animate-fade-in">
          Unlock Your
          <span className="block animate-gradient-x blink-underline">
            Learning Potential
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 font-medium leading-relaxed mb-6 md:mb-8 max-w-2xl">
          Discover thousands of educational books curated by experts. 
          <span className="text-yellow-200 font-semibold">From textbooks to reference materials</span> - 
          everything you need for academic success.
        </p>
        
        <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8 justify-center lg:justify-start">
          <div className="flex items-center space-x-2 text-white text-sm md:text-base">
            <span className="w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center text-xs md:text-sm">✓</span>
            <span className="hidden sm:inline">Free Shipping $50+</span>
            <span className="sm:hidden">Free Ship</span>
          </div>
          <div className="flex items-center space-x-2 text-white text-sm md:text-base">
            <span className="w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center text-xs md:text-sm">✓</span>
            <span>Expert Curated</span>
          </div>
          <div className="flex items-center space-x-2 text-white text-sm md:text-base">
            <span className="w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center text-xs md:text-sm">✓</span>
            <span>24/7 Support</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-6 animate-float-up w-full sm:w-auto">
          <button
            onClick={() => {
              navigate("/books");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 text-gray-800 rounded-xl md:rounded-2xl px-6 md:px-8 py-3 md:py-4 shadow-2xl font-bold text-base md:text-lg cursor-pointer transform hover:scale-105 hover:shadow-yellow-400/25 btn-modern btn-glow ripple btn-touch"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>🛍️ Shop Now</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
          
          <button
            onClick={() => navigate('/about')}
            className="group bg-white/10 backdrop-blur-sm hover:bg-white hover:text-gray-800 transition-all duration-300 text-white border-2 border-white/30 rounded-xl md:rounded-2xl px-6 md:px-8 py-3 md:py-4 shadow-2xl font-bold text-base md:text-lg cursor-pointer transform hover:scale-105 btn-modern ripple btn-touch"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>📚 Learn More</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="relative z-10 flex-1 flex justify-center lg:justify-end animate-scale-in">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl blur-3xl opacity-20 animate-pulse shadow-glow"></div>
          <img 
            src={assets.hero_girl} 
            alt="Student Learning" 
            className="relative w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[450px] drop-shadow-2xl animate-fade-in transform hover:scale-105 transition-transform duration-500 float-animate" 
          />
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -left-4 glass-bg rounded-2xl p-3 shadow-xl animate-bounce card-modern">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📖</span>
              <div>
                <p className="text-sm font-bold text-gray-800">1000+</p>
                <p className="text-xs text-gray-600">Books</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-4 -right-4 glass-bg rounded-2xl p-3 shadow-xl animate-bounce card-modern" style={{animationDelay: '0.5s'}}>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-sm font-bold text-gray-800">4.9/5</p>
                <p className="text-xs text-gray-600">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
