import type { InventoryItem, Dispatch } from "./types";

export function createListView(
    inventoryItems: InventoryItem[],
    dispatch: Dispatch,
): HTMLElement {
    const root = document.createElement("section");
    root.classList.add("mainContainer");
    const itemsHtml = buildInventoryItemsHtml(inventoryItems);

    return root;
}

function buildInventoryItemsHtml(inventoryItems: InventoryItem[]): string {
    return inventoryItems
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
