const User = require("../models/User");
const Booking = require("../models/Booking");
const Wishlist = require("../models/Wishlist");

exports.updateAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatar: req.file.path,
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalBookings, activeRentals, wishlistCars] = await Promise.all([
      Booking.countDocuments({
        user: req.user.id,
      }),
      Booking.countDocuments({
        user: req.user.id,
        status: {
          $in: ["pending", "confirmed"],
        },
      }),
      Wishlist.countDocuments({
        user: req.user.id,
      }),
    ]);

    res.status(200).json({
      totalBookings,
      activeRentals,
      wishlistCars,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
