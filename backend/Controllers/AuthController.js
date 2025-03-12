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

export const Login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.json ({message: "Please enter the required fields"});
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json ({message: "Invalid email or password", success: false});
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth){
            return res.status(401).json({message: "Invalid email or password", success: false});
        }
        const token = generateToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
        });
        res.status(200).json({message: "Successful login!", success: true, role: user.role});
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error", success: false});
    }
}