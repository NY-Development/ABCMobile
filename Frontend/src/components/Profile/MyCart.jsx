import { ShoppingCart, Trash2, ChevronUp, ChevronDown } from "lucide-react";

const MyCart = () => {
  // Mock data for display
  const cartItems = [
    { id: 'A1', name: 'Premium Coffee Blend', price: 19.99, quantity: 1 },
    { id: 'B2', name: 'Insulated Travel Mug', price: 29.50, quantity: 2 },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="space-y-6 p-4 sm:p-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl">
          <ShoppingCart className="h-12 w-12 text-orange-400 mb-4" />
          <p className="text-xl font-semibold text-gray-700">Your Cart is Empty</p>
          <p className="text-gray-500 mt-2 max-w-md">
            Explore our products and add items to your cart to begin your order.
          </p>
          <button className="mt-6 bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
            Go to Shop
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Cart Items List - Takes 2/3 of the space */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border border-gray-200 p-4 rounded-xl bg-white shadow-sm"
              >
                <div className="flex-1">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Quantity Selector Placeholder */}
                    <div className="flex items-center border rounded-lg">
                        <input type="text" value={item.quantity} readOnly className="w-8 text-center bg-gray-50 p-1 text-sm font-medium" />
                        <div className="flex flex-col">
                            <button className="p-1 text-orange-600"><ChevronUp className="h-3 w-3" /></button>
                            <button className="p-1 text-orange-600"><ChevronDown className="h-3 w-3" /></button>
                        </div>
                    </div>
                    
                    <span className="font-bold text-orange-600 w-20 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                    
                    <button className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary - Takes 1/3 of the space */}
          <div className="lg:col-span-1 bg-orange-50 border border-orange-200 p-6 rounded-xl h-fit shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Order Summary</h3>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-orange-200">
                    <span className="text-xl font-bold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-orange-600">${subtotal.toFixed(2)}</span>
                </div>
            </div>
            <button className="mt-6 w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-md">
                Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;