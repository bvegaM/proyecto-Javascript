const celeste = document.getElementById('celeste');
const rojo = document.getElementById('rojo');
const naranja = document.getElementById('naranja');
const amarillo = document.getElementById('amararillo');
const btnEmpezar = document.getElementById('btnEmpezar');

class Juego {
    constructor() {
        this.inicializar();
        this.generarSecuencia();
    }

    inicializar() {
        btnEmpezar.classList.add('hide');
        this.nivel = 1;
        this.colores ={
            celeste: celeste,
            rojo: rojo,
            naranja: naranja,
            amarillo: amarillo
        };
    }

    generarSecuencia(){
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random()*4));
    }
}
function empezarJuego() {
    window.juego = new Juego();
}