import { Schema, model } from "mongoose";
const appointmentSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending",
    },
    notes: {
        type: String,
        trim: true,
    },
}, { timestamps: true });
const Appointment = model("Appointment", appointmentSchema);
export default Appointment;
