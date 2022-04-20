// Deck
let cards = [];
let suits = ["hearts", "clubs", "spades", "diams"];
let numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let output = document.getElementById("output")

for (s in suits) {
    let suit = suits[s][0].toUpperCase();
    let bgcolor = (suit == "S" || suit == "C") ? "black" : "red";
    for(n in numb) {
        let cardValue = (n>9) ? 10 : parseInt(n)+1
        let card = {
            suit: suit,
            icon:suits[s],
            bgcolor: bgcolor,
            cardnum:numb[n],
            cardvalue: cardValue
        }
        cards.push(card);
    }
}

function randomCard () {
let randomNum = Math.floor((Math.random()*52) );
output.innerHTML += "<span style='color:" + cards[randomNum].bgcolor + "'>&" + cards[randomNum].icon + ";" + cards[randomNum].cardnum + "</span>  ";
}
randomCard();
// Player 1

// Dealer