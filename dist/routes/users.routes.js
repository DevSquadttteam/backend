import express from "express";
import { UserController } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
const router = express.Router();
const userController = new UserController();
// GET /api/users/       => get all users
router.get("/", auth, (req, res) => userController.getAll(req, res));
// GET /api/users/:id    => get user by id
router.get("/:id", auth, (req, res) => userController.getById(req, res));
// PATCH /api/users/:id  => update user by id
router.patch("/:id", auth, (req, res) => userController.update(req, res));
// DELETE /api/users/:id => delete user by id
router.delete("/:id", auth, (req, res) => userController.delete(req, res));
export default router;
