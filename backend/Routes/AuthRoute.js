import { Signup, Login } from "../Controllers/AuthController.js";
import { userVerification } from "../Middlewares/AuthMiddleware.js";
import { Router } from "express";

const router = Router();

// Route for user signup
// Registers a new user
router.post("/signup", Signup);

// Route for user login
// Authenticates an existing user
router.post("/login", Login);

// Example of a protected route requiring user authentication
// Verifies token and user session using userVerification middleware
router.get("/profile", userVerification, (req, res) => {  // Changed POST to GET for profile route
    res.status(200).json({
        success: true,
        message: "User profile data",
        user: req.user,
    });
});

export default router;
