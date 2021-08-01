var turn = 0, moveObject, enemyPieceJumped = [], stateGame;
const urlNotAllowed = "./assets/img/notAllowed.png";

window.onload = InitializeBoard();

function InitializeBoard() {

    newBoard();

    var newGameButton = document.getElementById("newGameButton");
    newGameButton.addEventListener("click", InitializeTurn);
}

function InitializeTurn() {

    turn = 1;

    var turnElement = getAndClearTurnElement();
    createAndAppendTurnText(turnElement);

    newBoard();
}

function newBoard() {
    moveObject = {};
    defaultState();
    createBoard();
}

function updateBoard() {    
    createBoard();
    checkTurn();
}

function checkTurn() {

    turn = turn === 1 ? 2 : 1;

    var turnElement = getAndClearTurnElement();

    createAndAppendTurnText(turnElement);
}

function getAndClearTurnElement() {

    var turnElement = document.getElementById("turnText");
    turnElement.innerHTML = "";

    return turnElement;
}

function createAndAppendTurnText(turnElement) {

    var color = turn === 1 ? "rojas" : "blancas";

    var textElement = document.createElement("h2");
    textElement.innerText = `Turno jugador: ${turn} (${color})`;

    turnElement.appendChild(textElement);
}