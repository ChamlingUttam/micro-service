import express from "express";
import {
  register,
  login,
  me,
  logout,
  acceptRide,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// ─── Public Routes ────────────────────────────────────────────────────────────
router.post("/register", register);
router.post("/login", login);

// ─── Protected Routes ─────────────────────────────────────────────────────────
router.get("/me", protect, me);
router.post("/logout", protect, logout);

router.get('/rideAccept',protect,acceptRide)

export default router;