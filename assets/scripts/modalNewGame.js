const modalPlayers = document.getElementById("modal-players"),
      saveName = document.getElementById("save-names"),
      namePlayer1 = document.getElementById("player1-name"),
      namePlayer2 = document.getElementById("player2-name"),
      closeName = document.getElementById("closeModalPlayer");

function initializeNewGameElements() {
    closeName.addEventListener("click", closeModalPlayers);
    saveName.addEventListener("click", InitializeTurn);
}

function closeModalPlayers() {
    modalPlayers.style.display = "none";
}

function showModalNames() {
    cleanModal();
    modalPlayers.style.display = "block";
}