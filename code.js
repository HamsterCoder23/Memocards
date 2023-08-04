const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const WIDTH = 800
const HEIGHT = 600;

canvas.width = WIDTH;
canvas.height = HEIGHT;
var interval

var cards = [];
var gameCards = [];

var mode = 0;

var curPair;
var cardsToRender = [];

class Card {
    question;
    answer;
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
}

class gameCard {
    text;
    x;
    y;
    id;
    constructor(text, x, y, id) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.id = id;
    }
}

function start() {
    gameCards = [];
    curPair = "";
    cardsToRender = [];
    document.getElementById("set4").disabled = true;
    document.getElementById("set8").disabled = true;
    document.getElementById("set12").disabled = true;
    console.log(mode);

    for (var i = 0; i < mode; i++) {

        var card = cards[Math.floor(Math.random() * cards.length)];
        let add = true;

        gameCards.forEach((gc) => {
            if (gc.text == card.question || gc.text == card.answer) {
                add = false;
            }
        });

        if (add) {
            gameCards.push(new gameCard(card.question, 0, 0, i));
            gameCards.push(new gameCard(card.answer, 0, 0, i));
        } else {
            i--;
        }
    }
    curPair = -1;
    randomizeCardsPositions();

    document.getElementById("start").disabled = true;

    interval = setInterval(render, 10);
}

//Checks for clicks on cards
canvas.addEventListener("click", function (event) {
    var mousePos = getMousePos(canvas, event);
    let x = mousePos[0];
    let y = mousePos[1];
    if (cardsToRender.length == 2) {
        cardsToRender = [];
    }
    gameCards.forEach((gc) => {
        if (gc.x <= x && x <= gc.x + 120 && gc.y < y && y < gc.y + 90) {
            console.log(gc.id);
            if (curPair == -1) {
                curPair = gc.id;
                cardsToRender.push(gc);
            } else {
                if (gc.id == curPair && gc != cardsToRender[0]) {
                    cardsToRender.push(gc);
                    removeCards(gc.id);
                } else {
                    //Unflip cards after a few seconds
                    cardsToRender.push(gc);
                }
                curPair = -1;
            }
        }
    });
});

//Removes a game card from gameCards with given id
function removeCards(x) {
    gameCards.forEach((gc) => {
        if (gc.id == x) {
            gameCards.splice(gameCards.indexOf(gc), 1);
        }
    });
    gameCards.forEach((gc) => {
        if (gc.id == x) {
            gameCards.splice(gameCards.indexOf(gc), 1);
        }
    });
}

//Get Mouse Position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return [evt.clientX - rect.left, evt.clientY - rect.top];
}


//const delay = ms => new Promise(res => setTimeout(res, ms));

//Rendering functions \/

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (gameCards.length == 0) {
        context.font = "12px Arial";
        context.textAlign = "center";
        context.fillText("You win!", WIDTH/2, HEIGHT/2);
        updateButtons();
        if (mode != 0) {
            document.getElementById("start").disabled = false;
        }
    } else {
        renderCards();
        cardsToRender.forEach((gc) => {
            renderText(gc);
        });
    }
}

function renderCards() {
    gameCards.forEach((gc) => {
        context.strokeStyle = "black";
        context.strokeRect(gc.x, gc.y, 120, 90);
    });
}

function renderText(gc) {
    context.font = "12px Arial";

    if (gc.text.length > 16) {
        context.textAlign = "left";
        context.fillText(gc.text.substring(0, 16), gc.x + 4, gc.y + 12);

        if (gc.text.length > 36) {
            context.fillText(gc.text.substring(16, 32), gc.x + 4, gc.y + 26);

                if (gc.text.length > 48) {
                    context.fillText(gc.text.substring(32, 48), gc.x + 4, gc.y + 40);
                        
                    if (gc.text.length > 64) {
                        context.fillText(gc.text.substring(48, 64), gc.x + 4, gc.y + 54);
                            
                        if (gc.text.length > 80) {
                            context.fillText(gc.text.substring(64, 80), gc.x + 4, gc.y + 68);
                                
                            if (gc.text.length > 96) {
                                context.fillText(gc.text.substring(80, 94) + "...", gc.x + 4, gc.y + 82);
            
                            } else {
                                context.fillText(gc.text.substring(80, gc.text.length+1), gc.x + 4, gc.y + 82);
                            }
        
                        } else {
                            context.fillText(gc.text.substring(64, gc.text.length+1), gc.x + 4, gc.y + 68);
                        }
    
                    } else {
                        context.fillText(gc.text.substring(48, gc.text.length+1), gc.x + 4, gc.y + 54);
                    }

                } else {
                    context.fillText(gc.text.substring(32, gc.text.length+1), gc.x + 4, gc.y + 40);
                }

        } else {
            context.fillText(gc.text.substring(16, gc.text.length+1), gc.x + 4, gc.y + 26);
        }

    } else {
        context.textAlign = "center";
        context.fillText(gc.text, gc.x + 60, gc.y + 45); 
    }


    
}



//Card functions \/

function randomizeCardsPositions() {
    if (mode == 4) {
        for (var i = 0; i < 8; i++) {
            let card = gameCards[Math.floor(Math.random() * gameCards.length)];
            if (card.x == 0 && card.y == 0) {
                card.x = (i%4) * 160 + 105;
                if (i < 4) {
                    card.y = 150;
                } else {
                    card.y = 300;
                }
            } else {
                i--;
            }
        }
    }
    if (mode == 8) {
        for (var i = 0; i < 16; i++) {
            let card = gameCards[Math.floor(Math.random() * gameCards.length)];
            if (card.x == 0 && card.y == 0) {
                card.x = (i%4) * 160 + 105;
                if (i < 4) {
                    card.y = 80;
                } else if (i < 8 ){
                    card.y = 200;
                } else if (i < 12 ){
                    card.y = 320;
                } else {
                    card.y = 440;
                }
            } else {
                i--;
            }
        }
    }

    if (mode == 12) {
        for (var i = 0; i < 24; i++) {
            let card = gameCards[Math.floor(Math.random() * gameCards.length)];
            if (card.x == 0 && card.y == 0) {
                card.x = (i%6) * 130 + 15;
                if (i < 6) {
                    card.y = 80;
                } else if (i < 12){
                    card.y = 200;
                } else if (i < 18){
                    card.y = 320;
                } else {
                    card.y = 440;
                }
            } else {
                i--;
            }
        }
    }
    renderCards();
}


//Adds a card if inputs aren't empty
function addCard() {
    var inputQuestion = document.getElementById("userInputQuestion").value;
    var inputAnswer = document.getElementById("userInputAnswer").value;
    if (inputAnswer != "" && inputQuestion != "") {
        cards.push(new Card(inputQuestion, inputAnswer));
        displayCards();
        updateButtons();
    }
}

//Refreshes display of cards
function displayCards() {
    var display = document.getElementById("display");
    display.innerHTML = "";
    for (let i = 0; i < cards.length; i++) {
        display.innerHTML += "<li>" + cards[i].question + "<div> </div>" + cards[i].answer + '<div> </div> <button onclick="cardsDelete(' + i + ')"' + "> Delete </button> </li>"; 
    }
}

//Deletes given card
function cardsDelete(index) {
    cards.splice(index, 1);
    displayCards();

    updateButtons();
}

//Converts cards into JSON string and gives it to player
function getJSON() {
    window.alert("Save this: " + JSON.stringify(cards));
}

//Allows player to provide set of cards based on JSON string
function setJSON() {
    var code = window.prompt("Enter the code below", "Enter here");;
    try {
        cards = JSON.parse(code);
        displayCards();
    } catch (e) {
        window.alert("Invalid code");
    }

    updateButtons();
}

function updateButtons() {
    if (mode != 4 && cards.length >= 4) {
        document.getElementById("set4").disabled = false;
    }
    if (mode != 8 && cards.length >= 8) {
        document.getElementById("set8").disabled = false;
    }
    if (mode != 12 && cards.length >= 12) {
        document.getElementById("set12").disabled = false;
    }
}

function setMode(x) {
    this.mode = x;
    updateButtons();
    document.getElementById("start").disabled = false;
}