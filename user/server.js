// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import { connect } from './service/rabbit.js';



// import { dbConnect } from "./db/db.js";
// import userRouter from "./routes/user.route.js";

// dotenv.config();

// const app = express();

// // middleware
// app.use(express.json());
// app.use(cookieParser());

// const PORT = process.env.PORT || 5000;

// // routes
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.use("/api/auth", userRouter);

// // start server
// //first one is rabbitMq
// await connect()
// const startServer = async () => {
//   try {
//     await dbConnect();

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("Database connection failed:", error);
//   }
// };

// startServer();














import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import { connect } from "./service/rabbit.js";
import { dbConnect } from "./db/db.js";
import userRouter from "./routes/user.route.js";

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

app.use("/api/auth", userRouter);

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