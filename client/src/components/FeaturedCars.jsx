import { useEffect, useState } from "react";
import API from "../api/axios";
import CarCard from "./CarCard";

function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCars = async () => {
      try {
        const { data } = await API.get("/cars");

        setCars(data.cars.slice(0, 3));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getCars();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold mb-10">Featured Cars</h2>

      {loading ? (
        <p className="text-gray-500">Loading featured cars...</p>
      ) : cars.length === 0 ? (
        <p className="text-gray-500">No featured cars available right now.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedCars;
