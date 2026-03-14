import type { AppState, InventoryItem, Dispatch } from "./types";
//API
import { saveInventoryToDisk } from "./api";

export function createRegisterView(
    state: AppState,
    dispatch: Dispatch,
): HTMLElement {
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

    const submitBtn = root.querySelector<HTMLButtonElement>("#submitBtn");

    submitBtn?.addEventListener("click", (event) => {
        event.preventDefault();
        const form = document.querySelector<HTMLFormElement>("#registerForm")!;
        const data = new FormData(form);
        const newInventoryItem: InventoryItem = {
            id: 0,
            title: data.get("title") as string,
            keywords: (data.get("keywords") as string).split(" "),
            sectionId: data.get("sectionId") as string,
            imageUrl: data.get("image") as string,
        };

        dispatch({ type: "submit-item-reg", newInventoryItem });
    });

    return root;
}
