<script setup lang="ts">
import { computed } from 'vue';
import { List, visibleItem } from '../types';
import ListPanelItemSquare from './ListPanelItemSquare.vue';
import useAppStore from '../stores/appStore';

const appStore = useAppStore()

const props = defineProps<{
    list: List
}>()

const listSquares = computed(() => {
    let array = [] as visibleItem[]
    appStore.ListsSquares.forEach(square => {
        if (square.listId === props.list.id) {
            const isSelected = appStore.Selected.some(item => item.id === square.id)
            if (!isSelected) {
                array.push(square)
            }
        }
    })
    if (props.list.isSorted) {
        return [...array]
    } else {
        let randomArray = []
        while (array.length > 0) {
            let randomElement = array[Math.floor(Math.random()*array.length)]
            randomArray.push(randomElement)
            array = array.filter(square => square.id !== randomElement.id)
        }
        return randomArray
    }
})

const buttonText = computed(() => props.list.isSorted? 'Перемешать' : 'Сортировать')
</script>

<template>
    <details>
        <summary>
            <div class="listHeader">
                <span>
                    List {{ props.list.id }}
                </span>
                <button @click="appStore.updateSorted(props.list.id)">
                    {{ buttonText }}
                </button>
            </div>
        </summary>
        <div class="squareField">
            <ListPanelItemSquare
                v-for="square of listSquares" 
                :key="square.id"
                :listId="square.listId"
                :id="square.id"
                :color="square.color"
            />
        </div>
    </details>
</template>

<style scoped>
details {
    margin: 12px;
}
</style>