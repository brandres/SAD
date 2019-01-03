let multichain = require("multichain-node")({
    port: 4376,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "GbAwpFjs5okGKm4CC4nAndvEZjsyXEjU8deDg96vQf8a"
});
multichain.getInfo((err, info) => {
    if(err){
        throw err;
    }
    console.log(info);
})