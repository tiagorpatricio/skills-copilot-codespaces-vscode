//create web server
var express = require('express');
var app = express();
//set up the route
app.get('/comments', function(req, res){
    res.json([
        {
            "id": 1,
            "author": "Pete Hunt",
            "text": "This is one comment"
        },
        {
            "id": 2,
            "author": "Jordan Walke",
            "text": "This is *another* comment"
        }
    ]);
});
//start the server
app.listen(3001, function(){
    console.log('Server is running on port 3001');
});
