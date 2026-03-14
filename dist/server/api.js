"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadInventoryFromDisk = loadInventoryFromDisk;
exports.saveInventoryToDisk = saveInventoryToDisk;
exports.saveIdCountToDisk = saveIdCountToDisk;
exports.loadIdCounterFromDisk = loadIdCounterFromDisk;
//LOCAL
async function loadInventoryFromDisk() {
    const response = await fetch("http://localhost:3000/api/inventory");
    const data = await response.json();
    return data;
}
async function saveInventoryToDisk(dataToSave) {
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
async function saveIdCountToDisk(dataToSave) {
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
async function loadIdCounterFromDisk() {
    const response = await fetch("http://localhost:3000/api/idcounter");
    const data = await response.json();
    return data;
}
// OTHER
