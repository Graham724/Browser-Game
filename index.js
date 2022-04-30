// Remaining Questions/things to solve.

// -total shows up as Nan when start is pressed.


// Deck
let cards = [];
let playerCard = [];
let dealerCard = [];
let suits = ["hearts", "clubs", "spades", "diams"];
let numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let cardCount = 0;
let playerDollars = 100;
let playEnd = false;

let output = document.getElementById("output");
let message = document.getElementById("message");
let dealerHand = document.getElementById("dealerHand");
let playerHand = document.getElementById("playerHand");
let playerValue = document.getElementById("playerValue");
let dealerValue = document.getElementById("dealerValue");
let dollarValue = document.getElementById("dollars")

document.getElementById("playerBet").onchange = function() {
    if(this.value < 0){this.value = 0;}
    if(this.value > playerDollars){this.value = playerDollars}
    message.innerHTML = "Bet changed to $" + this.value;
}


for (s in suits) {
    let suit = suits[s][0].toUpperCase();
    let bgcolor = (suit == "S" || suit == "C") ? "black" : "red";
    for(n in numb) {
        let cardValue = (n > 9) ? 10 : parseInt(n)+1;
        let card = {
            suit: suit,
            icon:suits[s],
            bgcolor: bgcolor,
            cardnum: numb[n],
            cardvalue: cardValue
        }
        cards.push(card);
    }
}

document.getElementById("holdbtn").disabled = true;
document.getElementById("hitbtn").disabled = true;
document.getElementById("doublebtn").disabled = true;


// start button function
function start() {
    shuffleDeck(cards);
    dealNewHand();
    document.getElementById('start').style.display = "none";
    dollarValue.innerHTML = playerDollars;
    document.getElementById("holdbtn").disabled = false;
    document.getElementById("hitbtn").disabled = false;
    document.getElementById("doublebtn").disabled = false;
}

// Dealing cards out of the deck& shuffling

function dealNewHand() {
    dealerValue.innerHTML = "?";
    playerCard = [];
    dealerCard = [];
    dealerHand.innerHTML = "";
    playerHand.innerHTML = "";

    let betValue = document.getElementById('playerBet').value;
    console.log("pdollors", playerDollars)
    playerDollars = playerDollars - betValue;
    console.log("pdollors2", playerDollars)
    dollarValue.innerHTML = playerDollars;
    document.getElementById("playerBet").disabled = true;
    document.getElementById("maxBet").disabled = true;
    deal();
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

function redeal () {
    cardCount++;
    if(cardCount > 50){
    shuffleDeck(cards);
    cardCount = 0;
    message.innerHTML = "New Shuffle";
}
}
function deal() {

    for (x=0; x<2; x++){
        dealerCard.push(cards[cardCount]);
        dealerHand.innerHTML += cardOutput(cardCount,x);
    
        if(x==0){
            dealerHand.innerHTML += '<div id="cover" style="left:100px;"></div>';
        }
        redeal()
        playerCard.push(cards[cardCount]);
        playerHand.innerHTML += cardOutput(cardCount,x);
        redeal()
    }
    // checkTotal(playerCard)
    let pValue = checkTotal(playerCard);
    if(pValue == 21 && playerCard.length == 2) {
        endPlay();
    }
    playerValue.innerHTML = pValue;

}



function cardOutput(n,x) {
    
    let hpos = (x>0) ? x*60+100 : 100;
    return '<div class="gcard ' + cards[n].icon + '" style="left:' + hpos + 'px;">  <div class="top-card suit">'
     + cards[n].cardnum + '<br></div>  <div class="content suit"></div>  <div class="bottom-card suit">'
      + cards[n].cardnum + '<br></div> </div>';
}

// Button functions

function maxBet() {
    document.getElementById('playerBet').value = playerDollars;
    message.innerHTML ="Bet changed to $"+playerDollars;
}

// Button functionality
function cardAction(a) {
    console.log(a);
    switch (a) {
        case 'hit':
            playCard();
            break;
        case 'hold':
            endPlay();
            break;
        case 'double':
            let betValue = parseInt(document.getElementById('playerBet').value);
            if((playerDollars - betValue) <0) {
                betValue = betValue + playerDollars;
                playerDollars = 0;
            }
            else {
               playerDollars = playerDollars - betValue;
               betValue = betValue*2; 
            }
            document.getElementById("dollars").innerHTML = playerDollars;
            document.getElementById("playerBet").value = betValue;
            playCard();
            endPlay();
            break;
        default:
            console.log('done');
            endPlay();
    }
}

// playing a card, checking total and ending play functions
function playCard() {
    playerCard.push(cards[cardCount]);
        playerHand.innerHTML += cardOutput(cardCount,(playerCard.length -1));
        redeal();
        let resultValue = checkTotal(playerCard);
        playerValue.innerHTML = resultValue;
        if (resultValue > 21) {
            message.innerHTML = "Bust!";
            endPlay();
        }
}

function endPlay() {
    playEnd = true;
    document.getElementById("cover").style.display = "none";
    document.getElementById("dealbtn").style.display = "block";
    document.getElementById("playerBet").disabled = false;
    document.getElementById("maxBet").disabled = false;
    message.innerHTML = "Game Over<br>";
    let payoutJack = 1;

    let dValue = checkTotal(dealerCard);
    dealerValue.innerHTML = dValue;
    
    while(dValue<17) {
        dealerCard.push(cards[cardCount]);
        dealerHand.innerHTML += cardOutput(cardCount,(dealerCard.length -1));
        redeal();
        dvalue = checkTotal(dealerHand);
        dealerValue.innerHTML = dValue;
    }

    let pValue = checkTotal(playerCard);
    if(pValue == 21 && playerCard.length == 2) {
        message.innerHTML = "Player Has Blackjack!"
        payoutJack = 1.5;
    }
    let betValue = parseInt(document.getElementById("playerBet").value)*payoutJack;
    
    if ((pValue < 22 && dValue < pValue) || (dValue > 21 && pValue < 22)){
        message.innerHTML += '<span style="color:green;"> You Win! You won $'+betValue+'</span>';
        playerDollars = playerDollars + (betValue *2);
    }
    else if (pValue > 21) {
        message.innerHTML += '<span style="color:red;"> Dealer Wins! You lost $'+betValue+'</span>';

    }
    else if (pValue == dValue){
        message.innerHTML += '<span style="color:blue;">PUSH</span>';
        playerDollars = playerDollars + betValue; 
    }
    else {
        message.innerHTML += '<span style="color:red;"> Dealer Wins! You lost $'+betValue+'</span>';
    }
    playerValue.innerHTML = pValue;
    dollarValue.innerHTML = playerDollars;
}

function checkTotal(arr) {
    let resultValue = 0;
    let aceAdjust = false;
    for (let i in arr) {
        if(arr[i].cardnum == 'A' && !aceAdjust) {
            aceAdjust = true;
            resultValue = resultValue +10;
        }
        resultValue= resultValue + arr[i].cardvalue;
    }
    if(aceAdjust && resultValue > 21) {
        resultValue = resultValue -10;
    }
    return resultValue;
}


function outputCard() {
    output.innerHTML += "<span style='color:" + cards[cardCount].bgcolor +
     "'>" + cards[cardCount].cardnum + "&" + cards[cardCount].icon + ";</span>  ";
}
