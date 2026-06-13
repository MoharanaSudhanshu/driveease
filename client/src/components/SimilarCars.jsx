import { useEffect, useState } from "react";

import API from "../api/axios";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

import { FaHeart, FaEye, FaStar } from "react-icons/fa";

import { Link } from "react-router-dom";

function SimilarCars({ carId }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await API.get(`/cars/similar/${carId}`);

        setCars(data.cars);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCars();
  }, [carId]);
  if (cars.length === 0) return null;
  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={25}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {cars.map((car) => (
          <SwiperSlide key={car._id}>
            <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg shadow-xl border border-white/40">
              <div className="overflow-hidden">
                <img
                  src={car.imageUrl}
                  alt={car.model}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition">
                <FaHeart />
              </button>

              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">{car.make}</h3>

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center gap-1">
                    <FaStar />
                    {car.rating}
                  </span>
                </div>

                <p className="text-gray-500 mt-2">{car.model}</p>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="bg-slate-100 p-3 rounded-xl">
                    ⚡ {car.horsePower}
                  </div>

                  <div className="bg-slate-100 p-3 rounded-xl">
                    ⛽ {car.fuelType}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-3xl font-bold text-cyan-600">
                    ₹{car.pricePerDay}
                  </h4>

                  <p className="text-gray-500 text-sm">per day</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Link
                    to={`/cars/${car._id}`}
                    className="flex justify-center items-center gap-2 bg-slate-900 text-white py-3 rounded-xl"
                  >
                    <FaEye />
                    View
                  </Link>

                  <Link
                    to={`/cars/${car._id}`}
                    className="flex justify-center items-center bg-cyan-600 text-white py-3 rounded-xl hover:bg-cyan-700"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SimilarCars;
