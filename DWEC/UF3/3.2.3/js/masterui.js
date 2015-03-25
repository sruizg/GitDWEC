/*Funciones que crean, editan o modifican items de la web*/
var MASTERUI = ( function () {
    /*Variables globales de módulo*/
    var jugadas = 1;
    var circulosUsuario = [];
    var tiradas = 5;
    var nivel = 1;
    
    /*Get tiradas*/
    function getTiradas(){
        return tiradas;
    }
    /*Set tiradas*/
    function setTiradas(valor){
        tiradas = valor;
    }
    
    /* Crea un slider con su valor*/
    function slider() {
        $( "#slider" ).slider({
            range: "max",
            min: 1,
            max: 10,
            value: tiradas,
            slide: function( event, ui ) {
                $( "#amount" ).html( ui.value );
            }
        });
        $( "#amount" ).html( $( "#slider" ).slider( "value" ) );
      }
    
    /*Cambia el color del circulo según el clic atrapado en el evento*/
    function cambiarColorCirculo(event){
        //event: Tiene como valor el retorno del evento onClic (http://www.w3schools.com/jsref/dom_obj_event.asp)
        //event.currentTarget: Tiene como valor el div donde se ha hecho clic (click: evento que recojemos(Events.js) div: lo definimos en Events.js para que se dispare)
        //https://api.jquery.com/event.currentTarget/
        
        //Obtenemos el div donde se encuentra el circulo que corresponde a su botonera
        var circuloTarget = $(event.currentTarget).parents("div.column").children("div.circulo");
        
        //Eliminamos el color que tiene aplicado (lo guardamos en atributo color)
        circuloTarget.removeClass(circuloTarget.attr("color"));
        
        //Cambiamos el atributo color con el seleccionado
        circuloTarget.attr("color", $(event.currentTarget).attr("color"))
        
        //Añadimos el color del div que se ha hecho clic
        circuloTarget.addClass(circuloTarget.attr("color"));
    }
    
    /*Cambia el color del circulo según el contenido de una cadena (Atajo)*/
    function cambiarColorCirculoAtajo(cadena) {
        //Cambiamos el color por cada caracter de la cadena
        for (var i=0; i<cadena.length; i++){
            var caracter = cadena[i];
            var color = "";
            
            //Asigamos color según número
            switch (caracter){
                case "1":
                    color="I";
                    break;
                case "2":
                    color="II";
                    break;
                case "3":
                    color="III";
                    break;
                case "4":
                    color="IV";
                    break;
                case "5":
                    color="V";
                    break;
                case "6":
                    color="VI";
                    break;
                default:
                    color="no";
                    break;
            }
            //Eliminamos el color que tiene aplicado (lo guardamos en atributo color)
            $("#circulo"+i).removeClass($("#circulo"+i).attr("color"));
            
            //Cambiamos el atributo color con el seleccionado
            $("#circulo"+i).attr("color", color);
            
            //Añadimos el color del div que se ha hecho clic
            $("#circulo"+i).addClass(color);
        }
        crearTirada();
    }
    
    /*Crea una tirada que muestra en la web con los colores seleccionados en los circulos selectores*/
    function crearTirada(event){
        
        //Numero de tiradas que tiene el juego actual
        tiradas = $("#amount").html();
        //Nivel del juego
        nivel = $("#nivel").val();
        //Si le quedan tiradas sigue jugando
        if ((jugadas <= tiradas) && (jugadas != 0)){
            
            var cadena;
            $("#slider").slider("disable");
            $("#nivel").prop('disabled', true);
            $("#jugar").html("Dame pistas");
            $("#textoIntentosRestantes").html("Número restante de intentos: " + (tiradas - jugadas));
            
            //Guardar en un array los colores que ha puesto el jugador en sus circulos
            $(".circulo.usuario").each(function(color) {
                for (i = 0; i < MASTER.publicVarNumCirculos; i++) {
                circulosUsuario[color] = $(this).attr("color");
                }
            });
             
            //Comparar lo que ha introducido el usuario con la solucion
            var pistas = MASTER.publicDarPistas(circulosUsuario,nivel);
            
            //Montamos la cadena dependiendo de los circulos en juego con el div que contiene los circulos del usuario, el intento y los circulos que validan
            cadena =    '<div class="row clearfix recuadroGeneral">'
            cadena +=       '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 column">'
            cadena +=           '<div class="row clearfix">'
            for (i = 0; i < MASTER.publicVarNumCirculos; i++) {
                cadena +=           '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 column"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 column circulo '+ circulosUsuario[i] +'"></div></div>'
            }
            cadena +=           '<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 column recuadroNumJugadas2">' + jugadas +'</div>'
            for (i = 0; i < MASTER.publicVarNumCirculos; i++) {
                cadena +=           '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 column"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 column circulo '+ pistas[i] +'"></div></div>'
            }
            cadena +=           '</div>'
            cadena +=       '</div>'
            cadena +=   '</div>'
            
            $("jugadas").prepend(cadena);
            jugadas++;
            $(".recuadroNumJugadas").html(jugadas);
            //Si era la última tirada le avisa si ha ganado o perdido definitivamente y permite reiniciar la partida
            //Sirve para poder hacer una "pausa" para ver tus jugadas antes de comezar el juego de nuevo
            if (jugadas > tiradas) {
                jugadas = 0;
                //cambiar textos
                $("#jugar").html("Reiniciar");
                $(".recuadroNumJugadas").html(jugadas);
                comprobarGanador();
                CONFIG.publicAñadirTextoDebug("Fin del Juego");
            }
            //Revisa en una tirada normal si ha ganado
            else{
                comprobarGanador();
            }
        }
        //Si no le quedan tiradas reinicia la interfaz
        else {
            //Este paso es para reiniciar la solucion del MASTER
            MASTER.publicDarPistas(circulosUsuario,nivel);
            reiniciarUI();
        }
    }
    
    function comprobarGanador() {
        var ganador = MASTER.publicVarGanador();
        if (ganador == true){
            sweetAlert("¡Has Ganado!", "¡Felicidades!", "success");
            $("#jugar").html("Reiniciar");
            jugadas=0;
            $(".recuadroNumJugadas").html(jugadas);
        }
        else if (jugadas == 0){
            sweetAlert("Has Perdido...", "Lástima...", "error");
        }
    }
    
    /* Reinicia la Interficie para volver a jugar una partida*/
    function reiniciarUI() {
        jugadas = 1;
        $("jugadas").html("");
        $(".recuadroNumJugadas").html(jugadas);
        $(".recuadroNumJugadas2").html(jugadas);
        $( "#slider" ).slider("enable");
        $("#nivel").prop('disabled', false);
        $("#jugar").html("Empezar a jugar");
        $("#textoIntentosRestantes").html("");
        $("#atajo").val("");
        //reiniciar circulos usuario
        for (i = 0; i < MASTER.publicVarNumCirculos; i++) {
            $("#circulo"+i).removeClass($("#circulo"+i).attr("color"));
            $("#circulo"+i).removeAttr("color");
            $("#circulo"+i).attr("color", "no");
            $("#circulo"+i).addClass("no");
        }
        CONFIG.publicAñadirTextoDebug("Se ha reiniciado la UI");
    }
    
    return{
        //Variables publicas
        publicVarCirculosUsuario: circulosUsuario,
        publicVarJugadas: function(x) { return jugadas},
        
        //Métodos públicos
        publicSlider: slider,
        publicCambiarColorCirculo: cambiarColorCirculo,
        publicCambiarColorCirculoAtajo: cambiarColorCirculoAtajo,
        publicCrearTirada : crearTirada,
        publicSetTiradas: setTiradas,
        publicGetTiradas: getTiradas
    } 
}()); 