var zmq = require('zeromq');
var workers = 0;
var dealer = zmq.socket('dealer');
    var router = zmq.socket('router');
    router.bind("tcp://*:3000");
    dealer.bind("tcp://*:4000");
    router.on('message',function () {
        var args = Array.apply(null,arguments);
        console.log('broker recibe:' + args.toString());
        dealer.send(args);

    });

dealer.on('message',function (msg) {
    var args = Array.apply(null,arguments);
    router.send(args);
});

