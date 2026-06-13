import { useState, useEffect } from "react";
import API from "../api/axios";
import DashboardStats from "../components/DashboardStats";

const getDashboardStats = async () => {
  const { data } = await API.get("/users/dashboard-stats");

  return data;
};

function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(user?.avatar || "");

  const [stats, setStats] = useState({
    totalBookings: 0,
    activeRentals: 0,
    wishlistCars: 0,
  });

  useEffect(() => {
    let mounted = true;

    const updateStats = () => {
      getDashboardStats()
        .then((data) => {
          if (mounted) {
            setStats(data);
          }
        })
        .catch((err) => console.log(err));
    };

    updateStats();

    window.addEventListener("focus", updateStats);

    return () => {
      mounted = false;
      window.removeEventListener("focus", updateStats);
    };
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadAvatar = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("avatar", file);

      const token = localStorage.getItem("token");

      const { data } = await API.put("/users/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      alert("Profile picture updated!");
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={preview || user?.avatar}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-cyan-500"
          />

          <div>
            <h1 className="text-4xl font-bold">{user?.name}</h1>

            <p className="text-gray-500 mt-2">{user?.email}</p>

            <p className="mt-2">
              Role:
              <span className="font-semibold text-cyan-600 ml-2">
                {user?.role}
              </span>
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2 rounded-xl"
              />

              <button
                onClick={uploadAvatar}
                disabled={loading}
                className="bg-cyan-600 text-white px-6 py-2 rounded-xl hover:bg-cyan-700"
              >
                {loading ? "Uploading..." : "Upload Avatar"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <DashboardStats
            title="Total Bookings"
            value={stats.totalBookings}
            color="bg-cyan-500"
          />

          <DashboardStats
            title="Active Rentals"
            value={stats.activeRentals}
            color="bg-green-500"
          />

          <DashboardStats
            title="Wishlist Cars"
            value={stats.wishlistCars}
            color="bg-purple-500"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
