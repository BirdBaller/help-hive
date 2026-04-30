let resources = [
    {id: 1, title: "Resource One", category: "Education", desc: "Description of tool 1", img: "https://via.placeholder.com/150", rating: "4.5"},
    {id: 2, title: "Resource Two", category: "Health", desc: "Description of tool 2", img: "https://via.placeholder.com/150", rating: "4.8"}
];

let startY;
const foot = document.querySelector(".footer") || document.createElement('div');

window.onload = () => {
    displayCards(resources);
    renderSaved();
};

const switched = document.getElementById("lightSwitch");
if (switched) {
    switched.checked = localStorage.switched === "1";
    switched.onchange = () => localStorage.switched = switched.checked ? "1" : "0";
}

const topbar = document.querySelector(".topbar");
let lastScroll = window.scrollY;

window.addEventListener("scroll", () => {
    if (!topbar) return;
    
    if (lastScroll < window.scrollY) {
        topbar.classList.add("top-hide");
    } else {
        topbar.classList.remove("top-hide"); 
    }
    
    if (window.scrollY <= 0) {
        topbar.classList.remove("top-hide");
    }
    lastScroll = window.scrollY;
});

function mouseDown(e) {
    startY = e.clientY;
    document.addEventListener("pointermove", mouseMove);
}

function mouseMove(e) {
    if (!foot) return;
    if (startY > e.clientY) {
        foot.classList.add("foot-open");
    } else if (startY < e.clientY) {
        foot.classList.remove("foot-open");
    }
}

document.addEventListener("pointerup", () => {
    document.removeEventListener("pointermove", mouseMove);
});

function moreInfo(x) {
    const card = x.closest(".card");
    card.classList.add("expanded");
    card.querySelector(".changing")?.classList.remove("hidden");
    card.querySelector(".buttonRow")?.classList.remove("hidden");
    card.querySelector(".buttonRow")?.classList.add("flexylexy");
    card.querySelector(".moreInfo")?.classList.add("hidden");
}

function closeButton(x) {
    const card = x.closest(".card");
    card.classList.remove("expanded");
    card.querySelector(".changing")?.classList.add("hidden");
    card.querySelector(".buttonRow")?.classList.add("hidden");
    card.querySelector(".buttonRow")?.classList.remove("flexylexy");
    card.querySelector(".moreInfo")?.classList.remove("hidden");
}

function getSaved() {
    return JSON.parse(localStorage.getItem("mySavedResources")) || [];
}

function setSaved(data) {
    localStorage.setItem("mySavedResources", JSON.stringify(data));
}

function saveToLocal(id) {
    const itemToSave = resources.find(item => item.id == id);
    if (!itemToSave) return;

    let savedList = getSaved();
    if (savedList.some(item => item.id == id)) {
        alert(itemToSave.title + " is already in your Hive!");
    } else {
        savedList.push(itemToSave);
        setSaved(savedList);
        alert(itemToSave.title + " has been saved!");
        renderSaved();
    }
}

function removeItem(id) {
    let savedData = getSaved();
    const filtered = savedData.filter(item => item.id != id);
    setSaved(filtered);
    renderSaved();
}

function displayCards(data) {
    const cardGrid = document.getElementById('cardGrid');
    if (!cardGrid) return;
    cardGrid.innerHTML = ""; 

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `card-${item.id}`;
        card.innerHTML = `
            <div class="card-constants">
                <img src="${item.img || ''}" class="card-img">
                <h1>${item.title}</h1>
                <div class="category"><p>${item.category}</p></div>
            </div>
            <div class="moreInfo">
                <button onclick="moreInfo(this)">View Details</button>
            </div>
            <div class="changing hidden">
                <p>${item.desc}</p>
            </div>
            <div class="buttonRow hidden">
                <button onclick="saveToLocal(${item.id})">Save to Hive</button>
                <button onclick="closeButton(this)">Close</button>
            </div>
        `;
        cardGrid.appendChild(card);
    });
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
                    <h1>${item.title}</h1>
                    <p>${item.category}</p>
                </div>
                <div class="card-variable">
                    <p>${item.desc}</p>
                    <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
                </div>
            </div>
        `;
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
