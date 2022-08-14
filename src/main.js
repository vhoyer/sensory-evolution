import { createApp } from 'vue';
import App from './App.vue';
import { levelsSerialized } from './entities/level';

//
// Data
//
Object.assign(window, {
  vm: createApp(App).mount('#app'),
  levelsSerialized,
});
