/*Capturas y gestión de eventos*/
var EVENTS = (function() {
    
    /*Funcion que activa los eventos de la web*/
    function listener(){
        $(".celda").on("click", MASTERUI.publicCambiarFigura);
        //$("#jugar").on("click",MASTERUI.publicHabilitarCelda);
        alCerrarVentana();
    }
    
    //Controla el evento al cerrar la ventana del navegador
    function alCerrarVentana(){
        window.onbeforeunload=function(){
            CONFIG.publicAñadirTextoDebug("Usuario quiere cerrar la ventana.");
            var figuras = [];
            for (i = 0; i < 9; i++) {
                var figura = $("#figura"+i).attr("figura");
                figuras.push(figura);
            }
            UTILS.publicSaveLocalStorage("figuras",figuras);
            var jugadas = MASTERUI.publicGetJugadas;
            UTILS.publicSaveLocalStorage("jugadas",MASTERUI.publicGetJugadas);
            return "Se guardará el estado de la partida.";
        };
    }
    
    return{
        publicEventListener: listener
    }
}());