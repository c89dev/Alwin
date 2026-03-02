import { currentRecords } from "./app";
import { GetPage, SetPage } from "./controller";
import { UpdateMainView } from "./mainCmp";

export function UpdateHeaderView() {
  const headerEl = document.createElement("div")!;
  const header = document.querySelector("#header");

  headerEl.innerHTML = `
    <div class="headerContainer">
        <button id="backBtn" class="btnBack hidden">⬅️🏠</button>
        <h1>Alwin - Stash it away 🐿️</h1>
    </div>
    `;

  header?.replaceChildren(headerEl);

  const backBtn = headerEl.querySelector("#backBtn");

  if (GetPage() !== "home") {
    backBtn.classList.remove("hidden");
    backBtn.addEventListener("click", () => {
      SetPage("home");
      UpdateMainView(currentRecords, GetPage());
    });
  }
}
