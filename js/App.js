/* 
Fitness Dashboard es un sitio web con varias herramientas y calculadoras para tus entrenamientos y salud en general. La version inicial te permite calcular tu indice de masa corporal (BMI) y tu TDEE (gasto calórico diario total). 

TODO: Calculadora RPE, Registro de entrenamientos
*/

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
      this.ejercicios = []; // Array de objetos ejercicio que almacena los entrenamientos del usuario (NO ESTA IMPLEMENTADO AÚN) 
  }

  masaCorporal () { // Este método retorna el indice de masa corporal
      return (this.peso / (this.altura * this.altura)); 
  }

  riesgoBMI () { // Este método retorna un string con la categoría de riesgo del indice de masa corporal
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
      if (this.sexo === "F") {
        return ((447.593 + (9.247 * this.peso) + (3.098 * (this.altura*100)) - (4.330 * this.edad))* 1.25);
      } else {
        return ((88.362 + (13.397 * this.peso) + (4.799 * (this.altura*100)) - (5.677 * this.edad))* 1.25);
      }
  }
  
  getDatos() {
      console.log("----------- Datos de la persona -------------");
      console.log("Nombre: ", this.nombre);
      console.log("Edad: ", this.edad);
      console.log("Altura: ", this.altura);
      console.log("Peso: ", this.peso);
      console.log("Sexo: ", this.sexo);
      console.log("Indice de masa corporal (BMI/IMC): ", this.bmi);
      console.log("Su categoria BMI es: ", this.riesgo);
      console.log("Su gasto energético total diario (TDEE): ", this.tdee);
  }

  getNombre() { // Método que devuelve sólo el nombre de la persona
    console.log(this.nombre);
  }
  
}

function pedirDatos () { // Funcion que solicita y valida los datos que ingresa el usuario
  let nombre = prompt("Ingrese su nombre completo");
  let edad;
  while (true) { // Bucle de validación de edad
    edad = parseInt(prompt("Ingrese su edad"));
    if (edad > 0 && edad < 120) {
      // Edad en el rango correcto
      break;
    } else {
      alert("La edad está fuera del parámetro, por favor intente de nuevo");
    }
  }
  let altura;
  while (true) { // Bucle de validación de Altura
    altura = parseFloat(prompt("Ingrese su altura en metros (por ejemplo: 1.75)"));
    if (altura > 0.5 && altura < 3.5) {
      // Altura en el rango correcto
      break;
    } else {
      alert("La altura está fuera del parámetro, por favor intente de nuevo");
    }
  }
  let peso;
  while (true) { // Bucle de validación de peso
    peso = parseFloat(prompt("Ingrese su peso en kilos (por ejemplo: 75)"));
    if (peso > 1 && peso < 700) {
      // Peso en el rango correcto
      break;
    } else {
      alert("El peso está fuera del parámetro, por favor intente de nuevo");
    }
  }
  let sexo;
  while (true) { // Bucle de validación de sexo
    sexo = prompt("Ingrese M si su sexo es masculino o F si es femenino");
    sexo = sexo.toUpperCase();
    if (sexo === "M" || sexo === "F") {
      // Sexo en el rango permitido
      break;
    } else {
      alert("Por favor ingrese nuevamente su sexo");
    }
  }
  return { // Retorna un objeto con los valores ingresados por el usuario
    nombre: nombre,
    edad: edad,
    altura: altura,
    peso: peso,
    sexo: sexo
  };
}

function agregarPersona() { // Funcion que pide los datos y los agrega al array de personas
  let datosPersona = pedirDatos(); 
  let personaNueva = new Persona (datosPersona.nombre, datosPersona.edad, datosPersona.altura, datosPersona.peso, datosPersona.sexo);
  calcularPersona(personaNueva);
  personaArray.push(personaNueva);
  personaNueva.getDatos();
}

function calcularPersona (personaNueva) { // Esta funcion recibe los datos ingresados por el usuario para calcular la info requerida
  personaNueva.bmi = personaNueva.masaCorporal();
  personaNueva.riesgo = personaNueva.riesgoBMI();
  personaNueva.tdee = personaNueva.calcularCalorias();
}

function filtrarBMI (objPersona) { // Funcion de búsqueda de personas en riesgo por su categoria BMI
  
  return objPersona.riesgo === "Bajo peso" || objPersona.riesgo === "Obesidad";
  
}

function filtrarPorRiesgo (objPersona, categoriaRiesgo) {
  if (categoriaRiesgo === 1) {
    return objPersona.riesgo === "Bajo peso";
  } else if (categoriaRiesgo === 2) {
    return objPersona.riesgo === "Peso normal";
  } else if (categoriaRiesgo === 3) {
    return objPersona.riesgo === "Sobre peso";
  } else if (categoriaRiesgo === 4) {
    return objPersona.riesgo === "Obesidad";
  }
}

/* TODO 
1. Filtrar segun categoria de BMI especificada por el usuario
2. Filtrar segun Sexo
3. Eliminar persona
*/

//Inicio del programa
let ciclo;
alert("Bienvenido al Dashboard Fitness, los resultados se mostrarán en la consola");
let personaArray = []; //Array de objetos Persona

do {
  agregarPersona();
  ciclo = prompt("Para terminar de cargar personas y continuar, escriba Salir. Para seguir agregando, presione enter");
} while (ciclo != "Salir");

let opcion = prompt(
  "Pulse un numero para realizar una acción: \n 1: Agregar mas personas \n 2: Ver personas en alto riesgo por su BMI \n 3: Filtrar personas con un BMI \n 4: Salir"
);

while (opcion !== "4") { // Segundo bucle con los metodos de filtrado sobre el arreglo
  if (opcion === "1") {
    agregarPersona();
  } else if (opcion === "2") {
    let resultadoBusqueda = personaArray.filter(filtrarBMI); // Funcion filter que devuelve las personas con alto riesgo por su categoría BMI
    if (resultadoBusqueda.length == 0) { // Si el array está vacio, le informamos al usuario que la busqueda retornó vacia
      console.log ("------------ Método Filter ------------");
      console.log ("No se encontraron personas");
    } else {
      console.log ("------------ Método Filter ------------");
      console.log("Las personas con su BMI en situación critica son: ");
      resultadoBusqueda.forEach(personaNueva => personaNueva.getNombre()); 
    }
  } else if (opcion === "3"){
    let categoriaRiesgo = parseInt(prompt("Ingrese la categoria de BMI por la cual quiere filtrar a las personas registradas 1: Bajo Peso, 2: Peso Normal, 3: Sobre Peso, 4: Obesidad"));
    let resultadoBusqueda2 = personaArray.filter(function(objPersona) { // Funcion filter que devuelve las personas con la categoría de BMI especificada por el usuario
      return filtrarPorRiesgo(objPersona, categoriaRiesgo);
    });
    if (resultadoBusqueda2.length == 0) { 
      console.log ("------------ Método Filter Por Categoria ------------");
      console.log ("No se encontraron personas");
    } else {
      console.log ("------------ Método Filter Por Categoria ------------");
      console.log("Las personas con el BMI solicitado son: ");
      resultadoBusqueda2.forEach(personaNueva => personaNueva.getNombre()); 
    }
  } else if (opcion === "4") {
    opcion = "4";
  }
  opcion = prompt (
    "Pulse un numero para realizar una acción: \n 1: Agregar mas personas \n 2: Ver personas en alto riesgo por su BMI \n 3: Filtrar personas con un BMI \n 4: Salir"
  )

}

