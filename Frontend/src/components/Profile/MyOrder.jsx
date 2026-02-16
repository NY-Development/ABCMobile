import { ShoppingBag, Search, ExternalLink } from "lucide-react";

const MyOrder = () => {
  // Mock data for display
  const orders = [
    { id: '1001', items: [{ name: 'Item A' }], total: 49.99, status: 'Delivered' },
    { id: '1002', items: [{ name: 'Item B' }, { name: 'Item C' }], total: 129.50, status: 'Shipped' },
    { id: '1003', items: [{ name: 'Item D' }], total: 19.99, status: 'Processing' },
  ]; 

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl">
          <ShoppingBag className="h-12 w-12 text-orange-400 mb-4" />
          <p className="text-xl font-semibold text-gray-700">No Orders Found</p>
          <p className="text-gray-500 mt-2 max-w-md">
            Your past orders will appear here after you place your first purchase.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-3 sm:mb-0">
                <p className="font-bold text-lg text-gray-800">Order #{order.id}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {order.items.length} items - Total: <span className="font-semibold text-orange-600">${order.total.toFixed(2)}</span>
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <button className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1">
                      View Details <ExternalLink className="h-4 w-4" />
                  </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;