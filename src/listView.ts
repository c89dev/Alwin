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

    const deleteButtons = root.querySelectorAll<HTMLButtonElement>(
        'button[data-action="delete"]',
    )!;

    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const dataId = btn.getAttribute("data-id");
            const id = Number(dataId);
            if (id) {
                console.log("trying to del: ", id);
                dispatch({ type: "delete", id });
            }
        });
    });

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
            <button id="delBtn" class="btnSmall" data-action="delete" data-id="${item.id}">❌</button>
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
