export type Coordinates = {
  x: number;
  y: number;
};

export type NeighborCoords = {
  left: Coordinates | undefined;
  top: Coordinates | undefined;
  right: Coordinates | undefined;
  bottom: Coordinates | undefined;
};

export type PathfindingCell = {
  coordinates: Coordinates;
  parent: PathfindingCell | undefined;
  visited: boolean;
  walkable: boolean;
  gCost: number;
  hCost: number;
};
