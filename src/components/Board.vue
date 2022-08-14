<template>
  <div>
    Board

    <div class="grid">
      <img
        v-for="(cell, index) in cellList"
        class="tile"
        :src="cell.image"
        :style="{
          '--x': (index % gridWidth),
          '--y': Math.floor(index / gridWidth),
        }"
      >

      <img
        class="player"
        :src="playerSprite"
        alt="player"
        :style="{
          '--x': player.pos.x,
          '--y': player.pos.y,
        }"
      >
    </div>
  </div>
</template>

<script setup>
import { levelsSerialized } from '/entities/level';
import { TILE } from '/entities/tile.js';
import playerSprite from '/assets/player.png'

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

const currentLevel = 0;

const gridWidth = levelsSerialized[currentLevel].board[0].length;
const cellList = levelsSerialized[currentLevel].board.flat().map(i => ({
  image: tileSpriteDict[i.type] || '',
}));

const player = {
  pos: levelsSerialized[currentLevel].start,
}
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
  grid-area: calc(1 + var(--y, 0))/calc(1 + var(--x, 0));
}

.player {
  display: block;
  width: 100%;
  aspect-ratio: 1/1;
  grid-area: calc(1 + var(--y, 0))/calc(1 + var(--x, 0));
}
</style>
