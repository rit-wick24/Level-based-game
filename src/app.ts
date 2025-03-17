import express from "express";
import http from "http"; // Required for WebSockets
import { Server } from "socket.io"; // Import Socket.IO
import dotenv from "dotenv";
import connectDB from "./config/db";
import gameRouter from "./games/gameRouter";
import playerRouter from "./routes/playerRoutes";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Create HTTP server

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (Change this for security)
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

// ✅ Register API Routes
app.use("/api/players", playerRouter);
app.use("/api/game", gameRouter);

// ✅ WebSocket Logic
io.on("connection", (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);

  // Listen for Spin Request from Client
  socket.on("spin", async (data) => {
    console.log(`🎰 Spin received from ${data.uniqueId}`);

    // Handle game logic for spin (Modify as needed)
    const result = { winnings: 100, balance: 500, xpPoints: 120 }; // Example data
    socket.emit("spinResult", result); // Send result back to client
  });

  // Listen for Balance Update
  socket.on("updateBalance", async (data) => {
    console.log(`💰 Balance update request for ${data.uniqueId}`);
    socket.emit("balanceUpdated", { balance: data.newBalance });
  });

  socket.on("disconnect", () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} 🚀`);
});