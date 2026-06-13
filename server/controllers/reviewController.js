const Review = require("../models/Review");
const Car = require("../models/Car");

// Add Review
exports.addReview = async (req, res) => {
  try {
    const { carId, rating, comment } = req.body;

    const review = await Review.create({
      user: req.user.id,
      car: carId,
      rating,
      comment,
    });

    const reviews = await Review.find({
      car: carId,
    });

    const average =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    await Car.findByIdAndUpdate(carId, {
      rating: average.toFixed(1),
      reviews: reviews.length,
    });

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      car: req.params.carId,
    }).populate("user", "name");

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
