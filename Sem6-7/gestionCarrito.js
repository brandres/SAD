var carrito = {};

function anyadir(element) {
    if (existeEnCarrito(element)) {
        carrito[element.cod].cantidad += element.cantidad;
    } else {
        carrito[element.cod] = element;

    }
    console.log(carrito);
}

function eliminar(element) {
    if(existeEnCarrito(element)){
        if(carrito[element.cod].cantidad > element.cantidad){
            carrito[element.cod].cantidad -= element.cantidad;
        }else{
            delete carrito[element.cod];
        }
    }
    console.log(carrito);
}

function existeEnCarrito(element) {
    if (carrito[element.cod]) {
        console.log('true')
        return true;
    }
    return false;
}

function test() {
    var element1 = {
        cod: 1,
        cantidad: 2,
        descripcion: 'prueba1'
    }
    anyadir(element1);
    var element2 = {
        cod: 1,
        cantidad: 2,
        descripcion: 'prueba1'
    }
    anyadir(element2);
    var element3 = {
        cod: 2,
        cantidad: 2,
        descripcion: 'prueba2'
    }
    anyadir(element3);
    console.log(carrito);
}
function gestCarrito(){
    return carrito;
}
module.exports.anyadir = anyadir;
module.exports.eliminar = eliminar;
module.exports.test = test;
