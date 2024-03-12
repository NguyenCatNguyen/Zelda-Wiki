/*
- Get all entries: https://botw-compendium.herokuapp.com/api/v3/compendium/all
- Get category entries: https://botw-compendium.herokuapp.com/api/v3/compendium/category/<category>
- Get entry with ID:  https://botw-compendium.herokuapp.com/api/v3/compendium/entry/<id>

*/

// Initial variable
const entryList = document.querySelector(".entries__lists")
const category_list = document.querySelectorAll(".category")
const entry_Data = document.querySelector(".modal")
let scrollPosition = 0; // Set origin position
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
    <div class="modal__tab">
                <i id="close__btn" class="fa-solid fa-x" onclick="closeModal()" ></i>
                <div class="modal__description">
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
                </div>
                <i id="favorite__btn" class="fa-solid fa-heart"></i>
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


// Show entries function
async function start_function(){
    document.querySelector(".landing").classList.add("fadeAway");
    document.querySelector(".footer").classList.add("fadeAway");
    await main(); // Wait for main function to finish retrieving data.
    document.querySelector(".category__nav").classList.add("fadeIn");
    document.querySelector(".category__nav").classList.remove("hidden");
    document.querySelector(".entries").classList.add("fadeIn");
    document.querySelector(".entries").classList.remove("hidden");
    document.querySelector(".nav_list").classList.add("appear");
    document.querySelector(".landing").classList.add("hidden");

}

//Loading state
function Loading(){
    document.querySelector(".loading__state").classList.remove("hidden");
    document.querySelector(".entries").classList.add("hidden");
    setTimeout(() => {
        document.querySelector(".loading__state").classList.add("hidden");
        document.querySelector(".entries").classList.remove("hidden");

    }, 3000);


}

//Select category
async function cs(category){
    Loading();
    const entries = (await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${category}`));
    const entriesData = await entries.json(); //Convert the data to JSON
    // Access the data and sort it base on ID
    const entriesArray = entriesData.data.sort((a,b)=>  a.id - b.id);
    entryList.innerHTML = entriesArray.map((entry)=>itemHTML(entry)).join("");
}





function activeSearch(){
    document.querySelector(".search__bar").classList.remove("hidden");
    document.querySelector(".category__nav").classList.add("hidden");
    searchFunction();
}

// On change search function
async function searchFunction(){
    const searchInput = document.querySelector("[data-search]");
    const entries = (await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/all"));
    const entriesData = await entries.json(); //Convert the data to JSON
    // Access the data and sort it base on ID
    const entriesArray = entriesData.data.sort((a,b)=>  a.id - b.id);
    entryList.innerHTML = entriesArray.map((entry)=>itemHTML(entry)).join("");
    searchInput.addEventListener("input", e =>{
        const value = e.target.value; // Get the value of the input
        const filteredData = entriesArray.filter(entry => entry.name.toLowerCase().includes(value.toLowerCase()) || entry.id.toString().includes(value)); // Filter the data based on the value
        entryList.innerHTML = filteredData.map((entry)=>itemHTML(entry)).join("");
    })
}

//MODEL SECTION

// Show modal
async function showModal(id){
    const entry = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${id}`)
    const entryData = await entry.json();
    const entryView = entryData.data;
    entry_Data.innerHTML = modalHTML(entryView)
    // scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    // Close downt the current table before display modal
    document.querySelector("header").classList.add("hidden");
    document.querySelector(".category__nav").classList.add("hidden");
    document.querySelector(".entries").classList.add("hidden");
    document.querySelector(".modal").classList.remove("hidden");
}

// Close modal
function closeModal(){
    document.querySelector("header").classList.remove("hidden");
    document.querySelector(".category__nav").classList.remove("hidden");
    document.querySelector(".entries").classList.remove("hidden");
    document.querySelector(".modal").classList.add("hidden");
    window.scrollTo(0, scrollPosition);
}
