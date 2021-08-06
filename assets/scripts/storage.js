const gameSavedKey = "game-saved",
      scoreBoardKey = "score-board";

function saveGameLocal() {
    localStorage.setItem(gameSavedKey, JSON.stringify(game));
}

function loadGameLocal() {
    return JSON.parse(localStorage.getItem(gameSavedKey));
}

function saveScoreLocal(scoreBoard) {
    localStorage.setItem(scoreBoardKey, JSON.stringify(scoreBoard));
}

function getScoreBoard(){
    return JSON.parse(localStorage.getItem(scoreBoardKey));
}