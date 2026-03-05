import type { InventoryItem } from "./types";

//LOCAL

export async function loadInventoryFromDisk(): Promise<InventoryItem[]> {
    const response = await fetch("http://localhost:3000/api/loadinventory");
    const data = await response.json();
    return data;
}

export async function saveInventoryToDisk(item: InventoryItem) {
    console.log("Save to DB: ", item);
}

export async function loadIdCounterFromDisk(): Promise<number> {
    const response = await fetch("http://localhost:3000/api/idcount");
    const data = await response.json();

    return data.currentId;
}
// OTHER
