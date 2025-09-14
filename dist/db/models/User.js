import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["patient", "doctor"],
        default: "patient",
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    appointments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Appointment",
        },
    ],
    field: {
        type: String,
        trim: true,
    },
    profilePicture: {
        type: String,
        trim: true,
        default: "",
    },
}, {
    timestamps: true,
});
const User = model("User", userSchema);
export default User;
