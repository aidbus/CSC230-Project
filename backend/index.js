// Import dependencies
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./Routes/AuthRoute.js"; // Authentication routes
import pdfRoute from "./Routes/pdfRoute.js"; // PDF upload & review routes
import "./configs/db.js"; // Ensures MongoDB connection is initialized

// Configure environment variables
dotenv.config();
const { PORT } = process.env;

// Initialize Express app
const app = express();

// Middleware to handle JSON requests and cookies
app.use(express.json());
app.use(cookieParser());

// Enable CORS with necessary configuration
app.use(
  cors({
    origin: ["http://localhost:5173"], // Frontend URL (React)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Test route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

// Set up routes
app.use("/api/auth", authRoute); // Authentication API
app.use("/api/pdf", pdfRoute); // PDF upload & review API

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
