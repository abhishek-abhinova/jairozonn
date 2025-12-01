import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BsCart2, BsSearch, BsHeart } from "react-icons/bs";
import { FiUser, FiShoppingBag, FiSettings, FiLogOut, FiChevronDown, FiMapPin, FiMenu, FiX } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import Logo from "./Logo";

const Navbar = () => {
  const { navigate, user, cartCount, logout, booksData, setSearchQuery, setSelectedCategory } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length > 0 && booksData?.length > 0) {
      const results = booksData.filter(book =>
        book?.title?.toLowerCase().includes(value.toLowerCase()) ||
        book?.author?.toLowerCase().includes(value.toLowerCase()) ||
        book?.category?.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setSearchDropdown(true);
    } else {
      setSearchDropdown(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchQuery(searchTerm);
      navigate('/books');
      setSearchDropdown(false);
      setSearchTerm("");
    }
  };

  const categories = [
    { name: "Mathematics", icon: "📐" },
    { name: "Science", icon: "🔬" },
    { name: "History", icon: "📚" },
    { name: "English", icon: "📖" },
    { name: "Programming", icon: "💻" },
    { name: "Business", icon: "💼" }
  ];

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="bg-gray-800 text-sm py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>📧 jairosoft@gmail.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>🚚 Free Shipping on orders $50+</span>
            <span>💳 Secure Payment</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
                <span className="text-gray-900 font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-bold">Jairozon</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search books, authors, subjects..."
                className="flex-1 px-4 py-2 text-gray-900 border-2 border-yellow-400 rounded-l-md focus:outline-none focus:border-yellow-500"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-r-md transition-colors"
              >
                <BsSearch className="w-5 h-5 text-gray-900" />
              </button>
            </form>

            {/* Search Dropdown */}
            {searchDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl mt-2 z-50 animate-scale-in">
                <div className="p-2">
                  <p className="text-xs text-gray-500 mb-2">Search Results</p>
                  {searchResults.map((book) => (
                    <Link
                      key={book._id}
                      to={`/book/${book._id}`}
                      onClick={() => {
                        setSearchDropdown(false);
                        setSearchTerm("");
                      }}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <img
                        src={`https://jairozon.onrender.com/images/${book.image}`}
                        alt={book.title}
                        className="w-10 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800 truncate">{book.title}</p>
                        <p className="text-xs text-gray-500">by {book.author}</p>
                        <p className="text-xs text-blue-600 font-semibold">${book.offerPrice}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 md:space-x-6">
            {/* Wishlist - Hidden on mobile */}
            <button className="hidden sm:flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600 transition-colors">
              <BsHeart className="w-5 h-5" />
              <span className="text-xs">Wishlist</span>
            </button>

            {/* Cart */}
            <Link to="/cart" className="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-600 transition-colors relative">
              <div className="relative">
                <BsCart2 className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold badge-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs hidden sm:block">Cart</span>
            </Link>

            {/* User Account */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {user?.profileImage ? (
                    <img
                      src={`https://jairozon.onrender.com/images/${user.profileImage}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold ${user?.profileImage ? 'hidden' : ''}`}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-medium text-gray-800">Hello,</p>
                    <p className="text-xs text-gray-600">{user?.name?.split(' ')[0] || 'User'}</p>
                  </div>
                  <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${userDropdown ? 'rotate-180' : ''}`} />
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 max-w-xs">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'No email'}</p>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FiUser className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        to="/my-orders"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FiShoppingBag className="w-4 h-4" />
                        <span>My Orders</span>
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FiSettings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdown(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium btn-modern ripple"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2"
            >
              {open ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4 md:space-x-8 py-3 overflow-x-auto scrollbar-hide">
            <Link
              to="/books"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              <span>📚</span>
              <span className="text-sm font-medium">All Books</span>
            </Link>
            {categories?.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name);
                  navigate('/books');
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                <span>{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            )) || []}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          {/* Mobile Search */}
          <div className="px-4 py-4 border-b border-gray-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search books..."
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-lg"
              >
                <BsSearch className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Mobile Navigation */}
          <div className="px-4 py-4 space-y-4">
            <Link
              to="/books"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium py-2"
            >
              <span>📚</span>
              <span>All Books</span>
            </Link>
            {categories?.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name);
                  navigate('/books');
                  setOpen(false);
                }}
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2 w-full text-left"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            )) || []}

            {/* Mobile Wishlist */}
            <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2 w-full text-left">
              <BsHeart className="w-5 h-5" />
              <span>Wishlist</span>
            </button>

            {!user && (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg text-center font-medium mt-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;