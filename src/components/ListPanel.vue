<script setup lang="ts">
import useAppStore from '../stores/appStore';
import ListPanelItem from './ListPanelItem.vue';

const appStore = useAppStore()
</script>

<template>
    <article class="mainItem">
        <ListPanelItem v-for="list of appStore.Lists" :key="list.id" :list/>
    </article>
</template>

<style scoped>
</style>