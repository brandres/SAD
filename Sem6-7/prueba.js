var	fs	= require('fs');
var path = 'Sem6-7/file.txt';
var	rolodexFile	= fs.open(path,'r',function(err){

});
var qmod = require('q');
var	rolodex	= {a:'dd', b: 'mm'};
function retrieve(file,	name,	cb)	{
        fs.readFile(path,'utf8',function (err,data) {
            cb(JSON.parse(data)[name]);
        });
}

var process = qmod.fbind( function processEntry(name,cb)	{
    if	(rolodex[name]) {
        cb(name);
    }
    else{
        retrieve(rolodexFile,name,	function	(val)	{
            rolodex[name]=val;
            cb(name);
        });
    }
    return name;
});

function test()	{
    for	(var name of testNames)	{
        console.log	('processing',name);
        var p1 = process(name,function(val){
            console.log('processed',val);
        });
    }
}

var	testNames=['a','b','c'];
test();