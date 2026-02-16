import React, { useEffect, useState } from "react";
import { Plus, Minus, XCircle } from "lucide-react";
import { useCartStore } from "../store/cartStore";

const OrderCardMobile = ({ item, onIncrement, onDecrement, onRemove, quant, quantityUpdater, update }) => {
  const { product, quantity, unitPrice } = item;
  const {updateItem} = useCartStore();
  useEffect(()=>{
    quantityUpdater(quantity);
  }, [quantity])
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-3">
      <div className="flex items-start gap-3">
        <img
          src={product?.image || "/placeholder.jpg"}
          alt={product?.name}
          className="w-16 h-16 rounded-md object-cover"
        />

        <div className="flex-1">
          <div className="font-semibold">{product?.name}</div>
          <div className="text-xs text-gray-500">
            {String(product?.description).substring(0)}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="font-semibold">Br {unitPrice.toFixed(2)}</div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  updateItem(item.key, quant);
                  (quant <= 1 ? onRemove() : onDecrement())
                }}
                className="cp p-1 rounded-full text-gray-700 hover:bg-gray-100"
              >
                {quant <= 1 ? <XCircle size={18} /> : <Minus size={18} />}
              </button>

              <div className="w-6 text-center font-semibold">{quant}</div>

              <button
                onClick={() => {
                  updateItem(item.key, quant);
                  onIncrement()
                  }}
                className="cp p-1 rounded-full text-green-600 hover:bg-gray-100"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div className="mt-2 text-right font-semibold">
            ETBr {(unitPrice * quant).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCardMobile;
