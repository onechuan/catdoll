<script setup lang="ts">
import Comp1 from './components/Comp1.vue';
import Comp2 from './components/Comp2.vue';
</script>

<template>
  <Comp1></Comp1>
  <Comp2></Comp2>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
