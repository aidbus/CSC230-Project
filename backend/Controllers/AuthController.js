import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";  // Ensure the correct file name

export const Signup = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Use the isValidPassword method to check the password
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate the JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
