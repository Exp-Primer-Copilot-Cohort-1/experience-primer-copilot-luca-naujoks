// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var querystring = require('querystring');

var server = http.createServer(function (req, res) {
    var url_parts = url.parse(req.url);

    if (url_parts.pathname == '/') {
        fs.readFile('./comments.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (url_parts.pathname == '/comment') {
        var data = '';
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            var params = querystring.parse(data);
            console.log(params);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>' + params['name'] + '</h1>');
            res.write('<p>' + params['comment'] + '</p>');
            res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 Not Found</h1>');
        res.end();
    }
});

server.listen(3000); // Run the server on port 3000