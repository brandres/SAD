var net = require('net');
var HOST = '127.0.0.1';
var PORT = Number(process.argv[2]);

var dm = require ('./dm.js');

// Create the server socket, on client connections, bind event handlers
server = net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('Conected: ' + sock.remoteAddress + ':' + sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        console.log('request comes in...' + data);
        var str = data.toString();
        var invo = JSON.parse (str);
        console.log('request is:' + invo.what + ':' + str);
        var reply = {what:invo.what, invoId:invo.invoId};
        switch (invo.what) {
        	case 'get subject list': 
        		reply.obj = dm.getSubjectList();
        		break;
            case 'get public message list': 
            	reply.obj = dm.getPublicMessageList (invo.sbj);
            	break;
            case 'get private message list': 
            	reply.obj = dm.getPrivateMessageList (invo.u1, invo.u2);
            	break;
            case 'add private message':
                reply.obj = dm.addPrivateMessage(invo.msg);
                break;
            case 'add public message':
                reply.obj = dm.addPublicMessage(invo.msg);
                break;
            case 'new user':
                reply.obj = dm.addUser(invo.u,invo.p);
                break;
            case 'new subject':
                reply.obj = dm.addSubject(invo.s);
                break;
            case 'get user list':
                reply.obj = dm.getUserList();
                break;
            case 'login':
                reply.obj = dm.login(invo.u,invo.p);
                break;
        }
        sock.write (JSON.stringify(reply));
    });


    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('Connection closed');
    });
    
});
    
server.listen(PORT, HOST, function () {
    console.log('Server listening on ' + HOST +':'+ PORT);
});


