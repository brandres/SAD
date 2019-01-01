var gestCarr = require('./gestionCarrito.js');
var gestDB = require('./gestionDB.js');
var mgdb=require('mongodb');
var assert = require('assert');
var http = require('http');
var urlm = require('url');
var mongoclient = mgdb.MongoClient;

var url='mongodb://localhost:8100/almacen'

function anyadirProd(producto){
    mongoclient.connect(url,function (err,db) {
        assert.equal(err,null);
        console.log('conectado');
        gestDB.comprobarStock(db,producto,function(hayStock){
            if(hayStock){
                gestCarr.anyadir(producto);
            }else{
                console.log('noquedahulio');
            }
        })
    });
}
function eliminarProd(producto){
    gestCarr.eliminar(producto);
}

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var q = urlm.parse(req.url, true).query;
    var tipoAccion = q.tipo;
    switch (tipoAccion) {
        case '1':
            anyadirProd({cod: Number(q.cod), cantidad: Number(q.cantidad)});
            res.end('se ha intentado anyadir');
            break;
        case '2':
            eliminarProd({cod: Number(q.cod),cantidad:Number(q.cantidad)});
            res.end('se ha eliminado');
            break;
    }


}).listen(8080);