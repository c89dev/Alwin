import type { InventoryItem, Dispatch, AppState } from "./types";

export function createListView(
    state: AppState,
    dispatch: Dispatch,
): HTMLElement {
    const inventory = state.inventoryItems;
    var searchQuery = state.currentSearch;
    const root = document.createElement("section");
    root.classList.add("mainContainer", "dummy");
    const itemsHtml = buildInventoryItemsHtml(inventory, searchQuery);
    root.innerHTML = itemsHtml;

    return root;
}

function buildInventoryItemsHtml(
    inventoryItems: InventoryItem[],
    searchQuery: string,
): string {
    return inventoryItems
        .filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .map((item) => {
            return /*html*/ `
            <article class="resultCard">
            <button id="delBtn" class="btnSmall">❌</button>
                <dt>Item:</dt>
                <dd>${item.title}</dd>
                <dt>Keywords:</dt>
                <dd>${item.keywords}</dd>
                <dt>Section:</dt>
                <dd>${item.sectionId}</dd>
                <p>Image: ${item.imageUrl}</p>
            </article>
        `;
        })
        .join("");
}
