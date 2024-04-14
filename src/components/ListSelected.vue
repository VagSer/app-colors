<script setup lang="ts">
import useAppStore from '../stores/appStore';
import ListPanelItemSquare from './ListPanelItemSquare.vue';

const appStore = useAppStore()
</script>

<template>
    <article class="mainItem">
        <ListPanelItemSquare 
            v-for="item of appStore.Selected"
            :key="item.id"
            :id="item.id"
            :listId="item.listId"
            :color="item.color"
        />
    </article>
</template>

<style scoped>
article {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    align-items: flex-start;
    padding: 4px;
}
</style>