


import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connect } from "./service/rabbit.js";
import { dbConnect } from "./db/db.js";
import rideRouter from "./routes/ride.route.js";

// ─── LOAD ENV VARIABLES ─────────────────────────
dotenv.config();

const app = express();

// ─── MIDDLEWARE ─────────────────────────────────
app.use(express.json());
app.use(cookieParser());

// ─── PORT ───────────────────────────────────────
const PORT = process.env.PORT || 5000;

// ─── ROUTES ─────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", rideRouter);

// ─── START SERVER ───────────────────────────────
const startServer = async () => {
  try {
    // Connect RabbitMQ
    await connect();
    console.log("RabbitMQ connected");

    // Connect MongoDB
    await dbConnect();
    console.log("MongoDB connected");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
  }
};

startServer();