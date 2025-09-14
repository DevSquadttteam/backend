import { Schema, model, Document, Types } from "mongoose";

// User interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "patient" | "doctor";
  gender: "male" | "female";
  createdAt: Date;
  updatedAt: Date;

  rating?: number;
  appointments?: Types.ObjectId[];
  field?: string;

  profilePicture?: string;
}

const userSchema = new Schema<IUser>(
  {
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
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);
export default User;