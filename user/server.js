import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { dbConnect } from "./db/db.js";
import userRouter from "./routes/user.route.js";

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

app.use("/api/auth", userRouter);

// start server
const startServer = async () => {
  try {
    await dbConnect();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();