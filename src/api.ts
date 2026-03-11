import type { InventoryItem } from "./types";

//LOCAL

export async function loadInventoryFromDisk(): Promise<InventoryItem[]> {
    const response = await fetch("http://localhost:3000/api/inventory");
    const data = await response.json();
    return data;
}

export async function saveInventoryToDisk(dataToSave: InventoryItem[]) {
    const response = await fetch("http://localhost:3000/api/inventory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
    });
    const data = await response.json();

    console.log("writing inventory to disk");
    return data;
}

export async function saveIdCountToDisk(dataToSave: number) {
    const response = await fetch("http://localhost:3000/api/idcounter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
    });
    const data = await response.json();

    console.log("writing idcount to disk");
    return data;
}

export async function loadIdCounterFromDisk(): Promise<number> {
    const response = await fetch("http://localhost:3000/api/idcounter");
    const data = await response.json();

    return data;
}
// OTHER
