var zmq = require('zeromq');
var req = zmq.socket('req');

req.connect('tcp://localhost:' + process.argv[2]);
var i = 0;
req.send('hola');
req.on('message',function (msg) {
    console.log('recibido' + msg);
    req.send('hola' + (++i));
})