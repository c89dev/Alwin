import type { AppState } from "./types";

export function createInitialAppState(): AppState {
    return {
        view: "home",
        inventoryItems: [],
        currentTargetId: null,
        nextId: 0,
    };
}
