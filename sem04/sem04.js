var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usuarios = []

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('disconnect', function(){
        console.log("usuario desconectado");
        io.emit('desconectado',{usuario : socket.username});
    });
    socket.on('mensaje', function(datos){

        if(datos.usuario !== socket.username){
            console.log('message: ' + socket.username);
            io.emit('mensaje', {usuario : socket.username, msj : datos.msj});
        }

    });
    socket.on('cambiar_nombre',function(datos){
        console.log('se ha cambiado el nombre a ${datos.usuario}');
        socket.username = datos.usuario;
    });
    socket.on('conectado',function () {
        io.emit('conectado',{usuario: socket.username});
        console.log(socket.username + ' se ha conectado');
    });
    socket.on('anyadir_usuario',function(datos){
        console.log('se ha cambiado el nombre a ${datos.usuario}');
        socket.username = datos.usuario;
        usuarios.push(datos.usuario);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

