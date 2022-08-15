<template>
  <center>{{ level.name }}</center>

  <Board
    :level="level"
  />
</template>

<script setup>
import { reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import Board from './components/Board.vue'
import { levelsSerialized } from '/entities/level';

const state = reactive({
  currentLevel: 0,
});

const level = computed(() => levelsSerialized[state.currentLevel]);
level.value.init();
window.level = level.value

const keydown = (event) => {
  const { key } = event;
  const { player } = level.value;

  const command = {
    'ArrowLeft':  () => Object.assign(player.vel, { x: -1 }),
    'ArrowDown':  () => Object.assign(player.vel, { y: +1 }),
    'ArrowUp':    () => Object.assign(player.vel, { y: -1 }),
    'ArrowRight': () => Object.assign(player.vel, { x: +1 }),
  };

  command[key]?.()
};
const keyup = (event) => {
  const { key } = event;
  const { player } = level.value;

  const command = {
    'ArrowLeft':  () => Object.assign(player.vel, { x: 0 }),
    'ArrowDown':  () => Object.assign(player.vel, { y: 0 }),
    'ArrowUp':    () => Object.assign(player.vel, { y: 0 }),
    'ArrowRight': () => Object.assign(player.vel, { x: 0 }),
  };

  command[key]?.()
};
onMounted(() => {
  window.addEventListener('keydown', keydown, { passive: true });
  window.addEventListener('keyup', keyup, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', keydown);
  window.removeEventListener('keyup', keyup);
});


onMounted(() => {
  requestAnimationFrame(() => { // tick
    let lastTick = performance.now();

    const tick = () => {
      const delta = performance.now() - lastTick;
      lastTick = performance.now();

      level.value.update(delta / 1000);

      setTimeout(() => requestAnimationFrame(tick), 100);
    };

    tick();
  });
});
</script>
