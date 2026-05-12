import Uber from "../models/uber.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// ─── COOKIE CONFIG ─────────────────────────────
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// ─── REGISTER ──────────────────────────────────
export const register = async (req, res) => {
  try {
      
    const { username, isAvailable,email, password ,} = req.body || {};

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Uber.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Uber.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);
    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      token ,
      _id: user._id,
      username: user.username,
      email: user.email,
      isAvailable:user.isAvailable
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ─── LOGIN ─────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password,isAvailable } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await Uber.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, cookieOptions);

    return res.json({
      token,
      _id: user._id,
      username: user.username,
      email: user.email,
      isAvailable:user.isAvailable

    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ─── ME ────────────────────────────────────────
export const me = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.error("Me error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ─── LOGOUT ────────────────────────────────────
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);

    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const toggleAvailability = async (req, res) => {
  try {
    const uber = await Uber.findById(req.user._id);

    if (!uber) {
      return res.status(404).json({ message: "User not found" });
    }

    uber.isAvailable = !uber.isAvailable;
    await uber.save();

    res.status(200).json(uber);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
