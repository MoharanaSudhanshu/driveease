const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
  updateAvatar,
  getDashboardStats,
} = require("../controllers/userController");

router.get("/dashboard-stats", auth, getDashboardStats);

router.put("/avatar", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
