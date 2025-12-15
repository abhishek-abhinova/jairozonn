import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FiHeart, FiStar, FiTruck } from "react-icons/fi";

const BookCard = ({ book }) => {
  const { addToCart } = useContext(AppContext);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = Math.round(((book.price - book.offerPrice) / book.price) * 100);
  const rating = book.rating || 4.2;
  const reviews = book.reviews || Math.floor(Math.random() * 500) + 50;

  return (
    <div className="group bg-white border border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 p-4">
        <Link to={`/book/${book._id}`}>
          <img 
            src={`https://jairozon.onrender.com/images/${book.image}`} 
            alt={book.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          </div>
        )}
        
        {/* Bestseller Badge */}
        {book.bestseller && (
          <div className="absolute top-2 right-2">
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
              #1 Best Seller
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <Link to={`/book/${book._id}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-orange-600 transition-colors mb-1 leading-tight">
            {book.title}
          </h3>
        </Link>

        {/* Author */}
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        
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
          <span className="text-sm text-blue-600 hover:underline cursor-pointer">({reviews})</span>
        </div>

        {/* Prime Delivery */}
        <div className="flex items-center gap-1 mb-3">
          <FiTruck className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-600 font-medium">FREE delivery</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-xl font-bold text-gray-900">${book.offerPrice}</span>
          {book.price > book.offerPrice && (
            <span className="text-sm text-gray-500 line-through">${book.price}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={() => addToCart(book)}
          className="w-full bg-orange-400 hover:bg-orange-500 text-gray-900 font-bold py-2 px-4 rounded-full transition-colors text-sm shadow-sm hover:shadow-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
