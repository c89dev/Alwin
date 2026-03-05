import type { InventoryItem, Dispatch } from "./types";

export function createHomeView(dispatch: Dispatch): HTMLElement {
    const root = document.createElement("section");
    root.classList.add("mainContainer");

    root.innerHTML = /*html*/ `
            <form id="searchForm">
                <input id="searchInput" class="searchBar" 
                type="text" placeholder="🔎 Search for item">
            </form>
            <button id="regBtn" class="btnLarge">➕ Register new item</button>
        `;

    const searchInput = root.querySelector<HTMLInputElement>("#searchInput")!;
    const regBtn = root.querySelector<HTMLInputElement>("#regBtn")!;

    regBtn.addEventListener("click", (event) => {
        dispatch({ type: "register" });
    });

    return root;
}
