<script setup lang="ts">
import { ref, watch } from 'vue';
import useAppStore from '../stores/appStore';
import { Item } from '../types';

const appStore = useAppStore()

const isChecked = ref(false)

const props = defineProps<{
    listId: number,
    item: Item
}>()

const toggleCheckbox = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
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

watch(() => appStore.Selected.length,
() => {
    let allColor = [...appStore.ListsSquares].filter(square => 
        square.listId === props.listId && square.color === props.item.color)
    let selectedColor = [...appStore.Selected].filter(square => 
        square.listId === props.listId && square.color === props.item.color)
    isChecked.value = allColor.length === selectedColor.length
})
</script>

<template>
    <li class="listItem">
        <input 
            type="checkbox"
            :checked="isChecked"
            @change="toggleCheckbox"
        />
        <input 
            type="number"
            class="inputHowMany"
            inputmode="numeric"
            placeholder="Кол-во"
            :value="props.item.howMany"
            @change="(event: Event) => {
                const target = event.target as HTMLInputElement;
                if (target.value) {
                    appStore.updateHowMany(props.listId, props.item.id, Math.round(+target.value))
                }
            }"
        />
        <input
            type="color"
            :value="props.item.color" 
            @change="(event: Event) => {
                const target = event.target as HTMLInputElement;
                if (target.value) {
                    appStore.updateColor(props.listId, props.item.id, target.value)}
                }"
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