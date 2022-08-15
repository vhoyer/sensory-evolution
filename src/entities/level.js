import { xyRound } from '/utils/coordinates.js';
import { reactive, ref } from 'vue';
import { TILE, ENTITY } from './constants.js'

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

  const board = charGrid.map((row, y) => {
    return row.map((cell, x) => {
      return reactive({
        type: TILE[tileDictionary[cell]],
        coord: { x, y },
        entities: [],
      });
    });
  });
  board.at = ({ x, y }) => (board[y][x]);

  return board;
}

const createLevel = (base) => {
  return {
    ...base,
    state: ref('paused'),
    init() {
      const { x, y } = this.start;
      const playerCell = this.board[y][x];

      this.entities = [];
      this.player = reactive({
        type: ENTITY.PLAYER,
        pos: { ...this.start },
        vel: { x: 0, y: 0 },
        speed: 3,
        update(delta = 1) {
          this.oldPos = { ...this.pos };
          this.pos.x += this.vel.x * delta * this.speed;
          this.pos.y += this.vel.y * delta * this.speed;
        },
      });

      playerCell.entities.push(this.player);
      this.entities.push(this.player);

      this.state.value = 'playing';
    },
    update(delta) {
      if (import.meta.env.DEV) {
        window.tickCount = [1 + (window.tickCount?.[0] ?? 0), delta];
      }

      this.entities.forEach(entity => entity?.update(delta));
      this.entities.forEach(entity => {
        const boardWidth = this.board[0].length - 1;
        const boardHeight = this.board.length - 1;

        // boundaries correction
        if (entity.pos.x < 0) entity.pos.x = 0;
        if (entity.pos.y < 0) entity.pos.y = 0;
        if (entity.pos.x > boardWidth) entity.pos.x = boardWidth;
        if (entity.pos.y > boardHeight) entity.pos.y = boardHeight;

        let { pos, oldPos } = entity;
        this.board.at(xyRound(pos)).entities.push(entity);
        this.board.at(xyRound(oldPos)).entities.pop();
      });

      if (this.board.at(xyRound(this.player.pos)).type === TILE.GOAL) {
        this.state.value = 'win';
      }
    },
  };
}

export const levelsSerialized = [
  createLevel({
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
  }),
  createLevel({
    name: 'Game Over',
    start: { x: 5, y: 5 },
    board: createBoardFromStringList([
      'x| |x| |x|x|x| |x| |x',
      'x| |x| |x| |x| |x| |x',
      ' |x| | |x| |x| |x| |x',
      ' |x| | |x| |x| |x| |x',
      ' |x| | |x|x|x| |x|x|x',
      ' | | | | | | | | | | ',
      'x| |x| | |x| | |x| |x',
      'x| |x| | |x| | |x|x|x',
      'x| |x| | |x| | |x| |x',
      'x|x|x| | |x| | |x| |x',
      'x| |x| | |x| | |x| |x',
    ]),
  }),
];
