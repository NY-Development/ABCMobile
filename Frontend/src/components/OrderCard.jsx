import React, { useState } from "react";
import { Clock, CheckCircle, XCircle, Bell, MapPin, DollarSign, User, Phone, Package, Info } from "lucide-react";
import { toast } from "react-hot-toast";
import { useOrderStore } from "../store/orderStore";

const ActionModal = ({ isOpen, onClose, title, message, children, onConfirm, confirmText, isDestructive = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl relative">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
                <p className="text-gray-600 mb-6 flex items-start space-x-2">
                    <Info size={20} className={isDestructive ? "text-red-500 mt-0.5" : "text-blue-500 mt-0.5"} />
                    <span>{message}</span>
                </p>
                {children}
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={onClose}
                        className="cp px-4 py-2 bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`cp px-4 py-2 text-white rounded-lg font-semibold transition ${
                            isDestructive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper function (defined in the original file, kept here for self-contained use)
const getStatusInfo = (status) => {
    switch (status) {
        case "pending":
            return { label: "New Order", text: "text-yellow-700", bg: "bg-yellow-100", border: "border-yellow-500" };
        case "in-progress":
            return { label: "In Progress", text: "text-orange-700", bg: "bg-orange-100", border: "border-orange-500" };
        case "delivered":
            return { label: "Ready", text: "text-green-700", bg: "bg-green-100", border: "border-green-500" };
        case "cancelled":
            return { label: "Rejected/Cancelled", text: "text-red-700", bg: "bg-red-100", border: "border-red-500" };
        default:
            return { label: "Unknown", text: "text-gray-500", bg: "bg-gray-100", border: "border-gray-300" };
    }
};

const OrderCard = ({ order }) => {
    const { updateOrderStatus, markAsReady, fetchCustomerOrders } = useOrderStore();

    const [modalState, setModalState] = useState({ 
        show: false, 
        type: null // 'accept', 'reject', 'ready'
    });
    const [bakingTimeInput, setBakingTimeInput] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");

    const { label: statusLabel, border: statusBorder } = getStatusInfo(order.status);
    
    // Frontend UI Formatting
    const formattedDate = new Date(order.createdAt).toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'ETB', minimumFractionDigits: 2
    }).format(order.totalPrice || 0);

    const customerInfo = order.customer;
    const productName = order.product?.name || 'Unknown Product';

    // --- Interaction Handlers ---

    // 1. Accept Order (Pending -> In Progress)
    const handleAcceptConfirm = async () => {
        if (!bakingTimeInput) {
            return toast.error("Please enter estimated completion time first!");
        }
        try {
            await updateOrderStatus(order._id, "in-progress", bakingTimeInput);
            toast.success("Order accepted! Customer notified of estimated time.");
            setModalState({ show: false, type: null });
            setBakingTimeInput("");
        } catch (error) {
            toast.error("Failed to accept order.");
        }
    };

    // 2. Reject Order (Pending -> Cancelled)
    const handleRejectConfirm = async () => {
        try {
            await updateOrderStatus(order._id, "cancelled");
            toast.success("Order rejected successfully.");
            setModalState({ show: false, type: null });
        } catch (error) {
            toast.error("Failed to reject order.");
        }
    };

    // 3. Mark as Ready (In Progress -> Delivered)
    const handleReadyConfirm = async () => {
        if (!pickupLocation) {
            return toast.error("Please provide a pickup location for the customer.");
        }
        try {
            // Note: API seems to use 'delivered' for ready, so we pass that status to the specific markAsReady endpoint
            await markAsReady(order._id, { pickupLocation, mapUrl: "" }); // mapUrl is optional/omitted here for simplicity
            toast.success("Order marked as ready! Customer notified.");
            setModalState({ show: false, type: null });
            setPickupLocation("");
        } catch (error) {
            toast.error("Failed to mark order as ready.");
        }
    };

    const renderActionArea = () => {
        switch (order.status) {
            case "pending":
                return (
                    <div className="pt-4 border-t border-gray-100 mt-auto space-y-3">
                        <p className="text-xs text-gray-500">
                            Set the estimated time needed to prepare the order.
                        </p>
                        <div className="flex items-center gap-3">
                            <Clock size={20} className="text-orange-500 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Completion time (e.g., 2 hours)"
                                value={bakingTimeInput}
                                onChange={(e) => setBakingTimeInput(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            />
                        </div>
                        <div className="flex justify-between gap-3">
                            <button
                                onClick={() => {bakingTimeInput ? setModalState({ show: true, type: 'accept' }) : toast.error('Please insert time first.')}}
                                className={`${bakingTimeInput ? 'cp' : 'cursor-not-allowed'} flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-md shadow-green-200`}
                                // disabled={!bakingTimeInput}
                            >
                                <CheckCircle size={18} /> Accept
                            </button>
                            <button
                                onClick={() => setModalState({ show: true, type: 'reject' })}
                                className="cp flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md shadow-red-200"
                            >
                                <XCircle size={18} /> Reject
                            </button>
                        </div>
                    </div>
                );
            case "in-progress":
                return (
                    <div className="pt-4 border-t border-gray-100 mt-auto space-y-3">
                        <p className="text-sm text-orange-800 font-medium flex items-center gap-2 mb-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <Bell size={18} className="text-orange-600" /> Estimated Pickup:
                            <span className="font-bold">{new Date(order.estimatedCompletionTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) || 'N/A'}</span>
                        </p>
                        <input
                            type="text"
                            placeholder="Pickup Location (e.g., Main Counter)"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                        />
                        <button
                            onClick={() => setModalState({ show: true, type: 'ready' })}
                            className="w-full py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition shadow-lg shadow-orange-300"
                            disabled={!pickupLocation}
                        >
                            Mark as Ready (Finalize)
                        </button>
                    </div>
                );
            case "delivered":
                return (
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                        <p className="text-green-800 font-bold flex items-center justify-center gap-3 text-center bg-green-50 p-3 rounded-lg border border-green-200">
                            <MapPin size={20} className="text-green-600" /> Ready for Pickup!
                        </p>
                        <p className="text-sm text-gray-500 text-center mt-2">
                            Pickup location: {order.pickupLocation || 'N/A'}
                        </p>
                    </div>
                );
            case "cancelled":
                return (
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                        <p className="text-red-800 font-bold flex items-center justify-center gap-3 text-center bg-red-50 p-3 rounded-lg border border-red-200">
                            <XCircle size={20} className="text-red-600" /> Order Rejected/Cancelled
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    // --- Modal Renderer ---
    const renderModal = () => {
        switch (modalState.type) {
            case 'accept':
                return (
                    <ActionModal
                        isOpen={modalState.show}
                        onClose={() => setModalState({ show: false, type: null })}
                        title="Confirm Acceptance"
                        message={`You are accepting the order for "${productName}". Estimated time: after ${bakingTimeInput} hours.`}
                        onConfirm={handleAcceptConfirm}
                        confirmText="Accept Order"
                    />
                );
            case 'reject':
                return (
                    <ActionModal
                        isOpen={modalState.show}
                        onClose={() => setModalState({ show: false, type: null })}
                        title="Confirm Rejection"
                        message={`Are you sure you want to reject the order for "${productName}"? This action cannot be undone.`}
                        onConfirm={handleRejectConfirm}
                        confirmText="Reject Order"
                        isDestructive={true}
                    />
                );
            case 'ready':
                return (
                    <ActionModal
                        isOpen={modalState.show}
                        onClose={() => setModalState({ show: false, type: null })}
                        title="Mark as Ready"
                        message={`You are marking "${productName}" as ready. The customer will be notified to pick it up at: ${pickupLocation}.`}
                        onConfirm={handleReadyConfirm}
                        confirmText="Mark as Ready"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className={`bg-white rounded-xl shadow-xl p-6 flex flex-col justify-between border-t-4 ${statusBorder} transition duration-300 hover:shadow-2xl hover:-translate-y-0.5`}>
            <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-4 pb-2 border-b border-gray-100">
                    <h3 className="font-extrabold text-gray-900 text-xl truncate pr-4">
                        {productName} (x{order.quantity})
                    </h3>
                    <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusInfo(order.status).text} ${getStatusInfo(order.status).bg} capitalize flex-shrink-0`}
                    >
                        {statusLabel}
                    </span>
                </div>

                {/* Details */}
                <div className="text-sm text-gray-700 space-y-2 mb-4">
                    <p className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        <span className="font-semibold text-gray-800">Customer:</span> {customerInfo?.name || 'N/A'}
                    </p>
                    <p className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-500" />
                        <span className="font-semibold text-gray-800">Phone:</span> {customerInfo?.phone || 'N/A'}
                    </p>
                    <p className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className="font-semibold text-gray-800">Order Date:</span> {formattedDate}
                    </p>
                    <p className="flex items-center gap-2 text-lg font-bold">
                        <DollarSign size={18} className="text-green-600" />
                        <span className="font-semibold text-gray-800">Total:</span> {formattedAmount}
                    </p>
                </div>
            </div>

            {/* Action Area */}
            {renderActionArea()}
            
            {/* Confirmation Modals */}
            {renderModal()}
        </div>
    );
};

export default OrderCard;