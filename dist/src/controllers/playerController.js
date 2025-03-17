"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBalance = exports.loginOrRegister = void 0;
const Player_1 = __importDefault(require("../models/Player")); // ✅ Ensure this path is correct
// ✅ Corrected loginOrRegister function
const loginOrRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uniqueId, googleId, name } = req.body;
        if (!uniqueId || !googleId || !name) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        let player = yield Player_1.default.findOne({ uniqueId, googleId });
        if (!player) {
            player = new Player_1.default({ uniqueId, googleId, name });
            yield player.save();
        }
        res.status(200).json({ message: "Login successful", player });
    }
    catch (error) {
        console.error("Error in loginOrRegister:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.loginOrRegister = loginOrRegister;
const updateBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Incoming Request:", req.body); // ✅ Debugging log
        const { uniqueId, googleId, amount, recharge } = req.body;
        if (!uniqueId || !googleId || amount === undefined || recharge === undefined) {
            console.error("❌ Missing required fields");
            res.status(400).json({ message: "Missing required fields", receivedData: req.body });
            return;
        }
        if (amount <= 0) {
            res.status(400).json({ message: "Amount must be greater than zero" });
            return;
        }
        const player = yield Player_1.default.findOne({ uniqueId, googleId });
        if (!player) {
            res.status(404).json({ message: "Player not found" });
            return;
        }
        // ✅ Update balance
        player.balance += amount;
        // ✅ If recharge is true, track recharges separately
        if (recharge) {
            player.totalBet += amount;
        }
        yield player.save();
        res.status(200).json({ message: "Balance updated", player });
    }
    catch (error) {
        console.error("Error in updateBalance:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateBalance = updateBalance;
