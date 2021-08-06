
const gameSavedKey = "game-saved",
      scoreBoardKey = "score-board",
      tablePlayer = document.getElementById('points'),
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
      saveGameButton = document.getElementById("save-game"),
      loadGameButton = document.getElementById("load-game"),
      modalScoreBoard = document.getElementById("modal-score-board"),
      openScoreBoardButton = document.getElementById("board-score-button"),
      closeScoreBoardButton = document.getElementById("close-modal-score-board"),
      aceptScoreBoardButton = document.getElementById("acept-button"),
      bodyScoreBoard = document.getElementById("body-score-board");

window.onload = async () => InitializeBoard();

closeName.onclick = closeModalPlayers;
closeScoreBoardButton.onclick = closeModalScoreBoard;
aceptScoreBoardButton.onclick = closeModalScoreBoard;

function closeModalPlayers() {
    modalPlayers.style.display = "none";
}

function closeModalScoreBoard() {
    modalScoreBoard.style.display = "none";
}

async function InitializeBoard() {

    newBoard();

    newGameButton.addEventListener("click", showModalNames);
    saveName.addEventListener("click", InitializeTurn);
    saveGameButton.addEventListener("click", saveGame);
    loadGameButton.addEventListener("click", loadGame);
    openScoreBoardButton.addEventListener("click", showModalScoreBoard);
}

function showModalNames() {

    cleanModal();
    modalPlayers.style.display = "block";
}

function showModalScoreBoard() {

    bodyScoreBoard.innerHTML = "";
    let scoreBoard = [];

    if (getScoreBoard()){
        scoreBoard = getScoreBoard();
    }

    scoreBoard.forEach(score => {

        let rowTable = createRowTable();

        for (let property in score) {

            let appendElement = score[property];

            let cellTable = createCelltable(appendElement);
            rowTable.appendChild(cellTable);
        }

        bodyScoreBoard.appendChild(rowTable);
    });

    modalScoreBoard.style.display = "block";
}

function createRowTable() {
    let row = document.createElement("tr");
    return row;
}

function createCelltable(appendElement) {

    let cell = document.createElement("td");
    cell.innerText = appendElement;

    return cell;
}

function InitializeTurn(event) {

    event.preventDefault();

    if (namePlayer1.value.length <= 0) {
        alert("Escribir el Nombre del jugador 1");
        namePlayer1.focus();
        return;
    }

    if (namePlayer2.value.length <= 0) {
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

async function clearBoard() {
    game.moveObject = {};
    game.turn = 0;

    tablePlayer.style.display = "none";
    saveGameButton.style.display = "none";

    ClearTurnElement();
    turnElement.classList.remove('turn-container');

    newBoard();
}

async function updateBoard() {
    await createBoard();
    await checkTurn();
}

async function checkTurn() {

    if (checkWinner()) {

        let winner, loser;

        if (game.turn === 1){
            winner = game.players.player1;
            loser = game.players.player2;
        }
        else {
            winner = game.players.player2;
            loser = game.players.player1;
        }
        setTimeout(() => {
            alert(`Felicidades ${winner.name} eres el ganador`);
            clearBoard();
            saveScore(winner, loser);
        }, 100);

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

    setTimeout(() => {
        alert("Juego Guardado");
    }, 100);
}

function loadGame() {

    let loadedGame = JSON.parse(localStorage.getItem(gameSavedKey));

    if (!loadedGame) {
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

    setTimeout(() => {
        alert('Juego Cargado');
    }, 100);
}

function saveScore(winner, loser) {

    let score = {
        date: new Date().toLocaleString(),
        winner: winner.name,
        winnerPoints: winner.points,
        loser: loser.name,
        loserPoints: loser.points
    };

    let scoreBoard = [];

    if (getScoreBoard()){
        scoreBoard = getScoreBoard();
    }

    scoreBoard.push(score);

    localStorage.setItem(scoreBoardKey, JSON.stringify(scoreBoard));
}

function getScoreBoard(){
    return JSON.parse(localStorage.getItem(scoreBoardKey));
}