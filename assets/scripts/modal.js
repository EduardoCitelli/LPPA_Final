var modal = document.getElementById("contactModal"),

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

    if (email.value.length <= 0) {
        alert("Debe Escribir un email valido");
        emailElement.focus();
        return;
    }

    if (coments.value.length <= 0) {
        alert("Debe Escribir un comentario");
        nameElement.focus();
        return;
    }

    let data = {
        name: nameElement.value,
        lastName: lastNameElement.value,
        email: emailElement.value,
        comentaries: coments.value,
        userId: 1
    }

    let header = {
        'Content-type': 'application/json; charset=UTF-8'
    }

    await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: header
    })
        .then(response => response.json())
        .then(element => {

            let message = `Comentario Enviado, Muchas Gracias\n${element.lastName}, ${element.name}.`
            alert(message);
        });

    this.submit();
}

function cleanModal() {

    Array.prototype.slice.call(inputs).forEach(function (el) {
        el.value = '';
    });

    coments.value = '';
}