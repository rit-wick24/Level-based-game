export class PayoutCalculator {
    public totalWinningAmount: number = 0;
  
    constructor() {
      this.totalWinningAmount = 0;
    }
  
    calculatePayout(winLines: any[], betPerLine: number) {
      this.totalWinningAmount = winLines.reduce((sum, line) => {
        return sum + (line.multiplier * betPerLine);
      }, 0);
    }
  
    reset() {
      this.totalWinningAmount = 0;
    }
  }