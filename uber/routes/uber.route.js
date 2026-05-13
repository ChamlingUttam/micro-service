import express from "express";
import {
  register,
  login,
  me,
  logout,
  toggleAvailability,
  waitForNewRide,
} from "../controllers/uber.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// ─── Public Routes ────────────────────────────────────────────────────────────
router.post("/register", register);
router.post("/login", login);

// ─── Protected Routes ─────────────────────────────────────────────────────────
router.get("/me", protect, me);
router.post("/logout", protect, logout);
router.patch("/toggle-availability", protect, toggleAvailability);
router.get('/new-ride',protect,waitForNewRide)

export default router;