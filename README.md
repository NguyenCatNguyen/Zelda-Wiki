# Zelda Compendium
A web application that display `The Legend of Zelda: Breath of the Wild` compendium. The compendium contains all the information about the creatures, monsters, materials, equipment, and more in the game. The website is built using HTML, CSS, and JavaScript. The data is fetched from the Hyrule Compendium API.
## Live Site
- Visit the website [here](https://nguyencatnguyen.github.io/Zelda-Wiki/index.html)
- View the source code [here](https://github.com/NguyenCatNguyen/Zelda-Wiki)

## Why I Build This
The main reason for building this website is to create a compendium for one of my favorite games. Throughout this process, I have been able to enhance my frontend skills. I have learned how to utilize APIs to fetch data from servers and display it on the website. Additionally, I have had the opportunity to practice my HTML, CSS, and JavaScript skills. This project has been both enjoyable and exciting, providing me with the chance to test my creativity and problem-solving abilities in designing and implementing the website.
## Technologies Used
- `API`: [Hyrule Compendium API](https://github.com/gadhagod/Hyrule-Compendium-API)
- `HTML5`
- `CSS3`
- `JavaScript`
## Features
- Display all the entries in the Hyrule Compendium
- Filter the entries by category
- Search for a specific entry
- User can select favorite entries and display them in a separate section
- User can view the details of each entry
## What I Learned
### 1. Learn how to use API to fetch data from the server
- **Thought process**:
  - I need to fetch the data from the server to display the information on the website.
  - I learn that the data I receive from the server is in a object format, so I need to convert it to an array to use the array methods.
```javascript
// Varible to access the entries list
const entryList = document.querySelector(".entries__lists")
async function main(){
    const entries = (await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/all"));
    const entriesData = await entries.json();  //Convert the data to json format 
    //Access the array
    const entriesArray = entriesData.data.sort((a,b)=>  a.id - b.id); //Sort  array in order
    entryList.innerHTML = entriesArray.map((entry)=>itemHTML(entry)).join("");
}
```

### 2. Sort an array of objects by a property value
```javascript
const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
```

### 3. How to make category button more dynamic and reusable
- Set the button to be able to change the category when clicked and also remain active
- Be able to select and unselect the button.
- There are two case when button is unselected:
    - Another button is being selected and cause the current button to be unselected.
    - The current button is being unselected and the full data is being displayed. 


