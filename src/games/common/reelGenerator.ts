import { loadParsheet } from "./parsheetLoader";

export function generateReelStrips(): string[][] {
  const gameConfig = loadParsheet();
  const reels: string[][] = [];

  for (let i = 0; i < gameConfig.matrix.x; i++) {
    const reel: string[] = [];

    gameConfig.Symbols.forEach((symbol: { Id: number; reelInstance: { [key: string]: number } }) => {
        if (symbol.reelInstance[i]) {
          for (let j = 0; j < symbol.reelInstance[i]; j++) {
            reel.push(symbol.Id.toString());
          }
        }
      });

    reels.push(shuffleArray(reel));
  }

  return reels;
}

function shuffleArray(array: string[]): string[] {
  return array.sort(() => Math.random() - 0.5);
}