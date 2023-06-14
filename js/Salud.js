let arrayPersonas = [];

class Persona {
  
  constructor (nombre, edad, altura, peso, sexo) { // Constructor de la clase Persona
    this.nombre = nombre;
    this.edad = edad;
    this.altura = altura;
    this.peso = peso;
    this.sexo = sexo;
    this.bmi = 0;
    this.tdee = 0;
    this.riesgo = "";
  }

  masaCorporal () { // Este método retorna el indice de masa corporal (BMI)
    return Math.round((this.peso / (this.altura * this.altura))*100)/100; 
  }

  riesgoBmi () { // Este método retorna un string con la categoría de riesgo del indice de masa corporal
    if (this.bmi <= 18.4) {
      return "Bajo peso";
    } else if (this.bmi >= 18.5 && this.bmi <= 24.9) {
      return "Peso normal";
    } else if (this.bmi >= 25 && this.bmi <= 39.9 ) {
      return "Sobre peso";
    } else {
      return "Obesidad";
    }
  }

  calcularCalorias () { // Este método retorna el TDEE o gasto energético diario total
    if (this.sexo === "Mujer") {
      return Math.round((447.593 + (9.247 * this.peso) + (3.098 * (this.altura*100)) - (4.330 * this.edad))* 1.25);
    } else {
      return Math.round((88.362 + (13.397 * this.peso) + (4.799 * (this.altura*100)) - (5.677 * this.edad))* 1.25);
    }
  }

  logDatos() {
    console.log("Datos de objeto persona:", this.nombre, this.edad, this.altura, this.peso, this.sexo, this.bmi, this.tdee, this.riesgo);
  }
}

// Funciones:

function mostrarResultado (objPersona) { // Esta funcion agrega el resultado al HTML y lo muestra al usuario 
  resultadoSalud.innerHTML = "";
  let nuevoElemento = document.createElement("div");
  nuevoElemento.className = "card";
  nuevoElemento.innerHTML = `
                            <div class="card-body">
                              <h5 class="card-title">${objPersona.nombre}</h5>
                              <h6 class="card-subtitle text-body-secondary">${objPersona.sexo}</h6>
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item">Edad: ${objPersona.edad} años</li>
                                <li class="list-group-item">Altura: ${objPersona.altura} Metros</li>
                                <li class="list-group-item">TDEE: ${objPersona.tdee} Kcal</li>
                                <li class="list-group-item">BMI: ${objPersona.bmi}</li>
                                <li class="list-group-item">Categoria BMI: ${objPersona.riesgo}</li>
                              </ul>
                            </div>`;
  resultadoSalud.appendChild(nuevoElemento);
}

function mostrarHistorial (objPersona) { // Esta funcion recibe el objeto persona y genera una Card con los datos de la misma para mostrarlos
  
  let nuevoElemento = document.createElement("div");
  nuevoElemento.className = "col-auto";
  nuevoElemento.innerHTML = `<div class="card">
                              <div class="card-body">
                                <h5 class="card-title">${objPersona.nombre}</h5>
                                <h6 class="card-subtitle text-body-secondary">${objPersona.sexo}</h6>
                                <ul class="list-group list-group-flush">
                                  <li class="list-group-item">Edad: ${objPersona.edad} años</li>
                                  <li class="list-group-item">Altura: ${objPersona.altura} Metros</li>
                                  <li class="list-group-item">TDEE: ${objPersona.tdee} Kcal</li>
                                  <li class="list-group-item">BMI: ${objPersona.bmi}</li>
                                  <li class="list-group-item">Categoria BMI: ${objPersona.riesgo}</li>
                                </ul>
                              </div>
                            </div>`;
    historialSalud.appendChild(nuevoElemento);
}

function realizarCalculos (personaNueva) { // Esta funcion recibe los datos ingresados por el usuario para calcular la info requerida
  personaNueva.bmi = personaNueva.masaCorporal();
  personaNueva.riesgo = personaNueva.riesgoBmi();
  personaNueva.tdee = personaNueva.calcularCalorias();
}

function agregarPersona (nombre, edad, altura, peso, sexo) { // Esta funcion recibe los datos del usuario y los guarda en un array de objetos, también actualiza el Local Storage
  let personaNueva = new Persona (nombre, edad, altura, peso, sexo);
  realizarCalculos(personaNueva);
  personaNueva.logDatos();
  mostrarResultado(personaNueva); // Muestra el resultado del calculo del formulario
  arrayPersonas.push(personaNueva);
  let ArrayJson = JSON.stringify(arrayPersonas);
  localStorage.setItem("personas", ArrayJson);
  console.log("Array en agregarPersona", arrayPersonas);
}

function cargarHistorial() { // Esta funcion carga el array guardado en LocalStorage, sino hay personas, setea el array como vacio
  historialSalud.innerHTML = "";
  let ArrayJson = localStorage.getItem("personas"); 
  arrayPersonas = JSON.parse(ArrayJson);
  if (arrayPersonas !== null) {
    for (let objPersona of arrayPersonas) {
      mostrarHistorial(objPersona);
    }; 
  } else {
    arrayPersonas = [];
  }
}

// Capturando los nodos del HTML:

let inputNombre = document.getElementById("Nombre");
let inputEdad = document.getElementById("Edad");
let inputAltura = document.getElementById("Altura");
let inputPeso = document.getElementById("Peso");
let inputSexo = document.getElementsByName("Sexo");
let inputCalcular = document.getElementById("btnCalculateBmi");
let resultadoSalud = document.getElementById("contenedor-resultado");
let historialSalud = document.getElementById("contenedor-historial");
let form = document.getElementById("form");
let botonClose = document.getElementById("btn-close");


// Event Listeners/Handlers:

form.addEventListener ("submit", (event) => {
  event.preventDefault();
})

inputCalcular.addEventListener ("click", (event) => { // Este evento calcula los datos de la persona y los agrega al arrayPersona
  let nombre = inputNombre?.value;
  let edad = parseInt(inputEdad?.value);
  let altura = parseFloat(inputAltura?.value);
  let peso = parseFloat(inputPeso?.value);
  let sexo = document.querySelector("input[name='Sexo']:checked")?.value;
  if (inputNombre.checkValidity() && inputEdad.checkValidity() && inputAltura.checkValidity() && inputPeso.checkValidity() === true){
    agregarPersona(nombre, edad, altura, peso, sexo); // Si los valores del form son validos. Agregamos la persona
    appendAlert('Datos guardados exitosamente.', 'success'); // Funcion que muestra una alerta cuando se hace click en el botón calcular
    cargarHistorial(); // Muesto las personas en el historial, incluyendo la persona recién agregada
  } else {
    appendAlert('Por favor revise los datos ingresados y verifique que estén correctos.', 'danger');
    }
});

window.addEventListener("load", () => { // Este evento carga las personas guardas en localstorage
  cargarHistorial();
});

// Alerta de boostrap cuando el usuario hace click: 

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  alertPlaceholder.innerHTML = "";
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" id="btn-close" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}