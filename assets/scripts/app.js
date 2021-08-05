
var turn = 0,
    moveObject,
    players;

const tablePlayer = document.getElementById('points'),
      turnElement = document.getElementById("turnText"),
      newGameButton = document.getElementById("newGameButton"),
      points1 = document.getElementById("points-1"),
      points2 = document.getElementById("points-2"),
      modalPlayers = document.getElementById("modal-players"),
      saveName = document.getElementById("save-names"),
      namePlayer1 = document.getElementById("player1-name"),
      namePlayer2 = document.getElementById("player2-name"),
      closeName = document.getElementById("closeModalPlayer"),
      name1 = document.getElementById("name-1"),
      name2 = document.getElementById("name-2");

window.onload = async () => InitializeBoard();

closeName.onclick = closeModalPlayers;

function closeModalPlayers() {
    modalPlayers.style.display = "none";
}

async function InitializeBoard() {

    newBoard();

    newGameButton.addEventListener("click", showModalNames);
    saveName.addEventListener("click", InitializeTurn);
}

function showModalNames() {

    cleanModal();
    modalPlayers.style.display = "block";
}

function InitializeTurn(event) {

    event.preventDefault();

    if (namePlayer1.value.length <= 0){
        alert("Escribir el Nombre del jugador 1");
        namePlayer1.focus();
        return;
    }

    if (namePlayer2.value.length <= 0){
        alert("Escribir el Nombre del jugador 2");
        namePlayer2.focus();
        return;
    }

    turn = 1;

    players = {
        player1: {
            name: namePlayer1.value,
            points: 0
        },
        player2: {
            name: namePlayer2.value,
            points: 0
        }
    };

    ClearTurnElement();

    turnElement.classList.add('turn-container');
    tablePlayer.style.display = "flex";

    setNames();

    createAndAppendTurnText();

    newBoard();

    closeModalPlayers();
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

    ClearTurnElement();

    createAndAppendTurnText();
}

function ClearTurnElement() {
    turnElement.innerHTML = "";
}

function createAndAppendTurnText() {

    var color = turn === 1 ? "rojas" : "blancas";
    var name = turn === 1 ? players.player1.name : players.player2.name;

    var textElement = document.createElement("h2");
    textElement.innerText = `Turno jugador: ${name} (${color})`;

    turnElement.appendChild(textElement);

    updatePoints();
}

function updatePoints() {

    if (Object.keys(players).length > 0) {
        points1.innerText = `${players.player1.points} ptos`;
        points2.innerText = `${players.player2.points} ptos`;
    }
}

function setNames() {

    if (Object.keys(players).length > 0) {
        name1.innerText = players.player1.name;
        name2.innerText = players.player2.name;
    }
}