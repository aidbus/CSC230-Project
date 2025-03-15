import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email address is required!"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        required: [true, "You must select a role"],
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
});

// Hash the password before saving the user
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

// Method to compare passwords
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
