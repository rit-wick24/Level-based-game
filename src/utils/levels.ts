export const levelThresholds = [0, 100, 300, 600, 1000, 1500];

export const getLevelFromXP = (xp: number): number => {
  let level = 1;
  for (let i = 0; i < levelThresholds.length; i++) {
    if (xp >= levelThresholds[i]) level = i + 1;
    else break;
  }
  return level;
};