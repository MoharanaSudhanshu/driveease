const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  getDashboard,
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/adminController");

router.use(auth);
router.use(admin);

router.get("/dashboard", getDashboard);

router.get("/cars", getAllCars);

router.post("/cars", createCar);

router.put("/cars/:id", updateCar);

router.delete("/cars/:id", deleteCar);

router.get("/bookings", getAllBookings);

router.patch("/bookings/:id/status", updateBookingStatus);

module.exports = router;
