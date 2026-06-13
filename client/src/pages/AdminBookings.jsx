import { useEffect, useState } from "react";
import API from "../api/axios";




function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (booking.totalPrice || 0),
    0,
  );

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await API.get("/bookings");

        setBookings(data.bookings);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) =>
    booking.user?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Booking Management</h1>

      <input
        type="text"
        placeholder="Search customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded-xl w-full mb-6"
      />
      <div className="bg-green-500 text-white p-6 rounded-3xl mb-6">
        <h2>Total Revenue</h2>
        <p className="text-4xl font-bold">₹{totalRevenue}</p>
      </div>
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Customer</th>

              <th className="p-4">Car</th>

              <th className="p-4">Dates</th>

              <th className="p-4">Amount</th>

              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan="5">
                  Loading bookings...
                </td>
              </tr>
            ) : filteredBookings.length === 0 ? (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan="5">
                  No bookings found.
                </td>
              </tr>
            ) : filteredBookings.map((booking) => (
              <tr key={booking._id} className="border-t">
                <td className="p-4">{booking.user?.name}</td>

                <td className="p-4">
                  {booking.car?.make} {booking.car?.model}
                </td>

                <td className="p-4">
                  {new Date(booking.startDate).toLocaleDateString()}
                  {" - "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </td>

                <td className="p-4">₹{booking.totalPrice}</td>

                <td className="p-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBookings;
