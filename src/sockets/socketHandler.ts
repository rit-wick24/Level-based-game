import { Server, Socket } from "socket.io";
const socketHandler = (socket: Socket, io: Server) => {
    console.log("New client connected:", socket.id);
    socket.on("disconnect", () => console.log("Client disconnected:"));
};
export default socketHandler;