import { Link } from "react-router-dom";

function CarCard({ car }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-cyan-200 duration-300">
      <div className="overflow-hidden">
        <img
          src={car.imageUrl}
          alt={car.model}
          className="w-full h-56 object-cover group-hover:scale-110 duration-500"
        />
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-bold">
          {car.make} {car.model}
        </h2>

        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span>{car.transmission}</span>

          <span>{car.seats} Seats</span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-cyan-600">
            ₹{car.pricePerDay}
          </span>

          <Link
            to={`/cars/${car._id}`}
            className="bg-cyan-600 text-white px-5 py-2 rounded-lg"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
