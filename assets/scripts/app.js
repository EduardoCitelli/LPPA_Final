const tablePlayer = document.getElementById('points'),
    turnElement = document.getElementById("turnText"),
    newGameButton = document.getElementById("newGameButton"),
    name1 = document.getElementById("name-1"),
    name2 = document.getElementById("name-2"),
    points1 = document.getElementById("points-1"),
    points2 = document.getElementById("points-2"),
    saveGameButton = document.getElementById("save-game"),
    loadGameButton = document.getElementById("load-game");

var winSound = document.getElementById("sound");

window.onload = async () => InitializeBoard();

async function InitializeBoard() {

    newBoard();

    initializeScoreBoardElements();
    initializeNewGameElements();
    initializeIndexElements();
    initializeMassageModal();
}

function initializeIndexElements() {
    newGameButton.addEventListener("click", showModalNames);
    saveGameButton.addEventListener("click", saveGame);
    loadGameButton.addEventListener("click", loadGame);
}

function InitializeTurn(event) {

    event.preventDefault();

    if (namePlayer1.value.length <= 0) {
        showMessageModal("Escribir el Nombre del jugador 1");
        namePlayer1.focus();
        return;
    }

    if (namePlayer2.value.length <= 0) {
        showMessageModal("Escribir el Nombre del jugador 2");
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

async function updateBoard(isLoadGame) {
    await createBoard();
    await checkTurn(isLoadGame);
}

async function checkTurn(isLoadGame) {

    if (checkWinner()) {

        let winner, loser;

        if (game.turn === 1) {
            winner = game.players.player1;
            loser = game.players.player2;
        }
        else {
            winner = game.players.player2;
            loser = game.players.player1;
        }
        setTimeout(() => {
            playWinSound();
            showMessageModal(`Felicidades ${winner.name} eres el ganador`);
            clearBoard();
            saveScore(winner, loser);
        }, 100);

        return;
    }

    if (!isLoadGame)
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

    saveGameLocal();
    showMessageModal("Juego Guardado");
}

function loadGame() {

    let loadedGame = loadGameLocal();

    if (!loadedGame) {
        showMessageModal("No hay partidas guardadas");
        return;
    }

    game = loadedGame;

    ClearTurnElement();

    turnElement.classList.add('turn-container');
    tablePlayer.style.display = "flex";
    saveGameButton.style.display = "flex";

    setNames();
    createAndAppendTurnText();
    updateBoard(true);

    showMessageModal('Juego Cargado');
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

    if (getScoreBoard())
        scoreBoard = getScoreBoard();

    scoreBoard.push(score);

    saveScoreLocal(scoreBoard);
}

function playWinSound() {
    winSound.play()
}