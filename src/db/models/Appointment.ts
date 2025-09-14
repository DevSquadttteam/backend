import { Schema, model, Document, Types } from "mongoose";

export interface IAppointment extends Document {
  doctor: Types.ObjectId; // ref to doctor
  patient: Types.ObjectId; // ref to patient
  dateTime: Date;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>(
  {
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
  },
  { timestamps: true }
);

const Appointment = model<IAppointment>("Appointment", appointmentSchema);
export default Appointment;
