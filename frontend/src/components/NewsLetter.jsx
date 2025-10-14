import { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const NewsLetter = ({ onClose }) => {
  const { axios } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      const { data } = await axios.post('/newsletter/subscribe', { email });
      if (data.success) {
        setIsSubmitted(true);
        toast.success('Successfully subscribed to newsletter!');
        setTimeout(() => {
          onClose && onClose();
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
        </div>

        {/* Close Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose && onClose();
          }}
          className="absolute top-6 right-6 z-20 w-12 h-12 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Close Newsletter"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 relative z-10">
          {/* Left Side - Image */}
          <div className="hidden md:flex items-center justify-center p-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              <img 
                src={assets.hero_girl} 
                alt="Newsletter" 
                className="relative w-80 h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-800 px-4 py-2 rounded-full font-bold text-sm animate-bounce shadow-lg">
                📚 Join 10K+ Readers!
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex items-center justify-center p-8 md:p-12">
            <div className="text-center text-white max-w-md">
              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <div className="inline-block bg-yellow-400/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                      <span className="text-yellow-300 font-semibold text-sm">📧 Stay Connected</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                      Never Miss a 
                      <span className="block text-yellow-300 animate-gradient-x">
                        Great Book!
                      </span>
                    </h1>
                    <p className="text-xl text-blue-100 leading-relaxed">
                      Get exclusive access to new arrivals, special discounts, and curated reading recommendations delivered straight to your inbox.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400 transition-all duration-300 text-lg"
                        required
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-2xl">✉️</span>
                      </div>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-800 font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg btn-modern ripple disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                            <span>Subscribing...</span>
                          </>
                        ) : (
                          <>
                            <span>🚀 Subscribe Now</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </>
                        )}
                      </span>
                    </button>
                  </form>

                  <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>No Spam</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>Unsubscribe Anytime</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center animate-scale-in">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Welcome Aboard! 🎉</h2>
                  <p className="text-xl text-blue-100">
                    Thank you for subscribing! Check your inbox for a special welcome offer.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
