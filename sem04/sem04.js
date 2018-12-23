var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('Alguien se ha conectado');
    socket.username = 'anonimo';
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('mensaje', function(datos){
        console.log('message: ' + datos);
        io.emit('mensaje', {usuario : socket.username, msj : datos.msj});
    });
    socket.on('cambiar_nombre',function(datos){
        console.log('se ha cambiado el nombre a ${datos.usuario}');
        socket.username = datos.usuario;
    })
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

