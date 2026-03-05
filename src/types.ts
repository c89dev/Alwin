export type AppView = "home" | "list" | "register";

export type AppState = {
    view: AppView;
    inventoryItems: InventoryItem[];
    currentTargetId: string | null;
    currentSearch: string;
    nextId: number;
};

export type InventoryItem = {
    id: number;
    title: string;
    keywords: string[];
    sectionId: string;
    imageUrl: string;
};

export type Msg =
    | { type: "home" }
    | { type: "register" }
    | { type: "search"; query: string }
    | { type: "items-loaded"; inventoryItems: InventoryItem[] }
    | { type: "id-counter-loaded"; currentCount: number }
    | { type: "delete"; id: number }
    | { type: "submit-item-reg"; newInventoryItem: InventoryItem };

export type Dispatch = (msg: Msg) => void;
