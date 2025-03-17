"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeGameSettings = initializeGameSettings;
exports.checkForWin = checkForWin;
function initializeGameSettings(parsheet, playerData) {
    return {
        id: parsheet.id,
        matrix: parsheet.matrix,
        bets: parsheet.bets,
        Symbols: parsheet.Symbols,
        resultSymbolMatrix: [],
        currentGamedata: parsheet,
        lineData: parsheet.lineData,
        useJackpot: parsheet.useJackpot,
        jackpotAmount: parsheet.jackpotAmount,
    };
}
function checkForWin(settings) {
    console.log("Checking for win...");
    return settings.resultSymbolMatrix;
}
