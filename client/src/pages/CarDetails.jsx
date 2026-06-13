import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import BookingWidget from "../components/BookingWidget";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import Reviews from "../components/Reviews";
import SimilarCars from "../components/SimilarCars";
import ReviewForm from "../components/ReviewForm";
import { WishlistContext } from "../context/wishlist-context";
function CarDetails() {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { addToWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const getCar = async () => {
      try {
        const { data } = await API.get(`/cars/${id}`);

        setCar(data.car);

        setSelectedImage(data.car.gallery?.[0] || data.car.imageUrl);
      } catch (error) {
        console.log(error);
      }
    };

    getCar();
  }, [id]);
  
  if (!car) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* TOP SECTION */}

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT */}

          <div>
            <img
              src={selectedImage}
              alt={car.model}
              className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
            />

            <div className="flex gap-3 mt-4 overflow-x-auto">
              {car.gallery?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  onClick={() => setSelectedImage(image)}
                  className="w-24 h-24 object-cover rounded-lg cursor-pointer border-2 hover:border-cyan-500"
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}

          <div>
            <h1 className="text-5xl font-bold">
              {car.make} {car.model}
            </h1>

            <p className="text-gray-500 mt-3">{car.year}</p>
            <button
              onClick={async () => {
                const added = await addToWishlist(car);
                toast[added ? "success" : "error"](
                  added ? "Added to wishlist" : "Already in wishlist",
                );
              }}
              className="bg-pink-500 text-white p-4 rounded-full hover:scale-110 transition flex items-center gap-2"
            >
              <FaHeart />
              Add To Wishlist
            </button>

            <div className="flex gap-3 mt-5">
              <span className="bg-yellow-100 px-4 py-2 rounded-full">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>

                  <span>{car.rating}</span>
                </div>
              </span>

              <span className="bg-slate-200 px-4 py-2 rounded-full">
                {car.reviews} Reviews
              </span>
            </div>

            <div className="mt-6">
              <span className="text-4xl font-bold text-cyan-600">
                ₹{car.pricePerDay}
              </span>

              <span className="text-gray-500">/day</span>
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed">
              {car.description}
            </p>
          </div>
        </div>

        {/* SPECIFICATIONS */}

        <div className="grid md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white p-5 rounded-2xl shadow">
            ⚡ {car.horsePower}
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            🛣 {car.topSpeed}
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            ⛽ {car.fuelType}
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            ⚙ {car.transmission}
          </div>
        </div>

        {/* FEATURES */}

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Features</h2>

          <div className="flex flex-wrap gap-3">
            {car.features?.map((feature, index) => (
              <span
                key={index}
                className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* BOOKING */}

        <div className="grid lg:grid-cols-3 gap-10 mt-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-4">About This Vehicle</h2>

            <p className="text-gray-600 leading-relaxed">{car.description}</p>
          </div>

          <BookingWidget car={car} />
          <ReviewForm carId={car._id} />
          <Reviews carId={car._id} />
          <SimilarCars carId={car._id} />
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
