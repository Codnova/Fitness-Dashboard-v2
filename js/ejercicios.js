function crearCard (nombre, url, dificultad, musculos, idModal, pasos ) { // Esta funcion genera las cards de los ejercicios traidos por la API
  let pasosHTML = pasos.map(paso => `<li class = "list-group-item">${paso}</li>`).join('');
  let nuevaCard = document.createElement("div");
  nuevaCard.className = "col-auto";
  nuevaCard.innerHTML = `<div class="card" style="max-width: 24rem;">
                            <video src="${url}" controls class="card-img-top"></video>
                            <div class="card-body">
                              <h5 class="card-title">${nombre}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                              <li class="list-group-item">Dificultad: <strong>${dificultad}</strong></li>
                              <li class="list-group-item">Músculos involucrados: <strong>${musculos}</strong></li>
                            <div class="card-body">
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${idModal}">Ver paso a paso</button>
                            </div>
                          </div>`;
  listaEjercicios.appendChild(nuevaCard);
  let nuevoModal = document.createElement("div"); //Modal correspondiente a la card que muestra el paso a paso del ejercicio
  nuevoModal.innerHTML = ` <div class="modal fade" id="${idModal}" tabindex="-1" aria-labelledby="${idModal}" aria-hidden="true">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h1 class="modal-title fs-5" id="${idModal}">Pasos para completar el ejercicio</h1>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                  <ol class= "list-group list-group-numbered">
                                    ${pasosHTML}
                                  </ol>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                              </div>
                            </div>
                          </div>`;
  modalContainer.appendChild(nuevoModal);
}

let listaEjercicios = document.getElementById("listaEjercicios");
let btnContainer = document.getElementById("btn-container");
let modalContainer = document.getElementById("modalContainer");

btnContainer.addEventListener("click", (evento) => {
  if (evento.target.nodeName !== "BUTTON") { //Si no hago click en un boton
    console.log("No presionó el boton");
    return;
  } else {
    listaEjercicios.innerHTML = "";
    let categoria = evento.target.dataset.value;
    let newURL = url + "?category=" + categoria;
    console.log(newURL);
    if (evento.target.dataset.value === "all") {
      newURL = "https://musclewiki.p.rapidapi.com/exercises";
      fetch (newURL, options)
        .then(response => response.json())
        .then(data => renderizar(data))
    } else {
      fetch (newURL, options)
        .then(response => response.json())
        .then(data => renderizar(data))
    };
  }
});

const url = 'https://musclewiki.p.rapidapi.com/exercises';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '',
		'X-RapidAPI-Host': 'musclewiki.p.rapidapi.com'
	}
};

function renderizar(arrayEjercicios) {
  arrayEjercicios = arrayEjercicios.slice(0,30);
  arrayEjercicios.forEach(ejercicio => {
    console.log(ejercicio);
    console.log(ejercicio.exercise_name);
    crearCard (ejercicio.exercise_name, ejercicio.videoURL[0], ejercicio.Difficulty, ejercicio.target.Primary[0], ejercicio.id, ejercicio.steps);   
  });
}

fetch (url, options)
  .then(response => response.json())
  .then(data => renderizar(data))

