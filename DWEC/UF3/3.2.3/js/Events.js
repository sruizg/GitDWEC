/*Capturas y gestión de eventos*/
var EVENTS = (function() {
    
    /*Funcion que activa los eventos de la web*/
    function listener(){
        $("div.recuadroNumeros > div").on("click", MASTERUI.publicCambiarColorCirculo);
        $("#jugar").on("click",MASTERUI.publicCrearTirada);
        $("#atajo").on("keyup",{id :"atajo"} ,MASTER.publicValidarAtajo);
        $("#masterMind").on("click",CONFIG.publicCambiarModoDebug);
        $("#nivel").on("keyup",{id :"nivel"},MASTER.publicValidarNivel);
        alCerrarVentana();
    }
    
    //Controla el evento al cerrar la ventana del navegador
    function alCerrarVentana(){
        window.onbeforeunload=function(){
            UTILS.publicSaveLocalStorage("tiradas",MASTERUI.publicGetTiradas());
            CONFIG.publicAñadirTextoDebug("Usuario quiere cerrar la ventana. Tiradas guardadas: " + MASTERUI.publicGetTiradas());
            return "Se guardará el número de tiradas de la última partida.";
        };
    }
    
    return{
        publicEventListener: listener
    }
}());