"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketHandler = (socket, io) => {
    console.log("New client connected:", socket.id);
    socket.on("disconnect", () => console.log("Client disconnected:"));
};
exports.default = socketHandler;
