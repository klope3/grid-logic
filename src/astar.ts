import { Coordinates, NeighborCoords, PathfindingCell } from "./types";

//g cost: distance from start position (distance from parent + parent g cost)
//h cost: distance from end node (heuristic)
//f cost: g cost + h cost
//open: the positions that are "in line" to be visited
export function findPath(
  grid: boolean[][],
  start: Coordinates,
  end: Coordinates
): Coordinates[] | undefined {
  //set parent of each neighbor cell to be this cell
  //calculate costs of each neighbor of current cell
  //remove current cell from open and set "closed" to true
  //look in open for the cell with lowest f cost
  //set that cell as current
  //if current cell is end, break
  //otherwise, loop
  const cellGrid = initCells(grid);

  let open = [cellGrid[start.y][start.x]];
  let current = open[0];
  let endCell = cellGrid[end.y][end.x];

  while (true) {
    const neighbors = getNeighborCells(cellGrid, current.coordinates).filter(
      (n) => n && !n.visited && (n.walkable || n === endCell)
    );
    for (const n of neighbors) {
      if (!n) continue;

      n.hCost = distance(n.coordinates, end);
      const wouldBeGCost =
        n.gCost + distance(current.coordinates, n.coordinates);
      if (!n.parent || wouldBeGCost < n.gCost) {
        n.parent = current;
        n.gCost = wouldBeGCost;
      }
      addCellToOpen(open, n);
    }
    removeCellFromOpen(open, current);
    current.visited = true;
    if (open.length === 0) break;
    current = open[0];
    if (current === endCell) break;
  }

  if (current === endCell) return reconstructPath(current);
  return undefined;
}

function initCells(grid: boolean[][]): PathfindingCell[][] {
  const cells: PathfindingCell[][] = Array.from({ length: grid.length }, (_) =>
    Array.from({ length: grid[0].length }, (_) => ({} as PathfindingCell))
  );
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      cells[y][x].coordinates = { x, y };
      cells[y][x].parent = undefined;
      cells[y][x].visited = false;
      cells[y][x].walkable = grid[y][x];
      cells[y][x].gCost = 0;
      cells[y][x].hCost = 0;
    }
  }
  return cells;
}

function distance(a: Coordinates, b: Coordinates) {
  const deltaX = Math.abs(a.x - b.x);
  const deltaY = Math.abs(a.y - b.y);
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function getNeighborCoords(
  grid: any[][],
  position: Coordinates
): NeighborCoords {
  const width = grid[0].length;
  const height = grid.length;

  return {
    left: position.x > 0 ? { x: position.x - 1, y: position.y } : undefined,
    top: position.y > 0 ? { x: position.x, y: position.y - 1 } : undefined,
    right:
      position.x < width - 1 ? { x: position.x + 1, y: position.y } : undefined,
    bottom:
      position.y < height - 1
        ? { x: position.x, y: position.y + 1 }
        : undefined,
  };
}

function getNeighborCells(
  cellGrid: PathfindingCell[][],
  centerCoords: Coordinates
) {
  const { left, top, right, bottom } = getNeighborCoords(
    cellGrid,
    centerCoords
  );
  const neighborCells = [
    left && cellGrid[left.y][left.x],
    top && cellGrid[top.y][top.x],
    right && cellGrid[right.y][right.x],
    bottom && cellGrid[bottom.y][bottom.x],
  ].filter((cell) => cell !== undefined);

  return neighborCells;
}

function reconstructPath(endCell: PathfindingCell) {
  let current = endCell;
  let pathCells: PathfindingCell[] = [];
  while (true) {
    pathCells.push(current);
    if (!current.parent) break;
    current = current.parent;
  }
  return pathCells.map((cell) => cell.coordinates);
}

//the "open" cell array has no duplicates and is always kept sorted in ascending order according to f cost
function addCellToOpen(open: PathfindingCell[], cellToAdd: PathfindingCell) {
  if (open.includes(cellToAdd)) return;
  open.push(cellToAdd);
  open.sort((a, b) => a.gCost + a.hCost - (b.gCost + b.hCost));
}

function removeCellFromOpen(
  open: PathfindingCell[],
  cellToRemove: PathfindingCell
) {
  const index = open.indexOf(cellToRemove);
  open.splice(index, 1);
}
