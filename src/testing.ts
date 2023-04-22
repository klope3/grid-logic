import { findPath } from "./astar";
import { randomBoolGrid } from "./random";
import { Coordinates } from "./types";

const grid = randomBoolGrid(20, 10, 5, 0.2);

//start 16, 0 and end 4, 3 currently gives a suboptimal path

// for (let i = 0; i < 1; i++) {
//   console.log("===========================");
//   const start = {
//     x: Math.floor(Math.random() * 20),
//     y: Math.floor(Math.random() * 10),
//   };
//   const end = {
//     x: Math.floor(Math.random() * 20),
//     y: Math.floor(Math.random() * 10),
//   };
//   const path = findPath(grid, start, end);
//   if (!path) console.log("NO PATH!!");
//   printGrid(grid, path, start, end);
// }

const start = { x: 16, y: 0 };
const end = { x: 4, y: 3 };
const path = findPath(grid, start, end);
printGrid(grid, path, start, end);

function printGrid(
  grid: boolean[][],
  path: Coordinates[] | undefined,
  start: Coordinates,
  end: Coordinates
) {
  let str = "";
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      let c = ".";
      if (!grid[y][x]) c = "■";
      if (path && path.find((c) => c.x === x && c.y === y)) c = "o";
      if (start.x === x && start.y === y) c = "S";
      if (end.x === x && end.y === y) c = "E";
      if (!grid[y][x]) c = "■";
      str += c + " ";
    }
    str += "\n";
  }
  console.log(str);
}
