/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector(".deck");
let openedCards = [];
let openedCardsNum = openedCards.length;

const iconsUnique = ["fa-anchor",
"fa-bicycle",
"fa-bolt",
"fa-bomb",
"fa-cube",
"fa-diamond",
"fa-leaf",
"fa-paper-plane-o"];

const icons = [...iconsUnique, ...iconsUnique];

shuffle(icons);
console.log(icons);

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
}

createList();


  /*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// jQuery's one() event binding method which implements one-time events
// (each card can be clicked only once - 'clicked' as the event here)
// https://www.sitepoint.com/create-one-time-events-javascript/
$(".card").one( "click", function(clicked) { 
    clicked.target.className = "card open show";
    countItems(clicked);
});

function countItems(clicked) {
    let eventClass = clicked.target.firstChild.className;
    openedCards.push(eventClass);
        console.log("CLICKS COUNT: " + openedCards.length);
    return openedCardsNum;
}