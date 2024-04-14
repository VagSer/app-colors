import { defineStore } from "pinia";
import { List, visibleItem } from "../types";
import { computed, ref } from "vue";

const useAppStore = defineStore('appStore', () => {
    const Lists = ref([
        {id: 1, 
            items: [{id: 1, howMany: 6, color: '#ff0000'}, {id: 2, howMany: 7, color: '#00ff00'},
            {id: 3, howMany: 5, color: '#0000ff'}, {id: 4, howMany: 7, color: '#00ffff'}
            ], isSorted: false},
        {id: 2, 
            items: [{id: 1, howMany: 4, color: '#ff0000'}, {id: 2, howMany: 7, color: '#00ff00'},
            {id: 3, howMany: 5, color: '#0000ff'}, {id: 4, howMany: 7, color: '#00ffff'}
            ], isSorted: false},
        {id: 3, 
            items: [{id: 1, howMany: 5, color: '#ff0000'}, {id: 2, howMany: 7, color: '#00ff00'},
            {id: 3, howMany: 5, color: '#0000ff'}, {id: 4, howMany: 7, color: '#00ffff'}
            ], isSorted: false},
        {id: 4, 
                items: [{id: 1, howMany: 5, color: '#ff0000'}, {id: 2, howMany: 7, color: '#00ff00'},
                {id: 3, howMany: 5, color: '#0000ff'}, {id: 4, howMany: 7, color: '#00ffff'}
                ], isSorted: false},
        ] as List[])

    const Selected = ref([] as visibleItem[])

    const ListsSquares = computed(() => {
        let array = [] as visibleItem[]
        let currentId = 0
        Lists.value.forEach(list => {
            list.items.forEach(item => {
                for (let i = 0; i < item.howMany; i++) {
                    array.push({id: currentId, listId: list.id, color: item.color})
                    currentId++
                }
            })
        })
        return array
    })

    const updateColor = (listId: number, itemId: number, newColor: string) => {
        let oldColor = ''
        const targetList = Lists.value.findIndex(list => list.id === listId)
        Lists.value[targetList]?.items.forEach(item => {
            if (item.id === itemId) {
                oldColor = item.color
                item.color = newColor
            }
        })
        Selected.value.forEach(square => {
            if (square.listId === listId && square.color === oldColor) {
                square.color = newColor
            }
        })
    }

    const updateHowMany = (listId: number, itemId: number, newValue: number) => {
        const targetList = Lists.value.findIndex(list => list.id === listId)
        Selected.value.length = 0
        Lists.value[targetList]?.items.forEach(item => {
            if (item.id === itemId) {
                item.howMany = Math.abs(newValue)
            }   
        })
    }

    const updateSorted = (listId: number) => {
        const targetList = Lists.value.findIndex(list => list.id === listId)
        Lists.value[targetList].isSorted = !Lists.value[targetList].isSorted
    }

    const toggleSquare = (square: visibleItem) => {
        const isSelected = Selected.value.some(item => item.id === square.id)
        if (isSelected) {
            Selected.value = Selected.value.filter(item => item.id !== square.id)
        } else {
            Selected.value.push(square)
        }
    }

    return {
        Lists, updateColor, updateHowMany, updateSorted, toggleSquare, Selected, ListsSquares
    }
})

export default useAppStore