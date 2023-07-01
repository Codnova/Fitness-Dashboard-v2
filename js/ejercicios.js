// Variables

let paginaActual = 1;
const elementosPagina = 20;
let arrayEjercicios = [];
const url = 'https://musclewiki.p.rapidapi.com/exercises';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2d975c207emsh39645e8fb1e7455p1f5777jsn1eb0e41ec732',
		'X-RapidAPI-Host': 'musclewiki.p.rapidapi.com'
	}
};

let listaEjercicios = document.getElementById("listaEjercicios");
let listaBotones = document.getElementById("listaBotones")
let btnContainer = document.getElementById("btn-container");
let modalContainer = document.getElementById("modalContainer");

// Funciones

function crearCard (nombre, url, dificultad, musculos, idModal, pasos ) { // Esta funcion genera las cards de los ejercicios traidos por la API
  let pasosHTML = pasos.map(paso => `<li class = "list-group-item">${paso}</li>`).join(''); // Cargamos los pasos para realizar cada ejercicio y los inyectamos en un modal de bootstrap
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

function crearBotones (totalItems, elementosPagina) {
  let numeroPaginas = Math.ceil (totalItems / elementosPagina);
  for (i = 1; i <= numeroPaginas; i++) {
    let nuevaPagina = document.createElement("div");
    nuevaPagina.className = "col-auto";
    nuevaPagina.innerHTML = `<button type="button" id="" data-value="${i}" class="btn btn-primary botonPag">${i}</button>`;
    nuevaPagina.addEventListener("click", (event) => {
      paginaActual = event.target.dataset.value;
      listaEjercicios.innerHTML = "";
      renderizar(arrayEjercicios, paginaActual, elementosPagina);
    });
    listaBotones.appendChild(nuevaPagina);
  }
}

function renderizar(arrayEjercicios, paginaActual, elementosPagina) {
  let inicio = (paginaActual - 1) * elementosPagina;
  let final = paginaActual * elementosPagina;
  let arrayCortado = arrayEjercicios.slice(inicio, final); 
  arrayCortado.forEach(ejercicio => {
    console.log(ejercicio);
    console.log(ejercicio.exercise_name);
    crearCard (ejercicio.exercise_name, ejercicio.videoURL[0], ejercicio.Difficulty, ejercicio.target.Primary[0], ejercicio.id, ejercicio.steps);   
  });
}

function fetchData(url, options) {
  fetch(url, options)
  .then(response => {
    if (!response.ok) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema con el servidor, status: ${response.status}',
      }) 
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    arrayEjercicios = data;
    renderizar(arrayEjercicios, paginaActual, elementosPagina);
    crearBotones(arrayEjercicios.length, elementosPagina);
  })
  .catch(error => { // Si hay un problema con el fetch
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Hubo un problema con la operación Fetch: ${error.message}`,
    })
  });
}

// Eventos

btnContainer.addEventListener("click", (evento) => {
  if (evento.target.nodeName !== "BUTTON") { 
    console.log("No presionó el boton");
  } else {
    listaEjercicios.innerHTML = ""; // Limpiamos la lista de ejercicios cuando cambiamos de categoria
    listaBotones.innerHTML = "";
    let categoria = evento.target.dataset.value;
    let newURL = url + "?category=" + categoria;
    console.log(newURL);
    if (evento.target.dataset.value === "all") {
      fetchData (url, options);
    } else {
      fetchData (newURL, options);
    };
  }
});

// Init

fetchData(url, options);