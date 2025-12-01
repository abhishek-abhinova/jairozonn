import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import NewsLetter from '../components/NewsLetter';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiStar } from 'react-icons/fi';

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
    { name: 'Mathematics', icon: '📐', color: 'bg-blue-50 text-blue-700' },
    { name: 'Science', icon: '🔬', color: 'bg-green-50 text-green-700' },
    { name: 'History', icon: '📚', color: 'bg-purple-50 text-purple-700' },
    { name: 'English', icon: '📖', color: 'bg-red-50 text-red-700' },
    { name: 'Programming', icon: '💻', color: 'bg-indigo-50 text-indigo-700' },
    { name: 'Business', icon: '💼', color: 'bg-yellow-50 text-yellow-700' }
  ];

  const bestSellers = booksData.slice(0, 8);
  const newArrivals = booksData.slice(8, 16);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Empowering Minds.
              <span className="block text-yellow-300">One Book at a Time.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover thousands of books for every subject and grade
            </p>
            <Link 
              to="/books"
              className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Shop Now
              <FiArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <FiTruck className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Fast Delivery</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <FiShield className="w-5 h-5 text-green-600" />
              <span className="font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <FiRefreshCw className="w-5 h-5 text-purple-600" />
              <span className="font-medium">Easy Returns</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <FiStar className="w-5 h-5 text-yellow-600" />
              <span className="font-medium">Quality Books</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to="/books"
                onClick={() => setSelectedCategory(category.name)}
                className={`${category.color} p-6 rounded-lg text-center hover:shadow-md transition-shadow`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-medium text-sm">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Best Sellers</h2>
          <Link 
            to="/books" 
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
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
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
            <Link 
              to="/books" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
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
