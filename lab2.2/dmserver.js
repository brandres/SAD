var zmq = require('zeromq');
var rep = zmq.socket('rep');
var pub = zmq.socket('pub');
var PORT = process.argv[2];
var PUBPORT = process.argv[3];
var servers = process.argv[4] !== undefined ? process.argv[4].split(',') : [];

var dm = require('./dm.js');
connect();
// Add a 'data' event handler to this instance of socket
rep.on('message', function (data) {
    var str = data.toString();
    var invo = JSON.parse(str);
    console.log('request is:' + invo.what + ':' + str);
    var reply = {what: invo.what, invoId: invo.invoId};
    switch (invo.what) {
        case 'get subject list':
            reply.obj = dm.getSubjectList();
            break;
        case 'get public message list':
            reply.obj = dm.getPublicMessageList(invo.sbj);
            break;
        case 'get private message list':
            reply.obj = dm.getPrivateMessageList(invo.u1, invo.u2);
            break;
        case 'add private message':
            dm.addPrivateMessage(invo.msg);
            pub.send(['checkpoint',JSON.stringify(invo.msg)]);
            pub.send(['webserver',JSON.stringify(invo.msg)]);
            break;
        case 'add public message':
            dm.addPublicMessage(invo.msg);
            pub.send(['checkpoint',JSON.stringify(invo.msg)]);
            pub.send(['webserver',JSON.stringify(invo.msg)]);
            break;
        case 'new user':
            reply.obj = dm.addUser(invo.u, invo.p);
            break;
        case 'new subject':
            reply.obj = dm.addSubject(invo.s);
            break;
        case 'get user list':
            reply.obj = dm.getUserList();
            break;
        case 'login':
            reply.obj = dm.login(invo.u, invo.p);
            break;
    }
        rep.send(JSON.stringify(reply));

});


rep.bind('tcp://*:' + PORT, function () {
    console.log('Server rep listening on ' + '*' + ':' + PORT);
});
pub.bind('tcp://*:' + PUBPORT,function () {
    console.log('Server pub listening on ' + '*' + ':' + PUBPORT);
});

function connect(){
    for(var e of servers){
        console.log('Conectado a ' + e);
        var sub = zmq.socket('sub');
        sub.subscribe('checkpoint');
        sub.connect(e,function(){
            console.log('conectado a ' + e);
        });
        sub.on('message',function (identificador,datos) {
            var parsedData = JSON.parse(datos);
            pub.send(['webserver',JSON.stringify(parsedData)]);
        })
    }
}
