"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLevelFromXP = exports.levelThresholds = void 0;
exports.levelThresholds = [0, 100, 300, 600, 1000, 1500];
const getLevelFromXP = (xp) => {
    let level = 1;
    for (let i = 0; i < exports.levelThresholds.length; i++) {
        if (xp >= exports.levelThresholds[i])
            level = i + 1;
        else
            break;
    }
    return level;
};
exports.getLevelFromXP = getLevelFromXP;
