import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BsCart2, BsSearch, BsHeart } from "react-icons/bs";
import { FiUser, FiShoppingBag, FiSettings, FiLogOut, FiChevronDown, FiMapPin, FiMenu, FiX, FiTruck, FiShield } from "react-icons/fi";
import { AppContext } from "../context/AppContext";

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
    { name: "Mathematics" },
    { name: "Science" },
    { name: "History" },
    { name: "English" },
    { name: "Programming" },
    { name: "Business" }
  ];

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="bg-gray-800 text-sm py-1 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6 text-gray-300">
            <div className="flex items-center space-x-1">
              <FiTruck className="w-3 h-3" />
              <span>Free delivery on orders over $35</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiShield className="w-3 h-3" />
              <span>100% Original Books</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-300">
            <span>📧 support@jairozon.com</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-14">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 mr-6">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">J</span>
                </div>
                <span className="text-xl font-bold text-white">jairozon</span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="flex">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search books by title, author, or subject..."
                  className="flex-1 px-4 py-2.5 text-gray-900 border-2 border-orange-400 rounded-l-md focus:outline-none focus:border-orange-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-orange-400 hover:bg-orange-500 px-6 py-2.5 rounded-r-md transition-colors"
                >
                  <BsSearch className="w-4 h-4 text-gray-900" />
                </button>
              </form>

              {/* Search Dropdown */}
              {searchDropdown && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-xl mt-1 z-50">
                  <div className="p-2">
                    {searchResults.map((book) => (
                      <Link
                        key={book._id}
                        to={`/book/${book._id}`}
                        onClick={() => {
                          setSearchDropdown(false);
                          setSearchTerm("");
                        }}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded"
                      >
                        <img
                          src={`https://jairozon.onrender.com/images/${book.image}`}
                          alt={book.title}
                          className="w-8 h-10 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 truncate">{book.title}</p>
                          <p className="text-xs text-gray-500">by {book.author}</p>
                          <p className="text-xs text-orange-600 font-semibold">${book.offerPrice}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Account & Lists */}
              <div className="hidden md:block">
                <div className="text-xs text-gray-300">Hello, {user ? user.name?.split(' ')[0] : 'Sign in'}</div>
                <div className="text-sm font-bold text-white">Account & Lists</div>
              </div>

              {/* Cart */}
              <Link to="/cart" className="flex items-center space-x-1 text-white hover:text-orange-400 transition-colors relative">
                <div className="relative">
                  <BsCart2 className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs text-gray-300">Cart</div>
                  <div className="text-sm font-bold">${cartCount > 0 ? (cartCount * 25).toFixed(0) : '0'}</div>
                </div>
              </Link>

              {/* User Account */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdown(!userDropdown)}
                    className="flex items-center space-x-1 text-white hover:text-orange-400 transition-colors"
                  >
                    <FiUser className="w-5 h-5" />
                    <FiChevronDown className={`w-4 h-4 transition-transform ${userDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {userDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-xl border border-gray-100 py-2 z-50">
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
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-white hover:text-orange-400 transition-colors text-sm font-medium"
                >
                  Sign In
                </Link>
              ))

              {/* Mobile Menu Button */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-2 text-white"
              >
                {open ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-6 py-2 overflow-x-auto scrollbar-hide">
            <Link
              to="/books"
              className="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-sm font-medium"
            >
              All Books
            </Link>
            {categories?.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name);
                  navigate('/books');
                }}
                className="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-sm"
              >
                {category.name}
              </button>
            )) || []}
            <span className="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-sm">Best Sellers</span>
            <span className="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-sm">New Releases</span>
            <span className="text-gray-300 hover:text-white transition-colors whitespace-nowrap text-sm">Today's Deals</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700">
          {/* Mobile Search */}
          <div className="px-4 py-4 border-b border-gray-700">
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search books..."
                className="flex-1 px-4 py-2 text-gray-900 border-2 border-orange-400 rounded-l-md focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-r-md transition-colors"
              >
                <BsSearch className="w-4 h-4 text-gray-900" />
              </button>
            </form>
          </div>

          {/* Mobile Navigation */}
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/books"
              onClick={() => setOpen(false)}
              className="block text-white hover:text-orange-400 font-medium py-2"
            >
              All Books
            </Link>
            {categories?.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name);
                  navigate('/books');
                  setOpen(false);
                }}
                className="block text-gray-300 hover:text-white py-2 w-full text-left"
              >
                {category.name}
              </button>
            )) || []}

            {!user && (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-md text-center font-medium mt-4 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;