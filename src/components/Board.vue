<template>
  <div>
    Board

    <div class="grid">
      <div v-for="cell in cellList" style="display:flex;">
        <img class="tile" :src="cell.image" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import { levelsSerialized } from '/entities/level';
import { TILE } from '/entities/tile.js';

const tileSpriteDict = Object.fromEntries(
  Object.entries(
    import.meta.glob('/assets/tile-*.png', {
      as: 'url',
      eager: true,
    })
  ).map(([key, value]) => {
    const filename = key.replaceAll(/^\/assets\/tile-|\.png$/g, '');

    const filenameMap = {
      'space': TILE.SPACE,
      'goal': TILE.GOAL,
      'block': TILE.BLOCK,
      'move-left': TILE.MOVE_LEFT,
      'move-down': TILE.MOVE_DOWN,
      'move-up': TILE.MOVE_UP,
      'move-right': TILE.MOVE_RIGHT,
    };

    return [filenameMap[filename], value];
  }),
);

console.log(tileSpriteDict)

const gridWidth = levelsSerialized[0].board[0].length;
const cellList = levelsSerialized[0].board.flat().map(i => ({
  image: tileSpriteDict[i.type] || '',
}));
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(v-bind(gridWidth), 1fr);
  grid-auto-flow: row;
  width: 50%;
  aspect-ratio: 1/1;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
}

.tile {
  display: block;
  width: 100%;
  aspect-ratio: 1/1;
  border: 1px solid black;
}
</style>
