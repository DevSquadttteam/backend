import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import auth from "../middlewares/auth.middleware.js";
const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);
// Register a new user
router.post("/register", (req, res) => authController.register(req, res));
// Login user
router.post("/login", (req, res) => authController.login(req, res));
// Logout user
router.post("/logout", (req, res) => authController.logout(req, res));
// Get current logged-in user
router.get("/me", auth, (req, res) => authController.me(req, res));
export default router;
