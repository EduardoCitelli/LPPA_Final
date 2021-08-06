var isHigherDate = false,
    isHigherLoser = false,
    isHigherWinner = false;

const modalScoreBoard = document.getElementById("modal-score-board"),
      openScoreBoardButton = document.getElementById("board-score-button"),
      closeScoreBoardButton = document.getElementById("close-modal-score-board"),
      aceptScoreBoardButton = document.getElementById("acept-button"),
      bodyScoreBoard = document.getElementById("body-score-board"),
      tableScoreBoard = document.getElementById("score-board-table"),
      headDate = document.getElementById("head-date"),
      headWinner = document.getElementById("head-winner-points"),
      headLoser = document.getElementById("head-loser-points");

function initializeScoreBoardElements() {
    openScoreBoardButton.addEventListener("click", showModalScoreBoard);
    headDate.addEventListener("click", orderByDate);
    headLoser.addEventListener("click", orderByLoserPoints);
    headWinner.addEventListener("click", orderByWinnerPoints);    
    closeScoreBoardButton.addEventListener("click", closeModalScoreBoard);
    aceptScoreBoardButton.addEventListener("click", closeModalScoreBoard);
}


function closeModalScoreBoard() {
    modalScoreBoard.style.display = "none";
}

function showModalScoreBoard() {

    initializeFilters();

    bodyScoreBoard.innerHTML = "";
    let scoreBoard = [];

    if (getScoreBoard()){
        scoreBoard = getScoreBoard();
    }

    createScoreTable(scoreBoard);    

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

function orderByDate() {

    bodyScoreBoard.innerHTML = "";

    let scoreBoard = [];

    if (getScoreBoard()){
        scoreBoard = getScoreBoard();
    }
    
    if (isHigherDate) {
        scoreBoard.sort((a, b) => {

            if (a.date > b.date)
                return 1;

            if (a.date < b.date)
                return -1;

            return 0;
        });
    }
    else {
        scoreBoard.sort((a, b) => {

            if (a.date < b.date)
                return 1;

            if (a.date > b.date)
                return -1;

            return 0;
        });
    }

    createScoreTable(scoreBoard);

    isHigherDate = !isHigherDate;
}

function orderByWinnerPoints() {

    bodyScoreBoard.innerHTML = "";

    let scoreBoard = [];

    if (getScoreBoard()){
        scoreBoard = getScoreBoard();
    }

    if (isHigherWinner)
        scoreBoard.sort((a, b) => a.winnerPoints - b.winnerPoints);
    else
        scoreBoard.sort((a, b) => b.winnerPoints - a.winnerPoints);

    createScoreTable(scoreBoard);

    isHigherWinner = !isHigherWinner;
}

function orderByLoserPoints() {

    bodyScoreBoard.innerHTML = "";

    let scoreBoard = [];

    if (getScoreBoard()){
        scoreBoard = getScoreBoard();
    }

    if (isHigherLoser)
        scoreBoard.sort((a, b) => a.loserPoints - b.loserPoints);
    else
        scoreBoard.sort((a, b) => b.loserPoints - a.loserPoints);

    createScoreTable(scoreBoard);

    isHigherLoser = !isHigherLoser;
}

function initializeFilters() {

    isHigherDate = false;
    isHigherLoser = false;
    isHigherWinner = false;
}

function createScoreTable(scoreBoard) {

    scoreBoard.forEach(score => {

        let rowTable = createRowTable();

        for (let property in score) {

            let appendElement = score[property];

            let cellTable = createCelltable(appendElement);
            rowTable.appendChild(cellTable);
        }

        bodyScoreBoard.appendChild(rowTable);
    });
}