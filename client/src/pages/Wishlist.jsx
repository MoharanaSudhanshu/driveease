import { useContext } from "react";
import { WishlistContext } from "../context/wishlist-context";
import { Link } from "react-router-dom";

function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } =
    useContext(WishlistContext);

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <div className="flex items-center justify-between gap-4 mb-10">
        <h1 className="text-5xl font-bold">My Wishlist</h1>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="bg-slate-900 text-white px-5 py-3 rounded-xl"
          >
            Clear All
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-xl">No cars in wishlist ❤️</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlist.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              <Link to={`/cars/${car._id}`}>
                <img
                  src={car.imageUrl}
                  alt={car.model}
                  className="h-60 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-xl">
                    {car.make} {car.model}
                  </h3>

                  <p className="text-cyan-600 font-bold mt-2">
                    ₹{car.pricePerDay}/day
                  </p>
                </div>
              </Link>

              <div className="p-4">
                <button
                  onClick={() => removeFromWishlist(car._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl w-full"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
