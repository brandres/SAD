var zmq = require('zeromq');
var req = zmq.socket('req');

exports.Start = function (host, port, cb) {
	req.connect('tcp://' + host + ':' + port, function() {
		console.log('Connected to: ' + host + ':' + port);
		if (cb != null) cb();
	});
}


var callbacks = {} // hash of callbacks. Key is invoId
var invoCounter = 0; // current invocation number is key to access "callbacks".

//
// When data comes from server. It is a reply from our previous request
// extract the reply, find the callback, and call it.
// Its useful to study "exports" functions before studying this one.
//
req.on ('message', function (data) {
	console.log ('data comes in: ' + data);
	var reply = JSON.parse (data.toString());
	switch (reply.what) {
		// TODO complete list of commands
		case 'get private message list':
			console.log ('We received a reply for: ' + reply.what + ':' + reply.invoId);
			callbacks [reply.invoId] (reply.obj);
			delete callbacks [reply.invoId];
			break;
		case 'get public message list':
			console.log ('We received a reply for: ' + reply.what + ':' + reply.invoId);
			callbacks [reply.invoId] (reply.obj);
			delete callbacks [reply.invoId];
			break;
		case 'get subject list':
			console.log ('We received a reply for: ' + reply.what + ':' + reply.invoId);
			callbacks [reply.invoId] (reply.obj);
			delete callbacks [reply.invoId];
			break;
		case 'add private message':
			console.log ('We received a reply for add command');
			callbacks [reply.invoId] (); // call the stored callback, no arguments
			delete callbacks [reply.invoId];
			break;
		case 'add public message':
			console.log ('We received a reply for add command');
			callbacks [reply.invoId] (); // call the stored callback, no arguments
			delete callbacks [reply.invoId]; // remove from hash
			break;
		case 'new user':
			console.log ('We received a reply for: ' + reply.what + ':' + reply.invoId);
			callbacks [reply.invoId] (reply.obj);
			delete callbacks [reply.invoId]; // remove from hash
			break;
		case 'new subject':
			console.log ('We received a reply for: ' + reply.what + ':' + reply.invoId);
			callbacks [reply.invoId] (reply.obj);
			delete callbacks [reply.invoId]; // remove from hash
			break;
		case 'get user list':
			console.log ('We received a reply for: ' + reply.what + ':' + reply.invoId);
			callbacks [reply.invoId] (reply.obj);
			delete callbacks [reply.invoId];
			break;
		case 'login':
			console.log ('We received a reply for: ' + reply.what + ':' + reply.invoId);
			callbacks [reply.invoId] (reply.obj);
			delete callbacks [reply.invoId];
			break;
		case 'get subject':
			console.log ('We received a reply for: ' + reply.what + ':' + reply.invoId);
			callbacks [reply.invoId] (reply.obj);
			delete callbacks [reply.invoId];
			break;
		default:
			console.log ("Panic: we got this: " + reply.what);
	}
});


//
// on each invocation we store the command to execute (what) and the invocation Id (invoId)
// InvoId is used to execute the proper callback when reply comes back.
//
function Invo (str, cb) {
	this.what = str;
	this.invoId = ++invoCounter;
	callbacks[invoCounter] = cb;
}

//
//
// Exported functions as 'dm'
//
//

exports.getPublicMessageList = function  (sbj, cb) {
	var invo = new Invo ('get public message list', cb);
	invo.sbj = sbj;
	req.send(JSON.stringify(invo));
}

exports.getPrivateMessageList = function (u1, u2, cb) {
	var invo = new Invo ('get private message list', cb);
	invo.u1 = u1;
	invo.u2 = u2;
	req.send(JSON.stringify(invo));
}

exports.getSubjectList = function (cb) {
	req.send(JSON.stringify(new Invo ('get subject list', cb)));
}

//Funcionalidades que faltan

exports.addUser = function (u,p, cb) {
	var invo = new Invo ('new user', cb);
	invo.u = u;
	invo.p = p;
	req.send(JSON.stringify(invo));
}

// Adds a new subject to subject list. Returns -1 if already exists, id on success
exports.addSubject = function (s, cb) {
	var invo = new Invo ('new subject', cb);
	invo.s = s;
	req.send (JSON.stringify(invo));
}

exports.getUserList = function (cb) {
	req.send (JSON.stringify(new Invo ('get user list', cb)));
}

// Tests if credentials are valid, returns true on success
exports.login = function (u, p, cb) {
	var invo = new Invo ('login', cb);
	invo.u = u;
	invo.p = p;
	req.send (JSON.stringify(invo));
}

exports.addPrivateMessage = function (msg, cb){
	var invo = new Invo ('add private message', cb);
	invo.msg = msg;
	req.send(JSON.stringify(invo));
}

function getSubject (sbj, cb) {
	var invo = new Invo ('get subject', cb);
	invo.sbj = sbj;
	req.send (JSON.stringify(invo));
}

// adds a public message to storage
exports.addPublicMessage = function (msg, cb)
{
	var invo = new Invo ('add public message', cb);
	invo.msg = msg;
	req.send (JSON.stringify(invo));
}


