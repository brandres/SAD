

function pruebaSum(b){
    var hola = 0;
    return function(){
        hola += b;
        return hola;
    }
}

var hola = pruebaSum(10);

console.log(hola());

console.log(pruebaSum(2));
console.log(pruebaSum(2)());
console.log(pruebaSum(2)());


console.log(hola());
console.log(hola());
console.log(hola());
console.log('d');

