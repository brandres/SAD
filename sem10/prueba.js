let multichainweb = require("multichain-node")({
    port: 4376,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "GbAwpFjs5okGKm4CC4nAndvEZjsyXEjU8deDg96vQf8a"
});
multichainweb.getInfo((err, info) => {
    if(err){
        throw err;
    }
    console.log(info);
});
let multichaindb = require("multichain-node")({
    port: 4367,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "HBitczXNL13A3AMLvFHRP5ajvG9LGS5jfQRZyLxtUnuh"
});

multichaindb.getInfo((err, info) => {
    if(err){
        throw err;
    }
    console.log(info);
});
