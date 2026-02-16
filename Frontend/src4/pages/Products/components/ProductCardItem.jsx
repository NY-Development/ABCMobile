import React from "react";
import { Edit, Trash2, Zap } from "lucide-react";

// StockTag Helper Component (moved here from Owner.jsx)
const StockTag = ({ availableQuantity }) => {
    let color, text;
    if (availableQuantity === 0) {
        color = "bg-gray-100 text-gray-700";
        text = "Unavailable";
    } else if (availableQuantity > 5) {
        color = "bg-green-100 text-green-700";
        text = `In Stock: ${availableQuantity}`;
    } else {
        color = "bg-red-100 text-red-700";
        text = `Low Stock: ${availableQuantity}`;
    }
    return (
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${color}`}>
            {text}
        </span>
    );
};

const ProductCardItem = ({ product, onEdit, onDelete, onAdvertise }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all">
            <div className="relative">
                <img
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    className="h-60 w-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.category}
                </span>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 truncate">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <span className="text-2xl font-extrabold text-orange-600">
                        Br {product.price}
                    </span>
                    <StockTag availableQuantity={product.availableQuantity} />
                </div>

                <div className="mt-5 flex justify-end space-x-3">
                    {/* ADVERTISE BUTTON */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onAdvertise(product); }}
                        className="animate-bounce cp p-2 text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 transition shadow-sm"
                        title="Advertise on Home Page"
                    >
                        <Zap size={18} />
                    </button>
                    {/* EDIT BUTTON */}
                    <button
                        onClick={() => onEdit(product)}
                        className="cp p-2 text-orange-600 bg-orange-50 rounded-full hover:bg-orange-100 transition shadow-sm"
                    >
                        <Edit size={18} />
                    </button>
                    {/* DELETE BUTTON */}
                    <button
                        onClick={() => onDelete(product._id)}
                        className="cp p-2 text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition shadow-sm"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCardItem;