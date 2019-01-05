var dm = require('./dm_remote.js');
var PORT = Number(process.argv[2].split(':')[1]);
var HOST = process.argv[2].split(':')[0];
var peti = process.argv[3];
dm.Start(HOST, PORT, function () {
    switch (peti) {
        case 'get subject list':
            dm.getSubjectList(mostrarRespuesta);
            break;
        case 'get public message list':
            dm.getPublicMessageList(process.argv[4], mostrarRespuesta);
            break;
        case 'get private message list':
            dm.getPrivateMessageList(process.argv[4], process.argv[5], mostrarRespuesta);
            break;
        case 'add private message':
            dm.addPrivateMessage(process.argv[4], mostrarRespuesta);
            break;
        case 'add public message':
            dm.addPublicMessage(process.argv[4], mostrarRespuesta);
            break;
        case 'new user':
            dm.addUser(process.argv[4], process.argv[5], mostrarRespuesta);
            break;
        case 'new subject':
            dm.addSubject(process.argv[4], mostrarRespuesta);
            break;
        case 'get user list':
            dm.getUserList(mostrarRespuesta);
            break;
        case 'login':
            dm.login(process.argv[4], process.argv[5], mostrarRespuesta);
            break;
        default:
            console.log('No encontramos la peticion: ' + peti);
            break;
    }
});

function mostrarRespuesta(res) {
    console.log(res);
}