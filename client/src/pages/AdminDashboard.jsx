import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaCar, FaMoneyBill, FaClipboardList } from "react-icons/fa";

import API from "../api/axios";

import RevenueChart from "../components/RevenueChart";
import AdminStatCard from "../components/AdminStatCard";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/admin/dashboard");

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-5xl font-bold mb-10">Admin Dashboard</h1>

        {/* Stats Cards */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <AdminStatCard
            title="Total Cars"
            value={stats.totalCars}
            icon={<FaCar />}
            color="text-cyan-600"
          />

          <AdminStatCard
            title="Bookings"
            value={stats.totalBookings}
            icon={<FaClipboardList />}
            color="text-green-600"
          />

          <AdminStatCard
            title="Revenue"
            value={`₹${stats.revenue}`}
            icon={<FaMoneyBill />}
            color="text-yellow-500"
          />

          <AdminStatCard
            title="Available Cars"
            value={stats.availableCars}
            icon="🚘"
            color="text-blue-600"
          />
        </div>

        {/* Revenue Chart */}

        <RevenueChart />

        {/* Quick Actions */}

        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/admin/cars")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition duration-300"
            >
              <div className="text-4xl mb-3">🚗</div>

              <h3 className="text-xl font-bold">Manage Cars</h3>

              <p className="opacity-90 mt-2">Add, Edit or Remove Vehicles</p>
            </button>

            <button
              onClick={() => navigate("/admin/bookings")}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition duration-300"
            >
              <div className="text-4xl mb-3">📋</div>

              <h3 className="text-xl font-bold">Manage Bookings</h3>

              <p className="opacity-90 mt-2">View Customer Reservations</p>
            </button>

            <button
              onClick={() => navigate("/admin/fleet")}
              className="bg-gradient-to-r from-purple-500 to-violet-600 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition duration-300"
            >
              <div className="text-4xl mb-3">⚙️</div>

              <h3 className="text-xl font-bold">Fleet Management</h3>

              <p className="opacity-90 mt-2">Control Vehicle Availability</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
