import express from "express";
import http from "http";
import { Server } from "socket.io";
import gameRoutes from "./games/gameRouter";
import { initializeSocket } from "./sockets/socketHandler";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use("/api/game", gameRoutes);

initializeSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT} 🚀`));