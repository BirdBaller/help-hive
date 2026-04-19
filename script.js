const resources = [
    { id: 1, title: "Hope for the warriors", category: "Volunteer", desc: "Hope For The Warriors is a nonprofit that turns your hope into tangible actions that directly support U.S. military, veterans and their families."},
    { id: 2, title: "CSS Styling", category: "Design", desc: "Make your pages look beautiful." },
    { id: 3, title: "JS Logic", category: "Programming", desc: "Add interactivity to your site." },
    { id: 4, title: "Shrevan", category: "captain", desc: "Web design black short yellow jacket leader"},
    { id: 5, title: "minhaz", category: "The goat", desc: "awesome smart nonchalant king nice best kid ever popular kind the goat" }
]
{
const top = document.querySelector(".topbar");
let lastScroll = window.scrollY;
    window.addEventListener("scroll", () => {
        if (lastScroll < window.scrollY){
            // going down
            top.classList.add("top-hide");
        } else {
            // going up
            top.classList.remove("top-hide");
        }
        if (window.scroll<0) {
            top.classList.remove("top-hide");
        }
        
        lastScroll = window.scrollY;
    });
}

{
    document.addEventListener("pointerup", mouseUp);
    
    function mouseDown(e){
        startY=e.clientY;
        document.addEventListener("pointermove", mouseMove);
    }
    
    function mouseMove(e){
        if (startY > e.clientY){
            foot.classList.add("foot-open");
        } else if(startY < e.clientY) {
            foot.classList.remove("foot-open");
        }
    }
    function mouseUp(e){
        document.removeEventListener("pointermove", mouseMove);
    }
}
/*function closeButton(x){
    const change = document.querySelector(".changing");
    const card = document.querySelector(".card");
    change.classList.add("change-close");
    card.classList.add("closed-card");
}
function moreInfo(){
    const change = document.querySelector(".changing");
    const card = document.querySelector(".card");
    change.classList.remove("change-close");
    card.classList.remove("closed-card");
}*/
function moreInfo(x){
  const card = x.parentElement.parentElement.parentElement;
  card.classList.add("expanded");

  card.querySelector(".changing").classList.remove("hidden");
  card.querySelector(".buttonRow").classList.remove("hidden");
  card.querySelector(".buttonRow").classList.add("flexylexy");
  card.querySelector(".moreInfo").classList.add("hidden");
}
function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate();
}


function closeButton(x){
  const card = x.parentElement.parentElement.parentElement.parentElement;
  card.classList.remove("expanded");
/*Was it a single line of code?*/
  card.querySelector(".changing").classList.add("hidden");
  card.querySelector(".buttonRow").classList.add("hidden");
  card.querySelector(".buttonRow").classList.remove("flexylexy");
  card.querySelector(".moreInfo").classList.remove("hidden");
}

function getResourceData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Resources"); // I think this is the sheet name you want
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();
  
  return data.map(row => {
    let obj = {};
    headers.forEach((header, i) => obj[header.toLowerCase()] = row[i]);
    return obj;
  });
}
function saveResource(index) {
  const item = allData[index];
  let savedItems = JSON.parse(localStorage.getItem('mySavedResources')) || [];
  if (!savedItems.some(saved => saved.title === item.title)) {
    savedItems.push(item);
    localStorage.setItem('mySavedResources', JSON.stringify(savedItems));
  }
  const toast = document.getElementById('toast');
  toast.style.visibility = "visible";
  setTimeout(() => { toast.style.visibility = "hidden"; }, 3000);
}



// Function to display cards
function displayCards(data) {
    cardGrid.innerHTML = ""; 
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <span class="badge">${item.category}</span>
            <p>${item.desc}</p>
            <button onclick="saveToLocal(${item.id})">Save Resource</button>
        `;
        cardGrid.appendChild(card);
    });
}

function filterResources() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    
    const filtered = resources.filter(item => {
        return item.title.toLowerCase().includes(searchTerm) || 
               item.desc.toLowerCase().includes(searchTerm);
    });
    
    displayCards(filtered);
}

function saveToLocal(id) {
    const itemToSave = resources.find(item => item.id === id);
    
    // 1. Get existing saved items or an empty array if none exist
    let savedList = JSON.parse(localStorage.getItem('mySavedResources')) || [];
    // 2. CHECK FOR DUPLICATES: 
    // .some() returns true if the ID already exists in the list
    const isAlreadySaved = savedList.some(item => item.id === id);

    if (isAlreadySaved) {
        alert(itemToSave.title + " is already in your list!");
    } else {
        // 3. Only add and save if it's NOT a duplicate
        savedList.push(itemToSave);
        localStorage.setItem('mySavedResources', JSON.stringify(savedList));
        alert(itemToSave.title + " has been saved to your list!");
    }
}

// Buttons listeners Resources... still not done
/*
function filterByType(button){
    const id = button.target.id;
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    
    const filtered = resources.filter(item => {
        return item.category.includes(id);
    });
    
    displayCards(filtered);
}
*/
// Trying to add a button that can remove saved elements from users list
/*
function removeSave(id){
    const itemToDelete = resources.find(item => item.id !== id);
    let savedList = JSON.parse(localStorage.getItem('mySavedResources'));
    for(item < 5, item = 0, item ++){
        println("removed" + str(id) + "from list")
    }
    savedList.push(itemToDelete);
    alert(itemToDelete.title + " has been removed from your list!");
}
*/
/*
const rvolunteer = document.addEventListener("click", filterByType());
const rvtrEvt = document.addEventListener("click", filterByType());
const revent = document.addEventListener("click", filterByType());
*/
  
