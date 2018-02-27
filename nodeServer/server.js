var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin":"*"
    });
    fs.readFile('get.json', function (err, data) {
        if (err) {
            res.write(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
}).listen(8080);

console.log('success');