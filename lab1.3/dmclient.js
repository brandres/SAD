var dm = require ('./dm_remote.js');
var PORT = Number(process.argv[2].split(':')[1]);
var HOST = process.argv[2].split(':')[0];
var peti = process.argv[3];


dm.Start(HOST, PORT, function () {

	switch (peti) {
		case 'get subject list':
			reply.obj = dm.getSubjectList();
			break;
		case 'get public message list':
			reply.obj = dm.getPublicMessageList (process.argv[4]);
			break;
		case 'get private message list':
			reply.obj = dm.getPrivateMessageList (process.argv[4],process.argv[5]);
			break;
		case 'add private message':
			reply.obj = dm.addPrivateMessage(process.argv[4]);
			break;
		case 'add public message':
			reply.obj = dm.addPublicMessage(process.argv[4]);
			break;
		case 'new user':
			reply.obj = dm.addUser(process.argv[4],process.argv[5]);
			break;
		case 'new subject':
			reply.obj = dm.addSubject(process.argv[4]);
			break;
		case 'get user list':
			reply.obj = dm.getUserList();
			break;
		case 'login':
			reply.obj = dm.login(process.argv[4],process.argv[5]);
			break;
		default: console.log('No encontramos la peticion: ' +peti);break;
	}
});
