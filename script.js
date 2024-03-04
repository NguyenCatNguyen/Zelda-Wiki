/*
- Get all entries: https://botw-compendium.herokuapp.com/api/v3/compendium/all
- Get category entries: https://botw-compendium.herokuapp.com/api/v3/compendium/category/<category>
- Get entry with ID:  https://botw-compendium.herokuapp.com/api/v3/compendium/entry/<id>

*/

// Initial variable
const entryList = document.querySelector(".entries__lists")
const category_list = document.querySelectorAll(".category")
const entry_Data = document.querySelector(".modal__description")
let scrollPosition = 0; // Set origin position
let searchBar = document.querySelector(".search__bar");
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
document.querySelector('#filter').addEventListener('change', filter);

//Filter Entry
async function filter(e){
    loading();
    const entries = await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/all");
    const entriesData = await entries.json(); //Convert the data to JSON

    let value = e.target.value; // Get the value of the selected option
    let sortedData;
    if(value === 'ALPHABET_ORDER'){
        sortedData = entriesData.data.sort((a,b)=> a.name.localeCompare(b.name));    
    }else if (value === 'ID_HIGH'){
        sortedData = entriesData.data.sort((a,b)=> b.id - a.id);    
    }else if(value === 'ID_LOW'){
        sortedData = entriesData.data.sort((a,b)=> a.id - b.id);    
    }
    // Access the data and sort it base on ID
    entryList.innerHTML = sortedData.map((entry)=>itemHTML(entry)).join("");
}

// Fetch Category button 
async function FetchCategory(category){
    loading();
    const entries = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${category}`)
    const entriesData = await entries.json();

    // Access the data and sort it base on ID
    const entriesArray = entriesData.data.sort((a,b)=>  a.id - b.id); //Sort  array in order
    entryList.innerHTML = entriesArray.map((entry)=>itemHTML(entry)).join("");
}

async function showModal(id){
    const entry = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${id}`)
    const entryData = await entry.json();
    const entryView = entryData.data;
    entry_Data.innerHTML = modalHTML(entryView)
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    // Close downt the current table before display modal
    document.querySelector("header").classList.add("disappear");
    document.querySelector(".category__nav").classList.add("disappear");
    document.querySelector(".entries").classList.add("disappear");
    document.querySelector(".modal").classList.remove("disappear");
}

// Close Modal
function closeModal(){

    document.querySelector(".modal").classList.add("disappear");

    document.querySelector("header").classList.remove("disappear");
    document.querySelector(".category__nav").classList.remove("disappear");
    document.querySelector(".entries").classList.remove("disappear");
    window.scrollTo(0, scrollPosition);
    
}




// Get start button 
async function start_function(){
    document.querySelector(".landing").classList.add("hidden");
    document.querySelector(".footer").classList.add("hidden");
    await main(); // Wait for main function to finish retrieving data.
    document.querySelector(".category__List").classList.add("appear");
    document.querySelector(".nav_list").classList.add("appear");
    document.querySelector(".entries").classList.add("visible");

}


//Active search__bar
function activeSearch(){
    main();
    document.querySelector('.search__bar').classList.remove('hidden');
    document.querySelector(".search__bar").classList.add('appear');
    document.querySelector("#filter").classList.remove('hidden');
    document.querySelector("#filter").classList.add('appear');
    document.querySelector(".category__List").classList.remove("appear")
    document.querySelector(".category__List").classList.add("hidden")

}

//Loading state
function loading(){
    document.querySelector(".entries").classList.remove("visible");
    document.querySelector(".loading__state").classList.remove("disappear");
    
    // Show entries after wait
    setTimeout(function() {
        document.querySelector(".loading__state").classList.add("disappear");
        document.querySelector(".entries").classList.add("visible");
    }, 2000);
}

// Search Bar Function
function onSearchInput(){
    const searchValue = searchBar.value.toLowerCase();
}


// Run the method
document.getElementById('equipmentButton').addEventListener('click', () => FetchCategory('equipment'));
document.getElementById('treasureButton').addEventListener('click', () => FetchCategory('treasure'));
document.getElementById('materialsButton').addEventListener('click', () => FetchCategory('materials'));
document.getElementById('creaturesButton').addEventListener('click', () => FetchCategory('creatures'));
document.getElementById('monstersButton').addEventListener('click', () => FetchCategory('monsters'));

// Search Bar active
// searchBar.addEventListener("input", onSearchInput);