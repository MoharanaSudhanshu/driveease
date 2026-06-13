const express = require("express");

const router = express.Router();

const {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
  getSimilarCars,
  toggleAvailability,
} = require("../controllers/carController");
router.post("/", createCar);

router.get("/", getCars);

router.get("/similar/:id", getSimilarCars);

router.patch("/toggle/:id", toggleAvailability);

router.get("/:id", getCar);

router.put("/:id", updateCar);

router.delete("/:id", deleteCar);

module.exports = router;
