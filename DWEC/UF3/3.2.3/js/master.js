/*Código principal e interno de la web*/
var MASTER = (function() {
    /*Variables globales de módulo*/
    var ganador = false;
    var solucion = [];
    var numCirculos = 5;
    
    /*Inicio de la aplicación, ejecuta los métodos para empezar a usar el juego*/
    function iniciar(){
        $(document).ready(function() {
            UTILS.publicCheckBrowserSupport();
            cargarDatosLocalStorage();
            MASTERUI.publicSlider();
            EVENTS.publicEventListener();
            crearSolucion();
        });
    }
    
    /*Carga los datos guardados en Storage*/
    function cargarDatosLocalStorage(){
        var tiradas = UTILS.publicLoadLocalStorage("tiradas");
        if (tiradas != null){
            MASTERUI.publicSetTiradas(tiradas);
            console.log("tiradas cargadas: " + tiradas);
        }
    }
    
    /*Creamos la combinacion secreta*/
    function crearSolucion() {
        solucion = [];
        for (i = 0; i < numCirculos; i++){
            var color = "";
            //Número aleatorio del 0 al 5
            var op = Math.floor(Math.random() * 6) + 0;
            
            switch (op){
                case 0:
                    color = "I";
                    break;
                case 1:
                    color = "II";
                    break;
                case 2:
                    color = "III";
                    break;
                case 3:
                    color = "IV";
                    break;
                case 4:
                    color = "V";
                    break;
                case 5:
                    color = "VI";
                    break;
            }
            solucion.push(color);
        }
    }
    
    /*Valida la solucion del usuario con la del sistema (nivel 1 = facil para usuario, nivel 2 = dificil)*/
    function darPistas(circulosUsuario,nivel) {
        var pistas = [];
        //comparar posicion correcta
        for (i=0; i < solucion.length; i++){
            if (circulosUsuario[i] == solucion[i]){
                pistas[i] = "ok";
            }
            else{
                pistas[i] = "no";
            }
        }
        //comparar si color de la bola existe (controla duplicados)
        pistas = compararColor(circulosUsuario,pistas);
        
        if (nivel == 2){
            pistas = compararColorNivel2(pistas);
        }
        
        //comprueba si ha ganado el juego
        ganador = comprobarGanador(pistas);
        
        //Debug
        var arrayTextos = ["- Solución: ","- Usuario: ","- Pistas: ","- Nivel: ","- EsGanador: "];
        var arrayDeArrays = [solucion,circulosUsuario,pistas,nivel,ganador];
        CONFIG.publicAñadirArrayDeArrayTextoDebug(arrayTextos,arrayDeArrays);
        return pistas;
    }
    
    /*Compara los colores del usuario con las pistas para darle las pistas fáciles*/
    function compararColor(circulosUsuario,pistas){
        //Inicializar variables
        var colorI = 0,colorII = 0,colorIII = 0,colorIV = 0,colorV = 0,colorVI = 0;
        //Sumar al contador de números los colores de la solución
        for (i=0; i < solucion.length; i++){
                switch (solucion[i]){
                    case "I":
                        colorI++;
                        break;
                    case "II":
                        colorII++;
                        break;
                    case "III":
                        colorIII++;
                        break;
                    case "IV":
                        colorIV++;
                        break;
                    case "V":
                        colorV++;
                        break;
                    case "VI":
                        colorVI++;
                        break;
                }
        }
        //restar los colores que coinciden en posición "ok"
        //los que no coinciden se marcan "ko" (si queda del color)
        //si no queda del color se marcan "no"
        for (i=0; i < pistas.length; i++){
            if (pistas[i] == "ok"){
                switch (solucion[i]){
                    case "I":
                        colorI--;
                        break;
                    case "II":
                        colorII--;
                        break;
                    case "III":
                        colorIII--;
                        break;
                    case "IV":
                        colorIV--;
                        break;
                    case "V":
                        colorV--;
                        break;
                    case "VI":
                        colorVI--;
                        break;
                }
            }
        }
        //for separado porque el primer for cuenta solo los ok
        //si cuenta los dos a la vez falla el calculo y no cuenta bien si ok está después de ko
        for (i=0; i < pistas.length; i++){
            if (pistas[i] != "ok"){
                switch (circulosUsuario[i]){
                    case "I":
                        if (colorI !=0){
                            colorI--;
                            pistas[i] = "ko";
                        }
                        else{
                            pistas[i] = "no";
                        }
                        break;
                    case "II":
                        if (colorII !=0){
                            colorII--;
                            pistas[i] = "ko";
                        }
                        else{
                            pistas[i] = "no";
                        }
                        break;
                    case "III":
                        if (colorIII !=0){
                            colorIII--;
                            pistas[i] = "ko";
                        }
                        else{
                            pistas[i] = "no";
                        }
                        break;
                    case "IV":
                        if (colorIV !=0){
                            colorIV--;
                            pistas[i] = "ko";
                        }
                        else{
                            pistas[i] = "no";
                        }
                        break;
                    case "V":
                        if (colorV !=0){
                            colorV--;
                            pistas[i] = "ko";
                        }
                        else{
                            pistas[i] = "no";
                        }
                        break;
                    case "VI":
                        if (colorVI !=0){
                            colorVI--;
                            pistas[i] = "ko";
                        }
                        else{
                            pistas[i] = "no";
                        }
                        break;
                }
            }
        }
        return pistas;
    }
    
    /*Reordena el array de pistas para darle más dificultad al usuario*/
    function compararColorNivel2(pistas){
        var tmpPistas = [];
        var oks = 0, kos = 0, nos = 0;
        //desglosa el array de pistas
        for (i=0; i < pistas.length; i++){
            if(pistas[i]== "ok"){
                oks ++;
            }else if(pistas[i]=="ko"){
                kos++;
            }
            else{
                nos++;
            }
        }
        //monta el array en orden
        for (i=0; i < pistas.length; i++){
            if(oks > 0){
                tmpPistas[i] = "ok";
                oks--;
            }else if(kos > 0){
                tmpPistas[i] = "ko";
                kos--;
            }
            else{
                tmpPistas[i] = "no";
                nos--;
            }
        }
        
        return tmpPistas;
    }
    
    /*Comprueba que las pistas estén a ok*/
    function comprobarGanador(pistas){
        ganador = false;
        var jugadas = MASTERUI.publicVarJugadas();
        var correctas = 0;
        for (i=0; i < pistas.length; i++){
            if(pistas[i] == "ok"){
                correctas++
            }
        }
        //reinicia la partida si ha ganado
        if (correctas == numCirculos){
            ganador = true;
            crearSolucion();
        }
        //reinicia la partida si ha perdido
        else if(jugadas == 0){
            crearSolucion();
        }
        return ganador;
    }
    
    /*Validamos el atajo. URL de ayuda: http://www.asquare.net/javascript/tests/KeyCode.html
    Regular Expresion:  http://www.w3schools.com/js/js_regexp.asp http://www.w3schools.com/jsref/jsref_obj_regexp.asp
    https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Obsolete_Pages/Gu%C3%ADa_JavaScript_1.5/Escribir_un_patr%C3%B3n_de_expresi%C3%B3n_regular*/
    function validarAtajo(event) {
        //Si se ha pulsado Enter
        if(event.keyCode == 13){
            var cadena = document.getElementById(event.data.id).value;
            
            //Para entrar la cadena tiene que ser númerica con numCirculos carácteres del 0 al 6
            if ((cadena == "") || (cadena.length < numCirculos) || !(/^[0-6]+$/.test(cadena))){
                sweetAlert("Atajo erroneo", "La cadena tiene que ser numérica del 0 al 6", "error");
            }
            else {
                MASTERUI.publicCambiarColorCirculoAtajo(cadena);
                CONFIG.publicAñadirTextoDebug("Jugada tirada por atajo");
            }
        }
    }
    /*Valida el input de nivel*/
    function validarNivel(event) {
        //Si se ha pulsado 1 o 2 o return
        if((event.keyCode == 49) || (event.keyCode == 50) || (event.keyCode == 8)){
        }
        else{
            var cadena = document.getElementById(event.data.id).value;
            //Para entrar la cadena tiene que ser númerica del 1 al 2
            if ((cadena == "") || (cadena.length < numCirculos) || !(/^[1-2]+$/.test(cadena))){
                sweetAlert("Nivel erroneo", "Los niveles implementados son 1 y 2", "error");
            }
            $("#nivel").val("1");
        }
    }
    
    return{
        //Variables públicas
        publicVarNumCirculos: numCirculos,
        publicVarGanador: function(x) { return ganador},
        
        //Métodos públicos
        publicIniciar: iniciar,
        publicValidarAtajo: validarAtajo,
        publicValidarNivel: validarNivel,
        publicDarPistas: darPistas
    }
}()); 