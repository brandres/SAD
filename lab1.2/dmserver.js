var net = require('net');

var HOST = '127.0.0.1';
var PORT = 9000;

var subjects = {id0: 'Introduccion al foro', id1: 'Literatura', id2: 'Futbol'};
var users = {
    Foreador: '1234',
    mudito: '1234',
    troll: '1234',
    josocxe: '1234'
};
var publicMessages = {
    id0: [new Post('primer mensaje', 'Foreador', new Date()),
        new Post('SEGUNDO mensaje', 'Foreador', new Date())],
    id2: [new Post('primer mensaje futbolero', 'josocxe', new Date())]
};

function Message (msg, from, to, isPrivate, ts) {
    this.msg=msg; this.from=from; this.isPrivate=isPrivate; this.to=to; this.ts=ts;
}

function Post (msg, from, ts) {
    this.msg=msg; this.from=from; this.ts=ts;
}


server = net.createServer(function (sock) {

    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function (data) {
        console.log('DATA ' + sock.remoteAddress + ': ' +  JSON.parse(data));
        handleRequest(sock, JSON.parse(data));
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function (data) {
        console.log('Connection closed');
    });

});

server.listen(PORT, HOST);
console.log('Server listening on ' + HOST + ':' + PORT);

function handleRequest(sock, data) {
    var requestType = data.request;
    switch (requestType) {
        case 'anyadirUsuario':anyadirUsuario(data.usuario,data.pass);break;
        case 'anyadirTema': sock.write(anyadirTema(data.subject));break;
        case 'getTemas': sock.write(getTemasStrJSON());break;
        case 'getListaUsuarios': sock.write(getUserListStrJSON());break;
        case 'login': sock.write(login(data.usuario,data.pass));break;
        case 'getTema': sock.write(getTema(data.subject));break;
        case 'anyadirMensajePublico': anyadirMensajePublico(data.messageData);break;
        case 'getListaMensajes': sock.write(getMessageListStrJSON(data.subject));
    }
}

function anyadirUsuario(u,p){
    var lower = u.toLowerCase();
    var exists = false;
    for (var i in users) {
        if (i.toLowerCase() == lower) {exists = true; break;}
    }
    if (!exists) users.push({u:p});
    return !exists;
}

function anyadirTema(s){
    var lower = s.toLowerCase();
    for (var i in subjects) {
        if (subjects[i].toLowerCase() == lower) {return -1;}
    }
    var len = Object.keys(subjects).length;
    var idlen = 'id' + len;
    subjects [idlen] = s;
    return JSON.stringify(idlen);
}
function getTemasStrJSON(){
    return JSON.stringify(subjects);
}
function getUserListStrJSON(){
    var userlist = [];
    for (var i in users) userlist.push (i);
    return JSON.stringify (userlist);
}
function login(u,p){
    var lower = u.toLowerCase();
    for (var i in users) {
        if (i.toLowerCase() == lower) {return (users[u] == p).toString();}
    }
    return 'false'; // user not found
}
function getTema(sbj) {
    for (var i in subjects) {
        if (subjects[i] == sbj) return i;
    }
    return -1; // not found
}
function anyadirMensajePublico(msg){
    console.log(msg.to);
    console.log(subjects);
    var post = new Post (msg.msg, msg.from, msg.ts);
    var ml = publicMessages [msg.to];
    if (!ml) publicMessages [msg.to] = [];
    publicMessages[msg.to].push(msg);
}
function getMessageListStrJSON(sbj){
    return publicMessages[sbj] ? JSON.stringify(publicMessages[sbj]) : JSON.stringify([]);
}

