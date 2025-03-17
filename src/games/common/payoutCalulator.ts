import { loadParsheet } from "./parsheetLoader";

export function calculateWinnings(resultMatrix: string[][], betAmount: number): number {
  const gameConfig = loadParsheet();
  let totalWinAmount = 0;

  for (const line of gameConfig.linesApiData) {
    const firstSymbol = resultMatrix[line[0]][0];
    let matchCount = 1;

    for (let col = 1; col < line.length; col++) {
      const row = line[col];
      const symbol = resultMatrix[row][col];

      if (symbol === firstSymbol) {
        matchCount++;
      } else {
        break;
      }
    }

    if (matchCount >= 3) {
      const symbolData = gameConfig.Symbols.find((s: { Id: number }) => s.Id.toString() === firstSymbol);
      if (symbolData && symbolData.multiplier[matchCount - 3]) {
        const multiplier = symbolData.multiplier[matchCount - 3][0];
        totalWinAmount += betAmount * multiplier;
      }
    }
  }

  return totalWinAmount;
}