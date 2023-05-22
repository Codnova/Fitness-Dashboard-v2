/* 
Fitness dashboard. Este programa es un dashboard que permite al usuario hacer seguimiento de su rutina de ejercicio y medidas antropométricas.

La app recolectará información del usuario para construir un perfil del mismo. Se solicitará peso, altura, edad, de esta forma determinaremos el índice de masa corporal y su TDEE (gasto energético diario). También solicitaremos el ancho de su cintura en centímetros para saber si el usuario excede los limites recomendados según la OMS.

El programa también permitirá hacer seguimiento del progreso del usuario en los ejercicios básicos de entrenamiento de fuerza (sentadilla, press de banca y peso muerto).
La app permitirá registrar ejercicios por su nombre, la rutina a realizar, y los sets completados de dicho ejercicio, incluyendo las repeticiones y kilos realizados. 

[Sentadilla [18 Abril, 2022, 4x5 @ RPE 9, ], Banca, Despegue]


*/

/*
function masaCorporal (altura, peso) { //Esta función retorna el indice de masa corporal
  return (peso / (altura * altura)); 
}

function riesgoBMI (bmi) { //Esta funcion retorna un string con la categoría del indice de masa corporal
  if (bmi <= 18.4) {
    return "Bajo peso";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Peso normal";
  } else if (bmi >= 25 && bmi <= 39.9 ) {
    return "Sobre peso";
  } else {
    return "Obesidad";
  }
}

//TODO Agregar funcion para calcular TDEE, y riesgo adicional basado en la cintura

function calcularCalorias (sexo, edad, peso, altura) { // esta funcion retorna el TDEE o gasto energético diario
  if (sexo === "F") {
    return (447.593 + (9.247 * peso) + (3.098 * (altura*100)) - (4.330 * edad));
  } else {
    return (88.362 + (13.397 * peso) + (4.799 * (altura*100)) - (5.677 * edad));
  }
}

//Inicio del programa
let ciclo;
console.log("Bienvenido al Dashboard Fitness");

do {
  let nombre = prompt("Ingrese su nombre completo");
  let edad = parseInt(prompt("Ingrese su edad"));
  let altura = parseFloat(prompt("Ingrese su altura en metros (por ejemplo: 1.75)"));
  let peso = parseInt(prompt("Ingrese su peso en kilos"));
  let sexo = prompt("Ingrese M si su sexo es masculino o F si es femenino");
  
  let bmi = masaCorporal(altura, peso); //Calculamos BMI
  let calorias = calcularCalorias(sexo, edad, peso, altura); //Calculamos TDEE

  console.log("Gracias por ingresar sus datos, aquí están sus resultados señor/señora: ", nombre);
  console.log("Su indice de masa corporal (BMI/IMC) es: ", bmi + ". " + "Su categoría de BMI es:", riesgoBMI(bmi) + ".");
  console.log("Su TDEE o gasto energético diario en kilocalorias es: ", calorias);
  console.log("-------------------------%---------------------------------------");
  ciclo = prompt("Para salir del sistema escriba Salir, para calcular los valores de nuevo, presione enter");

} while (ciclo != "Salir");

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
      this.ejercicios = []; //Array de objetos ejercicio que almacena los entrenamientos del usuario
      
  }

  masaCorporal () { //este método retorna el indice de masa corporal
      return (this.peso / (this.altura * this.altura)); 
  }

  riesgoBMI () { //este método retorna un string con la categoría del indice de masa corporal
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

  calcularCalorias () { // este método retorna el TDEE o gasto energético diario
      if (this.sexo === "F") {
        return (447.593 + (9.247 * this.peso) + (3.098 * (this.altura*100)) - (4.330 * this.edad));
      } else {
        return (88.362 + (13.397 * this.peso) + (4.799 * (this.altura*100)) - (5.677 * this.edad));
      }
  }
  
  getDatos() {
      console.log("------------ Datos de la persona -------------");
      console.log("Nombre: ", this.nombre);
      console.log("Edad: ", this.edad);
      console.log("Altura: ", this.altura);
      console.log("Peso: ", this.peso);
      console.log("Sexo: ", this.sexo);
      console.log("Indice de masa corporal (BMI/IMC): ", this.bmi);
      console.log("Su categoria BMI es: ", this.riesgo);
      console.log("Su gasto energético total diario (TDEE): ", this.tdee);
  }
  
}

class Ejercicio {

}

/* Ejemplo de uso del método find() 
function buscarPersona (objPersona) {
  
  return objPersona.bmi >= 30;

}

let resultadoBusqueda = personaArray.find(buscarPersona);
if (resultadoBusqueda == undefined) {
  console.log ("Busqueda de BMI no encontró nada");
} else {
  console.log("La primera persona con el BMI mayor a 30 es: ", resultadoBusqueda.nombre + " Y su BMI es: ", resultadoBusqueda.bmi);
}
*/

/* Ejemplo de uso del metodo filter()
function filtrarBMI (objPersona) {
  
return objPersona.riesgo === "Bajo peso" || objPersona.riesgo === "Obesidad";

}
let resultadoBusqueda = personaArray.filter(filtrarBMI);
console.log("Las personas con el BMI en situación critica son: ", resultadoBusqueda);
*/


function calcularPersona (personaNueva) { //Esta funcion recibe los datos ingresados por el usuario para calcular la info requerida
  personaNueva.bmi = personaNueva.masaCorporal();
  personaNueva.riesgo = personaNueva.riesgoBMI();
  personaNueva.tdee = personaNueva.calcularCalorias();
}

//Inicio del programa
let ciclo;
console.log("Bienvenido al Dashboard Fitness");
let personaArray = []; //Array de objetos Persona

do {
  let nombre = prompt("Ingrese su nombre completo");
  let edad = parseInt(prompt("Ingrese su edad"));
  let altura = parseFloat(prompt("Ingrese su altura en metros (por ejemplo: 1.75)"));
  let peso = parseInt(prompt("Ingrese su peso en kilos"));
  let sexo = prompt("Ingrese M si su sexo es masculino o F si es femenino");
  let personaNueva = new Persona (nombre, edad, altura, peso, sexo);
  calcularPersona(personaNueva);
  personaArray.push(personaNueva);
  personaNueva.getDatos();
  
  ciclo = prompt("Para salir del sistema escriba Salir, para calcular los valores de nuevo, presione enter");

} while (ciclo != "Salir");


