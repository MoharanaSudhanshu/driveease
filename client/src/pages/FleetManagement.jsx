import { useCallback, useEffect, useState } from "react";
import API from "../api/axios";
import SearchBar from "../components/SearchBar";
import FleetCharts from "../components/FleetCharts";
function FleetManagement() {
  const [cars, setCars] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCars = useCallback(async () => {
    try {
      const { data } = await API.get("/cars");
      setCars(data.cars);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    API.get("/cars")
      .then(({ data }) => setCars(data.cars))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const toggleAvailability = async (id) => {
    try {
      await API.patch(`/cars/toggle/${id}`);
      fetchCars();
    } catch (error) {
      console.log(error);
    }
  };

  const totalCars = cars.length;

  const availableCars = cars.filter((car) => car.available).length;

  const unavailableCars = cars.filter((car) => !car.available).length;

  const fleetValue = cars.reduce((sum, car) => sum + car.pricePerDay, 0);

  let filteredCars = [...cars];

  filteredCars = filteredCars.filter((car) =>
    `${car.make} ${car.model}`.toLowerCase().includes(search.toLowerCase()),
  );

  if (status === "available") {
    filteredCars = filteredCars.filter((car) => car.available);
  }

  if (status === "unavailable") {
    filteredCars = filteredCars.filter((car) => !car.available);
  }

  if (sort === "priceLow") {
    filteredCars.sort((a, b) => a.pricePerDay - b.pricePerDay);
  }

  if (sort === "priceHigh") {
    filteredCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
  }

  if (sort === "rating") {
    filteredCars.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Fleet Management</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />

      {/* Stats Cards */}

      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <div className="bg-cyan-500 text-white p-6 rounded-3xl shadow-lg">
          <h2>Total Cars</h2>
          <p className="text-4xl font-bold">{totalCars}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-3xl shadow-lg">
          <h2>Available</h2>
          <p className="text-4xl font-bold">{availableCars}</p>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-3xl shadow-lg">
          <h2>Unavailable</h2>
          <p className="text-4xl font-bold">{unavailableCars}</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-3xl shadow-lg">
          <h2>Fleet Value</h2>
          <p className="text-3xl font-bold">₹{fleetValue}</p>
        </div>
      </div>

      {/* Fleet Table */}

      <div className="mt-10 bg-white rounded-3xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Car</th>

              <th className="p-4 text-center">Price</th>

              <th className="p-4 text-center">Rating</th>

              <th className="p-4 text-center">Status</th>

              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan="5">
                  Loading fleet...
                </td>
              </tr>
            ) : filteredCars.length === 0 ? (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan="5">
                  No cars match your filters.
                </td>
              </tr>
            ) : filteredCars.map((car) => (
              <tr key={car._id} className="border-t hover:bg-slate-50">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={car.imageUrl}
                      alt={car.model}
                      className="w-16 h-16 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="font-bold">{car.make}</h3>

                      <p className="text-gray-500">{car.model}</p>
                    </div>
                  </div>
                </td>

                <td className="text-center">₹{car.pricePerDay}</td>

                <td className="text-center">⭐ {car.rating || 0}</td>

                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      car.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {car.available ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className="text-center">
                  <button
                    onClick={() => toggleAvailability(car._id)}
                    className="bg-cyan-600 text-white px-4 py-2 rounded-xl hover:bg-cyan-700"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FleetCharts cars={cars} />
    </div>
  );
}

export default FleetManagement;
