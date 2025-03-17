"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutCalculator = void 0;
class PayoutCalculator {
    constructor() {
        this.totalWinningAmount = 0;
        this.totalWinningAmount = 0;
    }
    calculatePayout(winLines, betPerLine) {
        this.totalWinningAmount = winLines.reduce((sum, line) => {
            return sum + (line.multiplier * betPerLine);
        }, 0);
    }
    reset() {
        this.totalWinningAmount = 0;
    }
}
exports.PayoutCalculator = PayoutCalculator;
