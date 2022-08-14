<template>
  App

  <Board
    :player="player"
    :level="level"
  />
</template>

<script setup>
import { reactive, computed } from 'vue';
import Board from './components/Board.vue'
import { levelsSerialized } from '/entities/level';

const state = reactive({
  currentLevel: 0,
});

const level = computed(() => levelsSerialized[state.currentLevel]);

const player = reactive({
  pos: level.value.start,
});
</script>

<style>
</style>
