const urlNotAllowed = "./assets/img/notAllowed.png";

function selectCell() {

    if (turn === 0)
        return;

    if (this.classList.contains("selected")) {

        this.classList.remove("selected")
        moveObject = {};
        return;
    }

    let
        rowParent = this.parentNode,

        row = Array.from(rowParent.parentNode.children)
            .indexOf(rowParent),

        col = Array.from(rowParent.children)
            .indexOf(this);

    if (Object.keys(moveObject).length === 0) {

        let
            isWhite = this.classList.contains("whitePiece"),
            isRed = this.classList.contains("redPiece"),
            isTurnOne = turn === 1,
            isTurnTwo = turn === 2;

        if (!isRed && !isWhite) {
            moveNotAllowed(this);
            return
        }

        if (isWhite && isTurnOne) {
            moveNotAllowed(this);
            return;
        }

        if (isRed && isTurnTwo) {
            moveNotAllowed(this);
            return;
        }

        moveObject = {
            row1: row,
            col1: col
        }

        if (isRed || isWhite)
            this.classList.add("selected");
    }
    else if (Object.keys(moveObject).length === 2) {

        moveObject.row2 = row;
        moveObject.col2 = col;

        let move = attemptMove(),
            selected = board.getElementsByClassName("selected").item(0);

        selected.classList.remove("selected");

        moveObject = {};

        if (move) {
            updateBoard();
        }
    }
}

function moveNotAllowed(element) {

    let oldImage = window.getComputedStyle(element, false).backgroundImage;

    element.style.backgroundImage = `url(${urlNotAllowed})`;

    setTimeout(() => {
        element.style.backgroundImage = oldImage;
    }, 100);
}

function attemptMove() {

    let canMove = checkDestination() && (isQueen() || checkDirection()) && checkDistance();

    if (canMove) {

        makeMove();

        while (enemyPieceJumped.length > 0) {

            let
                colRemover = enemyPieceJumped.pop(),
                rowRemover = enemyPieceJumped.pop();

            removePiece(rowRemover, colRemover);

            if (turn == 1)
                players.player1.points++;
            else
                players.player2.points++;
        }
    }

    return canMove;
}

function checkDestination() {

    let cellWithPiece = stateGame[moveObject.row2][moveObject.col2] !== 0;

    if (cellWithPiece) {
        alert('Elige un lugar que esté vacio');
        return false;
    }

    return true;
};

function isQueen() {

    let piece = stateGame[moveObject.row1][moveObject.col1];
    return piece === 3 || piece === 4;
}

function checkDirection() {

    let
        playerOneWrongDirection = turn === 1 && moveObject.row2 > moveObject.row1,
        playerTwoWrongDirection = turn === 2 && moveObject.row2 < moveObject.row1;

    if (playerOneWrongDirection || playerTwoWrongDirection) {
        alert('Ir para la otra dirección');
        return false;
    }

    return true;
};

function checkDistance() {

    let
        rowjump = Math.abs(moveObject.row1 - moveObject.row2),
        coljump = Math.abs(moveObject.col1 - moveObject.col2),
        simpleJump = rowjump === 1 && coljump === 1,
        doubleJumpWithEnemyBetween = rowjump === 2 && coljump === 2 && enemyJumped().length > 0;

    if (simpleJump || doubleJumpWithEnemyBetween) {
        return true;
    }

    alert('Movimiento Invalido');
    return false;
};

function enemyJumped() {

    let
        middleRow = moveObject.row2 + ((moveObject.row1 - moveObject.row2) / 2),
        middleCol = moveObject.col2 + ((moveObject.col1 - moveObject.col2) / 2),
        otherPlayer = turn === 1 ? 2 : 1,
        otherPlayerQueen = turn === 1 ? 4 : 3;
        hasEnemyPice = stateGame[middleRow][middleCol] === otherPlayer || stateGame[middleRow][middleCol] === otherPlayerQueen;

    if (hasEnemyPice) {
        enemyPieceJumped.push(middleRow);
        enemyPieceJumped.push(middleCol);
    }

    return enemyPieceJumped;
};

function makeMove() {
    let piece = queenMe();
    stateGame[moveObject.row1][moveObject.col1] = 0;
    stateGame[moveObject.row2][moveObject.col2] = piece;
};

function removePiece(row, col) {
    stateGame[row][col] = 0;
};

function queenMe() {

    if (turn === 1 && moveObject.row2 == 0)
        return 3;

    if (turn === 2 && moveObject.row2 == 7)
        return 4;

    return stateGame[moveObject.row1][moveObject.col1];
}