require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();


connectDB();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://driveease-one.vercel.app",
      "https://driveease-git-main-moharanasudhanshus-projects.vercel.app",
      "https://driveease-fh66f2jq8-moharanasudhanshus-projects.vercel.app",
      
    ],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("DriveEase API Running...");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/cars", require("./routes/cars"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const wishlistRoutes = require("./routes/wishlist");

app.use("/api/wishlist", wishlistRoutes);

const reviewRoutes = require("./routes/reviews");

app.use("/api/reviews", reviewRoutes);

