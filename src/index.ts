import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from './routes/auth.routes.js';
import userRoutes from "./routes/users.routes.js";
import appointmentRoutes from "./routes/appointments.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;

import cors from "cors"

app.use(cors())
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
