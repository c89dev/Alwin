export function HeaderComponent() {
  const headerEl = document.createElement("div")!;
  const header = document.querySelector("#header");

  function RenderHeaderView() {
    headerEl.innerHTML = `
    <div class="headerContainer">
        <button id="backBtn" class="btnBack hidden">⬅️🏠</button>
        <h1>Alwin - Stash it away 🐿️</h1>
    </div>

    `;
    const backBtn = headerEl.querySelector("#backBtn");

    if (backBtn) {
      backBtn.addEventListener("click", () => dispatch("home"));
    }
  }

  header?.replaceChildren(headerEl);
  RenderHeaderView();

  return headerEl;
}
