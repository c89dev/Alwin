import { InventoryItem, Dispatch } from "./types";
import { currentRecords } from "./app";
import { UpdateHeaderView } from "./headerCmp";
import {
  FilterInventory,
  RegisterInventoryItem,
  searchResult,
  GetPage,
  SetPage,
} from "./controller";

export function UpdateMainView(items: InventoryItem[], page: string): void {
  console.log("UpdateMainView called, currentPage:", GetPage());
  UpdateHeaderView();

  const main = document.querySelector("#main");
  const content = document.createElement("div");
  content.classList.add("mainContainer");

  if (page === "home") {
    content.innerHTML = /*html*/ `
            <form id="searchForm">
                <input id="searchInput" class="searchBar" 
                type="text" placeholder="🔎 Search for item">
            </form>
            <button id="regBtn" class="btnLarge">➕ Register new item</button>
        `;

    main?.replaceChildren(content);

    document
      .querySelector("#searchForm")
      ?.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchInput = document.getElementById(
          "searchInput",
        ) as HTMLInputElement;
        const searchValue = searchInput.value;
        console.log("Submitted search: " + searchValue);
        FilterInventory(searchValue);
      });
    document.querySelector("#regBtn")?.addEventListener("click", (event) => {
      SetPage("register");
      UpdateMainView(currentRecords, GetPage());
    });
  }

  if (page === "searchResult") {
    if (searchResult.length > 0) {
      searchResult.forEach((item) => {
        content.innerHTML += /*html*/ `
            <article class="resultCard">
            <button>❌</button>
                <dt>Item:</dt>
                <dd>${item.name}</dd>
                <dt>Keywords:</dt>
                <dd>${item.keywords}</dd>
                <dt>Section:</dt>
                <dd>${item.sectionId}</dd>
                <p>Image: ${item.imageUrl}</p>
            </article>
        `;
      });
    } else {
      content.innerHTML = `
            <h2>No results</h2>
            `;
    }

    main?.replaceChildren(content);
    searchResult.length = 0;
  }

  if (page === "register") {
    content.innerHTML = /*html*/ `
        <h2>Add a new item to inventory</h2>
        <form class="registerForm">
            <input id="nameInput" class="formInput" type="text" 
            placeholder="Name of item">

            <input id="keywordInput" class="formInput" type="text" 
            placeholder="Keywords (separate by space)">
            
            <input id="sectionInput" class="formInput" type="text" 
            placeholder="Section/shelf ID">

            <input id="imageInput" class="formInput" type="text" 
            placeholder="Image URL (WIP)">
        </form>
        <button id="submitBtn" class="btnSmall">Add item to inventory</button>
        `;

    main?.replaceChildren(content);

    document.querySelector("#submitBtn")?.addEventListener("click", (event) => {
      const nameInput = document.querySelector(
        "#nameInput",
      ) as HTMLInputElement;
      const nameValue = nameInput.value;

      const keywordInput = document.querySelector(
        "#keywordInput",
      ) as HTMLInputElement;
      const keywordValue = keywordInput.value.split(" ");

      const sectionInput = document.querySelector(
        "#sectionInput",
      ) as HTMLInputElement;
      const sectionValue = sectionInput.value;

      const imageInput = document.querySelector(
        "#imageInput",
      ) as HTMLInputElement;
      const imageValue = imageInput.value;

      RegisterInventoryItem(nameValue, keywordValue, sectionValue, imageValue);
    });
  }
}
