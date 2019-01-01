async function getStock(db, cod,cb) {
    let doc = await db.collection('products').findOne({cod: cod});
    await db.close();
    return await doc.stock;
}

function comprobarStock(db, producto, cb) {
    console.log('cantidad requerida' + producto.cantidad);
    getStock(db,producto.cod).then(function (stock) {
        if (stock > producto.cantidad) {
            cb(true);
        } else {
            cb(false);
        }
    })
}

module.exports.getStock = getStock;
module.exports.comprobarStock = comprobarStock;