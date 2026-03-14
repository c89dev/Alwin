"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInitialAppState = createInitialAppState;
function createInitialAppState() {
    return {
        view: "home",
        inventoryItems: [],
        currentTargetId: null,
        currentSearch: "",
        nextId: 0,
    };
}
