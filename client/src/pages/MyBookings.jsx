import { useCallback, useContext, useEffect, useState } from "react";

import { FaCar, FaHeart } from "react-icons/fa";

import API from "../api/axios";

import { AuthContext } from "../context/auth-context";
import { WishlistContext } from "../context/wishlist-context";

import StatCard from "../components/StatCard";

function MyBookings() {
  const { user } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    try {
      const { data } = await API.get("/bookings/my");

      setBookings(data.bookings);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    API.get("/bookings/my")
      .then(({ data }) => setBookings(data.bookings))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const cancelBooking = async (id) => {
    try {
      await API.patch(`/bookings/${id}/cancel`);

      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl text-white p-10 mb-10">
          <h1 className="text-4xl font-bold">Welcome, {user?.name}</h1>

          <p className="mt-3 opacity-90">Manage your bookings and wishlist.</p>
        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Bookings" value={bookings.length} icon={<FaCar />} />

          <StatCard title="Wishlist" value={wishlist.length} icon={<FaHeart />} />

          <StatCard
            title="Active Rentals"
            value={bookings.filter((b) => b.status === "confirmed").length}
            icon="🚗"
          />
        </div>

        {/* BOOKINGS */}

        <h2 className="text-3xl font-bold mb-6">Recent Bookings</h2>

        <div className="space-y-6">
          {loading ? (
            <p className="text-gray-500">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-gray-500">You do not have any bookings yet.</p>
          ) : bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-3xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold">
                    {booking.car?.make} {booking.car?.model}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {new Date(booking.startDate).toLocaleDateString()} -{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <span
                    className={`px-4 py-2 rounded-full text-white ${
                      booking.status === "confirmed"
                        ? "bg-green-500"
                        : booking.status === "cancelled"
                          ? "bg-red-500"
                          : "bg-gray-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-bold">₹{booking.totalPrice}</h4>
                </div>

                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => cancelBooking(booking._id)}
                    className="bg-red-500 text-white px-5 py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
