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
exports.BaseGame = void 0;
const parsheetLoader_1 = require("../common/parsheetLoader");
const XPManager_1 = require("../common/XPManager");
const RandomResultGenerator_1 = require("../common/RandomResultGenerator");
const helper_1 = require("./helper");
const Player_1 = __importDefault(require("../../models/Player"));
class BaseGame {
    constructor(playerData) {
        this.playerData = playerData;
        const level = (0, XPManager_1.getLevelFromXP)(playerData.xpPoints);
        const parsheet = (0, parsheetLoader_1.loadParsheet)(level);
        if (!parsheet)
            throw new Error("Missing parsheet data!");
        this.settings = (0, helper_1.initializeGameSettings)(parsheet, playerData);
    }
    processSpin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uniqueId, googleId, betAmount } = req.body;
                const player = yield Player_1.default.findOne({ uniqueId, googleId });
                if (!player)
                    return res.status(404).json({ message: "Player not found" });
                if (betAmount > player.balance)
                    return res.status(400).json({ message: "Insufficient balance" });
                // ✅ Deduct bet amount
                player.balance -= betAmount;
                player.totalBet += betAmount;
                // ✅ Generate spin result
                const result = new RandomResultGenerator_1.RandomResultGenerator(this.settings);
                (0, helper_1.checkForWin)(this.settings);
                // ✅ Calculate winnings and XP based on results
                this.payoutCalculator.calculatePayout(this.settings.lineData, this.settings.bets[1]);
                const wonAmount = this.payoutCalculator.totalWinningAmount;
                const xpGained = Math.floor((betAmount + wonAmount) / 10);
                player.totalWon += wonAmount;
                player.xpPoints += xpGained;
                player.balance += wonAmount;
                yield player.save();
                return res.status(200).json({
                    message: "Spin processed",
                    balance: player.balance,
                    xpPoints: player.xpPoints,
                    winnings: wonAmount,
                    resultSymbols: result.resultMatrix,
                });
            }
            catch (error) {
                console.error("Error processing spin:", error);
                res.status(500).json({ message: "Server error" });
            }
        });
    }
}
exports.BaseGame = BaseGame;
