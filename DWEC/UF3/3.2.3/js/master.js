var miCalculadora = (function () {
    //Atributos privados
    var operador1;
    var operador2;
    //Métodos privados
    function sumar(){
        return operador1 + operador2;
    }
    function restar(){
        return operador1 - operador2;
    }
    //Métodos públicos
    function operacionRandom(op1,op2){
        operador1 = op1;
        operador2 = op2;
        //aleatorio entre 0 - 1
        var num = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
        if (num == 0){
            var resultado = sumar();
        }
        else{
            var resultado = restar();
        }
        return resultado;
    }
    //Return
    return {
        operacionRandom: operacionRandom
    }
}());