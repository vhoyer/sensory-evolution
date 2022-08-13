import { createTile, TILE } from './tile.js'

const tileDictionary = {
  ' ': 'SPACE',
  'g': 'GOAL',
  'l': 'MOVE_LEFT',
  'd': 'MOVE_DOWN',
  'u': 'MOVE_UP',
  'r': 'MOVE_RIGHT',
  'x': 'BLOCK',
};

const createBoardFromStringList = (stringRows) => {
  const charGrid = stringRows.map(row => row.split('|'));

  return charGrid.map(row => {
    return row.map((cell) => {
      return createTile(TILE[tileDictionary[cell]])
    })
  })
}

export const levelsSerialized = [
  {
    name: 'level 1',
    start: { x: 0, y: 7 },
    board: createBoardFromStringList([
      'r|r|r|r|r|r|r|g',
      'u|u|u|u|u|u|u|u',
      'u|u|u|u|u|u|u|u',
      'u|u|u|u|u|u|u|u',
      'u|u|u|u|u|u|u|u',
      'u|u|u|u|u|u|u|u',
      'u|u|u|u|u|u|u|u',
      'u|u|u|u|u|u|u|u',
    ]),
  }
]
