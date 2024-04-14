<script setup lang="ts">
import OptionsPanelListItem from './OptionsPanelListItem.vue';
import { List } from '../types';
import useAppStore from '../stores/appStore';
import { ref, watch } from 'vue';

const appStore = useAppStore()

const props = defineProps<{
    list: List
}>()

const isChecked = ref(false)

const toggleList = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
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

watch(() => appStore.Selected.length,
() => {
    let allList = [...appStore.ListsSquares].filter(square => square.listId === props.list.id)
    let selectedList = [...appStore.Selected].filter(square => square.listId === props.list.id)
    isChecked.value = allList.length === selectedList.length
})
</script>

<template>
    <details>
        <summary>
            <div class="listHeader">
                <label for="listId" >
                    List {{ props.list.id }}
                </label>
                <input 
                    type="checkbox" 
                    id="listId"
                    v-model="isChecked"
                    @change="toggleList"
                >
            </div>
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
.listHeader {
    align-items: baseline;
    flex-direction: row-reverse;
    justify-content: start;
}
</style>