//create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var port = 3000;
var comments = [];
var server = http.createServer(function(request, response) {
    var parseUrl = url.parse(request.url, true);
    var pathname = parseUrl.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                console.log(err);
            }
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write(data);
            response.end();
        });
    } else if (pathname === '/addComment') {
        var comment = parseUrl.query;
        comments.push(comment);
        response.end();
    } else if (pathname === '/getComments') {
        response.writeHead(200, {
            'Content-Type': 'text/json'
        });
        response.write(JSON.stringify(comments));
        response.end();
    } else {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write('404 - Page Not Found');
        response.end();
    }
});
server.listen(port, function() {
    console.log(`Server is running at http://localhost:${port}`);
});