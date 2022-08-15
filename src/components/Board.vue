<template>
  <div class="grid">
    <template
      v-for="(cell) in cellList"
    >
      <img
        class="tile"
        :src="tileSpriteDict[cell.type]"
        :style="{ '--x': cell.coord.x, '--y': cell.coord.y }"
      >

      <img
        v-for="(entity) in cell.entities"
        class="entity"
        :src="entitySpriteDict[entity.type]"
        alt="entity"
        :style="{ '--x': cell.coord.x, '--y': cell.coord.y }"
      >
    </template>
  </div>
</template>

<script setup>
import { TILE, ENTITY } from '/entities/constants.js';
import { mapKeys } from '/utils/object.js';

const spritesRaw = import.meta.glob('/assets/*.png', { eager: true, as: 'url' });
const sprites = mapKeys(spritesRaw, k => k.replace(/^\/assets\/|\.png$/g, ''));

const entitySpriteDict = {
  [ENTITY.PLAYER]: sprites['player'],
};

const tileSpriteDict = {
  [TILE.SPACE]: sprites['tile-space'],
  [TILE.GOAL]: sprites['tile-goal'],
  [TILE.BLOCK]: sprites['tile-block'],
  [TILE.MOVE_LEFT]: sprites['tile-move-left'],
  [TILE.MOVE_DOWN]: sprites['tile-move-down'],
  [TILE.MOVE_UP]: sprites['tile-move-up'],
  [TILE.MOVE_RIGHT]: sprites['tile-move-right'],
};

const props = defineProps({
  level: {
    type: Object,
    required: true,
  },
});

const gridWidth = props.level.board[0].length;
const cellList = props.level.board.flat();
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

.entity {
  display: block;
  width: 100%;
  aspect-ratio: 1/1;
  grid-area: calc(1 + var(--y, 0))/calc(1 + var(--x, 0));
}
</style>
