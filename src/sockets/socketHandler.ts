import { Server } from "socket.io";
import { BaseGame } from "../games/Level1/BaseGame";

export function initializeSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("🔌 User Connected:", socket.id);

    socket.on("spin", async (data) => {
      const game = new BaseGame({});
      const response = await game.processSpin({ body: data } as any, {} as any);
      socket.emit("spinResult", response);
    });

    socket.on("disconnect", () => console.log("❌ User Disconnected"));
  });
}