import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Confirm Deletion</h3>
                <p className="text-gray-500 mb-6">
                    Are you sure you want to delete this product? This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onClose}
                        className="cp px-5 py-2 bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="cp px-5 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;