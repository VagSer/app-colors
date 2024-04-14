<script setup lang="ts">
import OptionsPanel from './components/OptionsPanel.vue'
import ListPanel from './components/ListPanel.vue'
import ListSelected from './components/ListSelected.vue'
</script>

<template>
  <h1>Colors App</h1>
  <main>
    <OptionsPanel />
    <ListSelected />
    <ListPanel />
  </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
  }

@media screen and (width > 480px) {
  main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
