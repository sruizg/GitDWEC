/*debug=true/false*/
var CONFIG = (function() {
    
    var debug  = false;
    
    /*Activar modo debug*/
    function activarModoDebug(){
        debug = true;
        document.body.classList.toggle("bodyMasterMind");
        montarUIDebug();
        console.log("UI Debug ON");
        añadirTextoDebug("YOU'RE MASTERMIND!",false);
        $("#masterMind").html("NO!");
    }
    
    /*Desactivar modo debug*/
    function desactivarModoDebug(){
        debug = false;
        document.body.classList.toggle("bodyMasterMind");
        $("debug").html("");
        console.log("UI Debug OFF");
        $("#masterMind").html("YES!");
    }
    
    /*Cambia de modo debug*/
    function cambiarModoDebug(){
        if (debug == true){
            desactivarModoDebug();
        }
        else{
            activarModoDebug();
        }
    }
    
    /*Monta el div que muestra para el usuario*/
    function montarUIDebug(){
        var cadena = "";
        cadena =    '<div class="row clearfix ajustarDiv recuadroDebug">'
        cadena +=       '<p><label>CONSOLA DEBUG</label></p>'
        cadena +=       '<dentroDebug></dentroDebug>'
        cadena +=   '</div>'
        $("debug").prepend(cadena);
    }
    
    /*Añade en el div de dentroDebug el texto pasado por parámetro*/
    function añadirTextoDebug(texto){
        var cadena = '<p>' + texto + '</p>';
        $("dentroDebug").prepend(cadena);
    }
    /*Añade en el div de dentroDebug los textos que contiene el array pasado por parámetro*/
    function añadirArrayTextoDebug(titulo,array){
        var cadena = '<p>' + titulo;
        for (i = 0; i < array.length; i++){
            cadena += array[i] + " "; 
        }
        cadena += '</p>';
        $("dentroDebug").prepend(cadena);
    }
    
    /*Añade en el div de dentroDebug los textos que contienen los array del array pasado por parámetro
    EL ARRAY DE TITULOS TIENE QUE COINCIDIR CON EL ARRAY EN LENGTH
    si hay un array de array que no es un array porque es texto solo, lo imprime*/
    function añadirArrayDeArrayTextoDebug(arrayTitulo,array){
        if (arrayTitulo.length == array.length)
        {
            var cadena = '<p>';
            for (i = 0; i < array.length; i++){
                cadena += arrayTitulo[i];
                var dentro = false;
                for (j = 0; j < array[i].length; j++){
                    cadena += array[i][j] + " ";
                    dentro = true;
                }
                //si el array del array es solo texto y no un array de textos
                if (dentro == false){
                    cadena += array[i];
                }
            }
            cadena += '</p>';
            $("dentroDebug").prepend(cadena);
        }
        else{
            console.log("Error en CONFIG línea 60: El arrayTitulo tiene que coincidir con el array en tamaño");
        }
    }
    
    return{
        //Variables públicas
        publicVarMasterMind : function(x) {return debug},
        
        //métodos públicos
        publicCambiarModoDebug: cambiarModoDebug,
        publicAñadirTextoDebug: añadirTextoDebug,
        publicAñadirArrayTextoDebug: añadirArrayTextoDebug,
        publicAñadirArrayDeArrayTextoDebug: añadirArrayDeArrayTextoDebug
    } 
}()); 