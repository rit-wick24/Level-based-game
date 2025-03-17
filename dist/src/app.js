"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const gameRouter_1 = __importDefault(require("./games/gameRouter"));
const playerRoutes_1 = __importDefault(require("./routes/playerRoutes")); // ✅ Keep player routes
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// ✅ Register Player Routes
app.use("/api/players", playerRoutes_1.default);
// ✅ Register Game Routes
app.use("/api/game", gameRouter_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT} 🚀`);
});
