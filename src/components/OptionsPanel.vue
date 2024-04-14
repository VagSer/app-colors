<script setup lang="ts">
import OptionsPanelList from './OptionsPanelList.vue';
import useAppStore from '../stores/appStore';

const appStore = useAppStore()
</script>

<template>
    <article class="mainItem">
        <OptionsPanelList v-for="list in appStore.Lists" :key="list.id" :list/>
    </article>
</template>

<style scoped>
</style>