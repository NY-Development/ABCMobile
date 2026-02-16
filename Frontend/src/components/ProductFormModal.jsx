import React from "react";
import { X, Loader2 } from "lucide-react";

const categories = ["Cookies", "Cake", "Waffles", "Macarons", "Snacks", "Beverages"];

const ProductFormModal = ({
    isOpen,
    onClose,
    isEditing,
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
    loading,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
                    aria-label="Close form"
                >
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                    {isEditing ? "Edit Product" : "Add New Product"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 1. Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    {/* 2. Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    {/* 3. Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500 bg-white"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* 4. Price & Quantity (Inline Group) */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Price (Br)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Available Quantity</label>
                            <input
                                type="number"
                                name="availableQuantity"
                                value={formData.availableQuantity}
                                onChange={handleChange}
                                required
                                min="0"
                                step="1"
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                    </div>

                    {/* 5. Attributes (Size, Color, Shape) */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Size</label>
                            <input
                                type="text"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Color</label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Shape</label>
                            <input
                                type="text"
                                name="shape"
                                value={formData.shape}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                    </div>

                    {/* 6. Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {isEditing ? "Update Image (Optional)" : "Product Image"}
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            required={!isEditing}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                        />
                        {isEditing && (
                            <p className="mt-2 text-xs text-gray-500">
                                Leave blank to keep the current image.
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg hover:bg-orange-700 transition duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                            {loading && <Loader2 className="animate-spin w-5 h-5" />}
                            <span>{isEditing ? "Save Changes" : "Add Product"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFormModal;