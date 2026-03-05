import { createHeaderView } from "./headerView";
import { createHomeView } from "./homeView";
import { createRegisterView } from "./regView";
import { createInitialAppState } from "./model";
import type { InventoryItem, AppState, Msg } from "./types";
//API
import { loadInventoryFromDisk, loadIdCounterFromDisk } from "./api";

export function mountApp() {
    const root = document.getElementById("app");
    const state: AppState = createInitialAppState();

    function dispatch(msg: Msg): void {
        if (msg.type === "home") {
            state.view = "home";
        } else if (msg.type === "register") {
            state.view = "register";
        } else if (msg.type === "submit") {
            console.log("Clicked on submit yo");
        } else if (msg.type === "items-loaded") {
            state.inventoryItems = msg.inventoryItems;
            console.log("Inventory data loaded");
            state.inventoryItems.forEach((item) => {
                console.log(item.title);
            });
        } else if (msg.type === "id-counter-loaded") {
            console.log("Id counter loaded");
            state.nextId = msg.currentCount as number;
            console.log("appstate counter: ", state.nextId);
        } else if (msg.type === "submit-item-reg") {
            state.nextId++;
            msg.newInventoryItem.id = state.nextId;
            state.inventoryItems.push(msg.newInventoryItem);
            // state.view = "home";
            console.log(
                "pushed ",
                msg.newInventoryItem.title,
                "ID: ",
                msg.newInventoryItem.id,
            );
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
        } else if (state.view === "register") {
            const regView = createRegisterView(state, dispatch);
            root?.replaceChildren(header, regView);
        }
    }
    render();
}
