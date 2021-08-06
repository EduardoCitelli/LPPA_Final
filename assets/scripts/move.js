const urlNotAllowed = "./assets/img/notAllowed.png";

function selectCell() {

    if (game.turn === 0)
        return;

    if (this.classList.contains("selected")) {

        this.classList.remove("selected")
        game.moveObject = {};
        return;
    }

    let
        rowParent = this.parentNode,

        row = Array.from(rowParent.parentNode.children)
            .indexOf(rowParent),

        col = Array.from(rowParent.children)
            .indexOf(this);

    if (Object.keys(game.moveObject).length === 0) {

        let
            isWhite = this.classList.contains("whitePiece"),
            isRed = this.classList.contains("redPiece"),
            isTurnOne = game.turn === 1,
            isTurnTwo = game.turn === 2;

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

        game.moveObject = {
            row1: row,
            col1: col
        }

        if (isRed || isWhite)
            this.classList.add("selected");
    }
    else if (Object.keys(game.moveObject).length === 2) {

        game.moveObject.row2 = row;
        game.moveObject.col2 = col;

        let move = attemptMove(),
            selected = board.getElementsByClassName("selected").item(0);

        selected.classList.remove("selected");

        game.moveObject = {};

        if (move) {
            updateBoard(false);
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

            if (game.turn == 1)
                game.players.player1.points++;
            else
                game.players.player2.points++;
        }
    }

    return canMove;
}

function checkDestination() {

    let cellWithPiece = game.stateGame[game.moveObject.row2][game.moveObject.col2] !== 0;

    if (cellWithPiece) {
        messageModal('Elige un lugar que esté vacio');
        return false;
    }

    return true;
};

function isQueen() {

    let piece = game.stateGame[game.moveObject.row1][game.moveObject.col1];
    return piece === 3 || piece === 4;
}

function checkDirection() {

    let
        playerOneWrongDirection = game.turn === 1 && game.moveObject.row2 > game.moveObject.row1,
        playerTwoWrongDirection = game.turn === 2 && game.moveObject.row2 < game.moveObject.row1;

    if (playerOneWrongDirection || playerTwoWrongDirection) {
        messageModal('Ir para la otra dirección');
        return false;
    }

    return true;
};

function checkDistance() {

    let
        rowjump = Math.abs(game.moveObject.row1 - game.moveObject.row2),
        coljump = Math.abs(game.moveObject.col1 - game.moveObject.col2),
        simpleJump = rowjump === 1 && coljump === 1,
        doubleJumpWithEnemyBetween = rowjump === 2 && coljump === 2 && enemyJumped().length > 0;

    if (simpleJump || doubleJumpWithEnemyBetween) {
        return true;
    }

    messageModal('Movimiento Invalido');
    return false;
};

function enemyJumped() {

    let middleRow = game.moveObject.row2 + ((game.moveObject.row1 - game.moveObject.row2) / 2),
        middleCol = game.moveObject.col2 + ((game.moveObject.col1 - game.moveObject.col2) / 2),
        otherPlayer = game.turn === 1 ? 2 : 1,
        otherPlayerQueen = game.turn === 1 ? 4 : 3;

    let hasEnemyPice = game.stateGame[middleRow][middleCol] === otherPlayer || game.stateGame[middleRow][middleCol] === otherPlayerQueen;

    if (hasEnemyPice) {
        enemyPieceJumped.push(middleRow);
        enemyPieceJumped.push(middleCol);
    }

    return enemyPieceJumped;
};

function makeMove() {
    let piece = queenMe();
    game.stateGame[game.moveObject.row1][game.moveObject.col1] = 0;
    game.stateGame[game.moveObject.row2][game.moveObject.col2] = piece;
};

function removePiece(row, col) {
    game.stateGame[row][col] = 0;
};

function queenMe() {

    if (game.turn === 1 && game.moveObject.row2 == 0)
        return 3;

    if (game.turn === 2 && game.moveObject.row2 == 7)
        return 4;

    return game.stateGame[game.moveObject.row1][game.moveObject.col1];
}