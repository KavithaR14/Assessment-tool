require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userroutes");
const emailRoute = require("./Routes/emailroute");

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increase the payload limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // If you are using URL-encoded data

// MongoDB connection from environment variables
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// API Routes
app.use("/api/users", userRoutes);
app.use("/api", emailRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
