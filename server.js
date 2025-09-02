import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRoute from './UserRoute.js';
dotenv.config(); // load .env file

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  // React app ka URL
  credentials: true
}));

// connect database
connectDB();

// simple route
app.get("/", (req, res) => {
  res.send("Fertilizer API is running...");
});
app.use("/api", UserRoute);



// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
