// Import dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./Routes/AuthRoute.js"; // Make sure the path to the route is correct
import cookieParser from "cookie-parser";

// Configure environment variables
dotenv.config();
const { MONGO_URL, PORT } = process.env;

// Initialize Express app
const app = express();

// Middleware to handle JSON requests and cookies
app.use(express.json()); // Allows parsing of incoming JSON data
app.use(cookieParser()); // Allows parsing of cookies

// Enable CORS with necessary configuration
app.use(
  cors({
    origin: ["http://localhost:5173"], // Frontend URL (React)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allows cookies to be sent
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Test route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!"); // Simple response for the root URL
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error(`DB CONNECTION ERROR: ${err}`);
  });

// Set up routes
app.use("/api/auth", authRoute); // All routes in authRoute will now start with `/api/auth`

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
