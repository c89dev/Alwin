// just a test 

import { pageState } from "./model/model"
import {RegisterInventoryItem} from "./controller/controller"; 
import {FilterInventory} from "./controller/controller";
import {searchResult} from "./model/model";

export function UpdateView(){
    UpdateHeaderView();
    const app = document.getElementById('app')!;
    if(pageState.currentPage === "home"){
        app.innerHTML = /*html*/`
        <container class="homeContainer">
            <form id="searchForm">
                <input id="searchInput" class="searchBar" type="text" placeholder="🔎 Search for item">
            </form>
            <button id="regBtn" class="btnLarge">➕ Register new item</button>
        </container>
        `;
        document.querySelector("#searchForm")?.addEventListener("submit", (event) => {
            event.preventDefault();
            const searchInput = document.getElementById("searchInput") as HTMLInputElement;
            const searchValue = searchInput.value;
            console.log(searchValue);
            console.log("Submitted search:" + searchValue);
            FilterInventory(searchValue);
        })
        document.querySelector('#regBtn')?.addEventListener('click', (event) => {
            pageState.currentPage = "register";
            UpdateView();
            console.log("what")
        })
        
    }
    if(pageState.currentPage === "searchResult"){
        app.innerHTML = /*html*/`
            <h2>Results</h2>
        `;
        
        if(searchResult.length > 0){
        searchResult.forEach((item) => {
            app.innerHTML += `
            <article class="resultCard">
                <dt>Item:</dt>
                <dd>${item.name}</dd>
                <dt>Keywords:</dt>
                <dd>${item.keywords}</dd>
                <dt>Section:</dt>
                <dd>${item.sectionId}</dd>
                <p>Image: ${item.imageUrl}</p>
            </article>
            💠\n
        `
        });   
        }
        else {
            app.innerHTML += `
            <h2>No results</h2>
            `
        }
        searchResult.length = 0;
    }
    
    if(pageState.currentPage === "register"){
        app.innerHTML = /*html*/`
        <h2>Add a new item to inventory</h2>
        <form class="registerForm">
            <input id="nameInput" class="formInput" type="text" placeholder="Name of item">
            <input id="keywordInput" class="formInput" type="text" placeholder="Keywords (separate by space)">
            <input id="sectionInput" class="formInput" type="text" placeholder="Section/shelf ID">
            <input id="imageInput" class="formInput" type="text" placeholder="Image URL (WIP)">
        </form>
        <button id="submitBtn" class="btnSmall">Add item to inventory</button>
        `;
        document.querySelector("#submitBtn")?.addEventListener('click', (event) => {
            const nameInput = document.querySelector('#nameInput') as HTMLInputElement;
            const nameValue = nameInput.value;
            
            const keywordInput = document.querySelector('#keywordInput') as HTMLInputElement;
            const keywordValue = keywordInput.value.split(" ",);
            
            const sectionInput = document.querySelector('#sectionInput') as HTMLInputElement;
            const sectionValue = sectionInput.value;
            
            const imageInput = document.querySelector('#imageInput') as HTMLInputElement;
            const imageValue = imageInput.value;
            RegisterInventoryItem(nameValue, keywordValue, sectionValue, imageValue);
        })
    }
}

function UpdateHeaderView(){
    const header = document.getElementById('header')!;
    const backBtn = document.getElementById('backBtn');
    header.innerHTML = `
    <container class="headerContainer">
        <button id="backBtn" class="btnBack hidden">⬅️🏠</button>
        <h1>Alwin - Stash it away 🐿️</h1>
    </container>
    
    `
    document.querySelector("#backBtn")!.addEventListener('click', (event) => {
        pageState.currentPage = "home";
        UpdateView();
    })
    if(pageState.currentPage !== "home"){
        console.log(pageState.currentPage);
        document.querySelector("#backBtn").classList.remove("hidden")!;
    }
    
}

UpdateView();
