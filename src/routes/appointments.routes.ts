import express from "express";
import { AppointmentController } from "../controllers/appointment.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();
const controller = new AppointmentController();

router.post("/", auth, (req, res) => controller.create(req, res));
router.get("/", auth, (req, res) => controller.getAll(req, res));
router.get("/:id", auth, (req, res) => controller.getById(req, res));
router.patch("/:id", auth, (req, res) => controller.update(req, res));
router.delete("/:id", auth, (req, res) => controller.delete(req, res));

export default router;
