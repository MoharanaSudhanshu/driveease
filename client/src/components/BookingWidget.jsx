import { useState, useMemo } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

function BookingWidget({ car }) {
  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const bookingData = useMemo(() => {
    if (!startDate || !endDate) {
      return {
        days: 0,
        total: 0,
      };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    return {
      days: diff > 0 ? diff : 0,
      total: diff > 0 ? diff * car.pricePerDay : 0,
    };
  }, [startDate, endDate, car.pricePerDay]);

  const handleBooking = async () => {
    try {
      await API.post("/bookings", {
        carId: car._id,
        startDate,
        endDate,
      });

      toast.success("Booking Confirmed 🚗");

      setStartDate("");
      setEndDate("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border">
      <h2 className="text-2xl font-bold mb-6">Reserve This Car</h2>

      <label className="block mb-2 font-medium">Pickup Date</label>

      <input
        type="date"
        className="w-full border p-3 rounded-xl mb-4"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label className="block mb-2 font-medium">Return Date</label>

      <input
        type="date"
        className="w-full border p-3 rounded-xl mb-6"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      {bookingData.days > 0 && (
        <div className="bg-slate-50 p-4 rounded-xl mb-6">
          <div className="flex justify-between mb-2">
            <span>Rental Days</span>

            <span>{bookingData.days}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Price Per Day</span>

            <span>₹{car.pricePerDay}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>

            <span>₹{bookingData.total}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleBooking}
        disabled={!bookingData.days}
        className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white p-4 rounded-xl font-semibold transition"
      >
        Book Now
      </button>
    </div>
  );
}

export default BookingWidget;
