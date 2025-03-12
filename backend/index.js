// backend/index.js
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoute");

app.use("/api/auth", authRoutes);
app.use("/api/restaurant", restaurantRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
