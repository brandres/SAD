var zmq = require('zeromq');
var conectados = [];
    var rep = zmq.socket('dealer');
    rep.connect("tcp://localhost:4000");
    var pub = zmq.socket('pub');
    pub.bindSync("tcp://*:5000");
    rep.on('message',function () {
        var args = Array.apply(null,arguments);
        if(conectados.indexOf(args[0].toString("hex")) == -1){
            var sub = zmq.socket('sub');
            console.log('workerrecibe de broker: ' + args[2]);
            sub.connect("tcp://localhost:5000")
            sub.subscribe('');
            sub.on('message',function (msg) {
                var argssub = Array.apply(null,arguments);
                console.log(argssub.toString())
                console.log(conectados);
                console.log(args[0]);
                console.log('workerrecibe de worker: ' + argssub[2]);
                rep.send([args[0],'',argssub[2]]);
            });
            conectados.push(args[0].toString("hex"));
        }
        function helo(){
            pub.send([args[0],'',args[2]]);
            console.log('se envia');
        }
        setTimeout(helo,200);
    });

