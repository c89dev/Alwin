export type AppView = "home" | "list" | "register";

export type AppState = {
    view: AppView;
    inventoryItems: InventoryItem[];
    currentTargetId: string | null;
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
    | { type: "submit" }
    | { type: "items-loaded"; inventoryItems: InventoryItem[] }
    | { type: "id-counter-loaded"; currentCount: Number }
    | { type: "submit-item-reg"; newInventoryItem: InventoryItem };

export type Dispatch = (msg: Msg) => void;
