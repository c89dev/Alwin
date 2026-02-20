function UpdateView(){
    const app = document.getElementById('app');
    if(app){
        app.innerHTML = /*html*/`
        <h1>Alwin - Stash it away</h1>
        <input class="inputBar" type="text" placeholder="Search for item">
        <button class="regBtn">Add item to inventory</button>
        `;
    }
}

UpdateView();