"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const socketHandler_1 = __importDefault(require("./sockets/socketHandler"));
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => (0, socketHandler_1.default)(socket, io));
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
