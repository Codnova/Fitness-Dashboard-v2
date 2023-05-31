const rpe_chart = {
  1: {
      10: 100,
      9.5: 97.8,
      9: 95.5,
      8.5: 93.9,
      8: 92.2,
      7.5: 90.7,
      7: 89.2,
      6.5: 87.8,
      6: 86.3
  },
  2: {
      10: 95.5,
      9.5: 93.9,
      9: 92.2,
      8.5: 90.7,
      8: 89.2,
      7.5: 87.8,
      7: 86.3,
      6.5: 85,
      6: 83.7
  },
  3: {
      10: 92.2,
      9.5: 90.7,
      9: 89.2,
      8.5: 87.8,
      8: 86.3,
      7.5: 85,
      7: 83.7,
      6.5: 82.4,
      6: 81.1
  },
  4: {
      10: 89.2,
      9.5: 87.8,
      9: 86.3,
      8.5: 85,
      8: 83.7,
      7.5: 82.4,
      7: 81.1,
      6.5: 79.9,
      6: 78.6
  },
  5: {
      10: 86.3,
      9.5: 85,
      9: 83.7,
      8.5: 82.4,
      8: 81.1,
      7.5: 79.9,
      7: 78.6,
      6.5: 77.4,
      6: 76.2
  },
  6: {
      10: 83.7,
      9.5: 82.4,
      9: 81.1,
      8.5: 79.9,
      8: 78.6,
      7.5: 77.4,
      7: 76.2,
      6.5: 75.1,
      6: 73.9
  },
  7: {
      10: 81.1,
      9.5: 79.9,
      9: 78.6,
      8.5: 77.4,
      8: 76.2,
      7.5: 75.1,
      7: 73.9,
      6.5: 72.3,
      6: 70.7
  },
  8: {
      10: 78.6,
      9.5: 77.4,
      9: 76.2,
      8.5: 75.1,
      8: 73.9,
      7.5: 72.3,
      7: 70.7,
      6.5: 69.4,
      6: 68
  },
  9: {
      10: 76.2,
      9.5: 75.1,
      9: 73.9,
      8.5: 72.3,
      8: 70.7,
      7.5: 69.4,
      7: 68,
      6.5: 66.7,
      6: 65.3
  },
  10: {
      10: 73.9,
      9.5: 72.3,
      9: 70.7,
      8.5: 69.4,
      8: 68,
      7.5: 66.7,
      7: 65.3,
      6.5: 64,
      6: 62.6
  },
  11: {
      10: 70.7,
      9.5: 69.4,
      9: 68,
      8.5: 66.7,
      8: 65.3,
      7.5: 64,
      7: 62.6,
      6.5: 61.3,
      6: 59.9
  },
  12: {
      10: 68,
      9.5: 66.7,
      9: 65.3,
      8.5: 64,
      8: 62.6,
      7.5: 61.3,
      7: 59.9,
      6.5: 58.6,
      6: 57.4
  }
}

let rpeArray = [
  [100, 97.8, 95.5, 93.9, 92.2, 90.7, 89.2, 87.8, 86.3],
  [95.5, 93.9, 92.2, 90.7, 89.2, 87.8, 86.3, 85, 83.7],
  [92.2, 90.7, 89.2, 87.8, 86.3, 85, 83.7, 82.4, 81.1],
  [89.2, 87.8, 86.3, 85, 83.7, 82.4, 81.1, 79.9, 78.6],
  [86.3, 85, 83.7, 82.4, 81.1, 79.9, 78.6, 77.4, 76.2],
  [83.7, 82.4, 81.1, 79.9, 78.6, 77.4, 76.2, 75.1, 73.9],
  [81.1, 79.9, 78.6, 77.4, 76.2, 75.1, 73.9, 72.3, 70.7],
  [78.6, 77.4, 76.2, 75.1, 73.9, 72.3, 70.7, 69.4, 68],
  [76.2, 75.1, 73.9, 72.3, 70.7, 69.4, 68, 66.7, 65.3],
  [73.9, 72.3, 70.7, 69.4, 68, 66.7, 65.3, 64, 62.6],
  [70.7, 69.4, 68, 66.7, 65.3, 64, 62.6, 61.3, 59.9],
  [68, 66.7, 65.3, 64, 62.6, 61.3, 59.9, 58.6, 57.4]
];

// Funciones:

function generarListado (numeroBoton) { // Funcion que genera el listado de intensidad según el botón que se presionó
  for (let i=0; i < rpeArray[numeroBoton][i]; i++) {
    let valorRpe = rpeArray[numeroBoton][i];
    let nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = valorRpe + "%";
    nuevoElemento.classList.add("list-group-item", "bg-body-tertiary");
    listadoIntensidad.appendChild(nuevoElemento);
  }
}

function e1rm(peso, reps, rpe) { // Función que calcula el 1RM segun el peso, repeticiones y RPE ingresado
  return ((peso / rpe_chart[reps][rpe]) * 100);
}

// Capturando los nodos/Elementos:

let peso = document.getElementById("Peso"); // Captura el nodo/etiqueta peso
let reps = document.getElementById("Reps"); // Captura el nodo/etiqueta reps
let rpe = document.getElementById("RPE"); // Captura el nodo/etiqueta RPE
let resultadoRpe = document.getElementById("resultadoRpe"); // Captura el nodo/etiqueta con el resultado de e1RM
let calcular = document.getElementById("btnCalculate"); // Captura el botón Calcular
let listadoIntensidad = document.getElementById("ul-intensidad"); //Capturo los elementos de la lista de intensidad
let btnContainer = document.getElementById("btnContainer"); //Capturo todos los botones de repeticiones

// Event Listeners y Handlers:

peso.addEventListener("input", () => {
  console.log("Peso: " + peso.value);
});

reps.addEventListener("input", () => {
  console.log("Reps: " +  reps.value);
});

rpe.addEventListener("input", () => {
  console.log("RPE: " + rpe.value);
});


calcular.addEventListener("click", () => {
  let oneRepMax = e1rm(peso.value, reps.value, rpe.value);
  resultadoRpe.innerText = Math.round(oneRepMax);
});

btnContainer.addEventListener("click", (evento) => { //Este evento captura cuando se hace click en algun botón de las repeticiones, y genera el listado de %RM según el botón que se presionó
  if (evento.target.nodeName !== "BUTTON") { //Si no hago click en un boton
    console.log("No presionó el boton");
    return;
  } else {
    let botonPresionado = parseInt(evento.target.innerText); //Guardo en esta variable el numero del boton presionado
    console.log(botonPresionado);
    listadoIntensidad.innerHTML = "";
    generarListado(botonPresionado-1);
    calcularPeso(botonPresionado-1);
  }
});

window.addEventListener("load", (event) => { // Se carga la lista de Intensidad al cargar la pagina
  for (let i=0; i < rpeArray[0][i]; i++) {
    let valorRpe = rpeArray[0][i];
    let nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = valorRpe + "%";
    nuevoElemento.classList.add("list-group-item", "bg-body-tertiary");
    listadoIntensidad.appendChild(nuevoElemento);
  };
});





