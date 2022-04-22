// Deck
let cards = [];
let playerCard = [];
let dealerCard = [];
let cardCount = 0;
let suits = ["hearts", "clubs", "spades", "diams"];
let numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let output = document.getElementById("output");
let dealerHand = document.getElementById("dealerHand");
let playerHand = document.getElementById("playerHand");

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


function start() {
    shuffleDeck(cards);
    dealNewHand();
}

function dealNewHand() {
    playerCard = [];
    dealerCard = [];
    dealerHand.innerHTML = "";
    playerHand.innerHTML = "";

    for (x=0; x<2; x++){
        dealerCard.push(cards[cardCount]);
        dealerHand.innerHTML += cardOutput(cardCount,x);
        cardCount++
        playerCard.push(cards[cardCount]);
        playerHand.innerHTML += cardOutput(cardCount,x);
        cardCount++
    }
    console.log(dealerCard);
    console.log(playerCard);
}

function cardOutput(n,x) {
    let hpos = (x>0) ? x*60+100 : 100;
    return '<div class="gcard ' + cards[n].icon + '" style="left:' + hpos + 'px;">  <div class="top-card suit">'
     + cards[n].cardnum + '<br></div>  <div class="content suit"></div>  <div class="bottom-card suit">'
      + cards[n].cardnum + '<br></div> </div>';
}


function shuffleDeck(array) {
    for (let i = array.length -1; i>0; i--){
        let j = Math.floor(Math.random() * (i+1));
        let temp = array[i];
        array[i] =array[j];
        array[j] = temp;
    }
    return array;
}

function outputCard() {
    output.innerHTML += "<span style='color:" + cards[cardCount].bgcolor +
     "'>" + cards[cardCount].cardnum + "&" + cards[cardCount].icon + ";</span>  ";
}
