var enemyPieceJumped = [],
    stateGame;

const board = document.getElementById("board");

function defaultState() {

    stateGame = [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
    ];
}

function createBoard() {

    board.innerHTML = "";

    stateGame.forEach(function (row) {

        let rowElement = createRow();

        row.forEach(function (cell) {

            let cellElement = createCell();

            checkPieceType(cell, cellElement);

            cellElement.addEventListener("click", selectCell);

            rowElement.appendChild(cellElement);
        });

        board.appendChild(rowElement);
    });
}

function createRow() {

    let row = document.createElement("div");
    row.classList.add("board_row");

    return row;
}

function createCell() {

    let cell = document.createElement("div");
    cell.classList.add("checkersSquare");

    return cell;
}

function checkPieceType(cell, cellElement) {

    let pieceType = cell === 1 || cell === 3 ? "redPiece" : cell === 2 || cell === 4 ? "whitePiece" : "";
    let isQueen = cell === 3 || cell === 4 ? "queen" : "";

    if (pieceType.length > 0)
        cellElement.classList.add(pieceType);

    if (isQueen.length > 0)
        cellElement.classList.add(isQueen);
    
}