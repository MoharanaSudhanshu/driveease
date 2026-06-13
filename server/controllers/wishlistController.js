const Wishlist = require("../models/Wishlist");

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { carId } = req.body;

    if (!carId) {
      return res.status(400).json({
        success: false,
        message: "Car id is required",
      });
    }

    const exists = await Wishlist.findOne({
      user: req.user.id,
      car: carId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user.id,
      car: carId,
    });

    res.status(201).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get wishlist
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate("car");

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove
exports.removeWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndDelete({
      user: req.user.id,
      $or: [
        {
          _id: req.params.id,
        },
        {
          car: req.params.id,
        },
      ],
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
