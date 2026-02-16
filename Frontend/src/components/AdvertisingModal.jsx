import React from "react";
import { X, Loader2, Zap, Calendar } from "lucide-react";

const AdvertisingModal = ({ 
    product, 
    isOpen, 
    onClose, 
    handleSubmit, 
    adEndDate, 
    handleAdDateChange, 
    adCost, 
    loading 
}) => {
    if (!isOpen || !product) return null;

    // Helper to get today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0];
    
    // Disable submit button unless conditions are met
    const isSubmitDisabled = !adEndDate || adCost <= 0 || loading;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 rounded-full transition bg-gray-100 hover:bg-red-50"
                    aria-label="Close advertising form"
                >
                    <X size={24} />
                </button>
                <div className="text-center mb-6">
                    <Zap size={40} className="text-orange-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Advertise "{product.name}"</h3>
                    <p className="text-sm text-gray-500 mt-1">Boost your product visibility on the customer homepage.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Price Info */}
                    <div className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded-lg">
                        <p className="font-semibold text-orange-700">Price: <span className="text-lg font-extrabold">5 Birr</span> per day</p>
                    </div>

                    {/* Date Picker */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Calendar size={16} /> End Date
                        </label>
                        <input
                            type="date"
                            value={adEndDate}
                            onChange={handleAdDateChange}
                            min={today}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500 bg-white"
                        />
                    </div>
                    
                    {/* Cost Summary */}
                    <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total Cost:</span>
                            <span className="text-orange-600">{adCost} Birr</span>
                        </div>
                        {adCost > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                                Charging {adCost / 5} day(s) starting today.
                            </p>
                        )}
                        {adCost === 0 && adEndDate && (
                             <p className="text-xs text-red-500 mt-1">
                                Please select a future date to advertise for at least one day.
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitDisabled}
                        className="cp w-full py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                        {loading && <Loader2 className="animate-spin w-5 h-5" />}
                        <span>Confirm and Pay {adCost} Birr</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdvertisingModal;