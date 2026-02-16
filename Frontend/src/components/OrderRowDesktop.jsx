import React, {useEffect} from "react";
import { Plus, Minus, XCircle } from "lucide-react";
import { useCartStore } from "../store/cartStore";

const OrderRowDesktop = ({ item, onIncrement, onDecrement, onRemove, quant, quantityUpdater }) => {
  const { product, quantity, unitPrice } = item;
  const {updateItem} = useCartStore();
  useEffect(()=>{
    quantityUpdater(quantity);
  }, [quantity])
  return (
    <div className="grid grid-cols-7 items-center py-4 border-b border-gray-200 text-sm px-4">
      <img
        src={product?.image || "/placeholder.jpg"}
        alt={product?.name}
        className="w-16 h-16 object-cover rounded-md"
      />

      <div className="col-span-2">
        <p className="font-medium">{product?.name}</p>
        <p className="text-xs text-gray-500">
          {String(product?.description).substring(0)}
        </p>
      </div>

      <div className="text-gray-700">In Cart</div>

      <div className="text-center">Br {unitPrice.toFixed(2)}</div>

      {/* Quantity Controls */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              updateItem(item.key, quant); 
              (quant <= 1 ? onRemove() : onDecrement())
            }}
            className="cp p-1 rounded-full hover:bg-gray-100 text-gray-700"
          >
            {quantity <= 1 ? <XCircle size={18} /> : <Minus size={18} />}
          </button>

          <span className="font-semibold w-6 text-center">{quantity}</span>

          <button
            onClick={() => {
              updateItem(item.key, quant); 
              onIncrement()
            }}
            className="cp p-1 rounded-full hover:bg-gray-100 text-green-600"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="font-semibold text-right">
        Br {(unitPrice * quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderRowDesktop;
