const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  createBooking,
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");

router.post("/", auth, createBooking);

router.get("/my", auth, getMyBookings);

router.patch("/:id/cancel", auth, cancelBooking);

module.exports = router;
