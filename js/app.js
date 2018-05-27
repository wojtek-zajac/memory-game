const deck = document.querySelector(".deck");
const iconsUnique = ["fa-anchor",
                     "fa-bicycle",
                     "fa-bolt",
                     "fa-bomb",
                     "fa-cube",
                     "fa-diamond",
                     "fa-leaf",
                     "fa-paper-plane-o"];
const icons = [...iconsUnique, ...iconsUnique];
const movesContainer = document.querySelector(".moves");
const restartButton = document.querySelector(".restart");
let openedCards = [];
let moves = 0;
const stopwatchContainer = document.querySelectorAll('.stopwatch')[0];
let time;
let seconds = 0;
let minutes = 0;

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
        openCard(clicked);       
    }
}


function openCard(clicked) {
    clicked.target.className = "card open show freeze";
    countItems(clicked);
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
        checkMatch();
    }
}


function checkMatch() {
    deck.classList.toggle("freeze");
    if (openedCards[0].target.firstChild.className === openedCards[1].target.firstChild.className) {
        match();
    } else {
        waitToHide();
    }
}


function match() {
    console.log("It's a match! I'm toggling the match style");
    openedCards[0].target.className = "card match freeze";
    openedCards[1].target.className = "card match freeze"
    deck.classList.toggle("freeze");
    countMove();
}


function waitToHide() {
    console.log("No match. I'm hiding the cards in 1s...");
    setTimeout(hide, 600);
}


function hide() {
    resetCurrentCards();
    countMove();
}

function resetCurrentCards() {
    openedCards[0].target.className = "card";
    openedCards[1].target.className = "card";
    deck.classList.toggle("freeze");
}


function countMove() {
    moves++;
    displayMoves();
    emptyList();
}


function displayMoves() {
    if (moves === 1) {
        firstMoveSyntax();
    } else {
        pluralMovesSyntax()
    }
}


function firstMoveSyntax() {
    movesContainer.innerHTML = `${moves} Move`;
}


function pluralMovesSyntax() {
    movesContainer.innerHTML = `${moves} Moves`;
}


function restart() {
    emptyList();
    resetMoves();
    resetStopwatch();
    resetCards();
    stopStopwatch();

    $(".deck").one( "click", () => {
        stopwatch();
    });
}


function emptyList() {
    openedCards = [];
}


function resetMoves() {
    moves = 0;
    movesContainer.innerHTML = "";
}


function resetStopwatch() {
    stopwatchContainer.textContent = "00:00";
    seconds = 0; 
    minutes = 0;
}


function stopStopwatch() {
    clearTimeout(time);
}


function resetCards() {
    $("li").removeClass("match freeze open show");
}


function countSeconds() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }   
    stopwatchContainer.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
                                     (seconds > 9 ? seconds : "0" + seconds);
    stopwatch();
}


function stopwatch() {
    time = setTimeout(countSeconds, 1000);
}


//Event listeners
$(".deck").one( "click", () => {
    stopwatch();
});


restartButton.addEventListener("click", restart);


//Call function
shuffle(icons);
console.log(icons);
createList();