import express from "express";
const router = express.Router();
router.get("/doctors");
router.get("/:id");
router.post("/");
router.patch("/:id");
router.delete("/:id");
