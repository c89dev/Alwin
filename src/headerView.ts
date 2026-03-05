import type { AppState, Dispatch } from "./types";

export function createHeaderView(
    state: AppState,
    dispatch: Dispatch,
): HTMLElement {
    const root = document.createElement("header")!;

    root.innerHTML = `
    <div class="headerContainer">
        <button id="backBtn" class="btnBack hidden">⬅️🏠</button>
        <h1>Alwin - Stash it away 🐿️</h1>
    </div>
    `;

    const backBtn = root.querySelector<HTMLButtonElement>("#backBtn");
    if (state.view !== "home") {
        backBtn?.classList.remove("hidden");
        backBtn?.addEventListener("click", (event) => {
            dispatch({ type: "home" });
        });
    }

    return root;
}
