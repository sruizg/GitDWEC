/*Utilidades de la aplicación*/
var UTILS = (function() {
    
    var browserSupport = false;
    
    /*Comprobar que el navegador soporta localStorage*/
    function checkBrowserSupport(){
        if(typeof(Storage) !== "undefined") {
            browserSupport = true;
        }else{
            browserSupport = false;
        }
    }
    
    /*Guarda información en Storage pasando por prámetro clave y valor*/
    function saveLocalStorage(clave,valor){
        if(browserSupport){
            localStorage.setItem(clave, valor);
        }
    }
    
    /*Carga información de Storage y retorna el valor de la clave pasada por parámetro*/
    function loadLocalStorage(clave){
        if(browserSupport){
            return localStorage.getItem(clave);
        }
    }
    
    return{
        publicCheckBrowserSupport: checkBrowserSupport,
        publicSaveLocalStorage: saveLocalStorage,
        publicLoadLocalStorage: loadLocalStorage
    }
}());