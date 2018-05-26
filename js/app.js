/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector(".deck");
//const cards = document.querySelectorAll(".card");
//const card = document.querySelector(".card");

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

//Flip the card on click
deck.addEventListener("click",function(e) {
    if (e.target && e.target.matches("li.card")) {
      e.target.className = "card open show";
      } 
  });