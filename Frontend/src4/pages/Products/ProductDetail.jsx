
import React from 'react';
import { ShoppingCart, Tag, X, Star, Info, Package, Sparkles } from 'lucide-react';
import useOrderModalStore from '../store/orderModalStore';

// Helper component for similar products (Sidebar)
const SimilarProductCard = ({ product, onSelectProduct }) => (
    <div 
        className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer flex items-center gap-3 border border-gray-100"
        onClick={() => onSelectProduct(product)}
    >
        <img 
            src={product.image || "/placeholder.jpg"} 
            alt={product.name} 
            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
        />
        <div className='flex-1 min-w-0'>
            <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
            <p className="text-sm font-bold text-orange-600">Br {product.price}</p>
        </div>
    </div>
);

// New Horizontal Product Card for 'Other Products' (Bottom Section)
const OtherProductHorizontalCard = ({ product, onSelectProduct }) => (
    <div 
        className="min-w-[250px] bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition cursor-pointer border border-gray-100"
        onClick={() => onSelectProduct(product)}
    >
        <img 
            src={product.image || "/placeholder.jpg"} 
            alt={product.name} 
            className="w-full h-32 object-cover rounded-lg mb-3"
        />
        <h4 className="font-bold text-gray-900 truncate">{product.name}</h4>
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <Tag size={12} className="text-blue-400" /> {product.category || "Uncategorized"}
        </p>
        <span className="font-bold text-xl text-orange-600 mt-2">Br {product.price}</span>
    </div>
);


const ProductDetail = ({ product, products, ownerId, onClose, onSelectProduct }) => {
    const { openModal } = useOrderModalStore();

    if (!product) return null;
    
    const currentCategory = product.category?.toLowerCase().trim();

    // 1. Filter similar products (same category, but not the current product)
    const similarProducts = products.filter(
        p => 
            p.category?.toLowerCase().trim() === currentCategory && 
            p._id !== product._id
    );
    
    // 2. Filter other products (different category) and limit the display
    const otherCategoryProducts = products
        .filter(p => p.category?.toLowerCase().trim() !== currentCategory)
        .slice(0, 8); // Display up to 8 items from other categories

    return (
        <div className="bg-white p-6 rounded-2xl shadow-2xl relative transition-all duration-300">
            
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-red-100 hover:text-red-600 transition z-10 shadow-md"
                title="Close Details"
            >
                <X size={24} />
            </button>

            {/* --- Main Grid Layout --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                
                {/* --- Main Product Detail (Col 1 & 2) --- */}
                <div className="lg:col-span-2">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Image Area */}
                        <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg bg-gray-50">
                            <img 
                                src={product.image || "/placeholder.jpg"} 
                                alt={product.name} 
                                className="w-full h-80 object-cover"
                            />
                        </div>

                        {/* Text Details Area */}
                        <div className="w-full md:w-1/2 space-y-4">
                            <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1 font-semibold">
                                    <Tag size={16} className="text-orange-500" /> Category: {product.category || "N/A"}
                                </span>
                                <span className="flex items-center gap-1 font-semibold text-yellow-600">
                                    <Star size={16} /> 4.5 (Rating)
                                </span>
                            </div>

                            <p className="text-3xl font-bold text-orange-600 border-b pb-4">
                                Br {product.price}
                            </p>

                            <p className="text-gray-700 leading-relaxed italic">
                                {product.description || "No detailed description provided for this product."}
                            </p>

                            {/* Additional Info Grid */}
                            <div className="grid grid-cols-2 gap-3 text-sm pt-4 border-t border-gray-200">
                                <InfoItem label="Size" value={product.size || 'Standard'} />
                                <InfoItem label="Color/Flavor" value={product.color || 'N/A'} />
                                <InfoItem label="Shape" value={product.shape || 'N/A'} />
                                <InfoItem label="Available Qty" value={product.availableQuantity || 'Inquire'} />
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => openModal(product)}
                                className="w-full flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl transition text-xl font-bold mt-6 shadow-lg transform hover:scale-[1.01]"
                            >
                                <ShoppingCart size={24} />
                                Add to Order
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Similar Products Sidebar (Col 3: Same Category) --- */}
                <div className="lg:col-span-1 border-l pl-6 border-gray-100 pt-8 lg:pt-0">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Package size={20} className="text-orange-500" /> More like this
                    </h3>
                    
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {similarProducts.length > 0 ? (
                            similarProducts.map(p => (
                                <SimilarProductCard 
                                    key={p._id} 
                                    product={p} 
                                    onSelectProduct={onSelectProduct}
                                />
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">No other products found in the "{product.category}" category.</p>
                        )}
                    </div>
                </div>

            </div>
            
            {/* ---------------------------------------------------- */}
            {/* --- NEW: Products from Other Categories (Bottom) --- */}
            {/* ---------------------------------------------------- */}
            {otherCategoryProducts.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <Sparkles size={24} className="text-blue-500" /> You might also like
                    </h3>
                    
                    <div className="flex overflow-x-auto space-x-4 pb-4">
                        {otherCategoryProducts.map(p => (
                            <OtherProductHorizontalCard
                                key={p._id}
                                product={p}
                                onSelectProduct={onSelectProduct}
                            />
                        ))}
                    </div>
                </div>
            )}
            {/* ---------------------------------------------------- */}
        </div>
    );
};

const InfoItem = ({ label, value }) => (
    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
        <span className="font-medium text-gray-500">{label}:</span>
        <span className="font-semibold text-gray-800">{value}</span>
    </div>
);


export default ProductDetail;