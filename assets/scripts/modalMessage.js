const messageModal = document.getElementById("message-modal"),
      closeMessage = document.getElementById("close-modal-message"),
      message = document.getElementById("message-body"),
      messageButton = document.getElementById("message-button");
      

function initializeMassageModal() {
    messageButton.addEventListener("click", closeMessageModal);
    closeMessage.addEventListener("click", closeMessageModal);
}

function showMessageModal(messageText) {
    console.log(messageText);
    message.innerText = messageText;
    messageModal.style.display = "block";
}

function closeMessageModal() {
    message.innerText = "";
    messageModal.style.display = "none";
}