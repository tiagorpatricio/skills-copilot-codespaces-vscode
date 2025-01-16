//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var comments = [];

http.createServer(function (req, res) {
  //parse url
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  //handle favicon.ico
  if (pathname === '/favicon.ico') {
    res.end();
    return;
  }
  //handle static resource
  if (pathname === '/' || pathname === '/index.html') {
    var filePath = path.join(__dirname, 'index.html');
    var fileContent = fs.readFileSync(filePath);
    res.setHeader('Content-Type', 'text/html');
    res.end(fileContent);
  } else if (pathname === '/addComment') {
    //add comment
    var comment = urlObj.query;
    comment.dateTime = new Date();
    comments.push(comment);
    //redirect
    res.statusCode = 302;
    res.statusMessage = 'Found';
    res.setHeader('Location', '/');
    res.end();
  } else if (pathname === '/getComments') {
    //get comments
    var str = JSON.stringify(comments);
    res.end(str);
  } else {
    res.statusCode = 404;
    res.statusMessage = 'Not Found';
    res.end();
  }
}).listen(3000, function () {
  console.log('server is listening on port 3000');
});