import { pageState } from "./model/model"
import {RegisterInventoryItem} from "./controller/controller"; 

function UpdateView(){
    const app = document.getElementById('app')!;
    if(pageState.currentPage === "home"){
        app.innerHTML = /*html*/`
        <h1>Alwin - Stash it away</h1>
        <input id="searchInput" class="searchBar" type="text" placeholder="Search for item">
        <button id="regBtn" class="btnLarge">Register new item</button>
        `;
        document.querySelector('#regBtn')?.addEventListener('click', (event) => {
            pageState.currentPage = "register";
            UpdateView();
            console.log("what")
        })
        
    }
    if(pageState.currentPage === "register"){
        app.innerHTML = /*html*/`
        <h1>Alwin - Stash it away</h1>
        <button id="backBtn" class="btnSmall">Back</button>"
        <h2>Add a new item to inventory</h2>
        <form class="registerForm">
            <input id="nameInput" class="formInput" type="text" placeholder="Name of item">
            <input id="keywordInput" class="formInput" type="text" placeholder="Keywords (separate by space)">
            <input id="sectionInput" class="formInput" type="text" placeholder="Section/shelf ID">
            <input id="imageInput" class="formInput" type="text" placeholder="Image URL">
        </form>
        <button id="regBtn" class="btnSmall">Add item to inventory</button>
        `;
        const nameInput = document.querySelector('#nameInput') as HTMLInputElement;
        const nameValue = nameInput.value;
        
        const keywordInput = document.querySelector('#keywordInput') as HTMLInputElement;
        const keywordValue = keywordInput.value.split(" ",);
        
        const sectionInput = document.querySelector('#sectionInput') as HTMLInputElement;
        const sectionValue = sectionInput.value;
        
        const imageInput = document.querySelector('#imageInput') as HTMLInputElement;
        const imageValue = imageInput.value;
        
        document.querySelector("#regBtn")?.addEventListener('click', (event) => {
            RegisterInventoryItem(nameValue, keywordValue, sectionValue, imageValue);
        })
    }
}

UpdateView();