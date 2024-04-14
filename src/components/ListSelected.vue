<script setup lang="ts">
import useAppStore from '../stores/appStore';
import ListPanelItemSquare from './ListPanelItemSquare.vue';

const appStore = useAppStore()
</script>

<template>
    <article class="mainItem">
        <section class="squareField">
            <ListPanelItemSquare 
                v-for="item of appStore.Selected"
                :key="item.id"
                :id="item.id"
                :listId="item.listId"
                :color="item.color"
            />
        </section>
    </article>
</template>

<style scoped>
article {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px;
    align-items: flex-start;
    padding: 4px;
}
</style>