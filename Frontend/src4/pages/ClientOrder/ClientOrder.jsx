import React, { useEffect, useMemo, useState } from "react";
import {useCartStore} from "./store/cartStore";
import OrderRowDesktop from "../../components/OrderRowDesktop";
import OrderCardMobile from "../../components/OrderCardMobile";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const ClientOrder = () => {
  const {
    cart,
    loading,
    error,
    fetchCart,
    quant,
    quantUpdater,
    increment,
    decrement,
    removeItem,
    validatePromo,
  } = useCartStore();

  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [promoValidated, setPromoValidated] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Merge items by product
  const mergedItems = useMemo(() => {
    const map = new Map();

    cart?.items.forEach((item) => {
      const productId = item.product?._id;
      if (!productId) return;

      const unitPrice = Number(item.product?.price || 0);
      const quantity = Number(item.quantity || 0);

      if (!map.has(productId)) {
        map.set(productId, {
          key: productId,
          product: item.product,
          quantity,
          unitPrice,
          totalPrice: unitPrice * quantity,
        });
      } else {
        const existing = map.get(productId);
        existing.quantity += quantity;
        existing.totalPrice = existing.unitPrice * existing.quantity;
      }
    });

    return Array.from(map.values());
  }, [cart]);

  const handlePromoApply = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);

    try {
      const isValid = await validatePromo(promoCode);
      setPromoValidated(isValid);
    } catch {
      setPromoValidated(false);
    } finally {
      setPromoLoading(false);
    }
  };

  const subtotal = useMemo(() => {
    return mergedItems.reduce((acc, item) => acc + item.totalPrice, 0);
  }, [mergedItems]);

  const canCheckout = promoValidated && mergedItems.length > 0;

  const handleCheckout = () => {
    if (!canCheckout) return;
    navigate("/checkout");
  };

// EMPTY CART UI
if (!loading && (cart?.items?.length === 0 || quant === 0)) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center border border-gray-200 animate-fade-in">
        
        <div className="mx-auto w-24 h-24 mb-6 rounded-full bg-orange-50 flex items-center justify-center animate-bounce-slow">
          <ShoppingCart size={60} className="text-orange-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Your Cart Is Empty
        </h2>

        <p className="text-gray-500 mb-6">
          Discover amazing products and add them to your cart.
        </p>

        <button
          onClick={() => navigate("/bakeries")}
          className="cp px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition-all"
        >
          Start Shopping
        </button>
      </div>

      {/* ANIMATION STYLES */}
      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2.5s infinite;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.7s ease-out;
        }
      `}</style>
    </div>
  );
}

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Your Orders</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="grid grid-cols-7 py-3 px-4 border-b bg-gray-50 text-xs font-semibold text-gray-600">
          <div>Image</div>
          <div className="col-span-2">Product</div>
          <div>Status</div>
          <div>Unit Price</div>
          <div>Quantity</div>
          <div>Total</div>
        </div>

        {mergedItems.map((item) => (
          <OrderRowDesktop
            key={item.key}
            item={item}
            onIncrement={() => increment()}
            onDecrement={() => decrement()}
            onRemove={() => removeItem(item.key)}
            quant={quant}
            quantityUpdater={quantUpdater}
          />
        ))}
      </div>

      {/* MOBILE CARDS */}
      <div className="lg:hidden mt-3">
        {mergedItems.map((item) => (
          <OrderCardMobile
            key={item.key}
            item={item}
            onIncrement={() => increment()}
            onDecrement={() => decrement()}
            onRemove={() => removeItem(item.key)}
            quant={quant}
            quantityUpdater={quantUpdater}
          />
        ))}
      </div>

      {/* PROMO AREA */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Apply Promo Code</h2>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="border px-3 py-2 rounded w-64"
            placeholder="Enter Promo Code"
          />

          <button
            disabled={promoLoading}
            onClick={handlePromoApply}
            className="cp px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:bg-gray-400"
          >
            {promoLoading ? "Validating..." : "Apply"}
          </button>
        </div>

        {promoValidated && (
          <p className="text-green-600 mt-2 text-sm">
            Promo code applied successfully.
          </p>
        )}
        {!promoValidated && promoCode && !promoLoading && (
          <p className="text-red-600 mt-2 text-sm">Invalid promo code.</p>
        )}
      </div>

      {/* FOOTER TOTALS */}
      <div className="mt-8 bg-gray-100 p-4 rounded-lg flex justify-between items-center">
        <div className="text-lg font-semibold">
          Subtotal: Br {subtotal.toFixed(2)}
        </div>

        <button
          disabled={!canCheckout}
          onClick={handleCheckout}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ClientOrder;