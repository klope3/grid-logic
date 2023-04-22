"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomBoolGrid = exports.mulberry32 = void 0;
//This is not mine!! Found here: https://github.com/bryc/code/blob/master/jshash/PRNGs.md
function mulberry32(a) {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
exports.mulberry32 = mulberry32;
function randomBoolGrid(width, height, seed, fillChance) {
    const grid = Array.from({ length: height }, (_) => Array.from({ length: width }, (_) => true));
    let offset = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (mulberry32(seed + offset) < fillChance)
                grid[y][x] = false;
            offset++;
        }
    }
    return grid;
}
exports.randomBoolGrid = randomBoolGrid;
