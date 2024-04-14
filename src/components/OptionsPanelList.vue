<script setup lang="ts">
import OptionsPanelListItem from './OptionsPanelListItem.vue';
import { List } from '../types';
import useAppStore from '../stores/appStore';

const appStore = useAppStore()

const props = defineProps<{
    list: List
}>()

const toggleList = (event) => {
    if (event.target.checked) {
        appStore.ListsSquares.forEach(square => {
            if (square.listId === props.list.id) {
                const isSelected = appStore.Selected.some(item => item.id === square.id)
                if (!isSelected) {
                    appStore.toggleSquare(square)
                }
            }
        })
    } else {
        appStore.Selected = appStore.Selected.filter(square => {
            if (square.listId === props.list.id) {
                return false
            }
            return true
        })
    }
}
</script>

<template>
    <details>
        <summary>
            <label id="listId">
                List {{ props.list.id }}
            </label>
            <input type="checkbox" for="listId" @change="toggleList">
        </summary>
        <ol>
            <OptionsPanelListItem 
                v-for="item of props.list.items"
                :key="item.id"
                :listId="props.list.id"
                :item
            />
        </ol>
    </details>
</template>

<style scoped>
summary {
    width: 50%;
}
</style>