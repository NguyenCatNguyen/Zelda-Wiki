/*
- Get all entries: https://botw-compendium.herokuapp.com/api/v3/compendium/all
- Get category entries: https://botw-compendium.herokuapp.com/api/v3/compendium/category/<category>
- Get entry with ID:  https://botw-compendium.herokuapp.com/api/v3/compendium/entry/<id>

*/

// Initial variable
const entryList = document.querySelector(".entries__lists")
const category_list = document.querySelectorAll(".category")
const entry_Data = document.querySelector(".modal__description")

// Get entry data
function itemHTML(entry){
    return`
    <div class="entries__card" onclick="showModal(${entry.id})">
                    <img src="${entry.image}"" alt="" class="entry__img">
                    <div class="entry__info">
                        <p class="entry__id">${entry.id}</p>
                        <h3 class="entry__name">
                            ${entry.name}
                        </h3>
                    </div>
                </div>
    `
}

// Get modal html
function modalHTML(entry){
    return`
    <div class="modal__left">
                    <figure class="modal__img--cover">
                        <img class="modal__img" src="${entry.image}" alt="">
                    </figure>
                </div>
                <div class="modal__right">
                    <div class="modal__name"><span class="bold">Name: </span>${entry.name}</div>
                    <div class="modal__id"><span class="bold">ID: </span>${entry.id}</div>
                    <div class="modal__category"><span class="bold">Category: </span>${entry.category}</div>
                    <div class="common__location"><span class="bold"> Common Location: </span>${entry.common_locations}</div>
                    <p class="modal__discription"><span class="bold">Description: </span>${entry.description}</p>
                </div>
    `
}


// Data Fetch all data
async function main(){
    const entries = (await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/all"));
    const entriesData = await entries.json(); //Convert the data to JSON
    // Access the data and sort it base on ID
    const entriesArray = entriesData.data.sort((a,b)=>  a.id - b.id);
    entryList.innerHTML = entriesArray.map((entry)=>itemHTML(entry)).join("");
    
}

// Fetch Category button 
async function FetchCategory(category){
    const entries = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${category}`)
    const entriesData = await entries.json();

    // Access the data and sort it base on ID
    const entriesArray = entriesData.data.sort((a,b)=>  a.id - b.id); //Sort  array in order
    entryList.innerHTML = entriesArray.map((entry)=>itemHTML(entry)).join("");
}

async function showModal(id){
    // const entry = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${id}`)
    // const entryData = await entry.json();
    // entry_Data.innerHTML = console.log(entryData.map((entry)=>itemHTML(entry)).join(""));
    // document.querySelector("header").classList.add("hidden");
    document.querySelector("header").classList.add("disappear");
    document.querySelector(".category__nav").classList.add("disappear");
    document.querySelector(".entries").classList.add("disappear");
    document.querySelector(".modal").classList.remove("disappear");
}

// Close Modal
function closeModal(){
    document.querySelector("header").classList.remove("disappear");
    document.querySelector(".category__nav").classList.remove("disappear");
    document.querySelector(".entries").classList.remove("disappear");
    document.querySelector(".modal").classList.add("disappear");
}


// Loading screen
function showLoadingScreen(element) {
    // Add loading class to the element
    let elementClass = querySelector(`.${element}`);
    elementClass.classList.add('loading');
    // Remove loading class after the specified duration
    setTimeout(() => element.classList.remove('loading'), 2000);
}

// Get start button 
async function start_function(){
    document.querySelector(".landing").classList.add("hidden");
    await main(); // Wait for main function to finish retrieving data.
    document.querySelector(".category__List").classList.add("appear");
    document.querySelector(".nav_list").classList.add("appear");
    document.querySelector(".entries").classList.add("visible");
}


// Search Bar Function

// Run the method
document.getElementById('equipmentButton').addEventListener('click', () => FetchCategory('equipment'));
document.getElementById('treasureButton').addEventListener('click', () => FetchCategory('treasure'));
document.getElementById('materialsButton').addEventListener('click', () => FetchCategory('materials'));
document.getElementById('creaturesButton').addEventListener('click', () => FetchCategory('creatures'));
document.getElementById('monstersButton').addEventListener('click', () => FetchCategory('monsters'));


