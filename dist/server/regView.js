"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegisterView = createRegisterView;
function createRegisterView(state, dispatch) {
    const root = document.createElement("section");
    root.classList.add("mainContainer");
    root.innerHTML = /*html*/ `
        <h2>Add a new item to inventory</h2>
        <form id="registerForm">
            <input name="title" type="text" 
            placeholder="Name of item">

            <input name="keywords" type="text" 
            placeholder="Keywords (separate by space)">
            
            <input name="sectionId" type="text" 
            placeholder="Section/shelf ID">

            <input name="image" type="text" 
            placeholder="Image URL (WIP)">

            <button id="submitBtn" class="btnSmall" 
            type='submit'>Add item to inventory</button>
        </form>
        `;
    const submitBtn = root.querySelector("#submitBtn");
    submitBtn?.addEventListener("click", (event) => {
        event.preventDefault();
        const form = document.querySelector("#registerForm");
        const data = new FormData(form);
        const newInventoryItem = {
            id: 0,
            title: data.get("title"),
            keywords: data.get("keywords").split(" "),
            sectionId: data.get("sectionId"),
            imageUrl: data.get("image"),
        };
        dispatch({ type: "submit-item-reg", newInventoryItem });
    });
    return root;
}
