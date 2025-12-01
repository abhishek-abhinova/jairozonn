import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiAward } from "react-icons/fi";

const BookCard = ({ book }) => {
  const { addToCart } = useContext(AppContext);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = Math.round(((book.price - book.offerPrice) / book.price) * 100);
  const rating = book.rating || 4.2;
  const reviews = book.reviews || Math.floor(Math.random() * 500) + 50;

  return (
    <div className="group bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 overflow-hidden h-full flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <Link to={`/book/${book._id}`}>
          <img 
            src={`https://jairozon.onrender.com/images/${book.image}`} 
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
          {book.bestseller && (
            <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
              <FiAward className="w-3 h-3" />
              Best Seller
            </span>
          )}
        </div>
        
        {/* Wishlist */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <FiHeart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Category */}
        <div className="text-xs text-blue-600 font-medium mb-1">
          {book.category}
        </div>
        
        {/* Title */}
        <Link to={`/book/${book._id}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors mb-1">
            {book.title}
          </h3>
        </Link>

        {/* Author */}
        <p className="text-xs text-gray-600 mb-2">by {book.author}</p>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({reviews})</span>
        </div>

        {/* Prime Badge */}
        <div className="flex items-center gap-1 mb-2">
          <FiTruck className="w-3 h-3 text-blue-600" />
          <span className="text-xs text-blue-600 font-medium">Fast Delivery</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3 mt-auto">
          <span className="text-lg font-bold text-gray-900">${book.offerPrice}</span>
          {book.price > book.offerPrice && (
            <span className="text-sm text-gray-500 line-through">${book.price}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button 
          onClick={() => addToCart(book)}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-md transition-colors text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
