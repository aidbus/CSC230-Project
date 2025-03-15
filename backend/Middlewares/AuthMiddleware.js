import User from "../Models/UserModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const userVerification = async (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.token;

        // If no token is provided, return a 401 error
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Invalid or expired token" });
            }

            // Find the user by the decoded token ID
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ success: false, message: "User does not exist" });
            }

            // Attach the user data to the request object for further use
            req.user = user;

            // Proceed to the next middleware or route handler
            next();
        });
    } catch (err) {
        // Catch any other errors that may occur
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
