(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();function u(t,o){const n=document.createElement("header");n.innerHTML=`
    <div class="headerContainer">
        <button id="backBtn" class="btnBack hidden">⬅️🏠</button>
        <h1>Alwin - Stash it away 🐿️</h1>
    </div>
    `;const i=n.querySelector("#backBtn");return t.view!=="home"&&(i?.classList.remove("hidden"),i?.addEventListener("click",e=>{o({type:"home"})})),n}function p(t){const o=document.createElement("section");o.classList.add("mainContainer"),o.innerHTML=`
            <form id="searchForm">
                <input id="searchInput" class="searchBar" 
                type="text" placeholder="🔎 Search for item">
            </form>
            <button id="regBtn" class="btnLarge">➕ Register new item</button>
        `;const n=o.querySelector("#searchForm"),i=o.querySelector("#searchInput");return!n||!i||(n.addEventListener("submit",r=>{r.preventDefault();const s=i.value;console.log("User input: ",s),t({type:"search",query:s})}),o.querySelector("#regBtn").addEventListener("click",r=>{t({type:"register"})})),o}function m(t,o){const n=document.createElement("section"),i=t.inventoryItems;var e=t.currentSearch;n.classList.add("mainContainer","dummy");const r=y(i,e);return n.innerHTML=r,n.querySelectorAll('button[data-action="delete"]').forEach(c=>{c.addEventListener("click",S=>{const l=c.getAttribute("data-id"),d=Number(l);d&&(console.log("trying to del: ",d),o({type:"delete",id:d}))})}),n}function y(t,o){return t.filter(n=>n.title.toLowerCase().includes(o.toLowerCase())||n.keywords.some(i=>i.toLowerCase().includes(o.toLowerCase()))).map(n=>`
            <article class="resultCard">
            <button id="delBtn" class="btnSmall" data-action="delete" data-id="${n.id}">❌</button>
                <dt>Item:</dt>
                <dd>${n.title}</dd>
                <dt>Keywords:</dt>
                <dd>${n.keywords}</dd>
                <dt>Section:</dt>
                <dd>${n.sectionId}</dd>
                <p>Image: ${n.imageUrl}</p>
            </article>
        `).join("")}function f(t,o){const n=document.createElement("section");return n.classList.add("mainContainer"),n.innerHTML=`
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
        `,n.querySelector("#submitBtn")?.addEventListener("click",e=>{e.preventDefault();const r=document.querySelector("#registerForm"),s=new FormData(r),c={id:0,title:s.get("title"),keywords:s.get("keywords").split(" "),sectionId:s.get("sectionId"),imageUrl:s.get("image")};o({type:"submit-item-reg",newInventoryItem:c})}),n}async function h(){return await(await fetch("http://localhost:3000/api/inventory")).json()}async function a(t){const n=await(await fetch("http://localhost:3000/api/inventory",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json();return console.log("writing inventory to disk"),n}async function v(t){const n=await(await fetch("http://localhost:3000/api/idcounter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json();return console.log("writing idcount to disk"),n}async function I(){return await(await fetch("http://localhost:3000/api/idcounter")).json()}function w(t){const o=document.getElementById("app");function n(e){e.type==="home"?t.view="home":e.type==="register"?t.view="register":e.type==="search"?(t.currentSearch=e.query,t.view="list"):e.type==="items-loaded"?(t.inventoryItems=e.inventoryItems,console.log("Inventory data loaded")):e.type==="id-counter-loaded"?(console.log("Id counter loaded"),t.nextId=e.currentCount,console.log("appstate counter: ",t.nextId)):e.type==="submit-item-reg"?(t.nextId++,e.newInventoryItem.id=t.nextId,t.inventoryItems.push(e.newInventoryItem),a(t.inventoryItems),v(t.nextId)):e.type==="delete"&&g(t,e),i()}h().then(e=>{n({type:"items-loaded",inventoryItems:e})}),I().then(e=>{n({type:"id-counter-loaded",currentCount:e})});function i(){const e=u(t,n);if(t.view==="home"){const r=p(n);o?.replaceChildren(e,r)}else if(t.view==="list"){const r=m(t,n);o?.replaceChildren(e,r)}else if(t.view==="register"){const r=f(t,n);o?.replaceChildren(e,r)}}i()}function g(t,o){if(o.type==="delete"){const n=confirm("⚠️ Permanently delete item?");if(n)n&&(t.inventoryItems=t.inventoryItems.filter(i=>i.id!==o.id));else{console.log("Cancel delete, returning");return}a(t.inventoryItems)}}function b(){return{view:"home",inventoryItems:[],currentTargetId:null,currentSearch:"",nextId:0}}const L=b();w(L);
