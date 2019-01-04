var net = require('net');

var HOST = '127.0.0.1';
var PORT = 9000;

var client = new net.Socket();

client.connect(PORT, HOST, function () {
	console.log('CONNECTED TO: ' + HOST + ':' + PORT);

});
client.on('data', function (data) {
	var datos = JSON.parse(data);
	for (var e of datos) {
		console.log(e);
	}
});

// Add a 'close' event handler for the client socket
client.on('close', function () {
	console.log('Connection closed');
});
// true on success
exports.addUser = async function (u,p) {
	var params = {request:'anyadirUsuario',usuario:u,pass:p};
	var response = await request(params);
	console.log(response);
	return response;
}

// Adds a new subject to subject list. Returns -1 if already exists, id on success
exports.addSubject = async function (s) {
	var params = {request:'anyadirTema',subject:s};
	var response = await request(params);
	console.log(response);
	return response;
}

exports.getSubjectList = async function () {
	var params = {request: 'getTemas'};
	var response = await request(params);
	console.log(response);
	return response;

}
exports.getUserList = async function () {
	var params = {request: 'getListaUsuarios'};
	var response = await request(params);
	return response;
}

// Tests if credentials are valid, returns true on success
exports.login = async function (u, p) {
	var params = {request:'login',usuario:u,pass:p};
	var response = await request(params);
	console.log(response);
	return (response === 'true');

}

// TODO: PRIVATE MESSAGES
//exports.addPrivateMessage = function (msg){}
//exports.getPrivateMessageList = function (u1, u2) {}



// adds a public message to storage
exports.addPublicMessage = function (msg)
{
	var params = {request:'anyadirMensajePublico',messageData:msg};
	client.write(JSON.stringify(params));
}

exports.getPublicMessageList = async function (sbj) {
	var params = {request: 'getListaMensajes',subject: sbj};
	var response = await request(params);
	console.log(response);
	return response;
}

function request(params){
	return new Promise(function(resolve){
		var clientReq = new net.Socket();
		var res = null;
		clientReq.connect(PORT, HOST, function () {
			console.log('conectado a ' + HOST + ':' + PORT + ' peticion: ' + params.request);
		});
		clientReq.write(JSON.stringify(params));
		clientReq.on('data', function (data) {
			res = JSON.parse(data);
			clientReq.end();
			resolve(JSON.stringify(res));
		});
	})

}