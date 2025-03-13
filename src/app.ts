import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import playerRoutes from "./routes/playerRoutes"; // ✅ Import player routes

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ✅ Register Player Routes
app.use("/api/players", playerRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} 🚀`);
});