var zmq = require('zeromq');
var sub = zmq.socket('sub');
sub.connect("tcp://localhost:5000");
sub.subscribe('');
sub.on('message',function (msg) {
    console.log('subscriptor recibe algo');
    console.log(msg);
});