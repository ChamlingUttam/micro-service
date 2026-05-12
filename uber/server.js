import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { dbConnect } from "./db/db.js";
import { connect } from "./service/rabbit.js";
import uberRouter from "./routes/uber.route.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", uberRouter);

// start server
const startServer = async () => {
  try {
    await connect()
    console.log("rabbitmq is connected")
    await dbConnect();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();