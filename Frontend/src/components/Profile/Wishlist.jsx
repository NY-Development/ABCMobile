import { Heart } from "lucide-react";

const Wishlist = () => { //Favourite Products.
  const wishlist = []; // Replace with actual data fetch

  return (
    <div className="p-4 sm:p-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl">
          <Heart className="h-12 w-12 text-orange-400 mb-4" />
          <p className="text-xl font-semibold text-gray-700">No Favourites Yet</p>
          <p className="text-gray-500 mt-2 max-w-md">
            Looks like you haven't added any products to your wishlist. Start browsing and save items for later!
          </p>
          <button className="mt-6 bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Product Card Placeholder */}
          {/*
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white p-4 border rounded-xl shadow-sm">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">${product.price}</p>
              <button className="text-red-500 text-sm mt-2">Remove</button>
            </div>
          ))}
          */}
        </div>
      )}
    </div>
  );
};

export default Wishlist;