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
        const form = document.querySelector<HTMLFormElement>("#registerForm")!;
        const data = new FormData(form);
        const newInventoryItem: InventoryItem = {
            id: 0,
            title: data.get("title") as string,
            keywords: (data.get("keywords") as string).split(""),
            sectionId: data.get("sectionId") as string,
            imageUrl: data.get("image") as string,
        };

        dispatch({ type: "submit-item-reg", newInventoryItem });
    });

    return root;
}

// function addItemToWorkingInventory(
//     title: string,
//     keyword: string,
//     section: string,
//     image: string,
// ) {}
//
//     document.querySelector("#submitBtn")?.addEventListener("click", (event) => {
//         const nameInput = document.querySelector(
//             "#nameInput",
//         ) as HTMLInputElement;
//         const nameValue = nameInput.value;
//
//         const keywordInput = document.querySelector(
//             "#keywordInput",
//         ) as HTMLInputElement;
//         const keywordValue = keywordInput.value.split(" ");
//
//         const sectionInput = document.querySelector(
//             "#sectionInput",
//         ) as HTMLInputElement;
//         const sectionValue = sectionInput.value;
//
//         const imageInput = document.querySelector(
//             "#imageInput",
//         ) as HTMLInputElement;
//         const imageValue = imageInput.value;
//
//         RegisterInventoryItem(
//             nameValue,
//             keywordValue,
//             sectionValue,
//             imageValue,
//         );
//     });
// }
