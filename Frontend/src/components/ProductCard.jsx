import { ShoppingCart, Tag, Info } from "lucide-react";
import useOrderModalStore from "../store/orderModalStore";

// Added onViewDetails prop
const ProductCard = ({ product, onViewDetails }) => { 
  const { openModal } = useOrderModalStore();

  return (
    <div 
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col justify-between group cursor-pointer"
        // Pass the product to the detail handler when the card container is clicked
        onClick={() => onViewDetails(product)} 
    >
      <img
        src={product?.image || "/placeholder.jpg"}
        alt={product?.name}
        className="w-full h-48 object-cover rounded-lg group-hover:scale-[1.02] transition-transform duration-300"
      />
      <div className="mt-3">
        <h3 className="text-xl font-bold text-gray-900">{product?.name}</h3>
        <p className="text-sm text-gray-600 truncate">{product?.description}</p>

        <div className="flex items-center justify-between mt-3 border-t border-dashed pt-3">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Tag size={14} className="text-orange-400" />
            <span>{product?.category || "Uncategorized"}</span>
          </div>
          <span className="font-bold text-2xl text-orange-600">Br {product?.price}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2 justify-center">
        {/* Order Now Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents card click from opening detail view
            openModal(product);
          }}
          className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl transition text-base font-semibold shadow-md"
        >
          <ShoppingCart size={20} />
          Order
        </button>

        {/* View Details Button (Explicitly calls the detail view handler) */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents card click from opening detail view
            onViewDetails(product);
          }}
          className="flex-shrink-0 border border-gray-300 text-gray-700 p-2 rounded-xl transition hover:bg-gray-100"
          title="View Product Details"
        >
            <Info size={20} />
        </button>
      </div>
      {/* Removed the internal isDetailsOpen dropdown */}
    </div>
  );
};

export default ProductCard;