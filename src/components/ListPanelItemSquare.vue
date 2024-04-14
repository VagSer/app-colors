<script setup lang="ts">
import useAppStore from '../stores/appStore';

const appStore = useAppStore()

defineProps<{
    listId: number,
    id: number,
    color: string
}>()
</script>

<template>
    <div class="square" @click="appStore.toggleSquare({listId, id, color})"></div>
</template>

<style scoped>
.square {
    cursor: pointer;
    width: 20px;
    aspect-ratio: 1/1;
    background-color: v-bind(color);
}
</style>