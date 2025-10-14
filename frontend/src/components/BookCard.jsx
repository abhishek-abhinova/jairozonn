import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FiHeart, FiShoppingCart, FiStar, FiEye } from "react-icons/fi";

const BookCard = ({ book }) => {
  const { addToCart } = useContext(AppContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = Math.round(((book.price - book.offerPrice) / book.price) * 100);

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          {discount}% OFF
        </div>
      )}
      
      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        <FiHeart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
      </button>

      {/* Book Image */}
      <div className="relative overflow-hidden bg-gray-50 rounded-t-2xl">
        <Link to={`/book/${book._id}`}>
          <img 
            src={`https://jairozon.onrender.com/images/${book.image}`} 
            alt={book.title}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        
        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            to={`/book/${book._id}`}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-blue-500 hover:text-white transition-colors duration-200"
          >
            <FiEye className="w-5 h-5" />
          </Link>
          <button
            onClick={() => addToCart(book)}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-green-500 hover:text-white transition-colors duration-200"
          >
            <FiShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Book Details */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <FiStar 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-sm font-semibold text-gray-700 ml-2">{book.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({book.reviews} reviews)</span>
        </div>

        {/* Author */}
        <p className="text-sm text-blue-600 font-medium mb-2">by {book.author}</p>
        
        {/* Title */}
        <Link to={`/book/${book._id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
            {book.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-800">${book.offerPrice}</span>
            {book.price > book.offerPrice && (
              <span className="text-lg text-gray-400 line-through">${book.price}</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={() => addToCart(book)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
