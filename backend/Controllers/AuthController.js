import User from "../Models/UserModel.js";
import {generateToken} from "../util/generateToken.js";
import bcrypt from "bcrypt";

export const Signup = async (req, res, next) => {
    try {
        const {email, password, role, createdAt} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.json({message: "User already exists!"});
        }
        const user = await User.create({email, password, role, createdAt});
        const token = generateToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({message: "User signed in successfully", success: true, user});
        next();
    }
    catch (error) {
        console.error(error);
    }
}