/* 
Fitness dashboard. Este programa es un dashboard que permite al usuario hacer seguimiento de su rutina de ejercicio y medidas antropométricas.

La app recolectará información del usuario para construir un perfil del mismo. Se solicitará peso, altura, edad, de esta forma determinaremos el índice de masa corporal y su TDEE (gasto energético diario). También solicitaremos el ancho de su cintura en centímetros para saber si el usuario excede los limites recomendados según la OMS.

El programa también permitirá hacer seguimiento del progreso del usuario en los ejercicios básicos de entrenamiento de fuerza (sentadilla, press de banca y peso muerto).
La app permitirá registrar ejercicios por su nombre, la rutina a realizar, y los sets completados de dicho ejercicio, incluyendo las repeticiones y kilos realizados. 

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

  getNombre() { //Método que devuelve sólo el nombre de la persona
    console.log(this.nombre);
}
  
}

class Entrenamiento {

}

function pedirDatos () { //Funcion que solicita y valida los datos que ingresa el usuario
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
      // Sexo en el rango correcto
      break;
    } else {
      alert("Por favor ingrese nuevamente su sexo");
    }
  }
  return {
    nombre: nombre,
    edad: edad,
    altura: altura,
    peso: peso,
    sexo: sexo
  };
}

function agregarPersona() { //Funcion que pide los datos y los agrega al array de personas
  let datosPersona = pedirDatos(); 
  let personaNueva = new Persona (datosPersona.nombre, datosPersona.edad, datosPersona.altura, datosPersona.peso, datosPersona.sexo);
  calcularPersona(personaNueva);
  personaArray.push(personaNueva);
  personaNueva.getDatos();
}

function calcularPersona (personaNueva) { //Esta funcion recibe los datos ingresados por el usuario para calcular la info requerida
  personaNueva.bmi = personaNueva.masaCorporal();
  personaNueva.riesgo = personaNueva.riesgoBMI();
  personaNueva.tdee = personaNueva.calcularCalorias();
}

function filtrarBMI (objPersona) { //Funcion de búsqueda de personas en riesgo por su categoria BMI
  
  return objPersona.riesgo === "Bajo peso" || objPersona.riesgo === "Obesidad";
  
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
  "Pulse un numero para realizar una acción: \n 1: Agregar mas personas \n 2: Ver personas en alto riesgo por su BMI \n 3: Salir "
);

while (opcion !== "3") { // Segundo bucle con los metodos de filtrado sobre el arreglo
  if (opcion === "1") {
    agregarPersona();
  } else if (opcion === "2") {
    let resultadoBusqueda = personaArray.filter(filtrarBMI);
    if (resultadoBusqueda.length == 0) { //Si el array está vacío (no hay personas en riesgo alto)
      console.log ("------------ Método Filter ------------");
      console.log ("No se encontraron personas");
    } else {
      console.log ("------------ Método Filter ------------");
      console.log("Las personas con su BMI en situación critica son: ");
      resultadoBusqueda.forEach(personaNueva => personaNueva.getNombre()); 
    }
  } else if (opcion === "3") {
    opcion = "3";
  }
  opcion = prompt (
    "Vuelva a pulsar un número: \n 1: Agregar mas personas \n 2: Ver personas en alto riesgo por su BMI \n 3: Salir "
  )

}

