import { useCallback, useEffect, useState } from "react";
import API from "../api/axios";
import EditCarModal from "../components/EditCarModal";

function AdminCars() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
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

  const deleteCar = async (id) => {
    try {
      await API.delete(`/cars/${id}`);

      setCars((currentCars) => currentCars.filter((car) => car._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Cars Management</h1>

      {loading ? (
        <p className="text-gray-500">Loading cars...</p>
      ) : cars.length === 0 ? (
        <p className="text-gray-500">No cars found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={car.imageUrl}
              alt={car.model}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-bold">
                {car.make} {car.model}
              </h2>

              <p className="text-cyan-600 font-bold mt-2">
                ₹{car.pricePerDay}/day
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setSelectedCar(car)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCar(car._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}

      {selectedCar && (
        <EditCarModal
          key={selectedCar._id}
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          refreshCars={fetchCars}
        />
      )}
    </div>
  );
}

export default AdminCars;
