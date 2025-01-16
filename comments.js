//create web server
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var url = require('url');
var comments = [];

//create server
http.createServer(function(req, res) {
    //parse request
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var path = url_parts.pathname;

    //handle POST request
    if (req.method === 'POST' && path === '/comment') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var POST = qs.parse(body);
            comments.push(POST.comment);
            res.end('Comment added');
        });
    }

    //handle GET request
    if (path === '/comments') {
        res.end(JSON.stringify(comments));
    }

    //serve html file
    if (path === '/') {
        fs.readFile('index.html', function(err, data) {
            res.end(data);
        });
    }

}).listen(8080);

console.log('Server running at http://