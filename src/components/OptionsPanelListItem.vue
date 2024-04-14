<script setup lang="ts">
import useAppStore from '../stores/appStore';
import { Item, visibleItem } from '../types';

const appStore = useAppStore()

const props = defineProps<{
    listId: number,
    item: Item
}>()

const toggleCheckbox = (event) => {
    if (event.target.checked) {
        appStore.ListsSquares.forEach(square => {
            if (square.listId === props.listId && square.color === props.item.color) {
                const isSelected = appStore.Selected.some(item => item.id === square.id)
                if (!isSelected) {
                    appStore.toggleSquare(square)
                }
            }
        })
    } else {
        appStore.Selected = appStore.Selected.filter(square => {
            if (square.listId === props.listId && square.color === props.item.color) {
                return false
            }
            return true
        })
    }
}
</script>

<template>
    <li class="listItem">
        <input 
            type="checkbox"
            @change="toggleCheckbox"
        />
        <input 
            type="number"
            class="inputHowMany"
            :value="props.item.howMany"
            @change="(event) => appStore.updateHowMany(props.listId, props.item.id, event?.target?.value)"
        />
        <input
            type="color"
            :value="props.item.color" 
            @change="(event) => appStore.updateColor(props.listId, props.item.id, event?.target?.value)"
            class="item"
        />
    </li>
</template>

<style scoped>
.listItem {
    display: flex;
    flex-direction: row;
}

.inputHowMany {
    width: 25%;
}

.item {
    border: none;
    aspect-ratio: 1/1;
    width: 32px;

    &::-webkit-color-swatch-wrapper {
        padding: 0; 
    }
}
</style>