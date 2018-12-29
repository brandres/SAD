var zmq = require('zeromq');
var req = zmq.socket('dealer');
var readline =require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
req.connect('tcp://localhost:3000');
req.on('message',function () {
    console.log('response: ' + arguments[1]);
});
rl.on('line', (input) => {
    console.log(`Enviando ${input}`);
    req.send(['',input.toString()]);
});