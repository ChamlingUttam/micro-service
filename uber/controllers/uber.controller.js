// import Uber from "../models/uber.model.js";
// import bcrypt from "bcryptjs";
// import { generateToken } from "../utils/generateToken.js";
// import { subscribeToQueue } from "../service/rabbit.js";

// const pendingRequests = [];

// // ─── COOKIE CONFIG ─────────────────────────────
// const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "lax",
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// };

// // ─── REGISTER ──────────────────────────────────
// export const register = async (req, res) => {
//   try {
      
//     const { username, isAvailable,email, password ,} = req.body || {};

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingUser = await Uber.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await Uber.create({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     const token = generateToken(user._id);
//     res.cookie("token", token, cookieOptions);

//     return res.status(201).json({
//       token ,
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       isAvailable:user.isAvailable
//     });

//   } catch (error) {
//     console.error("Register error:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// // ─── LOGIN ─────────────────────────────────────
// export const login = async (req, res) => {
//   try {
//     const { email, password,isAvailable } = req.body || {};

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }

//     const user = await Uber.findOne({ email }).select("+password");

//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = generateToken(user._id);
//     res.cookie("token", token, cookieOptions);

//     return res.json({
//       token,
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       isAvailable:user.isAvailable

//     });

//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// // ─── ME ────────────────────────────────────────
// export const me = async (req, res) => {
//   try {
//     return res.status(200).json(req.user);
//   } catch (error) {
//     console.error("Me error:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// // ─── LOGOUT ────────────────────────────────────
// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("token", cookieOptions);

//     return res.json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error("Logout error:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const toggleAvailability = async (req, res) => {
//   try {
//     const uber = await Uber.findById(req.user._id);

//     if (!uber) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     uber.isAvailable = !uber.isAvailable;
//     await uber.save();

//     res.status(200).json(uber);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };












// export const waitForNewRide = async (req, res) => {
//     // Set timeout for long polling (e.g., 30 seconds)
//     req.setTimeout(30000, () => {
//         res.status(204).end(); // No Content
//     });

//     // Add the response object to the pendingRequests array
//     pendingRequests.push(res);
// };

// subscribeToQueue("new-ride", (data) => {
//     const rideData = JSON.parse(data);

//     // Send the new ride data to all pending requests
//     pendingRequests.forEach(res => {
//         res.json(rideData);
//     });

//     // Clear the pending requests
//     pendingRequests.length = 0;
// });




















import Uber from "../models/uber.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { subscribeToQueue } from "../service/rabbit.js";

const pendingRequests = [];

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
    const { username, email, password } = req.body || {};

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
      token,
      _id: user._id,
      username: user.username,
      email: user.email,
      isAvailable: user.isAvailable,
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ─── LOGIN ─────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

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
      isAvailable: user.isAvailable,
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

// ─── TOGGLE AVAILABILITY ───────────────────────
export const toggleAvailability = async (req, res) => {
  try {
    const uber = await Uber.findById(req.user._id);

    if (!uber) {
      return res.status(404).json({ message: "User not found" });
    }

    uber.isAvailable = !uber.isAvailable;
    await uber.save();

    return res.status(200).json(uber);
  } catch (error) {
    console.error("toggleAvailability error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ─── LONG POLLING — WAIT FOR NEW RIDE ──────────
export const waitForNewRide = async (req, res) => {
  // FIX 1: remove res from pendingRequests when request times out
  // previously timed-out responses stayed in the array forever → memory leak
  req.setTimeout(30000, () => {
    const index = pendingRequests.indexOf(res);
    if (index !== -1) pendingRequests.splice(index, 1);
    res.status(204).end();
  });

  pendingRequests.push(res);
};

// ─── RABBITMQ — CONSUME NEW RIDE ───────────────
subscribeToQueue("new-ride", (data) => {
  try {
    // FIX 2: data might already be an object — JSON.parse(object) crashes
    // previously: JSON.parse(data) → SyntaxError: "[object Object]" is not valid JSON
    const rideData = typeof data === 'string' ? JSON.parse(data) : data;

    pendingRequests.forEach(res => {
      // FIX 3: skip responses that already timed out
      // previously sending to a closed response would crash the server
      if (!res.writableEnded) {
        res.json(rideData);
      }
    });

    // clear all pending requests after broadcasting
    pendingRequests.length = 0;

  } catch (error) {
    console.error("Failed to process new-ride message:", error.message);
  }
});