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
const timerContainer = document.querySelectorAll('.timer')[0];
const restartButton = document.querySelector(".restart");
const movesContainer = document.querySelector(".moves");
const star1 = $(".stars li:nth-child(1) i");
const star2 = $(".stars li:nth-child(2) i");
const star3 = $(".stars li:nth-child(3) i");
const star4 = $(".stars li:nth-child(4) i");
const star5 = $(".stars li:nth-child(5) i");
let openCardsList = [];
let moves = 0;
let matchedPairs = 0;
let time;
let seconds = 0;
let minutes = 0;


// Create a new list of cards based on array and append it to DOM with event listeners
function createNewDeck() {
    resetDeck();
    shuffle(icons);
    timerListenerOn();
    console.log(icons);
    for (icon of icons) {
        let newCard = document.createElement("li");
        let newContent = document.createElement("i");
        newCard.classList.add("card");
        newContent.classList.add("fa", icon);
        newCard.appendChild(newContent);
        deck.appendChild(newCard);
    }
    listenToDeckClicks();
}


function resetDeck() {
    $(deck).empty();
}


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


function listenToDeckClicks() {
    deck.addEventListener("click", respondToTheClick);
}


function respondToTheClick(clicked) {
    if (clicked.target.nodeName === "LI") {
        console.log("LI was clicked -> event:");
        console.log(clicked);
        openCard(clicked);
        countCards(clicked);      
    }
}


function openCard(clicked) {
    clicked.target.className = "card open show freeze";
    countMove();
}


function countMove() {
    moves++;
    checkStars();
    displayMoves();
}


function checkStars() {
    switch(moves) {
        case 21:
            emptyStar(star1);
            break;
        case 29:
            emptyStar(star2);
            break;
        case 35:
            emptyStar(star3);
            break;
        case 41:
            emptyStar(star4);
            break;
        case 61:
            stopTimer();
            //gameOver();
        default:
            break;
    }
}


function emptyStar(star) {
    star.removeClass("fa fa-star");
    star.addClass("fa fa-star-o");
}


function displayMoves() {
    if (moves === 1) {
        firstMoveSyntax();
    } else {
        pluralMovesSyntax();
    }
}


function firstMoveSyntax() {
    movesContainer.innerHTML = `${moves} Move`;
}


function pluralMovesSyntax() {
    movesContainer.innerHTML = `${moves} Moves`;
}


function countCards(clicked) {
    openCardsList.push(clicked);
            console.log("CLICKS COUNT: " + openCardsList.length + "\nOPENED CARDS: ");
            console.log(openCardsList);
    isPair();    
}


function isPair() {
    if (openCardsList.length === 2) {
            console.log("You just clicked twice. I'm checking for a match: ");
        checkMatch();
    }
}


function checkMatch() {
    deck.classList.toggle("freeze");
    if (openCardsList[0].target.firstChild.className === openCardsList[1].target.firstChild.className) {
        countMatch();
        //match();
    } else {
        waitToHide();
    }
}


function match() {
    toggleMatchStyle();
    emptyOpenCardsList();
}


function toggleMatchStyle() {
    console.log("It's a match! I'm toggling the match style");
    openCardsList[0].target.className = "card match freeze";
    openCardsList[1].target.className = "card match freeze";
    deck.classList.toggle("freeze");
}

function countMatch() {
    matchedPairs++;
    console.log("MATCHED PAIRS: " + matchedPairs);
    if (matchedPairs < 8) {
        match();
    } else {
        toggleMatchStyle();
        stopTimer();
        //youWon();
        console.log("Y O U   W O N !");
    }
}


function waitToHide() {
    console.log("No match. I'm hiding the cards in 1s...");
    setTimeout(hide, 600);
}


function hide() {
    resetCurrentCards();
    emptyOpenCardsList();
}


function resetCurrentCards() {
    openCardsList[0].target.className = "card";
    openCardsList[1].target.className = "card";
    deck.classList.toggle("freeze");
}


function emptyOpenCardsList() {
    openCardsList = [];
}


function resetStars() {
    star1[0].className = "fa fa-star";
    star2[0].className = "fa fa-star";
    star3[0].className = "fa fa-star";
    star4[0].className = "fa fa-star";
    star5[0].className = "fa fa-star";
}


function resetMoves() {
    moves = 0;
    movesContainer.innerHTML = "0 Moves";
}


function resetTimer() {
    timerContainer.textContent = "00:00";
    seconds = 0; 
    minutes = 0;
}


function resetCards() {
    $("li").removeClass("match freeze open show");
}


function stopTimer() {
    clearTimeout(time);
}


function countSeconds() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }   
    timerContainer.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
                                     (seconds > 9 ? seconds : "0" + seconds);
    timer();
}


function timer() {
    timerListenerOff();
    time = setTimeout(countSeconds, 1000);
}


function timerListenerOn() {
    deck.addEventListener("click", timer);
}


function timerListenerOff() {   
    deck.removeEventListener("click", timer);
}


restartButton.addEventListener("click", restart);


function restart() {
    createNewDeck();
    emptyOpenCardsList();
    resetStars();
    resetMoves();
    resetTimer();
    stopTimer();
    resetCards();
    timerListenerOn();
}


// Init function
createNewDeck();