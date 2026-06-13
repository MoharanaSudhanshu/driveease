import { useState } from "react";
import API from "../api/axios";

function EditCarModal({ car, onClose, refreshCars }) {
  const [form, setForm] = useState(car || {});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/cars/${car._id}`, form);

      refreshCars();

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!car) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div
        className="
  bg-white/80
  backdrop-blur-xl
  shadow-2xl
  border
  border-white/30
  rounded-3xl
  p-8
  w-full
  max-w-3xl
  max-h-[90vh]
  overflow-y-auto
"
      >
        <h2 className="text-3xl font-bold mb-6">Edit Car</h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            name="make"
            value={form.make || ""}
            onChange={handleChange}
            placeholder="Make"
            className="border p-3 rounded-xl"
          />

          <input
            name="model"
            value={form.model || ""}
            onChange={handleChange}
            placeholder="Model"
            className="border p-3 rounded-xl"
          />

          <input
            name="year"
            value={form.year || ""}
            onChange={handleChange}
            placeholder="Year"
            className="border p-3 rounded-xl"
          />

          <input
            name="pricePerDay"
            value={form.pricePerDay || ""}
            onChange={handleChange}
            placeholder="Price"
            className="border p-3 rounded-xl"
          />

          <input
            name="fuelType"
            value={form.fuelType || ""}
            onChange={handleChange}
            placeholder="Fuel Type"
            className="border p-3 rounded-xl"
          />

          <input
            name="horsePower"
            value={form.horsePower || ""}
            onChange={handleChange}
            placeholder="Horse Power"
            className="border p-3 rounded-xl"
          />

          <input
            name="topSpeed"
            value={form.topSpeed || ""}
            onChange={handleChange}
            placeholder="Top Speed"
            className="border p-3 rounded-xl"
          />

          <input
            name="imageUrl"
            value={form.imageUrl || ""}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-3 rounded-xl"
          />
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Preview"
              className="w-full h-56 object-cover rounded-xl md:col-span-2"
            />
          )}
          <select
            name="available"
            value={form.available}
            onChange={(e) =>
              setForm({
                ...form,
                available: e.target.value === "true",
              })
            }
            className="border p-3 rounded-xl"
          >
            <option value="true">Available</option>

            <option value="false">Unavailable</option>
          </select>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            rows="4"
            placeholder="Description"
            className="border p-3 rounded-xl md:col-span-2"
          />

          <div className="md:col-span-2 flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-cyan-600 text-white px-6 py-3 rounded-xl"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-6 py-3 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCarModal;
