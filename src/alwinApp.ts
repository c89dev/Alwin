import { createHeaderView } from "./headerView";
import { createHomeView } from "./homeView";
import { createListView } from "./listView";
import { createRegisterView } from "./regView";
import { createInitialAppState } from "./model";
import type { InventoryItem, AppState, Msg } from "./types";
//API
import {
    loadInventoryFromDisk,
    loadIdCounterFromDisk,
    saveInventoryToDisk,
    saveIdCountToDisk,
} from "./api";

export function mountApp(state: AppState) {
    const root = document.getElementById("app");

    function dispatch(msg: Msg): void {
        if (msg.type === "home") {
            state.view = "home";
        } else if (msg.type === "register") {
            state.view = "register";
        } else if (msg.type === "search") {
            state.currentSearch = msg.query;
            state.view = "list";
        } else if (msg.type === "items-loaded") {
            state.inventoryItems = msg.inventoryItems;
            console.log("Inventory data loaded");
        } else if (msg.type === "id-counter-loaded") {
            console.log("Id counter loaded");
            state.nextId = msg.currentCount as number;
            console.log("appstate counter: ", state.nextId);
        } else if (msg.type === "submit-item-reg") {
            state.nextId++;
            msg.newInventoryItem.id = state.nextId;
            state.inventoryItems.push(msg.newInventoryItem);
            saveInventoryToDisk(state.inventoryItems);
            saveIdCountToDisk(state.nextId);
        } else if (msg.type === "delete") {
            deleteItem(state, msg);
        }
        render();
    }

    loadInventoryFromDisk().then((items) => {
        dispatch({
            type: "items-loaded",
            inventoryItems: items as InventoryItem[],
        });
    });

    loadIdCounterFromDisk().then((loadedCount) => {
        dispatch({
            type: "id-counter-loaded",
            currentCount: loadedCount as number,
        });
    });

    function render() {
        const header = createHeaderView(state, dispatch);

        if (state.view === "home") {
            const homeView = createHomeView(dispatch);
            root?.replaceChildren(header, homeView);
        } else if (state.view === "list") {
            const listView = createListView(state, dispatch);
            root?.replaceChildren(header, listView);
        } else if (state.view === "register") {
            const regView = createRegisterView(state, dispatch);
            root?.replaceChildren(header, regView);
        }
    }
    render();
}

function deleteItem(state: AppState, msg: Msg) {
    if (msg.type === "delete") {
        const proceed = confirm("⚠️ Permanently delete item?");
        if (!proceed) {
            console.log("Cancel delete, returning");
            return;
        } else if (proceed) {
            state.inventoryItems = state.inventoryItems.filter(
                (item) => item.id !== msg.id,
            );
        }
        saveInventoryToDisk(state.inventoryItems);
    }
}
