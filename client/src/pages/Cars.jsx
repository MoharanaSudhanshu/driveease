import { useEffect, useState } from "react";

import API from "../api/axios";

import CarCard from "../components/CarCard";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";

function Cars() {
  const [cars, setCars] = useState([]);

  const [search, setSearch] = useState("");

  const [type, setType] = useState("");

  const [transmission, setTransmission] = useState("");

  const [sort, setSort] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        let url = "/cars?";

        if (search) url += `search=${search}&`;

        if (type) url += `type=${type}&`;

        if (transmission) url += `transmission=${transmission}`;

        const { data } = await API.get(url);

        let carsData = [...data.cars];
        if (availableOnly) {
          carsData = carsData.filter((car) => car.available);
        }
        if (sort === "priceLow") {
          carsData.sort((a, b) => a.pricePerDay - b.pricePerDay);
        }

        if (sort === "priceHigh") {
          carsData.sort((a, b) => b.pricePerDay - a.pricePerDay);
        }

        setCars(carsData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [search, sort, transmission, type, availableOnly]);

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-5xl font-bold">Browse Cars</h1>

          <p className="text-gray-500 mt-3 text-lg">
            Explore luxury, sports, electric, SUV and premium rental vehicles.
          </p>
        </div>

        <SearchBar search={search} setSearch={setSearch} />
        <div className="flex gap-3 mt-4 mb-4">
          <button
            onClick={() => setAvailableOnly(!availableOnly)}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              availableOnly
                ? "bg-green-500 text-white"
                : "bg-white border border-gray-300"
            }`}
          >
            {availableOnly ? "✓ Available Only" : "Available Only"}
          </button>
        </div>
        <div className="flex justify-between items-center mt-6 mb-4">
          <p className="text-gray-600 font-medium">
            Showing <span className="text-cyan-600">{cars.length}</span>{" "}
            vehicles
          </p>

          <p className="text-gray-500 text-sm">
            Premium cars available for booking
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 mt-8">
          <FilterSidebar
            type={type}
            setType={setType}
            transmission={transmission}
            setTransmission={setTransmission}
            sort={sort}
            setSort={setSort}
          />

          <div className="md:col-span-3">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow animate-pulse"
                  >
                    <div className="h-52 bg-slate-200 rounded-t-2xl"></div>

                    <div className="p-5">
                      <div className="h-6 bg-slate-200 rounded mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : cars.length === 0 ? (
              <p className="text-gray-500">No cars match your filters.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cars;
