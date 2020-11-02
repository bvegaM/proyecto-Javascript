const celeste = document.getElementById('celeste');
const rojo = document.getElementById('rojo');
const naranja = document.getElementById('naranja');
const amarillo = document.getElementById('amarillo');
const btnEmpezar = document.getElementById('btnEmpezar');

class Juego {
    constructor() {
        this.inicializar();
        this.generarSecuencia();
        this.siguienteNivel();
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

    siguienteNivel(){
        this.iluminarSecuencia();
    }

    transformarNumeroAColor(num){
        switch(num){
            case 0:
                return `celeste`
            case 1:
                return `rojo`;
            case 2:
                return `naranja`;
            case 3:
                return `amarillo`;
        }
    }

    iluminarSecuencia(){
        for(var i=0; i < this.nivel;i++){
            let color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(()=>this.iluminarColor(color),1000*i);
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light');
        setTimeout(()=> this.apagarColor(color),350);
    }

    apagarColor(color){
        this.colores[color].classList.remove('light');
    }
}
function empezarJuego() {
    window.juego = new Juego();
}