// Tile dictionary
export const TILE = Object.fromEntries([
  'SPACE',
  'GOAL',
  'MOVE_LEFT',
  'MOVE_DOWN',
  'MOVE_UP',
  'MOVE_RIGHT',
  'BLOCK',
].map(k => [k, Symbol(k)]));

export function createTile(type = TILE.SPACE) {
  return {
    type,
  };
}
