import React, { useEffect, useState } from "react";
import { Clock, Package, Zap } from "lucide-react";
import { useOrderStore } from "../store/orderStore";
import OrderCard from "../components/OrderCard";

const getStatusInfo = (status) => {
    switch (status) {
        case "pending": // When order first arrives
            return { label: "New Order", text: "text-yellow-700", bg: "bg-yellow-100", border: "border-yellow-500" };
        case "in-progress": // Owner accepted the order
            return { label: "In Progress", text: "text-orange-700", bg: "bg-orange-100", border: "border-orange-500" };
        case "delivered": // Owner marked as ready (marked as 'delivered' in your API)
            return { label: "Ready for Pickup", text: "text-green-700", bg: "bg-green-100", border: "border-green-500" };
        case "cancelled": // Owner or Customer rejected/cancelled
            return { label: "Rejected/Cancelled", text: "text-red-700", bg: "bg-red-100", border: "border-red-500" };
        default:
            return { label: "Unknown", text: "text-gray-500", bg: "bg-gray-100", border: "border-gray-300" };
    }
};

const OrderCenter = () => {
    const { orders, loading, fetchCustomerOrders } = useOrderStore();
    const [activeTab, setActiveTab] = useState("pending");

    useEffect(() => {
        // Fetch orders on component mount
        fetchCustomerOrders();
    }, [fetchCustomerOrders]);

    // Filter orders by tab using the actual database status
    const filteredOrders = orders.filter((o) => o.status === activeTab);

    // Define tabs using actual database statuses for filtering
    const tabs = [
        { key: "pending", label: "Pending", icon: <Clock size={16} /> },
        { key: "in-progress", label: "Accepted", icon: <Zap size={16} /> },
        { key: "delivered", label: "Ready", icon: <Package size={16} /> },
        { key: "cancelled", label: "Rejected", icon: <Clock size={16} /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* Dashboard Title */}
                <header className="text-center mb-10 border-b pb-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center justify-center gap-3">
                        <Zap size={36} className="text-orange-600" /> Bakery Order Dashboard
                    </h1>
                    <p className="mt-2 text-lg text-gray-500">
                        Manage your incoming, active, and completed customer orders.
                    </p>
                </header>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-2 sm:space-x-4 mb-10 p-2 bg-white rounded-xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
                    {tabs.map((tab) => {
                        const count = orders.filter(o => o.status === tab.key).length;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition duration-300 ease-in-out capitalize border border-transparent ${
                                    activeTab === tab.key
                                        ? "bg-orange-600 text-white shadow-md shadow-orange-300 transform scale-[1.01]"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {tab.label}
                                {count > 0 && (
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                        activeTab === tab.key ? "bg-white text-orange-600" : "bg-orange-100 text-orange-700"
                                    }`}>
                                        {count}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* Content Area */}
                {loading && !orders.length ? (
                    <div className="text-center py-12">
                        <Clock size={32} className="animate-spin text-orange-600 mx-auto" />
                        <p className="mt-4 text-lg text-gray-600">Loading orders...</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-lg border-t-4 border-gray-200 max-w-4xl mx-auto">
                        <Package size={32} className="mx-auto text-gray-400" />
                        <p className="mt-4 text-xl font-medium text-gray-600">
                            No {tabs.find(t => t.key === activeTab)?.label} orders found.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredOrders.map((order) => (
                            <OrderCard key={order._id} order={order} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default OrderCenter;