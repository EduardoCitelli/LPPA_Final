const modal = document.getElementById("contactModal"),
    contactElement = document.getElementById("contact"),
    closeElement = document.getElementById("closeModal"),
    inputs = document.getElementsByClassName("inputForm"),
    formModal = document.getElementById("form-modal"),
    nameElement = document.getElementById("nombre"),
    lastNameElement = document.getElementById("apellido"),
    emailElement = document.getElementById("email"),
    coments = document.getElementById("coments"),
    sendButton = document.getElementById("sendButton");

contactElement.onclick = function () {
    cleanModal();
    modal.style.display = "block";
}

closeElement.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal)
        modal.style.display = "none";
}

formModal.addEventListener('submit', SendInfo);

async function SendInfo(event) {

    event.preventDefault();

    if (nameElement.value.length <= 0) {
        alert("Debe Escribir un nombre");
        nameElement.focus();
        return;
    }

    if (lastNameElement.value.length <= 0) {
        alert("Debe Escribir un apellido");
        lastNameElement.focus();
        return;
    }

    if (emailElement.value.length <= 0) {
        alert("Debe Escribir un email valido");
        emailElement.focus();
        return;
    }

    if (coments.value.length <= 5) {
        alert("Debe Escribir un comentario con mas de 5 caracteres");
        coments.focus();
        return;
    }

    let mailTo = `mailto:${emailElement.value}?subject=${nameElement.value} ${lastNameElement.value}&body=${coments.value}.`;

    window = window.open(mailTo, 'emailWindow');

    modal.style.display = "none";
}

function cleanModal() {

    Array.prototype.slice.call(inputs).forEach(function (el) {
        el.value = '';
    });

    coments.value = '';
}