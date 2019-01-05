var zmq = require('zeromq');
var pub = zmq.socket('pub');

var servers = process.argv[3].split(',');
var pubServer = 'tcp://*:' + process.argv[2];
var rep = zmq.socket('rep');
pub.bind(pubServer);
conectar();
function conectar(){
    for(var e of servers){
        var sub = zmq.socket('sub');
        console.log(e);
        sub.subscribe('');
        sub.connect(e);
        sub.on('message',function (msg) {
            console.log(msg.toString());
            rep.send('response');
        })
    }
}

rep.bind('tcp://*:' + process.argv[4]);
rep.on('message',function (msg) {
    console.log('ha llegado un mensaje al rep');
    pub.send(msg);
})