import React, { useEffect, useState } from "react";
import { getOwnerProducts } from "../services/owner";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductDetail from "../components/ProductDetail";
import OrderModal from "../components/OrderModal";
import { Loader, ArrowLeft } from "lucide-react";
import useOrderModalStore from "../store/orderModalStore";

const categories = [
  "Cake",
  "Bread",
  "Cookies",
  "Cupcake",
  "Dessert",
  "Snacks",
  "Beverages"
];

const OwnerProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  // State to manage the detailed product view
  const [selectedProductForDetail, setSelectedProductForDetail] = useState(null); 
  const {isModalOpen, closeModal} = useOrderModalStore();

  const fetchOwnerProducts = async (ownerId) => {
    setLoading(true);
    const res = await getOwnerProducts(ownerId);
    if (res.success) setProducts(res.products);
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchOwnerProducts(id);
  }, [id]);
  
  const productForModal = useOrderModalStore((state) => state.selectedProduct);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (p) =>
            p.category?.toLowerCase().trim() ===
            activeCategory.toLowerCase().trim()
        );

  // Handler for showing the detail view
  const handleViewDetails = (product) => {
    setSelectedProductForDetail(product);
    // Set the category filter to the product's category for the similar products sidebar
    if (product.category) {
        setActiveCategory(product.category); 
    }
  };
  
  // Handler for closing the detail view
  const handleCloseDetails = () => {
    setSelectedProductForDetail(null);
    setActiveCategory("All"); // Reset category filter when closing
  };
  
  // Handler for selecting a similar product from the detail view
  const handleSelectSimilarProduct = (product) => {
      setSelectedProductForDetail(product);
      // The category filter stays correct because it was set in handleViewDetails
  }

  // --- Conditional Rendering Logic ---
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-48">
          <Loader className="animate-spin text-orange-500" size={32} />
        </div>
      );
    }
    
    if (selectedProductForDetail) {
      // Show the large detail view
      return (
        <ProductDetail
            product={selectedProductForDetail}
            products={products}
            ownerId={id}
            onClose={handleCloseDetails}
            onSelectProduct={handleSelectSimilarProduct}
        />
      );
    }

    // Show the product grid
    return filteredProducts.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            onViewDetails={handleViewDetails} // Pass the handler
          />
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-center p-10 bg-white rounded-xl shadow-md">
        No products found in the "{activeCategory}" category.
      </p>
    );
  };
  
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header/Back Button */}
        <div className="mb-6 flex items-center">
            {selectedProductForDetail && (
                <button
                    onClick={handleCloseDetails}
                    className="cp flex items-center text-orange-600 hover:text-orange-700 font-medium mr-4 transition"
                >
                    <ArrowLeft size={20} className="mr-1" /> Back to Products
                </button>
            )}
            <h1 className="text-3xl font-bold text-gray-900">
                {selectedProductForDetail ? "Product Overview" : "Shop Products"}
            </h1>
        </div>

        {/* Category Filter (Hidden when detail view is active) */}
        {!selectedProductForDetail && (
          <div className="flex flex-wrap gap-3 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            {["All", ...categories].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`cp px-4 py-2 rounded-full border transition text-sm font-medium ${
                  activeCategory === category
                    ? "bg-orange-600 text-white border-orange-600 shadow-md"
                    : "bg-white text-gray-700 hover:bg-orange-50 hover:border-orange-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Products / Detail View Content */}
        {renderContent()}

        {/* Order Modal (uses its own store state) */}
        <OrderModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          product={productForModal}
          ownerId={id}
        />
      </div>
    </div>
  );
};

export default OwnerProducts;