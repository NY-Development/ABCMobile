import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { 
    PlusCircle, 
    Loader2 
} from "lucide-react"; 
import { useProductStore } from "../../store/productStore";
import { useAuth } from "../context/AuthContext";
import { useOrderStore } from "../store/orderStore";
import ProductCardItem from "../Products/components/ProductCardItem";
import ProductFormModal from "../components/ProductFormModal";
import AdvertisingModal from "../components/AdvertisingModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import useAdvertiseStore from "../../store/advertiseStore";
import { useNavigate } from "react-router-dom";


const initialFormData = {
    name: "",
    description: "",
    category: "All",
    price: "",
    availableQuantity: "",
    size: "",
    color: "",
    shape: "",
    image: null,
};

const Owner = () => {
    const {
        products,
        loading,
        fetchOwnerProducts,
        addNewProduct,
        updateExistingProduct,
        removeProduct,
    } = useProductStore();

    const { fetchCustomerOrders } = useOrderStore();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

    // const [filteredCategory, setFilteredCategory] = useState("All");
    const [filteredCategories, setFilteredCategories] = useState([]);

    const [sortedProducts, setSortedProducts] = useState("default");

    // Advertising State
    const [advertisingModal, setAdvertisingModal] = useState({ show: false, product: null });
    const [adEndDate, setAdEndDate] = useState('');
    const [adCost, setAdCost] = useState(0);
    const [isSubmittingAd, setIsSubmittingAd] = useState(false); 

    const {fetchActiveAds, requestAdvertise, getAdvertRequestInfo, uploadPaymentScreenshot} = useAdvertiseStore();
    // Fetch products and orders
    useEffect(() => {
        if (user && user._id) {
            fetchOwnerProducts(user._id);
            fetchCustomerOrders()
                .then((res) => setOrders(res))
                .catch(() => toast.error("Failed to fetch orders."));
        }
    }, [user, fetchOwnerProducts, fetchCustomerOrders]);

    // --- Product Form Handlers ---
    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileChange = (e) =>
        setFormData({ ...formData, image: e.target.files[0] });

    const closeForm = useCallback(() => {
        setShowForm(false);
        setIsEditing(false);
        setFormData(initialFormData);
    }, []);

    const handleEdit = (product) => {
        setIsEditing(true);
        setFormData({
            ...product,
            price: product.price.toString(),
            availableQuantity: product.availableQuantity.toString(),
            image: null,
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "image" && value) formDataToSend.append(key, value);
        });
        if (formData.image) formDataToSend.append("image", formData.image);

        try {
            if (isEditing) {
                await updateExistingProduct(formData._id, formDataToSend);
                toast.success("Product updated successfully!");
            } else {
                await addNewProduct(formDataToSend);
                toast.success("Product added successfully!");
            }
            closeForm();
        } catch (error) {
            console.error("Submit Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };
    // ----------------------------
    
    // --- Delete Handlers ---
    const confirmDelete = (id) => {
        const activeOrder = orders?.some(
            (order) =>
                order.product?._id === id &&
                (order.status === "pending" || order.status === "in-progress")
        );

        if (activeOrder) {
            toast.error(
                "You can't delete this product because an ordering process hasn't been completed."
            );
            return;
        }

        setDeleteModal({ show: true, id });
    };

    const handleDelete = async () => {
        try {
            await removeProduct(deleteModal.id);
            toast.success("Product deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete product.");
        } finally {
            setDeleteModal({ show: false, id: null });
        }
    };
    // ----------------------
    
    // --- Advertising Handlers ---
    const openAdvertisingModal = (product) => {
        setAdvertisingModal({ show: true, product });
        setAdEndDate('');
        setAdCost(0);
    };

    const closeAdvertisingModal = () => {
        setAdvertisingModal({ show: false, product: null });
        setAdEndDate('');
        setAdCost(0);
        setIsSubmittingAd(false);
    };

    const handleAdDateChange = (e) => {
        const endDateString = e.target.value;
        setAdEndDate(endDateString);
        
        if (endDateString) {
            const startDate = new Date();
            startDate.setHours(0, 0, 0, 0); 
            const endDate = new Date(endDateString);
            endDate.setHours(0, 0, 0, 0); 

            // Calculate days: difference + 1 day (to include today)
            const timeDiff = endDate.getTime() - startDate.getTime();
            let dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
            
            dayDiff = Math.max(0, dayDiff); 
            
            setAdCost(dayDiff * 5); // 5 Birr per day
        } else {
            setAdCost(0);
        }
    };

    const handleAdvertiseSubmit = async (e) => {
        e.preventDefault();
        if (adCost <= 0) {
            toast.error("Please select a valid end date to proceed.");
            return;
        }
        
        setIsSubmittingAd(true);
        try {
            const res = await requestAdvertise(advertisingModal?.product._id, adEndDate);
            toast.success(res?.message || "Advert Request Sent Successfully."); // Notify user of successful request
            const adId = res?.advertId;
            localStorage.setItem('AdInfo', adId);
            console.log(adId)
            navigate('/screenshot'); // use the navigate function from react-router
        } catch (error) {
            console.error("Advertising Error:", error);
            toast.error(error.response?.data?.message || "Failed to submit advertisement request.");
        } finally {
            setIsSubmittingAd(false);
            closeAdvertisingModal();
        }
    };

    const handleCategoryChange = (e) => {
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setFilteredCategories(selected);
    };

    // const filteredProducts =
    //     filteredCategory === "All"
    //         ? products
    //         : products.filter((p) => p.category === filteredCategory);
    const filteredProducts = filteredCategories.length === 0 || filteredCategories.includes("All")
        ? products
        : products.filter((p) => filteredCategories.includes(p?.category));

    const productSorted = (() => {
    if (sortedProducts === "default") {
        // Return products sorted by most recent at the top
        return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    useEffect(() => {
        console.log(products)
    }, [])
    switch (sortedProducts) {
        case "alphabetical-asc":
        return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
        
        case "alphabetical-desc":
        return [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));

        case "recent":
        return [...filteredProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        case "earliest":
        return [...filteredProducts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        case "size-greater-than-5":
        return filteredProducts.filter(p => p?.size > 5);

        default:
        return filteredProducts;
    }
    })();

    // --- Early Return Conditions ---
    if (!user)
        return (
            <div className="text-center py-20 text-gray-600 font-bold">
                Loading user...
            </div>
        );

    if (!user?.ownerInfo?.companyVerified) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 max-w-md text-center">
                    <h2 className="text-xl font-semibold text-orange-600 mb-4">
                        Verification in Progress
                    </h2>
                    <p className="text-gray-700">
                        Your company information is currently being reviewed by our admin
                        team. Please wait for a notification through your email and phone.
                        Thank you for your patience!
                    </p>
                </div>
            </div>
        );
    }

    // --- Main Render ---
    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            <main className="max-w-7xl mx-auto px-4 py-12">
                
                {/* Header and Add Button */}
                <div className="flex justify-between items-center mb-10 border-b pb-4">
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        Product <span className="text-orange-600">Inventory</span>
                    </h2>
                    {(filteredProducts.length > 0 || !loading) && (
                        <button
                            onClick={() => {
                                closeForm();
                                setShowForm(true);
                            }}
                            className="cp flex font-extrabold items-center space-x-2 p-2 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 scale-100 hover:scale-120 transition-all"
                            disabled={loading}
                        >
                            <PlusCircle size={25} />
                        </button>
                    )}
                </div>
                <div className="flex space-x-4">
                {/* Category Filter */}
                <div className="mb-6">
                    <select
                        value={filteredCategories}
                        // multiple={true}
                        onChange={handleCategoryChange}
                        className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
                    >
                        <option value="All">All Categories</option>
                        <option value="Cake">Cake</option>
                        <option value="Cookies">Cookies</option>
                        <option value="Waffles">Waffles</option>
                        <option value="Macarons">Macarons</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Beverages">Beverages</option>
                    </select>
                </div>
                {/* Category Filter */}
                <div className="mb-6">
                    <select
                        value={productSorted}
                        onChange={(e) => setSortedProducts(e.target.value)}
                        className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
                    >
                        <option value="default">Default</option>
                        <option value="alphabetical-asc">A-Z</option>
                        <option value="alphabetical-desc">Z-A</option>
                        <option value="recent">Recent</option>
                        <option value="earliest">Earliest</option>
                        <option value="size-greater-than-5">Stock Available</option>
                    </select>
                </div>
                </div>
                {/* Product Grid */}
                {loading && !products.length ? (
                    <p className="text-center py-10 text-gray-500">
                        <Loader2 className="animate-spin text-orange-500 mx-auto" size={32} />
                        Loading...
                    </p>
                ) : filteredProducts.length === 0 && !loading ? (
                    <div className="flex flex-col items-center py-20 bg-white rounded-xl shadow-md">
                        <p className="text-xl text-gray-500 mb-4">
                            You have no products yet.
                        </p>
                        <button
                            onClick={() => {
                                closeForm();
                                setShowForm(true);
                            }}
                            className="cp flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-full font-semibold shadow-lg hover:bg-orange-700 transition"
                        >
                            <PlusCircle size={20} />
                            <span>Add Product</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {productSorted.map((item) => (
                            <ProductCardItem
                                key={item._id}
                                product={item}
                                onEdit={handleEdit}
                                onDelete={confirmDelete}
                                onAdvertise={openAdvertisingModal}
                            />
                        ))}
                    </div>
                )}
            </main>
            
            {/* Product Add/Edit Form Modal */}
            <ProductFormModal
                isOpen={showForm}
                onClose={closeForm}
                isEditing={isEditing}
                formData={formData}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
                loading={loading}
            />
            
            {/* Advertising Modal */}
            <AdvertisingModal
                product={advertisingModal.product}
                isOpen={advertisingModal.show}
                onClose={closeAdvertisingModal}
                handleSubmit={handleAdvertiseSubmit}
                adEndDate={adEndDate}
                handleAdDateChange={handleAdDateChange}
                adCost={adCost}
                loading={isSubmittingAd}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={deleteModal.show}
                onClose={() => setDeleteModal({ show: false, id: null })}
                onConfirm={handleDelete}
            />

        </div>
    );
};

export default Owner;