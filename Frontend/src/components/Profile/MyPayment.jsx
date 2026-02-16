import { CreditCard, PlusCircle } from "lucide-react";

const MyPayment = () => {
  return (
    <div className="space-y-6 p-4 sm:p-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Methods</h2>

      {/* Current Payment Status Card */}
      <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <CreditCard className="h-6 w-6 text-orange-600" />
          <div>
            <p className="font-medium text-lg text-gray-800">Default Payment Method</p>
            <p className="text-sm text-gray-500">
              No active payment method on file.
            </p>
          </div>
        </div>
      </div>

      {/* Add New Method Button */}
      <button className="flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition-colors border border-orange-300 px-4 py-2 rounded-lg bg-orange-50/50 hover:bg-orange-100">
        <PlusCircle className="h-5 w-5" />
        Add New Card
      </button>
      
      {/* Example Saved Card Placeholder */}
      <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <CreditCard className="h-6 w-6 text-gray-500" />
          <div>
            <p className="font-medium">Visa ending in 4242</p>
            <p className="text-xs text-gray-500">Expires 09/27</p>
          </div>
        </div>
        <button className="text-sm text-red-500 hover:text-red-700">Remove</button>
      </div>
    </div>
  );
};

export default MyPayment;