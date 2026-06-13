const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "sedan",
        "suv",
        "hatchback",
        "sports",
        "luxury",
        "electric",
        "convertible",
      ],
    },

    category: {
      type: String,
      enum: ["Economy", "Premium", "Luxury", "Sports", "Electric"],
    },

    transmission: {
      type: String,
      enum: ["automatic", "manual"],
    },

    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    },

    seats: Number,

    horsePower: String,

    topSpeed: String,

    rating: {
      type: Number,
      default: 4.8,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    pricePerDay: {
      type: Number,
      required: true,
    },

    available: {
      type: Boolean,
      default: true,
    },

    imageUrl: String,

    gallery: [String],

    features: [String],

    description: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Car", carSchema);
