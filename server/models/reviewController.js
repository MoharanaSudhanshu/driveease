const Review = require("../models/Review");
const Car = require("../models/Car");

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create({
      user: req.user.id,
      car: req.params.carId,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    const reviews = await Review.find({
      car: req.params.carId,
    });

    const average =
      reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    await Car.findByIdAndUpdate(req.params.carId, {
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

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      car: req.params.carId,
    }).populate("user", "name");

    res.json({
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
