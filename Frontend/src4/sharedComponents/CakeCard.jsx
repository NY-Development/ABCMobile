import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../store/themeStore';

/**
 * Renders a card for a single bakery product (cake).
 * @param {object} props
 * @param {string} props.title - The title of the product.
 * @param {string} props.description - A brief description of the product.
 * @param {string} props.imageUrl - URL for the product image placeholder.
 */
const CakeCard = ({ title, description, urlLink, imageUrl, user }) => {
  const { isDark } = useTheme();

  return (
    <div className={`
      rounded-3xl overflow-hidden shadow-xl transform transition-shadow duration-300 transform hover:scale-[1.02]
      border ${isDark ? 'border-gray-700' : 'border-gray-100'}
      ${isDark ? 'bg-gray-800 text-white hover:shadow-2xl' : 'bg-white text-gray-900 hover:shadow-2xl'}
    `}>
      {/* Image Container */}
      <div className="h-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          // Fallback in case placeholder service fails (though unlikely)
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/cccccc/333333?text=ABC+Product"; }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <p className={`text-sm mb-4 overflow-hidden whitespace-nowrap text-ellipsis ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className={`text-2xl font-extrabold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>ETB 350</span>
          <Link
            to={user ? urlLink : 'login'}
            state={{from: "/home"}} 
            className={`
              cp flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-md transition duration-300
              ${isDark ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-orange-600 text-white hover:bg-orange-700'}
            `}
            aria-label={`Add ${title} to cart`}
          >
            <ShoppingCart size={18} className="mr-2" />
            <button className='cp' onClick={() => localStorage.setItem('HomeOrderLink', urlLink)}>Order</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CakeCard;