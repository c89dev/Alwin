"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountApp = mountApp;
const headerView_1 = require("./headerView");
const homeView_1 = require("./homeView");
const listView_1 = require("./listView");
const regView_1 = require("./regView");
//API
const api_1 = require("./api");
function mountApp(state) {
    const root = document.getElementById("app");
    function dispatch(msg) {
        if (msg.type === "home") {
            state.view = "home";
        }
        else if (msg.type === "register") {
            state.view = "register";
        }
        else if (msg.type === "search") {
            state.currentSearch = msg.query;
            state.view = "list";
        }
        else if (msg.type === "items-loaded") {
            state.inventoryItems = msg.inventoryItems;
            console.log("Inventory data loaded");
        }
        else if (msg.type === "id-counter-loaded") {
            console.log("Id counter loaded");
            state.nextId = msg.currentCount;
            console.log("appstate counter: ", state.nextId);
        }
        else if (msg.type === "submit-item-reg") {
            state.nextId++;
            msg.newInventoryItem.id = state.nextId;
            state.inventoryItems.push(msg.newInventoryItem);
            (0, api_1.saveInventoryToDisk)(state.inventoryItems);
            (0, api_1.saveIdCountToDisk)(state.nextId);
        }
        else if (msg.type === "delete") {
            deleteItem(state, msg);
        }
        render();
    }
    (0, api_1.loadInventoryFromDisk)().then((items) => {
        dispatch({
            type: "items-loaded",
            inventoryItems: items,
        });
    });
    (0, api_1.loadIdCounterFromDisk)().then((loadedCount) => {
        dispatch({
            type: "id-counter-loaded",
            currentCount: loadedCount,
        });
    });
    function render() {
        const header = (0, headerView_1.createHeaderView)(state, dispatch);
        if (state.view === "home") {
            const homeView = (0, homeView_1.createHomeView)(dispatch);
            root?.replaceChildren(header, homeView);
        }
        else if (state.view === "list") {
            const listView = (0, listView_1.createListView)(state, dispatch);
            root?.replaceChildren(header, listView);
        }
        else if (state.view === "register") {
            const regView = (0, regView_1.createRegisterView)(state, dispatch);
            root?.replaceChildren(header, regView);
        }
    }
    render();
}
function deleteItem(state, msg) {
    if (msg.type === "delete") {
        const proceed = confirm("⚠️ Permanently delete item?");
        if (!proceed) {
            console.log("Cancel delete, returning");
            return;
        }
        else if (proceed) {
            state.inventoryItems = state.inventoryItems.filter((item) => item.id !== msg.id);
        }
        (0, api_1.saveInventoryToDisk)(state.inventoryItems);
    }
}
