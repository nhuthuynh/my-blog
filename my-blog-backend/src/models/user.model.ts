import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    auth_0_id: String,
    date: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", UserSchema);