"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHomeView = createHomeView;
function createHomeView(dispatch) {
    const root = document.createElement("section");
    root.classList.add("mainContainer");
    root.innerHTML = /*html*/ `
            <form id="searchForm">
                <input id="searchInput" class="searchBar" 
                type="text" placeholder="🔎 Search for item">
            </form>
            <button id="regBtn" class="btnLarge">➕ Register new item</button>
        `;
    const searchForm = root.querySelector("#searchForm");
    const searchInput = root.querySelector("#searchInput");
    if (!searchForm || !searchInput)
        return root;
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = searchInput.value;
        console.log("User input: ", input);
        dispatch({ type: "search", query: input });
    });
    const regBtn = root.querySelector("#regBtn");
    regBtn.addEventListener("click", (event) => {
        dispatch({ type: "register" });
    });
    return root;
}
