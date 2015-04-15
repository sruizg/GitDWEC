/*Código principal e interno de la web*/
var MASTER = (function() {
    /*Variables globales de módulo*/
    var ganadorCirculo = false;
    var ganadorCuadrado = false;
    
    /*Inicio de la aplicación, ejecuta los métodos para empezar a usar el juego*/
    function iniciar(){
        $(document).ready(function() {
            UTILS.publicCheckBrowserSupport();
            cargarDatosLocalStorage();
            EVENTS.publicEventListener();
        });
    }
    
    /*Carga los datos guardados en Storage*/
    function cargarDatosLocalStorage(){
        //Aqui cargar el estado del juego si es que lo hay
        MASTERUI.publicSetJugadas(UTILS.publicLoadLocalStorage("jugadas"));
        var figuras = [];
        figuras = UTILS.publicLoadLocalStorage("figuras");
        if (figuras != null){
            MASTERUI.publicCargarCeldas(figuras);
            console.log("Figuras cargadas");
        }
    }
    
    /*Comrpueba si es ganador*/
    function esGanador(){
        var ganador= "";
        var a1 = ["figura0","figura1","figura2"];
        //var a2 = ["figura3","figura4","figura5"];
        //var a3 = ["figura6","figura7","figura8"];
        //var a4 = [], a5 = [], a6 = [], a7 = [], a8 = [];
        
        var arrays = [a1]
        for (i = 0; i < arrays.length; i++){
            if(($(arrays[i][0]).attr("circulo")) && ($(arrays[i][1]).attr("circulo")) && ($(arrays[i][2]).attr("circulo"))){
                ganadorCirculo = true;
            }
            else if(($(arrays[i][0]).attr("cuadrado")) && ($(arrays[i][1]).attr("cuadrado")) && ($(arrays[i][2]).attr("cuadrado"))){
                ganadorCuadrado = true;
            }
        }
        if (ganadorCirculo)
        {
            ganador = "Circulo";
        }
        else if(ganadorCuadrado){
            ganador = "Cuadrado";
        }
        
        return ganador;
    }
    
    return{
        //Variables públicas
        //Métodos públicos
        publicIniciar: iniciar,
        publicEsGanador: esGanador
    }
}()); 