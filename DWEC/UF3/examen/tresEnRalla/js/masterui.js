/*Funciones que crean, editan o modifican items de la web*/
var MASTERUI = ( function () {
    /*Variables globales de módulo*/
    var jugadas = 0;
    
    function setJugadas(num){
        jugadas = num;
    }
    function getJugadas(){
        return jugadas;
    }
    /*Saber si un numero es par*/
    function numPar(numero) {
      if(numero % 2 == 0) {
        return true;
      }
      else {
        return false;
      }
    }
    
    /*Cambia el color del circulo según el clic atrapado en el evento*/
    function cambiarFigura(event){
        //event: Tiene como valor el retorno del evento onClic (http://www.w3schools.com/jsref/dom_obj_event.asp)
        //event.currentTarget: Tiene como valor el div donde se ha hecho clic (click: evento que recojemos(Events.js) div: lo definimos en Events.js para que se dispare)
        //https://api.jquery.com/event.currentTarget/
        
        $("#jugar").html("Jugando");
        //Obtenemos el div donde se encuentra el circulo que corresponde a su botonera
        //var circuloTarget = $(event.currentTarget).parents("div.column").children("div.circulo");
        if ((!$(event.currentTarget).hasClass("circulo")) && (!$(event.currentTarget).hasClass("cuadrado"))){
            if (numPar(jugadas)){
                $(event.currentTarget).addClass("circulo");
                $(event.currentTarget).attr("figura","circulo");
            }
            else{
                $(event.currentTarget).addClass("cuadrado");
                $(event.currentTarget).attr("figura","cuadrado");
            }
            jugadas++;
        }
        var ganador = MASTER.publicEsGanador();
        
        comprobarGanador(ganador);
    }
    
    function comprobarGanador(ganador) {
        if (ganador=="circulo"){
            sweetAlert("¡Circulo Ganador!", "¡Felicidades!", "success");
            reiniciarUI();
        }
        else if(ganador=="cuadrado"){
            sweetAlert("¡Cuadrado Ganador!", "¡Felicidades!", "success");
            reiniciarUI();
        }
        else if(jugadas>8){
            sweetAlert("EMPATE!", "Lástima...", "error");
            reiniciarUI();
        }
    }
    
    /* Reinicia la Interficie para volver a jugar una partida*/
    function reiniciarUI() {
        jugadas = 0;
        //$(".celda").prop('disabled', true);
        $("#jugar").html("Jugar");
        //reiniciar celdas
        for (i = 0; i < 9; i++) {
            $("#figura"+i).removeClass($("#figura"+i).attr("figura"));
            $("#figura"+i).removeAttr("figura");
            $("#figura"+i).attr("figura", "");
        }
        CONFIG.publicAñadirTextoDebug("Se ha reiniciado la UI");
    }
    
    function cargarCeldas(figuras){
        var arrayFiguras = figuras.split(",");
        for (i = 0; i < 9; i++) {
            $("#figura"+i).attr("figura", arrayFiguras[i]);
            $("#figura"+i).addClass(arrayFiguras[i]);
        }
    }
    
    return{
        //Variables publicas
        //Métodos públicos
        publicCambiarFigura: cambiarFigura,
        publicCargarCeldas: cargarCeldas,
        publicSetJugadas: setJugadas,
        publicGetJugadas: getJugadas
    } 
}()); 