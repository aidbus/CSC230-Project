import User from "../Models/UserModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const userVerification = (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({success: false, message: "Unauthorized: No token provided"});
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.status(401).json({success: false, message: "An error occured when authorizing the token"});
        }
        else {
            const user = await User.findById(data.id);
            if (user) {
                return res.status(200).json({success: true, email: user.email});
            }
            else {
                return res.status(401).json({success: false, message: "User does not have access to this resoruce"})
            }
        }
    })
}

