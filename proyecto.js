const celeste = document.getElementById('celeste');
const rojo = document.getElementById('rojo');
const naranja = document.getElementById('naranja');
const amarillo = document.getElementById('amarillo');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 10;

class Juego {
    constructor() {
        this.inicializar    = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia();
        setTimeout(()=>this.siguienteNivel(),500);        
    }

    inicializar() {
        
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.elegirColor    = this.elegirColor.bind(this);
        this.togleBtnEmpezar();
        this.nivel = 1;
        this.colores ={
            celeste: celeste,
            rojo: rojo,
            naranja: naranja,
            amarillo: amarillo
        };
    }

    togleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide');
        }else{
            btnEmpezar.classList.add('hide');
        }
    }

    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4));
    }

    siguienteNivel(){
        this.subnivel = 0;
        setTimeout(()=>this.iluminarSecuencia(),500);
        this.agregarEventosClick();
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

    transformarColorANumero(color){
        switch(color){
            case 'celeste':
                return 0
            case 'rojo':
                return 1;
            case 'naranja':
                return 2;
            case 'amarillo':
                return 3;
        }
    }

    iluminarSecuencia(){
        for(var i=0; i < this.nivel;i++){
            let color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(()=>this.iluminarColor(color),600*i);
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light');
        setTimeout(()=> this.apagarColor(color),350);
    }

    apagarColor(color){
        this.colores[color].classList.remove('light');
    }

    agregarEventosClick(){
        this.colores.celeste.addEventListener('click',this.elegirColor);
        this.colores.rojo.addEventListener('click',this.elegirColor);
        this.colores.naranja.addEventListener('click',this.elegirColor);
        this.colores.amarillo.addEventListener('click',this.elegirColor);
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click',this.elegirColor);
        this.colores.rojo.removeEventListener('click',this.elegirColor);
        this.colores.naranja.removeEventListener('click',this.elegirColor);
        this.colores.amarillo.removeEventListener('click',this.elegirColor); 
    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++;
            if(this.subnivel == this.nivel){
                this.nivel++;
                this.eliminarEventosClick();
                if(this.nivel == (ULTIMO_NIVEL+1)){
                    this.ganoElJuego();
                }else{
                    swal("Platzi", "Felicidades, pasaste el nivel", "info")
                    .then(this.siguienteNivel);
                }
            }
        }else{
            this.perdioElJuego()
        }
    }

    ganoElJuego(){
        swal("Platzi", "Felicitaciones, ganaste el juego", "success")
        .then(this.inicializar);
    }

    perdioElJuego(){
        swal("Platzi", "Lo lamentamos, perdiste el juego", "error")
        .then(()=>{
            this.eliminarEventosClick();
            this.inicializar;
        })
    }
}
function empezarJuego() {
    window.juego = new Juego();
}