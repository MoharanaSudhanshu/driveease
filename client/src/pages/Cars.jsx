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
  }, [search, sort, transmission, type]);

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-5xl font-bold mb-8">Browse Cars</h1>

        <SearchBar search={search} setSearch={setSearch} />

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
              <p className="text-gray-500">Loading cars...</p>
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
