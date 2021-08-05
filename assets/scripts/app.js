
var scoreBoard;

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
      name2 = document.getElementById("name-2"),
      gameSavedKey = "game-saved",
      saveGameButton = document.getElementById("save-game"),
      loadGameButton = document.getElementById("load-game");

window.onload = async () => InitializeBoard();

closeName.onclick = closeModalPlayers;

function closeModalPlayers() {
    modalPlayers.style.display = "none";
}

async function InitializeBoard() {

    newBoard();

    newGameButton.addEventListener("click", showModalNames);
    saveName.addEventListener("click", InitializeTurn);
    saveGameButton.addEventListener("click", saveGame);
    loadGameButton.addEventListener("click", loadGame);
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

    game.turn = 1;

    game.players = {
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
    saveGameButton.style.display = "flex";

    setNames();

    createAndAppendTurnText();

    newBoard();

    closeModalPlayers();
}

function newBoard() {
    defaultState();
    createBoard();
}

function clearBoard() {
    game.moveObject = {};
    game.turn = 0;

    tablePlayer.style.display = "none";
    saveGameButton.style.display = "none";

    ClearTurnElement();
    turnElement.classList.remove('turn-container');

    newBoard();
}

function updateBoard() {
    createBoard();
    checkTurn();
}

function checkTurn() {

    if (checkWinner()){

        let winner = game.turn === 1 ? game.players.player1 : game.players.player2;
        alert(`Felicidades ${winner.name} eres el ganador`);
        clearBoard();
        return;
    }

    game.turn = game.turn === 1 ? 2 : 1;

    ClearTurnElement();

    createAndAppendTurnText();
}

function checkWinner() {
    return game.players.player1.points === 12 || game.players.player2.points === 12;
}

function ClearTurnElement() {
    turnElement.innerHTML = "";
}

function createAndAppendTurnText() {

    var color = game.turn === 1 ? "rojas" : "blancas";
    var name = game.turn === 1 ? game.players.player1.name : game.players.player2.name;

    var textElement = document.createElement("h2");
    textElement.innerText = `Turno jugador: ${name} (${color})`;

    turnElement.appendChild(textElement);

    updatePoints();
}

function updatePoints() {

    if (Object.keys(game.players).length > 0) {
        points1.innerText = `${game.players.player1.points} ptos`;
        points2.innerText = `${game.players.player2.points} ptos`;
    }
}

function setNames() {

    if (Object.keys(game.players).length > 0) {
        name1.innerText = game.players.player1.name;
        name2.innerText = game.players.player2.name;
    }
}

function saveGame() {
    localStorage.setItem(gameSavedKey, JSON.stringify(game));
}

function loadGame() {

    let loadedGame = JSON.parse(localStorage.getItem(gameSavedKey));

    if (!loadedGame){
        alert("No hay partidas guardadas");
        return;
    }

    game = loadedGame;

    ClearTurnElement();

    turnElement.classList.add('turn-container');
    tablePlayer.style.display = "flex";
    saveGameButton.style.display = "flex";

    setNames();
    createAndAppendTurnText();
    updateBoard();
}