import * as PIXI from 'pixi.js';
import { levelsSerialized } from './entities/level';

//
// Data
//
const board = levelsSerialized[0].board;
console.log(board);

//
// Rendering
//

const app = new PIXI.Application({
  view: document.getElementById('canvas'),
});

window.app = app;
