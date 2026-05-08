/* let resultado = document.getElementById("resultado")
let botones = document.getElementsByTagName("button")
for (const key in botones) {
    if (Object.prototype.hasOwnProperty.call(botones,key)){
        const boton = botones[key];
        if (boton.className != "operadores")
            boton.addEventListener("click", pintar)
        else
            boton.addEventListener("click", pintar2)
    //console.log(boton)
    }
}

function pintar(e){
    console.log(e.target.innerText)
    resultado.value += e.target.innerText
}

let operadores = document.getElementsByClassName("operadores")
for (const key in operadores) {
    if (Object.prototype.hasOwnProperty.call(operadores,key)){
        const boton = operadores[key];
        boton.addEventListener("click", pintar2)
        console.log(boton)
    }
}

function pintar2(e){
    console.log(e.target.innerText)
    if(e.target.innerText == "+")
        suma()
}

let prm1

function suma(){
    prm1 = resultado.value
    resultado.value = ""
}

function igual(){
    prm2 = resultado.value
    resultado.value = parseInt(prm1) + parseInt(prm2)
}*/

let resultado = document.getElementById("resultado");
let botones = document.querySelectorAll("button");

let prm1 = 0;
let operacion = "";

botones.forEach(boton => {
    boton.addEventListener("click", (e) => {
        const valor = e.target.innerText;

        // Si es un número 
        if (!e.target.classList.contains("operador")) {
            resultado.value += valor;
        } 
        // Si es un operador (+, -, *, /, Ce, =)
        else {
            gestionarOperador(valor);
        }
    });
});

function gestionarOperador(op) {
    if (op === "Ce") {
        // Limpiar todo
        resultado.value = "";
        prm1 = 0;
        operacion = "";
    } 
    else if (op === "=") {
        // Realizar la cuenta final
        if (operacion !== "") {
            let prm2 = resultado.value;
            resultado.value = calcular(prm1, prm2, operacion);
            operacion = ""; // Resetear operación tras el resultado
        }
    } 
    else {
        // Guardar el primer número y el operador, luego limpiar pantalla
        if (resultado.value !== "") {
            prm1 = resultado.value;
            operacion = op;
            resultado.value = "";
        }
    }
}

function calcular(n1, n2, op) {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);

    // Si no son números válidos, devolver 0 o el segundo número
    if (isNaN(num1) || isNaN(num2)) return n2;

    switch (op) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - n2;
        case "*":
            return num1 * num2;
        case "/":
            // Evitar la división por cero
            return num2 !== 0 ? num1 / num2 : "Error";
        default:
            return n2;
    }
}