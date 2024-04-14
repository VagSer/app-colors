export interface Item {
    id: number,
    howMany: number,
    color: string,
}

export interface visibleItem {
    listId: number,
    id: number,
    color: string,
}

export interface List {
    id: number,
    items: Item[],
    isSorted: boolean,
}