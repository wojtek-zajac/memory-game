const deck = document.querySelector(".deck");
const iconsUnique = ["fa-gem", "fa-crow", "fa-fighter-jet", "fa-binoculars", "fa-shoe-prints", "fa-skull", "fa-hand-paper", "fa-wrench"];
const icons = [...iconsUnique, ...iconsUnique];
const star1 = $(".stars li:nth-child(1) i");
const star2 = $(".stars li:nth-child(2) i");
const star3 = $(".stars li:nth-child(3) i");
const star4 = $(".stars li:nth-child(4) i");
const star5 = $(".stars li:nth-child(5) i");
const movesContainer = document.querySelector(".moves");
const timerContainer = document.querySelectorAll('.timer')[0];
const restartButton = document.querySelector(".fa-redo-alt");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".closeButton");
const playAgainButton = document.querySelector(".playAgainButton");
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
    for (icon of icons) {
        const newCard = document.createElement("li");
        const newContent = document.createElement("i");
        newCard.classList.add("card");
        newContent.classList.add("fas", icon);
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
        case 23:
            emptyStar(star5);
            break;
        case 29:
            emptyStar(star4);
            break;
        case 37:
            emptyStar(star3);
            break;
        case 47:
            emptyStar(star2);
            break;
        default:
            break;
    }
}

function emptyStar(star) {
    star.removeClass("fas fa-star");
    star.addClass("far fa-star");
}

function displayMoves() {
    if (moves > 1) {
        pluralMovesSyntax();
    } else {
        firstMoveSyntax();
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
    isPair();    
}

function isPair() {
    if (openCardsList.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    let icon1class = openCardsList[0].target.firstChild.className;
    let icon2class = openCardsList[1].target.firstChild.className;
    freezeDeck();
    if (icon1class === icon2class) {
        countMatch();
    } else {
        shakeCards();
    }
}

function freezeDeck() {
    deck.classList.toggle("freeze");
}

function countMatch() {
    matchedPairs++;
    if (matchedPairs < 8) {
        match();
    } else {
        toggleMatchStyle();
        stopTimer();
        openModal();
    }
}

function match() {
    toggleMatchStyle();
    emptyOpenCardsList();
}

function toggleMatchStyle() {
    openCardsList[0].target.className = "card match freeze";
    openCardsList[1].target.className = "card match freeze";
    freezeDeck();
}


function shakeCards() {
    setTimeout(shakeToggle, 800);
    shakeOff();
    waitToHide();
}

function shakeToggle() {
    openCardsList[0].target.classList.toggle("shake");
    openCardsList[1].target.classList.toggle("shake");
    openCardsList[0].target.classList.toggle("noMatch");
    openCardsList[1].target.classList.toggle("noMatch");
}

function shakeOff() {
    setTimeout(shakeToggle, 200);
}

function waitToHide() {
    setTimeout(hide, 900);
}

function hide() {
    resetCurrentCards();
    emptyOpenCardsList();
}

function resetCurrentCards() {
    openCardsList[0].target.className = "card";
    openCardsList[1].target.className = "card";
    freezeDeck();
}

function emptyOpenCardsList() {
    openCardsList = [];
}

function resetStars() {
    star1[0].className = "fas fa-star";
    star2[0].className = "fas fa-star";
    star3[0].className = "fas fa-star";
    star4[0].className = "fas fa-star";
    star5[0].className = "fas fa-star";
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
    addFlip();
    setTimeout(removeFlip, 710);
}

function addFlip() {
    let cards = document.querySelectorAll(".card");
    for (card of cards) {
        card.classList.add("flipAllCards");
    }
}

function removeFlip() {
    let cards = document.querySelectorAll(".card");
    for (card of cards) {
        card.classList.remove("flipAllCards");
    }
}

function resetMatchedPairs() {
    matchedPairs = 0;
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
    timerContainer.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
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

function rotateRestartIcon() {
    setRotateClass();
    setTimeout(stopRotate, 410);
    restart();
}

function setRotateClass() {
    restartButton.className = "fas fa-redo-alt rotate-scale";
}

function stopRotate() {
    restartButton.classList.remove("rotate-scale");
}

function openModal() {
    attachResults();
    setTimeout(displayModal, 600);
}

function displayModal() {
    modal.style.display = "block";
}

function attachResults() {
    let stars = document.querySelector(".stars").innerHTML;
    let starsModal = document.querySelector(".starsModal");
    let timeHTML = timerContainer.innerHTML;
    let results = `You moved ${moves} times and your time was ${timeHTML}`;
    let resultsModal = document.querySelector(".results");
    starsModal.innerHTML = stars;
    resultsModal.innerHTML = results;
}

function restartFromModal() {
    closeModal();
    restart();
}

function closeModal() {
    modal.style.display = "none";
}

function outside(click) {
    if (click.target === modal) {
        modal.style.display = "none";
    }
}

function restart() {
    createNewDeck();
    emptyOpenCardsList();
    resetMatchedPairs();
    resetStars();
    resetMoves();
    resetTimer();
    stopTimer();
    resetCards();
    timerListenerOn();
}

restartButton.addEventListener("click", rotateRestartIcon);
closeButton.addEventListener("click", closeModal);
playAgainButton.addEventListener("click", restartFromModal);
window.addEventListener("click", outside);

// Init function
createNewDeck();