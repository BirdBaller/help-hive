const switched = document.getElementById("LightSwitch");
switched.checked = localStorage.switched === "1";
switched.onchange = () => localStorage.switched = switched.checked ? "1" : "0";



const resources = [
    
    {
    id: "card1",
    title: "Hope for the Warriors",
    category: "Volunteer",
    rating: "5.0",
    desc: "Supports veterans and their families.",
    img: "https://news.va.gov/wp-content/uploads/sites/3/2022/08/HopeForTheWarriors-scaled.jpg",
    location: "8003 Forbes Pl, Springfield, VA",
    website: "https://www.hopeforthewarriors.org/",
    email: "info@hopeforthewarriors.org",
    phone: "(877) 2HOPE4W",
    hours: "Mon-Fri 8a-6p"
  },
  {
    id: "card2",
    title: "Animal Adoption Event",
    category: "Event",
    rating: "4.9",
    desc: "Monthly adoption event for animals.",
    img: "https://i.ibb.co/sYLR27k/Screenshot.png",
    location: "1234 Sesame St, VA",
    website: "https://example.com",
    email: "info@example.com",
    phone: "420-123-4567",
    hours: "First Monday monthly"
  }
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


window.onload = loadSavedCards;
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

function saveToLocal(id) {
    const itemToSave = resources.find(item => item.id === id);
    let savedList = getSaved();
    
    if (savedList.some(item => item.id === id)) {
        alert(itemToSave.title + " is already in your list!");
    } else {
        savedList.push(itemToSave);
        setSaved(savedList);
        alert(itemToSave.title + " has been saved!");
    }
}

function saveFromCard(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;

    const item = {
        id: cardId,
        title: card.querySelector("h1").innerText,
        img: card.querySelector(".card-constants img").src,
        rating: card.querySelector(".rating p").innerText,
        category: card.querySelector(".category p").innerText,
        desc: card.querySelector(".card-variable p").innerText,
        // We grab the HTML of the infoRows to keep all the icons and contact info
        details: card.querySelector(".card-variable").innerHTML 
    };

    let savedList = getSaved();
    if (!savedList.some(i => i.id === cardId)) {
        savedList.push(item);
        setSaved(savedList);
        alert("Saved to Hive!");
    } else {
        alert("Already in your Hive!");
    }
}


function getSaved() {
    return JSON.parse(localStorage.getItem("mySavedResources")) || [];
}

function setSaved(data) {
    localStorage.setItem("mySavedResources", JSON.stringify(data));
}

function removeItem(id) {
    let savedData = getSaved();
    // Filter out the item
    const filtered = savedData.filter(item => item.id != id);
    setSaved(filtered);
    renderSaved(); // Refresh the list immediately
}
function renderSaved() {
    const savedGrid = document.getElementById("savedGrid");
    if (!savedGrid) return;

    const savedData = getSaved();
    savedGrid.innerHTML = "";

    if (savedData.length === 0) {
        savedGrid.innerHTML = "<p class='unsaved'>Your Hive is empty!</p>";
        return;
    }

    savedData.forEach(item => {
        savedGrid.innerHTML += `
            <div class="card expanded"> 
                <div class="card-constants">
                    <img src="${item.img}" class="saved-img-fix">
                    <div class="grid-dy">
                        <h1>${item.title}</h1>
                        <div class="rating">
                            <img src="cardIcons/star.png">
                            <p>${item.rating}</p>
                            <div class="category"><p>${item.category}</p></div>
                        </div>
                    </div>
                </div>
                <div class="card-variable" style="max-height: none; overflow: visible; display: block;">
                    <p class="desc-text">${item.desc}</p>
                    
                    <div class="info-container">
                        ${item.details} 
                    </div>

                    <div class="favorite">
                        <button class="remove-btn" onclick="removeItem('${item.id}')">Remove from List</button>
                    </div>
                </div>
            </div>
        `;
    });
}


function displayCards(data) {
    const cardGrid = document.getElementById('cardGrid');
    if(!cardGrid) return;
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


renderSaved();



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
  
