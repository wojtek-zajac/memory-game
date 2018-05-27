const deck = document.querySelector(".deck");
let openedCards = [];

const iconsUnique = ["fa-anchor",
                     "fa-bicycle",
                     "fa-bolt",
                     "fa-bomb",
                     "fa-cube",
                     "fa-diamond",
                     "fa-leaf",
                     "fa-paper-plane-o"];

const icons = [...iconsUnique, ...iconsUnique];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Create list of cards based on array and append to DOM
function createList () {
    for (icon of icons) {
        let item = document.createElement("li");
        let text = document.createElement("i");
        item.classList.add("card");
        text.classList.add("fa", icon);
        item.appendChild(text);
        deck.appendChild(item);
    }
    deck.addEventListener("click", respondToTheClick);
}

function respondToTheClick(clicked) {
    let currentClick = clicked.target;
    if (clicked.target.nodeName === "LI") {
        console.log("LI was clicked -> event:");
        console.log(clicked);
        //countItems(clicked); 
        openCard(clicked);       
    }
}

function openCard(clicked) {
    clicked.target.className = "card open show froze";
    countItems(clicked);
    //clicked.target.classList.toggle("frozen");
}

function countItems(clicked) {
    openedCards.push(clicked);
            console.log("CLICKS COUNT: " + openedCards.length + "\nOPENED CARDS: ");
            console.log(openedCards);
    isPair();    
}

function isPair() {
    if (openedCards.length === 2) {
            console.log("You just clicked twice. I'm checking for a match: ");
            //console.log(openedCards);
        checkMatch();
    }
}

function checkMatch() {
    if (openedCards[0].target.firstChild.className === openedCards[1].target.firstChild.className) {
        match();
    } else {
        hide();
    }
}

function match() {
    console.log("It's a match! I'm toggling the match style");
    openedCards[0].target.className = "card match freeze";
    openedCards[1].target.className = "card match freeze"
emptyList();
}

function hide() {
    console.log("No match. I'm hiding the cards");
    openedCards[0].target.classList.remove('open');
    openedCards[1].target.classList.remove('open');
emptyList();
}

function emptyList() {
    openedCards = [];
}

shuffle(icons);
console.log(icons);
createList();
