const Car = require("../models/Car");

// CREATE CAR
exports.createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);

    res.status(201).json({
      success: true,
      car,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL CARS
exports.getCars = async (req, res) => {
  try {
    const {
      type,
      transmission,
      available,
      minPrice,
      maxPrice,
      search,
      page = 1,
      limit = 12,
    } = req.query;

    let filter = {};

    if (type) {
      filter.type = type;
    }

    if (transmission) {
      filter.transmission = transmission;
    }

    if (available) {
      filter.available = available === "true";
    }

    if (minPrice || maxPrice) {
      filter.pricePerDay = {};

      if (minPrice) filter.pricePerDay.$gte = Number(minPrice);

      if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$or = [
        {
          make: {
            $regex: search,
            $options: "i",
          },
        },
        {
          model: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const skip = (page - 1) * limit;

    const cars = await Car.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Car.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE CAR
exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.status(200).json({
      success: true,
      car,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE CAR
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.status(200).json({
      success: true,
      car,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE CAR
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    await car.deleteOne();

    res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getSimilarCars = async (req, res) => {
  try {
    const currentCar = await Car.findById(req.params.id);

    const cars = await Car.find({
      type: currentCar.type,
      _id: { $ne: currentCar._id },
    }).limit(4);

    res.json({
      success: true,
      cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.toggleAvailability = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    car.available = !car.available;

    await car.save();

    res.status(200).json({
      success: true,
      available: car.available,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
