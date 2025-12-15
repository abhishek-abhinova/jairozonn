import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import BookCard from '../components/BookCard';
import { FiSearch, FiFilter, FiGrid, FiList, FiChevronDown } from 'react-icons/fi';

const Books = () => {
  const { booksData, searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (booksData.length > 0) {
      setLoading(false);
    }
  }, [booksData]);

  const filteredBooks = booksData.filter((book) => {
    const matchesSearch = searchQuery ? 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
    const matchesPrice = book.offerPrice >= priceRange[0] && book.offerPrice <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.offerPrice - b.offerPrice;
      case 'price-high': return b.offerPrice - a.offerPrice;
      case 'name': return a.title.localeCompare(b.title);
      case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
      case 'rating': return (b.rating || 4) - (a.rating || 4);
      default: return 0;
    }
  });

  const categories = ['Mathematics', 'Science', 'History', 'English', 'Programming', 'Business'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600">Books</span>
            {selectedCategory && (
              <>
                <span className="text-gray-400">›</span>
                <span className="text-gray-900 font-medium">{selectedCategory}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-4">
              <h3 className="font-bold text-lg mb-4">Filters</h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Category</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={!selectedCategory}
                      onChange={() => setSelectedCategory('')}
                      className="mr-2"
                    />
                    <span className="text-sm">All Categories</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="mr-2"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Price Range</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange[0] === 0 && priceRange[1] === 100}
                      onChange={() => setPriceRange([0, 100])}
                      className="mr-2"
                    />
                    <span className="text-sm">All Prices</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange[0] === 0 && priceRange[1] === 25}
                      onChange={() => setPriceRange([0, 25])}
                      className="mr-2"
                    />
                    <span className="text-sm">Under $25</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange[0] === 25 && priceRange[1] === 50}
                      onChange={() => setPriceRange([25, 50])}
                      className="mr-2"
                    />
                    <span className="text-sm">$25 to $50</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange[0] === 50 && priceRange[1] === 100}
                      onChange={() => setPriceRange([50, 100])}
                      className="mr-2"
                    />
                    <span className="text-sm">$50 & Above</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setPriceRange([0, 100]);
                  setSearchQuery('');
                  setLocalSearch('');
                }}
                className="w-full text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search books by title, author, or keyword..."
                  value={localSearch}
                  onChange={(e) => {
                    setLocalSearch(e.target.value);
                    setSearchQuery(e.target.value);
                  }}
                  className="w-full pl-10 pr-4 py-3 border-2 border-orange-400 rounded-md focus:outline-none focus:border-orange-500 text-sm"
                />
              </div>
            </div>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedCategory || 'All Books'}
                </h1>
                <p className="text-gray-600 text-sm">
                  {sortedBooks.length} results
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>
              
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Reviews</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="name">Alphabetical: A-Z</option>
                </select>
              </div>
            </div>

            {/* Books Grid */}
            {sortedBooks.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">Try different keywords or remove some filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setLocalSearch('');
                    setSelectedCategory('');
                    setPriceRange([0, 100]);
                    setSortBy('featured');
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedBooks.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Books
