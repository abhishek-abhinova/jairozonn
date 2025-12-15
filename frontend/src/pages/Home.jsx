import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import NewsLetter from '../components/NewsLetter';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiStar, FiAward, FiClock } from 'react-icons/fi';

const Home = () => {
  const { setSearchQuery, setSelectedCategory, booksData } = useContext(AppContext);
  const [showNewsletter, setShowNewsletter] = useState(false);
  
  useEffect(() => {
    setSearchQuery("");
    setSelectedCategory("");
    
    const hasShownNewsletter = sessionStorage.getItem('newsletterShown');
    if (!hasShownNewsletter) {
      setTimeout(() => setShowNewsletter(true), 3000);
    }
  }, []);
  
  const handleCloseNewsletter = () => {
    setShowNewsletter(false);
    sessionStorage.setItem('newsletterShown', 'true');
  };

  const categories = [
    { name: 'Competitive Exams', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop' },
    { name: 'School Books', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop' },
    { name: 'Programming', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=200&fit=crop' },
    { name: 'Business', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop' },
    { name: 'Science', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop' },
    { name: 'Mathematics', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop' }
  ];

  const bestSellers = booksData.slice(0, 10);
  const newArrivals = booksData.slice(10, 20);
  const todaysDeals = booksData.slice(5, 15);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              India's Trusted
              <span className="block text-orange-400">Educational Bookstore</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Original books • Fast delivery • Best prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/books"
                className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                Shop Now
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/books?category=Competitive Exams"
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                Explore Categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <FiTruck className="w-6 h-6 text-orange-500" />
              <div>
                <div className="font-semibold text-gray-900">Fast Delivery</div>
                <div className="text-sm text-gray-600">Free shipping on $35+</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <FiShield className="w-6 h-6 text-green-500" />
              <div>
                <div className="font-semibold text-gray-900">100% Original</div>
                <div className="text-sm text-gray-600">Authentic books only</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <FiRefreshCw className="w-6 h-6 text-blue-500" />
              <div>
                <div className="font-semibold text-gray-900">Easy Returns</div>
                <div className="text-sm text-gray-600">30-day return policy</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <FiStar className="w-6 h-6 text-yellow-500" />
              <div>
                <div className="font-semibold text-gray-900">Secure Payment</div>
                <div className="text-sm text-gray-600">Multiple payment options</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="/books"
              onClick={() => setSelectedCategory(category.name)}
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <div className="font-semibold text-gray-900 text-sm">{category.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Today's Deals */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <FiClock className="w-6 h-6 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">Today's Deals</h2>
            </div>
            <Link 
              to="/books" 
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
            >
              See all deals
              <FiArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {todaysDeals.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <FiAward className="w-6 h-6 text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-900">Best Sellers</h2>
          </div>
          <Link 
            to="/books" 
            className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
          >
            View all
            <FiArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {bestSellers.map((book) => (
            <BookCard key={book._id} book={{ ...book, bestseller: true }} />
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">New & Noteworthy</h2>
            <Link 
              to="/books" 
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
            >
              View all
              <FiArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {newArrivals.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      </div>

      {showNewsletter && <NewsLetter onClose={handleCloseNewsletter} />}
    </div>
  );
};

export default Home;
