import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, min: 2, max: 20 },
    email: { type: String, required: true , unique: true},
    password: { type: String, required: true, min: 6 }
}, { timestamps: true });

const User = models.User || mongoose.model("User", userSchema);
export default User;