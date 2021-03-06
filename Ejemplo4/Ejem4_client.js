var zmq = require("zeromq");
var socket = zmq.socket("rep");  

function logToConsole (message) {  
    console.log("[" + new Date().toLocaleTimeString() + "] " + message);
}

socket.on("message", function (message) {  
    // Convert the message into a string and log to the console.
    logToConsole("Received message: " + message.toString("utf8"));
    socket.send(message);
});

socket.connect('tcp://127.0.0.1:9998');  
